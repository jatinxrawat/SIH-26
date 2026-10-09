import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Database,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import SectionHeader from './common/SectionHeader';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';

export default function AISection() {
  const [activeScenario, setActiveScenario] = useState('first-step');
  const { t, language } = useLanguage();

  const scenarios = {
    'first-step': {
      user: language === 'hi' ? '“मुझे पहले क्या करना चाहिए?”' : language === 'mr' ? '“मी आधी काय करावे?”' : language === 'bn' ? '“আমি প্রথমে কী করব?”' : '“What should I do first?”',
      ai: language === 'hi'
        ? '“आपकी व्यावसायिक प्रोफाइल के आधार पर, आपकी पहली प्राथमिकता उस योजना की समीक्षा करना है जिसके लिए आप सर्वाधिक पात्र हैं (PMFME)। यह आपके पूंजी अंतराल को कम कर सकती है। इसके बाद, हम आपको आवश्यक दस्तावेजों में मार्गदर्शन करेंगे।”'
        : language === 'mr'
        ? '“तुमच्या व्यवसाय प्रोफाईलनुसार, तुमची पहिली प्राथमिकता PMFME योजनेची तपासणी करणे आहे, ज्यामुळे भांडवलाचा तुटवडा भरून निघेल.”'
        : language === 'bn'
        ? '“আপনার প্রোফাইলের ভিত্তিতে, সর্বাধিক উপযুক্ত প্রকল্পটি (PMFME) পর্যালোচনা করাই আপনার প্রধান অগ্রাধিকার।”'
        : '“Based on your business profile, your first priority is to review the scheme you’re most likely to qualify for. It could reduce your current funding gap. Once that’s done, we’ll guide you through the documents needed for your funding plan.”',
      action1: t('schemes.viewDetails', 'Review PMFME Scheme'),
      action2: t('advisor.requiredDocs', 'View Required Documents'),
      badge: t('common.highPriority', 'High Priority Step')
    },
    'bank-loan': {
      user: language === 'hi' ? '“बैंक कितना ऋण स्वीकृत करेगा?”' : language === 'mr' ? '“बँक किती कर्ज मंजूर करेल?”' : language === 'bn' ? '“ব্যাংক কত টাকা ঋণ অনুমোদন করবে?”' : '“How much loan will the bank approve?”',
      ai: language === 'hi'
        ? '“₹3.00 लाख की परियोजना के लिए ₹75,000 मार्जिन और ₹1.00 लाख PMFME सब्सिडी के साथ आपको ₹1.25 लाख के बैंक सावधि ऋण की आवश्यकता है।”'
        : language === 'mr'
        ? '“₹३ लाखांच्या प्रकल्पासाठी ₹७५,००० स्वतःचे भांडवल आणि ₹१ लाखांच्या अनुदानासह तुम्हाला ₹१.२५ लाख बँक मुदत कर्जाची आवश्यकता आहे.”'
        : language === 'bn'
        ? '“৩ লাখ টাকার প্রকল্পের জন্য ৭৫,০০০ টাকা মার্জিন এবং ১ লাখ টাকা ভর্তুকি সহ ১.২৫ লাখ টাকা ব্যাংক ঋণের প্রয়োজন।”'
        : '“Under your structured capital stack for the ₹3.00 Lakh project, you need a bank term loan of ₹1.25 Lakh. With your ₹75,000 margin and the ₹1.00 Lakh PMFME capital subsidy, the bank requires only the basic quotation report.”',
      action1: t('funding.projectCostBreakdown', 'Inspect Capital Breakdown'),
      action2: t('funding.repaymentScheduler', 'DPR Template Format'),
      badge: t('funding.title', 'Financial Calculation')
    }
  };

  const current = scenarios[activeScenario];

  return (
    <section id="ai" className="py-20 md:py-28 bg-[#FBFBFA] border-t border-slate-200/60 relative overflow-hidden">
      {/* Background ambient mesh */}
      <div className="absolute -left-20 top-1/3 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge={t('landing.aiTitle', 'Contextual AI Architecture')}
          title={t('landing.aiTitle', 'AI that understands the journey — not just the question.')}
          subtitle={t('landing.aiSubtitle', 'UdyamSaathi doesn’t treat every conversation as a blank chat. Its AI works with your business profile, matched schemes, funding plan, roadmap, and progress to provide context-aware guidance.')}
          align="center"
        />

        <div className="max-w-4xl mx-auto">
          
          {/* Scenario Toggle */}
          <div className="flex justify-center mb-6 w-full max-w-full px-2">
            <div className="flex flex-col sm:inline-flex sm:flex-row items-center p-1 rounded-xl bg-slate-200/80 border border-slate-300/70 shadow-soft-sm text-xs font-semibold w-full sm:w-auto">
              <span className="text-[11px] font-bold text-slate-500 px-2.5 uppercase tracking-wider hidden sm:inline">
                {t('advisor.suggestedInquiries', 'Test Prompt')}:
              </span>
              <button
                type="button"
                onClick={() => setActiveScenario('first-step')}
                className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all text-center ${
                  activeScenario === 'first-step'
                    ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1: {language === 'hi' ? 'मुझे पहले क्या करना चाहिए?' : language === 'mr' ? 'आधी काय करावे?' : language === 'bn' ? 'প্রথমে কী করণীয়?' : 'What should I do first?'}
              </button>
              <button
                type="button"
                onClick={() => setActiveScenario('bank-loan')}
                className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all text-center ${
                  activeScenario === 'bank-loan'
                    ? 'bg-white text-slate-900 shadow-soft-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2: {language === 'hi' ? 'बैंक ऋण निर्धारण' : language === 'mr' ? 'बँक कर्ज नियोजन' : language === 'bn' ? 'ব্যাংক ঋণ হিসাব' : 'Bank Loan Sizing'}
              </button>
            </div>
          </div>

          {/* Chat Mockup Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl overflow-hidden">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span>{t('advisor.title', 'Saathi AI Business Advisor')}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {t('common.live', 'Context-Calibrated Digital Companion')}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('common.verified', 'Official Scheme Grounded')}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-lg text-sm font-semibold shadow-soft-sm">
                  {current.user}
                </div>
              </div>

              {/* AI message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-soft-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-4 max-w-xl">
                  <div className="bg-emerald-50/70 border border-emerald-200/80 p-5 rounded-2xl rounded-tl-sm text-slate-800 text-sm leading-relaxed space-y-3">
                    <p className="font-medium text-slate-900">
                      {current.ai}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-3 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-emerald-900 shadow-soft-xs">
                        {current.action1}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-emerald-900 shadow-soft-xs">
                        {current.action2}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer banner */}
            <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>{t('common.verified', 'Zero Hallucination Policy: Backed by official ministry notifications')}</span>
              </span>
              <a
                href="/advisor"
                className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                <span>{t('dashboard.openFullAdvisor', 'Try Interactive Advisor')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
