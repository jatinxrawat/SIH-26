/**
 * JourneyHeader Component
 * Top section displaying business context, calculated progress, compact 8-stage visual pipeline,
 * and demo persona switcher for judges.
 */

import React from 'react';
import { Sparkles, MapPin, Building2, RotateCcw, UserCheck, ChevronRight } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export default function JourneyHeader() {
  const {
    profile,
    stages,
    currentStageId,
    overallProgress,
    activePersonaKey,
    switchPersona,
    resetJourney,
    setExpandedStageId
  } = useRoadmap();

  const currentStageObj = stages.find((s) => s.id === currentStageId) || stages[0];

  // Dynamic slogan based on overall progress
  const getJourneyStatus = (progress) => {
    if (progress < 25) return "You're building the foundational validation for your enterprise.";
    if (progress < 50) return "You're structuring unit economics and tapping government support.";
    if (progress < 75) return "You're finalizing credit linkages and statutory registrations.";
    if (progress < 100) return "You're in the final operational sprint toward commercial launch.";
    return "Commercial enterprise active. Focused on working capital & digital scale.";
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Top Bar: Persona info & Demo selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Business Journey Engine</span>
            </span>

            <span className="text-xs text-slate-400 font-medium">•</span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.businessName}</span>
            </span>

            <span className="text-xs text-slate-400 font-medium">•</span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Personalized Business Roadmap
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            {getJourneyStatus(overallProgress)}
          </p>
        </div>

        {/* Right side: Demo Persona Switcher & Reset Button */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
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
              <span>Sita Sharma (SIH Demo)</span>
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
              <span>Priya (Agro Unit)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetJourney}
            title="Reset Journey to Demo Baseline"
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Current Stage & Overall Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">
              Current Stage
            </span>
            <div className="text-sm font-black text-emerald-900 flex items-center gap-1.5">
              <span>0{currentStageObj.number} {currentStageObj.title}</span>
            </div>
          </div>

          <div className="hidden md:block text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{currentStageObj.tagline}</span>
            <p className="text-[11px] text-slate-400 line-clamp-1">{currentStageObj.objective}</p>
          </div>
        </div>

        {/* Calculated Progress Bar */}
        <div className="sm:w-64 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-500">Overall Completion</span>
            <span className="text-emerald-700 font-black">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Compact 8-Stage Visual Pipeline */}
      <div className="pt-2 border-t border-slate-100">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center min-w-[720px] justify-between text-xs">
            {stages.map((stage, idx) => {
              const isCurrent = stage.id === currentStageId;
              const isPast = stage.number < currentStageObj.number;

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => setExpandedStageId(stage.id)}
                    className={`flex items-center gap-2 p-2 rounded-xl transition-all text-left ${
                      isCurrent
                        ? 'bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30 font-black'
                        : isPast
                        ? 'text-slate-800 hover:bg-slate-50 font-semibold'
                        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isCurrent
                          ? 'bg-emerald-600 text-white shadow-soft-sm'
                          : isPast
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isPast ? '✓' : `0${stage.number}`}
                    </span>
                    <span className="whitespace-nowrap">{stage.shortName}</span>
                  </button>

                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
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
