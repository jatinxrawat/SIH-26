/**
 * TaskAIAssistant Component
 * Embedded AI advisor inside the Task Detail Drawer.
 * Branded natively as UdyamSaathi Intelligence (Saathi Strategy Core & Saathi Tactical Core).
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
  Copy,
  Zap,
  BrainCircuit,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { aiService } from '../services/aiService';

// Strict model name sanitizer so no external AI model names ever leak to the user
const formatEngineName = (name, fallback = 'Saathi Strategic Advisor') => {
  if (!name) return fallback;
  if (/gemini/i.test(name)) return 'Saathi Strategic Advisor';
  if (/gro[kq]/i.test(name)) return 'Saathi Tactical Engine';
  if (/openai|gpt/i.test(name)) return 'Saathi MSME Intelligence';
  return name;
};

export default function TaskAIAssistant({ task, businessContext }) {
  const [provider, setProvider] = useState('gemini'); // 'gemini' = Strategy Core, 'grok' = Tactical Core
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [planAccepted, setPlanAccepted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  const biz = useMemo(() => businessContext || {}, [businessContext]);
  const bizName = biz.businessName || biz.name || 'Your Enterprise';
  const bizSector = biz.sector || biz.industry || 'General';
  const bizLocation = biz.location || 'India';

  const quickPrompts = useMemo(() => [
    `How do I execute "${task?.shortTitle || task?.title || 'this milestone'}" step-by-step?`,
    'What common mistakes do first-time entrepreneurs make here?',
    'What specific evidence do banks or subsidy officers inspect?',
    'How do I minimize initial costs during demand validation?'
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
      console.error('Advisor inference error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate guidance upon opening this task
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

  const handleCopyAdvice = () => {
    if (!aiResponse) return;
    const text = `[UdyamSaathi AI Advisor - ${task?.title}]\n\nStrategy: ${aiResponse.answer}\n\nWhy it matters: ${aiResponse.why}\n\nSteps:\n` +
      (Array.isArray(aiResponse.whatToDo) ? aiResponse.whatToDo.map((s, i) => `${i + 1}. ${s}`).join('\n') : aiResponse.whatToDo) +
      `\n\nRequired Documents: ${aiResponse.documents}\nNext Step: ${aiResponse.nextStep}\nCompliance Warning: ${aiResponse.warnings}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stepsList = Array.isArray(aiResponse?.whatToDo)
    ? aiResponse.whatToDo
    : aiResponse?.whatToDo
    ? [aiResponse.whatToDo]
    : [];

  const completedCount = Object.keys(completedSteps).filter((k) => completedSteps[k]).length;
  const progressPercent = stepsList.length > 0 ? Math.round((completedCount / stepsList.length) * 100) : 0;

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-5 sm:p-6 space-y-5 border border-slate-800/90 shadow-2xl relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-white tracking-tight">Saathi AI Advisor</h4>
              <span className="text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-sm shrink-0">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Calibrated for <strong className="text-slate-200 font-semibold">{bizName}</strong> ({bizSector})
            </p>
          </div>
        </div>

        {/* Platform Branded Engine Selector (Compact Segmented Slider) */}
        <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/70 text-[11px] self-start sm:self-auto shadow-inner">
          <button
            type="button"
            onClick={() => handleSwitchProvider('gemini')}
            title="Strategic MSME analysis with DPR and scheme linkages"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              provider === 'gemini'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
            }`}
          >
            <BrainCircuit className="w-3 h-3 text-emerald-200" />
            <span>Strategy Core</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchProvider('grok')}
            title="High-speed execution blueprints and actionable checklists"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              provider === 'grok'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
            }`}
          >
            <Zap className="w-3 h-3 text-amber-300" />
            <span>Tactical Core</span>
          </button>
        </div>
      </div>

      {/* Suggested Inquiries (Modern Pill Chips) */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-emerald-400" />
            <span>Recommended Inquiries</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Click to execute query</span>
        </div>
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
              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/70 hover:border-emerald-500/40 hover:shadow-soft-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5 group"
            >
              <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-none">{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Query Input Bar */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="relative flex-1">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder={`Ask Saathi Advisor about "${task?.title || 'this milestone'}"...`}
            className="w-full bg-slate-800/90 border border-slate-700/80 text-white placeholder-slate-500 rounded-xl pl-4 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
          />
          {question && (
            <button
              type="button"
              onClick={() => setQuestion('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md shadow-emerald-950"
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

      {/* Loading Shimmer State */}
      {loading && !aiResponse && (
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3.5 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-slate-700 rounded-lg w-1/3" />
            <div className="h-4 bg-slate-700 rounded-lg w-16" />
          </div>
          <div className="h-3 bg-slate-700/60 rounded-lg w-5/6" />
          <div className="h-3 bg-slate-700/60 rounded-lg w-4/6" />
          <div className="pt-2 grid grid-cols-2 gap-2.5">
            <div className="h-16 bg-slate-800/80 rounded-xl" />
            <div className="h-16 bg-slate-800/80 rounded-xl" />
          </div>
        </div>
      )}

      {/* Structured AI Response View */}
      {aiResponse && (
        <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700/80 space-y-4 text-xs text-slate-300 animate-in fade-in duration-200 relative z-10 shadow-lg">
          {/* Response Sub-Header */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formatEngineName(aiResponse.provider, provider === 'gemini' ? 'Saathi Strategy Advisor' : 'Saathi Tactical Engine')}</span>
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-bold border border-emerald-500/30">
                Verified MSME Logic
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyAdvice}
                title="Copy advice to clipboard"
                className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAsk(null, provider)}
                disabled={loading}
                title="Regenerate guidance"
                className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* 1. EXECUTIVE SUMMARY & STRATEGY */}
          <div>
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">
              Executive Strategy & Direct Answer
            </span>
            <p className="text-white text-xs sm:text-[13px] leading-relaxed font-medium">
              {aiResponse.answer}
            </p>
          </div>

          {/* 2. WHY THIS IS CRITICAL */}
          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 block mb-1">
              Why This Step Matters For Your Business
            </span>
            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
              {aiResponse.why}
            </p>
          </div>

          {/* 3. STEP-BY-STEP ACTION CHECKLIST */}
          {stepsList.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                  Action Checklist ({completedCount}/{stepsList.length} done)
                </span>
                <span className="text-[10px] font-semibold text-emerald-400">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <ul className="space-y-1.5">
                {stepsList.map((step, idx) => {
                  const isDone = Boolean(completedSteps[idx]);
                  return (
                    <li
                      key={idx}
                      onClick={() => toggleStepCompleted(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200 line-through opacity-75'
                          : 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600 text-slate-200'
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

          {/* 4. DOCUMENTS & NEXT BEST ACTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Required Documentation</span>
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{aiResponse.documents || 'No statutory filings required'}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <RocketIcon className="w-3.5 h-3.5" />
                <span>Subsequent Unlock</span>
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{aiResponse.nextStep || 'Proceeds to following milestone'}</p>
            </div>
          </div>

          {/* 5. WARNINGS & COMPLIANCE TRAPS */}
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

          {/* 6. ACTION FOOTER */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-700/70">
            <span className="text-[11px] text-slate-400">
              {completedCount} of {stepsList.length} steps checked
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
