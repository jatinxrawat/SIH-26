/**
 * BlockersCard Component (Upgraded)
 * Highlights tangible document, scheme, or DPR blockers impeding progress
 * with 1-click verification resolution.
 */

import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, Upload, ShieldCheck } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';

export default function BlockersCard() {
  const { blockers, openTaskDrawer, simulateDocumentUpload } = useRoadmap();
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
              blockers.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            {blockers.length > 0 ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              {t('roadmap.blockersTitle', "What's Blocking You?")}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t('roadmap.blockersSubtitle', 'Critical impediments to bank loan and scheme subsidy')}
            </p>
          </div>
        </div>

        <span
          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
            blockers.length > 0
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          {blockers.length > 0 ? `${blockers.length} ${t('roadmap.statusPending', 'Pending')}` : t('roadmap.clearPath', 'Clear Path')}
        </span>
      </div>

      {blockers.length === 0 ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-soft-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <strong className="font-black text-slate-900 block text-xs">
              {t('roadmap.zeroBlockers', 'Zero Critical Roadblocks')}
            </strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {t('roadmap.zeroBlockersDesc', 'All prerequisite documents, scheme matches, and compliance criteria are up to date for your current stage.')}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          {blockers.map((blocker) => {
            const isDoc = blocker.id.startsWith('doc-');

            return (
              <div
                key={blocker.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">
                      {localizeBusinessValue(blocker.title, language)}
                    </span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-slate-200 text-slate-600">
                      {localizeBusinessValue(blocker.category, language)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {localizeBusinessValue(blocker.reason, language)}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {isDoc ? (
                    <button
                      type="button"
                      onClick={() => simulateDocumentUpload(blocker.id, blocker.title)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition-all flex items-center gap-1 shadow-soft-xs"
                      title="Upload & mark document verified"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{t('roadmap.uploadAndVerify', 'Upload & Verify')}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openTaskDrawer(blocker.taskId)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[11px] transition-all flex items-center gap-1"
                    >
                      <span>{t('roadmap.resolve', 'Resolve')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

