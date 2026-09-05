import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  IndianRupee,
  Layers,
  ChevronRight,
  TrendingDown,
  Info,
  Sliders,
  CheckCircle2,
  Table
} from 'lucide-react';
import {
  formatRupees,
  calculateRepayment,
  generateAmortizationSchedule
} from '../../services/financialCalculationService';
import { MORATORIUM_DISCLAIMER } from '../../data/fundingProducts';
import AmortizationTableModal from './AmortizationTableModal';

export default function RepaymentScheduler({ structure, onRepaymentCalculated }) {
  const { product, potentialLoan, effectiveProjectCost } = structure;

  // Selected frequency ('quarterly' or 'monthly')
  const [frequency, setFrequency] = useState(product?.defaultRepaymentFrequency || 'quarterly');

  // Adjustable loan amount (defaults to calculated potentialLoan)
  const [customLoanAmount, setCustomLoanAmount] = useState(potentialLoan || 900000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync if potentialLoan changes drastically
  React.useEffect(() => {
    setCustomLoanAmount(potentialLoan);
  }, [potentialLoan]);

  const annualRate = product?.interestRate || 8.0;
  const tenureYears = product?.tenureYears || 7;
  const moratoriumMonths = product?.moratoriumMonths || 6;

  // Compute periodic repayment
  const repayment = useMemo(() => {
    return calculateRepayment(customLoanAmount, annualRate, tenureYears, frequency);
  }, [customLoanAmount, annualRate, tenureYears, frequency]);

  // Compute full amortization schedule
  const amortizationData = useMemo(() => {
    return generateAmortizationSchedule(customLoanAmount, annualRate, tenureYears, moratoriumMonths, frequency);
  }, [customLoanAmount, annualRate, tenureYears, moratoriumMonths, frequency]);

  // Pass repayment up if parent needs it for affordability
  React.useEffect(() => {
    if (onRepaymentCalculated) {
      onRepaymentCalculated(repayment);
    }
  }, [repayment, onRepaymentCalculated]);

  const maxPermittedLoan = product?.maximumLoanAmount || 4500000;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-xs font-bold mb-1">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>Repayment & Amortization Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Repayment Schedule & Debt Service Planning
          </h3>
          <p className="text-xs text-slate-500">
            Transparent reducing-balance schedule with configured {moratoriumMonths}-month moratorium grace period.
          </p>
        </div>

        {/* Repayment Frequency Toggle (Monthly vs Quarterly) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setFrequency('quarterly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              frequency === 'quarterly'
                ? 'bg-white text-slate-900 shadow-soft-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Quarterly Repayment (PS Default)
          </button>
          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              frequency === 'monthly'
                ? 'bg-white text-slate-900 shadow-soft-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Monthly EMI
          </button>
        </div>
      </div>

      {/* Loan Amount Adjustment Slider */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <label className="text-xs font-bold uppercase text-slate-700 block">
              Adjust Borrowing Amount (Within Scheme Limit)
            </label>
            <span className="text-[11px] text-slate-400">
              Capped at maximum scheme eligibility: {formatRupees(maxPermittedLoan)}
            </span>
          </div>
          <strong className="text-lg font-black text-slate-900">
            {formatRupees(customLoanAmount)}
          </strong>
        </div>

        <input
          type="range"
          min="10000"
          max={maxPermittedLoan}
          step="10000"
          value={customLoanAmount}
          onChange={(e) => setCustomLoanAmount(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mt-1">
          <span>Min: ₹10,000</span>
          <span>Calculated Need: {formatRupees(potentialLoan)}</span>
          <span>Scheme Cap: {formatRupees(maxPermittedLoan)}</span>
        </div>
      </div>

      {/* Repayment Summary Cards (Section 19) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            Estimated {frequency === 'quarterly' ? 'Quarterly' : 'Monthly'} Installment
          </span>
          <strong className="text-xl sm:text-2xl font-black text-emerald-950 mt-1 block">
            {formatRupees(repayment.installment)}
          </strong>
          {frequency === 'quarterly' && (
            <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
              ~{formatRupees(repayment.monthlyEquivalent)} / month equivalent
            </span>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Interest Payable
          </span>
          <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {formatRupees(repayment.totalInterest)}
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            At {annualRate}% reducing balance
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Estimated Total Outflow
          </span>
          <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {formatRupees(repayment.totalPayment)}
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Principal + Total Interest
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Installment Count
          </span>
          <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
            {repayment.numberOfInstallments} {frequency === 'quarterly' ? 'Quarters' : 'Months'}
          </strong>
          <span className="text-[11px] text-purple-700 font-semibold block mt-0.5">
            Post {moratoriumMonths}-month moratorium
          </span>
        </div>
      </div>

      {/* Moratorium Timeline Visualization (Section 18) */}
      <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
              Moratorium Timeline ({moratoriumMonths} Months Grace Period)
            </span>
          </div>
          <span className="text-[11px] font-bold text-purple-700 px-2 py-0.5 bg-purple-100 rounded-md">
            No Principal Due During Grace
          </span>
        </div>

        {/* Visual Timeline Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="bg-purple-600 h-full transition-all"
              style={{ width: product?.id === 'micro-finance' ? '8.3%' : '7.1%' }}
              title={`Moratorium: Months 1–${moratoriumMonths}`}
            />
            <div
              className="bg-emerald-600 h-full flex-1"
              title={`Regular Repayment: ${tenureYears} Years`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 font-medium">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              <span><strong>Month 0:</strong> Loan Disbursed</span>
            </div>
            <div className="flex items-center gap-1 text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span><strong>Months 1–{moratoriumMonths}:</strong> Moratorium Grace Period</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span><strong>Month {moratoriumMonths + 1}:</strong> Repayments Begin</span>
            </div>
            <div>
              <span><strong>Year {tenureYears}:</strong> Loan Closed</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-purple-900/80 pt-1">
          * {MORATORIUM_DISCLAIMER}
        </p>
      </div>

      {/* Visual Year-by-Year Schedule Bar (Section 20) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Year-by-Year Debt Service Schedule
          </h4>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 hover:underline"
          >
            <Table className="w-3.5 h-3.5" />
            <span>View Detailed Period Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {amortizationData.yearlySummary.map((yr) => {
            const maxYearlyOutflow = Math.max(...amortizationData.yearlySummary.map((y) => y.totalPaid), 1);
            const pct = Math.min(100, Math.round((yr.totalPaid / maxYearlyOutflow) * 100));

            return (
              <div key={yr.year} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="w-24 shrink-0 font-bold text-slate-800">
                  {yr.yearLabel}
                </div>

                <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-600 h-full"
                    style={{ width: `${pct}%` }}
                    title={`Total Annual Payment: ${formatRupees(yr.totalPaid)}`}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0 text-[11px] font-medium text-slate-600">
                  <span>Repayment: <strong className="text-slate-900">{formatRupees(yr.totalPaid)}</strong></span>
                  <span className="hidden md:inline text-slate-400">|</span>
                  <span className="hidden md:inline">Closing: {formatRupees(yr.endingBalance)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Table Modal */}
      <AmortizationTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amortizationData={amortizationData}
        loanAmount={customLoanAmount}
        product={product}
      />
    </div>
  );
}
