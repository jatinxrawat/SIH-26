import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Lock,
  LogOut,
  CheckCircle2,
  Search,
  Check,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsPage() {
  const { logout, currentUser, userProfile } = useAuth();
  const { profile } = useEntrepreneurProfile();
  const { language, setLanguage, languages, currentLanguageInfo, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('account');
  const [savedNote, setSavedNote] = useState('');
  const [langSearch, setLangSearch] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const tabs = [
    { id: 'account', label: t('nav.profile', 'Account Information'), icon: Settings },
    { id: 'language', label: `${t('common.language', 'Language')} / ${currentLanguageInfo.nativeName}`, icon: Globe, highlight: true },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'privacy', label: 'Privacy & Data Terms', icon: Shield }
  ];

  const displayName = profile?.personalInfo?.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';

  const triggerSaveNote = (msg) => {
    setSavedNote(msg);
    setTimeout(() => setSavedNote(''), 3500);
  };

  const handleSelectLanguage = (code, name, nativeName) => {
    setLanguage(code);
    triggerSaveNote(`Language changed to ${nativeName} (${name}) • भाषा सफलतापूर्वक बदली गई!`);
  };

  // Filter languages based on search input
  const filteredLanguages = useMemo(() => {
    const q = langSearch.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((l) =>
      l.name.toLowerCase().includes(q) ||
      l.nativeName.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q) ||
      (l.region && l.region.toLowerCase().includes(q))
    );
  }, [languages, langSearch]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('settings.title', 'Workspace Preferences')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('nav.settings', 'Settings & Security')}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t('settings.subtitle', 'Manage your account security, notification alerts, language options, and privacy preferences.')}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors shrink-0 self-start sm:self-center cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t('nav.logout', 'Sign Out')}</span>
        </button>
      </div>

      {savedNote && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between gap-2 shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedNote}</span>
          </div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
            Active Now
          </span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Tabs */}
        <div className="md:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft-sm space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-soft-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : tab.highlight ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.highlight && !isSelected && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                    {currentLanguageInfo.nativeName}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
          {/* TAB: LANGUAGE SELECTION (ALL 22 OFFICIAL SCHEDULED LANGUAGES + ENGLISH) */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <span>{t('settings.languageTitle', 'Official Language Settings')}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('settings.languageSubtitle', 'Select your preferred official language of India. Navigation, advisor insights, and interface will adapt.')}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-bold shrink-0 self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Active: <strong>{currentLanguageInfo.nativeName}</strong> ({currentLanguageInfo.name})</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                  placeholder={t('settings.searchPlaceholder', 'Search by language name, script, or region...')}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                />
                {langSearch && (
                  <button
                    onClick={() => setLangSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Languages Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredLanguages.map((lang) => {
                  const isCurrent = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code, lang.name, lang.nativeName)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer group flex flex-col justify-between gap-2 ${
                        isCurrent
                          ? 'bg-emerald-50/90 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                          : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-base font-black text-slate-900 block leading-tight">
                            {lang.nativeName}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            {lang.name}
                          </span>
                        </div>

                        {isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Select
                          </span>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span className="truncate max-w-[130px] flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                          <span className="truncate">{lang.region}</span>
                        </span>
                        <span className="uppercase font-mono text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                          {lang.code}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredLanguages.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No official languages matching "{langSearch}". Try searching by English name or native script.
                </div>
              )}

              {/* Constitutional Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800 block font-bold mb-0.5">
                    Official 8th Schedule Recognition
                  </strong>
                  <span>
                    UdyamSaathi includes comprehensive support for all 22 official scheduled languages of India alongside English, enabling grass-roots entrepreneurs across every state and union territory to execute government schemes with zero linguistic barriers.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ACCOUNT INFO */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">{t('nav.profile', 'Account Information')}</h2>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <label className="text-slate-400 block mb-1">Registered Name</label>
                  <p className="font-bold text-slate-900">{displayName}</p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email Address</label>
                  <p className="font-bold text-slate-900">{currentUser?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Authentication Method</label>
                  <p className="font-semibold text-emerald-700">
                    {currentUser?.providerData?.[0]?.providerId === 'google.com' ? 'Google Authentication' : 'Email & Password'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">Notification Preferences</h2>
              <div className="space-y-3 text-xs">
                {[
                  'New Government Scheme match alerts',
                  'Subsidy application deadline reminders',
                  'Bank loan document checklist updates',
                  'AI Advisor weekly milestones review'
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => triggerSaveNote('Notification preferences updated!')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {t('common.save', 'Save Preferences')}
              </button>
            </div>
          )}

          {/* TAB: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">Security & Authentication</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your credentials and onboarding profile are secured through Firebase Authentication and Cloud Firestore security rules.
              </p>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Protected with SSL encryption and role-based Firestore token verification.</span>
              </div>
            </div>
          )}

          {/* TAB: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">Privacy & Data Governance</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                UdyamSaathi adheres to Indian data protection guidelines. Your business idea, category, and financial estimates are never shared with commercial telemarketers. They are strictly evaluated against central and state government eligibility registries.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
