/**
 * SIH Requirement 5 — Competitor Landscape & Differentiation Service
 * Grounded strictly in businessDomainClassifier.
 * 
 * Strict Principle:
 * Explicitly labels estimated counts as sector benchmarks; never fabricates fake business names.
 */

import { classifyBusinessDomain, BUSINESS_DOMAINS } from './businessDomainClassifier';

export function analyzeCompetitors(profile, localOverrides = {}) {
  const personal = profile?.personalInfo || {};
  const business = profile?.business || {};
  const finances = profile?.financialProfile || {};
  const isRural = (personal.ruralUrban || '').toUpperCase() === 'RURAL';

  const domainInfo = classifyBusinessDomain(business, personal);

  // Benchmark density estimations
  const density = getDomainCompetitorDensity(domainInfo, isRural, localOverrides);

  // Concrete positioning recommendation
  const positioning = generateDomainDifferentiationStrategy(domainInfo, finances, isRural);

  return {
    domainTitle: domainInfo.domainTitle,
    competitorDensity: density,
    competitorCategories: density.categories,
    overallCompetitionLevel: density.overallLevel,
    positioning,
    source: 'District Directorate of Industries / MSME Machinery & Trade Benchmarks',
    confidence: 'MEDIUM',
    labelNote: `Estimated competitor density for ${domainInfo.domainTitle} based on regional MSME data. Validate exact numbers during local market walk.`
  };
}

function getDomainCompetitorDensity(domainInfo, isRural, localOverrides) {
  const { domainKey } = domainInfo;

  // 1. AGRICULTURAL EQUIPMENT & FARM MACHINERY
  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      overallLevel: 'MODERATE',
      badgeColor: 'emerald',
      innerRadiusCount: localOverrides.competitorInnerCount || (isRural ? '1–3 local welding repair workshops / village blacksmiths' : '2–4 local fabrication & tool shops'),
      outerRadiusCount: localOverrides.competitorOuterCount || (isRural ? '4–7 commercial tractor & implement dealers in block market' : '8–12 agricultural equipment dealers'),
      categories: [
        {
          name: 'Large Corporate Machinery Brands (Mahindra, Shaktiman, VST, John Deere)',
          share: '50%',
          strength: 'Established brand trust, bank tie-ups, large advertising budgets.',
          weakness: 'Heavy and expensive; designs unsuited for small 0.5–2 acre fragmented plots or terraced hills; costly spare parts and distant service centers.'
        },
        {
          name: 'Unorganized Local Blacksmiths & Welding Fabricators',
          share: '35%',
          strength: 'Proximity to farmers, low upfront price, informal relationship.',
          weakness: 'Crude uncalibrated designs, use of non-hardened mild steel that dulls rapidly, lack of safety shields, zero performance warranty.'
        },
        {
          name: 'Second-Hand Implement Traders & Rental Operators',
          share: '15%',
          strength: 'Budget-friendly for cash-strapped marginal farmers.',
          weakness: 'Frequent breakdowns during critical sowing windows, high fuel inefficiency, worn-out bearings.'
        }
      ],
      marketConcentration: 'Corporate dealerships are clustered in the tehsil/district town center; local fabricators are scattered along link roads.'
    };
  }

  // 2. DAIRY & ANIMAL HUSBANDRY
  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return {
      overallLevel: 'MODERATE_TO_HIGH',
      badgeColor: 'amber',
      innerRadiusCount: localOverrides.competitorInnerCount || (isRural ? '4–7 local dairy farmers / milkmen' : '8–14 local dairy booths & milkmen'),
      outerRadiusCount: localOverrides.competitorOuterCount || (isRural ? '12–18 cluster collection points / sweet shop suppliers' : '22–35 retail dairies & distributors'),
      categories: [
        {
          name: 'Traditional Village Dudhiyas (Milkmen)',
          share: '45%',
          strength: 'Direct customer relationships, door delivery history, informal monthly credit.',
          weakness: 'Unstandardized fat testing, seasonal dilution concerns, irregular timing.'
        },
        {
          name: 'Organized Dairy Co-operative Booths (Amul, Nandini, State Co-op)',
          share: '35%',
          strength: 'Strong brand awareness, standardized packaging, fixed retail pricing.',
          weakness: 'Cold-chain pasteurized milk lacks raw fresh milk aroma; limited doorstep personal connection.'
        },
        {
          name: 'Local Halwais & Sweet Manufacturers',
          share: '20%',
          strength: 'Large captive daily consumption, deep local standing.',
          weakness: 'Primarily consumer of milk, not direct home delivery competitor.'
        }
      ],
      marketConcentration: 'Concentrated primarily along main bazaar road and central collection routes.'
    };
  }

  // 3. FOOD & AGRO PROCESSING
  if (domainKey === BUSINESS_DOMAINS.AGRI_FOOD_PROCESSING) {
    return {
      overallLevel: 'MODERATE',
      badgeColor: 'amber',
      innerRadiusCount: localOverrides.competitorInnerCount || '3–5 local flour/oil mills or cottage food producers',
      outerRadiusCount: localOverrides.competitorOuterCount || '8–15 commercial packaged food stockists & wholesalers',
      categories: [
        {
          name: 'National FMCG Food Brands',
          share: '55%',
          strength: 'Massive distribution reach, TV advertising, glossy multi-layer packaging.',
          weakness: 'Higher price points, extended storage with chemical preservatives, lack of regional flavor customization.'
        },
        {
          name: 'Traditional Loose Commodity Flour/Spice Mills',
          share: '35%',
          strength: 'Low processing fee, customer brings own grain.',
          weakness: 'Dusty environment, unhygienic open storage, no branding or shelf life.'
        },
        {
          name: 'Emerging Local Packaged Micro-Brands',
          share: '10%',
          strength: 'Regional pride, fresh local taste.',
          weakness: 'Inconsistent supply chain and thin marketing capital.'
        }
      ],
      marketConcentration: 'Industrial grain mandi corridor and primary market bazaar.'
    };
  }

  // Default / Other
  return {
    overallLevel: 'MODERATE',
    badgeColor: 'emerald',
    innerRadiusCount: localOverrides.competitorInnerCount || (isRural ? '2–5 similar local commercial units' : '5–10 local competitors'),
    outerRadiusCount: localOverrides.competitorOuterCount || (isRural ? '7–14 regional competitors' : '15–25 commercial units in 10 km'),
    categories: [
      {
        name: 'Established Traditional Incumbents',
        share: '55%',
        strength: 'Decades of local standing, personal familiarity, informal credit lines.',
        weakness: 'Slow to innovate, aging equipment, limited after-sales attention.'
      },
      {
        name: 'New Local Micro-Entrants',
        share: '30%',
        strength: 'Aggressive pricing, energetic customer approach.',
        weakness: 'Thin working capital, high vulnerability to early cashflow squeezes.'
      },
      {
        name: 'Distant District Wholesale Distributors',
        share: '15%',
        strength: 'High variety and bulk buying power.',
        weakness: 'Impersonal service and minimum order quantity barriers.'
      }
    ],
    marketConcentration: 'Primary commercial roads and central market junctions.'
  };
}

