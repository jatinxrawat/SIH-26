/**
 * SIH Requirement 1 — Local Market Reach Service
 * Analyzes:
 * - 0–5 km immediate primary market
 * - 5–10 km extended local market
 * - Population & household estimates with source citations
 * - Sector-specific customer segmentation strictly driven by businessDomainClassifier
 * - Practical distribution channel evaluation with localized rationales
 */

import { getRegionalMarketData } from './marketDataService';
import { classifyBusinessDomain, BUSINESS_DOMAINS } from './businessDomainClassifier';

export function analyzeMarketReach(profile, localOverrides = {}) {
  const personal = profile?.personalInfo || {};
  const business = profile?.business || {};
  const isRural = (personal.ruralUrban || '').toUpperCase() === 'RURAL';
  const state = personal.state || 'Mizoram';
  const district = personal.district || 'Aizawl';
  const locality = personal.locality || business.location || 'Local Trade Hub';

  const marketData = getRegionalMarketData(state, district, isRural);
  const domainInfo = classifyBusinessDomain(business, personal);

  // Sector & description-tailored customer segmentation
  const customerSegments = getSectorSpecificCustomerSegments(domainInfo, business, isRural);

  // Distribution channels tailored to business model
  const distributionChannels = getSectorSpecificDistributionChannels(domainInfo, business, isRural);

  // 5-10 km radius geographical profile
  const primaryRadiusKm = 5;
  const extendedRadiusKm = 10;

  const primaryReach = {
    radiusKm: primaryRadiusKm,
    label: `0–${primaryRadiusKm} km Primary Catchment`,
    focus: domainInfo.isMachinery
      ? 'Immediate local farmers, nearby village clusters, and direct farm trial territory'
      : 'Immediate local walk-in & doorstep customer base',
    estimatedPopulation: localOverrides.innerPopulationEstimate || marketData.localMarketRadiusDefaults.innerPopulationEstimate,
    estimatedHouseholds: localOverrides.innerHouseholdsEstimate || marketData.localMarketRadiusDefaults.innerHouseholdsEstimate,
    densityCharacteristic: isRural ? 'Clustered village settlements & agricultural plots' : 'Dense residential pockets & local bazaar road frontage',
    connectivity: isRural ? 'Panchayat link roads, village main road, tractor/pickup trail access' : 'Paved municipal arterial roads, high pedestrian bazaar density',
    accessibilityScore: 'High (10–15 min transit)',
    keySettlements: [
      `${locality} core cluster`,
      'Adjacent farming hamlet (0-3 km)',
      'Primary market crossroads / bus stop'
    ]
  };

  const extendedReach = {
    radiusKm: extendedRadiusKm,
    label: `${primaryRadiusKm}–${extendedRadiusKm} km Extended Catchment`,
    focus: domainInfo.isMachinery
      ? 'Block agricultural clusters, Farmer Producer Organizations (FPOs), and regional dealers'
      : 'Secondary consumer demand, weekly haat visitors, and institutional buyers',
    estimatedPopulation: localOverrides.outerPopulationEstimate || marketData.localMarketRadiusDefaults.outerPopulationEstimate,
    estimatedHouseholds: localOverrides.outerHouseholdsEstimate || marketData.localMarketRadiusDefaults.outerHouseholdsEstimate,
    densityCharacteristic: isRural ? 'Neighboring panchayats, satellite hamlets & weekly bazaar centers' : 'Suburban housing colonies, semi-urban industrial nodes',
    connectivity: isRural ? 'District link roads, state highway connection, rural feeder transport' : 'State highway corridor, multi-modal public transit & mini-truck access',
    accessibilityScore: 'Moderate (25–35 min transit)',
    keySettlements: [
      'Sub-district tehsil headquarters / Block center',
      'Regional weekly Haat / Agricultural Mandi',
      'High-traffic junction / highway service corridor'
    ]
  };

  return {
    locationOverview: {
      locality,
      district,
      state,
      ruralUrban: isRural ? 'Rural' : 'Urban / Semi-Urban',
      purchasingPowerIndex: marketData.purchasingPowerIndex,
      ruralPerCapitaExp: marketData.monthlyPerCapitaExpRural,
      urbanPerCapitaExp: marketData.monthlyPerCapitaExpUrban,
      domainTitle: domainInfo.domainTitle
    },
    domainInfo,
    primaryReach,
    extendedReach,
    customerSegments,
    distributionChannels,
    confidence: marketData.confidence,
    source: marketData.source,
    dataYear: marketData.dataYear
  };
}

