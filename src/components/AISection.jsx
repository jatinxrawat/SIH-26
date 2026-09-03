import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Database,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';

export default function AISection() {
  const [activeScenario, setActiveScenario] = useState('first-step');

  const scenarios = {
    'first-step': {
      user: "“What should I do first?”",
      ai: "“Based on your business profile, your first priority is to review the scheme you’re most likely to qualify for. It could reduce your current funding gap. Once that’s done, we’ll guide you through the documents needed for your funding plan.”",
      action1: "Review PMFME Scheme",
      action2: "View Required Documents",
      badge: "High Priority Step"
    },
    'bank-loan': {
      user: "“How much loan will the bank approve?”",
      ai: "“Under your structured capital stack for the ₹3.00 Lakh project, you need a bank term loan of ₹1.25 Lakh. With your ₹75,000 margin and the ₹1.00 Lakh PMFME capital subsidy, the lead bank branch in Mirzapur requires only the basic quotation report.”",
      action1: "Inspect Capital Breakdown",
      action2: "DPR Template Format",
      badge: "Financial Calculation"
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section id="ai" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/60 relative overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute -left-20 top-1/3 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Contextual AI Architecture"
          title="AI that understands the journey — not just the question."
          subtitle="UdyamSaathi doesn’t treat every conversation as a blank chat. Its AI works with your business profile, matched schemes, funding plan, roadmap, and progress to provide context-aware guidance."
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          
          {/* Cool Scenario Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300/70 shadow-soft-sm text-xs font-semibold">
              <span className="text-[11px] font-bold text-slate-500 px-2.5 uppercase tracking-wider hidden sm:inline">
                Test Prompt:
              </span>
              <button
                onClick={() => setActiveScenario('first-step')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeScenario === 'first-step'
                    ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Query 1: What should I do first?
              </button>
              <button
                onClick={() => setActiveScenario('bank-loan')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeScenario === 'bank-loan'
                    ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Query 2: Bank Loan Sizing
              </button>
            </div>
          </div>

          {/* Chat Mockup Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card-lift overflow-hidden">
            
            {/* Top Bar with Context Memory Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">UdyamSaathi AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">Session ID: SITA-UP-4902</span>
                </div>
              </div>

              {/* Label as mandated */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Context-aware AI guidance</span>
              </div>
            </div>

            {/* Active Context Memory Chips (Shows how AI is grounded) */}
            <div className="bg-slate-50 border-b border-slate-200/80 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600">
              <span className="font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Database className="w-3 h-3 text-slate-400" /> Active Context:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shrink-0">
                Food Processing (Micro)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shrink-0">
                District: Mirzapur, UP
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium shrink-0">
                PMFME Matched (₹1.00L)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shrink-0">
                Funding Gap: ₹2.25L
              </span>
            </div>

            {/* Chat Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* User Message */}
              <div className="flex items-start gap-3 sm:gap-4 justify-end">
                <div className="max-w-md bg-slate-900 text-white rounded-2xl rounded-tr-sm p-4 text-sm sm:text-base font-medium shadow-soft-sm">
                  {current.user}
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                  SD
                </div>
              </div>

              {/* AI Response (Exact mandated copy) */}
              <div className="flex items-start gap-3 sm:gap-4 justify-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-soft-sm">
                  <Bot className="w-5 h-5" />
                </div>
                
                <div className="max-w-xl bg-emerald-50/70 border border-emerald-200/80 rounded-2xl rounded-tl-sm p-5 text-slate-800 shadow-soft-sm">
                  <p className="text-sm sm:text-base leading-relaxed">
                    {current.ai}
                  </p>

                  {/* Grounded Action Pills Attached by AI */}
                  <div className="mt-4 pt-3.5 border-t border-emerald-200/60 flex flex-wrap items-center gap-2">
                    <a
                      href="#features"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-soft-sm transition-colors"
                    >
                      <span>{current.action1}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="#features"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-soft-sm transition-colors"
                    >
                      <span>{current.action2}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Architecture Transparency Note */}
            <div className="bg-slate-50 border-t border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Responsible AI:</strong> AI references deterministic rules and official ministry guidelines. It never estimates eligibility numbers on speculation.
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide shrink-0">
                Rule-Engine Grounded
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
