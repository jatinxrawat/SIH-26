import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  ShieldCheck,
  RotateCcw,
  User,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Lightbulb,
  ExternalLink,
  Zap
} from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useAuth } from '../context/AuthContext';
import { sendAdvisorMessage } from '../services/aiAdvisorService';

export default function AdvisorPage() {
  const { profile } = useEntrepreneurProfile();
  const { activeBusiness, activeBusinessId } = useBusiness();
  const { currentUser, userProfile } = useAuth();

  const business = activeBusiness || profile || {};
  const personal = business.personalInfo || {};
  const finances = business.financialProfile || {};

  const displayName = personal.fullName || userProfile?.name || currentUser?.displayName || 'Entrepreneur';
  const businessName = business.name || 'Your Enterprise';
  const sector = business.sector || 'Services';
  const stage = business.stage || 'IDEA';
  const location = business.location || (personal.district ? `${personal.district}, ${personal.state}` : 'India');

  // Scoped chat storage key
  const chatStorageKey = `udyamsaathi_advisor_chat_${activeBusinessId || 'default'}`;

  const initialGreeting = {
    id: 'msg_welcome',
    sender: 'ai',
    text: `Namaste ${displayName}! I am your **UdyamSaathi AI Business Advisor**.\n\n` +
      `I have loaded your enterprise profile for **${businessName}** in the **${sector}** sector (${location}, **${stage}** stage).\n\n` +
      `I can help you navigate:\n` +
      `• **Government Subsidies & Schemes** (PMEGP, Mudra, Stand-Up India, CGTMSE, PMFME)\n` +
      `• **Bank Loan DPR Preparation** & collateral-free appraisal norms\n` +
      `• **Mandatory Licenses & Registrations** (Udyam, GST, Shop Act, FSSAI)\n` +
      `• **Go-to-market strategies** tailored for ${location}\n\n` +
      `What would you like to explore today?`,
    provider: 'UdyamSaathi Core Engine',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(chatStorageKey);
      return saved ? JSON.parse(saved) : [initialGreeting];
    } catch {
      return [initialGreeting];
    }
  });

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState('Groq Ultra-Fast');
  const chatEndRef = useRef(null);

  // Sync messages when active business changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(chatStorageKey);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([initialGreeting]);
      }
    } catch {
      setMessages([initialGreeting]);
    }
  }, [activeBusinessId, businessName]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem(chatStorageKey, JSON.stringify(messages));
    } catch (e) {
      console.warn('Chat storage error:', e);
    }
  }, [messages, chatStorageKey]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || loading) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const response = await sendAdvisorMessage({
        message: query,
        history: messages,
        profile: business
      });

      const aiMsg = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        provider: response.provider || 'Groq Ultra-Fast Cloud',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (response.provider) {
        setActiveProvider(response.provider);
      }

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Advisor error:', err);
      const errorMsg = {
        id: `ai_err_${Date.now()}`,
        sender: 'ai',
        text: `I encountered an issue connecting to the AI inference engine. Please check your internet connection or try asking again.`,
        provider: 'System Fallback',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
    try {
      localStorage.removeItem(chatStorageKey);
    } catch {}
  };

  const suggestedPrompts = [
    `Which government scheme offers the highest capital subsidy for ${businessName}?`,
    `How much margin money will banks ask for under PMEGP or Mudra?`,
    `What mandatory statutory licenses are required before I start operations?`,
    `Can you review my DPR funding plan for ${finances.estimatedProjectCost || '₹3,00,000'} project cost?`
  ];

  // Helper to render markdown-like formatting (bold, bullet points, headers)
  const renderFormattedText = (content) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Heading 3
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-black text-slate-900 mt-2.5 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Heading 2
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-sm font-extrabold text-slate-900 mt-3 mb-1.5">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet points
      if (line.trim().startsWith('• ') || line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-3.5 my-0.5 list-disc text-slate-700 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatInline(bulletText) }} />
          </li>
        );
      }
      // Blockquote
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-2 border-emerald-500 pl-3 py-1 my-2 bg-emerald-50/50 rounded-r-lg text-emerald-950 text-xs italic">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line.replace('> ', '')) }} />
          </blockquote>
        );
      }
      // Horizontal Rule
      if (line.trim() === '---') {
        return <hr key={idx} className="my-2.5 border-slate-200" />;
      }
      // Blank line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Standard paragraph
      return (
        <p key={idx} className="text-slate-800 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    });
  };

  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-200/80 rounded text-[11px] font-mono">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-emerald-700 underline font-bold hover:text-emerald-800">$1</a>');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-4 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                AI Business Advisor
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600" />
                <span>Live Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized guidance on Indian MSME schemes, banking appraisal, and compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/70 font-semibold shadow-soft-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="truncate max-w-[160px]">Active: {businessName}</span>
          </div>

          <button
            type="button"
            onClick={handleResetChat}
            title="Restart conversation"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Log Area */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in duration-150`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                  isUser
                    ? 'bg-slate-800 text-white shadow-soft-xs'
                    : 'bg-emerald-600 text-white shadow-soft-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble Body */}
              <div
                className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-4 text-xs sm:text-sm space-y-1.5 ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-soft-xs'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                }`}
              >
                {isUser ? (
                  <p className="font-semibold leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="space-y-1">{renderFormattedText(msg.text)}</div>
                )}

                <div className={`flex items-center gap-2 pt-1 text-[10px] ${isUser ? 'text-emerald-200 justify-end' : 'text-slate-400'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.provider && (
                    <>
                      <span>•</span>
                      <span className="font-bold text-emerald-700">{msg.provider}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading / Generating State */}
        {loading && (
          <div className="flex items-start gap-3 animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Analyzing enterprise parameters and generating response...</span>
            </div>
          </div>
        )}

        {/* Suggested Prompts if only welcome message is present */}
        {messages.length === 1 && (
          <div className="pt-3 border-t border-slate-100 max-w-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Suggested Queries for {businessName} ({stage})</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  className="p-3 text-left rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50 hover:border-emerald-200 text-xs text-slate-700 font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Active Interactive Chat Input */}
      <div className="shrink-0 bg-white rounded-3xl border border-slate-200/90 shadow-soft-sm p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={loading}
            placeholder={`Ask anything about schemes, loans, licenses, or DPR for ${businessName}...`}
            className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !inputVal.trim()}
            className="absolute right-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-soft-xs flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-between px-2 pt-2 text-[10px] text-slate-400">
          <span>⚡ Live engine: {activeProvider}</span>
          <span>Zero hallucination policy • Grounded in Indian MSME regulations</span>
        </div>
      </div>
    </div>
  );
}
