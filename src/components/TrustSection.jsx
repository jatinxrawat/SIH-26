import React from 'react';
import { ShieldCheck, Cpu, FileCheck, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { trustPrinciples } from '../data/mockData';

export default function TrustSection() {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    Cpu: Cpu,
    FileCheck: FileCheck,
  };

  return (
    <section id="trust" className="py-20 md:py-28 bg-white border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="Responsible Architecture"
          title="Built for trust, not just convenience."
          subtitle="Because we advise on government subsidies and financial futures, transparency and deterministic integrity are built directly into our core protocol."
          align="center"
        />

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPrinciples.map((principle, idx) => {
            const Icon = iconMap[principle.icon] || ShieldCheck;
            return (
              <div
                key={principle.title}
                className="bg-sand/30 hover:bg-sand/60 rounded-2xl p-7 border border-slate-200/80 shadow-soft-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center text-emerald-700 shadow-soft-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="growth" size="sm">
                      {principle.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Principle 0{idx + 1} of Core Framework</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandated Official Statement */}
        <div className="mt-10 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start sm:items-center gap-3.5 text-xs sm:text-sm text-amber-900 shadow-soft-sm">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <strong className="font-bold">Official Disclaimer: </strong>
            <span>Final eligibility and approvals remain with the relevant government or financial institution.</span>
          </div>
          <span className="hidden md:inline-block text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-md">
            Statutory Transparency
          </span>
        </div>

      </div>
    </section>
  );
}
