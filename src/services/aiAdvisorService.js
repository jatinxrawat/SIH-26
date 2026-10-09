/**
 * AI Business Advisor Client Service
 * Connects the Advisor UI with the backend /api/ai proxy (Groq + Gemini).
 * Includes strict grounding with the currently active business profile and multilingual support.
 */

export async function sendAdvisorMessage({ message, history = [], profile = {} }) {
  const currentLang = typeof localStorage !== 'undefined' ? (localStorage.getItem('udyam_language') || 'en') : 'en';

  const context = {
    businessName: profile.name || profile.business?.name || 'Your Business',
    stage: profile.stage || profile.business?.stage || 'IDEA',
    sector: profile.sector || profile.business?.sector || 'General',
    location: profile.location || (profile.personalInfo?.district ? `${profile.personalInfo.district}, ${profile.personalInfo.state}` : 'India'),
    areaClassification: profile.areaClassification || profile.personalInfo?.ruralUrban || 'Urban',
    type: profile.type || profile.business?.type || 'Proprietorship',
    estimatedProjectCost: profile.financialProfile?.estimatedProjectCost || 'N/A',
    availableCapital: profile.financialProfile?.availableCapital || 'N/A',
    fundingRequired: profile.financialProfile?.fundingRequired || 'N/A',
    registrationStatus: profile.registrationStatus || profile.business?.registrationStatus || 'Unregistered',
    licensesHeld: profile.licensesHeld || profile.business?.licensesHeld || 'None',
    twelveMonthGoal: profile.goals?.twelveMonthGoal || 'Launch operations',
    primaryChallenge: profile.goals?.primaryChallenge || 'Navigating government schemes & paperwork',
    preferredLanguage: currentLang
  };

  const formattedMessages = history.map((h) => ({
    role: h.sender === 'ai' ? 'assistant' : 'user',
    content: h.text
  }));

  formattedMessages.push({
    role: 'user',
    content: message
  });

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Preferred-Language': currentLang
      },
      body: JSON.stringify({
        type: 'chat',
        question: message,
        messages: formattedMessages,
        preferredLanguage: currentLang,
        context
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply) {
        return {
          reply: data.reply,
          provider: data.provider || 'AI Business Advisor',
          isLive: Boolean(data.isLive)
        };
      }
    }
  } catch (err) {
    console.warn('[AI Advisor] Network error calling /api/ai, generating smart fallback:', err);
  }

  // Localized client fallback
  let localizedReply = '';
  if (currentLang === 'hi') {
    localizedReply = `### ${context.businessName} (${context.sector} • ${context.stage}) हेतु सलाह\n\n` +
      `आपके प्रश्न **"${message}"** के संबंध में:\n\n` +
      `1. **वैधानिक कदम**: यदि अभी तक नहीं किया है, तो कानूनी मान्यता और प्राथमिकता बैंक ऋण के लिए **उद्यम एमएसएमई** ([udyamregistration.gov.in](https://udyamregistration.gov.in) पर 100% निःशुल्क) में पंजीकरण करें।\n` +
      `2. **क्रेडिट व सब्सिडी अवसर**: आपकी वित्तीय आवश्यकता (${context.fundingRequired}) के लिए **PMEGP** योजना 25% से 35% पूंजीगत सब्सिडी प्रदान करती है, जबकि **मुद्रा (किशोर)** ₹5 लाख तक का बिना गारंटी ऋण देती है।\n` +
      `3. **तत्काल कार्रवाई**: अपनी 3-वर्षीय अनुमानित कैश फ्लो DPR तैयार करें और ${context.location} में अपने जिला उद्योग केंद्र (DIC) से संपर्क करें।\n\n` +
      `*किसी विशिष्ट योजना की पात्रता या दस्तावेज़ सूची के लिए कभी भी पूछें!*`;
  } else if (currentLang === 'mr') {
    localizedReply = `### ${context.businessName} (${context.sector} • ${context.stage}) साठी सल्ला\n\n` +
      `तुमच्या **"${message}"** या प्रश्नाबाबत:\n\n` +
      `1. **वैधानिक पावले**: अद्याप केले नसल्यास, कायदेशीर ओळख आणि प्राधान्य बँक कर्जासाठी **उद्यम एमएसएमई** ([udyamregistration.gov.in](https://udyamregistration.gov.in) वर १००% विनामूल्य) नोंदणी करा.\n` +
      `2. **अनुदान व कर्ज संधी**: तुमच्या भांडवलाच्या गरजेसाठी (${context.fundingRequired}) **PMEGP** योजना २५% ते ३५% भांडवली अनुदान देते, तर **मुद्रा (किशोर)** ₹५ लाखांपर्यंत विनातारण कर्ज देते.\n` +
      `3. **तातडीची कृती**: तुमचा ३ वर्षांचा अंदाजित DPR तयार करा आणि ${context.location} येथील जिल्हा उद्योग केंद्राशी (DIC) संपर्क साधा.\n\n` +
      `*विशिष्ट योजनेच्या निकषांबद्दल अधिक माहिती विचारू शकता!*`;
  } else if (currentLang === 'bn') {
    localizedReply = `### ${context.businessName} (${context.sector} • ${context.stage})-এর জন্য পরামর্শ\n\n` +
      `আপনার **"${message}"** সংক্রান্ত অনুসন্ধানের প্রেক্ষিতে:\n\n` +
      `১. **বিধিবদ্ধ পদক্ষেপ**: এখনও না করে থাকলে, আইনি স্বীকৃতি ও অগ্রাধিকার ব্যাংক ঋণের জন্য **উদ্যম এমএসএমই** ([udyamregistration.gov.in](https://udyamregistration.gov.in)-এ ১০০% বিনামূল্যে) নিবন্ধন করুন।\n` +
      `২. **ঋণ ও ভর্তুকি সুবিধা**: আপনার তহবিলের প্রয়োজনে (${context.fundingRequired}) **PMEGP** প্রকল্প ২৫% থেকে ৩৫% মূলধনী ভর্তুকি দেয় এবং **মুদ্রা (কিশোর)** ₹৫ লাখ পর্যন্ত জামানতমুক্ত ঋণ প্রদান করে।\n` +
      `৩. **অবিলম্বে করণীয়**: ৩ বছরের প্রজেক্টেড ডিপিআর প্রস্তুত করুন এবং ${context.location}-এ স্থানীয় জেলা শিল্প কেন্দ্রের (DIC) সাথে যোগাযোগ করুন।\n\n` +
      `*যেকোনো নির্দিষ্ট প্রকল্পের বিস্তারিত জানতে নিঃসংকোচে জিজ্ঞাসা করুন!*`;
  } else {
    localizedReply = `### Advice for ${context.businessName} (${context.sector} • ${context.stage})\n\n` +
      `Regarding your inquiry on **"${message}"**:\n\n` +
      `1. **Statutory Steps**: If you haven't yet, register for **Udyam MSME** (100% free at [udyamregistration.gov.in](https://udyamregistration.gov.in)) to gain legal enterprise recognition and priority bank lending status.\n` +
      `2. **Credit & Subsidy Opportunity**: For your funding gap (${context.fundingRequired}), the **PMEGP** scheme provides a 25% to 35% capital subsidy, while **Mudra (Kishore)** offers up to ₹5 Lakhs collateral-free credit.\n` +
      `3. **Immediate Action**: Prepare your 3-year projected cash flow DPR and consult your local District Industries Centre (DIC) in ${context.location}.\n\n` +
      `*Feel free to ask for specific scheme eligibility criteria or document checklists!*`;
  }

  return {
    reply: localizedReply,
    provider: 'UdyamSaathi Deterministic MSME Intelligence',
    isLive: false
  };
}
