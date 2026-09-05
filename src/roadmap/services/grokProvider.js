/**
 * Grok AI Provider
 * Communicates with the secure backend endpoint /api/ai for Grok-powered tactical execution.
 * Includes resilient client-side fallback with structured entrepreneur guidance if offline.
 */

export class GrokProvider {
  constructor() {
    this.name = 'Saathi Tactical Engine';
    this.id = 'grok';
    this.badge = 'Fast Action Execution';
  }

  async generateAdvice({ task, context, question }) {
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'grok',
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
      console.warn('Grok live endpoint unavailable, activating offline intelligence engine:', err);
    }

    // High-fidelity structured fallback tailored to business context
    return this.getFallbackAdvice(task, context, question);
  }

  getFallbackAdvice(task, context, question) {
    const businessName = context?.businessName || 'your enterprise';
    const location = context?.location || 'your district';
    const taskTitle = task?.title || 'this task';

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
