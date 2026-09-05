import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles, AlertTriangle, Layers } from 'lucide-react';

export default function SwotGrid({ swot }) {
  const strengths = swot?.strengths || [];
  const weaknesses = swot?.weaknesses || [];
  const opportunities = swot?.opportunities || [];
  const threats = swot?.threats || [];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>SIH Pillar 3 — Contextual Strategic Matrix</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Profile & Budget-Grounded SWOT Analysis
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrated strictly against your registered capital, enterprise stage, and local district realities.
          </p>
        </div>
      </div>

      {/* 4-Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Quadrant 1: Strengths */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wider">
                Strengths (Internal Advantages)
              </h4>
            </div>

            <ul className="space-y-3">
              {strengths.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-emerald-100 shadow-sm">
                  <strong className="font-bold text-emerald-900 block mb-0.5">✓ {item.point}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 2: Weaknesses */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-amber-950 uppercase tracking-wider">
                Weaknesses (Internal Constraints)
              </h4>
            </div>

            <ul className="space-y-3">
              {weaknesses.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-amber-100 shadow-sm">
                  <strong className="font-bold text-amber-900 block mb-0.5">⚠ {item.point}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 3: Opportunities */}
        <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-sky-950 uppercase tracking-wider">
                Opportunities (External Market Gaps)
              </h4>
            </div>

            <ul className="space-y-3">
              {opportunities.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-sky-100 shadow-sm">
                  <strong className="font-bold text-sky-900 block mb-0.5">→ {item.point}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quadrant 4: Threats */}
        <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-extrabold text-rose-950 uppercase tracking-wider">
                Threats (External Market Risks)
              </h4>
            </div>

            <ul className="space-y-3">
              {threats.map((item, idx) => (
                <li key={idx} className="text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-rose-100 shadow-sm">
                  <strong className="font-bold text-rose-900 block mb-0.5">⚡ {item.point}</strong>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
