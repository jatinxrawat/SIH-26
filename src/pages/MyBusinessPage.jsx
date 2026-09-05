import React, { useState, useMemo } from 'react';
import {
  Building2,
  MapPin,
  Tag,
  Users,
  Calendar,
  ShieldCheck,
  Edit3,
  Plus,
  ArrowRight,
  IndianRupee,
  Briefcase,
  Layers,
  CheckCircle2,
  AlertCircle,
  Trash2,
  PieChart,
  FileCheck,
  TrendingUp,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';
import EditBusinessModal from '../components/business/EditBusinessModal';
import AddBusinessModal from '../components/business/AddBusinessModal';

export default function MyBusinessPage() {
  const { businesses, activeBusiness, activeBusinessId, setActiveBusiness, deleteBusiness } = useBusiness();
  const { language, t } = useLanguage();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deleting, setDeleting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const business = activeBusiness || {};
  const personal = business.personalInfo || {};
  const finances = business.financialProfile || {};
  const goals = business.goals || {};

  // Deterministic calculation of profile completeness
  const readiness = useMemo(() => {
    const fields = [
      business.name,
      business.stage,
      business.type,
      business.sector,
      business.description,
      business.productService,
      business.targetCustomers,
      business.location,
      business.areaClassification,
      business.operatingStatus,
      business.registrationStatus,
      finances.estimatedProjectCost,
      finances.availableCapital,
      finances.fundingRequired,
      goals.primaryChallenge,
      goals.twelveMonthGoal
    ];

    const filledCount = fields.filter((f) => f && f.toString().trim() !== '' && f !== 'N/A').length;
    const completenessPercent = Math.round((filledCount / fields.length) * 100);

    const isRegistered = (business.registrationStatus || '').toLowerCase().includes('udyam') ||
      (business.registrationStatus || '').toLowerCase().includes('gst');

    const hasFundingGap = finances.fundingRequired && finances.fundingRequired !== 'N/A' && finances.fundingRequired !== '0';

    return {
      completenessPercent,
      isRegistered,
      hasFundingGap,
      registrationStatusText: isRegistered
        ? t('business.registeredNotice', 'Statutory entity registered (Eligible for Priority MSME schemes)')
        : t('business.unregisteredNotice', 'Unregistered (Udyam registration recommended for subsidies)'),
      fundingStatusText: hasFundingGap
        ? `${t('business.fundingGap', 'Funding gap')}: ${finances.fundingRequired} — ${t('business.fundingGapNotice', 'Aligned for PMEGP/CGTMSE')}`
        : t('business.selfFundedNotice', 'Self-funded / Seed phase'),
      documentStatusText: isRegistered ? t('business.kycReady', 'Core business KYC ready') : t('business.identityVerified', 'Basic identity verified')
    };
  }, [business, finances, goals, t]);

  const handleDeleteBusiness = async () => {
    if (!business.id || businesses.length <= 1) return;
    try {
      setDeleting(true);
      await deleteBusiness(business.id);
      setIsDeleteModalOpen(false);
      showToast('Business removed successfully.');
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PART 2: Redesigned Top Business Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity & Badges */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-soft-md shrink-0">
              <Building2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {business.name || 'RoomNext'}
                </h1>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {localizeBusinessValue(business.stage ? business.stage.replace('_', ' ') : 'IDEA', language)}
                </span>
                <span className="text-xs text-slate-300 font-medium">•</span>
                <span className="text-xs font-bold text-slate-600">
                  {localizeBusinessValue(business.sector || 'Services', language)}
                </span>
                <span className="text-xs text-slate-300 font-medium">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{localizeBusinessValue(business.location || 'Agra, Uttar Pradesh', language)}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                {business.description || 'Registered entity profile and operational details.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start lg:self-center">
            {/* Add Business Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all shadow-soft-xs"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('business.addBusiness', '+ Add Business')}</span>
            </button>

            {/* Edit Business Info Button */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-soft-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{t('business.editBusinessInfo', '✎ Edit Business Info')}</span>
            </button>
          </div>
        </div>

        {/* Business Selector Quick Bar if multiple exist */}
        {businesses.length > 1 && (
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('business.switchActive', 'Switch Active Business:')}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {businesses.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setActiveBusiness(b.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      b.id === activeBusinessId
                        ? 'bg-emerald-600 text-white shadow-soft-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-medium">
              {t('business.managingEnterprises', `Managing ${businesses.length} enterprises`).replace('{count}', businesses.length)}
            </div>
          </div>
        )}
      </div>

      {/* PART 9: Business Overview Grid */}
      <div className="space-y-6">
        {/* Row 1: Entity Structure & Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Entity Structure */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {t('business.entityStructure', 'Entity Structure')}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {t('business.legalSetup', 'Legal Setup')}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.businessStructure', 'Business Structure:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.type || 'Proprietorship', language)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.industrySector', 'Industry Sector:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.sector || 'Services', language)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.operatingStatus', 'Operating Status:')}</span>
                <strong className="text-slate-900">
                  {localizeBusinessValue(business.operatingStatus || 'Planning to Launch', language)}
                </strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.registeredLocation', 'Registered Location:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.location || 'Agra, Uttar Pradesh', language)}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">{t('business.areaClassification', 'Area Classification:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.areaClassification || 'Urban', language)}</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Operations & Compliance */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {t('business.operationsCompliance', 'Operations & Compliance')}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {t('business.regulatory', 'Regulatory')}
              </span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.registrationStatus', 'Registration Status:')}</span>
                <span className={`font-bold px-2 py-0.5 rounded-lg text-xs ${
                  readiness.isRegistered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {localizeBusinessValue(business.registrationStatus || 'Unregistered', language)}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.licensesHeld', 'Licenses Held:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.licensesHeld || 'None', language)}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.teamSize', 'Team Size:')}</span>
                <strong className="text-slate-900">{business.employeesCount || '0'} {t('business.teamMembers', 'Team Members')}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.monthlyRevenue', 'Monthly Revenue:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.monthlyRevenue || 'N/A', language)}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">{t('business.annualRevenue', 'Annual Revenue Bracket:')}</span>
                <strong className="text-slate-900">{localizeBusinessValue(business.annualRevenue || 'N/A', language)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Concept & Target Market (Full Width) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                {t('business.conceptTargetMarket', 'Concept & Target Market')}
              </h2>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {t('business.valueProposition', 'Value Proposition')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 font-bold block mb-1.5">{t('business.conceptDescription', 'Business Concept Description:')}</span>
              <p className="text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 min-h-[90px]">
                {business.description || 'No business description provided.'}
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-slate-500 font-bold block mb-1">{t('business.productService', 'Product / Service Provided:')}</span>
                <p className="text-slate-800 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {localizeBusinessValue(business.productService || 'General Products/Services', language)}
                </p>
              </div>
              <div>
                <span className="text-slate-500 font-bold block mb-1">{t('business.targetCustomers', 'Target Customers:')}</span>
                <p className="text-slate-800 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {localizeBusinessValue(business.targetCustomers || 'Local consumers & retail', language)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Financial Snapshot & Business Readiness */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 4: Financial Snapshot */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {t('business.financialSnapshot', 'Financial Snapshot')}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {t('business.capitalStack', 'Capital Stack')}
              </span>
            </div>

            {/* Financial metric tiles */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {t('business.projectCost', 'Project Cost')}
                </span>
                <strong className="text-sm sm:text-base font-black text-slate-900 block mt-0.5">
                  {finances.estimatedProjectCost || '₹3,00,000'}
                </strong>
                <span className="text-[9px] text-slate-400 font-medium">{t('business.totalOutlay', 'Total Outlay')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  {t('business.ownCapital', 'Own Capital')}
                </span>
                <strong className="text-sm sm:text-base font-black text-emerald-900 block mt-0.5">
                  {finances.availableCapital || '₹75,000'}
                </strong>
                <span className="text-[9px] text-emerald-600 font-medium">{t('business.selfMargin', 'Self Margin')}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">
                  {t('business.fundingGap', 'Funding Gap')}
                </span>
                <strong className="text-sm sm:text-base font-black text-amber-900 block mt-0.5">
                  {finances.fundingRequired || '₹2,25,000'}
                </strong>
                <span className="text-[9px] text-amber-600 font-medium">{t('business.creditGrant', 'Credit / Grant')}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500 font-medium">{t('business.preferredChannel', 'Preferred Channel:')}</span>
                <strong className="text-slate-900 truncate max-w-[220px]">
                  {localizeBusinessValue(finances.preferredFundingType || 'Government scheme / credit guarantee', language)}
                </strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">{t('business.existingDebt', 'Existing Debt:')}</span>
                <strong className="text-slate-900">
                  {localizeBusinessValue(finances.hasExistingLoans === 'Yes' ? 'Active Loans' : 'Debt Free', language)}
                </strong>
              </div>
            </div>
          </div>

          {/* Card 5: Business Readiness & Health (Deterministic) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  {t('business.businessReadinessHealth', 'Business Readiness & Health')}
                </h2>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-black">
                {readiness.completenessPercent}% {t('common.completed', 'Complete')}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>{t('business.profileReadinessScore', 'Profile Readiness Score')}</span>
                <span className="text-emerald-800">{readiness.completenessPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${readiness.completenessPercent}%` }}
                />
              </div>
            </div>

            {/* Health Indicators */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className={`w-4 h-4 mt-0.5 shrink-0 ${readiness.isRegistered ? 'text-emerald-600' : 'text-amber-500'}`} />
                <div>
                  <strong className="text-slate-900 block">{t('business.registrationCompliance', 'Registration Compliance')}</strong>
                  <span className="text-slate-500 text-[11px]">{readiness.registrationStatusText}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                <IndianRupee className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                <div>
                  <strong className="text-slate-900 block">{t('business.fundingDprReadiness', 'Funding & DPR Readiness')}</strong>
                  <span className="text-slate-500 text-[11px]">{readiness.fundingStatusText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Actions: Delete Business if multiple exist */}
        {businesses.length > 1 && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800">Business Management Settings</h3>
              <p className="text-[11px] text-slate-500">Remove secondary business profiles when no longer needed.</p>
            </div>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('business.deleteBusiness', 'Delete This Business')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Edit Business Information Modal */}
      <EditBusinessModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaveSuccess={showToast}
      />

      {/* Add New Business Modal */}
      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={(created) => showToast(`New business "${created.name}" added successfully.`)}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Trash2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">
                Delete "{business.name}"?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will remove the business profile and associated business data from your account. Your remaining businesses will remain unaffected.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBusiness}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
