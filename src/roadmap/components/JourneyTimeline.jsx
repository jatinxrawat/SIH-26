/**
 * JourneyTimeline Component
 * Modern accordion timeline displaying the 8 stages with clear status
 * (COMPLETED, CURRENT, AVAILABLE, LOCKED), progress %, and expandable tasks.
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
  ShieldCheck
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
    toggleTaskCompletion
  } = useRoadmap();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Business Journey Roadmap
          </h2>
          <p className="text-xs text-slate-500">
            Structured milestone execution from initial concept to commercial scale.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stage) => {
          const stageTasks = allTasks.filter((t) => t.stage === stage.id);
          const stageEval = evaluateStageStatus(stage.id, stageTasks, completedTaskIds, currentStageId);
          const isExpanded = expandedStageId === stage.id;
          const isCurrent = stage.id === currentStageId;

          // Status Badge styling
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
                  {/* Stage Number Node */}
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

                  {/* Stage Titles & Badges */}
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

                {/* Right Side: Progress Bar + Expand Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right space-y-1">
                    <div className="text-xs font-black text-slate-700">
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
                      <strong className="text-slate-900 font-bold block">Objective:</strong>
                      <span>{stage.objective}</span>
                    </div>
                  </div>

                  {/* Tasks Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {stageTasks.map((task) => {
                      const { isCompleted, isLocked } = evaluateTaskStatus(
                        task,
                        completedTaskIds,
                        documentStatus
                      );

                      return (
                        <div
                          key={task.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isCompleted
                              ? 'bg-emerald-50/50 border-emerald-200/80 text-slate-700'
                              : isLocked
                              ? 'bg-slate-50 border-slate-200/70 text-slate-400'
                              : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-soft-xs text-slate-900'
                          }`}
                        >
                          {/* Task Left Checkbox & Title */}
                          <div className="flex items-start sm:items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isLocked) {
                                  toggleTaskCompletion(task.id);
                                }
                              }}
                              disabled={isLocked}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : isLocked
                                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                  : 'border-2 border-slate-300 hover:border-emerald-500'
                              }`}
                              title={isLocked ? 'Prerequisites pending' : isCompleted ? 'Mark incomplete' : 'Mark as complete'}
                            >
                              {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                              {isLocked && <Lock className="w-3 h-3" />}
                            </button>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-xs sm:text-sm font-bold ${
                                    isCompleted ? 'text-slate-600 line-through' : isLocked ? 'text-slate-500' : 'text-slate-900'
                                  }`}
                                >
                                  {task.title}
                                </span>

                                {task.priority === 'HIGH' && !isCompleted && !isLocked && (
                                  <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase">
                                    High
                                  </span>
                                )}
                              </div>

                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          {/* Task Right Attributes & Details Trigger */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <Clock className="w-3 h-3" />
                              <span>{task.estimatedTime}</span>

                              {task.requiredDocuments?.length > 0 && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                                  <FileText className="w-2.5 h-2.5" />
                                  <span>{task.requiredDocuments.length} docs</span>
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => openTaskDrawer(task.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                                isCompleted
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                  : isLocked
                                  ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              <span>Details</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
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
