/**
 * NextBestActionCard Component (Upgraded Centerpiece)
 * The visual and operational centerpiece of the Business Journey Engine.
 * Features inline quick AI execution blueprints, 1-click completion, and clear unlocks.
 */

import React, { useState } from 'react';
import {
  Target,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { aiService } from '../services/aiService';

export default function NextBestActionCard() {
  const {
    nextBestAction,
    openTaskDrawer,
    completedTaskIds,
    toggleTaskCompletion,
    profile
  } = useRoadmap();

  const [isQuickAIExpanded, setIsQuickAIExpanded] = useState(false);
  const [quickAIContent, setQuickAIContent] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  if (!nextBestAction) return null;

  const isCompleted = completedTaskIds.includes(nextBestAction.taskId);

  const handleFetchQuickAI = async () => {
    if (quickAIContent) {
      setIsQuickAIExpanded(!isQuickAIExpanded);
      return;
    }

    setAiLoading(true);
    setIsQuickAIExpanded(true);

    try {
      const response = await aiService.askAI({
        provider: 'groq',
        task: {
          title: nextBestAction.title,
          whyThisMatters: nextBestAction.reason
        },
        context: {
          businessName: profile.businessName,
          sector: profile.industry,
          location: profile.location
        },
        question: `Give me a rapid 3-step execution plan and compliance checklist for "${nextBestAction.title}".`
      });

      setQuickAIContent(response);
    } catch (err) {
      console.error('Quick AI error:', err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-soft-xl border border-emerald-500/25">
      {/* Ambient Radial Lighting Glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header & Priority Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
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

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {nextBestAction.title}
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 self-start lg:self-center">
            {/* Quick AI Blueprint Button */}
            <button
              type="button"
              onClick={handleFetchQuickAI}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-emerald-300 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              {aiLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Quick AI Plan</span>
              {isQuickAIExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 ml-1" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              )}
            </button>

            {/* Start Task Button (Opens Drawer) */}
            <button
              type="button"
              onClick={() => openTaskDrawer(nextBestAction.taskId)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-xs shadow-soft-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>{isCompleted ? 'Review Task' : 'Start Task'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Mark Complete Button */}
            <button
              type="button"
              onClick={() => toggleTaskCompletion(nextBestAction.taskId)}
              className={`p-3.5 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border-white/10'
              }`}
              title={isCompleted ? 'Mark Incomplete' : 'Quick Complete'}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Why this matters & Direct Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
              Why this matters
            </span>
            <p className="text-slate-300 leading-relaxed">
              {nextBestAction.reason}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400 block">
              Direct Impact & Unlocks
            </span>
            <p className="text-slate-300 leading-relaxed">
              {nextBestAction.impact}
            </p>
          </div>
        </div>

        {/* Expandable Quick AI Blueprint Panel */}
        {isQuickAIExpanded && (
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 text-xs text-slate-200 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>Live AI Blueprint ({quickAIContent?.provider || 'Groq Fast Engine'})</span>
              </span>
              <button
                type="button"
                onClick={() => openTaskDrawer(nextBestAction.taskId)}
                className="text-xs text-emerald-400 hover:underline font-bold"
              >
                Open Full Guided Workspace →
              </button>
            </div>

            {aiLoading ? (
              <div className="py-6 flex items-center justify-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Generating live action blueprint for {profile.businessName}...</span>
              </div>
            ) : quickAIContent ? (
              <div className="space-y-3">
                <p className="text-white font-medium leading-relaxed">
                  {quickAIContent.answer}
                </p>

                {quickAIContent.whatToDo && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                      Immediate Action Steps:
                    </span>
                    {(Array.isArray(quickAIContent.whatToDo) ? quickAIContent.whatToDo : [quickAIContent.whatToDo]).map((s, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                )}

                {quickAIContent.warnings && (
                  <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-200 text-[11px] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{quickAIContent.warnings}</span>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
