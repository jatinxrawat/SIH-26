import React from 'react';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import BusinessProgressCard from '../components/dashboard/BusinessProgressCard';
import NextActionCard from '../components/dashboard/NextActionCard';
import OverviewCards from '../components/dashboard/OverviewCards';
import BusinessSnapshot from '../components/dashboard/BusinessSnapshot';
import StrategySnapshot from '../components/dashboard/StrategySnapshot';
import AdvisorPreview from '../components/dashboard/AdvisorPreview';
import RecommendationsPreview from '../components/dashboard/RecommendationsPreview';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const { profile, loading, error, refreshProfile } = useEntrepreneurProfile();

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Loading your Business Command Center...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-rose-200 p-8">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">We couldn't load your business profile</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">{error}</p>
        <button
          onClick={refreshProfile}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome & Business Identity Header */}
      <WelcomeHeader />

      {/* 2. Urgent / High-Value Next Best Action */}
      <NextActionCard
        title="Explore government scheme opportunities"
        description="Your profile matches criteria for capital subsidies and credit support. Inspect aligned schemes to lower your startup risk."
        actionLabel="Explore Schemes"
        route="/schemes"
        priority="Step 1 Recommendation"
        badge="Roadmap Driver"
      />

      {/* 3. 7-Stage Visual Business Journey Progress */}
      <BusinessProgressCard />

      {/* 4. 4 High-Level Metric Overview Cards */}
      <OverviewCards />

      {/* 5. Business Snapshot & AI Advisor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <BusinessSnapshot />
          <StrategySnapshot />
        </div>
        <div className="lg:col-span-4 h-full">
          <AdvisorPreview />
        </div>
      </div>

      {/* 6. Recommended Support Opportunities Previews */}
      <RecommendationsPreview />
    </div>
  );
}
