/**
 * Scheme Matcher API Service
 * 
 * Provides unified interface for:
 * - GET /api/schemes
 * - GET /api/schemes/:id
 * - GET /api/schemes/recommendations (evaluates profile against scheme database)
 * - GET /api/schemes/:id/match
 * - POST /api/schemes/:id/select (stores in user Roadmap)
 * - AI advisor integrations
 */

import { GOVERNMENT_SCHEMES } from '../data/schemesData';
import {
  evaluateSchemeEligibility,
  calculateMatchScore,
  checkSchemeDocuments,
  evaluateAndRankSchemes
} from './eligibilityEngine';
import {
  explainTopRecommendations,
  answerSchemeQuestion,
  compareSchemesAi
} from './schemeAdvisorService';

const SELECTED_SCHEMES_KEY = 'udyamsaathi_selected_roadmap_schemes';

export const schemeApi = {
  /**
   * List all schemes with optional query filters
   */
  async getSchemes(filters = {}) {
    let result = [...GOVERNMENT_SCHEMES];

    if (filters.category && filters.category !== 'ALL') {
      result = result.filter(s => s.schemeType === filters.category);
    }

    if (filters.sector && filters.sector !== 'ALL') {
      result = result.filter(s => 
        s.businessSectors.includes('ALL') || s.businessSectors.includes(filters.sector)
      );
    }

    if (filters.state && filters.state !== 'ALL') {
      result = result.filter(s =>
        s.applicableStates.includes('ALL') || s.applicableStates.includes(filters.state)
      );
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.ministry.toLowerCase().includes(q)
      );
    }

    return result;
  },

  /**
   * Get single scheme by ID
   */
  async getSchemeById(id) {
    const scheme = GOVERNMENT_SCHEMES.find(s => s.id === id);
    if (!scheme) throw new Error(`Scheme with ID '${id}' not found`);
    return scheme;
  },

  /**
   * Generate personalized recommendations based on profile
   */
  async getRecommendations(profile) {
    if (!profile) return [];
    return evaluateAndRankSchemes(profile, GOVERNMENT_SCHEMES);
  },

  /**
   * Detailed match analysis for a specific scheme and profile
   */
  async getSchemeMatch(schemeId, profile) {
    const scheme = await this.getSchemeById(schemeId);
    const eligibility = evaluateSchemeEligibility(profile, scheme);
    const matchScore = calculateMatchScore(profile, scheme, eligibility);
    const documentChecklist = checkSchemeDocuments(profile, scheme);

    return {
      ...scheme,
      eligibility,
      matchScore,
      documentChecklist
    };
  },

  /**
   * Mark scheme as chosen / added to Roadmap
   */
  async selectSchemeForRoadmap(schemeId) {
    try {
      const existing = this.getSelectedSchemeIds();
      if (!existing.includes(schemeId)) {
        const updated = [...existing, schemeId];
        localStorage.setItem(SELECTED_SCHEMES_KEY, JSON.stringify(updated));
      }
      return { success: true, schemeId };
    } catch (e) {
      console.error('Error selecting scheme for roadmap:', e);
      return { success: false, error: e.message };
    }
  },

  /**
   * Remove scheme from selected roadmap list
   */
  async unselectScheme(schemeId) {
    try {
      const existing = this.getSelectedSchemeIds();
      const updated = existing.filter(id => id !== schemeId);
      localStorage.setItem(SELECTED_SCHEMES_KEY, JSON.stringify(updated));
      return { success: true, schemeId };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  /**
   * Retrieve list of selected scheme IDs from storage
   */
  getSelectedSchemeIds() {
    try {
      const stored = localStorage.getItem(SELECTED_SCHEMES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  /**
   * AI "Why We Recommend This"
   */
  async getWhyWeRecommendExplanation(profile, topScheme) {
    return explainTopRecommendations(profile, topScheme);
  },

  /**
   * AI Scheme Advisor Question & Answer
   */
  async askAdvisor(params) {
    return answerSchemeQuestion(params);
  },

  /**
   * Compare 2-3 schemes
   */
  async compareSchemes(schemeIds, profile) {
    const all = await this.getRecommendations(profile);
    const selected = all.filter(s => schemeIds.includes(s.id));
    const aiSummary = await compareSchemesAi(profile, selected);

    return {
      schemes: selected,
      aiSummary
    };
  }
};
