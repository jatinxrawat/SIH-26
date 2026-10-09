import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  User,
  Bot,
  Layers,
  Briefcase
} from "lucide-react";
import { getChatMessages, saveChatMessages } from "../../services/professionalsService";

export default function ProfessionalChatModal({
  isOpen,
  onClose,
  professional,
  currentUser,
  activeBusiness
}) {
  if (!isOpen || !professional) return null;

  const conversationId = `conv_${professional.id}`;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showOfferBar, setShowOfferBar] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerType, setOfferType] = useState("Full-Time");
  const [activeRole, setActiveRole] = useState("client"); // "client" | "professional"
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loaded = getChatMessages(conversationId);
    setMessages(loaded);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: activeRole,
      senderName: activeRole === "client" ? (currentUser?.displayName || "Entrepreneur") : professional.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOffer: false
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveChatMessages(conversationId, updated);
    setInputText("");

    // If client sent message, simulate professional realistic reply after 1s
    if (activeRole === "client") {
      setTimeout(() => {
        let replyText = "";
        const lower = text.toLowerCase();
        if (lower.includes("salary") || lower.includes("fee") || lower.includes("offer") || lower.includes("budget") || lower.includes("₹")) {
          replyText = `Thank you for sharing your budget consideration! For ${professional.role}, my standard range is ${professional.salaryRange}. I can adjust deliverables to match your requirements comfortably.`;
        } else if (lower.includes("full time") || lower.includes("full-time")) {
          replyText = `Yes, I am currently open for full-time MSME engagements within ${professional.fullTimeSalaryRange || professional.salaryRange}. We can set up weekly milestones and reporting.`;
        } else if (lower.includes("service") || lower.includes("project")) {
          replyText = `For service/project work, my typical fee is ${professional.serviceSalaryRange || "custom quoted per deliverable"}. What is your target deadline for this deliverable?`;
        } else {
          replyText = `Understood! I have 8+ years experience helping MSMEs in this exact domain. Let us align on the compensation and scope so we can begin.`;
        }

        const replyMsg = {
          id: `msg-reply-${Date.now()}`,
          sender: "professional",
          senderName: professional.name,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOffer: false
        };

        setMessages(prev => {
          const next = [...prev, replyMsg];
          saveChatMessages(conversationId, next);
          return next;
        });
      }, 900);
    }
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerAmount.trim()) return;

    const offerMsg = {
      id: `offer-${Date.now()}`,
      sender: "client",
      senderName: currentUser?.displayName || "Entrepreneur",
      text: `Official Salary Offer: ${offerAmount} (${offerType} arrangement)`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOffer: true,
      offerDetails: {
        amount: offerAmount,
        hireType: offerType,
        status: "Proposed"
      }
    };

    const updated = [...messages, offerMsg];
    setMessages(updated);
    saveChatMessages(conversationId, updated);
    setOfferAmount("");
    setShowOfferBar(false);

    // Auto simulated response from professional accepting/negotiating
    setTimeout(() => {
      const responseMsg = {
        id: `offer-resp-${Date.now()}`,
        sender: "professional",
        senderName: professional.name,
        text: `I have reviewed your offer of ${offerAmount} for ${offerType}. This is well-structured and aligns closely with my expected range. I accept these terms!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOffer: true,
        offerDetails: {
          amount: offerAmount,
          hireType: offerType,
          status: "Accepted by Professional"
        }
      };

      setMessages(prev => {
        const next = [...prev, responseMsg];
        saveChatMessages(conversationId, next);
        return next;
      });
    }, 1200);
  };

  const quickPrompts = [
    "What is your expected salary for a full-time role?",
    "Can you share your service project deliverables?",
    "Are you available for immediate full-time onboarding?",
    "Can we negotiate on milestone-based payouts?"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-2xl h-[90vh] max-h-[750px] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-white shadow-soft-xs shrink-0">
              {professional.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black truncate">{professional.name}</h3>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate">{professional.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Role switcher for demonstration */}
            <button
              type="button"
              onClick={() => setActiveRole(activeRole === "client" ? "professional" : "client")}
              title="Switch sender perspective"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              <span>Talking as:</span>
              <span className="text-emerald-400 uppercase font-black">{activeRole}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Salary Range & Offer Bar */}
        <div className="bg-emerald-50 border-b border-emerald-100 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <Coins className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-bold text-slate-700">Salary / Rate Range:</span>
            <span className="font-black text-emerald-900 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
              {professional.salaryRange}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowOfferBar(!showOfferBar)}
            className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-soft-xs"
          >
            <Coins className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showOfferBar ? "Hide Offer Tool" : "Propose Salary Offer"}</span>
          </button>
        </div>

        {/* Expandable Salary Offer Tool */}
        {showOfferBar && (
          <form onSubmit={handleSendOffer} className="p-4 bg-white border-b border-slate-200 space-y-3 animate-in slide-in-from-top duration-150">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Propose Formal Salary / Compensation to {professional.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="e.g. ₹45,000 / month or ₹15,000 / project"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600"
                />
              </div>

              <div>
                <select
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-white"
                >
                  <option value="Full-Time">Full-Time Hire</option>
                  <option value="Service / Project">Service / Project</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowOfferBar(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-soft-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Formal Offer</span>
              </button>
            </div>
          </form>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60">
          {messages.map((msg) => {
            const isMe = msg.sender === activeRole;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] font-bold text-slate-400 mb-0.5 px-1">
                  {msg.senderName} • {msg.timestamp}
                </span>

                {msg.isOffer ? (
                  /* Special Offer Card in chat */
                  <div className="max-w-md p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-soft-md space-y-2 border border-emerald-500/30">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        <Coins className="w-3 h-3" />
                        <span>Salary Proposal</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">
                        {msg.offerDetails?.hireType}
                      </span>
                    </div>

                    <div className="text-base font-black text-emerald-300">
                      {msg.offerDetails?.amount}
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {msg.text}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Status:</span>
                      <span className="font-bold text-emerald-400">
                        {msg.offerDetails?.status || "Under Discussion"}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Standard Chat Bubble */
                  <div
                    className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-soft-xs ${
                      isMe
                        ? "bg-slate-900 text-white rounded-br-xs"
                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 text-[11px] font-semibold text-slate-600 whitespace-nowrap transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Discuss salary range, hours, or scope with ${professional.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 bg-slate-50/50"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white transition-all cursor-pointer shrink-0 shadow-soft-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
