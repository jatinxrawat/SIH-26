/**
 * Product Market Value & Pricing Strategy Service
 * Analyzes:
 * - Regional purchasing power & local price sensitivity
 * - Indicative market price range based on regional cost of living & domain benchmarks
 * - Unit economics (Selling price, estimated variable cost, gross unit contribution)
 * 
 * Strict Principle:
 * Grounded strictly in businessDomainClassifier.
 */

import { getRegionalMarketData } from './marketDataService';
import { classifyBusinessDomain, BUSINESS_DOMAINS } from './businessDomainClassifier';

export function analyzeProductPricing(profile, localOverrides = {}) {
  const personal = profile?.personalInfo || {};
  const business = profile?.business || {};

  const state = personal.state || 'Mizoram';
  const district = personal.district || 'Aizawl';
  const isRural = (personal.ruralUrban || '').toUpperCase() === 'RURAL';

  const regionalMarket = getRegionalMarketData(state, district, isRural);
  const domainInfo = classifyBusinessDomain(business, personal);

  // Derive domain-accurate indicative pricing benchmark
  const pricingBenchmark = getDomainPricingBenchmark(domainInfo, isRural, localOverrides);

  // Unit economics
  const unitSellingPrice = localOverrides.unitSellingPrice || pricingBenchmark.indicativePrice;
  const unitVariableCost = localOverrides.unitVariableCost || pricingBenchmark.estimatedVariableCost;
  const grossContribution = Math.max(0, unitSellingPrice - unitVariableCost);
  const grossMarginPercent = unitSellingPrice > 0 ? Math.round((grossContribution / unitSellingPrice) * 100) : 0;

  // Purchasing power analysis
  const priceSensitivity = isRural ? 'High (ROI & Value Driven)' : 'Moderate to High';
  const purchasingPowerVerdict = domainInfo.domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY
    ? 'Farmers evaluate machinery strictly on labor-saving payback: with manual labor costing ₹350–₹500/day, equipment priced in this bracket pays for itself within 1–2 crop seasons, making it an economically compelling investment.'
    : (isRural
      ? 'Local rural consumers are highly conscious of cash outlay; value-for-money and clear utility transparency outweigh luxury premium branding.'
      : 'Semi-urban and commercial buyers are willing to pay a 10–15% premium for assured build quality, reliability, and prompt after-sales support.');

  return {
    domainTitle: domainInfo.domainTitle,
    productName: business.productService || business.name || 'Primary Product / Implement',
    unitType: pricingBenchmark.unitType,
    recommendedPriceRange: {
      low: pricingBenchmark.rangeLow,
      high: pricingBenchmark.rangeHigh,
      indicativePrice: unitSellingPrice,
      displayRange: `₹${pricingBenchmark.rangeLow.toLocaleString('en-IN')} – ₹${pricingBenchmark.rangeHigh.toLocaleString('en-IN')} / ${pricingBenchmark.unitType}`
    },
    unitEconomics: {
      sellingPrice: unitSellingPrice,
      variableCost: unitVariableCost,
      grossContribution,
      grossMarginPercent,
      displaySellingPrice: `₹${unitSellingPrice.toLocaleString('en-IN')} / ${pricingBenchmark.unitType}`,
      displayVariableCost: `₹${unitVariableCost.toLocaleString('en-IN')} / ${pricingBenchmark.unitType}`,
      displayGrossContribution: `₹${grossContribution.toLocaleString('en-IN')} / ${pricingBenchmark.unitType} (${grossMarginPercent}% margin)`,
      costBreakdown: pricingBenchmark.costBreakdown
    },
    purchasingPower: {
      regionalIndex: regionalMarket.purchasingPowerIndex,
      priceSensitivity,
      monthlyPerCapitaExp: isRural ? regionalMarket.monthlyPerCapitaExpRural : regionalMarket.monthlyPerCapitaExpUrban,
      verdict: purchasingPowerVerdict,
      strategicGuidance: domainInfo.domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY
        ? 'Frame pricing in terms of labor wages saved per acre per season; leverage SMAM subsidy linkages to lower effective out-of-pocket cost by 40–50%.'
        : 'Adopt a competitive penetration pricing model initially to build volume and farmer trust before introducing higher-spec premium attachments.'
    },
    confidence: regionalMarket.confidence,
    source: `${regionalMarket.source} & Ministry of Agriculture Implement Cost Benchmarks`,
    dataYear: regionalMarket.dataYear,
    disclaimer: 'Indicative pricing guidance based on regional purchasing power and prevailing manufacturing ranges. Actual prices vary by raw steel grades, motor capacity, and custom attachments.'
  };
}

