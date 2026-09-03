import React, { useState } from 'react';
import { 
  Landmark, 
  CircleDollarSign, 
  FileCheck2, 
  HelpCircle, 
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import { problemCards, comparisonData } from '../data/mockData';

export default function ProblemSection() {
  const [viewMode, setViewMode] = useState('with'); // 'without' vs 'with'

  const iconMap = {
    Landmark: Landmark,
    CircleDollarSign: CircleDollarSign,
    FileCheck2: FileCheck2,
    HelpCircle: HelpCircle,
  };

  const activeComparison = comparisonData[viewMode];

  return (
    <section id="problem" className="py-20 md:py-28 bg-sand/40 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="The Reality of First-Time Enterprise"
          title="Starting a business shouldn't mean navigating a maze."
          subtitle="For a first-time entrepreneur, the challenge isn't just finding money. It's knowing where to start, which schemes apply, what documents are needed, how much funding is required, and what to do next."
          align="center"
        />

        {/* Cool Comparison Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white border border-slate-200 shadow-soft-sm">
            <button
              onClick={() => setViewMode('without')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'without'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Without UdyamSaathi (The Maze)</span>
            </button>
            <button
              onClick={() => setViewMode('with')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'with'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>With UdyamSaathi (Guided Journey)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid Based on Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {viewMode === 'without' ? (
            // The Traditional Maze Cards
            problemCards.map((card, index) => {
              const Icon = iconMap[card.icon] || Landmark;
              return (
                <div
                  key={card.id}
                  className="group relative bg-white rounded-2xl p-6 border border-rose-200/80 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-rose-400">
                        Barrier 0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {card.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-rose-700">
                      {card.issue}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Unresolved
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            // The Guided Journey Cards
            activeComparison.items.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-emerald-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">
                      Solution 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700">
                    Streamlined
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    Built-in
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contrast Summary Banner */}
        <div className="mt-12 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <p className="text-sm sm:text-base font-medium text-slate-800">
              <strong className="font-bold text-slate-900">The core gap:</strong> Information exists in silos, but guidance does not. Entrepreneurs need a continuous, context-aware bridge.
            </p>
          </div>
          <a
            href="#solutions"
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 shrink-0"
          >
            <span>See the unified approach</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
