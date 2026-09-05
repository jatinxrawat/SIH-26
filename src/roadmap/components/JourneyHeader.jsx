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
  Lock,
  Route,
  Check
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
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
          {/* AI Milestone Trigger */}
          <button
            type="button"
            onClick={() => setIsAIMilestoneModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-soft-xs flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Milestone</span>
          </button>

          {/* Print / Export button */}
          <button
            type="button"
            onClick={printRoadmapSummary}
            title="Print / Save Roadmap Dossier"
            className="p-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Export Dossier</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={resetJourney}
            title="Reset to Project Baseline"
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

      {/* 8-Stage Horizontal Timeline Stepper (Matching Reference Design) */}
      <div className="pt-2 pb-2">
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
          <div className="relative min-w-[780px] px-2 sm:px-6">
            {/* Background Continuous Horizontal Connecting Line */}
            <div className="absolute top-[22px] left-[6.25%] right-[6.25%] h-0.5 bg-slate-200 z-0" />

            {/* Filled Progress Line up to current active stage */}
            <div
              className="absolute top-[22px] left-[6.25%] h-0.5 bg-emerald-500 z-0 transition-all duration-500 ease-out"
              style={{
                width: `${(Math.max(0, stages.findIndex((s) => s.id === currentStageId)) / (stages.length - 1)) * 87.5}%`
              }}
            />

            {/* Stepper Node Columns */}
            <div className="relative z-10 flex items-start justify-between">
              {stages.map((stage) => {
                const stageTasks = allTasks.filter((t) => t.stage === stage.id);
                const stageEval = evaluateStageStatus(stage.id, stageTasks, completedTaskIds, currentStageId);
                const isCurrent = stage.id === currentStageId;
                const isCompleted = stageEval.status === 'COMPLETED';

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => handleStageClick(stage.id)}
                    className="group flex-1 flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-0.5 focus:outline-none select-none"
                  >
                    {/* Circle Node Badge */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isCurrent
                          ? 'bg-emerald-500 text-white ring-8 ring-emerald-100 shadow-sm'
                          : isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border-2 border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600 shadow-xs'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <span>0{stage.number}</span>
                      )}
                    </div>

                    {/* Stage Title */}
                    <span
                      className={`text-xs sm:text-sm font-bold mt-3 transition-colors ${
                        isCurrent
                          ? 'text-emerald-800 font-extrabold'
                          : isCompleted
                          ? 'text-slate-800 font-bold'
                          : 'text-slate-500 group-hover:text-slate-700'
                      }`}
                    >
                      {stage.shortName}
                    </span>

                    {/* Status Pill / Label */}
                    <div className="mt-1 h-6 flex items-center justify-center">
                      {isCurrent ? (
                        <span className="px-2 py-0.5 rounded-md border border-emerald-300 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                          CURRENT
                        </span>
                      ) : isCompleted ? (
                        <span className="text-[11px] font-semibold text-emerald-600">
                          Complete
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          Pending
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
