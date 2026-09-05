import React from 'react';
import { Landmark, Sparkles, CheckCircle2, ShieldCheck, Filter, ArrowRight } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';

export default function SchemesPage() {
  const { profile } = useEntrepreneurProfile();

  const sector = profile?.business?.sector || 'Manufacturing / Services';
  const state = profile?.personalInfo?.state || 'India';
  const category = profile?.eligibilityProfile?.category || 'General';
  const fundingRequired = profile?.financialProfile?.fundingRequired || '₹5 Lakhs';

  const upcomingSchemes = [
    {
      name: 'Prime Minister Employment Generation Programme (PMEGP)',
      ministry: 'Ministry of MSME',
      type: '15% - 35% Capital Subsidy',
      fit: 'High Match for ' + state
    },
    {
      name: 'PM Formalisation of Micro food processing Enterprises (PMFME)',
      ministry: 'Ministry of Food Processing Industries',
      type: '35% Project Grant up to ₹10 Lakh',
      fit: 'Matching ' + sector
    },
    {
      name: 'Pradhan Mantri Mudra Yojana (PMMY)',
      ministry: 'Department of Financial Services',
      type: 'Collateral-free Institutional Loan up to ₹10L/20L',
      fit: 'Aligned with ' + fundingRequired
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scheme Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Government Schemes & Subsidies
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Automated eligibility matching across Central and State government schemes based on your enterprise profile.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0 self-start sm:self-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile Parameters Ready</span>
        </div>
      </div>

      {/* Matching Parameters Card */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          <span>Active Match Parameters From Your Profile</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">State / Location</span>
            <strong className="text-slate-900 text-sm">{state}</strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
            <strong className="text-slate-900 text-sm">{category}</strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Industry Sector</span>
            <strong className="text-slate-900 text-sm truncate block">{sector}</strong>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Capital Requirement</span>
            <strong className="text-slate-900 text-sm">{fundingRequired}</strong>
          </div>
        </div>
      </div>

      {/* Featured Placeholder Showcase */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-soft-xl relative overflow-hidden text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
            <Landmark className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Personalized Scheme Recommendations Coming Next
          </h3>
          <p className="text-emerald-100/75 text-xs sm:text-sm leading-relaxed">
            The Scheme Intelligence engine is being connected. It will automatically eliminate non-applicable schemes and rank government programs by subsidy value and approval probability.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Your business profile is fully synchronized
            </span>
          </div>
        </div>
      </div>

      {/* Upcoming Supported Schemes Preview */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Target Schemes Under Integration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingSchemes.map((s, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {s.ministry}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">
                  {s.name}
                </h4>
                <p className="text-xs text-emerald-700 font-semibold mt-2">
                  Benefit: {s.type}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                {s.fit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
