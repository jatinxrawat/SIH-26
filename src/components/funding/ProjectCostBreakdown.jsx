import React, { useState, useMemo } from 'react';
import { PieChart, CheckCircle2, AlertCircle, IndianRupee, RotateCcw } from 'lucide-react';
import { formatRupees, parseRupeeAmount } from '../../services/financialCalculationService';

export default function ProjectCostBreakdown({ totalProjectCost, onBreakdownChange }) {
  const targetCost = parseRupeeAmount(totalProjectCost || 1000000);

  // Proportional default allocation based on standard MSME project reports
  const [breakdown, setBreakdown] = useState({
    equipmentMachinery: Math.round(targetCost * 0.45),
    infrastructure: Math.round(targetCost * 0.20),
    inventory: Math.round(targetCost * 0.15),
    workingCapital: Math.round(targetCost * 0.15),
    other: Math.round(targetCost * 0.05)
  });

  // Re-adjust defaults if targetCost changes significantly
  React.useEffect(() => {
    setBreakdown({
      equipmentMachinery: Math.round(targetCost * 0.45),
      infrastructure: Math.round(targetCost * 0.20),
      inventory: Math.round(targetCost * 0.15),
      workingCapital: Math.round(targetCost * 0.15),
      other: Math.round(targetCost * 0.05)
    });
  }, [targetCost]);

  const allocatedSum = useMemo(() => {
    return Object.values(breakdown).reduce((acc, val) => acc + (Number(val) || 0), 0);
  }, [breakdown]);

  const diff = allocatedSum - targetCost;
  const isBalanced = Math.abs(diff) <= 10;

  const handleChange = (key, value) => {
    const updated = {
      ...breakdown,
      [key]: Math.max(0, Number(value))
    };
    setBreakdown(updated);
    if (onBreakdownChange) {
      onBreakdownChange(updated);
    }
  };

  const categories = [
    { key: 'equipmentMachinery', label: 'Equipment & Machinery', desc: 'Core processing plants, tools, hardware assets', color: 'bg-emerald-500' },
    { key: 'infrastructure', label: 'Infrastructure & Civil Works', desc: 'Shed, electrical fittings, plumbing, storage racking', color: 'bg-sky-500' },
    { key: 'inventory', label: 'Initial Raw Materials & Stock', desc: 'Opening feedstock, packaging stock, consumables', color: 'bg-amber-500' },
    { key: 'workingCapital', label: 'Working Capital Allocation', desc: 'Cash reserve for payroll, freight, receivables gap', color: 'bg-purple-500' },
    { key: 'other', label: 'Contingency / Pre-Operative', desc: 'Permits, testing fees, statutory brand registrations', color: 'bg-slate-400' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-1">
            <PieChart className="w-3.5 h-3.5 text-slate-600" />
            <span>Bank Project Report (DPR) Structure</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Project Cost Breakdown (DPR Asset Stack)
          </h3>
          <p className="text-xs text-slate-500">
            Categorize capital requirements across equipment, infrastructure, inventory, and working capital.
          </p>
        </div>

        {/* Balance Status Badge */}
        <div className="self-start sm:self-auto">
          {isBalanced ? (
            <div className="px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Perfect Allocation (100%)</span>
            </div>
          ) : diff > 0 ? (
            <div className="px-3 py-1.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Over-allocated by {formatRupees(diff)}</span>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Unallocated: {formatRupees(Math.abs(diff))}</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Proportional Stack Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex shadow-inner">
          {categories.map((c) => {
            const val = breakdown[c.key] || 0;
            const pct = targetCost > 0 ? (val / targetCost) * 100 : 0;
            return (
              <div
                key={c.key}
                className={`${c.color} h-full transition-all`}
                style={{ width: `${pct}%` }}
                title={`${c.label}: ${formatRupees(val)} (${pct.toFixed(1)}%)`}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Allocated: {formatRupees(allocatedSum)}</span>
          <span>Target Project Cost: {formatRupees(targetCost)}</span>
        </div>
      </div>

      {/* Inputs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => {
          const val = breakdown[c.key] || 0;
          const pct = targetCost > 0 ? ((val / targetCost) * 100).toFixed(1) : 0;

          return (
            <div key={c.key} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                    <span className="text-xs font-bold text-slate-800">{c.label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {pct}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2 leading-tight">
                  {c.desc}
                </p>
              </div>

              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={val}
                  onChange={(e) => handleChange(c.key, e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
