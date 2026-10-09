/**
 * Grounded AI Scheme Advisor Service
 * 
 * Powered by Groq with Gemini API fallback and localized synthesis.
 * Strictly grounded in the deterministic scheme database and entrepreneur profile.
 * Multilingual aware: Responds in the entrepreneur's selected Indian language.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const LANG_NAMES = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  bn: 'Bengali',
  gu: 'Gujarati',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
  or: 'Odia',
  as: 'Assamese',
  ur: 'Urdu',
  sa: 'Sanskrit',
  mai: 'Maithili',
  ne: 'Nepali',
  kok: 'Konkani',
  sd: 'Sindhi',
  ks: 'Kashmiri',
  doi: 'Dogri',
  mni: 'Manipuri',
  brx: 'Bodo',
  sat: 'Santali'
};

function getActiveLanguage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('udyam_language') || 'en';
  }
  return 'en';
}

function getLangDirective(lang) {
  if (!lang || lang === 'en') return '';
  const langName = LANG_NAMES[lang] || lang;
  return `\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST generate your response entirely in ${langName} using natural native phrasing. Keep official acronyms (PMEGP, Mudra, Udyam, CGTMSE) recognizable. Do NOT return English text.`;
}

// Minimal sanitized profile context for AI prompts
export function sanitizeProfileForAi(profile) {
  if (!profile) return {};
  const business = profile.business || {};
  const personal = profile.personalInfo || {};
  const eligibility = profile.eligibilityProfile || {};
  const financial = profile.financialProfile || {};

  return {
    entrepreneurName: personal.fullName || 'Entrepreneur',
    state: personal.state || 'India',
    localityType: personal.ruralUrban || 'Urban',
    category: eligibility.category || 'General',
    gender: personal.gender || 'Not specified',
    businessName: business.name || 'Venture',
    businessDescription: business.description || '',
    productService: business.productService || '',
    targetCustomers: business.targetCustomers || '',
    businessType: business.type || '',
    sector: business.sector || 'General',
    businessStage: business.stage || 'PLANNING',
    availableCapital: financial.availableCapital || 'Not declared',
    projectCost: financial.estimatedProjectCost || 'Not declared',
    fundingRequired: financial.fundingRequired || 'Not declared',
    existingLoans: financial.hasExistingLoans || 'No'
  };
}

async function callGroqChat(messages, maxTokens = 600) {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not configured');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.2,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function callGeminiChat(promptText) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: promptText }]
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 600
      }
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
}

async function executeGroundedAi(messages, systemPrompt, fallbackGenerator) {
  try {
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
    return await callGroqChat(fullMessages);
  } catch (groqErr) {
    try {
      const combinedPrompt = `${systemPrompt}\n\n` + messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
      return await callGeminiChat(combinedPrompt);
    } catch (geminiErr) {
      return fallbackGenerator();
    }
  }
}

export async function explainTopRecommendations(profile, topScheme, customLang = null) {
  if (!topScheme) return null;

  const lang = customLang || getActiveLanguage();
  const sanitized = sanitizeProfileForAi(profile);
  const matchedPillars = topScheme.eligibility?.matchedPillars || [];
  const benefits = topScheme.financialBenefits || {};

  const systemPrompt = `You are the Business Compass Scheme Advisor, an expert government program evaluator for Indian entrepreneurs.
You provide clear, encouraging, strictly factual explanations grounded ONLY in the supplied entrepreneur profile and scheme data.
Format your response concisely with 3-4 bullet points and a brief takeaway.${getLangDirective(lang)}`;

  const userPrompt = `Entrepreneur Profile:
- Name: ${sanitized.entrepreneurName}
- Location: ${sanitized.state} (${sanitized.localityType})
- Category/Gender: ${sanitized.category} / ${sanitized.gender}
- Business: ${sanitized.businessName}
- What Company Does: ${sanitized.businessDescription || sanitized.productService || sanitized.sector}
- Target Customers: ${sanitized.targetCustomers || 'Local buyers'}
- Registered Sector: ${sanitized.sector}
- Business Stage: ${sanitized.businessStage}
- Capital Need: Project Cost ${sanitized.projectCost}, Funding Needed ${sanitized.fundingRequired}

Top Recommended Scheme:
- Name: ${topScheme.name} (${topScheme.ministry})
- Match Score: ${topScheme.matchScore} Match Score
- Scheme Category: ${topScheme.schemeCategoryLabel}
- Potential Support: ${benefits.subsidyDetails || benefits.loanDetails}
- Max Funding: ₹${(benefits.maximumFunding || 0).toLocaleString('en-IN')}
- Matched Parameters: ${matchedPillars.join(', ')}

Explain why ${topScheme.name} is currently the strongest match for this entrepreneur. Keep it under 150 words.`;

  const fallback = () => {
    if (lang === 'hi') {
      return `**${topScheme.name}** आपके लिए सबसे उपयुक्त योजना है (${topScheme.matchScore} मैच स्कोर) क्योंकि:\n` +
        `• यह सीधे आपके उद्यम (${sanitized.businessName} - ${sanitized.businessDescription || sanitized.sector}) से मेल खाती है।\n` +
        `• लक्षित वित्तीय सहायता प्रदान करती है: ${benefits.subsidyDetails || benefits.loanDetails}।\n` +
        `• आपके वर्तमान व्यावसायिक चरण (${sanitized.businessStage}) और पूंजीगत आवश्यकता (${sanitized.fundingRequired}) के अनुकूल है।\n` +
        `• न्यूनतम प्रमोटर मार्जिन के साथ संस्थागत ऋण व सब्सिडी सहायता उपलब्ध कराती है।`;
    }
    if (lang === 'mr') {
      return `**${topScheme.name}** तुमच्यासाठी सर्वात योग्य योजना आहे (${topScheme.matchScore} मॅच स्कोअर) कारण:\n` +
        `• ही योजना थेट तुमच्या उद्योगाशी (${sanitized.businessName} - ${sanitized.businessDescription || sanitized.sector}) सुसंगत आहे.\n` +
        `• थेट आर्थिक लाभ प्रदान करते: ${benefits.subsidyDetails || benefits.loanDetails}.\n` +
        `• तुमच्या व्यावसायिक टप्प्याशी (${sanitized.businessStage}) आणि आवश्यक भांडवलाशी जुळते.`;
    }
    if (lang === 'bn') {
      return `**${topScheme.name}** আপনার জন্য সবচেয়ে উপযুক্ত প্রকল্প (${topScheme.matchScore} ম্যাচ স্কোর) কারণ:\n` +
        `• এটি সরাসরি আপনার উদ্যোগের (${sanitized.businessName} - ${sanitized.businessDescription || sanitized.sector}) সাথে সামঞ্জস্যপূর্ণ।\n` +
        `• লক্ষ্যভিত্তিক সুবিধা প্রদান করে: ${benefits.subsidyDetails || benefits.loanDetails}।\n` +
        `• আপনার বর্তমান ব্যবসায়িক পর্যায় এবং তহবিলের প্রয়োজনের সাথে সম্পূর্ণ উপযুক্ত।`;
    }
    return `${topScheme.name} is currently your strongest match (${topScheme.matchScore} Match Score) because:\n` +
      `• It aligns directly with your enterprise (${sanitized.businessName} - ${sanitized.businessDescription || sanitized.sector}) in ${sanitized.state}.\n` +
      `• Provides targeted benefits: ${benefits.subsidyDetails || benefits.loanDetails}.\n` +
      `• Aligns with your current business stage (${sanitized.businessStage}) and project funding requirements (${sanitized.fundingRequired}).\n` +
      `• Requires minimal promoter contribution with collateral-free institutional support.`;
  };

  return await executeGroundedAi(
    [{ role: 'user', content: userPrompt }],
    systemPrompt,
    fallback
  );
}

export async function answerSchemeQuestion({ profile, scheme, matchedSchemes, question, chatHistory = [], customLang = null }) {
  const lang = customLang || getActiveLanguage();
  const sanitized = sanitizeProfileForAi(profile);

  const targetSchemeContext = scheme ? `
Active Selected Scheme:
- Name: ${scheme.name}
- Ministry: ${scheme.ministry} (${scheme.department})
- Eligibility Status: ${scheme.eligibility?.status}
- Matched Reasons: ${(scheme.eligibility?.matchedPillars || []).join('; ')}
- Missing / Warnings: ${(scheme.eligibility?.warnings || []).join('; ')}
- Financial Benefits: ${scheme.financialBenefits?.subsidyDetails || ''} | ${scheme.financialBenefits?.loanDetails || ''}
- Margin Money: ${scheme.financialBenefits?.marginMoneyDetails || ''}
- Collateral Requirement: ${scheme.financialBenefits?.collateralRequirement || ''}
- Required Documents: ${(scheme.documentChecklist || scheme.requiredDocuments || []).map(d => `${d.name} (${d.status || (d.mandatory ? 'Mandatory' : 'Optional')})`).join(', ')}
- Application Process: ${(scheme.applicationProcess || []).map(p => `Step ${p.step}: ${p.title} - ${p.description}`).join(' | ')}
- Official Portal: ${scheme.officialWebsite} (${scheme.officialSource})
` : `Available Top Schemes in User's Portfolio: ${(matchedSchemes || []).slice(0, 4).map(s => `${s.name} (Match: ${s.matchScore}, Type: ${s.schemeCategoryLabel})`).join(', ')}`;

  const systemPrompt = `You are the Business Compass Scheme Advisor, a specialized counselor for Indian entrepreneurs.
Answer strictly based on verified facts and official Government of India rules.${getLangDirective(lang)}`;

  const messages = [
    ...chatHistory.slice(-4),
    {
      role: 'user',
      content: `User Profile:\n${JSON.stringify(sanitized, null, 2)}\n\n${targetSchemeContext}\n\nUser Question: ${question}`
    }
  ];

  const fallback = () => {
    const qLower = (question || '').toLowerCase();
    if (lang === 'hi') {
      if (qLower.includes('document') || qLower.includes('दस्तावेज') || qLower.includes('कागजात')) {
        const docs = scheme?.documentChecklist || scheme?.requiredDocuments || [];
        return `**${scheme?.name || 'इस योजना'}** के लिए आवश्यक दस्तावेज:\n\n` +
          docs.map(d => `• **${d.name}**: ${d.status === 'AVAILABLE_FROM_PROFILE' ? '✓ आपके प्रोफाइल में उपलब्ध है' : '⚠ व्यवस्थित करना आवश्यक है'}`).join('\n') +
          `\n\n*अगला कदम:* ${scheme?.officialWebsite || 'आधिकारिक पोर्टल'} पर आवेदन करने से पहले अपना पैन, आधार और विस्तृत परियोजना रिपोर्ट (DPR) तैयार रखें।`;
      }
      return `**${sanitized.businessName}** के लिए **${scheme?.name || 'यह योजना'}** ${scheme?.financialBenefits?.subsidyDetails || 'सरकारी सहायता'} प्रदान करती है। विस्तृत परियोजना रिपोर्ट के सत्यापन के बाद संबंधित बैंक द्वारा ऋण स्वीकृत किया जाता है।`;
    }

    if (lang === 'mr') {
      if (qLower.includes('document') || qLower.includes('कागदपत्रे')) {
        const docs = scheme?.documentChecklist || scheme?.requiredDocuments || [];
        return `**${scheme?.name || 'या योजने'}** साठी आवश्यक कागदपत्रे:\n\n` +
          docs.map(d => `• **${d.name}**: ${d.status === 'AVAILABLE_FROM_PROFILE' ? '✓ उपलब्ध आहे' : '⚠ आवश्यक आहे'}`).join('\n') +
          `\n\n*पुढील पाऊल:* अधिकृत पोर्टलवर अर्ज करण्यापूर्वी पॅन, आधार आणि DPR तयार ठेवा.`;
      }
      return `**${sanitized.businessName}** साठी **${scheme?.name || 'ही योजना'}** ${scheme?.financialBenefits?.subsidyDetails || 'शासकीय सहाय्य'} देते.`;
    }

    if (lang === 'bn') {
      if (qLower.includes('document') || qLower.includes('নথি')) {
        const docs = scheme?.documentChecklist || scheme?.requiredDocuments || [];
        return `**${scheme?.name || 'এই প্রকল্পের'}** জন্য প্রয়োজনীয় নথিপত্র:\n\n` +
          docs.map(d => `• **${d.name}**: ${d.status === 'AVAILABLE_FROM_PROFILE' ? '✓ প্রোফাইলে সংরক্ষিত' : '⚠ সংগ্রহ করা প্রয়োজন'}`).join('\n') +
          `\n\n*পরবর্তী পদক্ষেপ:* পোর্টালে আবেদনের পূর্বে প্যান, আধার এবং ডিপিআর প্রস্তুত রাখুন।`;
      }
      return `**${sanitized.businessName}**-এর জন্য **${scheme?.name || 'এই প্রকল্প'}** ${scheme?.financialBenefits?.subsidyDetails || 'সরকারি সুবিধা'} প্রদান করে।`;
    }

    if (question.toLowerCase().includes('document')) {
      const docs = scheme?.documentChecklist || scheme?.requiredDocuments || [];
      const missing = docs.filter(d => d.status !== 'AVAILABLE_FROM_PROFILE');
      return `For **${scheme?.name || 'this scheme'}**, ${missing.length > 0 ? `${missing.length} documents need to be arranged` : 'all basic documents are recorded'}:\n\n` +
        docs.map(d => `• **${d.name}**: ${d.status === 'AVAILABLE_FROM_PROFILE' ? '✓ Available from your profile' : '⚠ Action required (must be arranged)'}`).join('\n') +
        `\n\n*Next Step:* Ensure your PAN, Aadhaar, and Detailed Project Report (DPR) are ready before applying on ${scheme?.officialWebsite || 'the official portal'}.`;
    }

    return `Based on your profile for **${sanitized.businessName}** in ${sanitized.state}, **${scheme?.name || 'this scheme'}** offers ${scheme?.financialBenefits?.subsidyDetails || 'government support'}. Final approval is granted by the participating bank and nodal agency following verification of your business project report.`;
  };

  return await executeGroundedAi(messages, systemPrompt, fallback);
}

export async function compareSchemesAi(profile, schemes, customLang = null) {
  if (!schemes || schemes.length < 2) return null;

  const lang = customLang || getActiveLanguage();
  const sanitized = sanitizeProfileForAi(profile);
  const schemeSummaries = schemes.map(s => ({
    name: s.name,
    score: s.matchScore,
    type: s.schemeCategoryLabel,
    maxFunding: s.financialBenefits?.maximumFunding,
    subsidy: s.financialBenefits?.subsidyPercentage,
    margin: s.financialBenefits?.marginMoneyDetails,
    collateral: s.financialBenefits?.collateralRequirement
  }));

  const systemPrompt = `You are the Business Compass Scheme Advisor. You compare 2-3 Indian government schemes for an entrepreneur and provide an objective comparison summary grounded strictly in provided data.${getLangDirective(lang)}`;

  const userPrompt = `Entrepreneur Profile:
- Sector: ${sanitized.sector}
- Business Stage: ${sanitized.businessStage}
- Funding Required: ${sanitized.fundingRequired}

Schemes to Compare:
${JSON.stringify(schemeSummaries, null, 2)}

Provide a crisp comparison summary.`;

  const fallback = () => {
    const topScorer = [...schemes].sort((a, b) => b.matchScore - a.matchScore)[0];
    const secondScorer = [...schemes].sort((a, b) => b.matchScore - a.matchScore)[1];

    if (lang === 'hi') {
      return `### योजना तुलना विश्लेषण\n` +
        `• **अनुशंसित प्राथमिकता:** ${sanitized.sector} में आपके चरण (${sanitized.businessStage}) हेतु, **${topScorer.name}** सर्वाधिक सहायता (${topScorer.financialBenefits?.subsidyPercentage || 'उच्च सब्सिडी'}) प्रदान करती है।\n` +
        `• **वैकल्पिक विकल्प:** **${secondScorer.name}** (${secondScorer.schemeCategoryLabel}) एक प्रभावी द्वितीयक सुविधा के रूप में उपयोगी हो सकती है।\n` +
        `• **अगला कदम:** व्यावसायिक बैंक ऋण से पहले पूंजीगत सब्सिडी का अधिकतम लाभ उठाने के लिए **${topScorer.name}** से शुरुआत करने की सलाह दी जाती है।`;
    }

    return `### Comparison Insight\n` +
      `• **Recommended Priority:** For your stage (${sanitized.businessStage}) in ${sanitized.sector}, **${topScorer.name}** offers the strongest alignment with ${topScorer.financialBenefits?.subsidyPercentage || 'higher support'}.\n` +
      `• **Alternative Option:** **${secondScorer.name}** can serve as an effective secondary facility (${secondScorer.schemeCategoryLabel}) with ${secondScorer.financialBenefits?.collateralRequirement || 'flexible terms'}.\n` +
      `• **Next Step:** We advise starting with **${topScorer.name}** to maximize capital subsidy before availing commercial bank credit lines.`;
  };

  return await executeGroundedAi(
    [{ role: 'user', content: userPrompt }],
    systemPrompt,
    fallback
  );
}
