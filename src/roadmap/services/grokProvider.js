/**
 * Grok AI Provider
 * Communicates with the secure backend endpoint /api/ai for Grok-powered tactical execution.
 * Includes resilient client-side fallback with structured multilingual entrepreneur guidance.
 */

export class GrokProvider {
  constructor() {
    this.name = 'Saathi Tactical Engine';
    this.id = 'grok';
    this.badge = 'Fast Action Execution';
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
          provider: 'grok',
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
      console.warn('Grok live endpoint unavailable, activating offline intelligence engine:', err);
    }

    // High-fidelity structured fallback tailored to business context and active language
    return this.getFallbackAdvice(task, context, question, preferredLanguage);
  }

  getFallbackAdvice(task, context, question, lang = 'en') {
    const businessName = context?.businessName || 'your enterprise';
    const location = context?.location || 'your district';
    const taskTitle = task?.title || 'this task';

    if (lang === 'hi') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName} के लिए कार्य योजना: "${taskTitle}" को ${task?.estimatedTime || '1-2 दिनों'} के भीतर व्यवस्थित रूप से निष्पादित करें।`,
        why: task?.whyThisMatters || 'इस कार्य को पूरा करने से राजस्व और बैंक ऋण की दिशा में आने वाली तत्काल बाधा दूर होती है।',
        whatToDo: [
          `"${taskTitle}" के लिए शीर्ष 3 प्राथमिकताओं की पहचान करें।`,
          `${location} में स्थानीय सत्यापन पूरा करें।`,
          'अगले मील के पत्थर को अनलॉक करने के लिए उद्यमसाथी में डेटा दर्ज करें।'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `अनिवार्य रिकॉर्ड: ${task.requiredDocuments.join(', ')}.`
          : 'इस विशिष्ट कार्य के लिए कोई कागजी बाधा नहीं है।',
        nextStep: task?.unlocks?.length > 0
          ? `तत्काल अनुवर्ती अनलॉक: ${task.unlocks.join(', ')}.`
          : 'पूर्ण व्यावसायिक निष्पादन के लिए तैयार।',
        warnings: 'बैंक केवाईसी से मिलान करने के लिए सभी पहचान रिकॉर्ड पर सटीक वर्तनी की दोबारा जांच करें।',
        isFallback: true
      };
    }

    if (lang === 'mr') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName} साठी कृती आराखडा: "${taskTitle}" ${task?.estimatedTime || '१-२ दिवसात'} पूर्ण करा.`,
        why: task?.whyThisMatters || 'हे कार्य पूर्ण केल्याने व्यवसायातील अडथळा दूर होतो.',
        whatToDo: [
          `"${taskTitle}" साठी ३ प्रमुख उद्दिष्टे ठरवा.`,
          `${location} मध्ये स्थानिक पातळीवर पडताळणी करा.`,
          'पुढील टप्पा सुरू करण्यासाठी उद्यमसाथीमध्ये माहिती नोंदवा.'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `कागदपत्रे: ${task.requiredDocuments.join(', ')}.`
          : 'कोणतेही विशेष कागदपत्र बाकी नाही.',
        nextStep: task?.unlocks?.length > 0
          ? `पुढील टप्पा: ${task.unlocks.join(', ')}.`
          : 'व्यावसायिक अंमलबजावणीसाठी सज्ज.',
        warnings: 'बँक केवायसीशी जुळण्यासाठी कागदपत्रांवरील नावाची अचूक तपासणी करा.',
        isFallback: true
      };
    }

    if (lang === 'bn') {
      return {
        provider: this.name,
        providerId: this.id,
        answer: `${businessName}-এর জন্য কর্মপরিকল্পনা: "${taskTitle}" ${task?.estimatedTime || '১-২ দিনের'} মধ্যে নিয়মতান্ত্রিকভাবে সম্পন্ন করুন।`,
        why: task?.whyThisMatters || 'এই কাজটি সম্পন্ন করলে অগ্রগতির তাৎক্ষণিক বাধা দূর হয়।',
        whatToDo: [
          `"${taskTitle}"-এর জন্য শীর্ষ ৩টি অগ্রাধিকার চিহ্নিত করুন।`,
          `${location}-এ স্থানীয় যাচাইকরণ সম্পন্ন করুন।`,
          'পরবর্তী ধাপ আনলক করতে উদ্যমসাথীতে তথ্য রেকর্ড করুন।'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `বাধ্যতামূলক নথি: ${task.requiredDocuments.join(', ')}.`
          : 'এই কাজের জন্য কোনো অতিরিক্ত নথিপত্র প্রয়োজন নেই।',
        nextStep: task?.unlocks?.length > 0
          ? `পরবর্তী আনলক: ${task.unlocks.join(', ')}.`
          : 'বাণিজ্যিক কার্যক্রমের জন্য সম্পূর্ণ প্রস্তুত।',
        warnings: 'ব্যাংক কেওয়াইসি-র সাথে মিল রাখার জন্য সমস্ত পরিচয় নথির সঠিক বানান পুনরায় যাচাই করুন।',
        isFallback: true
      };
    }

    return {
      provider: this.name,
      providerId: this.id,
      answer: `Action blueprint for ${businessName}: Execute "${taskTitle}" systematically within ${task?.estimatedTime || '1-2 days'}.`,
      why: task?.whyThisMatters || 'Executing this task removes an immediate roadblock on your critical path to revenue.',
      whatToDo: task?.whatToDo || [
        `Identify the top 3 deliverables for ${taskTitle}.`,
        `Execute local field verification in ${location}.`,
        'Log data into UdyamSaathi to trigger immediate Next Best Action unlock.'
      ],
      documents: task?.requiredDocuments?.length > 0
        ? `Mandatory records: ${task.requiredDocuments.join(', ')}.`
        : 'Zero paperwork blockers for this specific action item.',
      nextStep: task?.unlocks?.length > 0
        ? `Immediate follow-up unlock: ${task.unlocks.join(', ')}.`
        : 'Ready for full commercial execution.',
      warnings: 'Double-check exact spelling on all identity records to match bank KYC before formal submission.',
      isFallback: true
    };
  }
}
