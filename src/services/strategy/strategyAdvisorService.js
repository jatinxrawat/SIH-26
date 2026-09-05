/**
 * Grounded AI Strategic Summary & Advisor Service
 * Synthesizes structured strategy outputs into clear, jargon-free plain language.
 * 
 * Strict Grounding Architecture:
 * 1. AI is provided only verified, structured outputs from the analytical engines.
 * 2. AI interprets evidence; it does NOT invent figures, population counts, or prices.
 * 3. Graceful offline fallback ensures instantaneous, high-quality synthesis even without internet or API keys.
 */

export async function generateGroundedAiSummary(strategy) {
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
      outlook
    };

    const task = {
      title: `Generate Hyper-Local Feasibility Summary for ${domainTitle}`,
      whyThisMatters: 'Convert structured feasibility indicators into empathetic, practical advice for an entrepreneur.'
    };

    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'gemini',
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

  // Deterministic Grounded Synthesis
  const summaryText = `For ${businessName} in ${location}, your strongest competitive opportunity in ${domainTitle} is ${advantage.toLowerCase()}, targeting ${targetAudience} with localized value rather than competing head-to-head with expensive corporate brands. At an estimated outlay of ${investment}, your unit economics support a viable operating margin within the indicative price band of ${priceRange}. However, you must actively protect your cash flow against ${topRisk.toLowerCase()} and maintain prudent credit discipline. Overall local outlook is classified as ${outlook}.`;

  return {
    summaryText,
    isLiveAi: false,
    provider: 'Grounded Analytical Engine'
  };
}
