import React from 'react';
import { Check, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

export default function BusinessProgressCard() {
  const { profile } = useEntrepreneurProfile();

  const rawStage = (profile?.business?.stage || 'PLANNING').toUpperCase();

  // Unified 7 core journey stages
  const journeyStages = [
    { key: 'IDEA', label: 'Idea', sub: 'Conceptualization' },
    { key: 'PLANNING', label: 'Planning', sub: 'Feasibility & Model' },
    { key: 'SUPPORT', label: 'Govt Support', sub: 'Schemes & Subsidies' },
    { key: 'FUNDING', label: 'Funding', sub: 'Capital & Bank Loans' },
    { key: 'SETUP', label: 'Setup', sub: 'Registration & Licenses' },
    { key: 'LAUNCH', label: 'Launch', sub: 'Operational Setup' },
    { key: 'GROWTH', label: 'Growth', sub: 'Scale & Expansion' }
  ];

  // Map raw onboarding stage to journey index
  const getStageIndex = (stage) => {
    switch (stage) {
      case 'IDEA': return 0;
      case 'PLANNING': return 1;
      case 'REGISTRATION': return 2;
      case 'FUNDING': return 3;
      case 'PRE_LAUNCH': return 4;
      case 'OPERATING': return 5;
      case 'GROWING': return 6;
      default: return 1;
    }
  };

  const currentIndex = getStageIndex(rawStage);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            Roadmap Tracker
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
            Your Business Journey
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Progress through verified government support, formalization, and growth milestones.
          </p>
        </div>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>View Full Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progress Track */}
      <div className="w-full overflow-x-auto pb-4 pt-2 scrollbar-none">
        <div className="min-w-[640px] px-2 relative">
          {/* Connecting Track Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 -z-0">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${(currentIndex / (journeyStages.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-7 gap-2 relative z-10">
            {journeyStages.map((stg, idx) => {
              const isPast = idx < currentIndex;
              const isCurrent = idx === currentIndex;

              return (
                <div key={stg.key} className="flex flex-col items-center text-center">
                  {/* Step Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white shadow-soft-sm'
                        : isCurrent
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 shadow-md font-extrabold animate-pulse'
                        : 'bg-white border-2 border-slate-200 text-slate-400'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <span>0{idx + 1}</span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <span
                    className={`text-xs mt-2 font-bold leading-tight ${
                      isCurrent
                        ? 'text-emerald-700 font-extrabold'
                        : isPast
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {stg.label}
                  </span>

                  {/* Indicator status pill */}
                  {isCurrent && (
                    <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      CURRENT
                    </span>
                  )}
                  {isPast && (
                    <span className="mt-1 text-[9px] font-semibold text-emerald-600">
                      Done
                    </span>
                  )}
                  {!isPast && !isCurrent && (
                    <span className="mt-1 text-[9px] text-slate-400">
                      Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
