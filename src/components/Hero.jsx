import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  Target, 
  Landmark, 
  Coins, 
  MapPin, 
  TrendingUp,
  Activity,
  Layers,
  CircleDot
} from 'lucide-react';
import Badge from './common/Badge';
import { heroProfiles } from '../data/mockData';

export default function Hero() {
  const [activeProfileKey, setActiveProfileKey] = useState('sita');
  const [activeCardTab, setActiveCardTab] = useState('action'); // 'action' | 'capital' | 'roadmap'
  const profile = heroProfiles[activeProfileKey];

  return (
    <section className="relative pt-28 sm:pt-36 pb-24 md:pb-32 overflow-hidden bg-grid-subtle">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-amber-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-emerald-300/15 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-amber-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Small badge above headline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/90 text-emerald-800 text-xs font-bold tracking-wide mb-6 shadow-soft-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="uppercase tracking-wider">AI-POWERED DIGITAL BUSINESS COMPANION</span>
            </div>

            {/* Main Headline with high-polish gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black tracking-tight text-slate-900 leading-[1.12]">
              Turn Your Business Idea Into Your{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600">
                  Next Step.
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/80 to-teal-400/80 rounded-full" />
              </span>
            </h1>

            {/* Supporting Line */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Business Compass helps first-time entrepreneurs discover government support, plan funding, navigate business setup, and understand what to do next — all in one place.
            </p>

            {/* CTAs with sleek tactile feel */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-xl shadow-soft-md shadow-emerald-700/25 transition-all group focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-slate-700 hover:text-slate-950 bg-white/90 hover:bg-white border border-slate-200/90 rounded-xl shadow-soft-sm hover:shadow-soft-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-emerald-700" />
                </div>
                <span>See How It Works</span>
              </a>
            </div>

            {/* Trust statement */}
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 font-medium">
              <div className="flex -space-x-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 border-2 border-white text-[9px] font-extrabold text-emerald-900 shadow-soft-sm">UP</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 border-2 border-white text-[9px] font-extrabold text-amber-900 shadow-soft-sm">BR</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 border-2 border-white text-[9px] font-extrabold text-sky-900 shadow-soft-sm">MH</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 border-2 border-white text-[9px] font-extrabold text-purple-900 shadow-soft-sm">OR</span>
              </div>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Built for India’s rural & underserved entrepreneurs
              </span>
            </div>

          </div>

          {/* Right Column: Premium Interactive Product Card */}
          <div className="lg:col-span-6 relative">
            
            {/* Top Floating Badge 1: 94% Match */}
            <div className="hidden sm:flex absolute -top-5 right-6 z-20 items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-emerald-200/90 shadow-soft-lg text-xs font-bold text-slate-900 animate-float-slow">
              <div className="w-6 h-6 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 font-extrabold">{profile.floatingBadges[0].text}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-400 block font-medium leading-none mt-0.5">Deterministic Fit</span>
              </div>
            </div>

            {/* Main Window Container with macOS-style glass bar */}
            <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-card-lift overflow-hidden transition-all duration-300">
              
              {/* Window Header Bar with Cool Integrated Persona Toggle */}
              <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
                
                {/* Left: Window Dots & App Label */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="h-4 w-px bg-slate-700" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Companion Session</span>
                  </span>
                </div>

                {/* Right: Sleek Sliding Persona Switcher */}
                <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-[11px]">
                  <button
                    onClick={() => setActiveProfileKey('sita')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeProfileKey === 'sita'
                        ? 'bg-emerald-600 text-white shadow-soft-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sita (UP)
                  </button>
                  <button
                    onClick={() => setActiveProfileKey('rajesh')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      activeProfileKey === 'rajesh'
                        ? 'bg-emerald-600 text-white shadow-soft-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Rajesh (Bihar)
                  </button>
                </div>
              </div>

              {/* Profile Bar */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-b from-slate-50/70 to-white">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 flex items-center justify-center text-white font-extrabold shadow-soft-sm">
                    <span className="text-base">{profile.avatarInitials}</span>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-none">
                        {profile.greeting}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {profile.badgeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-slate-500 font-medium">{profile.sector}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-emerald-700">Verified Profile</span>
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Your Business Journey
                  </span>
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
                    Stage 3: Funding & Setup
                  </span>
                </div>
              </div>

              {/* Cool Sub-View Switcher inside Dashboard */}
              <div className="px-5 sm:px-6 pt-3 flex items-center justify-between border-b border-slate-100 text-xs">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveCardTab('action')}
                    className={`pb-2.5 font-bold transition-all border-b-2 ${
                      activeCardTab === 'action'
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Next Best Action
                  </button>
                  <button
                    onClick={() => setActiveCardTab('capital')}
                    className={`pb-2.5 font-bold transition-all border-b-2 ${
                      activeCardTab === 'capital'
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Capital Breakdown
                  </button>
                  <button
                    onClick={() => setActiveCardTab('roadmap')}
                    className={`pb-2.5 font-bold transition-all border-b-2 ${
                      activeCardTab === 'roadmap'
                        ? 'border-emerald-600 text-emerald-700'
                        : 'border-transparent text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Roadmap
                  </button>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide hidden sm:inline">
                  Auto-Synced
                </span>
              </div>

              {/* Dashboard Content Body */}
              <div className="p-5 sm:p-6 pt-4 space-y-4">
                
                {/* TAB 1: NEXT BEST ACTION (DEFAULT) */}
                {activeCardTab === 'action' && (
                  <div className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-soft-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                            Your Next Best Action
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                            {profile.nextBestAction.title}
                          </h4>
                        </div>
                      </div>
                      <Badge variant="growth" size="sm">
                        {profile.nextBestAction.matchScore}
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {profile.nextBestAction.rationale}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Potential support
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            {profile.nextBestAction.potentialSupport}
                          </span>
                          <span className="text-xs font-medium text-emerald-700">capital subsidy</span>
                        </div>
                      </div>
                      <a
                        href="#features"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all group"
                      >
                        <span>View Recommendation</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}

                {/* TAB 2: CAPITAL BREAKDOWN */}
                {activeCardTab === 'capital' && (
                  <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>Capital Architecture</span>
                      <span className="text-emerald-700 font-extrabold">Gap: {profile.metrics[1].value}</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                      <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Own Margin 25%" />
                      <div className="bg-emerald-600 h-full" style={{ width: '35%' }} title="Subsidy Grant 35%" />
                      <div className="bg-sky-600 h-full" style={{ width: '40%' }} title="Bank Term Loan 40%" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Own Margin</span>
                        <strong className="text-slate-900">₹75,000</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Subsidy</span>
                        <strong className="text-emerald-700">{profile.nextBestAction.potentialSupport}</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Bank Loan</span>
                        <strong className="text-sky-700">₹1,25,000</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: ROADMAP PROGRESS */}
                {activeCardTab === 'roadmap' && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="text-slate-900">Milestone Sequence</span>
                      <span className="text-emerald-700 font-extrabold">{profile.metrics[2].value} Completed</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-950 font-semibold">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          1. Profile Assessment & Trade Intake
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">Done</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-950 font-semibold">
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          2. Scheme Discovery & Eligibility Match
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold">Done</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 font-bold">
                        <span className="flex items-center gap-2">
                          <CircleDot className="w-3.5 h-3.5 text-blue-600" />
                          3. Funding Plan & DPR Preparation
                        </span>
                        <span className="text-[10px] text-blue-700 font-extrabold uppercase">In Progress</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metric Mini-Cards with visual progress */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {profile.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50/90 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-left transition-colors"
                    >
                      <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight block">
                        {m.value}
                      </span>
                      <span className="text-[11px] font-bold text-slate-700 block mt-0.5 leading-tight">
                        {m.label}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                        {m.change}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Active Roadmap Timeline Mini Preview */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-slate-800">Next milestone:</span>
                    <span className="text-slate-500 truncate max-w-[190px]">Udyam & FSSAI Filing</span>
                  </div>
                  <a
                    href="#solutions"
                    className="text-emerald-700 hover:text-emerald-800 font-bold text-xs inline-flex items-center gap-0.5"
                  >
                    <span>Inspect Roadmap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* Bottom Left Floating Badge: Funding Ready */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 text-white shadow-soft-xl border border-slate-800 animate-float-delayed">
              <div className="w-6 h-6 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white text-xs font-bold block">{profile.floatingBadges[1].text}</span>
                <span className="text-[10px] text-slate-400 block font-normal leading-none mt-0.5">Margin Structured</span>
              </div>
            </div>

            {/* Bottom Right Floating Badge: 3 actions remaining */}
            <div className="hidden md:flex absolute -bottom-3 right-6 z-20 items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-soft-md text-xs font-bold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{profile.floatingBadges[2].text}</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
