/**
 * TaskAIAssistant Component
 * Embedded AI advisor inside the Task Detail Drawer.
 * Allows switching between Gemini and Grok with structured, actionable MSME advice.
 */

import { Bot, Sparkles, Send, Check, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

export default function TaskAIAssistant({ task, businessContext }) {
  const [provider, setProvider] = useState('gemini');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [planAccepted, setPlanAccepted] = useState(false);

  const quickPrompts = [
    `How do I execute "${task.shortTitle || task.title}" step-by-step?`,
    'What common mistakes do first-time entrepreneurs make here?',
    'What specific evidence do banks or inspectors look for?'
  ];

  const handleAsk = async (queryText) => {
    const textToSend = queryText || question;
    if (!textToSend && !queryText) return;

    setLoading(true);
    setPlanAccepted(false);
    try {
      const result = await aiService.askAI({
        provider,
        task,
        context: businessContext,
        question: textToSend
      });
      setAiResponse(result);
    } catch (err) {
      console.error('AI call error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 space-y-4 border border-slate-800 shadow-soft-md">
      {/* Header & Provider Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-white">AI Task Assistant</h4>
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Context-Aware
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized for {businessContext.businessName} ({businessContext.industry})
            </p>
          </div>
        </div>

        {/* Gemini vs Grok Toggle */}
        <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setProvider('gemini')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              provider === 'gemini'
                ? 'bg-emerald-600 text-white shadow-soft-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Gemini 1.5
          </button>
          <button
            type="button"
            onClick={() => setProvider('grok')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              provider === 'grok'
                ? 'bg-slate-700 text-white shadow-soft-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Grok 2
          </button>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
          Suggested Inquiries
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuestion(prompt);
                handleAsk(prompt);
              }}
              disabled={loading}
              className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder={`Ask ${provider === 'gemini' ? 'Gemini' : 'Grok'} about this task...`}
          className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="button"
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>

      {/* Structured AI Response View */}
      {aiResponse && (
        <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700/80 space-y-3.5 text-xs text-slate-300 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <span className="text-[11px] font-black text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guidance from {aiResponse.provider || 'AI Engine'}</span>
            </span>

            {aiResponse.isFallback && (
              <span className="text-[9px] px-2 py-0.5 rounded bg-slate-700 text-slate-400">
                Verified MSME Knowledge Model
              </span>
            )}
          </div>

          {/* ANSWER */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Answer</span>
            <p className="text-white text-xs leading-relaxed font-medium">
              {aiResponse.answer}
            </p>
          </div>

          {/* WHY */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">Why</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {aiResponse.why}
            </p>
          </div>

          {/* WHAT TO DO */}
          {aiResponse.whatToDo && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">What to do</span>
              <ul className="space-y-1 text-[11px]">
                {(Array.isArray(aiResponse.whatToDo) ? aiResponse.whatToDo : [aiResponse.whatToDo]).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* DOCUMENTS & NEXT STEP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <span className="text-[10px] font-bold text-sky-400 block">Documents</span>
              <p className="text-slate-300 mt-0.5">{aiResponse.documents}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <span className="text-[10px] font-bold text-amber-400 block">Next Step</span>
              <p className="text-slate-300 mt-0.5">{aiResponse.nextStep}</p>
            </div>
          </div>

          {/* WARNINGS */}
          {aiResponse.warnings && (
            <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-[11px] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block font-bold text-[10px] uppercase">Compliance Warning</strong>
                <span>{aiResponse.warnings}</span>
              </div>
            </div>
          )}

          {/* Use this plan CTA */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setPlanAccepted(true)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                planAccepted
                  ? 'bg-emerald-600 text-white font-black'
                  : 'bg-white hover:bg-slate-100 text-slate-950'
              }`}
            >
              {planAccepted ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              <span>{planAccepted ? 'Plan Integrated' : 'Use this plan'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
