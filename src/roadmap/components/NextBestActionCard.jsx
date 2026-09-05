/**
 * NextBestActionCard Component
 * The visual centerpiece of the Business Compass roadmap.
 * Dynamically highlights the single highest priority action item derived from current state.
 */

import React from 'react';
import { Target, Clock, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export default function NextBestActionCard() {
  const { nextBestAction, openTaskDrawer, completedTaskIds } = useRoadmap();

  if (!nextBestAction) return null;

  const isCompleted = completedTaskIds.includes(nextBestAction.taskId);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-soft-xl border border-emerald-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          {/* Top Pill & Priority */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black tracking-wide">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>YOUR NEXT BEST ACTION</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-extrabold uppercase">
              Priority: {nextBestAction.priority}
            </span>

            <span className="inline-flex items-center gap-1 text-slate-300 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{nextBestAction.estimatedTime}</span>
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {nextBestAction.title}
            </h2>
          </div>

          {/* Why this matters & Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                Why this matters
              </span>
              <p className="text-slate-300 leading-relaxed">
                {nextBestAction.reason}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 block">
                Direct Impact
              </span>
              <p className="text-slate-300 leading-relaxed">
                {nextBestAction.impact}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-2">
          <button
            type="button"
            onClick={() => openTaskDrawer(nextBestAction.taskId)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-sm shadow-soft-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>{isCompleted ? 'Review Task' : 'Start Task'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-400 font-medium">
            Opens guided checklist & AI advisor
          </span>
        </div>
      </div>
    </div>
  );
}
