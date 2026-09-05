import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Target, ArrowRight, Sparkles, Landmark, Coins, Bot } from 'lucide-react';
import { useRoadmap } from '../../roadmap/context/RoadmapContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';

export default function NextActionCard({
  title,
  description,
  actionLabel,
  route,
  priority,
  icon: Icon = Target,
  badge
}) {
  const navigate = useNavigate();
  const { nextBestAction, openTaskDrawer, setExpandedStageId } = useRoadmap();
  const { language, t } = useLanguage();

  // Dynamically resolve values if not explicitly overridden
  const hasDynamicAction = Boolean(nextBestAction);
  const activeTitle = title ? localizeBusinessValue(title, language) : (hasDynamicAction ? localizeBusinessValue(nextBestAction.title, language) : t('dashboard.exploreSchemes', 'Explore government support programs'));
  const activeDesc = description ? localizeBusinessValue(description, language) : (hasDynamicAction ? localizeBusinessValue(nextBestAction.reason, language) : t('dashboard.commandCenterDesc', 'Identify schemes, subsidies, and credit guarantee programs relevant to your enterprise.'));
  const activePriority = priority || (hasDynamicAction ? `${t('dashboard.highPriority', 'HIGH Priority')}` : t('dashboard.highPriority', 'HIGH Priority'));
  const activeBadge = badge ? localizeBusinessValue(badge, language) : (hasDynamicAction ? localizeBusinessValue(nextBestAction.impact || t('dashboard.nextMilestone', 'Next Milestone'), language) : t('dashboard.nextMilestone', 'Next Milestone'));
  const activeActionLabel = actionLabel ? localizeBusinessValue(actionLabel, language) : (hasDynamicAction ? t('dashboard.executeMilestone', 'Execute Milestone') : t('dashboard.exploreSchemes', 'Explore Schemes'));

  const handleActionClick = (e) => {
    if (route) {
      navigate(route);
      return;
    }

    if (hasDynamicAction && nextBestAction.taskId) {
      e.preventDefault();
      if (setExpandedStageId && nextBestAction.stageId) {
        setExpandedStageId(nextBestAction.stageId);
      }
      if (openTaskDrawer) {
        openTaskDrawer(nextBestAction.taskId);
      }
      navigate('/roadmap');
    } else {
      navigate('/roadmap');
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{activeBadge}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-400/80">
              • {activePriority}
            </span>
            {hasDynamicAction && nextBestAction.estimatedTime && (
              <span className="text-[11px] font-medium text-slate-400">
                • {t('dashboard.estTime', 'Est. time:')} {nextBestAction.estimatedTime}
              </span>
            )}
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeTitle}
              </h3>
              <p className="text-sm text-emerald-100/80 mt-1.5 leading-relaxed">
                {activeDesc}
              </p>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              {t('dashboard.shortcuts', 'Shortcuts:')}
            </span>
            <Link
              to="/schemes"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors font-semibold"
            >
              <Landmark className="w-3 h-3" />
              <span>{t('nav.schemes', 'Government Schemes')}</span>
            </Link>
            <Link
              to="/funding"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors font-semibold"
            >
              <Coins className="w-3 h-3" />
              <span>{t('dashboard.loanDprCalc', 'Loan & DPR Calculator')}</span>
            </Link>
            <Link
              to="/advisor"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 transition-colors font-semibold"
            >
              <Bot className="w-3 h-3" />
              <span>{t('nav.advisor', 'AI Advisor')}</span>
            </Link>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center md:self-center">
          <button
            onClick={handleActionClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] text-slate-950 font-bold text-sm rounded-xl shadow-soft-md transition-all group cursor-pointer"
          >
            <span>{activeActionLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