/**
 * Returns dynamic customer segments grounded strictly in the entrepreneur's true trade
 */
function getSectorSpecificCustomerSegments(domainInfo, business, isRural) {
  const { domainKey } = domainInfo;

  // 1. AGRICULTURAL EQUIPMENT & FARM MACHINERY
  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return [
      {
        name: 'Small & Marginal Farmers (0.5–3 Acres)',
        relevance: 'Primary Target Base',
        shareEstimate: '45–55%',
        profile: 'Cultivators seeking affordable, lightweight handheld or small-engine powered weeders, sprayers, seeders, and manual tools to eliminate expensive daily labor hire.',
        keyDemandDriver: 'Cost-effectiveness, reduction in manual drudgery, lightweight portability on terraced/undulating plots, and simple local repairability.'
      },
      {
        name: 'Medium & Progressive Commercial Farmers',
        relevance: 'High Value Purchasers',
        shareEstimate: '20–25%',
        profile: 'Farmers growing cash crops, vegetables, or spices needing durable multi-crop attachments, motorized tillers, and specialized post-harvest tools.',
        keyDemandDriver: 'Build durability, warranty, speed of field operation, and readily available replacement blades/spares.'
      },
      {
        name: 'Farmer Producer Organizations (FPOs) & PACS',
        relevance: 'Institutional Bulk Buyers',
        shareEstimate: '15–20%',
        profile: 'Registered farmer collectives and Primary Agricultural Credit Societies purchasing machinery pools for shared member use or Custom Hiring Centers (CHCs).',
        keyDemandDriver: 'Government subsidy eligibility (SMAM/AIF), group demonstration training, and formal GST tax invoicing.'
      },
      {
        name: 'Local Machinery Rental Operators / Custom Hiring Centers',
        relevance: 'Recurring Spares & Units',
        shareEstimate: '10%',
        profile: 'Village entrepreneurs renting out agricultural equipment to neighboring farmers on hourly/daily rates.',
        keyDemandDriver: 'Heavy-duty ruggedness, continuous run-time reliability, and rapid availability of wear parts.'
      }
    ];
  }

  // 2. DAIRY & ANIMAL HUSBANDRY
  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return [
      {
        name: 'Neighborhood Residential Households',
        relevance: 'Primary Daily Recurring',
        shareEstimate: '45–55%',
        profile: 'Local families buying fresh daily milk and dairy staples; prioritize morning punctuality, purity, and lack of adulteration.',
        keyDemandDriver: 'Fresh raw milk aroma, verified fat content, and dependable doorstep delivery.'
      },
      {
        name: 'Local Tea Stalls & Sweet Manufacturers (Halwais)',
        relevance: 'High Volume B2B',
        shareEstimate: '25–30%',
        profile: 'Daily commercial establishments requiring 10–40 liters of milk on weekly settlement cycles.',
        keyDemandDriver: 'Punctual 6:00 AM delivery, standardized SNF/fat metrics, and stable contract pricing.'
      },
      {
        name: 'Village Grocery Stores & Retail Outlets',
        relevance: 'Packaged Products',
        shareEstimate: '15%',
        profile: 'Retailers selling branded curd, paneer, and pouch milk at standard distributor margins.',
        keyDemandDriver: 'Retail margin (10–15%) and return of unsold inventory.'
      },
      {
        name: 'Institutional Canteens & Hostels',
        relevance: 'Contract Bulk',
        shareEstimate: '10%',
        profile: 'Schools, colleges, or small hospital canteens requiring scheduled supply.',
        keyDemandDriver: 'FSSAI hygiene compliance and scheduled deliveries.'
      }
    ];
  }

  // 3. AGRO & FOOD PROCESSING
  if (domainKey === BUSINESS_DOMAINS.AGRI_FOOD_PROCESSING) {
    return [
      {
        name: 'Local Grocery & Provision Stores (Kiranas)',
        relevance: 'Primary Retail Reach',
        shareEstimate: '40–50%',
        profile: 'Neighborhood retailers stocking branded packaged flours, spices, oils, or processed food items.',
        keyDemandDriver: '12–18% trade retail margin, tamper-proof packaging, and rapid shelf replenishment.'
      },
      {
        name: 'Direct Household Consumers & Urban Buyers',
        relevance: 'D2C High Margin',
        shareEstimate: '25–30%',
        profile: 'Health-conscious families seeking authentic, cold-pressed, or unadulterated traditional food products.',
        keyDemandDriver: 'FSSAI compliance, purity guarantee, hygienic packaging, and natural ingredients.'
      },
      {
        name: 'Restaurants, Dhabas & Catering Units',
        relevance: 'Institutional Bulk',
        shareEstimate: '15–20%',
        profile: 'Local food businesses consuming bulk 5kg / 15kg catering packs of culinary staples.',
        keyDemandDriver: 'Consistent taste, wholesale volume discounts, and 15-day credit lines.'
      },
      {
        name: 'Regional Supermarkets & Town Distributors',
        relevance: 'Expansion Channel',
        shareEstimate: '10%',
        profile: 'Organized retailers seeking regionally branded traditional specialties.',
        keyDemandDriver: 'Standard barcode labeling, steady shelf-life, and promotional support.'
      }
    ];
  }

  // 4. TEXTILE, APPAREL & TAILORING
  if (domainKey === BUSINESS_DOMAINS.TEXTILE_APPAREL_FASHION) {
    return [
      {
        name: 'Local Women & Household Buyers',
        relevance: 'Core Custom Work',
        shareEstimate: '50–60%',
        profile: 'Women ordering bespoke blouses, kurtas, festive suits, and routine garment alterations.',
        keyDemandDriver: 'Accurate fit, timely delivery before wedding/festivals, and trusted craftsmanship.'
      },
      {
        name: 'School Students & Institutional Uniform Buyers',
        relevance: 'Seasonal Bulk',
        shareEstimate: '20–25%',
        profile: 'Parents of children attending nearby schools during re-opening periods.',
        keyDemandDriver: 'Affordable batch rates, durable double stitching, and correct school fabric.'
      },
      {
        name: 'Boutiques & Town Resellers',
        relevance: 'Contract Job-Work',
        shareEstimate: '15%',
        profile: 'Fashion boutiques outsourcing basic stitching or embroidery during peak seasons.',
        keyDemandDriver: 'Fast turnaround and competitive piece-rate pricing.'
      }
    ];
  }

  // 5. TECH & ELECTRONICS REPAIR
  if (domainKey === BUSINESS_DOMAINS.TECH_ELECTRONICS_REPAIR) {
    return [
      {
        name: 'Local Smartphone Users & Rural Youth',
        relevance: 'Walk-in Retail',
        shareEstimate: '55–65%',
        profile: 'Residents needing screen replacements, charging port fixes, batteries, and accessories.',
        keyDemandDriver: 'Quick turnaround (within hours), transparent part pricing, and replacement warranty.'
      },
      {
        name: 'Local Merchants & POS Device Operators',
        relevance: 'Commercial Priority',
        shareEstimate: '20–25%',
        profile: 'Kirana owners and digital agents needing quick repairs on UPI soundboxes, printers, and phones.',
        keyDemandDriver: 'Zero business downtime and reliable component repairs.'
      },
      {
        name: 'Students & Competitive Exam Aspirants',
        relevance: 'Recurring Accessories',
        shareEstimate: '15%',
        profile: 'Young consumers purchasing budget earphones, chargers, and protective cases.',
        keyDemandDriver: 'Pocket-friendly pricing and friendly technical advice.'
      }
    ];
  }

  // 6. MANUFACTURING & FABRICATION
  if (domainKey === BUSINESS_DOMAINS.MANUFACTURING_FABRICATION) {
    return [
      {
        name: 'Local Contractors & Home Builders',
        relevance: 'Primary Commercial',
        shareEstimate: '45–55%',
        profile: 'Contractors ordering custom metal gates, window grills, structural trusses, and building fittings.',
        keyDemandDriver: 'Structural strength, timely site delivery, and custom dimension fabrication.'
      },
      {
        name: 'Retail Hardware Stores & Material Dealers',
        relevance: 'Wholesale Offtake',
        shareEstimate: '25–30%',
        profile: 'Hardware shops stocking standard fabricated steel fixtures, brackets, and farm implements.',
        keyDemandDriver: 'Competitive dealer margins and consistent weld finishing.'
      },
      {
        name: 'Individual Household & Farm Owners',
        relevance: 'Direct Custom Orders',
        shareEstimate: '20%',
        profile: 'Villagers needing custom shed roofing, water tank stands, or fence fabrication.',
        keyDemandDriver: 'Local proximity, personal design consultation, and reasonable labor charges.'
      }
    ];
  }

  // 7. DEFAULT / GENERAL ENTERPRISE
  return [
    {
      name: 'Local Village & Ward Residents',
      relevance: 'Core Retail Demand',
      shareEstimate: isRural ? '60–70%' : '50–55%',
      profile: `Direct consumers living within 3–5 km radius seeking reliable access to ${domainInfo.domainTitle.toLowerCase()}.`,
      keyDemandDriver: 'Convenience, personal rapport with owner, and fair local pricing.'
    },
    {
      name: 'Small Retailers & Commercial Partners',
      relevance: 'B2B Wholesale / Trade',
      shareEstimate: '20–25%',
      profile: 'Shopkeepers and service providers in neighboring settlements requiring regular supply.',
      keyDemandDriver: 'Predictable replenishment schedules and credit terms.'
    },
    {
      name: 'Regional Haat & Market Center Visitors',
      relevance: 'Cash Transactions',
      shareEstimate: '15–20%',
      profile: 'Shoppers traveling to the local commercial center on weekly market days.',
      keyDemandDriver: 'Visible product display, immediate stock availability, and reliable after-sales service.'
    }
  ];
}

