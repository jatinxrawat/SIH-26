import React, { useState } from 'react';
import { Bot, Send, Loader2, ShieldCheck } from 'lucide-react';
import { answerSchemeQuestion } from '../../services/schemeAdvisorService';
import { useLanguage } from '../../context/LanguageContext';
import { localizeBusinessValue } from '../../i18n/platformTranslations';

export default function SchemeAdvisorChat({
  profile,
  scheme = null,
  matchedSchemes = [],
  title = null
}) {
  const { language, t } = useLanguage();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const localizedSchemeName = scheme ? localizeBusinessValue(scheme.name, language) : '';

  const defaultTitle = title || (
    scheme
      ? (language === 'hi' ? `${localizedSchemeName} हेतु एआई सलाहकार` : language === 'bn' ? `${localizedSchemeName}-এর জন্য এআই উপদেষ্টা` : `AI Advisor for ${scheme.name}`)
      : t('schemes.advisorDefaultTitle', 'AI Scheme Intelligence Assistant')
  );

  const defaultPrompts = scheme ? [
    language === 'hi' ? 'मैं इस योजना के लिए क्यों पात्र हूं?' : language === 'bn' ? 'আমি কেন এই প্রকল্পের জন্য যোগ্য?' : 'Why am I eligible for this scheme?',
    language === 'hi' ? 'इस आवेदन के लिए मेरे पास कौन से दस्तावेज नहीं हैं?' : language === 'bn' ? 'এই আবেদনের জন্য আমার কোন নথিগুলো বাকি আছে?' : 'What documents am I missing for this application?',
    language === 'hi' ? 'मुझे कितना मार्जिन मनी लगाना होगा?' : language === 'bn' ? 'আমাকে কত মার্জিন অর্থ দিতে হবে?' : 'How much margin money will I need to contribute?',
    language === 'hi' ? 'आवेदन की चरणबद्ध प्रक्रिया क्या है?' : language === 'bn' ? 'আবেদনের ধাপে ধাপে প্রক্রিয়া কী?' : 'What is the step-by-step application process?'
  ] : [
    language === 'hi' ? 'मेरे व्यवसाय के लिए कौन सी योजना सर्वाधिक सब्सिडी देती है?' : language === 'bn' ? 'আমার ব্যবসার জন্য কোন প্রকল্পটি সর্বোচ্চ ভর্তুকি দেয়?' : 'Which of these schemes offers the highest capital subsidy for my business?',
    language === 'hi' ? 'क्या मैं PMEGP और MUDRA दोनों के लिए एक साथ आवेदन कर सकता हूं?' : language === 'bn' ? 'আমি কি একসাথে PMEGP এবং MUDRA উভয়ের জন্য আবেদন করতে পারি?' : 'Can I apply for both PMEGP and MUDRA simultaneously?',
    language === 'hi' ? 'आवेदन करने से पहले मुझे कौन से दस्तावेज तैयार करने चाहिए?' : language === 'bn' ? 'আবেদন করার আগে আমার কোন নথিগুলো প্রস্তুত রাখা উচিত?' : 'What documents should I arrange first before applying?',
    language === 'hi' ? 'मेरे व्यावसायिक चरण के लिए कौन सी योजना सर्वोत्तम है?' : language === 'bn' ? 'আমার উদ্যোগের পর্যায়ের জন্য কোন প্রকল্পটি সবচেয়ে উপযুক্ত?' : 'Which scheme matches my business stage best?'
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
          content: language === 'hi'
            ? 'सलाहकार सेवा से जुड़ने में असमर्थ। कृपया इंटरनेट कनेक्शन जांचें या पुनः प्रयास करें।'
            : language === 'bn'
            ? 'উপদেষ্টা সেবার সাথে সংযোগ স্থাপন করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করুন।'
            : 'Unable to connect to AI advisor service. Please verify your internet connection or try again shortly.'
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
                {defaultTitle}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {language === 'hi' ? 'सत्यापित ज्ञान' : language === 'bn' ? 'যাচাইকৃত জ্ঞান' : 'Grounded Knowledge'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {language === 'hi'
                ? 'पात्रता, आवश्यक दस्तावेज, सब्सिडी और आवेदन प्रक्रिया पर प्रश्न पूछें।'
                : language === 'bn'
                ? 'যোগ্যতা, প্রয়োজনীয় নথি, ভর্তুকি এবং আবেদনের ধাপ সম্পর্কে প্রশ্ন করুন।'
                : 'Ask questions about eligibility, missing documents, subsidies, and application steps.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? '100% तथ्य आधारित' : language === 'bn' ? '১০০% তথ্যনির্ভর' : 'Zero Hallucination'}</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          {language === 'hi' ? 'सुझाए गए प्रश्न' : language === 'bn' ? 'প্রস্তাবিত প্রশ্নাবলী' : 'Suggested Inquiries'}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {defaultPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(p)}
              disabled={loading}
              className="text-left text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-slate-700 transition-all cursor-pointer"
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
              <span>
                {language === 'hi'
                  ? 'आपके व्यावसायिक प्रोफाइल के आधार पर योजना दिशानिर्देशों का विश्लेषण हो रहा है...'
                  : language === 'bn'
                  ? 'আপনার ব্যবসায়িক প্রোফাইলের বিপরীতে প্রকল্পের নির্দেশিকা বিশ্লেষণ করা হচ্ছে...'
                  : 'Analyzing scheme guidelines against your enterprise profile...'}
              </span>
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
          placeholder={
            scheme
              ? (language === 'hi' ? `${localizedSchemeName} के बारे में कुछ भी पूछें...` : language === 'bn' ? `${localizedSchemeName} সম্পর্কে যেকোনো প্রশ্ন করুন...` : `Ask anything about ${scheme.name}...`)
              : (language === 'hi' ? 'सरकारी योजनाओं एवं सब्सिडी के बारे में कोई भी प्रश्न पूछें...' : language === 'bn' ? 'সরকারি প্রকল্প এবং ভর্তুকি সম্পর্কে যেকোনো প্রশ্ন করুন...' : 'Ask any question about government schemes & subsidies...')
          }
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
