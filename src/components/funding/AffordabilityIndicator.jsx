import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import { formatRupees, calculateAffordability } from '../../services/financialCalculationService';

export default function AffordabilityIndicator({ profile, monthlyRepayment }) {
  const affordability = calculateAffordability(profile, monthlyRepayment);

  const {
    status,
    label,
    color,
    coverageRatio,
    isOperating,
    monthlySurplus,
    monthlyRevenue,
    monthlyOperatingExpenses,
    existingObligation,
    repaymentObligation,
    message
  } = affordability;

  const isNoData = status === 'NO_DATA';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cash Flow Health Analysis</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Illustrative Repayment Comfort & Coverage
          </h3>
          <p className="text-xs text-slate-500">
            Compare your projected operational surplus against debt service obligations to verify business viability.
          </p>
        </div>

        {/* Health Status Indicator Badge */}
        {!isNoData && (
          <div className="self-start sm:self-auto flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-2xl text-xs font-black border flex items-center gap-1.5 ${
                status === 'COMFORTABLE'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : status === 'NEEDS_ATTENTION'
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status === 'COMFORTABLE'
                    ? 'bg-emerald-600'
                    : status === 'NEEDS_ATTENTION'
                    ? 'bg-amber-500'
                    : 'bg-rose-600 animate-pulse'
                }`}
              />
              <span>{label}</span>
              <span className="text-[10px] font-semibold opacity-75">
                ({coverageRatio}x Coverage)
              </span>
            </div>
          </div>
        )}
      </div>

      {isNoData ? (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Revenue Projections Missing:</strong>
            {message} Please specify expected monthly revenue and operating expenses in your financial profile to calculate repayment affordability.
          </div>
        </div>
      ) : (
        <>
          {/* Transparent Cash Flow Step Math Breakdown */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isOperating ? '1. Monthly Revenue' : '1. Expected Revenue'}
              </span>
              <strong className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                {formatRupees(monthlyRevenue)}
              </strong>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Operational gross inflow
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                2. Operating Expenses
              </span>
              <strong className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                -{formatRupees(monthlyOperatingExpenses)}
              </strong>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Rent, wages, electricity, materials
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                3. Existing Debt EMI
              </span>
              <strong className="text-lg sm:text-xl font-black text-slate-900 mt-1 block">
                -{formatRupees(existingObligation)}
              </strong>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Current loan commitments
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                = Available Monthly Surplus
              </span>
              <strong className="text-lg sm:text-xl font-black text-emerald-950 mt-1 block">
                {formatRupees(monthlySurplus)}
              </strong>
              <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                Cash available for debt service
              </span>
            </div>
          </div>

          {/* Repayment Coverage Comparison */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Repayment Obligation vs Operating Surplus
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {message}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0 bg-white px-4 py-3 rounded-xl border border-slate-200">
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Estimated Monthly Repayment</span>
                <strong className="text-base font-black text-slate-900">{formatRupees(repaymentObligation)}</strong>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Surplus Coverage</span>
                <strong className={`text-base font-black ${
                  status === 'COMFORTABLE' ? 'text-emerald-700' : status === 'NEEDS_ATTENTION' ? 'text-amber-700' : 'text-rose-700'
                }`}>
                  ~{coverageRatio}x
                </strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            * This assessment is an illustrative decision-support metric calculated from your declared revenue and cost estimates. It does not constitute official bank credit underwriting or guarantee loan approval.
          </p>
        </>
      )}
    </div>
  );
}
