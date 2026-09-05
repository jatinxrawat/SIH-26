import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

const STRATEGY_STORAGE_KEY = 'udyamsathi_business_strategy_cache';

export default function StrategySnapshot() {
  const { profile } = useEntrepreneurProfile();
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STRATEGY_STORAGE_KEY);
      if (cached) {
        setStrategy(JSON.parse(cached));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const marketOpportunity = strategy?.feasibility?.snapshot?.marketOpportunity || 'High';
  const competition = strategy?.feasibility?.snapshot?.competition || 'Moderate';
  const overallOutlook = strategy?.executiveSummary?.overallOutlook || 'Promising with Conditions';
  const score = strategy?.executiveSummary?.indicativeStrategyScore || 78;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Business Strategy & Feasibility
            </h2>
            <p className="text-xs text-slate-500">
              Hyper-local 5–10 km market catchment & viability snapshot.
            </p>
          </div>
        </div>

        <Link
          to="/strategy"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>{strategy ? 'View Full Strategy' : 'Generate Strategy'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Market Opportunity</span>
          <strong className="text-sm font-black text-slate-900 mt-1 block">{marketOpportunity}</strong>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Competition</span>
          <strong className="text-sm font-black text-slate-900 mt-1 block">{competition}</strong>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Feasibility Score</span>
          <strong className="text-sm font-black text-emerald-700 mt-1 block">{score} / 100</strong>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Local Outlook</span>
          <strong className="text-xs font-black text-slate-900 mt-1 truncate block uppercase">{overallOutlook}</strong>
        </div>
      </div>
    </div>
  );
}
