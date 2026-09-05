/**
 * TaskDetailDrawer Component (Stitch Ultra-Premium Edition)
 * State-of-the-art slide-over workspace designed with Stitch Design System.
 * Features glassmorphic rationale cards, interactive execution checkpoints,
 * deliverables tag cloud, downstream unlocks, document vault, and live AI Advisor.
 */

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
  Sparkles,
  FileText,
  BarChart3,
  LockOpen,
  Rocket,
  Info,
  ChevronRight,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRoadmap } from '../context/RoadmapContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';
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

  const { t, language } = useLanguage();
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
  const stepsProgressPercent = taskSteps.length > 0 ? Math.round((completedStepsCount / taskSteps.length) * 100) : 0;

  const drawerContent = (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200">
      {/* Dimmed Backdrop */}
      <div
        onClick={closeTaskDrawer}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full md:w-[50%] lg:w-[46%] max-w-[640px] bg-white h-screen shadow-[0_20px_60px_rgba(5,150,105,0.18)] flex flex-col z-10 overflow-hidden border-l border-slate-200/80 animate-in slide-in-from-right duration-300 top-0">
        {/* Header Section */}
        <div className="px-6 sm:px-7 pt-5 pb-4 border-b border-slate-100 bg-white shrink-0 space-y-3">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold shadow-soft-xs">
              0{stage.number} {localizeBusinessValue(stage.title, language)}
            </span>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider">
              {t('roadmap.priority', 'Priority')}: {localizeBusinessValue(task.priority, language)}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{localizeBusinessValue(task.estimatedTime, language)}</span>
            </span>
          </div>

          {/* Title and Close Button */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {localizeBusinessValue(task.title, language)}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {t('roadmap.journeyBadge', 'Milestone Execution Workspace')} • {t('roadmap.stageLabel', 'Stage')} {stage.number} {t('dashboard.of', 'of')} {stages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={closeTaskDrawer}
              aria-label="Close drawer"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-soft-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-100 -mb-2 pt-2 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-emerald-600 text-emerald-900 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{t('advisor.executiveSummary', 'Overview & Steps')}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'overview'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {completedStepsCount}/{taskSteps.length}
              </span>
            </button>

            {taskRequiredDocs.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('docs')}
                className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'docs'
                    ? 'border-emerald-600 text-emerald-900 font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FolderCheck className="w-3.5 h-3.5" />
                <span>{t('dashboard.documentsVault', 'Documents Vault')}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
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
              className={`pb-3 px-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ai'
                  ? 'border-emerald-600 text-emerald-900 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('advisor.title', 'AI Advisor')}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                {t('common.live', 'Live')}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 custom-scrollbar bg-slate-50/40">
          {/* Status Alert Banner */}
          {isLocked ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-3 shadow-soft-xs">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">{t('roadmap.statusLocked', 'Prerequisites Required')}</strong>
                <span>
                  {t('roadmap.statusPending', 'Complete earlier checkpoints before working on this task')}:{' '}
                  {missingPrerequisites
                    .map((id) => localizeBusinessValue(allTasks.find((t) => t.id === id)?.title, language) || id)
                    .join(', ')}
                </span>
              </div>
            </div>
          ) : isCompleted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3 shadow-soft-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">{t('common.completed', 'This milestone has been verified & completed!')}</span>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                {t('dashboard.ready', 'Ready')}
              </span>
            </div>
          ) : null}

          {/* TAB 1: OVERVIEW & STEPS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Why This Matters (Stitch Glassmorphic Callout) */}
              <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/80 rounded-2xl p-5 shadow-soft-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span className="uppercase tracking-wider">{t('advisor.whyItMatters', 'Why This Matters')}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {localizeBusinessValue(task.whyThisMatters, language) || 'Validating real demand before purchasing machinery or leasing land saves your personal capital from high-risk ventures.'}
                </p>
              </div>

              {/* Execution Steps Section (Stitch Interactive Checklist) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      {t('advisor.actionChecklist', 'Execution Steps')}
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400">
                      • {t('roadmap.pipelineHint', 'Click to mark completed')}
                    </span>
                  </div>
                  <span className="text-xs text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {completedStepsCount} {t('dashboard.of', 'of')} {taskSteps.length} {t('common.completed', 'complete')}
                  </span>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${stepsProgressPercent}%` }}
                  />
                </div>

                {/* Step Cards List */}
                <div className="space-y-2.5 pt-1">
                  {taskSteps.map((step, idx) => {
                    const isStepDone = Boolean(completedStepsMap[idx]);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleTaskStep(task.id, idx)}
                        className={`group p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 select-none cursor-pointer ${
                          isStepDone
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-soft-xs'
                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-soft-sm text-slate-800'
                        }`}
                      >
                        {/* Checkbox Icon */}
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-all ${
                            isStepDone
                              ? 'bg-emerald-600 text-white shadow-soft-xs'
                              : 'border-2 border-slate-300 group-hover:border-emerald-500 bg-slate-50 text-slate-400'
                          }`}
                        >
                          {isStepDone ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <span className="text-[11px]">0{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Text */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm leading-relaxed ${
                            isStepDone ? 'text-emerald-950 font-semibold' : 'text-slate-800 font-medium'
                          }`}>
                            {localizeBusinessValue(step, language)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Inputs & Deliverables (Stitch Deliverables Section) */}
              {task.requiredInputs?.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t('advisor.requiredDocs', 'Required Deliverables & Inputs')}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {task.requiredInputs.map((input, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-soft-xs hover:border-emerald-300 transition-colors"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{localizeBusinessValue(input, language)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Downstream Unlocks (Stitch Next Milestones Card) */}
              {unlockedTasks.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <LockOpen className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('advisor.nextUnlock', 'What Completion Unlocks')}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {unlockedTasks.map((uTask) => (
                      <div
                        key={uTask.id}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 flex items-center justify-between shadow-soft-xs hover:border-emerald-300 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Rocket className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold truncate">{localizeBusinessValue(uTask.title, language)}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 shrink-0 ml-1">
                          {localizeBusinessValue(uTask.estimatedTime, language)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Government Schemes Linkage */}
              {task.relatedSchemes?.length > 0 && (
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-xs text-emerald-950 space-y-3 shadow-soft-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-700" />
                      <strong className="font-bold">{t('schemes.potentialBenefitsTitle', 'Government Scheme Linkage')}</strong>
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                      {profile.schemeMatchScore || '94% Match'}
                    </span>
                  </div>

                  <p className="text-emerald-800 text-xs leading-relaxed">
                    {t('schemes.eligible', 'Eligible')} <strong>{profile.recommendedScheme || 'PMFME'}</strong>
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    {task.id === 'scheme-selection' && !selectedSchemeId ? (
                      <button
                        type="button"
                        onClick={() => selectScheme('PMFME')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft-xs cursor-pointer"
                      >
                        {t('common.details', 'Select PMFME Scheme')}
                      </button>
                    ) : null}

                    <Link
                      to="/schemes"
                      className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                    >
                      <span>{t('dashboard.exploreSchemes', 'Explore in Scheme Matcher')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Funding & Capital Linkage */}
              {task.relatedFunding && (
                <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200/90 text-xs text-sky-950 space-y-3 shadow-soft-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-sky-700" />
                      <strong className="font-bold">{t('funding.capitalStackBadge', 'Capital Stack Structure')}</strong>
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-900">
                      {t('common.live', 'Live')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="bg-white p-3 rounded-xl border border-sky-200 shadow-soft-xs">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('funding.estimatedProjectCost', 'Project Cost')}</span>
                      <strong className="text-slate-900 text-xs">{localizeBusinessValue(profile.estimatedProjectCost, language)}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-sky-200 shadow-soft-xs">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('funding.availableMargin', 'Own Margin')}</span>
                      <strong className="text-amber-700 text-xs">{localizeBusinessValue(profile.availableCapital, language)}</strong>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-sky-200 shadow-soft-xs">
                      <span className="text-slate-400 block text-[9px] uppercase font-bold">{t('funding.fundingRequired', 'Funding Gap')}</span>
                      <strong className="text-sky-700 text-xs">{localizeBusinessValue(profile.fundingRequired, language)}</strong>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <Link
                      to="/funding"
                      className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline"
                    >
                      <span>{t('funding.fundingTitle', 'View Full Funding Architecture')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Professional Advisory Network */}
              {task.recommendedProfessionalCategory && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 shadow-soft-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-emerald-600" />
                      <strong className="font-bold text-slate-900">{t('nav.professionals', 'Verified Professional Network')}</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {localizeBusinessValue(task.recommendedProfessionalCategory, language)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Connect with certified MSME Chartered Accountants or DPR consultants to prepare your bank dossier.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/professionals"
                      className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                    >
                      <span>{t('nav.professionals', 'Find Verified Expert')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DOCUMENT VAULT & VERIFICATION */}
          {activeTab === 'docs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between shadow-soft-xs">
                <div className="flex items-center gap-2">
                  <FolderCheck className="w-4 h-4 text-emerald-700" />
                  <strong className="font-bold">{t('advisor.requiredDocs', 'Required Regulatory Documents')}</strong>
                </div>
                <span className="text-xs font-black text-emerald-800">
                  {completedDocsCount} / {taskRequiredDocs.length} {t('common.verified', 'Verified')}
                </span>
              </div>

              <div className="space-y-3">
                {taskRequiredDocs.map((doc) => {
                  const isVerified = Boolean(documentStatus[doc.id]);
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isVerified
                          ? 'bg-emerald-50/40 border-emerald-200 shadow-soft-xs'
                          : 'bg-white border-slate-200 shadow-soft-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isVerified ? (
                            <Check className="w-5 h-5 stroke-[2.5]" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{localizeBusinessValue(doc.name, language)}</span>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                              isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-50 text-rose-700'
                            }`}>
                              {isVerified ? t('common.verified', 'Verified') : t('schemes.mandatory', 'Required')}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">
                            {localizeBusinessValue(doc.category, language)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleDocumentStatus(doc.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                        >
                          {isVerified ? t('common.pending', 'Mark Pending') : t('dashboard.ready', 'Mark Ready')}
                        </button>

                        <button
                          type="button"
                          onClick={() => simulateDocumentUpload(doc.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-soft-xs cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isVerified ? t('common.edit', 'Replace') : t('roadmap.uploadAndVerify', 'Upload')}</span>
                        </button>
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

        {/* Sticky Action Footer (Stitch Premium Bottom Bar) */}
        <div className="px-6 py-4 border-t border-slate-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between gap-4 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-20">
          <span className="text-xs font-bold text-slate-500">
            {t('roadmap.stageLabel', 'Stage')} {stage.number} {t('dashboard.of', 'of')} {stages.length}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeTaskDrawer}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              {t('common.close', 'Close')}
            </button>

            <button
              type="button"
              onClick={() => {
                toggleTaskCompletion(task.id);
                closeTaskDrawer();
              }}
              disabled={isLocked}
              className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-soft-md transition-all flex items-center gap-2 cursor-pointer ${
                isCompleted
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : isLocked
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 hover:shadow-emerald-600/35 active:scale-[0.98]'
              }`}
            >
              {isCompleted ? (
                <span>{t('common.pending', 'Mark as Incomplete')}</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('roadmap.executeMilestone', 'Mark Milestone Complete')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
}
