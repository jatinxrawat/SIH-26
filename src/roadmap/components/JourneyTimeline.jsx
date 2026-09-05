/**
 * JourneyTimeline Component (Upgraded)
 * Advanced milestone timeline featuring instant search, status filtering,
 * interactive step-checklists, AI milestone generator, and accordion progressive disclosure.
 */

import React from 'react';
import {
  CheckCircle2,
  CircleDot,
  Lock,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  ArrowRight,
  ShieldCheck,
  Search,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { evaluateTaskStatus, evaluateStageStatus } from '../engine/dependencyEngine';

export default function JourneyTimeline() {
  const {
    stages,
    allTasks,
    completedTaskIds,
    documentStatus,
    currentStageId,
    expandedStageId,
    setExpandedStageId,
    openTaskDrawer,
    toggleTaskCompletion,
    toggleTaskStep,
    taskChecklists,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    setIsAIMilestoneModalOpen
  } = useRoadmap();

  // Filter tasks based on search query and active filter
  const filterTask = (task) => {
    // 1. Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchDocs = (task.requiredDocuments || []).some((d) => d.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchDocs) return false;
    }

    // 2. Status filter
    if (activeFilter === 'COMPLETED') {
      return completedTaskIds.includes(task.id);
    }
    if (activeFilter === 'AVAILABLE') {
      const { isAvailable, isCompleted } = evaluateTaskStatus(task, completedTaskIds, documentStatus);
      return isAvailable && !isCompleted;
    }
    if (activeFilter === 'BLOCKED') {
      const { isLocked, hasMissingDocuments, isCompleted } = evaluateTaskStatus(
        task,
        completedTaskIds,
        documentStatus
      );
      return !isCompleted && (isLocked || hasMissingDocuments);
    }

    return true;
  };

  // Counts for filter pills
  const totalTasksCount = allTasks.length;
  const completedTasksCount = completedTaskIds.length;
  const availableTasksCount = allTasks.filter((t) => {
    const { isAvailable, isCompleted } = evaluateTaskStatus(t, completedTaskIds, documentStatus);
    return isAvailable && !isCompleted;
  }).length;
  const blockedTasksCount = allTasks.filter((t) => {
    const { isLocked, hasMissingDocuments, isCompleted } = evaluateTaskStatus(
      t,
      completedTaskIds,
      documentStatus
    );
    return !isCompleted && (isLocked || hasMissingDocuments);
  }).length;

  return (
    <div className="space-y-5">
      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestones, documents (e.g. FSSAI, DPR, Udyam)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills & AI Milestone Button */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-soft-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({totalTasksCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('AVAILABLE')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeFilter === 'AVAILABLE'
                  ? 'bg-white text-emerald-800 shadow-soft-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Available ({availableTasksCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('COMPLETED')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeFilter === 'COMPLETED'
                  ? 'bg-white text-emerald-800 shadow-soft-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Done ({completedTasksCount})
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('BLOCKED')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                activeFilter === 'BLOCKED'
                  ? 'bg-white text-amber-800 shadow-soft-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Docs ({blockedTasksCount})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAIMilestoneModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Custom AI Goal</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Milestone Cards */}
      <div className="space-y-3.5">
        {stages.map((stage) => {
          const rawStageTasks = allTasks.filter((t) => t.stage === stage.id);
          const visibleStageTasks = rawStageTasks.filter(filterTask);
          const stageEval = evaluateStageStatus(stage.id, rawStageTasks, completedTaskIds, currentStageId);
          const isExpanded = expandedStageId === stage.id;
          const isCurrent = stage.id === currentStageId;

          // If search active and no matching tasks in this stage, skip rendering stage
          if (searchQuery.trim() && visibleStageTasks.length === 0) {
            return null;
          }

          const getStatusBadge = () => {
            if (stageEval.status === 'COMPLETED') {
              return (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Complete</span>
                </span>
              );
            }
            if (isCurrent) {
              return (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-soft-xs animate-pulse">
                  <CircleDot className="w-3 h-3" />
                  <span>In Progress</span>
                </span>
              );
            }
            if (stageEval.status === 'AVAILABLE') {
              return (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  <span>Available</span>
                </span>
              );
            }
            return (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                <Lock className="w-2.5 h-2.5" />
                <span>Locked</span>
              </span>
            );
          };

          return (
            <div
              key={stage.id}
              id={`stage-${stage.id}`}
              className={`rounded-3xl border transition-all ${
                isCurrent
                  ? 'bg-white border-emerald-500 shadow-soft-md ring-2 ring-emerald-500/20'
                  : stageEval.status === 'COMPLETED'
                  ? 'bg-white border-emerald-200/90 shadow-soft-sm'
                  : stageEval.status === 'LOCKED'
                  ? 'bg-slate-50/70 border-slate-200/80 opacity-90'
                  : 'bg-white border-slate-200/90 shadow-soft-sm hover:border-slate-300'
              }`}
            >
              {/* Stage Header Accordion Toggle */}
              <div
                onClick={() => setExpandedStageId(isExpanded ? null : stage.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                      stageEval.status === 'COMPLETED'
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-300'
                        : stageEval.status === 'AVAILABLE'
                        ? 'bg-slate-100 text-slate-800 border border-slate-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {stageEval.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span>0{stage.number}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {stage.title}
                      </h3>
                      {getStatusBadge()}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                      {stage.tagline}
                    </p>
                  </div>
                </div>

                {/* Right Progress Counter + Toggle Icon */}
                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right space-y-1">
                    <div className="text-xs font-black text-slate-800">
                      {stageEval.completedCount} / {stageEval.totalCount} Tasks
                    </div>
                    <div className="w-24 sm:w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          stageEval.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${stageEval.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Stage Tasks List (Expanded via Progressive Disclosure) */}
              {isExpanded && (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 space-y-3">
                  {/* Stage Objective Banner */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 font-bold block">Stage Objective:</strong>
                      <span>{stage.objective}</span>
                    </div>
                  </div>

                  {/* Tasks Grid */}
                  <div className="grid grid-cols-1 gap-3">
                    {visibleStageTasks.map((task) => {
                      const { isCompleted, isLocked } = evaluateTaskStatus(
                        task,
                        completedTaskIds,
                        documentStatus
                      );

                      const taskSteps = task.whatToDo || [];
                      const completedStepsMap = taskChecklists[task.id] || {};
                      const completedStepsCount = Object.values(completedStepsMap).filter(Boolean).length;

                      return (
                        <div
                          key={task.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            isCompleted
                              ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-700'
                              : isLocked
                              ? 'bg-slate-50/80 border-slate-200/70 text-slate-400'
                              : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-soft-xs text-slate-900'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            {/* Checkbox & Header */}
                            <div className="flex items-start gap-3 flex-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!isLocked) {
                                    toggleTaskCompletion(task.id);
                                  }
                                }}
                                disabled={isLocked}
                                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                                  isCompleted
                                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                                    : isLocked
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'border-2 border-slate-300 hover:border-emerald-500'
                                }`}
                                title={isLocked ? 'Prerequisites pending' : isCompleted ? 'Mark incomplete' : 'Mark complete'}
                              >
                                {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                {isLocked && <Lock className="w-3 h-3" />}
                              </button>

                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`text-xs sm:text-sm font-black ${
                                      isCompleted ? 'text-slate-600 line-through' : isLocked ? 'text-slate-500' : 'text-slate-900'
                                    }`}
                                  >
                                    {task.title}
                                  </span>

                                  {task.isCustom && (
                                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase">
                                      AI Custom
                                    </span>
                                  )}

                                  {task.priority === 'HIGH' && !isCompleted && !isLocked && (
                                    <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase">
                                      High
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-slate-600 line-clamp-2">
                                  {task.description}
                                </p>
                              </div>
                            </div>

                            {/* Right Action Bar */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{task.estimatedTime}</span>

                                {task.requiredDocuments?.length > 0 && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                                    <FileText className="w-3 h-3" />
                                    <span>{task.requiredDocuments.length} docs</span>
                                  </span>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => openTaskDrawer(task.id)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  isCompleted
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : isLocked
                                    ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                <span>Details</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Sub-Task Checkpoint Row */}
                          {taskSteps.length > 0 && !isLocked && (
                            <div className="mt-3 pt-3 border-t border-slate-100/80 space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
                                <span>Execution Checkpoints:</span>
                                <span className="text-emerald-700 font-bold">
                                  {completedStepsCount} / {taskSteps.length} complete
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {taskSteps.map((stepText, sIdx) => {
                                  const isStepDone = Boolean(completedStepsMap[sIdx]);
                                  return (
                                    <div
                                      key={sIdx}
                                      onClick={() => toggleTaskStep(task.id, sIdx)}
                                      className={`p-2 rounded-xl text-xs flex items-start gap-2 cursor-pointer transition-all select-none ${
                                        isStepDone
                                          ? 'bg-emerald-50/80 text-emerald-950 font-medium'
                                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                      }`}
                                    >
                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                                          isStepDone ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                                        }`}
                                      >
                                        {isStepDone && <Check className="w-3 h-3" />}
                                      </div>
                                      <span className="text-[11px] leading-tight line-clamp-1">{stepText}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
