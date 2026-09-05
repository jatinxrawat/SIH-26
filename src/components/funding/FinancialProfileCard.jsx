import React, { useState } from 'react';
import { User, Building2, MapPin, IndianRupee, Edit3, X, Check, ArrowRight } from 'lucide-react';
import { formatRupees, parseRupeeAmount } from '../../services/financialCalculationService';

export default function FinancialProfileCard({ profile, onUpdateFinancials }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const business = profile?.business || {};
  const personal = profile?.personalInfo || {};
  const financials = profile?.financialProfile || {};

  const marginVal = parseRupeeAmount(financials.availableMarginCapital || financials.availableCapital || 100000);
  const costVal = parseRupeeAmount(financials.estimatedProjectCost || 1000000);
  const monthlyObligationVal = parseRupeeAmount(financials.existingMonthlyObligation || financials.existingEmi || 0);

  // Edit form state
  const [editForm, setEditForm] = useState({
    availableMarginCapital: marginVal,
    estimatedProjectCost: costVal,
    existingMonthlyObligation: monthlyObligationVal,
    monthlyRevenue: parseRupeeAmount(financials.monthlyRevenue || financials.expectedMonthlyRevenue || 120000),
    monthlyOperatingExpenses: parseRupeeAmount(financials.monthlyOperatingExpenses || financials.expectedMonthlyOperatingCost || 65000)
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (onUpdateFinancials) {
        await onUpdateFinancials({
          availableMarginCapital: editForm.availableMarginCapital,
          availableCapital: formatRupees(editForm.availableMarginCapital),
          estimatedProjectCost: formatRupees(editForm.estimatedProjectCost),
          existingMonthlyObligation: editForm.existingMonthlyObligation,
          existingEmi: formatRupees(editForm.existingMonthlyObligation),
          hasExistingLoans: editForm.existingMonthlyObligation > 0 ? 'Yes' : 'No',
          monthlyRevenue: formatRupees(editForm.monthlyRevenue),
          expectedMonthlyRevenue: formatRupees(editForm.monthlyRevenue),
          monthlyOperatingExpenses: formatRupees(editForm.monthlyOperatingExpenses),
          expectedMonthlyOperatingCost: formatRupees(editForm.monthlyOperatingExpenses)
        });
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update financials', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Active Entrepreneur Profile
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                {personal.district || 'Pune'}, {personal.state || 'Maharashtra'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5 flex items-center gap-2">
              <span>{business.name || 'Your Business Enterprise'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {business.sector || 'Food Processing'} • Stage: <strong className="text-slate-700">{business.stage || 'Planning'}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Financial Information</span>
          </button>
        </div>

        {/* 4 Profile Metric Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Available Own Contribution
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {formatRupees(marginVal)}
            </strong>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              Promoter Margin Capital
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Estimated Project Cost
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {formatRupees(costVal)}
            </strong>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              Target Outlay
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Existing Monthly Debt
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block">
              {formatRupees(monthlyObligationVal)}
            </strong>
            <span className="text-[11px] text-slate-500 font-medium mt-1 block">
              {monthlyObligationVal > 0 ? 'Active monthly EMI' : 'Zero existing debt'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Business Stage
            </span>
            <strong className="text-xl sm:text-2xl font-black text-slate-900 mt-1 block capitalize">
              {(business.stage || 'Planning').toLowerCase()}
            </strong>
            <span className="text-[11px] text-sky-700 font-medium mt-1 block truncate">
              {business.sector || 'General MSME'}
            </span>
          </div>
        </div>
      </div>

      {/* Inline Quick-Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Financial Profile</h3>
                <p className="text-xs text-slate-500">Update your figures to re-calculate feasible capacity and tier routing</p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Available Own Contribution (Margin Capital) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={editForm.availableMarginCapital}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, availableMarginCapital: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  e.g. ₹1,00,000 (Calculates indicative ₹10,00,000 project capacity under 10% margin)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Target Project Cost (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="25000"
                  value={editForm.estimatedProjectCost}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, estimatedProjectCost: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Monthly Revenue (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={editForm.monthlyRevenue}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, monthlyRevenue: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Operating Costs (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={editForm.monthlyOperatingExpenses}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, monthlyOperatingExpenses: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Existing Monthly Debt Repayment (EMI)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={editForm.existingMonthlyObligation}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, existingMonthlyObligation: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Enter 0 if you have no current monthly business/personal loan commitments.
                </span>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Update Financials</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
