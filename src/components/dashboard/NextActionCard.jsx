import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function NextActionCard({
  title = 'Explore government support programs',
  description = "Based on your business sector and location, we'll identify schemes, subsidies, and credit guarantee programs relevant to your enterprise.",
  actionLabel = 'Explore Schemes',
  route = '/schemes',
  priority = 'High Priority',
  icon: Icon = Target,
  badge = 'Recommended Next Step'
}) {
  return (
    <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-soft-lg relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{badge}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-400/80">
              • {priority}
            </span>
          </div>

          <div className="flex items-start gap-3 pt-1">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-emerald-100/80 mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center md:self-center">
          <Link
            to={route}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] text-slate-950 font-bold text-sm rounded-xl shadow-soft-md transition-all group"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
