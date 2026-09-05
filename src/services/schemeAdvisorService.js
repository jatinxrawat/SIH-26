/**
 * Grounded AI Scheme Advisor Service
 * 
 * Powered by Groq (llama-3.3-70b-versatile) with Gemini API fallback.
 * Strictly grounded in the deterministic scheme database and entrepreneur profile.
 * Zero hallucination policy: AI answers using only verified scheme facts and profile parameters.
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Minimal sanitized profile context for AI prompts (protects sensitive data)
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

/**
 * Call Groq OpenAI-compatible Chat Completions API
 */
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
      temperature: 0.2, // Low temperature for high factual precision
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

/**
 * Call Gemini API as secondary fallback
 */
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

/**
 * Executes an AI call with Groq -> Gemini -> Fallback chain
 */
async function executeGroundedAi(messages, systemPrompt, fallbackGenerator) {
  try {
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];
    return await callGroqChat(fullMessages);
  } catch (groqErr) {
    console.warn('[SchemeAdvisor] Groq unavailable, trying Gemini fallback:', groqErr.message);
    try {
      const combinedPrompt = `${systemPrompt}\n\n` + messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
      return await callGeminiChat(combinedPrompt);
    } catch (geminiErr) {
      console.warn('[SchemeAdvisor] Gemini unavailable, using deterministic synthesizer:', geminiErr.message);
      return fallbackGenerator();
    }
  }
}

/**
 * Section 15: AI "Best Option" Explanation
 * Explains why the top matched scheme is recommended for this entrepreneur.
 */
export async function explainTopRecommendations(profile, topScheme) {
  if (!topScheme) return null;

  const sanitized = sanitizeProfileForAi(profile);
  const matchedPillars = topScheme.eligibility?.matchedPillars || [];
  const benefits = topScheme.financialBenefits || {};

  const systemPrompt = `You are the Business Compass Scheme Advisor, an expert government program evaluator for Indian entrepreneurs.
You provide clear, encouraging, strictly factual explanations grounded ONLY in the supplied entrepreneur profile and scheme data.
Never invent government rules, subsidy figures, or guarantees not listed in the input.
Format your response concisely with 3-4 bullet points and a brief takeaway.`;

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

Explain why ${topScheme.name} is currently the strongest match for this entrepreneur and what immediate benefit they can expect based on what their business actually does (${sanitized.businessDescription || sanitized.sector}). Keep it under 150 words.`;

  const fallback = () => {
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

/**
 * Section 14: Answer User Questions About Matched Schemes
 * Grounded Q&A for questions like:
 * - "Why am I eligible for this scheme?"
 * - "What documents am I missing?"
 * - "Can I apply for both PMEGP and Mudra?"
 * - "What should I do first?"
 */
export async function answerSchemeQuestion({ profile, scheme, matchedSchemes, question, chatHistory = [] }) {
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
You must answer questions strictly based on the following verified facts:
1. The user's active profile parameters.
2. The structured scheme database and matching results provided below.
3. Official Government of India rules (PMEGP, PMFME, Mudra, Stand-Up India, CGTMSE, etc.).

CRITICAL RULES:
- Never hallucinate non-existent schemes or unverified funding rules.
- If information is not provided in the scheme record or profile, explicitly say: "This specific detail is not recorded in the official scheme guidelines, and should be confirmed with the respective District Industries Centre (DIC) or nodal bank."
- Never claim 100% guaranteed approval; clarify that final sanction is subject to bank appraisal.
- Provide direct, friendly, and actionable advice formatted in clean markdown bullet points.`;

  const messages = [
    ...chatHistory.slice(-4),
    {
      role: 'user',
      content: `User Profile:\n${JSON.stringify(sanitized, null, 2)}\n\n${targetSchemeContext}\n\nUser Question: ${question}`
    }
  ];

  const fallback = () => {
    if (question.toLowerCase().includes('document')) {
      const docs = scheme?.documentChecklist || scheme?.requiredDocuments || [];
      const missing = docs.filter(d => d.status !== 'AVAILABLE_FROM_PROFILE');
      return `For **${scheme?.name || 'this scheme'}**, ${missing.length > 0 ? `${missing.length} documents need to be arranged` : 'all basic documents are recorded'}:\n\n` +
        docs.map(d => `• **${d.name}**: ${d.status === 'AVAILABLE_FROM_PROFILE' ? '✓ Available from your profile' : '⚠ Action required (must be arranged)'}`).join('\n') +
        `\n\n*Next Step:* Ensure your PAN, Aadhaar, and Detailed Project Report (DPR) are ready before applying on ${scheme?.officialWebsite || 'the official portal'}.`;
    }

    if (question.toLowerCase().includes('eligible') || question.toLowerCase().includes('why')) {
      const pillars = scheme?.eligibility?.matchedPillars || [];
      return `You match **${scheme?.name || 'this scheme'}** because:\n\n` +
        pillars.map(p => `• ✓ ${p}`).join('\n') +
        `\n\n**Potential Support:** ${scheme?.financialBenefits?.subsidyDetails || scheme?.financialBenefits?.loanDetails || 'Government credit support'}.`;
    }

    if (question.toLowerCase().includes('next') || question.toLowerCase().includes('first') || question.toLowerCase().includes('apply')) {
      const steps = scheme?.applicationProcess || [];
      return `Here is your recommended step-by-step roadmap for **${scheme?.name}**:\n\n` +
        steps.map(s => `**Step ${s.step}: ${s.title}** - ${s.description}`).join('\n\n') +
        `\n\nOfficial Portal: [${scheme?.officialSource}](${scheme?.officialWebsite})`;
    }

    return `Based on your profile for **${sanitized.businessName}** in ${sanitized.state}, **${scheme?.name || 'this scheme'}** offers ${scheme?.financialBenefits?.subsidyDetails || 'government support'}. Final approval is granted by the participating bank and nodal agency following verification of your business project report.`;
  };

  return await executeGroundedAi(messages, systemPrompt, fallback);
}

/**
 * Section 16: AI Summary for Scheme Comparison
 * Compares 2-3 selected schemes side by side.
 */
export async function compareSchemesAi(profile, schemes) {
  if (!schemes || schemes.length < 2) return null;

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

  const systemPrompt = `You are the Business Compass Scheme Advisor. You compare 2-3 Indian government schemes for an entrepreneur and provide an objective comparison summary grounded strictly in provided data.
Highlight which scheme is ideal for immediate capital vs long-term expansion. Keep under 150 words.`;

  const userPrompt = `Entrepreneur Profile:
- Sector: ${sanitized.sector}
- Business Stage: ${sanitized.businessStage}
- Funding Required: ${sanitized.fundingRequired}

Schemes to Compare:
${JSON.stringify(schemeSummaries, null, 2)}

Provide a crisp comparison summary highlighting:
1. Highest direct subsidy support
2. Easiest entry / least margin money requirement
3. Actionable recommendation on which to pursue first.`;

  const fallback = () => {
    const topScorer = [...schemes].sort((a, b) => b.matchScore - a.matchScore)[0];
    const secondScorer = [...schemes].sort((a, b) => b.matchScore - a.matchScore)[1];
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
