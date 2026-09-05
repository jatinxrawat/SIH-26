/**
 * SIH Requirement 4 — Local Business Risks & Threat Identification Service
 * Grounded strictly in businessDomainClassifier.
 */

import { classifyBusinessDomain, BUSINESS_DOMAINS } from './businessDomainClassifier';

export function analyzeLocalRisks(profile, localOverrides = {}) {
  const personal = profile?.personalInfo || {};
  const business = profile?.business || {};
  const finances = profile?.financialProfile || {};
  const isRural = (personal.ruralUrban || '').toUpperCase() === 'RURAL';

  const domainInfo = classifyBusinessDomain(business, personal);

  const risks = [];

  // 1. SUPPLY CHAIN BOTTLENECKS
  const supplyChainRisk = evaluateDomainSupplyChainRisk(domainInfo, isRural, localOverrides);
  risks.push(supplyChainRisk);

  // 2. SEASONALITY RISK
  const seasonalityRisk = evaluateDomainSeasonalityRisk(domainInfo, isRural, localOverrides);
  risks.push(seasonalityRisk);

  // 3. SINGLE-BUYER DEPENDENCY RISK
  const buyerDependencyRisk = evaluateDomainBuyerDependencyRisk(domainInfo, business, localOverrides);
  risks.push(buyerDependencyRisk);

  // 4. WORKING CAPITAL & LIQUIDITY RISK
  const workingCapitalRisk = evaluateDomainWorkingCapitalRisk(domainInfo, finances, isRural, localOverrides);
  risks.push(workingCapitalRisk);

  // Overall Risk Level
  const highRiskCount = risks.filter(r => r.level === 'HIGH').length;
  const overallRiskLevel = highRiskCount >= 2 ? 'HIGH' : (highRiskCount === 1 ? 'MODERATE' : 'LOW_TO_MODERATE');

  return {
    domainTitle: domainInfo.domainTitle,
    overallRiskLevel,
    risks,
    advisoryNote: `Risk evaluation tailored for ${domainInfo.domainTitle} in this regional profile. Proactive mitigation before launch significantly improves operational longevity.`
  };
}

function evaluateDomainSupplyChainRisk(domainInfo, isRural, overrides) {
  const { domainKey } = domainInfo;

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      id: 'risk-supply-chain',
      title: 'Steel, Motor & Bearing Component Sourcing Bottlenecks',
      category: 'Supply Chain',
      level: 'MEDIUM',
      badgeColor: 'amber',
      whyItMatters: 'Raw material costs for structural steel tubing, wear-resistant blades, small engines, and precision bearings fluctuate with national commodity cycles. Sourcing components from distant industrial hubs can cause 5–10 day delivery delays during peak pre-sowing rush periods.',
      possibleMitigation: '1. Maintain a 30-day buffer inventory of high-frequency wear parts (blades, fasteners, belts). 2. Whitelist 2 verified regional hardware wholesalers in the district/state hub to avoid single-distributor dependency.',
      confidence: 'HIGH'
    };
  }

  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return {
      id: 'risk-supply-chain',
      title: 'Feed Cost Volatility & Raw Milk Chilling Reliability',
      category: 'Supply Chain',
      level: 'MEDIUM',
      badgeColor: 'amber',
      whyItMatters: 'Green fodder and concentrated cattle feed prices fluctuate by 15–25% with seasonal monsoon rainfall. Without reliable chilling, milk can spoil during peak summer temperatures.',
      possibleMitigation: '1. Establish long-term forward supply agreements with local fodder growers. 2. Invest in insulated milk transit cans and backup solar cooling.',
      confidence: 'HIGH'
    };
  }

  return {
    id: 'risk-supply-chain',
    title: 'Input Material Availability & Transit Dependency',
    category: 'Supply Chain',
    level: 'MEDIUM',
    badgeColor: 'amber',
    whyItMatters: 'Relying on a single supplier for core raw materials exposes the business to sudden price hikes or unexpected stock shortages.',
    possibleMitigation: 'Establish purchasing accounts with at least 2 alternate suppliers within 25 km to preserve bargaining power.',
    confidence: 'MEDIUM'
  };
}

