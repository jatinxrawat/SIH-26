import React, { useState } from 'react';
import { Bot, Sparkles, Send, ShieldCheck, CornerDownLeft, CheckCircle2 } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useAuth } from '../context/AuthContext';

export default function AdvisorPage() {
  const { profile } = useEntrepreneurProfile();
  const { currentUser, userProfile } = useAuth();
  const [inputVal, setInputVal] = useState('');

  const displayName = profile?.personalInfo?.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';
  const businessName = profile?.business?.name || 'Your Enterprise';
  const sector = profile?.business?.sector || 'General';
  const businessDescription = profile?.business?.description || profile?.business?.productService || '';
  const state = profile?.personalInfo?.state || 'India';

  const suggestedPrompts = [
    '“Which government scheme offers the highest capital subsidy for my business?”',
    '“How much margin money will banks ask for under PMEGP or Mudra?”',
    '“What mandatory compliance licenses are required before I start selling?”',
    '“Can you review my 12-month milestone timeline?”'
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                AI Business Advisor
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Context-Aware Model
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Trained on Indian MSME schemes, banking appraisal norms, and local regulatory guidelines.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/70 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Profile Active: {businessName}</span>
        </div>
      </div>

      {/* Main Chat Log Area */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm p-5 sm:p-8 overflow-y-auto space-y-6">
        {/* System Initial Message */}
        <div className="flex items-start gap-3.5 max-w-2xl">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-4 h-4" />
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-4 text-xs sm:text-sm text-slate-800 space-y-2">
            <p className="font-bold text-slate-900">
              Namaste {displayName}! I am your UdyamSaathi AI Business Advisor.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I have loaded your enterprise profile for <strong className="text-slate-900">{businessName}</strong> ({businessDescription ? `specializing in "${businessDescription}"` : `${sector} sector`}, {state}).
            </p>
            <p className="text-slate-600 leading-relaxed">
              I will help you understand your next best steps, government subsidy options, institutional bank loans, and license applications without jargon.
            </p>
          </div>
        </div>

        {/* Suggested Prompts Grid */}
        <div className="pt-4 border-t border-slate-100 max-w-2xl">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Suggested Queries for Your Stage
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputVal(prompt.replace(/[“”]/g, ''))}
                className="p-3 text-left rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-200 text-xs text-slate-700 font-medium transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disabled Interactive Chat Input with Notice */}
      <div className="shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm p-3">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled
            placeholder="AI Business Advisor engine is connecting in the next phase..."
            className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-500 cursor-not-allowed focus:outline-none"
          />
          <button
            type="button"
            disabled
            className="absolute right-2 px-4 py-2 bg-slate-300 text-white rounded-xl text-xs font-bold cursor-not-allowed flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Model integrations are being plugged in. Your profile context is primed and ready.
        </p>
      </div>
    </div>
  );
}
