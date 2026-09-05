import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Coins, Users2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

export default function RecommendationsPreview() {
  const { profile } = useEntrepreneurProfile();

  const sector = profile?.business?.sector || 'General';

  const recommendations = [
    {
      title: 'Government Scheme Support',
      desc: `Targeted subsidies and capital assistance matching ${sector} enterprises.`,
      tag: 'Coming Next',
      route: '/schemes',
      icon: Landmark,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Institutional Funding Channels',
      desc: 'Mudra, PMEGP capital subsidies and collateral-free bank loans structure.',
      tag: 'Coming Next',
      route: '/funding',
      icon: Coins,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      title: 'Professional Assistance',
      desc: 'Certified local accountants, tax filing experts, and compliance agents.',
      tag: 'Coming Next',
      route: '/professionals',
      icon: Users2,
      color: 'text-sky-700 bg-sky-50 border-sky-200'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Recommended For You
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-2">
            Priority Enterprise Opportunities
          </h3>
          <p className="text-xs text-slate-500">
            Intelligent modules aligned with your declared goals and sector.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <Link
              key={idx}
              to={rec.route}
              className="group p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-emerald-300 hover:shadow-soft-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${rec.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-soft-xs">
                    {rec.tag}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {rec.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>Inspect module</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
