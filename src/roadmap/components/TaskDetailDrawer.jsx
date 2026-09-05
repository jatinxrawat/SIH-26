/**
 * TaskDetailDrawer Component
 * Rich slide-over drawer providing comprehensive task intelligence, interactive document readiness,
 * scheme and funding linkages, professional marketplace linkages, AI assistance, and completion CTA.
 */

import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Landmark,
  Coins,
  Users2,
  FolderCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRoadmap } from '../context/RoadmapContext';
import { evaluateTaskStatus, getUnlockedTasks } from '../engine/dependencyEngine';
import TaskAIAssistant from './TaskAIAssistant';

export default function TaskDetailDrawer() {
  const {
    activeDrawerTaskId,
    closeTaskDrawer,
    allTasks,
    stages,
    documents,
    profile,
    completedTaskIds,
    documentStatus,
    toggleTaskCompletion,
    toggleDocumentStatus,
    selectedSchemeId,
    selectScheme
  } = useRoadmap();

  if (!activeDrawerTaskId) return null;

  const task = allTasks.find((t) => t.id === activeDrawerTaskId);
  if (!task) return null;

  const stage = stages.find((s) => s.id === task.stage) || stages[0];
  const { isCompleted, isLocked, missingPrerequisites } = evaluateTaskStatus(
    task,
    completedTaskIds,
    documentStatus
  );

  const unlockedTasks = getUnlockedTasks(task.id, allTasks, completedTaskIds);
  const taskRequiredDocs = (task.requiredDocuments || [])
    .map((docId) => documents.find((d) => d.id === docId))
    .filter(Boolean);

  const completedDocsCount = taskRequiredDocs.filter((d) => documentStatus[d.id]).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeTaskDrawer}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-soft-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70 shrink-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                0{stage.number} {stage.title}
              </span>

              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                Priority: {task.priority}
              </span>

              <span className="inline-flex items-center gap-1 text-slate-500 font-semibold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{task.estimatedTime}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeTaskDrawer}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-800 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {/* Status Alert */}
          {isLocked ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">This task is currently locked</strong>
                <span>
                  Complete required prerequisites first:{' '}
                  {missingPrerequisites
                    .map((id) => allTasks.find((t) => t.id === id)?.shortTitle || id)
                    .join(', ')}
                </span>
              </div>
            </div>
          ) : isCompleted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold">This task is marked as complete.</span>
            </div>
          ) : null}

          {/* 1. WHY THIS MATTERS */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Why this matters
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              {task.whyThisMatters}
            </p>
          </div>

          {/* 2. WHAT TO DO (Step-by-step checklist) */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              What to do
            </h3>
            <div className="space-y-2">
              {task.whatToDo?.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. REQUIRED INPUTS */}
          {task.requiredInputs?.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Required Inputs
              </h3>
              <div className="flex flex-wrap gap-2">
                {task.requiredInputs.map((input, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    {input}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4. DOCUMENT READINESS (Interactive Checkbox Vault) */}
          {taskRequiredDocs.length > 0 && (
            <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FolderCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                    Document Readiness
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-700">
                  {completedDocsCount} / {taskRequiredDocs.length} Ready
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                Mark each required document as ready to satisfy compliance checks:
              </p>

              <div className="space-y-2 pt-1">
                {taskRequiredDocs.map((doc) => {
                  const isReady = Boolean(documentStatus[doc.id]);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocumentStatus(doc.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 text-xs select-none ${
                        isReady
                          ? 'bg-white border-emerald-300 text-emerald-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isReady
                              ? 'bg-emerald-600 text-white'
                              : 'border-2 border-slate-300'
                          }`}
                        >
                          {isReady && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{doc.name}</span>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isReady ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. GOVERNMENT SCHEMES LINKAGE */}
          {task.relatedSchemes?.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs text-emerald-950 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-700" />
                  <strong className="font-bold">Government Scheme Linkage</strong>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  {profile.schemeMatchScore || '94% Match'}
                </span>
              </div>

              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Eligible under <strong>{profile.recommendedScheme || 'PMFME'}</strong> with up to{' '}
                <strong>{profile.schemeSubsidy || '35% capital subsidy'}</strong> for {profile.industry}.
              </p>

              <div className="flex items-center gap-2 pt-1">
                {task.id === 'scheme-selection' && !selectedSchemeId ? (
                  <button
                    type="button"
                    onClick={() => selectScheme('PMFME')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft-xs"
                  >
                    Select PMFME Scheme
                  </button>
                ) : null}

                <Link
                  to="/schemes"
                  className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                >
                  <span>Explore in Scheme Matcher</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* 6. FUNDING LINKAGE */}
          {task.relatedFunding && (
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/90 text-xs text-sky-950 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-sky-700" />
                  <strong className="font-bold">Funding Architecture</strong>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                  Capital Stack
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                <div className="bg-white p-2 rounded-xl border border-sky-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Project Cost</span>
                  <strong className="text-slate-900">{profile.estimatedProjectCost}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-sky-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Own Margin</span>
                  <strong className="text-amber-700">{profile.availableCapital}</strong>
                </div>
                <div className="bg-white p-2 rounded-xl border border-sky-200">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Funding Gap</span>
                  <strong className="text-sky-700">{profile.fundingRequired}</strong>
                </div>
              </div>

              <div className="pt-1 flex justify-end">
                <Link
                  to="/funding"
                  className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline"
                >
                  <span>View Capital Structure</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* 7. PROFESSIONAL RECOMMENDATION LINKAGE */}
          {task.recommendedProfessionalCategory && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-emerald-600" />
                  <strong className="font-bold text-slate-900">Professional Assistance Available</strong>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  {task.recommendedProfessionalCategory}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Need expert support? Connect with verified Chartered Accountants or DPR consultants to prepare banking filings.
              </p>
              <div className="pt-1">
                <Link
                  to="/professionals"
                  className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                >
                  <span>Find a Verified Professional</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* 8. WHAT THIS UNLOCKS */}
          {unlockedTasks.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                What you'll unlock next
              </h3>
              <div className="space-y-1.5">
                {unlockedTasks.map((uTask) => (
                  <div
                    key={uTask.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <span className="text-emerald-600 font-bold">→</span>
                      <span>{uTask.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{uTask.estimatedTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. EMBEDDED AI ASSISTANT (Gemini & Grok) */}
          <div className="pt-2">
            <TaskAIAssistant task={task} businessContext={profile} />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-white flex items-center justify-between gap-4 shrink-0 shadow-soft-sm">
          <div className="text-xs text-slate-400">
            <span>Stage {stage.number} of {stages.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeTaskDrawer}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                toggleTaskCompletion(task.id);
                closeTaskDrawer();
              }}
              disabled={isLocked}
              className={`px-6 py-2.5 rounded-2xl font-black text-xs shadow-soft-md transition-all flex items-center gap-2 ${
                isCompleted
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : isLocked
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25'
              }`}
            >
              {isCompleted ? (
                <span>Mark as Incomplete</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
