import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, Bot, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { compareSchemesAi } from '../../services/schemeAdvisorService';

export default function SchemeComparisonModal({
  schemes = [],
  profile,
  onClose,
  onRemoveScheme
}) {
  const [aiSummary, setAiSummary] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadComparison() {
      if (schemes.length >= 2) {
        setLoadingAi(true);
        try {
          const summary = await compareSchemesAi(profile, schemes);
          if (isMounted) setAiSummary(summary);
        } catch (e) {
          console.error('Error generating AI comparison:', e);
        } finally {
          if (isMounted) setLoadingAi(false);
        }
      }
    }
    loadComparison();
    return () => { isMounted = false; };
  }, [schemes, profile]);

  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-soft-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Scheme Comparison Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Evaluating {schemes.length} schemes side-by-side against your business profile.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* AI Comparison Synthesis */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 rounded-2xl p-5 shadow-soft-xs">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-2">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>AI Comparative Guidance</span>
              {loadingAi && <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />}
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              {loadingAi ? (
                <p className="text-slate-500 italic">Synthesizing personalized comparison matrix for your sector...</p>
              ) : (
                <div className="whitespace-pre-line font-medium">{aiSummary}</div>
              )}
            </div>
          </div>

          {/* Side-by-Side Matrix Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4 w-48 bg-slate-100/60">Evaluation Metric</th>
                  {schemes.map(s => (
                    <th key={s.id} className="p-4 min-w-[220px]">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-emerald-700 font-extrabold block text-xs">
                            {s.matchScore} Match Score
                          </span>
                          <span className="text-slate-900 font-black text-sm block mt-0.5 leading-snug">
                            {s.name}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveScheme(s.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Ministry */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Ministry / Agency</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 text-slate-700">
                      {s.ministry}
                    </td>
                  ))}
                </tr>

                {/* Scheme Type */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Support Type</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 font-semibold text-emerald-800">
                      {s.schemeCategoryLabel}
                    </td>
                  ))}
                </tr>

                {/* Maximum Funding */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Maximum Support</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 font-black text-slate-900 text-sm">
                      ₹{(s.financialBenefits?.maximumFunding || 0).toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>

                {/* Subsidy / Benefit Details */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Subsidy / Benefit Scale</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 text-slate-700">
                      {s.financialBenefits?.subsidyPercentage || s.financialBenefits?.subsidyDetails || 'Institutional loan facility'}
                    </td>
                  ))}
                </tr>

                {/* Promoter Margin Money */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Promoter Equity / Margin</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 text-slate-700">
                      {s.financialBenefits?.marginMoneyDetails || '10% - 15% minimum'}
                    </td>
                  ))}
                </tr>

                {/* Collateral Requirement */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Collateral Requirement</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 font-medium text-slate-700">
                      {s.financialBenefits?.collateralRequirement || 'Standard banking guidelines'}
                    </td>
                  ))}
                </tr>

                {/* Eligibility Status */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Eligibility Fit</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4 font-semibold">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        s.eligibility?.status === 'ELIGIBLE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {s.eligibility?.status === 'ELIGIBLE' ? '✓ Eligible' : '⚠ Potentially Eligible'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Action Link */}
                <tr>
                  <td className="p-4 font-bold text-slate-600 bg-slate-50/50">Inspect Scheme</td>
                  {schemes.map(s => (
                    <td key={s.id} className="p-4">
                      <Link
                        to={`/schemes/${s.id}`}
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-soft-xs transition-all"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-[11px] text-slate-400 font-medium">
            Final sanction is evaluated individually by participating banks and state agencies.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
