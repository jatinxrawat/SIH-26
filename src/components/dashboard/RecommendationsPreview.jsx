import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowRight, Sparkles } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import { schemeApi } from '../../services/schemeApi';

export default function RecommendationsPreview() {
  const { profile } = useEntrepreneurProfile();
  const [topSchemes, setTopSchemes] = useState([]);

  const sector = profile?.business?.sector || 'General';

  useEffect(() => {
    let isMounted = true;
    async function loadTopSchemes() {
      try {
        const ranked = await schemeApi.getRecommendations(profile);
        if (isMounted) {
          setTopSchemes(ranked.slice(0, 3));
        }
      } catch (e) {
        console.error('Error loading top schemes for dashboard:', e);
      }
    }
    loadTopSchemes();
    return () => { isMounted = false; };
  }, [profile]);

  return (
    <div className="space-y-6">
      {/* 🏛️ Live Government Support Matches Card (Section 18) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Landmark className="w-3 h-3 text-emerald-600" />
              <span>Government Support</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {topSchemes.length > 0 ? `${topSchemes.length} Strong Matches Found for Your Business` : 'Government Support Opportunities'}
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic scheme eligibility evaluated against your {sector} profile.
            </p>
          </div>

          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-soft-xs self-start sm:self-center shrink-0"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Top 3 Live Matched Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topSchemes.map((scheme, idx) => {
            const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
            return (
              <Link
                key={scheme.id}
                to={`/schemes/${scheme.id}`}
                className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-soft-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base">{medalEmoji}</span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{scheme.matchScore} Match</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 uppercase tracking-wider block mb-1 truncate">
                    {scheme.ministry}
                  </span>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {scheme.name}
                  </h4>

                  <p className="text-xs font-extrabold text-emerald-700 mt-2">
                    {scheme.financialBenefits?.subsidyPercentage || `Up to ₹${(scheme.financialBenefits?.maximumFunding || 0).toLocaleString('en-IN')}`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
