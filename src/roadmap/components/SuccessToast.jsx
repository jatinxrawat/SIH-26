/**
 * SuccessToast Component
 * Floating subtle notification for state transitions and completions.
 */

import React from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useRoadmap } from '../context/RoadmapContext';

export default function SuccessToast() {
  const { toast } = useRoadmap();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <div className="bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-soft-2xl border border-slate-800 flex items-center gap-3 text-xs font-bold max-w-md">
        {toast.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : toast.type === 'warning' ? (
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
        )}
        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
}
