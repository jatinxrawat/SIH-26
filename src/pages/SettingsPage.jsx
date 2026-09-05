import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Shield, Bell, Globe, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';

export default function SettingsPage() {
  const { logout, currentUser, userProfile } = useAuth();
  const { profile } = useEntrepreneurProfile();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('account');
  const [savedNote, setSavedNote] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account Information', icon: Settings },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'language', label: 'Language / भाषा', icon: Globe },
    { id: 'privacy', label: 'Privacy & Data Terms', icon: Shield }
  ];

  const displayName = profile?.personalInfo?.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';

  const triggerMockSave = (msg) => {
    setSavedNote(msg);
    setTimeout(() => setSavedNote(''), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-emerald-600" />
            <span>Workspace Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Security
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Manage your account security, notification alerts, language options, and privacy preferences.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors shrink-0 self-start sm:self-center"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {savedNote && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedNote}</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Navigation Tabs */}
        <div className="md:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft-sm space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-soft-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
          {activeTab === 'account' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">Account Information</h2>
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
                onClick={() => triggerMockSave('Notification preferences updated!')}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Save Preferences
              </button>
            </div>
          )}

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

          {activeTab === 'language' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b pb-3">Language Settings / भाषा चयन</h2>
              <p className="text-xs text-slate-500">Select your preferred interface language.</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['English (Default)', 'हिंदी (Hindi)', 'मराठी (Marathi)', 'বাংলা (Bengali)', 'ગુજરાતી (Gujarati)', 'தமிழ் (Tamil)'].map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerMockSave(`Language preference set to ${lang}`)}
                    className={`p-3 rounded-xl border text-left font-bold ${
                      idx === 0 ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

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
