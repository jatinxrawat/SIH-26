import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';

export default function SchemeCard({
  scheme,
  isSelectedForRoadmap,
  onToggleRoadmap,
  isCompared,
  onToggleCompare,
  canCompareMore
}) {
  const {
    id,
    name,
    ministry,
    department,
    schemeCategoryLabel,
    matchScore,
    eligibility,
    financialBenefits,
    documentChecklist = []
  } = scheme;

  const status = eligibility?.status || 'POTENTIALLY_ELIGIBLE';
  const matchedPillars = eligibility?.matchedPillars || [];
  const missingDocsCount = documentChecklist.filter(d => d.status !== 'AVAILABLE_FROM_PROFILE').length;

  // Visual status pill
  const getStatusBadge = () => {
    switch (status) {
      case 'ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Eligible</span>
          </span>
        );
      case 'NOT_ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Not Eligible</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Potentially Eligible</span>
          </span>
        );
    }
  };

  // Match score color
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 70) return 'text-teal-700 bg-teal-50 border-teal-300';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-slate-600 bg-slate-100 border-slate-200';
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between group relative">
      {/* Top Bar: Ministry & Match Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600">
              {schemeCategoryLabel || 'Government Scheme'}
            </span>
            {getStatusBadge()}
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl border font-black text-xs ${getScoreColor(matchScore)} shadow-soft-xs`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{matchScore} Match Score</span>
          </div>
        </div>

        {/* Scheme Title & Ministry */}
        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
          <Link to={`/schemes/${id}`} className="hover:underline focus:outline-none">
            {name}
          </Link>
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-1">
          {ministry} {department ? `· ${department}` : ''}
        </p>

        {/* Potential Support Banner */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/50 border border-emerald-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Potential Benefit
            </span>
            <span className="text-sm font-extrabold text-slate-900">
              {financialBenefits?.subsidyPercentage || `Up to ₹${(financialBenefits?.maximumFunding || 0).toLocaleString('en-IN')}`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 block">Facility Type</span>
            <span className="text-xs font-bold text-emerald-800 capitalize">
              {(financialBenefits?.fundingType || 'Government Support').replace(/_/g, ' ').toLowerCase()}
            </span>
          </div>
        </div>

        {/* Why this matches: Criteria Pillars */}
        <div className="mt-4 space-y-1.5 text-xs">
          {matchedPillars.slice(0, 3).map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{pillar}</span>
            </div>
          ))}

          {missingDocsCount > 0 ? (
            <div className="flex items-center gap-2 text-amber-700 font-medium pt-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{missingDocsCount} document{missingDocsCount > 1 ? 's' : ''} to be prepared</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Basic profile documents ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Compare Checkbox */}
        <button
          type="button"
          onClick={() => onToggleCompare(id)}
          disabled={!isCompared && !canCompareMore}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isCompared
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : canCompareMore
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Compare with another scheme'}
        >
          {isCompared ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Add to Roadmap */}
          <button
            type="button"
            onClick={() => onToggleRoadmap(id)}
            className={`p-2 rounded-xl border transition-all ${
              isSelectedForRoadmap
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-soft-xs'
                : 'bg-white text-slate-600 hover:text-emerald-700 border-slate-200 hover:border-emerald-300'
            }`}
            title={isSelectedForRoadmap ? 'Saved to your business roadmap' : 'Add to My Roadmap'}
          >
            {isSelectedForRoadmap ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* View Details Link */}
          <Link
            to={`/schemes/${id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-soft-xs"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
