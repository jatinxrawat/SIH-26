import React, { useState } from 'react';
import { 
  MessageSquare, 
  Filter, 
  Calculator, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import Badge from './common/Badge';
import { howItWorksSteps } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const { t, language } = useLanguage();

  const stepIcons = [
    MessageSquare,
    Filter,
    Calculator,
    Compass
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge={t('landing.howItWorksTitle', 'How UdyamSaathi Works')}
          title={t('landing.howItWorksTitle', 'Your business. Your context. Your next move.')}
          subtitle={t('landing.howItWorksSubtitle', 'A structured 4-step framework engineered to remove ambiguity and build clarity from day one.')}
          align="center"
        />

        {/* 4 Connected Large Steps with Visual Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Left Column: Vertical Connected Stepper */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 relative">
            {/* Connected Vertical Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200 -z-0 hidden sm:block" />

            {howItWorksSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group cursor-pointer relative rounded-2xl p-5 sm:p-6 transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-emerald-300 shadow-soft-md ring-1 ring-emerald-400/30'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 shadow-soft-sm'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Number & Icon Node */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors shadow-soft-sm relative z-10 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold tracking-wider text-emerald-700 uppercase">
                          {t('dashboard.stageOf', 'Step')} {step.number}
                        </span>
                        <Badge variant={isActive ? "growth" : "neutral"} size="sm">
                          {localizeBusinessValue(step.badge, language)}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {localizeBusinessValue(step.title, language)}
                      </h3>

                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {localizeBusinessValue(step.description, language)}
                      </p>

                      {isActive && (
                        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200/70">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{localizeBusinessValue(step.detail, language)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Graphic Preview */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t('common.verified', 'Structured Verification Engine')}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {t('dashboard.stageOf', 'Step')} {activeStep + 1} of 4
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900">
                {localizeBusinessValue(howItWorksSteps[activeStep].title, language)}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {localizeBusinessValue(howItWorksSteps[activeStep].description, language)}
              </p>
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-sm text-emerald-900 font-medium">
                {localizeBusinessValue(howItWorksSteps[activeStep].detail, language)}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>{t('landing.startJourney', 'Begin Your Process')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
