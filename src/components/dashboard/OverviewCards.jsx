import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, IndianRupee, MapPin, FileText, ArrowUpRight } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import {
  parseRupeeAmount,
  formatRupees,
  calculateFinancingStructure
} from '../../services/financialCalculationService';

export default function OverviewCards() {
  const { profile } = useEntrepreneurProfile();

  const financials = profile?.financialProfile || {};
  const margin = parseRupeeAmount(financials.availableMarginCapital || financials.availableCapital || 0);
  const cost = parseRupeeAmount(financials.estimatedProjectCost || 0);

  const hasFinancialData = margin > 0 || cost > 0;
  const structure = hasFinancialData ? calculateFinancingStructure(margin, cost) : null;

  const fundingVal = structure
    ? formatRupees(structure.potentialLoan)
    : 'Not calculated yet';

  const tierBadge = structure?.product?.name === 'Micro Finance Scheme'
    ? 'Micro Finance'
    : structure?.product?.name === 'Term Loan Scheme'
    ? 'Term Loan'
    : 'Funding Plan';

  const cards = [
    {
      title: 'Scheme Matches',
      value: '--',
      subtitle: 'Potential opportunities',
      badge: 'Coming Soon',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Landmark,
      route: '/schemes'
    },
    {
      title: 'Your Funding Plan',
      value: fundingVal,
      subtitle: structure
        ? `Project: ${formatRupees(structure.effectiveProjectCost)} • Margin: ${formatRupees(structure.margin)}`
        : 'Set up your financial structure',
      badge: hasFinancialData ? tierBadge : 'Action Required',
      badgeColor: hasFinancialData
        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
        : 'bg-amber-100 text-amber-800 border-amber-200',
      icon: IndianRupee,
      route: '/funding'
    },
    {
      title: 'Roadmap Progress',
      value: '0 / 7',
      subtitle: 'Milestones mapped',
      badge: 'In Progress',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: MapPin,
      route: '/roadmap'
    },
    {
      title: 'Documents Vault',
      value: '0 / --',
      subtitle: 'Verified records ready',
      badge: 'Checklist',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: FileText,
      route: '/documents'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.title}
            to={c.route}
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between hover:border-emerald-300"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:text-emerald-700 group-hover:bg-emerald-50 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.badgeColor}`}>
                  {c.badge}
                </span>
              </div>

              <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                {c.title}
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1 tracking-tight truncate">
                {c.value}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate">{c.subtitle}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
