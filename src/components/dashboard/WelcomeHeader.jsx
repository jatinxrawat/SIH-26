import React from 'react';
import { Building2, Sparkles, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

export default function WelcomeHeader() {
  const { currentUser, userProfile } = useAuth();
  const { profile } = useEntrepreneurProfile();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = profile?.personalInfo?.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';
  const businessName = profile?.name || profile?.business?.name || 'Your Enterprise';
  const stage = profile?.stage || profile?.business?.stage || 'PLANNING';
  const location = profile?.location || (profile?.personalInfo?.district
    ? `${profile.personalInfo.district}, ${profile.personalInfo.state}`
    : 'India');

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Entrepreneur Command Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {getGreeting()}, {displayName} 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is the live status of your business parameters, scheme alignments, and next actions.
        </p>
      </div>

      {/* Business & Stage Badge Card */}
      <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-soft-sm">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[160px] sm:max-w-[200px]">
              {businessName}
            </h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              {stage.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
