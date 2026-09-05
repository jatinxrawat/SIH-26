import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, Building2 } from 'lucide-react';

export default function SchemeMatchingLoader({ onComplete, businessName = 'Your Enterprise' }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { text: 'Checking state, district & rural/urban location parameters' },
    { text: 'Evaluating business sector, enterprise scale & trade category' },
    { text: 'Verifying social category, gender incentives & age bounds' },
    { text: 'Comparing capital subsidy percentage vs funding requirement' },
    { text: 'Generating deterministic match scores & ranking opportunities' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="py-14 sm:py-20 flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-300">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-soft-md">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold ring-4 ring-white">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
        <Building2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Evaluating Profile for {businessName}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        Analyzing Government Support Opportunities
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
        Running deterministic eligibility verification across verified Central and State MSME schemes.
      </p>

      {/* Verification Step Checklist */}
      <div className="mt-8 w-full max-w-md bg-white rounded-2xl border border-slate-200/90 p-5 shadow-soft-sm text-left space-y-3">
        {steps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 ${
                isDone
                  ? 'text-emerald-700 font-semibold'
                  : isCurrent
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-400 font-normal'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
              )}
              <span className="truncate">{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
