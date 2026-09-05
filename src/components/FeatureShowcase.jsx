import React, { useState } from 'react';
import { 
  Landmark, 
  Coins, 
  MapPin, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  ChevronRight,
  Circle,
  Clock
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { featureDetails } from '../data/mockData';

export default function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState('scheme');

  const tabs = [
    { id: 'scheme', name: 'Scheme Intelligence', icon: Landmark },
    { id: 'funding', name: 'Funding Intelligence', icon: Coins },
    { id: 'roadmap', name: 'Business Roadmap', icon: MapPin },
    { id: 'nextAction', name: 'Next Best Action', icon: Target },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Product Capabilities"
          title="Intelligence that works together."
          subtitle="Four core engines harmonized into a single continuous stream of guidance for first-time founders."
          align="center"
        />

        {/* Cool Segmented Toggle Bar */}
        <div className="w-full max-w-full overflow-x-auto pb-3 mb-8 scrollbar-none flex sm:justify-center px-1">
          <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-soft-sm mx-auto shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap focus:outline-none shrink-0 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-soft-md ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Showcase View for Selected Tab */}
        <div className="bg-sand/30 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-soft-sm">
          
          {/* 1. SCHEME INTELLIGENCE */}
          {activeTab === 'scheme' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <Badge variant="growth">94% Profile Fit</Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Scheme Intelligence
                </h3>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Find government schemes relevant to your profile instead of searching through endless information. Our rules match trade, category, district, and project size.
                </p>

                <div className="mt-6 space-y-2.5">
                  {featureDetails.scheme.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Verified via Ministry Portals (mofpi.gov.in)
                  </span>
                </div>
              </div>

              {/* Visual Mockup for Scheme */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-lg">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Matched Scheme
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-2">
                      PM Formalisation of Micro food processing (PMFME)
                    </h4>
                    <span className="text-xs text-slate-500">Ministry of Food Processing Industries</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-emerald-700">94%</span>
                    <span className="text-[10px] text-slate-400 block">Match Score</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Potential Support</span>
                    <strong className="text-lg font-bold text-slate-900">₹1,00,000</strong>
                    <span className="text-[10px] text-emerald-600 block">35% Capital Subsidy</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Eligibility Status</span>
                    <strong className="text-lg font-bold text-emerald-700">Eligible</strong>
                    <span className="text-[10px] text-slate-500 block">All criteria satisfied</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-medium">Direct Benefit Transfer (DBT) eligible</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          )}

          {/* 2. FUNDING INTELLIGENCE */}
          {activeTab === 'funding' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                  <Badge variant="amber">Capital Stack Architecture</Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Funding Intelligence
                </h3>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Understand your project cost, own contribution, funding gap, and potential financing routes. Prevent sudden cash shortfalls and prepare realistic bank applications.
                </p>

                {/* Specific numbers mandated by user */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-soft-sm">
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Project Cost</span>
                    <span className="text-base sm:text-lg font-extrabold text-slate-900 block mt-0.5">₹3,00,000</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-soft-sm">
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Own Capital</span>
                    <span className="text-base sm:text-lg font-extrabold text-amber-700 block mt-0.5">₹75,000</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-soft-sm">
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Funding Gap</span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-700 block mt-0.5">₹2,25,000</span>
                  </div>
                </div>

                <p className="mt-5 text-xs text-slate-500">
                  * Funding gap of ₹2,25,000 is resolved through ₹1,00,000 PMFME Subsidy + ₹1,25,000 Mudra/Bank Term Loan.
                </p>
              </div>

              {/* Visual Mockup for Funding */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Capital Stack Visualization
                </span>

                <div className="space-y-3">
                  {featureDetails.funding.breakdown.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800">{item.label}</span>
                        <span className="font-bold text-slate-900">{item.amount} ({item.share})</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: item.share }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                  {featureDetails.funding.insight}
                </div>
              </div>
            </div>
          )}

          {/* 3. BUSINESS ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <Badge variant="sky">Sequential Clarity</Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Business Roadmap
                </h3>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Turn your business idea into a clear sequence of actions. Instead of facing confusing tasks at once, step through a logical progression designed for first-timers.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 shadow-soft-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Execution Path
                  </span>
                  <div className="mt-3 space-y-2.5 text-sm font-medium text-slate-800">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Business assessment</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Scheme discovery</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 font-bold bg-blue-50 px-2 py-1 rounded">
                      <ArrowRight className="w-4 h-4 shrink-0" />
                      <span>Funding preparation (Active)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Circle className="w-3.5 h-3.5 shrink-0" />
                      <span>Registration</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Circle className="w-3.5 h-3.5 shrink-0" />
                      <span>Launch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Mockup for Roadmap */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Milestone Progress: 2 of 5 Completed
                  </span>
                  <Badge variant="growth">40% Done</Badge>
                </div>

                <div className="space-y-3">
                  {featureDetails.roadmap.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                        step.status === 'done'
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950 font-medium'
                          : step.status === 'active'
                          ? 'bg-white border-blue-500 ring-2 ring-blue-100 shadow-soft-sm text-slate-900 font-bold'
                          : 'bg-slate-50/60 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            step.status === 'done'
                              ? 'bg-emerald-600 text-white'
                              : step.status === 'active'
                              ? 'bg-blue-600 text-white'
                              : 'border border-slate-300 text-slate-400'
                          }`}
                        >
                          {step.status === 'done' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span>{step.name}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-normal">{step.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. NEXT BEST ACTION */}
          {activeTab === 'nextAction' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <Badge variant="growth">Anti-Overwhelm Mechanism</Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Next Best Action
                </h3>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Instead of overwhelming entrepreneurs with information, UdyamSaathi tells them what deserves attention now.
                </p>

                <div className="mt-6 p-5 rounded-2xl bg-emerald-50/90 border border-emerald-300/80 shadow-soft-sm">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-800 block">
                    Your next move:
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-1">
                    Prepare your project report for the funding application.
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    This directly unlocks your ₹1.25L bank appraisal and qualifies you for the ₹1,00,000 capital subsidy.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Estimated time: 45 minutes</span>
                </div>
              </div>

              {/* Visual Mockup for Next Best Action */}
              <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-soft-lg">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Action Briefing Card
                  </span>
                  <Badge variant="amber">High Priority</Badge>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white shadow-soft-md">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    Action in Queue
                  </span>
                  <h5 className="text-base font-bold mt-1 text-white">
                    Generate Detailed Project Report (DPR)
                  </h5>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Required by Lead District Bank for credit appraisal under PMFME.
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">1.</span>
                      <span>Machinery cost: ₹1,50,000 (Quotes verified)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">2.</span>
                      <span>Working capital: ₹1,50,000 (3 months raw ingredients)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Estimated time: 35 minutes</span>
                  <span className="font-semibold text-emerald-700">Pre-filled with your profile</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 4 Feature Summary Cards Grid for Quick Scannability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                activeTab === tab.id
                  ? 'bg-white border-emerald-500 ring-2 ring-emerald-100 shadow-soft-sm'
                  : 'bg-white/60 hover:bg-white border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{tab.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {featureDetails[tab.id]?.summary}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
