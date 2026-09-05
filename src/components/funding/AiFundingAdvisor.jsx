import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Send,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import {
  FUNDING_SUGGESTED_QUESTIONS,
  askFundingAdvisor
} from '../../services/fundingAdvisorService';

export default function AiFundingAdvisor({ calculationContext }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);

  const handleAsk = async (questionText) => {
    const q = (questionText || customInput).trim();
    if (!q || loading) return;

    setSelectedQuestion(q);
    setLoading(true);
    setError(null);

    // Append user question
    const userMsg = { role: 'user', content: q, timestamp: new Date() };
    setConversation((prev) => [...prev, userMsg]);
    setCustomInput('');

    try {
      const response = await askFundingAdvisor(q, calculationContext);
      const assistantMsg = {
        role: 'assistant',
        content: response.answer,
        takeaways: response.keyTakeaways || [],
        warning: response.warning,
        source: response.source,
        isLive: response.isLive,
        timestamp: new Date()
      };
      setConversation((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Advisor query error', err);
      setError('Unable to fetch advice at this moment. Using deterministic calculations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
            <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
            <span>Grounded Underwriting Intelligence</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🧠 Ask About Your Funding Plan</span>
          </h3>
          <p className="text-xs text-slate-500">
            Get transparent explanations of your project structure, debt capacity, and repayment timelines grounded strictly in verified scheme formulas.
          </p>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero Hallucination Policy</span>
        </div>
      </div>

      {/* Suggested Questions Grid (Section 28) */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Common Questions for this Structure:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {FUNDING_SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleAsk(q)}
              disabled={loading}
              className="text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 text-xs font-semibold text-slate-800 transition-all flex items-start justify-between gap-2 group disabled:opacity-50"
            >
              <span className="group-hover:text-emerald-950">{q}</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Conversation Stream */}
      {conversation.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-slate-100">
          {conversation.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-50 border border-emerald-200/80 text-emerald-950 font-bold ml-6'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 space-y-3 mr-4'
              }`}
            >
              {msg.role === 'user' ? (
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{msg.content}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
                      <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{msg.source}</span>
                    </span>
                    {msg.isLive && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                        Live AI Advisory
                      </span>
                    )}
                  </div>

                  <p className="text-slate-800 font-medium text-xs leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>

                  {msg.takeaways && msg.takeaways.length > 0 && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Key Grounded Insights:</span>
                      <ul className="list-disc list-inside text-[11px] text-slate-700 font-medium space-y-0.5">
                        {msg.takeaways.map((item, tIdx) => (
                          <li key={tIdx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {msg.warning && (
                    <div className="text-[11px] text-amber-800 flex items-start gap-1.5 pt-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{msg.warning}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600 animate-pulse">
          <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin" />
          <span>Consulting financial calculation engine and formulating grounded underwriting advice...</span>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(customInput);
        }}
        className="flex items-center gap-2 pt-2"
      >
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Ask any question about your funding tier, loan amount, or cash flow..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
        />
        <button
          type="submit"
          disabled={loading || !customInput.trim()}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-soft-xs disabled:opacity-50"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
