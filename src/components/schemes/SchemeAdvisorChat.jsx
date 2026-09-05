import React, { useState } from 'react';
import { Bot, Send, Loader2, ShieldCheck } from 'lucide-react';
import { answerSchemeQuestion } from '../../services/schemeAdvisorService';

export default function SchemeAdvisorChat({
  profile,
  scheme = null,
  matchedSchemes = [],
  title = 'AI Scheme Intelligence Assistant'
}) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultPrompts = scheme ? [
    'Why am I eligible for this scheme?',
    'What documents am I missing for this application?',
    'How much margin money will I need to contribute?',
    'What is the step-by-step application process?'
  ] : [
    'Which of these schemes offers the highest capital subsidy for my business?',
    'Can I apply for both PMEGP and MUDRA simultaneously?',
    'What documents should I arrange first before applying?',
    'Which scheme matches my business stage best?'
  ];

  const handleAsk = async (userQ) => {
    const q = userQ || question;
    if (!q || !q.trim() || loading) return;

    const userMessage = { role: 'user', content: q };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const aiReply = await answerSchemeQuestion({
        profile,
        scheme,
        matchedSchemes,
        question: q,
        chatHistory: messages
      });

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      console.error('Advisor error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to connect to AI advisor service. Please verify your internet connection or try again shortly.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                {title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Grounded Knowledge
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ask questions about eligibility, missing documents, subsidies, and application steps.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Zero Hallucination</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Suggested Inquiries
        </span>
        <div className="flex flex-wrap gap-1.5">
          {defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(p)}
              disabled={loading}
              className="text-left text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-all"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      {messages.length > 0 && (
        <div className="space-y-3 max-h-80 overflow-y-auto pt-2 border-t border-slate-100">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Analyzing scheme guidelines against your enterprise profile...</span>
            </div>
          )}
        </div>
      )}

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="relative flex items-center pt-2"
      >
        <input
          type="text"
          placeholder={scheme ? `Ask anything about ${scheme.name}...` : "Ask any question about government schemes & subsidies..."}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
        <button
          type="submit"
          disabled={!question.trim() || loading}
          className={`absolute right-1.5 p-2 rounded-xl text-white transition-all ${
            question.trim() && !loading
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-soft-xs'
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
        </button>
      </form>
    </div>
  );
}
