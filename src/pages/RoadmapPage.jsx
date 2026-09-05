import React from 'react';
import { MapPin, CheckCircle2, Clock, CircleDot, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';

export default function RoadmapPage() {
  const { profile } = useEntrepreneurProfile();

  const businessStage = (profile?.business?.stage || 'PLANNING').toUpperCase();

  const roadmapSteps = [
    {
      num: 1,
      stageKey: 'IDEA',
      title: 'Business Idea Validation',
      desc: 'Define product/service offerings, primary target customers, and unit economics.',
      milestones: ['Customer demand assessment', 'Competitive price research', 'Basic business idea profile']
    },
    {
      num: 2,
      stageKey: 'PLANNING',
      title: 'Business Feasibility & Model',
      desc: 'Estimate initial capital needs, location suitability, and raw material sourcing.',
      milestones: ['Capital budget assessment', 'Location finalized', 'Suppliers identified']
    },
    {
      num: 3,
      stageKey: 'SUPPORT',
      title: 'Government Scheme Discovery',
      desc: 'Evaluate Central & State scheme fit, demographic subsidies, and grant eligibility.',
      milestones: ['Target scheme selected', 'Eligibility criteria verified', 'Required documentation checklist']
    },
    {
      num: 4,
      stageKey: 'FUNDING',
      title: 'Funding Stack & Loan Application',
      desc: 'Formulate Detailed Project Report (DPR) and apply for institutional bank credit.',
      milestones: ['Promoter margin ready', 'DPR report generated', 'Bank appraisal submission']
    },
    {
      num: 5,
      stageKey: 'REGISTRATION',
      title: 'Entity Registration & Compliance',
      desc: 'Acquire official registration including Udyam MSME, GSTIN, and municipal trade permits.',
      milestones: ['Udyam registration', 'GST/PAN filing', 'Bank current account opening']
    },
    {
      num: 6,
      stageKey: 'SETUP',
      title: 'Equipment & Operational Setup',
      desc: 'Procure necessary machinery, hire team members, and complete site preparation.',
      milestones: ['Machinery installation', 'Initial inventory stocked', 'Team onboarding']
    },
    {
      num: 7,
      stageKey: 'LAUNCH',
      title: 'Commercial Launch',
      desc: 'Commence customer billing, marketing promotions, and sales fulfillment.',
      milestones: ['First customer billing', 'Local marketing rollout', 'Operational stability']
    },
    {
      num: 8,
      stageKey: 'GROWTH',
      title: 'Expansion & Scale',
      desc: 'Optimize working capital, introduce digital payments, and access growth credit.',
      milestones: ['Repeat order volume', 'Working capital limits expansion', 'Digital catalog presence']
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Roadmap Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Personalized Business Roadmap
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            A milestone-by-milestone guided journey from business idea to sustainable commercial growth.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shrink-0">
          <span>Current Stage:</span>
          <span className="text-emerald-700 uppercase font-black">{businessStage.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Connected Milestone Timeline */}
      <div className="space-y-4">
        {roadmapSteps.map((step) => {
          const isCurrent = step.stageKey === businessStage;
          return (
            <div
              key={step.num}
              className={`p-6 rounded-3xl border transition-all ${
                isCurrent
                  ? 'bg-white border-emerald-500 shadow-soft-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200/90 shadow-soft-sm hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    0{step.num}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
                          Current Milestone
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end gap-1 text-xs">
                  <span className="text-[11px] font-semibold text-slate-400">Milestone Checkpoints:</span>
                  <span className="text-xs font-bold text-slate-700">{step.milestones.length} Tasks</span>
                </div>
              </div>

              {/* Milestones Checkpoints */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {step.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 text-slate-700">
                    <CircleDot className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
