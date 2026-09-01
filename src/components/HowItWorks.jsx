import React, { useState } from 'react';
import { 
  MessageSquare, 
  Filter, 
  Calculator, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { howItWorksSteps } from '../data/mockData';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [
    MessageSquare,
    Filter,
    Calculator,
    Compass
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="How Business Compass Works"
          title="Your business. Your context. Your next move."
          subtitle="A structured 4-step framework engineered to remove ambiguity and build clarity from day one."
          align="center"
        />

        {/* 4 Connected Large Steps with Visual Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Left Column: Vertical Connected Stepper */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 relative">
            {/* Connected Vertical Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 -z-0 hidden sm:block" />

            {howItWorksSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group cursor-pointer relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-emerald-300 shadow-soft-md ring-1 ring-emerald-400/30'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number & Icon Node */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors shadow-soft-sm relative z-10 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold tracking-wider text-emerald-700 uppercase">
                          Step {step.number}
                        </span>
                        <Badge variant={isActive ? "growth" : "neutral"} size="sm">
                          {step.badge}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      {isActive && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200/70">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{step.detail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Interactive Card for Active Step */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card-lift p-6 sm:p-8">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Product Architecture
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    Step {howItWorksSteps[activeStep].number} in Practice
                  </h4>
                </div>
                <Badge variant="growth" size="md">
                  Active Framework
                </Badge>
              </div>

              {/* Dynamic View Based on Active Step */}
              {activeStep === 0 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Entrepreneur Profile Intake
                    </span>
                    <div className="mt-3 space-y-2.5 text-xs text-slate-700">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Business Sector:</span>
                        <strong className="text-slate-900">Food Processing (Micro-Enterprise)</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Location:</span>
                        <strong className="text-slate-900">Mirzapur District, Uttar Pradesh (Rural)</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Self-Contribution:</span>
                        <strong className="text-slate-900">₹75,000 personal savings</strong>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Target Launch:</span>
                        <strong className="text-slate-900">60 Days</strong>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Captured in 3 minutes without requiring prior business documentation.</span>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                        Matched: PMFME Scheme
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
                        94% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Formalisation of Micro Food Processing Enterprises scheme under Ministry of Food Processing Industries.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span className="text-slate-400 block text-[10px]">Subsidy Benefit</span>
                        <strong className="text-emerald-700 text-sm">35% Capital Grant</strong>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                        <span className="text-slate-400 block text-[10px]">Max Ceiling</span>
                        <strong className="text-slate-900 text-sm">Up to ₹10 Lakh</strong>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Filtered out 1,180 non-applicable manufacturing and IT schemes.
                  </p>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Transparent Capital Stack
                    </span>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Total Project Cost</span>
                        <strong className="text-slate-900">₹3,00,000</strong>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Own Margin 25%" />
                        <div className="bg-emerald-600 h-full" style={{ width: '33.3%' }} title="Subsidy 33.3%" />
                        <div className="bg-sky-600 h-full" style={{ width: '41.7%' }} title="Bank Loan 41.7%" />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"/> Own: ₹75K</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"/> Subsidy: ₹100K</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-600 inline-block"/> Loan: ₹125K</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                    <strong>Zero hidden gap:</strong> The entrepreneur knows their exact cash-in-hand requirement before visiting a bank manager.
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-soft-md">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-200" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                        Priority Action Item
                      </span>
                    </div>
                    <h5 className="text-base font-bold mt-2">
                      Prepare your project report for the funding application.
                    </h5>
                    <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                      Download pre-filled, bank-accepted DPR template for pickle processing micro-units.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                    <span>Next milestone unlocks immediately after completion.</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              )}

              {/* Step Navigation Controls (Cool Toggle Dots) */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeStep === i ? 'w-7 bg-emerald-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Next Step ({((activeStep + 1) % 4) + 1}/4)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
