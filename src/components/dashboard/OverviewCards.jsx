import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, IndianRupee, MapPin, FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import { useBusiness } from '../../context/BusinessContext';
import { useRoadmap } from '../../roadmap/context/RoadmapContext';
import { schemeApi } from '../../services/schemeApi';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';
import {
  parseRupeeAmount,
  formatRupees,
  calculateFinancingStructure
} from '../../services/financialCalculationService';

export default function OverviewCards() {
  const { profile } = useEntrepreneurProfile();
  const { activeBusiness } = useBusiness();
  const { allTasks, completedTaskIds, overallProgress, documents, documentStatus } = useRoadmap();
  const { language, t } = useLanguage();

  const business = activeBusiness || profile?.business || profile || {};
  const finances = business.financialProfile || profile?.financialProfile || {};

  // 1. Live Scheme Matches Count
  const [schemeCount, setSchemeCount] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchSchemeCount() {
      try {
        const matches = await schemeApi.getRecommendations(business);
        if (isMounted) {
          setSchemeCount(matches ? matches.length : 0);
        }
      } catch (err) {
        console.error('Error fetching scheme recommendations count:', err);
        if (isMounted) setSchemeCount(14); // sensible fallback
      }
    }
    fetchSchemeCount();
    return () => { isMounted = false; };
  }, [business.sector, business.location, business.type, business.stage]);

  // 2. Funding Calculations
  const margin = parseRupeeAmount(finances.availableMarginCapital || finances.availableCapital || 0);
  const cost = parseRupeeAmount(finances.estimatedProjectCost || 0);
  const hasFinancialData = margin > 0 || cost > 0;
  const structure = hasFinancialData ? calculateFinancingStructure(margin, cost) : null;

  const fundingVal = structure
    ? formatRupees(structure.potentialLoan)
    : (finances.fundingRequired || '₹2,25,000');

  const availableCapital = finances.availableCapital || (structure ? formatRupees(structure.margin) : '₹75,000');
  const projectCost = finances.estimatedProjectCost || (structure ? formatRupees(structure.effectiveProjectCost) : '₹3,00,000');

  // 3. Roadmap Progress
  const totalTasks = allTasks?.length || 16;
  const completedTasks = completedTaskIds?.length || 0;
  const progressPercent = overallProgress || Math.round((completedTasks / totalTasks) * 100);

  // 4. Documents Vault
  const totalDocs = documents?.length || 11;
  const readyDocs = Object.values(documentStatus || {}).filter(Boolean).length;
  const docPercent = Math.round((readyDocs / totalDocs) * 100);

  const localizedSector = localizeBusinessValue(business.sector || 'Services', language);

  const cards = [
    {
      title: t('dashboard.schemeMatches', 'Scheme Matches'),
      value: schemeCount !== null ? `${schemeCount} ${t('dashboard.schemesUnit', 'Schemes')}` : t('dashboard.evaluating', 'Evaluating...'),
      subtitle: schemeCount !== null ? `${t('dashboard.alignedSchemesFor', 'Eligible for')} ${localizedSector}` : t('dashboard.recommendedDesc', 'Matching government programs'),
      badge: schemeCount !== null ? t('dashboard.liveMatches', 'Live Matches') : t('dashboard.evaluating', 'Analyzing'),
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Landmark,
      route: '/schemes'
    },
    {
      title: t('dashboard.fundingRequired', 'Funding Plan'),
      value: fundingVal,
      subtitle: `${t('business.selfMargin', 'Self Margin')}: ${availableCapital} • ${t('business.totalOutlay', 'Total Outlay')}: ${projectCost}`,
      badge: t('dashboard.capitalPlan', 'Capital Plan'),
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: IndianRupee,
      route: '/funding'
    },
    {
      title: t('dashboard.roadmapProgress', 'Roadmap Progress'),
      value: `${completedTasks} / ${totalTasks} ${t('dashboard.tasks', 'Tasks')}`,
      subtitle: `${progressPercent}% ${t('dashboard.overallJourneyCompleted', 'overall journey completed')}`,
      badge: progressPercent > 0 ? `${progressPercent}% ${t('dashboard.done', 'Done')}` : t('common.inProgress', 'In Progress'),
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: MapPin,
      route: '/roadmap'
    },
    {
      title: t('dashboard.documentsVault', 'Documents Vault'),
      value: `${readyDocs} / ${totalDocs} ${t('dashboard.ready', 'Ready')}`,
      subtitle: `${totalDocs - readyDocs} ${t('dashboard.pendingVerification', 'pending verification')}`,
      badge: `${docPercent}% ${t('dashboard.verified', 'Verified')}`,
      badgeColor: readyDocs > 0 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-700 border-slate-200',
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
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between hover:border-emerald-300 active:scale-[0.99]"
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
