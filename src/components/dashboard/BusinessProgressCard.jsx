import React from 'react';
import { Check, Compass, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRoadmap } from '../../roadmap/context/RoadmapContext';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import { useBusiness } from '../../context/BusinessContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';

export default function BusinessProgressCard() {
  const navigate = useNavigate();
  const { profile } = useEntrepreneurProfile();
  const { activeBusiness } = useBusiness();
  const { language, t } = useLanguage();
  const {
    stages,
    allTasks,
    completedTaskIds,
    currentStageId,
    setExpandedStageId
  } = useRoadmap();

  const business = activeBusiness || profile?.business || profile || {};
  const effectiveStages = stages && stages.length > 0 ? stages : [
    { id: 'IDEA', number: 1, shortName: 'Idea', title: 'Business Idea Validation', tagline: 'Validate Problem & Need' },
    { id: 'FEASIBILITY', number: 2, shortName: 'Planning', title: 'Feasibility & Model', tagline: 'Cost Sizing & Economics' },
    { id: 'SUPPORT', number: 3, shortName: 'Govt Support', title: 'Schemes & Subsidies', tagline: 'Subsidy Matching' },
    { id: 'FUNDING', number: 4, shortName: 'Funding', title: 'Capital & Bank Credit', tagline: 'DPR & Bank Loan' },
    { id: 'REGISTRATION', number: 5, shortName: 'Setup', title: 'Registration & Licenses', tagline: 'Udyam & Legal' },
    { id: 'SETUP', number: 6, shortName: 'Operations', title: 'Operational Setup', tagline: 'Premises & Equipment' },
    { id: 'LAUNCH', number: 7, shortName: 'Launch', title: 'Commercial Launch', tagline: 'First Customers' },
    { id: 'GROWTH', number: 8, shortName: 'Growth', title: 'Scale & Expansion', tagline: 'Scale & Growth' }
  ];

  // Current active stage object
  const activeStageObj = effectiveStages.find(s => s.id === currentStageId) || effectiveStages[0];
  const activeStageIndex = effectiveStages.findIndex(s => s.id === currentStageId);
  const safeIndex = activeStageIndex >= 0 ? activeStageIndex : 0;

  const handleStageSelect = (stageId) => {
    if (setExpandedStageId) {
      setExpandedStageId(stageId);
    }
    navigate('/roadmap');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('dashboard.interactiveRoadmap', 'Interactive Roadmap Tracker')}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              {t('dashboard.clickMilestoneHint', '• Click any milestone to jump directly into execution')}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
            {t('dashboard.enterpriseJourney', 'Your Enterprise Journey')}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('dashboard.enterpriseJourneyDesc', 'Progress through verified government support, DPR preparation, legal compliance, and scale milestones.')}
          </p>
        </div>

        <Link
          to="/roadmap"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0"
        >
          <span>{t('dashboard.viewFullRoadmap', 'View Full Roadmap')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progress Track */}
      <div className="w-full overflow-x-auto pb-4 pt-2 scrollbar-none">
        <div className="min-w-[680px] px-4 relative">
          {/* Connecting Track Line */}
          <div className="absolute top-5 left-10 right-10 h-1 bg-slate-100 -z-0">
            <div
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(100, Math.max(0, (safeIndex / (effectiveStages.length - 1)) * 100))}%`
              }}
            />
          </div>

          <div className="grid grid-flow-col auto-cols-fr gap-2 relative z-10">
            {effectiveStages.map((stg, idx) => {
              const stageTasks = (allTasks || []).filter(t => t.stage === stg.id || t.stageNumber === stg.number);
              const completedInStage = stageTasks.filter(t => (completedTaskIds || []).includes(t.id)).length;
              const isPast = idx < safeIndex || (stageTasks.length > 0 && completedInStage === stageTasks.length);
              const isCurrent = stg.id === currentStageId;

              return (
                <button
                  key={stg.id}
                  onClick={() => handleStageSelect(stg.id)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none transition-transform hover:scale-105"
                  title={`${stg.title} - ${completedInStage}/${stageTasks.length || 2} completed`}
                >
                  {/* Step Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white shadow-soft-sm group-hover:bg-emerald-700'
                        : isCurrent
                        ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 shadow-md font-extrabold animate-pulse group-hover:ring-emerald-200'
                        : 'bg-white border-2 border-slate-200 text-slate-400 group-hover:border-emerald-400 group-hover:text-emerald-700'
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
                    className={`text-xs mt-2 font-bold leading-tight group-hover:text-emerald-700 transition-colors ${
                      isCurrent
                        ? 'text-emerald-700 font-extrabold'
                        : isPast
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {localizeBusinessValue(stg.shortName || stg.title, language)}
                  </span>

                  {/* Indicator status pill */}
                  {isCurrent && (
                    <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {t('dashboard.current', 'CURRENT')}
                    </span>
                  )}
                  {isPast && (
                    <span className="mt-1 text-[9px] font-semibold text-emerald-600">
                      {t('dashboard.done', 'Done')}
                    </span>
                  )}
                  {!isPast && !isCurrent && (
                    <span className="mt-1 text-[9px] text-slate-400">
                      {t('dashboard.pending', 'Pending')}
                    </span>
                  )}

                  {/* Task count hint */}
                  <span className="text-[10px] text-slate-400 mt-0.5 group-hover:text-slate-600">
                    {completedInStage}/{stageTasks.length || 2}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Active Stage Banner */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shadow-soft-xs">
            0{activeStageObj.number || safeIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                {t('dashboard.currentFocus', 'Current Focus:')} {localizeBusinessValue(activeStageObj.title, language)}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {t('dashboard.stageOf', 'Stage')} {activeStageObj.number || safeIndex + 1} {t('dashboard.of', 'of')} {effectiveStages.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {localizeBusinessValue(activeStageObj.tagline || activeStageObj.objective || 'Complete key milestones in this stage to advance.', language)}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleStageSelect(activeStageObj.id)}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-soft-xs self-start sm:self-center"
        >
          <span>{t('dashboard.openStageMilestones', 'Open Stage Milestones')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
