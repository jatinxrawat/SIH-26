import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, ArrowRight, Sparkles, CheckCircle2, PlusCircle, BookmarkCheck } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import { useBusiness } from '../../context/BusinessContext';
import { useRoadmap } from '../../roadmap/context/RoadmapContext';
import { schemeApi } from '../../services/schemeApi';

export default function RecommendationsPreview() {
  const { profile } = useEntrepreneurProfile();
  const { activeBusiness } = useBusiness();
  const { selectedSchemeId, selectScheme } = useRoadmap();

  const business = activeBusiness || profile?.business || profile || {};
  const sector = business.sector || 'General';

  const [allRecommended, setAllRecommended] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function loadTopSchemes() {
      setLoading(true);
      try {
        const ranked = await schemeApi.getRecommendations(business);
        const storedSelected = schemeApi.getSelectedSchemeIds() || [];
        if (isMounted) {
          setAllRecommended(ranked || []);
          setSavedSchemeIds(storedSelected);
          setLoading(false);
        }
      } catch (e) {
        console.error('Error loading top schemes for dashboard:', e);
        if (isMounted) setLoading(false);
      }
    }
    loadTopSchemes();
    return () => { isMounted = false; };
  }, [business.sector, business.location, business.stage]);

  const handleToggleRoadmap = async (e, schemeId) => {
    e.preventDefault();
    e.stopPropagation();

    const isAlreadySaved = savedSchemeIds.includes(schemeId) || selectedSchemeId === schemeId;
    if (isAlreadySaved) {
      await schemeApi.unselectScheme(schemeId);
      setSavedSchemeIds((prev) => prev.filter((id) => id !== schemeId));
    } else {
      await schemeApi.selectSchemeForRoadmap(schemeId);
      if (selectScheme) selectScheme(schemeId);
      setSavedSchemeIds((prev) => [...prev, schemeId]);
    }
  };

  const filteredSchemes = allRecommended.filter((s) => {
    if (activeFilter === 'SUBSIDY') {
      return (
        s.schemeType?.toLowerCase().includes('subsidy') ||
        Boolean(s.financialBenefits?.subsidyPercentage)
      );
    }
    if (activeFilter === 'CREDIT') {
      return (
        s.schemeType?.toLowerCase().includes('loan') ||
        s.schemeType?.toLowerCase().includes('credit') ||
        Boolean(s.financialBenefits?.interestSubvention)
      );
    }
    return true;
  }).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 🏛️ Live Government Support Matches Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Landmark className="w-3 h-3 text-emerald-600" />
              <span>Government Support Opportunities</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {allRecommended.length > 0 ? `${allRecommended.length} Aligned Schemes for ${business.name || 'Your Business'}` : 'Matching Government Programs'}
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic evaluation against your {sector} profile in {business.location || 'India'}.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {/* Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Top Matches
              </button>
              <button
                onClick={() => setActiveFilter('SUBSIDY')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'SUBSIDY'
                    ? 'bg-white text-slate-900 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subsidies
              </button>
              <button
                onClick={() => setActiveFilter('CREDIT')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  activeFilter === 'CREDIT'
                    ? 'bg-white text-slate-900 shadow-soft-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bank Credit
              </button>
            </div>

            <Link
              to="/schemes"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-soft-xs shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-slate-400">Evaluating scheme eligibility criteria...</span>
          </div>
        )}

        {/* Top 3 Matched Schemes Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSchemes.map((scheme, idx) => {
              const medalEmoji = idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉';
              const isSelected = savedSchemeIds.includes(scheme.id) || selectedSchemeId === scheme.id;

              return (
                <div
                  key={scheme.id}
                  className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-soft-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base">{medalEmoji}</span>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{scheme.matchScore || '95%'} Match</span>
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

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => handleToggleRoadmap(e, scheme.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                      title={isSelected ? 'Remove from Roadmap' : 'Add to Roadmap'}
                    >
                      {isSelected ? (
                        <>
                          <BookmarkCheck className="w-3 h-3 text-emerald-700" />
                          <span>In Roadmap</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3 h-3 text-slate-500" />
                          <span>Add to Roadmap</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/schemes/${scheme.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