function generateDomainDifferentiationStrategy(domainInfo, finances, isRural) {
  const { domainKey } = domainInfo;

  // Farm Equipment
  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      positioningHeadline: 'Affordable, durable farm implements engineered specifically for local soil conditions with guaranteed local spare parts.',
      coreAdvantage: 'Cost-effectiveness + Terrain-Specific Engineering + On-Farm Field Trials',
      whyThisBeatsCompetitors: 'Corporate machinery brands are too bulky and expensive for smallholder farmers, while village blacksmiths produce brittle tools with no safety standards. By providing sturdy, lightweight implements with hardened wear plates and immediate local spare-parts availability, you solve the farmer’s biggest frustration: equipment downtime during brief harvesting windows.',
      actionableTactics: [
        'Offer a free 2-day on-farm trial so the farmer visibly calculates the savings in manual labor wages before buying.',
        'Keep top 10 fast-wearing spare parts (blades, tines, nozzles, belts) pre-stocked in the workshop for same-day replacement.',
        'Assist buyers in applying for the 40–50% Sub-Mission on Agricultural Mechanization (SMAM) government subsidy.'
      ],
      pricingDiscipline: 'Price at an accessible one-time investment level that a small farmer can recoup within 1–2 crop seasons.'
    };
  }

  // Dairy
  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return {
      positioningHeadline: 'Affordable, pure, doorstep morning fulfillment for residential households within 5 km.',
      coreAdvantage: 'Superior convenience + unadulterated freshness guarantee',
      whyThisBeatsCompetitors: 'Traditional milkmen are inconsistent in delivery timing, while packaged dairy lacks fresh raw purity. Providing transparent fat-testing and timed doorstep drops builds non-price loyalty.',
      actionableTactics: [
        'Offer first 3 days trial at cost price to secure monthly household milk cards.',
        'Carry a portable digital lactometer / fat tester during customer onboarding to visibly prove purity.',
        'Use WhatsApp broadcast to announce morning dispatch time and accept extra evening curd/ghee orders.'
      ],
      pricingDiscipline: 'Do not trigger a price war against low-grade diluted milk; price at fair mid-range with visible quality transparency.'
    };
  }

  // Default
  return {
    positioningHeadline: 'Proximity, reliable availability, and personal customer service tailored to local neighborhood needs.',
    coreAdvantage: 'Proximity + Relationship-driven customer service',
    whyThisBeatsCompetitors: 'Competitors in the central bazaar often neglect peripheral customers and provide rushed service. Offering warm, attentive service, convenient hours, and prompt follow-up wins enduring neighborhood loyalty.',
    actionableTactics: [
      'Engage directly with local community leaders and nearby resident associations.',
      'Maintain reliable business hours, especially during early morning and evening peak intervals.',
      'Adopt instant digital UPI QR payments alongside transparent receipts.'
    ],
    pricingDiscipline: 'Position at a fair, competitive mid-tier price point that covers operating costs without initiating a destructive race to the bottom.'
  };
}
