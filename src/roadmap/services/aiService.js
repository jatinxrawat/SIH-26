/**
 * Unified AI Service Abstraction Layer
 * Exposes a common interface across Gemini and Grok.
 * Keeps the UI independent of underlying provider implementations.
 */

import { GeminiProvider } from './geminiProvider';
import { GrokProvider } from './grokProvider';

class AIService {
  constructor() {
    this.providers = {
      gemini: new GeminiProvider(),
      grok: new GrokProvider()
    };
    this.activeProviderId = 'gemini';
  }

  setProvider(providerId) {
    if (this.providers[providerId]) {
      this.activeProviderId = providerId;
    }
  }

  getProvider(providerId = this.activeProviderId) {
    return this.providers[providerId] || this.providers.gemini;
  }

  getAvailableProviders() {
    return Object.values(this.providers).map((p) => ({
      id: p.id,
      name: p.name,
      badge: p.badge
    }));
  }

  /**
   * Primary entrypoint: asks AI for structured task guidance
   */
  async askAI({ provider = this.activeProviderId, task, context, question, preferredLanguage }) {
    const providerInstance = this.getProvider(provider);
    const lang = preferredLanguage || (typeof localStorage !== 'undefined' ? localStorage.getItem('udyam_language') : 'en') || 'en';
    return await providerInstance.generateAdvice({ task, context, question, preferredLanguage: lang });
  }
}

export const aiService = new AIService();
