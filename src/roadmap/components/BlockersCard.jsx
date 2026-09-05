/**
 * BlockersCard Component
 * Highlights tangible document, scheme, or DPR blockers currently impeding the journey.
 */

import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, FileCheck } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export default function BlockersCard() {
  const { blockers, openTaskDrawer, toggleDocumentStatus, documentStatus } = useRoadmap();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
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
              What's Blocking You?
            </h3>
            <p className="text-[11px] text-slate-400">
              Actionable impediments to credit & formalization
            </p>
          </div>
        </div>

        <span
          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
            blockers.length > 0
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          }`}
        >
          {blockers.length > 0 ? `${blockers.length} Action Items` : 'Clear Path'}
        </span>
      </div>

      {blockers.length === 0 ? (
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block">No critical blockers!</span>
            <span className="text-emerald-700 text-[11px]">
              All prerequisite documents and scheme selections are up to date for your current stage.
            </span>
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
                    <span className="font-bold text-slate-900">{blocker.title}</span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-slate-200 text-slate-600">
                      {blocker.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {blocker.reason}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  {isDoc ? (
                    <button
                      type="button"
                      onClick={() => toggleDocumentStatus(blocker.id)}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-soft-xs"
                    >
                      <FileCheck className="w-3 h-3" />
                      <span>Ready</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openTaskDrawer(blocker.taskId)}
                      className="px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[11px] transition-all flex items-center gap-1"
                    >
                      <span>Resolve</span>
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