function evaluateDomainSeasonalityRisk(domainInfo, isRural, overrides) {
  const { domainKey } = domainInfo;

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      id: 'risk-seasonality',
      title: 'Pre-Sowing Agricultural Surge vs Monsoon Off-Season Lull',
      category: 'Seasonality',
      level: 'HIGH',
      badgeColor: 'rose',
      peakPeriod: 'April – June (Pre-Kharif land preparation) & September – November (Post-monsoon Rabi sowing)',
      leanPeriod: 'July – August & January – February (Crops standing in fields; farmers conserve cash)',
      whyItMatters: 'Farmers make equipment purchasing decisions right before critical plowing, weeding, and harvesting windows. Monthly sales can fluctuate by 300% between peak sowing months and standing-crop months.',
      possibleMitigation: '1. Offer equipment reconditioning, blade sharpening, and maintenance services during lean months. 2. Introduce early-bird pre-booking discounts 45 days before the sowing season to smooth cash flow.',
      confidence: 'HIGH'
    };
  }

  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return {
      id: 'risk-seasonality',
      title: 'Summer Flush Season Supply Drop & Winter Festival Peak',
      category: 'Seasonality',
      level: 'HIGH',
      badgeColor: 'rose',
      peakPeriod: 'October – March (Festivals, weddings, high fat demand)',
      leanPeriod: 'April – June (Extreme heat reduces animal milk yield by 15–20%)',
      whyItMatters: 'Customer demand remains steady in summer while production dips, whereas winter brings surplus milk.',
      possibleMitigation: 'Diversify into summer value-added cooling products (buttermilk/lassi/curd) which command higher realization.',
      confidence: 'HIGH'
    };
  }

  return {
    id: 'risk-seasonality',
    title: 'Seasonal Demand Fluctuations & Local Economic Cycles',
    category: 'Seasonality',
    level: 'MEDIUM',
    badgeColor: 'amber',
    peakPeriod: 'October – March (Festive and wedding cycles)',
    leanPeriod: 'June – August (Monsoon planting period)',
    whyItMatters: 'Consumer purchasing tracks regional harvest cash realization and festive cycles closely.',
    possibleMitigation: 'Maintain cash reserves during peak months to comfortably cover lean period fixed overheads.',
    confidence: 'MEDIUM'
  };
}

function evaluateDomainBuyerDependencyRisk(domainInfo, business, overrides) {
  const { domainKey } = domainInfo;

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      id: 'risk-buyer-dependency',
      title: 'Institutional FPO / Single Dealer Revenue Concentration',
      category: 'Buyer Dependency',
      level: 'MEDIUM',
      badgeColor: 'amber',
      whyItMatters: 'If more than 40–50% of your machinery orders depend on a single FPO bulk tender or one regional machinery dealership, payment disbursement delays or leadership changes at the FPO can abruptly freeze working capital.',
      advisoryThreshold: 'Ensure direct farmer sales and multi-village demonstrations represent at least 40% of total revenue.',
      possibleMitigation: 'Cultivate a grassroots base of individual progressive farmers across 4–5 village clusters alongside any institutional contracts.',
      confidence: 'HIGH'
    };
  }

  return {
    id: 'risk-buyer-dependency',
    title: 'Single-Buyer / Intermediary Revenue Concentration',
    category: 'Buyer Dependency',
    level: 'LOW_TO_MODERATE',
    badgeColor: 'emerald',
    whyItMatters: 'Prudent Business Rule: Never allow more than 40–50% of total revenue to depend on a single buyer or wholesale intermediary.',
    advisoryThreshold: 'Maintain diversification across direct retail and wholesale channels.',
    possibleMitigation: 'Expand active customer accounts so that no single buyer can jeopardize business continuity.',
    confidence: 'HIGH'
  };
}

function evaluateDomainWorkingCapitalRisk(domainInfo, finances, isRural, overrides) {
  const { domainKey } = domainInfo;

  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      id: 'risk-working-capital',
      title: 'Farmer Post-Harvest Credit Expectation & Inventory Holding',
      category: 'Financial / Liquidity',
      level: 'HIGH',
      badgeColor: 'rose',
      whyItMatters: 'In rural farm machinery sales, farmers frequently request purchasing on credit with payment promised "after crop harvest". Since manufacturing requires upfront steel and component cash outlays, carrying informal farmer credit can quickly deplete cash reserves.',
      possibleMitigation: '1. Establish tie-ups with local Primary Agricultural Credit Societies (PACS) or bank Kisan Credit Card (KCC) loans so the farmer borrows from the bank rather than asking the manufacturer for credit. 2. Offer a 5% instant cash discount to encourage immediate payment.',
      confidence: 'HIGH'
    };
  }

  return {
    id: 'risk-working-capital',
    title: 'Working Capital Squeeze & Informal Credit Squeeze',
    category: 'Financial / Liquidity',
    level: 'MEDIUM',
    badgeColor: 'amber',
    whyItMatters: 'Offering informal credit while purchasing inputs on cash creates a liquidity gap that can paralyze daily operations.',
    possibleMitigation: 'Establish a strict 7-day credit cap and preserve at least 20% of initial funds as emergency operational buffer.',
    confidence: 'HIGH'
  };
}