function getDomainPricingBenchmark(domainInfo, isRural, overrides) {
  const { domainKey } = domainInfo;

  // 1. AGRICULTURAL EQUIPMENT & FARM MACHINERY
  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return {
      unitType: 'Implement / Machine Unit',
      rangeLow: overrides.rangeLow || 7500,
      rangeHigh: overrides.rangeHigh || 28000,
      indicativePrice: overrides.unitSellingPrice || 14500,
      estimatedVariableCost: overrides.unitVariableCost || 9200,
      costBreakdown: [
        { item: 'Structural steel, frame tubing & hardened wear blades', cost: '₹4,500 - ₹5,800' },
        { item: 'Small engine / motor / gearbox / spray pump component', cost: '₹2,600 - ₹3,600' },
        { item: 'Fasteners, welding wire, bearings & anti-corrosion paint', cost: '₹900 - ₹1,400' },
        { item: 'Assembly labor, calibration & pre-dispatch trial run', cost: '₹800 - ₹1,200' }
      ]
    };
  }

  // 2. DAIRY & ANIMAL HUSBANDRY
  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    const low = isRural ? 46 : 50;
    const high = isRural ? 56 : 64;
    const mid = isRural ? 52 : 58;
    const varCost = isRural ? 36 : 41;

    return {
      unitType: 'Liter',
      rangeLow: overrides.rangeLow || low,
      rangeHigh: overrides.rangeHigh || high,
      indicativePrice: overrides.unitSellingPrice || mid,
      estimatedVariableCost: overrides.unitVariableCost || varCost,
      costBreakdown: [
        { item: 'Raw milk procurement / Animal feed', cost: isRural ? '₹30 - ₹34' : '₹34 - ₹38' },
        { item: 'Chilling, filtration & hygienic handling', cost: '₹3.50 - ₹5.00' },
        { item: 'Local delivery transit fuel / electric bike', cost: '₹2.50 - ₹3.50' }
      ]
    };
  }

  // 3. FOOD & AGRO PROCESSING
  if (domainKey === BUSINESS_DOMAINS.AGRI_FOOD_PROCESSING) {
    return {
      unitType: 'Packaged Unit / Kg',
      rangeLow: overrides.rangeLow || 65,
      rangeHigh: overrides.rangeHigh || 160,
      indicativePrice: overrides.unitSellingPrice || 95,
      estimatedVariableCost: overrides.unitVariableCost || 58,
      costBreakdown: [
        { item: 'Direct agricultural raw grain / produce input', cost: '₹35 - ₹48' },
        { item: 'Milling / processing power & machine wear', cost: '₹8 - ₹12' },
        { item: 'Food-grade pouch packaging & barcode labeling', cost: '₹6 - ₹9' }
      ]
    };
  }

  // Default Standard Unit Benchmark
  const low = isRural ? 250 : 450;
  const high = isRural ? 1200 : 2500;
  const mid = isRural ? 650 : 1250;
  const varCost = isRural ? 380 : 750;

  return {
    unitType: domainInfo.unitTypeLabel || 'Standard Unit',
    rangeLow: overrides.rangeLow || low,
    rangeHigh: overrides.rangeHigh || high,
    indicativePrice: overrides.unitSellingPrice || mid,
    estimatedVariableCost: overrides.unitVariableCost || varCost,
    costBreakdown: [
      { item: 'Direct raw materials & components', cost: '₹220 - ₹450' },
      { item: 'Direct fabrication / assembly labor', cost: '₹100 - ₹200' },
      { item: 'Utilities, consumables & packaging', cost: '₹60 - ₹100' }
    ]
  };
}
