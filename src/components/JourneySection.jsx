import React, { useState } from 'react';
import { 
  Lightbulb, 
  BarChart3, 
  Search, 
  Banknote, 
  Hammer, 
  TrendingUp, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { journeyStages } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';

export default function JourneySection() {
  const [selectedStage, setSelectedStage] = useState(3); // Default to Stage 4 (index 3: Plan Funding)
  const { t, language } = useLanguage();

  const icons = [
    Lightbulb,
    BarChart3,
    Search,
    Banknote,
    Hammer,
    TrendingUp
  ];

  const currentStage = journeyStages[selectedStage];

  return (
    <section id="solutions" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background soft accent */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge={t('dashboard.enterpriseJourney', 'The Unified Architecture')}
          title={t('dashboard.enterpriseJourney', 'One business journey. Everything connected.')}
          subtitle={t('dashboard.enterpriseJourneyDesc', 'UdyamSaathi brings fragmented business support into one personalized journey.')}
          align="center"
        />

        {/* Horizontal Journey Progression Bar */}
        <div className="relative mt-8">
          
          {/* Connecting Track Line for Desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-slate-100 -z-0">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${(selectedStage / (journeyStages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {journeyStages.map((stage, idx) => {
              const Icon = icons[idx];
              const isSelected = selectedStage === idx;
              const isPast = idx < selectedStage;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setSelectedStage(idx)}
                  className={`flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl transition-all duration-200 border text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-soft-lg transform -translate-y-1'
                      : isPast
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:bg-emerald-100/60'
                      : 'bg-[#FBFBFA] border-slate-200/80 text-slate-600 hover:bg-slate-100/80'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs mb-2.5 transition-colors ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase tracking-wider block mb-1 ${
                    isSelected ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {t('dashboard.stageOf', 'Stage')} {idx + 1}
                  </span>

                  <span className={`text-xs font-bold leading-tight line-clamp-2 ${
                    isSelected ? 'text-white' : 'text-slate-800'
                  }`}>
                    {localizeBusinessValue(stage.title, language)}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Dynamic Detail Card for Selected Stage */}
        <div className="mt-8 bg-sand/30 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-soft-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  {t('dashboard.stageOf', 'Stage')} {selectedStage + 1}: {localizeBusinessValue(currentStage.title, language)}
                </span>
                <Badge variant="growth" size="sm">
                  {t('common.active', 'Active Module')}
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {localizeBusinessValue(currentStage.tagline || currentStage.title, language)}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {localizeBusinessValue(currentStage.description, language)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {(currentStage.deliverables || []).map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{localizeBusinessValue(item, language)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center sm:items-end justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all"
              >
                <span>{t('landing.startJourney', 'Unlock This Stage')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
