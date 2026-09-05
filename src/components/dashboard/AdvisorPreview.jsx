import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function AdvisorPreview() {
  const sampleTopics = [
    'Government schemes & subsidy matching',
    'Bank loan eligibility and margin requirements',
    'Mandatory licenses (Udyam, GST, FSSAI)',
    '12-Month milestone execution plan'
  ];

  return (
    <div className="bg-sand/40 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                AI Companion
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Your Business Advisor
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Need guidance on what to do next? Your contextual AI advisor works with your specific profile parameters.
        </p>

        <div className="mt-4 space-y-2">
          {sampleTopics.map((topic, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/60">
        <Link
          to="/advisor"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-soft-sm group"
        >
          <span>Consult AI Advisor</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
