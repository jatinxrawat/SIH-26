import React, { useState } from 'react';
import { User, MapPin, Building2, IndianRupee, Target, ShieldCheck, Edit3, Save, X, CheckCircle2 } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePage() {
  const { language, t } = useLanguage();
  const { profile, updateProfileData } = useEntrepreneurProfile();
  const { currentUser, userProfile } = useAuth();

  const [editingSection, setEditingSection] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const personal = profile?.personalInfo || {};
  const eligibility = profile?.eligibilityProfile || {};
  const business = profile?.business || {};
  const finances = profile?.financialProfile || {};
  const goals = profile?.goals || {};

  const handleStartEdit = (sectionKey, initialData) => {
    setEditingSection(sectionKey);
    setEditForm({ ...initialData });
    setSuccessMsg('');
  };

  const handleSave = async (sectionKey) => {
    try {
      setSaving(true);
      await updateProfileData(sectionKey, editForm);
      setEditingSection(null);
      setSuccessMsg(t('profile.saveSuccess', 'Profile updated successfully!'));
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error saving profile changes:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('profile.masterRecord', 'Master Record')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('profile.title', 'Entrepreneur Profile')}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t('profile.subtitle', 'Verified onboarding profile parameters that power your personalized scheme matching, loan sizing, and roadmap.')}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('profile.verifiedAccount', 'Verified Account')}</span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sections Grid */}
      <div className="space-y-6">
        {/* 1. Personal Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.personalInfo', 'Personal Information')}</h2>
            </div>
            {editingSection !== 'personalInfo' ? (
              <button
                onClick={() => handleStartEdit('personalInfo', personal)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> {t('common.edit', 'Edit')}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingSection(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSave('personalInfo')}
                  disabled={saving}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3 h-3" /> {t('common.save', 'Save')}
                </button>
              </div>
            )}
          </div>

          {editingSection === 'personalInfo' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">{t('profile.fullName', 'Full Name')}</label>
                <input
                  type="text"
                  value={editForm.fullName || ''}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">{t('profile.phone', 'Phone')}</label>
                <input
                  type="text"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">{t('profile.age', 'Age / DOB')}</label>
                <input
                  type="text"
                  value={editForm.age || ''}
                  onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">{t('profile.gender', 'Gender')}</label>
                <input
                  type="text"
                  value={editForm.gender || ''}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div><span className="text-slate-400 block">{t('profile.fullName', 'Full Name')}</span><strong className="text-slate-900">{personal.fullName || t('common.notProvided', 'Not provided')}</strong></div>
              <div><span className="text-slate-400 block">{t('profile.phone', 'Phone')}</span><strong className="text-slate-900">{personal.phone || t('common.notProvided', 'Not provided')}</strong></div>
              <div><span className="text-slate-400 block">{t('profile.age', 'Age')}</span><strong className="text-slate-900">{personal.age || t('common.notProvided', 'Not provided')}</strong></div>
              <div><span className="text-slate-400 block">{t('profile.gender', 'Gender')}</span><strong className="text-slate-900">{personal.gender || t('common.notSpecified', 'Not specified')}</strong></div>
            </div>
          )}
        </div>

        {/* 2. Location & Demographics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.locationDemographics', 'Location & Demographics')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><span className="text-slate-400 block">{t('profile.state', 'State')}</span><strong className="text-slate-900">{personal.state || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.district', 'District')}</span><strong className="text-slate-900">{personal.district || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.locality', 'Locality')}</span><strong className="text-slate-900">{personal.locality || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.classification', 'Classification')}</span><strong className="text-slate-900">{personal.ruralUrban || 'Urban'}</strong></div>
          </div>
        </div>

        {/* 3. Eligibility Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.eligibilityTitle', 'Government Scheme Eligibility Profile')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><span className="text-slate-400 block">{t('profile.category', 'Category')}</span><strong className="text-slate-900">{eligibility.category || 'General'}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.annualIncome', 'Annual Income')}</span><strong className="text-slate-900">{eligibility.incomeRange || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.employmentStatus', 'Employment Status')}</span><strong className="text-slate-900">{eligibility.employmentStatus || 'Employed'}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.disabilityMinority', 'Disability / Minority')}</span><strong className="text-slate-900">{eligibility.disabilityStatus || 'None'} / {eligibility.minorityStatus || 'None'}</strong></div>
          </div>
        </div>

        {/* 4. Business Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.businessInfo', 'Business Information')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><span className="text-slate-400 block">{t('profile.businessName', 'Business Name')}</span><strong className="text-slate-900">{business.name || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.sector', 'Sector')}</span><strong className="text-slate-900">{business.sector || 'General'}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.structure', 'Structure')}</span><strong className="text-slate-900">{business.type || 'Proprietorship'}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.stage', 'Stage')}</span><strong className="text-slate-900">{business.stage || 'PLANNING'}</strong></div>
          </div>
        </div>

        {/* 5. Financial Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <IndianRupee className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.financialProfile', 'Financial Profile')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><span className="text-slate-400 block">{t('profile.fundingRequired', 'Funding Required')}</span><strong className="text-slate-900">{finances.fundingRequired || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.availableCapital', 'Available Capital')}</span><strong className="text-slate-900">{finances.availableCapital || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.estimatedCost', 'Estimated Cost')}</span><strong className="text-slate-900">{finances.estimatedProjectCost || t('common.notProvided', 'Not provided')}</strong></div>
            <div><span className="text-slate-400 block">{t('profile.preferredType', 'Preferred Type')}</span><strong className="text-slate-900">{finances.preferredFundingType || 'Govt Scheme'}</strong></div>
          </div>
        </div>

        {/* 6. Goals & Requirements */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">{t('profile.goalsRequirements', 'Goals & Support Needed')}</h2>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block">{t('profile.twelveMonthGoal', '12-Month Goal')}:</span>
              <strong className="text-slate-900">{goals.twelveMonthGoal || t('profile.defaultGoal', 'Start and stabilize business')}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1.5">{t('profile.supportAreasSelected', 'Support Areas Selected')}:</span>
              <div className="flex flex-wrap gap-1.5">
                {(goals.supportNeeded || []).map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
