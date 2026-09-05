import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Calculator,
  Sliders,
  AlertTriangle,
  Info,
  Sparkles,
  ShieldCheck,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import { formatRupees, parseRupeeAmount } from '../../services/financialCalculationService';

export default function ProjectCostCalculator({
  marginCapital,
  onMarginChange,
  customProjectCost,
  onProjectCostChange,
  structure
}) {
  const [activeTab, setActiveTab] = useState('margin-driven'); // 'margin-driven' | 'reverse-planner'
  const [reverseCostInput, setReverseCostInput] = useState(customProjectCost || structure?.effectiveProjectCost || 1000000);

  const {
    margin,
    effectiveProjectCost,
    feasibleProjectCost,
    potentialLoan,
    uncappedLoan,
    isCapped,
    capDetails,
    routing,
    fundingRequirement,
    unfundedGap,
    requiredMargin,
    additionalMarginNeeded
  } = structure;

  const isExceedingCeiling = routing?.status === 'EXCEEDS_CEILING';
  const isZeroMargin = margin <= 0;

  // Preset demo values for quick testing
  const DEMO_PRESETS = [
    { label: '₹10,000 (Micro Finance)', value: 10000 },
    { label: '₹50,000 (Starter Term)', value: 50000 },
    { label: '₹1,00,000 (PS Scenario 1)', value: 100000 },
    { label: '₹2,50,000 (Growth Unit)', value: 250000 },
    { label: '₹6,00,000 (Ceiling Check)', value: 600000 }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>PS26091 Financial Structuring Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Smart Project Cost & Capital Structuring
          </h2>
          <p className="text-xs text-slate-500">
            Determine how much business you can realistically build with your available capital under the 10% promoter equity model.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('margin-driven');
              onProjectCostChange(0); // auto-calculate feasible
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'margin-driven'
                ? 'bg-white text-slate-900 shadow-soft-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Margin-to-Project Cost
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reverse-planner')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'reverse-planner'
                ? 'bg-white text-slate-900 shadow-soft-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Custom Target Project Cost
          </button>
        </div>
      </div>

      {/* Quick Interactive Presets */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Explore Funding Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => {
                onMarginChange(p.value);
                onProjectCostChange(0);
                setActiveTab('margin-driven');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                margin === p.value
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-soft-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Available Own Contribution (Margin Capital)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
              ₹
            </span>
            <input
              type="number"
              min="0"
              step="5000"
              value={margin}
              onChange={(e) => onMarginChange(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
            <span>Range: ₹0 – ₹10 Lakhs</span>
            <span>Promoter Equity</span>
          </div>

          <input
            type="range"
            min="0"
            max="600000"
            step="10000"
            value={Math.min(margin, 600000)}
            onChange={(e) => onMarginChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
          />
        </div>

        {activeTab === 'reverse-planner' ? (
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Custom Target Project Cost (Reverse Analysis)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                ₹
              </span>
              <input
                type="number"
                min="50000"
                step="25000"
                value={reverseCostInput}
                onChange={(e) => {
                  const val = Math.max(0, Number(e.target.value));
                  setReverseCostInput(val);
                  onProjectCostChange(val);
                }}
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Experiment with project scale to see required promoter margin and funding gap.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Auto-Calculated Feasibility Mode
            </span>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every <strong className="text-emerald-700">₹10,000</strong> of your own contribution unlocks <strong className="text-emerald-700">₹1,00,000</strong> in feasible project capacity under the 10% promoter equity rule.
            </p>
            <span className="text-[11px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Scheme Rule: 10% Margin / 90% Institutional Financing
            </span>
          </div>
        )}
      </div>

      {/* ZERO MARGIN WARNING */}
      {isZeroMargin && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Margin Contribution Required:</strong>
            A margin contribution is required for the configured funding structure. Please enter the amount of personal capital or savings you can contribute (e.g. ₹50,000 or ₹1,00,000) to calculate your project structure.
          </div>
        </div>
      )}

      {/* EXCEEDS CEILING ALERT (> ₹50 Lakhs) */}
      {isExceedingCeiling && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold text-sm">Project Cost Exceeds Model Limit:</strong>
            Your current margin of <strong>{formatRupees(margin)}</strong> corresponds to an indicative project size of <strong>{formatRupees(feasibleProjectCost)}</strong>, which exceeds the supported ₹50 Lakh maximum project-cost range of this funding tier model.
            <div className="mt-2 text-rose-800">
              Consider adjusting your project scale, contributing a lower initial tranche, or applying for specialized MSME industrial consortium & commercial project finance.
            </div>
          </div>
        </div>
      )}

      {/* VISUAL FLOW DIAGRAM (Section 8 Core Architecture) */}
      {!isZeroMargin && !isExceedingCeiling && (
        <div className="py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative">
            {/* Step 1: Your Contribution */}
            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500/40 shadow-soft-xs text-center relative hover:border-emerald-500 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                1. Your Contribution
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {formatRupees(margin)}
              </p>
              <span className="text-xs font-bold text-emerald-700 block mt-1">
                10% Own Margin
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Self-funded equity</p>
            </div>

            {/* Step 2: Feasible Project Cost Card (Hero) */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-soft-md text-center relative border border-slate-800 transform md:scale-105 z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                2. Feasible Project Cost
              </span>
              <p className="text-3xl sm:text-4xl font-black text-white mt-2.5 tracking-tight">
                {formatRupees(effectiveProjectCost)}
              </p>
              <div className="mt-2 text-xs text-slate-300 font-medium">
                {activeTab === 'reverse-planner' ? 'Target Outlay Plan' : '100% Total Project Outlay'}
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[11px] text-slate-400">
                {formatRupees(margin)} ÷ 0.10 promoter margin
              </div>
            </div>

            {/* Step 3: 90% Potential Financing */}
            <div className="p-5 rounded-2xl bg-white border-2 border-sky-500/40 shadow-soft-xs text-center relative hover:border-sky-500 transition-all">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                3. Potential Financing
              </span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {formatRupees(potentialLoan)}
              </p>
              <span className="text-xs font-bold text-sky-700 block mt-1">
                Up to 90% Debt Component
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                {isCapped ? 'Capped at scheme limit' : 'Full 90% coverage'}
              </p>
            </div>
          </div>

          {/* Capped Warning / Note (Edge Case Section 12 & 13) */}
          {isCapped && capDetails && (
            <div className="mt-4 p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-sky-700" />
                <span>Scheme Statutory Financing Cap Enforced:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 pt-1 font-medium">
                <div>Calculated 90%: <strong>{formatRupees(capDetails.calculated90)}</strong></div>
                <div>Scheme Maximum: <strong>{formatRupees(capDetails.schemeMaximum)}</strong></div>
                <div>Maximum Potential Financing: <strong className="text-emerald-700">{formatRupees(capDetails.appliedLoan)}</strong></div>
              </div>
            </div>
          )}

          {/* Additional Margin Needed in Custom Mode (Section 26) */}
          {additionalMarginNeeded > 0 && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Additional Own Contribution Needed:</strong> To support a project cost of {formatRupees(effectiveProjectCost)} at the mandatory 10% margin, a total margin of <strong>{formatRupees(requiredMargin)}</strong> is required. Your available margin is <strong>{formatRupees(margin)}</strong>. You will need an additional <strong>{formatRupees(additionalMarginNeeded)}</strong> in promoter equity or capital grants.
              </div>
            </div>
          )}

          {/* Unfunded Gap (Section 25) */}
          {unfundedGap > 0 && (
            <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Unfunded Project Gap: </span>
                <span>{formatRupees(unfundedGap)}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Can be plugged with PMEGP/PMFME capital subsidies
              </span>
            </div>
          )}

          {/* Mandatory Label from Section 8 */}
          <p className="text-[11px] text-slate-400 text-center mt-4">
            * Note: This is an illustrative financial structure calculated strictly using configured scheme parameters, not a guaranteed bank loan sanction.
          </p>
        </div>
      )}
    </div>
  );
}
