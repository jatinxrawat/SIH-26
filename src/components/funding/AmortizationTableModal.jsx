import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Calendar, IndianRupee, Printer } from 'lucide-react';
import { formatRupees } from '../../services/financialCalculationService';

export default function AmortizationTableModal({ isOpen, onClose, amortizationData, loanAmount, product }) {
  if (!isOpen) return null;

  const { schedule = [], yearlySummary = [], frequency = 'quarterly', moratoriumMonths = 6 } = amortizationData || {};
  const [activeTab, setActiveTab] = useState('detailed'); // 'detailed' | 'yearly'

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Amortization Schedule
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-600 capitalize">
                {frequency} Repayment Cycle
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Detailed Loan Repayment Schedule
            </h3>
            <p className="text-xs text-slate-500">
              {product?.name} • Principal: <strong>{formatRupees(loanAmount)}</strong> at {product?.interestRate}% p.a. over {product?.tenureYears} years
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Tab switch */}
            <div className="bg-slate-100 p-1 rounded-xl flex text-xs font-bold">
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'detailed' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All Periods ({schedule.length})
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'yearly' ? 'bg-white text-slate-900 shadow-soft-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Yearly Rollup ({yearlySummary.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Moratorium Banner */}
        <div className="bg-purple-50/70 border-b border-purple-100 px-6 py-2.5 text-xs text-purple-900 flex items-center justify-between shrink-0">
          <span>
            ⏳ <strong>Initial Moratorium: </strong> Months 1–{moratoriumMonths} are grace period. Repayment period 1 commences Month {moratoriumMonths + 1}.
          </span>
          <span className="text-[11px] text-purple-700 hidden sm:inline">
            Standard Reducing Balance Amortization
          </span>
        </div>

        {/* Scrollable Table Content */}
        <div className="p-6 overflow-y-auto overflow-x-auto flex-1">
          {activeTab === 'detailed' ? (
            <table className="w-full text-left text-xs border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 pr-3">Period</th>
                  <th className="py-2.5 px-3">Opening Principal</th>
                  <th className="py-2.5 px-3">Interest</th>
                  <th className="py-2.5 px-3">Principal Repaid</th>
                  <th className="py-2.5 px-3 text-emerald-800">Total Installment</th>
                  <th className="py-2.5 pl-3 text-right">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {schedule.map((row) => (
                  <tr key={row.periodNumber} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 pr-3 font-bold text-slate-900">
                      {row.periodLabel}
                    </td>
                    <td className="py-2.5 px-3">{formatRupees(row.openingBalance)}</td>
                    <td className="py-2.5 px-3 text-amber-700">+{formatRupees(row.interest)}</td>
                    <td className="py-2.5 px-3 text-sky-700">-{formatRupees(row.principalPaid)}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">{formatRupees(row.totalPayment)}</td>
                    <td className="py-2.5 pl-3 text-right font-semibold text-slate-900">{formatRupees(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse min-w-[550px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 pr-3">Year</th>
                  <th className="py-2.5 px-3">Principal Repaid</th>
                  <th className="py-2.5 px-3">Interest Paid</th>
                  <th className="py-2.5 px-3 text-emerald-800">Total Annual Cash Outflow</th>
                  <th className="py-2.5 pl-3 text-right">Year-End Loan Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {yearlySummary.map((yr) => (
                  <tr key={yr.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pr-3 font-bold text-slate-900">{yr.yearLabel}</td>
                    <td className="py-3 px-3 text-sky-700 font-semibold">{formatRupees(yr.principalPaid)}</td>
                    <td className="py-3 px-3 text-amber-700 font-semibold">{formatRupees(yr.interestPaid)}</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">{formatRupees(yr.totalPaid)}</td>
                    <td className="py-3 pl-3 text-right font-black text-slate-900">{formatRupees(yr.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <span>* All installment figures are indicative estimates calculated under reducing balance formulas.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors self-end sm:self-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
