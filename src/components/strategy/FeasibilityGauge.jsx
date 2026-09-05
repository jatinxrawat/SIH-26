import React from 'react';
import { Target, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export default function FeasibilityGauge({ feasibility }) {
  const snapshot = feasibility?.snapshot || {};
  const scoreData = feasibility?.strategyScore || { score: 75, ratingLabel: 'Promising' };

  const dimensions = [
    { label: 'Market Opportunity', value: snapshot.marketOpportunity || 'High', badge: 'bg-emerald-100 text-emerald-800' },
    { label: 'Local Competition', value: snapshot.competition || 'Moderate', badge: 'bg-amber-100 text-amber-800' },
    { label: 'Pricing Potential', value: snapshot.pricingPotential || 'Good', badge: 'bg-emerald-100 text-emerald-800' },
    { label: 'Supply Chain Risk', value: snapshot.supplyRisk || 'Moderate', badge: 'bg-amber-100 text-amber-800' },
    { label: 'Financial Risk', value: snapshot.financialRisk || 'Moderate', badge: 'bg-sky-100 text-sky-800' }
  ];

  const score = scoreData.score;
  const strokeDashoffset = 283 - (283 * score) / 100;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-1">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-Dimensional Feasibility Snapshot</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Local Business Viability Outlook
          </h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Outlook</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wide">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{snapshot.overallOutlook}</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Gauge Circle + Dimension Pills */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Score Radial Ring */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG Circular Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-slate-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-900 leading-none">{score}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">out of 100</span>
            </div>
          </div>

          <div className="mt-3">
            <strong className="text-xs font-extrabold text-slate-900 block">{scoreData.ratingLabel}</strong>
            <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">Indicative Strategy Score</span>
          </div>
        </div>

        {/* 5-Dimension Cards */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dimensions.map((dim, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">{dim.label}</span>
              <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${dim.badge}`}>
                {dim.value}
              </span>
            </div>
          ))}

          {/* Key Outlook Reason Card */}
          <div className="sm:col-span-2 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950">
            <strong className="font-extrabold text-emerald-900 block mb-0.5">Outlook Assessment:</strong>
            {snapshot.outlookReason}
          </div>
        </div>
      </div>

      {/* Advisory Note */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong>Advisory Notice:</strong> The Indicative Strategy Score is an internal planning guidance indicator measuring market reach, margin viability, and capital buffer. It is an advisory assessment, not an official credit underwriting score or a commercial guarantee of business success.
        </div>
      </div>
    </div>
  );
}
