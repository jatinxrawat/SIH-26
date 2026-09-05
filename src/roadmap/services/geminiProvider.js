/**
 * Gemini AI Provider
 * Communicates with the secure backend endpoint /api/ai for Gemini-powered explanations.
 * Includes resilient client-side fallback with structured entrepreneur guidance if offline.
 */

export class GeminiProvider {
  constructor() {
    this.name = 'Google Gemini 1.5 Pro';
    this.id = 'gemini';
    this.badge = 'Deep MSME Intelligence';
  }

  async generateAdvice({ task, context, question }) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'gemini',
          task,
          context,
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

    // High-fidelity structured fallback tailored to business context
    return this.getFallbackAdvice(task, context, question);
  }

  getFallbackAdvice(task, context, question) {
    const businessName = context?.businessName || 'your enterprise';
    const sector = context?.sector || 'food processing';
    const taskTitle = task?.title || 'this task';

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
