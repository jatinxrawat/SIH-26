import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bot, Sparkles, ArrowRight, Send, CheckCircle2, Zap } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { useLanguage } from '../../context/LanguageContext';

export default function AdvisorPreview() {
  const navigate = useNavigate();
  const { activeBusiness } = useBusiness();
  const { language, t } = useLanguage();
  const [quickQuestion, setQuickQuestion] = useState('');

  const sampleTopics = [
    t('dashboard.sampleTopic1', 'Government schemes & subsidy matching'),
    t('dashboard.sampleTopic2', 'Bank loan eligibility and margin requirements'),
    t('dashboard.sampleTopic3', 'Mandatory licenses (Udyam, GST, FSSAI)'),
    t('dashboard.sampleTopic4', '12-Month milestone execution plan')
  ];

  const handleAskPrompt = (promptText) => {
    const text = (promptText || quickQuestion).trim();
    if (!text) return;
    navigate('/advisor', { state: { initialPrompt: text } });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAskPrompt(quickQuestion);
  };

  return (
    <div className="bg-sand/40 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {t('dashboard.aiCompanion', 'AI Companion')}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{t('dashboard.ultraFast', 'Ultra-Fast')}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                {t('dashboard.businessAdvisorTitle', 'Your Business Advisor')}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t('dashboard.advisorHelpDesc', 'Need tailored guidance for your enterprise? Ask a direct question or select a topic:')}
        </p>

        {/* Quick Input Bar right on Dashboard */}
        <form onSubmit={handleFormSubmit} className="mt-4 relative">
          <input
            type="text"
            value={quickQuestion}
            onChange={(e) => setQuickQuestion(e.target.value)}
            placeholder={t('dashboard.askQuestionPlaceholder', 'Ask about subsidies, DPR, licenses...')}
            className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-soft-xs transition-all"
          />
          <button
            type="submit"
            disabled={!quickQuestion.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
            title="Ask AI Advisor"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Clickable Quick Topics */}
        <div className="mt-4 space-y-2">
          {sampleTopics.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => handleAskPrompt(topic)}
              className="w-full text-left p-2 rounded-xl bg-white/70 hover:bg-white border border-slate-200/70 hover:border-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-700 font-medium truncate group-hover:text-emerald-800">
                  {topic}
                </span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/60">
        <Link
          to="/advisor"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-soft-sm group"
        >
          <span>{t('dashboard.openFullAdvisor', 'Open Full AI Advisor')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
