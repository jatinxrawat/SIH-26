import React from 'react';
import {
  Landmark,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Percent,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatRupees } from '../../services/financialCalculationService';
import { STATUTORY_FINANCIAL_DISCLAIMER } from '../../data/fundingProducts';

export default function FundingTierCard({ structure, matchedSchemes = [] }) {
  const {
    margin,
    effectiveProjectCost,
    potentialLoan,
    product,
    routing,
    isCapped
  } = structure;

  if (!product || routing?.status === 'EXCEEDS_CEILING') {
    return null;
  }

  const isMicro = product.id === 'micro-finance';

  return (
    <div className="space-y-6">
      {/* 1. Large Summary Funding Structure Card (Section 14) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-50/50 via-slate-50/30 to-transparent pointer-events-none rounded-bl-full" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-xs">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Routed Funding Product
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                {product.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              Code: {product.code}
            </span>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>PS26091 Configured</span>
            </span>
          </div>
        </div>

        {/* Core Financial Structure Table Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Own Contribution
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {formatRupees(margin)}
            </strong>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              10% Promoter Equity
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Estimated Project Cost
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {formatRupees(effectiveProjectCost)}
            </strong>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              Total Outlay
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Potential Financing
            </span>
            <strong className="text-xl sm:text-2xl font-black text-emerald-900 mt-1 block">
              {formatRupees(potentialLoan)}
            </strong>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              {isCapped ? 'Capped at statutory ceiling' : 'Up to 90% Project Financing'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Funding Tier
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {isMicro ? 'MICRO FINANCE' : 'TERM LOAN'}
            </strong>
            <span className="text-[11px] text-sky-700 font-semibold mt-1 block">
              {isMicro ? 'Projects ≤ ₹1.40L' : 'Projects ₹1.40L – ₹50L'}
            </span>
          </div>
        </div>

        {/* 3 Secondary Parameters: Interest Rate, Tenure, Moratorium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Beneficiary Interest Rate</span>
              <strong className="text-base font-black text-slate-900">{product.interestRate}% p.a.</strong>
              <span className="text-[10px] text-slate-500 block">Reducing balance method</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Tenure</span>
              <strong className="text-base font-black text-slate-900">{product.tenureYears} Years</strong>
              <span className="text-[10px] text-slate-500 block">({product.tenureYears * 12} calendar months)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Moratorium (Grace Period)</span>
              <strong className="text-base font-black text-slate-900">{product.moratoriumMonths} Months</strong>
              <span className="text-[10px] text-purple-700 font-semibold block">Zero principal due in grace</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Note (Section 14 & 41) */}
        <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Planning Disclaimer: </strong>
            {STATUTORY_FINANCIAL_DISCLAIMER}
          </p>
        </div>
      </div>

      {/* 2. Scheme Matcher Integration (Section 31 & 32) */}
      <div className="bg-gradient-to-r from-emerald-50/70 via-slate-50 to-sky-50/70 rounded-3xl p-6 border border-slate-200/90 shadow-soft-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h4 className="text-base font-bold text-slate-900">
              Stack Government Capital Subsidies to Reduce Debt
            </h4>
          </div>
          <Link
            to="/schemes"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Open Scheme Matcher</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          While the <strong>{product.name}</strong> structures your loan and repayment terms, matching programs like <strong>PMEGP</strong> (15%–35% back-ended capital subsidy) or <strong>PMFME</strong> (35% credit-linked grant up to ₹10 Lakhs) can directly repay a portion of your principal, substantially lowering your monthly installment.
        </p>

        {matchedSchemes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {matchedSchemes.slice(0, 2).map((s) => (
              <div key={s.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">{s.name}</strong>
                  <span className="text-[11px] text-emerald-700">{s.financialBenefits?.subsidyDetails || 'Capital Subsidy Linkage'}</span>
                </div>
                <Link to={`/schemes/${s.id}`} className="text-slate-400 hover:text-emerald-600 p-1">
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
