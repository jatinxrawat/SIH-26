/**
 * Gemini AI Provider
 * Communicates with the secure backend endpoint /api/ai for Gemini-powered explanations.
 * Includes resilient client-side fallback with structured entrepreneur guidance if offline.
 */

export class GeminiProvider {
  constructor() {
    this.name = 'Saathi Strategic Advisor';
    this.id = 'gemini';
    this.badge = 'Deep MSME Intelligence';
  }

  async generateAdvice({ task, context, question }) {
    const preferredLanguage = typeof localStorage !== 'undefined' ? (localStorage.getItem('udyam_language') || 'en') : 'en';

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Preferred-Language': preferredLanguage
        },
        body: JSON.stringify({
          provider: 'gemini',
          preferredLanguage,
          task,
          context: {
            ...context,
            preferredLanguage
          },
          question
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.structured) {
          return {
            provider: this.name,
            providerId: this.id,
            ...data.structured
          };
        }
      }
    } catch (err) {
      console.warn('Gemini live endpoint unavailable, activating offline intelligence engine:', err);
    }

    // High-fidelity structured fallback tailored to business context and active language
    return this.getFallbackAdvice(task, context, question, preferredLanguage);
  }

  getFallbackAdvice(task, context, question, lang = 'en') {
    const businessName = context?.businessName || 'your enterprise';
    const sector = context?.sector || 'food processing';
    const taskTitle = task?.title || 'this task';

    if (lang === 'hi') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName} के लिए "${taskTitle}" को पूरा करने हेतु आवश्यक अनुपालन और प्रमाणिक योजना पर ध्यान केंद्रित करें।`,
        why: task?.whyThisMatters || `यह कदम आपके ${sector} व्यवसाय को बैंक और सरकारी मानकों के अनुरूप बनाने के लिए अनिवार्य है।`,
        whatToDo: [
          `"${taskTitle}" की प्रत्यक्ष आवश्यकताओं को स्पष्ट करें।`,
          'प्रासंगिक दस्तावेज़ और सत्यापन इनपुट एकत्र करें।',
          'सब्सिडी पात्रता को अधिकतम करने के लिए दिशानिर्देशों की समीक्षा करें।'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `तैयार रखें: ${task.requiredDocuments.join(', ')}`
          : 'इस चरण के लिए किसी विशेष वैधानिक दस्तावेज़ की आवश्यकता नहीं है।',
        nextStep: task?.unlocks?.length > 0
          ? `पूरा होने पर तुरंत अनलॉक होगा: ${task.unlocks.join(', ')}`
          : 'यह आपके रोडमॅप के इस चरण को पूरा करता है।',
        warnings: 'अनाधिकृत एजेंटों या बिचौलियों को पैसे देने से बचें। सभी सरकारी पोर्टल (उद्यम, FoSCoS) 100% निःशुल्क हैं।',
        isFallback: true
      };
    }

    if (lang === 'mr') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName} साठी "${taskTitle}" पूर्ण करण्यासाठी आवश्यक अनुपालन आणि नियोजनावर लक्ष केंद्रित करा.`,
        why: task?.whyThisMatters || `हे पाऊल तुमच्या ${sector} व्यवसायाला बँक आणि शासकीय मानकांनुसार तयार करते.`,
        whatToDo: [
          `"${taskTitle}" च्या आवश्यकता समजून घ्या.`,
          'आवश्यक कागदपत्रे आणि पडताळणी गोळा करा.',
          'अनुदान पात्रतेसाठी मार्गदर्शक तत्त्वांचे पुनरावलोकन करा.'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `तयार ठेवा: ${task.requiredDocuments.join(', ')}`
          : 'कोणत्याही विशेष कागदपत्रांची आवश्यकता नाही.',
        nextStep: task?.unlocks?.length > 0
          ? `पूर्ण झाल्यावर अनलॉक होईल: ${task.unlocks.join(', ')}`
          : 'यामुळे रोडमॅपचा हा टप्पा पूर्ण होतो.',
        warnings: 'दलालांना पैसे देणे टाळा. सर्व सरकारी नोंदणी पोर्टल विनामूल्य आहेत.',
        isFallback: true
      };
    }

    if (lang === 'bn') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName}-এর জন্য "${taskTitle}" সম্পন্ন করতে আইনি সম্মতি এবং সঠিক পরিকল্পনার উপর দৃষ্টি দিন।`,
        why: task?.whyThisMatters || `এই পদক্ষেপটি আপনার ${sector} উদ্যোগকে ব্যাংক এবং সরকারি মূল্যায়নের জন্য প্রস্তুত করে।`,
        whatToDo: [
          `"${taskTitle}"-এর সরাসরি প্রয়োজনীয়তাগুলি স্পষ্টভাবে চিহ্নিত করুন।`,
          'প্রাসঙ্গিক নথিপত্র ও যাচাইকরণ সংগ্রহ করুন।',
          'ভর্তুকির সুবিধা সর্বাধিক করতে নির্দেশিকা পর্যালোচনা করুন।'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `প্রস্তুত রাখুন: ${task.requiredDocuments.join(', ')}`
          : 'কোনো বিশেষ নথিপত্রের প্রয়োজন নেই।',
        nextStep: task?.unlocks?.length > 0
          ? `সম্পন্ন হলে আনলক হবে: ${task.unlocks.join(', ')}`
          : 'এটি আপনার রোডম্যাপের এই ধাপ সম্পন্ন করে।',
        warnings: 'মধ্যস্বত্বভোগীদের অর্থ প্রদান এড়িয়ে চলুন। সমস্ত সরকারি পোর্টাল বিনামূল্যে সেবা দেয়।',
        isFallback: true
      };
    }

    return {
      provider: this.name,
      providerId: this.id,
      answer: `To complete "${taskTitle}" for ${businessName}, focus on establishing verifiable proof of demand and compliance without large upfront capital expenditure.`,
      why: task?.whyThisMatters || `Completing this step ensures that your ${sector} business maintains compliance with bank and government appraisal norms.`,
      whatToDo: task?.whatToDo || [
        `Clarify the direct requirements for ${taskTitle}.`,
        'Gather the relevant documentation and verification inputs.',
        'Review against government scheme guidelines to maximize subsidy eligibility.'
      ],
      documents: task?.requiredDocuments?.length > 0
        ? `Make sure you have ${task.requiredDocuments.join(', ')} prepared.`
        : 'No special statutory documents required for this step.',
      nextStep: task?.unlocks?.length > 0
        ? `Upon completion, you will immediately unlock: ${task.unlocks.join(', ')}.`
        : 'This completes this phase of your roadmap.',
      warnings: 'Avoid paying unofficial agents or brokers. All government registration portals (Udyam, FoSCoS) are 100% free or nominal.',
      isFallback: true
    };
  }
}
