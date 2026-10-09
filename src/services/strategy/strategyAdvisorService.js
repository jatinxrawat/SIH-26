/**
 * Grounded AI Strategic Summary & Advisor Service
 * Synthesizes structured strategy outputs into clear, multilingual plain language.
 */

export async function generateGroundedAiSummary(strategy) {
  const preferredLanguage = typeof localStorage !== 'undefined' ? (localStorage.getItem('udyam_language') || 'en') : 'en';

  const businessName = strategy.businessProfileSnapshot.name;
  const sector = strategy.businessProfileSnapshot.sector;
  const location = strategy.businessProfileSnapshot.location;
  const domainTitle = strategy.businessProfileSnapshot.domainTitle || sector;
  const targetAudience = strategy.businessProfileSnapshot.targetCustomerText || 'local customers';
  const investment = strategy.fundingSummary.estimatedProjectCost;
  const advantage = strategy.competitors.positioning.coreAdvantage;
  const priceRange = strategy.pricingAnalysis.recommendedPriceRange.displayRange;
  const breakEven = strategy.feasibility.breakEvenAnalysis.displayBreakEvenUnits;
  const primaryOpp = strategy.opportunities.opportunities[0]?.title || 'Direct customer fulfillment';
  const topRisk = strategy.risks.risks[0]?.title || 'Working capital constraints';
  const outlook = strategy.executiveSummary.overallOutlook;

  // Try calling serverless /api/ai if live connection is possible
  try {
    const promptContext = {
      businessName,
      domainTitle,
      sector,
      location,
      targetAudience,
      investment,
      advantage,
      priceRange,
      breakEven,
      primaryOpp,
      topRisk,
      outlook,
      preferredLanguage
    };

    const task = {
      title: `Generate Hyper-Local Feasibility Summary for ${domainTitle}`,
      whyThisMatters: 'Convert structured feasibility indicators into empathetic, practical advice for an entrepreneur.'
    };

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
        context: promptContext,
        question: `Based strictly on these structured findings, provide a direct 3-sentence executive strategic summary for ${businessName} (${domainTitle}) in ${location}. Focus on ${targetAudience}. Do not invent numbers.`
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.structured?.answer) {
        return {
          summaryText: data.structured.answer,
          isLiveAi: true,
          provider: data.structured.provider || 'AI Intelligence Engine'
        };
      }
    }
  } catch (err) {
    // Graceful fallback to deterministic synthesis below
  }

  // Deterministic Grounded Synthesis with multilingual support
  let summaryText = '';
  if (preferredLanguage === 'hi') {
    summaryText = `${location} में ${businessName} के लिए, ${domainTitle} क्षेत्र में आपका सबसे मजबूत प्रतिस्पर्धी लाभ ${advantage} है। महंगे कॉर्पोरेट ब्रांडों के बजाय स्थानीय मूल्य पर ध्यान केंद्रित करते हुए ${targetAudience} को लक्षित करें। ${investment} के अनुमानित निवेश पर आपकी यूनिट इकोनॉमिक्स ${priceRange} के मूल्य दायरे में व्यवहार्य मार्जिन का समर्थन करती हैं। स्थानीय व्यावसायिक दृष्टिकोण "${outlook}" के रूप में वर्गीकृत है।`;
  } else if (preferredLanguage === 'mr') {
    summaryText = `${location} मधील ${businessName} साठी, ${domainTitle} क्षेत्रात तुमची सर्वात मोठी ताकद ${advantage} ही आहे. ${targetAudience} ला थेट सेवा द्या. अंदाजे ${investment} गुंतवणुकीवर तुमचे आर्थिक नियोजन व्यवहार्य आहे. एकूण स्थानिक दृष्टिकोन "${outlook}" आहे.`;
  } else if (preferredLanguage === 'bn') {
    summaryText = `${location}-এ ${businessName}-এর জন্য, ${domainTitle} খাতে আপনার প্রধান প্রতিযোগিতামূলক সুবিধা হল ${advantage}। স্থানীয় মূল্যের উপর ভিত্তি করে ${targetAudience}-কে পরিষেবা প্রদান করুন। ${investment} আনুমানিক ব্যয়ে আপনার ইউনিট অর্থনীতি কার্যকর মার্জিন সমর্থন করে। সামগ্রিক মূল্যায়ন "${outlook}"।`;
  } else {
    summaryText = `For ${businessName} in ${location}, your strongest competitive opportunity in ${domainTitle} is ${advantage.toLowerCase()}, targeting ${targetAudience} with localized value rather than competing head-to-head with expensive corporate brands. At an estimated outlay of ${investment}, your unit economics support a viable operating margin within the indicative price band of ${priceRange}. However, you must actively protect your cash flow against ${topRisk.toLowerCase()} and maintain prudent credit discipline. Overall local outlook is classified as ${outlook}.`;
  }

  return {
    summaryText,
    isLiveAi: false,
    provider: 'Grounded Analytical Engine'
  };
}
