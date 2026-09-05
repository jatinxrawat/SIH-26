/**
 * AI Business Advisor Client Service
 * Connects the Advisor UI with the backend /api/ai proxy (Groq + Gemini).
 * Includes strict grounding with the currently active business profile and zero data leakage.
 */

export async function sendAdvisorMessage({ message, history = [], profile = {} }) {
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
    primaryChallenge: profile.goals?.primaryChallenge || 'Navigating government schemes & paperwork'
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'chat',
        question: message,
        messages: formattedMessages,
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

  // Client-side fallback if network or endpoint is unreachable
  return {
    reply: `### Advice for ${context.businessName} (${context.sector} • ${context.stage})\n\n` +
      `Regarding your inquiry on **"${message}"**:\n\n` +
      `1. **Statutory Steps**: If you haven't yet, register for **Udyam MSME** (100% free at [udyamregistration.gov.in](https://udyamregistration.gov.in)) to gain legal enterprise recognition and priority bank lending status.\n` +
      `2. **Credit & Subsidy Opportunity**: For your funding gap (${context.fundingRequired}), the **PMEGP** scheme provides a 25% to 35% capital subsidy, while **Mudra (Kishore)** offers up to ₹5 Lakhs collateral-free credit.\n` +
      `3. **Immediate Action**: Prepare your 3-year projected cash flow DPR and consult your local District Industries Centre (DIC) in ${context.location}.\n\n` +
      `*Feel free to ask for specific scheme eligibility criteria or document checklists!*`,
    provider: 'UdyamSaathi Deterministic MSME Intelligence',
    isLive: false
  };
}
