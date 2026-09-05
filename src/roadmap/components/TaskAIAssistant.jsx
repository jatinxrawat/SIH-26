/**
 * TaskAIAssistant Component
 * Embedded AI advisor inside the Task Detail Drawer.
 * Allows switching between Gemini and Groq with structured, actionable MSME advice.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Check,
  ShieldAlert,
  ArrowRight,
  Loader2,
  CheckCircle2,
  RefreshCw,
  FileCheck,
  Compass,
  Cpu,
  Zap
} from 'lucide-react';
import { aiService } from '../services/aiService';

export default function TaskAIAssistant({ task, businessContext }) {
  const [provider, setProvider] = useState('gemini');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [planAccepted, setPlanAccepted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  const biz = useMemo(() => businessContext || {}, [businessContext]);
  const bizName = biz.businessName || biz.name || 'Your Enterprise';
  const bizSector = biz.sector || biz.industry || 'General';
  const bizLocation = biz.location || 'India';

  const quickPrompts = useMemo(() => [
    `How do I execute "${task?.shortTitle || task?.title || 'this milestone'}" step-by-step?`,
    'What common mistakes do first-time entrepreneurs make here?',
    'What specific proof do banks or subsidy officers look for?',
    'How do I minimize costs while validating this milestone?'
  ], [task?.shortTitle, task?.title]);

  const handleAsk = async (queryText = null, targetProvider = provider) => {
    const textToSend = queryText || question || `Provide a step-by-step tactical execution guide for ${task?.title || 'this task'}`;
    if (!textToSend.trim() && !task) return;

    setLoading(true);
    setPlanAccepted(false);
    try {
      const result = await aiService.askAI({
        provider: targetProvider,
        task: task || {},
        context: {
          ...biz,
          businessName: bizName,
          sector: bizSector,
          location: bizLocation
        },
        question: textToSend
      });
      if (result) {
        setAiResponse(result);
        setCompletedSteps({});
      }
    } catch (err) {
      console.error('AI call error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate initial guidance when component loads for this task
  useEffect(() => {
    if (!aiResponse && !loading && task?.id) {
      handleAsk(`How should ${bizName} execute "${task.shortTitle || task.title}" step-by-step?`, provider);
    }
  }, [task?.id]);

  const handleSwitchProvider = (newProvider) => {
    if (newProvider === provider) return;
    setProvider(newProvider);
    handleAsk(null, newProvider);
  };

  const toggleStepCompleted = (idx) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 space-y-4 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {/* Header & Provider Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/90 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-white tracking-tight">AI Task Advisor</h4>
              <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized for <strong className="text-slate-200">{bizName}</strong> ({bizSector})
            </p>
          </div>
        </div>

        {/* Gemini vs Groq Toggle */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs self-start sm:self-auto shadow-inner">
          <button
            type="button"
            onClick={() => handleSwitchProvider('gemini')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              provider === 'gemini'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-200" />
            <span>Gemini Flash</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchProvider('grok')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              provider === 'grok'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-300" />
            <span>Groq Ultra-Fast</span>
          </button>
        </div>
      </div>

      {/* Suggested Inquiries */}
      <div className="space-y-1.5 relative z-10">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-emerald-400" />
          <span>Recommended Inquiries</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuestion(prompt);
                handleAsk(prompt, provider);
              }}
              disabled={loading}
              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/70 hover:border-emerald-500/50 transition-all cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 relative z-10">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder={`Ask ${provider === 'gemini' ? 'Gemini' : 'Groq'} about "${task?.title || 'this task'}"...`}
          className="flex-1 bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 transition-all"
        />
        <button
          type="button"
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-emerald-950"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Advisor</span>
            </>
          )}
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && !aiResponse && (
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3 animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-1/3" />
          <div className="h-3 bg-slate-700/60 rounded w-5/6" />
          <div className="h-3 bg-slate-700/60 rounded w-4/6" />
          <div className="pt-2 grid grid-cols-2 gap-2">
            <div className="h-16 bg-slate-800 rounded-xl" />
            <div className="h-16 bg-slate-800 rounded-xl" />
          </div>
        </div>
      )}

      {/* Structured AI Response View */}
      {aiResponse && (
        <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700/80 space-y-4 text-xs text-slate-300 animate-in fade-in duration-200 relative z-10 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
            <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{aiResponse.provider || 'AI Business Advisor'}</span>
            </span>

            <div className="flex items-center gap-2">
              {aiResponse.isLive ? (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Live Model Output
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-bold">
                  MSME Knowledge Norms
                </span>
              )}

              <button
                type="button"
                onClick={() => handleAsk(null, provider)}
                disabled={loading}
                title="Regenerate"
                className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* ANSWER / EXECUTIVE SUMMARY */}
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">
              Executive Summary & Strategy
            </span>
            <p className="text-white text-xs sm:text-[13px] leading-relaxed font-medium">
              {aiResponse.answer}
            </p>
          </div>

          {/* WHY IT MATTERS */}
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 block mb-1">
              Why This Is Critical For Your Business
            </span>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              {aiResponse.why}
            </p>
          </div>

          {/* WHAT TO DO (Interactive Action Checklist) */}
          {aiResponse.whatToDo && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  Step-by-Step Action Checklist
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Click steps as you complete them
                </span>
              </div>
              <ul className="space-y-1.5">
                {(Array.isArray(aiResponse.whatToDo) ? aiResponse.whatToDo : [aiResponse.whatToDo]).map((step, idx) => {
                  const isDone = Boolean(completedSteps[idx]);
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleStepCompleted(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200 line-through opacity-75'
                          : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600 text-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-700 text-slate-300 border border-slate-600'
                        }`}
                      >
                        {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                      </button>
                      <span className="text-[11px] sm:text-xs leading-snug">{step}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* DOCUMENTS & NEXT STEP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Required Documentation</span>
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{aiResponse.documents || 'None required'}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <RocketIcon className="w-3.5 h-3.5" />
                <span>Next Best Action</span>
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{aiResponse.nextStep || 'Proceed to subsequent task'}</p>
            </div>
          </div>

          {/* WARNINGS & COMPLIANCE TRAPS */}
          {aiResponse.warnings && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block font-black text-[10px] uppercase tracking-wide">
                  Compliance Risk & Middleman Warning
                </strong>
                <span className="text-[11px] sm:text-xs text-rose-200 leading-snug">{aiResponse.warnings}</span>
              </div>
            </div>
          )}

          {/* Use this plan CTA */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-700/70">
            <span className="text-[11px] text-slate-400">
              {Object.keys(completedSteps).filter((k) => completedSteps[k]).length} of{' '}
              {Array.isArray(aiResponse.whatToDo) ? aiResponse.whatToDo.length : 1} action items completed
            </span>

            <button
              type="button"
              onClick={() => setPlanAccepted(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                planAccepted
                  ? 'bg-emerald-600 text-white font-black shadow-lg shadow-emerald-900/50'
                  : 'bg-white hover:bg-slate-100 text-slate-950 shadow-md'
              }`}
            >
              {planAccepted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Plan Integrated</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Adopt This Plan</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RocketIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 9V4s3.03.55 4 2c1.08 1.62 0 5 0 5" />
    </svg>
  );
}
