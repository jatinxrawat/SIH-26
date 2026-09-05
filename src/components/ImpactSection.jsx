import React from 'react';
import { Users, Store, Route, ArrowUpRight } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';

export default function ImpactSection() {
  const stats = [
    {
      figure: "1.5B+",
      qualifier: "People in India",
      role: "Designed for",
      context: "A nation driven by grassroot aspirations, rural craft traditions, and first-generation innovators.",
      icon: Users,
      badgeColor: "growth"
    },
    {
      figure: "Millions",
      qualifier: "of micro & small entrepreneurs",
      role: "Built around",
      context: "The economic backbone forming 30%+ of GDP, yet navigating fragmented portals with zero personalized guidance.",
      icon: Store,
      badgeColor: "amber"
    },
    {
      figure: "1 Journey",
      qualifier: "to simplify business support",
      role: "One unified journey",
      context: "Connecting 1,200+ schemes, banking credit appraisals, compliance filing, and the single next best action.",
      icon: Route,
      badgeColor: "sky"
    }
  ];

  return (
    <section id="impact" className="py-20 md:py-28 bg-sand/40 border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="National Scale & Vision"
          title="Empowering the engines of Bharat."
          subtitle="Engineered to solve the structural information asymmetry that separates rural ambition from national growth."
          align="center"
        />

        {/* 3 Large Honest Impact Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Categorical Label as mandated */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/70">
                      {item.role}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Figure */}
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                    {item.figure}
                  </div>

                  {/* Qualifier */}
                  <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">
                    {item.qualifier}
                  </div>

                  {/* Narrative Context */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.context}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>National Enterprise Initiative</span>
                  <span>Digital Public Good</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
