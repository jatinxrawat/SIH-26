/**
 * BusinessReadinessCard Component
 * Compact intelligence section displaying mathematically calculated readiness scores
 * across 5 key entrepreneurship pillars.
 */

import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';

export default function BusinessReadinessCard() {
  const { businessReadiness } = useRoadmap();
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {t('roadmap.readinessIndexTitle', 'Business Readiness Index')}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t('roadmap.readinessSubtitle', 'Mathematically derived from verified task & document state')}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {t('roadmap.deterministic', 'Deterministic')}
        </span>
      </div>

      <div className="space-y-4">
        {businessReadiness.map((item) => {
          const isHigh = item.score >= 75;
          const isMedium = item.score >= 40 && item.score < 75;

          return (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">
                  {localizeBusinessValue(item.label, language)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">
                    {localizeBusinessValue(item.weight, language)}
                  </span>
                  <span
                    className={`font-black ${
                      isHigh ? 'text-emerald-700' : isMedium ? 'text-amber-600' : 'text-slate-500'
                    }`}
                  >
                    {item.score}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh ? 'bg-emerald-600' : isMedium ? 'bg-amber-500' : 'bg-slate-400'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{t('roadmap.readinessFooter', 'Readiness updates dynamically as you complete checkpoints.')}</span>
      </div>
    </div>
  );
}