/**
 * Returns practical distribution channels with localized rationales
 */
function getSectorSpecificDistributionChannels(domainInfo, business, isRural) {
  const { domainKey } = domainInfo;

  // Farm Equipment Channels
  if (domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY) {
    return [
      {
        channel: 'Direct On-Farm Live Demonstrations',
        type: 'Experiential Direct Sales',
        recommended: true,
        priority: 'High Priority (Top Driver)',
        reachRadius: '0–10 km',
        marginRetention: '100% (No dealer commission)',
        whyItWorks: 'Farmers rarely purchase unproven machinery from brochures. Conducting live 20-minute field trials on a local farm proves machine efficiency on regional soil and converts skeptical farmers immediately.'
      },
      {
        channel: 'Local Tractor & Agri-Implement Dealerships',
        type: 'B2B Retail Partner Placement',
        recommended: true,
        priority: 'Growth Scale',
        reachRadius: '5–10 km',
        marginRetention: '85–88% (12–15% dealer trade margin)',
        whyItWorks: 'Tractor and spare-parts dealers in the block town have high footfall of farmers with investable cash looking for implement attachments.'
      },
      {
        channel: 'FPO & Cooperative Bulk Showcases',
        type: 'Institutional Collective Orders',
        recommended: true,
        priority: 'High Advantage',
        reachRadius: '0–10 km',
        marginRetention: '92–95%',
        whyItWorks: 'Farmer Producer Organizations (FPOs) and Primary Agricultural Credit Societies (PACS) pool government machinery grants (SMAM/AIF) to purchase multiple units at once.'
      },
      {
        channel: 'Kisan Melas, KVK Exhibits & Weekly Haats',
        type: 'Agricultural Aggregation Events',
        recommended: true,
        priority: 'Seasonal Showcase',
        reachRadius: '5–10 km',
        marginRetention: '95–98%',
        whyItWorks: 'Block agricultural fairs and Krishi Vigyan Kendra (KVK) demonstration plots concentrate hundreds of progressive farmers seeking labor-saving innovations.'
      },
      {
        channel: 'WhatsApp Video Demos & Local Demonstration Network',
        type: 'Digital Video Word-of-Mouth',
        recommended: true,
        priority: 'Zero-Cost Booster',
        reachRadius: '0–15 km',
        marginRetention: '100%',
        whyItWorks: '30-second clips showing your equipment weeding or harvesting local crops shared across farmer WhatsApp groups generate direct inquiries from neighboring villages.'
      }
    ];
  }

  // Dairy Channels
  if (domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY) {
    return [
      {
        channel: 'Direct Morning Doorstep Delivery Route',
        type: 'D2C Subscription',
        recommended: true,
        priority: 'High Priority',
        reachRadius: '0–5 km',
        marginRetention: '100%',
        whyItWorks: 'Captures regular daily household milk cash flow without paying middlemen cuts.'
      },
      {
        channel: 'Local Halwai & Tea Stall Bulk Delivery',
        type: 'B2B Commercial Contract',
        recommended: true,
        priority: 'Volume Driver',
        reachRadius: '0–8 km',
        marginRetention: '92–95%',
        whyItWorks: 'Absorbs daily bulk volume on predictable schedules.'
      },
      {
        channel: 'Dairy Co-operative Collection Center',
        type: 'Surplus Offload',
        recommended: true,
        priority: 'Safety Net',
        reachRadius: '0–5 km',
        marginRetention: '85–90%',
        whyItWorks: 'Guaranteed buyer for any surplus milk not consumed by direct retail.'
      }
    ];
  }

  // Standard/Default Channels
  return [
    {
      channel: 'Direct Customer Sales (Own Workshop / Shop)',
      type: 'Direct-to-Consumer (D2C)',
      recommended: true,
      priority: 'High Priority',
      reachRadius: '0–5 km',
      marginRetention: '100%',
      whyItWorks: 'Establishes direct brand recognition, builds immediate personal trust with customers, and provides zero-delay cash collection.'
    },
    {
      channel: 'Local Retailer & Reseller Placement',
      type: 'B2B Micro-Retail Wholesale',
      recommended: true,
      priority: 'Growth Scale',
      reachRadius: '3–10 km',
      marginRetention: '82–88%',
      whyItWorks: 'Leverages existing footfall of established shops in neighboring hamlets without opening new physical branches.'
    },
    {
      channel: 'Weekly Haats & Periodic Community Markets',
      type: 'Periodic Aggregation',
      recommended: isRural,
      priority: isRural ? 'High Priority' : 'Secondary',
      reachRadius: '5–10 km',
      marginRetention: '92–96%',
      whyItWorks: 'Weekly haats concentrate thousands of rural buyers from surrounding villages into a single shopping window.'
    },
    {
      channel: 'Direct Phone & WhatsApp Catalog Ordering',
      type: 'Hyper-Local Direct',
      recommended: true,
      priority: 'Low Cost Booster',
      reachRadius: '0–10 km',
      marginRetention: '98%',
      whyItWorks: 'Enables prompt quotation sharing, pre-booking of custom orders, and UPI digital payments.'
    }
  ];
}
