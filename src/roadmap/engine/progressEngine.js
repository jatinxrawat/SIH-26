/**
 * Roadmap Progress Engine
 * Calculates mathematical progress scores and detects blockers.
 * NEVER hardcodes random percentages.
 */

import { evaluateTaskStatus } from './dependencyEngine';

/**
 * Calculates overall journey completion percentage.
 */
export function calculateOverallProgress(allTasks = [], completedTaskIds = []) {
  if (!allTasks || allTasks.length === 0) return 0;
  const applicableTasks = allTasks.filter((t) => !t.isIgnored);
  const completed = applicableTasks.filter((t) => completedTaskIds.includes(t.id)).length;
  return Math.min(100, Math.round((completed / applicableTasks.length) * 100));
}

/**
 * Calculates business readiness across key entrepreneurship dimensions.
 * Values are mathematically derived from task and document states.
 */
export function calculateBusinessReadiness(allTasks = [], completedTaskIds = [], documentStatus = {}, selectedSchemeId = null) {
  const getStageTasks = (stageId) => allTasks.filter((t) => t.stage === stageId);

  const calculateRatio = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter((t) => completedTaskIds.includes(t.id)).length;
    return Math.round((completed / tasks.length) * 100);
  };

  // 1. Idea Validation (Stage: IDEA)
  const ideaTasks = getStageTasks('IDEA');
  const ideaScore = calculateRatio(ideaTasks);

  // 2. Business Planning & Feasibility (Stage: FEASIBILITY)
  const feasibilityTasks = getStageTasks('FEASIBILITY');
  const feasibilityScore = calculateRatio(feasibilityTasks);

  // 3. Government Support (Stage: SUPPORT + scheme selected)
  const supportTasks = getStageTasks('SUPPORT');
  const rawSupport = calculateRatio(supportTasks);
  const schemeBonus = selectedSchemeId ? 10 : 0;
  const governmentSupportScore = Math.min(100, Math.round(rawSupport * 0.9 + schemeBonus));

  // 4. Funding Readiness (Stage: FUNDING + DPR + Quotations)
  const fundingTasks = getStageTasks('FUNDING');
  let fundingScore = calculateRatio(fundingTasks);
  if (documentStatus['doc-dpr']) fundingScore = Math.min(100, fundingScore + 10);
  if (documentStatus['doc-quotations']) fundingScore = Math.min(100, fundingScore + 10);

  // 5. Compliance & Launch Readiness (Stages: REGISTRATION, SETUP, LAUNCH)
  const launchTasks = allTasks.filter((t) => ['REGISTRATION', 'SETUP', 'LAUNCH'].includes(t.stage));
  const launchScore = calculateRatio(launchTasks);

  return [
    { label: 'Idea Validation', score: ideaScore, weight: 'Foundational' },
    { label: 'Business Planning', score: feasibilityScore, weight: 'Economics' },
    { label: 'Government Support', score: governmentSupportScore, weight: 'Subsidies' },
    { label: 'Funding Readiness', score: fundingScore, weight: 'Bank Credit' },
    { label: 'Launch Readiness', score: launchScore, weight: 'Operations' }
  ];
}

/**
 * Identifies tangible blockers impeding the entrepreneur's current progress.
 */
export function calculateBlockers(allTasks = [], completedTaskIds = [], documentStatus = {}, selectedSchemeId = null, documents = []) {
  const blockers = [];

  // 1. Check if the active available high-priority tasks are missing critical documents
  allTasks.forEach((task) => {
    if (!completedTaskIds.includes(task.id)) {
      const { isAvailable, missingDocuments } = evaluateTaskStatus(task, completedTaskIds, documentStatus);
      if (isAvailable && missingDocuments.length > 0) {
        missingDocuments.forEach((docId) => {
          const docObj = documents.find((d) => d.id === docId);
          const docName = docObj ? docObj.name : docId;
          // Avoid duplicate blocker entries
          if (!blockers.some((b) => b.id === docId)) {
            blockers.push({
              id: docId,
              title: docName,
              category: 'Missing Document',
              reason: `Required to complete "${task.shortTitle || task.title}"`,
              taskId: task.id,
              actionLabel: 'Mark Document Ready'
            });
          }
        });
      }
    }
  });

  // 2. Check if scheme discovery completed but no scheme selected
  const discoveryCompleted = completedTaskIds.includes('scheme-discovery');
  const selectionCompleted = completedTaskIds.includes('scheme-selection');
  if (discoveryCompleted && !selectionCompleted && !selectedSchemeId) {
    blockers.push({
      id: 'blocker-scheme-selection',
      title: 'Target Scheme Not Selected',
      category: 'Scheme Selection',
      reason: 'Select a primary scheme (e.g. PMFME or PMEGP) to lock in DPR subsidy calculations.',
      taskId: 'scheme-selection',
      actionLabel: 'Select Scheme'
    });
  }

  // 3. Check if DPR is pending for funding stage
  const fundingGapCompleted = completedTaskIds.includes('funding-gap');
  const dprCompleted = completedTaskIds.includes('funding-dpr');
  if (fundingGapCompleted && !dprCompleted && !documentStatus['doc-dpr']) {
    if (!blockers.some((b) => b.id === 'doc-dpr')) {
      blockers.push({
        id: 'blocker-dpr',
        title: 'Detailed Project Report (DPR) Required',
        category: 'Funding Dossier',
        reason: 'Bank credit appraisal requires a verified DPR showing 5-year unit viability.',
        taskId: 'funding-dpr',
        actionLabel: 'Prepare DPR'
      });
    }
  }

  return blockers;
}

/**
 * Calculates document readiness score.
 */
export function calculateDocumentReadiness(requiredDocIds = [], documentStatus = {}) {
  if (!requiredDocIds || requiredDocIds.length === 0) {
    return { completed: 0, total: 0, percentage: 100 };
  }
  const completed = requiredDocIds.filter((id) => documentStatus[id]).length;
  const total = requiredDocIds.length;
  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage };
}
