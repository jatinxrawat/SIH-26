import React, { useState } from 'react';
import { 
  Lightbulb, 
  BarChart3, 
  Search, 
  Banknote, 
  Hammer, 
  TrendingUp, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { journeyStages } from '../data/mockData';

export default function JourneySection() {
  const [selectedStage, setSelectedStage] = useState(3); // Default to Stage 4 (index 3: Plan Funding)

  const icons = [
    Lightbulb,
    BarChart3,
    Search,
    Banknote,
    Hammer,
    TrendingUp
  ];

  const currentStage = journeyStages[selectedStage];

  return (
    <section id="solutions" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background soft accent */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="The Unified Architecture"
          title="One business journey. Everything connected."
          subtitle="Business Compass brings fragmented business support into one personalized journey."
          align="center"
        />

        {/* Horizontal Journey Progression Bar */}
        <div className="relative mt-8">
          
          {/* Connecting Track Line for Desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-slate-100 -z-0">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${(selectedStage / (journeyStages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {journeyStages.map((stage, idx) => {
              const Icon = icons[idx];
              const isSelected = selectedStage === idx;
              const isPast = idx < selectedStage;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(idx)}
                  className={`flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-soft-lg transform -translate-y-1'
                      : isPast
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:bg-emerald-100/60'
                      : 'bg-[#FBFBFA] border-slate-200/80 text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  {/* Step Node */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-soft-sm'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Stage Code */}
                  <span
                    className={`text-[10px] font-bold tracking-wider uppercase ${
                      isSelected ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    Stage 0{idx + 1}
                  </span>

                  {/* Stage Title */}
                  <span
                    className={`text-xs sm:text-sm font-bold mt-1 line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {stage.code}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Detail Card for Selected Milestone */}
        <div className="mt-8 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={selectedStage <= 3 ? "growth" : "neutral"} size="sm">
                  {selectedStage <= 2 ? "Completed in Profile" : selectedStage === 3 ? "Active Milestone" : "Next Milestone"}
                </Badge>
                <span className="text-xs text-slate-400 font-medium">Stage {selectedStage + 1} of 6</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentStage.code} — <span className="text-emerald-700 font-medium">{currentStage.tagline}</span>
              </h3>

              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {currentStage.description}
              </p>

              {/* Real entrepreneur context */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                    Real Journey Example (Sita's Micro-Unit):
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {currentStage.sitaContext}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-soft-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Current Action Output
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {currentStage.action}
                </h4>
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Deterministic rule evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official portal criteria mapped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero jargon explanation</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedStage((prev) => (prev + 1) % journeyStages.length)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                >
                  <span>Inspect Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="#features"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-soft-sm transition-colors inline-flex items-center gap-1"
                >
                  <span>Explore Intelligence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
