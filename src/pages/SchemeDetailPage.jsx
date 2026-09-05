import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ExternalLink,
  Coins,
  Layers,
  FileCheck,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useLanguage } from '../context/LanguageContext';
import {
  localizeMinistry,
  localizePillar,
  localizeFacilityType,
  localizeCategoryLabel
} from '../i18n/schemesTranslations';
import { localizeBusinessValue } from '../i18n/platformTranslations';
import { schemeApi } from '../services/schemeApi';
import SchemeAdvisorChat from '../components/schemes/SchemeAdvisorChat';

export default function SchemeDetailPage() {
  const { id } = useParams();
  const { profile } = useEntrepreneurProfile();
  const { t, language } = useLanguage();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSavedInRoadmap, setIsSavedInRoadmap] = useState(false);
  const [showRoadmapSuccess, setShowRoadmapSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadScheme() {
      try {
        setLoading(true);
        setError(null);
        const matchData = await schemeApi.getSchemeMatch(id, profile);
        if (isMounted) {
          setScheme(matchData);
          const savedIds = schemeApi.getSelectedSchemeIds();
          setIsSavedInRoadmap(savedIds.includes(id));
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Scheme not found');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadScheme();
    return () => { isMounted = false; };
  }, [id, profile]);

  const handleToggleRoadmap = async () => {
    if (isSavedInRoadmap) {
      await schemeApi.unselectScheme(id);
      setIsSavedInRoadmap(false);
    } else {
      await schemeApi.selectSchemeForRoadmap(id);
      setIsSavedInRoadmap(true);
      setShowRoadmapSuccess(true);
      setTimeout(() => setShowRoadmapSuccess(false), 4000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Evaluating scheme eligibility & benefits...</p>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-rose-200 p-8 max-w-xl mx-auto space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Scheme Not Found</h2>
        <p className="text-sm text-slate-500">{error || 'Unable to locate requested scheme details.'}</p>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Government Schemes</span>
        </Link>
      </div>
    );
  }

  const {
    name,
    ministry,
    department,
    shortDescription,
    schemeCategoryLabel,
    matchScore,
    eligibility,
    financialBenefits,
    documentChecklist = [],
    applicationProcess = [],
    officialWebsite,
    mySchemeUrl,
    officialSource,
    lastVerified,
    keyHighlights = []
  } = scheme;

  const matchedPillars = eligibility?.matchedPillars || [];
  const warnings = eligibility?.warnings || [];
  const disqualifications = eligibility?.disqualifications || [];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 max-w-6xl mx-auto">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('schemes.backToMatcher', 'Back to Schemes Matcher')}</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold text-slate-400">
            {t('schemes.lastVerified', 'Last Verified:')} <strong className="text-slate-700">{lastVerified}</strong>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('schemes.verifiedSource', 'Verified Source')}</span>
          </span>
        </div>
      </div>

      {/* Main Header Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                {localizeCategoryLabel(scheme, t, language)}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {localizeMinistry(ministry, language)} {department ? `· ${localizeMinistry(department, language)}` : ''}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {localizeBusinessValue(name, language)}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {localizeBusinessValue(shortDescription, language)}
            </p>

            {/* Highlights Pills */}
            {keyHighlights.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {keyHighlights.map((hl, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{localizeBusinessValue(hl, language)}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Match Score Badge & Roadmap Action */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 shrink-0 flex flex-col justify-between text-center lg:w-64 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {t('schemes.profileCompatibility', 'Profile Compatibility')}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 mt-1 block">
                {matchScore}
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {t('schemes.matchScore', 'Match Score')}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">
                {t('schemes.profileReflects', 'Reflects alignment with your declared profile.')}
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleToggleRoadmap}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-soft-xs flex items-center justify-center gap-1.5 ${
                  isSavedInRoadmap
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSavedInRoadmap ? (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>{t('schemes.savedInRoadmap', 'Saved in Roadmap')}</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>{t('schemes.addRoadmap', 'Add to My Roadmap')}</span>
                  </>
                )}
              </button>

              {officialWebsite && (
                <a
                  href={officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{t('schemes.visitNodalPortal', 'Visit Nodal Portal')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {mySchemeUrl && (
                <a
                  href={mySchemeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{t('schemes.nationalPortal', 'National myScheme Portal')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Roadmap Saved Confirmation Banner */}
        {showRoadmapSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('schemes.roadmapSuccess', "Successfully added to your business roadmap! You can track this scheme's preparation steps.")}</span>
          </div>
        )}
      </div>

      {/* 2-Column Grid: Match Analysis & Financial Potential */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Col: YOUR MATCH EVALUATION */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t('schemes.matchBreakdown', 'Your Match Breakdown')}</span>
            </h2>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
              eligibility?.status === 'ELIGIBLE'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {eligibility?.status === 'ELIGIBLE' ? t('schemes.eligible', 'Eligible') : t('schemes.potentiallyEligible', 'Potentially Eligible')}
            </span>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {t('schemes.whyMatchesProfile', 'Why this matches your profile:')}
            </span>
            <div className="space-y-2">
              {matchedPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{localizePillar(pillar, t, language)}</span>
                </div>
              ))}
            </div>

            {warnings.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  {t('schemes.considerations', 'Considerations / Criteria to Confirm:')}
                </span>
                {warnings.map((w, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-amber-800 font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{localizeBusinessValue(w, language)}</span>
                  </div>
                ))}
              </div>
            )}

            {disqualifications.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block">
                  {t('schemes.unmatchedConditions', 'Unmatched Conditions:')}
                </span>
                {disqualifications.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-rose-800 font-medium">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{localizeBusinessValue(d, language)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 font-medium">
            <p className="font-semibold text-slate-700 mb-1">{t('schemes.officialDisclaimer', 'Official Disclaimer:')}</p>
            {localizeBusinessValue(eligibility?.disclaimer, language)}
          </div>
        </div>

        {/* Right Col: POTENTIAL FINANCIAL BENEFITS */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>{t('schemes.potentialBenefitsTitle', 'Potential Benefits & Financing Structure')}</span>
            </h2>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              ₹{(financialBenefits?.maximumFunding || 0).toLocaleString('en-IN')} {t('schemes.upTo', 'Max')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.facilityType', 'Facility Type')}</span>
              <strong className="text-slate-900 text-xs sm:text-sm capitalize mt-0.5 block">
                {localizeFacilityType(financialBenefits?.fundingType, t)}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.subsidyScale', 'Subsidy Scale')}</span>
              <strong className="text-emerald-700 text-xs sm:text-sm mt-0.5 block">
                {localizeBusinessValue(financialBenefits?.subsidyPercentage || 'Direct Credit Guarantee', language)}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.subsidyDetails', 'Subsidy Details')}</span>
              <p className="text-slate-700 text-xs font-medium mt-1 leading-relaxed">
                {localizeBusinessValue(financialBenefits?.subsidyDetails || 'N/A', language)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.marginMoney', 'Margin Money (Promoter Equity)')}</span>
              <p className="text-slate-700 text-xs font-medium mt-1 leading-relaxed">
                {localizeBusinessValue(financialBenefits?.marginMoneyDetails || 'Standard margin applicable', language)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.collateralGuarantee', 'Collateral & Guarantee')}</span>
              <p className="text-slate-700 text-xs font-medium mt-1 leading-relaxed">
                {localizeBusinessValue(financialBenefits?.collateralRequirement || 'No collateral required up to limit', language)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t('schemes.repaymentTerms', 'Loan & Repayment Terms')}</span>
              <p className="text-slate-700 text-xs font-medium mt-1 leading-relaxed">
                {localizeBusinessValue(financialBenefits?.repaymentDetails, language)} {financialBenefits?.interestDetails ? `· ${localizeBusinessValue(financialBenefits.interestDetails, language)}` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section: REQUIRED DOCUMENTS CHECKLIST (Section 12) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('schemes.docChecklistTitle', 'Document Checklist & Profile Readiness')}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t('schemes.docReadinessNote', 'Cross-referenced with information collected during your onboarding.')}
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl self-start sm:self-center">
            {documentChecklist.filter(d => d.status === 'AVAILABLE_FROM_PROFILE').length} {t('schemes.of', 'of')} {documentChecklist.length} {t('schemes.accountedFor', 'Document Types Accounted For')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {documentChecklist.map((doc, idx) => {
            const isReady = doc.status === 'AVAILABLE_FROM_PROFILE';
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isReady
                    ? 'bg-emerald-50/40 border-emerald-200/80'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {localizeBusinessValue(doc.name, language)}
                    </span>
                    {doc.mandatory && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
                        {t('schemes.mandatory', 'Mandatory')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {localizeBusinessValue(doc.description, language)}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-600 pt-0.5">
                    {localizeBusinessValue(doc.statusNote, language)}
                  </p>
                </div>

                <div className="shrink-0 mt-0.5">
                  {isReady ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t('schemes.available', 'Available')}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t('schemes.toPrepare', 'To Prepare')}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: HOW TO APPLY STEP-BY-STEP */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>{t('schemes.howToApplyTitle', 'How to Apply: Verified Application Sequence')}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {t('schemes.workflowNote', 'Standard government workflow according to nodal agency operating guidelines.')}
          </p>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {applicationProcess.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black ring-4 ring-white shadow-soft-xs">
                {step.step}
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 ml-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {localizeBusinessValue(step.title, language)}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {localizeBusinessValue(step.description, language)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: OFFICIAL SOURCE & DATA TRUST (Section 21) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            {t('schemes.dataTrustTitle', 'Data Trust & Provenance')}
          </span>
          <h3 className="text-base font-black text-white">
            {t('schemes.sourceLabel', 'Source:')} {officialSource}
          </h3>
          <p className="text-xs text-slate-400">
            {t('schemes.lastVerified', 'Last Verified:')} {lastVerified} · {t('schemes.verifiedAsOf', 'Verified directly from official departmental notifications.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {officialWebsite && (
            <a
              href={officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-soft-sm transition-all"
            >
              <span>{t('schemes.nodalAgencyPortal', 'Nodal Agency Portal')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {mySchemeUrl && (
            <a
              href={mySchemeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all"
            >
              <span>{t('schemes.nationalMySchemePage', 'National myScheme Page')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Section: Grounded Scheme AI Q&A Assistant */}
      <SchemeAdvisorChat
        profile={profile}
        scheme={scheme}
        title={`AI Advisor for ${name}`}
      />
    </div>
  );
}
