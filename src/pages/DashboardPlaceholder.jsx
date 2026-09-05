import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Building2, MapPin, IndianRupee, Target, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import Logo from '../components/common/Logo';

export default function DashboardPlaceholder() {
  const { currentUser, userProfile, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEntrepreneurProfile() {
      if (!currentUser?.uid) return;
      try {
        const docRef = doc(db, 'entrepreneurProfiles', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      } catch (err) {
        console.error('Error loading entrepreneur profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEntrepreneurProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const displayName = userProfile?.name || currentUser?.displayName || 'Entrepreneur';

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-slate-900 w-full max-w-full overflow-x-hidden relative">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/" className="flex items-center">
              <Logo variant="dark" size="sm" showTagline={false} />
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full">
              Entrepreneur Workspace
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shrink-0">
                {displayName.charAt(0)}
              </div>
              <span className="hidden md:inline font-medium">{displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-soft-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-3 sm:mb-4">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Onboarding Completed</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
              Welcome, {displayName}
            </h1>
            <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed">
              Your business profile is ready. Your parameters have been securely stored and will power your scheme matching, funding roadmap, and AI business advisor.
            </p>
          </div>
        </div>

        {/* Profile Snapshot */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-soft-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Entrepreneur Profile Snapshot</h2>
              <p className="text-xs text-slate-500">Summary of data registered during onboarding</p>
            </div>
            {profileData?.business?.stage && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                Stage: {profileData.business.stage}
              </span>
            )}
          </div>

          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : profileData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Info */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Business Entity</span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong className="text-slate-800">Name:</strong> {profileData.business?.name || 'Proposed Business'}</p>
                  <p><strong className="text-slate-800">Sector:</strong> {profileData.business?.sector || 'General'}</p>
                  <p><strong className="text-slate-800">Type:</strong> {profileData.business?.type || 'Not specified'}</p>
                  <p><strong className="text-slate-800">Status:</strong> {profileData.business?.status === 'OPERATING' ? 'Already Operating' : 'Planning to Start'}</p>
                </div>
              </div>

              {/* Location & Personal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Location & Demographics</span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong className="text-slate-800">Location:</strong> {profileData.personalInfo?.district || 'District'}, {profileData.personalInfo?.state || 'State'}</p>
                  <p><strong className="text-slate-800">Area:</strong> {profileData.personalInfo?.ruralUrban || 'Rural / Urban'}</p>
                  <p><strong className="text-slate-800">Category:</strong> {profileData.eligibilityProfile?.category || 'General'}</p>
                  <p><strong className="text-slate-800">Phone:</strong> {profileData.personalInfo?.phone || 'Not recorded'}</p>
                </div>
              </div>

              {/* Financial Snapshot */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  <span>Funding Requirements</span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong className="text-slate-800">Funding Needed:</strong> {profileData.financialProfile?.fundingRequired || 'To be assessed'}</p>
                  <p><strong className="text-slate-800">Available Capital:</strong> {profileData.financialProfile?.availableCapital || 'Self funded'}</p>
                  <p><strong className="text-slate-800">Preferred Type:</strong> {profileData.financialProfile?.preferredFundingType || 'Govt Scheme / Subsidy'}</p>
                </div>
              </div>

              {/* Support & Goals */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>Goals & Support</span>
                </div>
                <div className="text-sm text-slate-600 space-y-2">
                  <p><strong className="text-slate-800">12-Month Goal:</strong> {profileData.goals?.twelveMonthGoal || 'Launch & Grow'}</p>
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block mb-1">Key Needs:</span>
                    <div className="flex flex-wrap gap-1">
                      {(profileData.goals?.supportNeeded || []).slice(0, 4).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-600">
                          {s}
                        </span>
                      ))}
                      {(profileData.goals?.supportNeeded || []).length > 4 && (
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-500">
                          +{(profileData.goals?.supportNeeded || []).length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">Profile data could not be loaded.</p>
          )}

          {/* Under construction alert */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <span className="font-bold">Next Module Phase: </span>
              The full personalized dashboard, Government Scheme Matching Engine, and AI Business Advisor are currently under development. All your onboarding inputs are safely stored and will automatically map to recommended schemes.
            </div>
          </div>
        </div>

        {/* Return to Home link */}
        <div className="text-center pt-2">
          <Link to="/" className="text-xs font-medium text-slate-500 hover:text-emerald-700 transition-colors">
            ← Explore UdyamSaathi Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
