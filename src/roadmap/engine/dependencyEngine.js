/**
 * Roadmap Dependency Engine
 * Evaluates prerequisite fulfillment, task unlock status, and stage progress states deterministically.
 */

/**
 * Computes status for a single task given the completed tasks and document state.
 * Statuses: 'COMPLETED' | 'AVAILABLE' | 'LOCKED'
 */
export function evaluateTaskStatus(task, completedTaskIds = [], documentStatus = {}) {
  if (completedTaskIds.includes(task.id)) {
    return {
      status: 'COMPLETED',
      isCompleted: true,
      isAvailable: true,
      isLocked: false,
      missingPrerequisites: [],
      missingDocuments: []
    };
  }

  // Check prerequisites
  const missingPrerequisites = (task.prerequisites || []).filter(
    (preId) => !completedTaskIds.includes(preId)
  );

  const isLocked = missingPrerequisites.length > 0;

  // Check required documents
  const missingDocuments = (task.requiredDocuments || []).filter(
    (docId) => !documentStatus[docId]
  );

  return {
    status: isLocked ? 'LOCKED' : 'AVAILABLE',
    isCompleted: false,
    isAvailable: !isLocked,
    isLocked,
    missingPrerequisites,
    missingDocuments,
    hasMissingDocuments: missingDocuments.length > 0
  };
}

/**
 * Computes status and completion metrics for each stage.
 * Statuses: 'COMPLETED' | 'CURRENT' | 'AVAILABLE' | 'LOCKED'
 */
export function evaluateStageStatus(stageId, stageTasks = [], completedTaskIds = [], currentStageId = null) {
  if (!stageTasks || stageTasks.length === 0) {
    return { status: 'LOCKED', completedCount: 0, totalCount: 0, percentage: 0 };
  }

  const completedCount = stageTasks.filter((t) => completedTaskIds.includes(t.id)).length;
  const totalCount = stageTasks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  if (completedCount === totalCount) {
    return {
      status: 'COMPLETED',
      completedCount,
      totalCount,
      percentage
    };
  }

  if (currentStageId && currentStageId === stageId) {
    return {
      status: 'CURRENT',
      completedCount,
      totalCount,
      percentage
    };
  }

  // If any task is completed or available, stage is accessible
  const hasAvailableTask = stageTasks.some((t) => {
    const { isAvailable } = evaluateTaskStatus(t, completedTaskIds);
    return isAvailable;
  });

  if (hasAvailableTask || completedCount > 0) {
    return {
      status: 'AVAILABLE',
      completedCount,
      totalCount,
      percentage
    };
  }

  return {
    status: 'LOCKED',
    completedCount,
    totalCount,
    percentage
  };
}

/**
 * Identifies what tasks a specific completed task will directly or transitively unlock.
 */
export function getUnlockedTasks(taskId, allTasks = [], completedTaskIds = []) {
  const currentTask = allTasks.find((t) => t.id === taskId);
  if (!currentTask || !currentTask.unlocks) return [];

  return (currentTask.unlocks || [])
    .map((unlockId) => allTasks.find((t) => t.id === unlockId))
    .filter(Boolean);
}
