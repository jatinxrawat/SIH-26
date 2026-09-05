/**
 * TaskDetailDrawer Component (Upgraded)
 * Comprehensive task intelligence workspace featuring interactive checkpoint steps,
 * instant document verification/upload simulation, scheme/funding calculators, and AI Assistant.
 */

import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Lock,
  ArrowRight,
  Landmark,
  Coins,
  Users2,
  FolderCheck,
  Check,
  Upload,
  ShieldCheck,
  Sparkles
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
    toggleTaskStep,
    taskChecklists,
    toggleDocumentStatus,
    simulateDocumentUpload,
    selectedSchemeId,
    selectScheme
  } = useRoadmap();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'docs' | 'ai'

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
  const taskSteps = task.whatToDo || [];
  const completedStepsMap = taskChecklists[task.id] || {};
  const completedStepsCount = Object.values(completedStepsMap).filter(Boolean).length;

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

        {/* Tab Selector */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-100 bg-white text-xs font-bold text-slate-600 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Overview & Steps</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
              {completedStepsCount}/{taskSteps.length}
            </span>
          </button>

          {taskRequiredDocs.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'docs'
                  ? 'border-emerald-600 text-emerald-900 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <span>Document Vault</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                completedDocsCount === taskRequiredDocs.length
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {completedDocsCount}/{taskRequiredDocs.length}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-emerald-600 text-emerald-900 font-black'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Advisor</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
          {/* Status Alert */}
          {isLocked ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Prerequisites Required</strong>
                <span>
                  Complete earlier checkpoints before working on this task:{' '}
                  {missingPrerequisites
                    .map((id) => allTasks.find((t) => t.id === id)?.shortTitle || id)
                    .join(', ')}
                </span>
              </div>
            </div>
          ) : isCompleted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">This milestone has been verified & completed!</span>
            </div>
          ) : null}

          {/* TAB 1: OVERVIEW & STEPS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Why this matters */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Why this matters
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  {task.whyThisMatters}
                </p>
              </div>

              {/* Interactive Steps Checklist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    Execution Steps
                  </h3>
                  <span className="text-xs text-emerald-700 font-bold">
                    {completedStepsCount} of {taskSteps.length} complete
                  </span>
                </div>

                <div className="space-y-2">
                  {taskSteps.map((step, idx) => {
                    const isStepDone = Boolean(completedStepsMap[idx]);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTaskStep(task.id, idx)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isStepDone
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-all ${
                            isStepDone ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                          }`}
                        >
                          {isStepDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span className="text-xs leading-relaxed flex-1">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Inputs */}
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

              {/* Government Schemes Linkage */}
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

              {/* Funding Linkage */}
              {task.relatedFunding && (
                <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/90 text-xs text-sky-950 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-sky-700" />
                      <strong className="font-bold">Capital Stack Breakdown</strong>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
                      Live Formula
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-sky-200">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Project Cost</span>
                      <strong className="text-slate-900">{profile.estimatedProjectCost}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-sky-200">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Own Margin</span>
                      <strong className="text-amber-700">{profile.availableCapital}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-sky-200">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">Funding Gap</span>
                      <strong className="text-sky-700">{profile.fundingRequired}</strong>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <Link
                      to="/funding"
                      className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline"
                    >
                      <span>View Full Funding Breakdown</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Professional Assistance */}
              {task.recommendedProfessionalCategory && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-emerald-600" />
                      <strong className="font-bold text-slate-900">Verified Expert Network</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {task.recommendedProfessionalCategory}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Connect with certified MSME Chartered Accountants or DPR consultants to prepare your bank files.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/professionals"
                      className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                    >
                      <span>Find a Professional</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}

              {/* What this unlocks */}
              {unlockedTasks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                    What completion unlocks
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
            </div>
          )}

          {/* TAB 2: DOCUMENT VAULT & VERIFICATION */}
          {activeTab === 'docs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderCheck className="w-4 h-4 text-emerald-700" />
                  <strong className="font-bold">Required Statutory Records</strong>
                </div>
                <span className="text-xs font-black text-emerald-800">
                  {completedDocsCount} / {taskRequiredDocs.length} Verified
                </span>
              </div>

              <div className="space-y-3">
                {taskRequiredDocs.map((doc) => {
                  const isReady = Boolean(documentStatus[doc.id]);
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-2xl border transition-all space-y-2 ${
                        isReady
                          ? 'bg-emerald-50/40 border-emerald-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            onClick={() => toggleDocumentStatus(doc.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                              isReady ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                            }`}
                          >
                            {isReady && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{doc.name}</span>
                            <span className="text-[10px] text-slate-400">Category: {doc.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isReady ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => simulateDocumentUpload(doc.id, doc.name)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-soft-xs"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Upload / Verify</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE AI ASSISTANT */}
          {activeTab === 'ai' && (
            <div className="animate-in fade-in duration-150">
              <TaskAIAssistant task={task} businessContext={profile} />
            </div>
          )}
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
                  <span>Mark Milestone Complete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
