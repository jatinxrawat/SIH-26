import React from 'react';
import { Coins, ShieldCheck } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';

export default function FundingPage() {
  const { profile } = useEntrepreneurProfile();
  const { t, language } = useLanguage();

  const finances = profile?.financialProfile || {};
  const capital = finances.availableCapital || '₹50,000 - ₹2 Lakhs';
  const projectCost = finances.estimatedProjectCost || '₹5 Lakhs - ₹10 Lakhs';
  const fundingNeeded = finances.fundingRequired || '₹5,00,000';
  const preferredType = finances.preferredFundingType || 'Government scheme grant / credit guarantee';

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('funding.capitalStackBadge', 'Capital Stack Architecture')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('funding.fundingTitle', 'Funding & Financial Planning')}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t('funding.fundingSubtitle', 'Structure your project cost into self-margin, government capital subsidy, and collateral-free bank credit.')}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            {t('funding.fundingRequired', 'Funding Required')}
          </span>
          <strong className="text-lg font-black text-slate-900">{fundingNeeded}</strong>
        </div>
      </div>

      {/* Financial Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {t('funding.availableMargin', 'Available Margin')}
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {localizeBusinessValue(capital, language)}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-2">
            {t('funding.selfContribution', 'Self-Contribution')}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {t('funding.estimatedProjectCost', 'Estimated Project Cost')}
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {localizeBusinessValue(projectCost, language)}
          </p>
          <span className="text-[11px] text-slate-500 font-semibold block mt-2">
            {t('funding.totalOutlayRequired', 'Total Outlay Required')}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {t('funding.preferredChannel', 'Preferred Channel')}
          </span>
          <p className="text-base font-bold text-slate-900 mt-1 truncate" title={preferredType}>
            {localizeBusinessValue(preferredType, language)}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-2">
            {t('funding.selectedInOnboarding', 'Selected in Onboarding')}
          </span>
        </div>
      </div>

      {/* Capital Stack Architecture Visual Preview */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('funding.recommendedCapitalModel', 'Recommended Capital Structure Model')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('funding.modelSubtitle', 'How your funding requirement will be assembled to minimize interest burden')}
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t('funding.previewMode', 'Preview Mode')}
          </span>
        </div>

        {/* Visual Stack Bar */}
        <div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex shadow-inner">
            <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Promoter Margin (25%)" />
            <div className="bg-emerald-600 h-full" style={{ width: '35%' }} title="Govt Subsidy (35%)" />
            <div className="bg-sky-600 h-full" style={{ width: '40%' }} title="Bank Term Loan (40%)" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>{t('funding.promoterMargin', '1. Own Margin (10 - 25%)')}</span>
              </div>
              <p className="text-amber-800/80 mt-1 text-[11px]">
                {t('funding.promoterMarginDesc', 'Entrepreneur savings and promoter equity required by banks.')}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>{t('funding.govtSubsidy', '2. Government Subsidy (15 - 35%)')}</span>
              </div>
              <p className="text-emerald-800/80 mt-1 text-[11px]">
                {t('funding.govtSubsidyDesc', 'Back-ended or direct credit grant via PMEGP, PMFME, or state schemes.')}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200/80">
              <div className="flex items-center gap-1.5 font-bold text-sky-900">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                <span>{t('funding.bankLoan', '3. Bank Loan (40 - 65%)')}</span>
              </div>
              <p className="text-sky-800/80 mt-1 text-[11px]">
                {t('funding.bankLoanDesc', 'Institutional term loan or working capital under CGTMSE guarantee.')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block font-semibold">
              {t('funding.zeroCredentialsTitle', 'Zero Sensitive Credentials:')}
            </strong>
            <span>
              {t('funding.zeroCredentialsDesc', 'UdyamSaathi calculates financial allocations and formats bank project reports (DPR). We never collect bank account passwords, card pins, or netbanking credentials.')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
