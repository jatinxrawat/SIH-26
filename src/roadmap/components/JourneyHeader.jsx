/**
 * JourneyHeader Component (Upgraded)
 * Premium hero section with interactive 8-stage pipeline, AI milestone generator button,
 * print export, and persona switcher.
 */

import React from 'react';
import {
  Sparkles,
  MapPin,
  Building2,
  RotateCcw,
  UserCheck,
  ChevronRight,
  Printer,
  PlusCircle,
  CheckCircle2,
  CircleDot,
  Lock
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { evaluateStageStatus } from '../engine/dependencyEngine';

export default function JourneyHeader() {
  const {
    profile,
    stages,
    allTasks,
    completedTaskIds,
    currentStageId,
    overallProgress,
    activePersonaKey,
    switchPersona,
    resetJourney,
    setExpandedStageId,
    setIsAIMilestoneModalOpen,
    printRoadmapSummary
  } = useRoadmap();

  const currentStageObj = stages.find((s) => s.id === currentStageId) || stages[0];

  const getJourneyStatus = (progress) => {
    if (progress < 25) return "You're building the foundational validation for your enterprise.";
    if (progress < 50) return "You're structuring unit economics and tapping government support.";
    if (progress < 75) return "You're finalizing credit linkages and statutory registrations.";
    if (progress < 100) return "You're in the final operational sprint toward commercial launch.";
    return "Commercial enterprise active. Focused on working capital & digital scale.";
  };

  const handleStageClick = (stageId) => {
    setExpandedStageId(stageId);
    const element = document.getElementById(`stage-${stageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Top Bar: Persona info & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Business Journey Engine</span>
            </span>

            <span className="text-xs text-slate-300 font-medium">•</span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-700 font-bold">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{profile.businessName}</span>
            </span>

            <span className="text-xs text-slate-300 font-medium">•</span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Personalized Business Roadmap
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
            {getJourneyStatus(overallProgress)}
          </p>
        </div>

        {/* Right Action Bar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center">
          {/* AI Milestone Trigger */}
          <button
            type="button"
            onClick={() => setIsAIMilestoneModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-soft-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Milestone</span>
          </button>

          {/* Persona Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => switchPersona('sita')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activePersonaKey === 'sita'
                  ? 'bg-white text-emerald-800 shadow-soft-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sita (Demo)</span>
            </button>

            <button
              type="button"
              onClick={() => switchPersona('priya')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activePersonaKey === 'priya'
                  ? 'bg-white text-emerald-800 shadow-soft-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Priya</span>
            </button>
          </div>

          {/* Print / Export button */}
          <button
            type="button"
            onClick={printRoadmapSummary}
            title="Print / Save Roadmap Dossier"
            className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={resetJourney}
            title="Reset to Demo Baseline"
            className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Active Stage Card & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-soft-sm shrink-0">
            0{currentStageObj.number}
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 block">
              Active Milestone Stage
            </span>
            <div className="text-sm sm:text-base font-black text-slate-900">
              {currentStageObj.title}
            </div>
            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
              {currentStageObj.tagline}
            </p>
          </div>
        </div>

        {/* Calculated Progress Bar */}
        <div className="sm:w-72 space-y-1.5 shrink-0">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-bold">Overall Progress</span>
            <span className="text-emerald-800 font-black text-sm">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: 8-Stage Interactive Pipeline */}
      <div className="pt-2">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center min-w-[760px] justify-between text-xs">
            {stages.map((stage, idx) => {
              const stageTasks = allTasks.filter((t) => t.stage === stage.id);
              const stageEval = evaluateStageStatus(stage.id, stageTasks, completedTaskIds, currentStageId);
              const isCurrent = stage.id === currentStageId;
              const isCompleted = stageEval.status === 'COMPLETED';

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => handleStageClick(stage.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl transition-all text-left ${
                      isCurrent
                        ? 'bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30 font-black shadow-soft-xs'
                        : isCompleted
                        ? 'text-slate-800 hover:bg-slate-50 font-bold'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600 font-medium'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-300'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `0${stage.number}`}
                    </span>
                    <span className="whitespace-nowrap">{stage.shortName}</span>
                  </button>

                  {idx < stages.length - 1 && (
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isCompleted ? 'text-emerald-500' : 'text-slate-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
