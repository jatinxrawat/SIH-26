/**
 * SIH Requirement 3 — Grounded SWOT Analysis Service
 * Generates an individualized 4-quadrant SWOT matrix tailored strictly to:
 * - Entrepreneur's available capital & project outlay
 * - Business sector, description, stage, and location
 * - Real operational strengths, weaknesses, local market gaps, and threats
 */

import { parseRupeeAmount } from '../eligibilityEngine';
import { classifyBusinessDomain, BUSINESS_DOMAINS } from './businessDomainClassifier';

export function analyzeSwot(profile, marketReach, opportunities, risks) {
  const personal = profile?.personalInfo || {};
  const business = profile?.business || {};
  const finances = profile?.financialProfile || {};

  const capitalVal = parseRupeeAmount(finances.availableCapital);
  const projectVal = parseRupeeAmount(finances.estimatedProjectCost);
  const isOperating = business.status === 'OPERATING';
  const isRural = (personal.ruralUrban || '').toUpperCase() === 'RURAL';
  const district = personal.district || 'Local District';

  const domainInfo = classifyBusinessDomain(business, personal);
  const { domainKey } = domainInfo;

  // 1. STRENGTHS
  const strengths = [];
  if (capitalVal >= 100000) {
    strengths.push({
      point: `Healthy initial promoter margin (${finances.availableCapital || 'Sufficient'})`,
      detail: 'Adequate seed capital provides a safety buffer to fund prototype fabrication, workshop tooling, and initial raw material stock.'
    });
  } else {
    strengths.push({
      point: 'Lean initial cost structure and founder agility',
      detail: 'Starting at micro scale keeps fixed monthly workshop overhead low, allowing agile iteration based on customer feedback.'
    });
  }

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    strengths.push({
      point: 'Grounded understanding of local farming terrain and cultivator challenges',
      detail: 'Direct access to regional farmers enables rapid engineering adaptation to local soil, crop spacing, and small plot dimensions.'
    });
  } else {
    strengths.push({
      point: `Strategic geographic proximity in ${district} (${isRural ? 'Village Cluster' : 'Semi-Urban Corridor'})`,
      detail: 'Direct proximity to local customers enables personal accountability, rapid delivery, and word-of-mouth trust.'
    });
  }

  if (isOperating) {
    strengths.push({
      point: 'Operational track record and active customer base',
      detail: 'Existing commercial presence provides verified customer demand and repeat transaction history.'
    });
  } else {
    strengths.push({
      point: 'Unencumbered modern design & digital direct-to-customer model',
      detail: 'Free from legacy dealership debts, outdated tooling, or rigid traditional distribution habits.'
    });
  }

  // 2. WEAKNESSES
  const weaknesses = [];
  if (projectVal > capitalVal * 3 && projectVal > 0) {
    weaknesses.push({
      point: `Capital funding gap requiring external loan sanction (${finances.fundingRequired || 'Significant outlay'})`,
      detail: 'Project requires external bank financing or government subsidies; requires structured DPR preparation and appraisal lead time.'
    });
  }

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    weaknesses.push({
      point: 'Limited initial machinery batch production capacity',
      detail: 'Early operations restricted to small batch fabrication until specialized jigs and automated welding tools are installed.'
    });
    weaknesses.push({
      point: 'Need for formal testing certification (SMAM / FMTTI)',
      detail: 'Achieving government subsidy empanelment requires prototype test reports from authorized agricultural engineering centers.'
    });
  } else {
    weaknesses.push({
      point: 'Limited initial distribution radius and delivery reach',
      detail: 'Early operations restricted to 3–5 km radius until additional transport or sales partners are onboarded.'
    });
  }

  if (!isOperating) {
    weaknesses.push({
      point: 'Unproven commercial brand recognition in early 90 days',
      detail: 'New entrant vulnerability where early farmer or buyer confidence must be established through trials and demonstrations.'
    });
  }

  // 3. OPPORTUNITIES
  const oppList = [];
  if (opportunities?.opportunities?.length > 0) {
    opportunities.opportunities.slice(0, 2).forEach(opp => {
      oppList.push({
        point: opp.title,
        detail: opp.reason
      });
    });
  }

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    oppList.push({
      point: 'FPO & Custom Hiring Center (CHC) equipment procurement quotas',
      detail: 'Government-supported farmer collectives receive up to 80% grant assistance to establish machinery hiring banks, creating bulk B2B demand.'
    });
  } else {
    oppList.push({
      point: 'Government Scheme Capital Subsidies & Credit Guarantees',
      detail: 'Access to 15–35% capital subsidy via central/state flagship schemes (PMEGP, PMFME, Mudra) to lower effective borrowing costs.'
    });
  }

  // 4. THREATS
  const threats = [];
  if (risks?.risks?.length > 0) {
    risks.risks.slice(0, 3).forEach(risk => {
      threats.push({
        point: risk.title,
        detail: risk.whyItMatters
      });
    });
  } else {
    threats.push({
      point: 'Raw material and steel commodity price escalation',
      detail: 'Unhedged increases in metal sheets, motors, or component prices can erode operating gross margins.'
    });
    threats.push({
      point: 'Agricultural seasonality and harvest-dependent cash cycles',
      detail: 'Purchasing surges during pre-sowing windows and contracts sharply during standing crop months.'
    });
  }

  return {
    domainTitle: domainInfo.domainTitle,
    strengths,
    weaknesses,
    opportunities: oppList,
    threats,
    summary: `Tailored SWOT architecture calibrated for ${business.name || 'your enterprise'} (${domainInfo.domainTitle}), available margin of ${finances.availableCapital || 'registered capital'}, and the local ${district} trade territory.`
  };
}
