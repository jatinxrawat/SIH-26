import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Landmark,
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight,
  Bot,
  RotateCcw,
  BookmarkCheck,
  ShieldAlert,
  ChevronRight,
  ChevronLeft,
  Scale,
  Loader2
} from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { schemeApi } from '../services/schemeApi';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeFilters from '../components/schemes/SchemeFilters';
import SchemeMatchingLoader from '../components/schemes/SchemeMatchingLoader';
import SchemeComparisonModal from '../components/schemes/SchemeComparisonModal';
import SchemeAdvisorChat from '../components/schemes/SchemeAdvisorChat';

export default function SchemesPage() {
  const { profile } = useEntrepreneurProfile();

  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [whyRecommendAi, setWhyRecommendAi] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filters State
  const [filters, setFilters] = useState({
    search: '',
    category: 'ALL',
    sector: 'ALL',
    fundingRange: 'ALL',
    locationScope: 'ALL'
  });

  // Selected Schemes for Comparison (Array of scheme IDs, max 3)
  const [comparedSchemeIds, setComparedSchemeIds] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Selected Schemes for Roadmap
  const [roadmapSchemeIds, setRoadmapSchemeIds] = useState([]);

  // Profile parameter shortcuts
  const sector = profile?.business?.sector || 'Manufacturing / Services';
  const state = profile?.personalInfo?.state || 'India';
  const category = profile?.eligibilityProfile?.category || 'General';
  const fundingRequired = profile?.financialProfile?.fundingRequired || profile?.financialProfile?.estimatedProjectCost || '₹5 Lakhs';
  const businessStage = profile?.business?.stage || 'PLANNING';
  const businessName = profile?.business?.name || 'Your Enterprise';

  // Check Profile Completeness (Section 25)
  const missingProfileFields = useMemo(() => {
    const missing = [];
    if (!profile?.personalInfo?.state) missing.push('Business State / Location');
    if (!profile?.business?.sector) missing.push('Industry Sector');
    if (!profile?.business?.stage) missing.push('Business Stage');
    if (!profile?.financialProfile?.estimatedProjectCost && !profile?.financialProfile?.fundingRequired) {
      missing.push('Estimated Project Cost');
    }
    return missing;
  }, [profile]);

  // Load recommendations and initial state
  useEffect(() => {
    let isMounted = true;

    async function loadMatcher() {
      try {
        setLoading(true);
        // Evaluate all schemes with the deterministic engine
        const ranked = await schemeApi.getRecommendations(profile);
        if (isMounted) {
          setRecommendations(ranked);
          setRoadmapSchemeIds(schemeApi.getSelectedSchemeIds());
        }

        // Generate AI explanation for the top matched scheme
        if (ranked.length > 0) {
          setLoadingAi(true);
          try {
            const aiText = await schemeApi.getWhyWeRecommendExplanation(profile, ranked[0]);
            if (isMounted) setWhyRecommendAi(aiText);
          } catch (aiErr) {
            console.warn('AI Explanation error:', aiErr);
          } finally {
            if (isMounted) setLoadingAi(false);
          }
        }
      } catch (err) {
        console.error('Error in scheme matching engine:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMatcher();
    return () => { isMounted = false; };
  }, [profile]);

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'ALL',
      sector: 'ALL',
      fundingRange: 'ALL',
      locationScope: 'ALL'
    });
    setCurrentPage(1);
  };

  // Toggle comparison selection
  const handleToggleCompare = (schemeId) => {
    setComparedSchemeIds(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      }
      if (prev.length < 3) {
        return [...prev, schemeId];
      }
      return prev;
    });
  };

  // Toggle Roadmap selection
  const handleToggleRoadmap = async (schemeId) => {
    if (roadmapSchemeIds.includes(schemeId)) {
      await schemeApi.unselectScheme(schemeId);
      setRoadmapSchemeIds(prev => prev.filter(id => id !== schemeId));
    } else {
      await schemeApi.selectSchemeForRoadmap(schemeId);
      setRoadmapSchemeIds(prev => [...prev, schemeId]);
    }
  };

  // Filtered recommendations list
  const filteredSchemes = useMemo(() => {
    return recommendations.filter(scheme => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          scheme.name.toLowerCase().includes(q) ||
          scheme.shortDescription.toLowerCase().includes(q) ||
          scheme.ministry.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      // Scheme Type
      if (filters.category !== 'ALL' && scheme.schemeType !== filters.category) {
        return false;
      }

      // Business Sector
      if (filters.sector !== 'ALL') {
        const matchesSector =
          scheme.businessSectors.includes('ALL') ||
          scheme.businessSectors.includes(filters.sector);
        if (!matchesSector) return false;
      }

      // Location Scope / Jurisdiction
      if (filters.locationScope === 'CENTRAL') {
        if (scheme.jurisdictionType ? scheme.jurisdictionType !== 'CENTRAL' : !scheme.applicableStates.includes('ALL')) return false;
      } else if (filters.locationScope === 'STATE') {
        if (scheme.jurisdictionType ? scheme.jurisdictionType !== 'STATE' : scheme.applicableStates.includes('ALL')) return false;
      } else if (filters.locationScope === 'BANKING') {
        if (scheme.jurisdictionType !== 'BANKING') return false;
      } else if (filters.locationScope === 'PRIVATE') {
        if (scheme.jurisdictionType !== 'PRIVATE') return false;
      }

      // Funding Range
      if (filters.fundingRange !== 'ALL') {
        const maxFunding = scheme.financialBenefits?.maximumFunding || 0;
        if (filters.fundingRange === 'UNDER_1L' && maxFunding > 100000) return false;
        if (filters.fundingRange === '1L_5L' && (maxFunding < 100000 || maxFunding > 500000)) return false;
        if (filters.fundingRange === '5L_10L' && (maxFunding < 500000 || maxFunding > 1000000)) return false;
        if (filters.fundingRange === '10L_25L' && (maxFunding < 1000000 || maxFunding > 2500000)) return false;
        if (filters.fundingRange === '25L_PLUS' && maxFunding < 2500000) return false;
      }

      return true;
    });
  }, [recommendations, filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSchemes.length / (itemsPerPage === 'ALL' ? filteredSchemes.length || 1 : itemsPerPage)) || 1;
  const paginatedSchemes = useMemo(() => {
    if (itemsPerPage === 'ALL') return filteredSchemes;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSchemes.slice(start, start + itemsPerPage);
  }, [filteredSchemes, currentPage, itemsPerPage]);

  const topMatch = recommendations[0];

  // Compare schemes objects
  const comparedSchemesList = useMemo(() => {
    return recommendations.filter(s => comparedSchemeIds.includes(s.id));
  }, [recommendations, comparedSchemeIds]);

  if (loading) {
    return <SchemeMatchingLoader businessName={businessName} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header with Value Proposition */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Government Scheme Matcher</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Government Support Opportunities
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
            Deterministic eligibility evaluation across verified Central and State MSME programs.
            Ranked specifically for <strong className="text-slate-900">{businessName}</strong>.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Synchronized</span>
          </div>
          {roadmapSchemeIds.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shrink-0 shadow-soft-xs">
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span>{roadmapSchemeIds.length} in Roadmap</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Active Profile Parameters Pill Ribbon */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active Match Parameters From Your Profile</span>
          </span>
          <Link
            to="/profile"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Edit Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">State / Location</span>
            <strong className="text-slate-900 text-xs sm:text-sm truncate block">{state}</strong>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
            <strong className="text-slate-900 text-xs sm:text-sm truncate block">{category}</strong>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Industry Sector</span>
            <strong className="text-slate-900 text-xs sm:text-sm truncate block">{sector}</strong>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Business Stage</span>
            <strong className="text-slate-900 text-xs sm:text-sm truncate block">{businessStage}</strong>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-soft-xs col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Capital Need</span>
            <strong className="text-slate-900 text-xs sm:text-sm truncate block">{fundingRequired}</strong>
          </div>
        </div>
      </div>

      {/* 3. Profile Completeness Alert (Section 25) */}
      {missingProfileFields.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Improve Your Match Accuracy
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Your profile is missing details that could unlock state-specific subsidies:{' '}
                <strong>{missingProfileFields.join(', ')}</strong>.
              </p>
            </div>
          </div>
          <Link
            to="/profile"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shrink-0 self-start sm:self-center transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      )}

      {/* 4. AI "Why We Recommend This" Top Match Spotlight (Section 15 & 13) */}
      {topMatch && topMatch.matchScore >= 75 && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-soft-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                {loadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bot className="w-3.5 h-3.5" />}
                <span>AI Recommendation Spotlight</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Why We Recommend {topMatch.name}
              </h2>
              <div className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-medium whitespace-pre-line">
                {whyRecommendAi || (
                  <p>
                    {topMatch.name} is currently your strongest match ({topMatch.matchScore} Match Score)
                    because it supports {sector} in {state}, provides capital subsidies up to 35%,
                    and aligns with your {businessStage} stage.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 shrink-0 flex flex-col justify-between text-center lg:w-72">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                  Top Matched Program
                </span>
                <span className="text-3xl font-black text-white mt-1 block">
                  {topMatch.matchScore}
                </span>
                <span className="text-[11px] text-emerald-200 font-semibold">
                  Match Score
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <Link
                  to={`/schemes/${topMatch.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-soft-md"
                >
                  <span>Inspect Top Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Filter Toolbar */}
      <SchemeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalCount={recommendations.length}
        matchedCount={filteredSchemes.length}
      />

      {/* 6. Results Section: "Your Best Matches" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Your Ranked Government Schemes
            </h2>
            <p className="text-xs text-slate-500">
              Ranked deterministically by alignment with your business profile.
            </p>
          </div>

          {comparedSchemeIds.length > 0 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-soft-sm transition-all animate-bounce"
            >
              <Scale className="w-4 h-4" />
              <span>Compare {comparedSchemeIds.length} Schemes</span>
            </button>
          )}
        </div>

        {filteredSchemes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {paginatedSchemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSelectedForRoadmap={roadmapSchemeIds.includes(scheme.id)}
                  onToggleRoadmap={handleToggleRoadmap}
                  isCompared={comparedSchemeIds.includes(scheme.id)}
                  onToggleCompare={handleToggleCompare}
                  canCompareMore={comparedSchemeIds.length < 3}
                />
              ))}
            </div>

            {/* Pagination & Page Size Controls */}
            {filteredSchemes.length > 12 && (
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>
                    Showing <strong className="text-slate-800 font-bold">{itemsPerPage === 'ALL' ? 1 : (currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="text-slate-800 font-bold">{itemsPerPage === 'ALL' ? filteredSchemes.length : Math.min(currentPage * itemsPerPage, filteredSchemes.length)}</strong> of <strong className="text-emerald-700 font-bold">{filteredSchemes.length}</strong> schemes
                  </span>
                  <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                    <span className="text-[11px] text-slate-400">Per Page:</span>
                    {[12, 24, 48].map(size => (
                      <button
                        key={size}
                        onClick={() => { setItemsPerPage(size); setCurrentPage(1); }}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                          itemsPerPage === size
                            ? 'bg-emerald-600 text-white shadow-soft-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                    <button
                      onClick={() => { setItemsPerPage('ALL'); setCurrentPage(1); }}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                        itemsPerPage === 'ALL'
                          ? 'bg-emerald-600 text-white shadow-soft-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All
                    </button>
                  </div>
                </div>

                {itemsPerPage !== 'ALL' && totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .map((page, idx, arr) => {
                          const prevPage = arr[idx - 1];
                          const showEllipsis = prevPage && page - prevPage > 1;
                          return (
                            <React.Fragment key={page}>
                              {showEllipsis && <span className="px-1 text-slate-400 text-xs">...</span>}
                              <button
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                                  currentPage === page
                                    ? 'bg-emerald-600 text-white shadow-soft-xs'
                                    : 'text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          );
                        })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Empty State (Section 24) */
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/90 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              We couldn't find a matching scheme for these filters
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              This doesn't mean you're ineligible for government support. Try broadening your criteria:
            </p>
            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 text-left space-y-2 max-w-md mx-auto font-medium">
              <p>• Try selecting <strong>"All Schemes"</strong> or <strong>"All Sectors"</strong></p>
              <p>• Expand your target <strong>Funding Scale</strong></p>
              <p>• Complete missing profile details in your account</p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-soft-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Browse All Available Schemes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 7. Embedded Grounded AI Scheme Advisor Assistant (Section 14) */}
      <SchemeAdvisorChat
        profile={profile}
        matchedSchemes={recommendations}
        title="AI Scheme Navigator & Eligibility Counselor"
      />

      {/* 8. Scheme Comparison Modal */}
      {showComparisonModal && (
        <SchemeComparisonModal
          schemes={comparedSchemesList}
          profile={profile}
          onClose={() => setShowComparisonModal(false)}
          onRemoveScheme={handleToggleCompare}
        />
      )}
    </div>
  );
}
