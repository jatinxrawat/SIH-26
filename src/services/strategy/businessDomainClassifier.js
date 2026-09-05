/**
 * Business Domain & Semantic Profiling Classifier
 * 
 * Deeply analyzes:
 * - business.description (e.g. "makes cost effective innovative farming equipments for farmers")
 * - business.productService (e.g. "Farming equipment, small weeders, seeders")
 * - business.name (e.g. "AgriGrow")
 * - business.targetCustomers (e.g. "Farmers, cooperatives")
 * - business.sector
 * 
 * Principle:
 * NEVER make crude keyword assumptions (like thinking any "Agri" or "Farm" means "Dairy Milk & Halwais").
 * Intelligently recognizes specific trades: Farm Equipment, Food Processing, Dairy, Manufacturing, etc.
 */

export const BUSINESS_DOMAINS = {
  AGRI_EQUIPMENT_MACHINERY: 'AGRI_EQUIPMENT_MACHINERY',
  AGRI_CROP_FARMING: 'AGRI_CROP_FARMING',
  AGRI_INPUTS: 'AGRI_INPUTS',
  AGRI_FOOD_PROCESSING: 'AGRI_FOOD_PROCESSING',
  DAIRY_ANIMAL_HUSBANDRY: 'DAIRY_ANIMAL_HUSBANDRY',
  MANUFACTURING_FABRICATION: 'MANUFACTURING_FABRICATION',
  TEXTILE_APPAREL_FASHION: 'TEXTILE_APPAREL_FASHION',
  TECH_ELECTRONICS_REPAIR: 'TECH_ELECTRONICS_REPAIR',
  RETAIL_KIRANA_COMMERCE: 'RETAIL_KIRANA_COMMERCE',
  SERVICES_LOGISTICS_TRANSPORT: 'SERVICES_LOGISTICS_TRANSPORT',
  HEALTH_EDUCATION_HOSPITALITY: 'HEALTH_EDUCATION_HOSPITALITY',
  GENERAL_ENTERPRISE: 'GENERAL_ENTERPRISE'
};

export function classifyBusinessDomain(business = {}, personal = {}) {
  const name = (business.name || '').toLowerCase();
  const desc = (business.description || '').toLowerCase();
  const product = (business.productService || '').toLowerCase();
  const target = (business.targetCustomers || '').toLowerCase();
  const sector = (business.sector || '').toLowerCase();
  const type = (business.type || '').toLowerCase();

  const combinedText = `${name} ${desc} ${product} ${target} ${sector} ${type}`.toLowerCase();

  // 1. AGRICULTURAL EQUIPMENT, FARM MACHINERY & AGRI-TOOLS
  const equipKeywords = [
    'equipment', 'equipments', 'machinery', 'machine', 'machines', 'implement', 'implements',
    'tool', 'tools', 'tractor', 'tiller', 'power tiller', 'weeder', 'sprayer', 'harvester',
    'thresher', 'seed drill', 'plough', 'plow', 'irrigation equipment', 'drip', 'solar pump',
    'farm mechanization', 'farming equipment', 'farming tool', 'agritech hardware',
    'agricultural equipment', 'farming tools', 'combine', 'cultivator', 'rotavator'
  ];
  const hasEquipKeyword = equipKeywords.some(k => combinedText.includes(k));
  const isFarmerTargeted = combinedText.includes('farmer') || combinedText.includes('farming') || combinedText.includes('agriculture') || combinedText.includes('agri');

  if (hasEquipKeyword && isFarmerTargeted) {
    return {
      domainKey: BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY,
      domainTitle: 'Agricultural Equipment & Farm Machinery',
      tradeCategory: 'Manufacturing & Engineering',
      primaryTargetAudience: 'Smallholder & Commercial Farmers, FPOs, CHCs, and Agro-Dealers',
      unitTypeLabel: 'Equipment / Implement Unit',
      isMachinery: true,
      isFoodOrDairy: false,
      summaryExplanation: 'Enterprise designing, fabricating, assembling, or distributing mechanization tools, implements, and machinery to increase agricultural productivity.'
    };
  }

  // 2. DAIRY & ANIMAL HUSBANDRY (Strict check: must explicitly mention milk, dairy, cattle, cow, buffalo, poultry, goat)
  const dairyKeywords = [
    'dairy', 'milk', 'dudhiya', 'cow', 'buffalo', 'cattle', 'ghee', 'paneer', 'butter', 'curd',
    'poultry', 'broiler', 'layer', 'egg', 'goat farming', 'sheep', 'piggery', 'fishery', 'fish farm',
    'aquaculture', 'animal husbandry', 'livestock'
  ];
  const hasDairyKeyword = dairyKeywords.some(k => combinedText.includes(k));
  // Ensure it's not dairy equipment
  if (hasDairyKeyword && !hasEquipKeyword) {
    return {
      domainKey: BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY,
      domainTitle: 'Dairy & Animal Husbandry',
      tradeCategory: 'Livestock & Dairy Production',
      primaryTargetAudience: 'Households, Tea Stalls, Sweet Manufacturers (Halwais), and Dairy Unions',
      unitTypeLabel: 'Liter / Kilogram',
      isMachinery: false,
      isFoodOrDairy: true,
      summaryExplanation: 'Enterprise engaged in dairy farming, milk collection, chilling, livestock rearing, or poultry/fishery production.'
    };
  }

  // 3. AGRO & FOOD PROCESSING (Value-addition to farm produce)
  const foodProcessingKeywords = [
    'food processing', 'processing', 'flour mill', 'atta chakki', 'oil mill', 'oil expeller',
    'spice grinding', 'masala', 'fruit pulp', 'puree', 'pickle', 'bakery', 'jam', 'jelly', 'honey',
    'chips', 'dal mill', 'rice mill', 'organic food', 'packaged food', 'cold pressed', 'edible oil'
  ];
  if (foodProcessingKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.AGRI_FOOD_PROCESSING,
      domainTitle: 'Agro & Food Processing',
      tradeCategory: 'Value-Added Food Manufacturing',
      primaryTargetAudience: 'Retail Consumers, Kirana Stores, Supermarkets, and Bulk Food Brands',
      unitTypeLabel: 'Pack / Kilogram',
      isMachinery: false,
      isFoodOrDairy: true,
      summaryExplanation: 'Enterprise transforming raw agricultural harvests into packaged, processed food products and culinary ingredients.'
    };
  }

  // 4. AGRI-INPUTS & CROP PRODUCTION
  const agriCropKeywords = [
    'crop cultivation', 'vegetable farming', 'horticulture', 'floriculture', 'organic farming',
    'nursery', 'seedling', 'mushroom farming', 'hydroponics', 'polyhouse', 'greenhouse farming'
  ];
  if (agriCropKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.AGRI_CROP_FARMING,
      domainTitle: 'Commercial Crop & Horticulture Production',
      tradeCategory: 'Agricultural Production',
      primaryTargetAudience: 'Wholesale Mandi Traders, Local Retail Vendors, and Direct Consumers',
      unitTypeLabel: 'Quintal / Kilogram',
      isMachinery: false,
      isFoodOrDairy: false,
      summaryExplanation: 'Direct cultivation of cash crops, vegetables, flowers, mushrooms, or fruit plantations.'
    };
  }

  // 5. TEXTILE, GARMENT & TAILORING
  const textileKeywords = [
    'tailor', 'tailoring', 'garment', 'garments', 'boutique', 'cloth', 'apparel', 'textile',
    'stitching', 'dress', 'kurta', 'blouse', 'suit', 'embroidery', 'handloom', 'uniform', 'fashion'
  ];
  if (textileKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.TEXTILE_APPAREL_FASHION,
      domainTitle: 'Textiles, Garment Manufacturing & Tailoring',
      tradeCategory: 'Apparel & Fashion Craft',
      primaryTargetAudience: 'Individual Consumers, Students, Brides, and Local Retail Boutiques',
      unitTypeLabel: 'Garment / Stitching Job',
      isMachinery: false,
      isFoodOrDairy: false,
      summaryExplanation: 'Custom tailoring, apparel manufacturing, fashion design, or garment alterations.'
    };
  }

  // 6. TECH, ELECTRONICS & SMARTPHONE REPAIR
  const techKeywords = [
    'mobile repair', 'phone repair', 'smartphone', 'electronic', 'electronics', 'computer',
    'laptop', 'cctv', 'solar installation', 'solar', 'digital service', 'software', 'it service'
  ];
  if (techKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.TECH_ELECTRONICS_REPAIR,
      domainTitle: 'Electronics, Mobile Repair & Technical Services',
      tradeCategory: 'Technical Services & Repair',
      primaryTargetAudience: 'Local Residents, Students, Micro-Merchants, and Small Businesses',
      unitTypeLabel: 'Service Repair Job / Device',
      isMachinery: false,
      isFoodOrDairy: false,
      summaryExplanation: 'Hardware diagnostics, screen replacements, gadget maintenance, and technical installations.'
    };
  }

  // 7. MANUFACTURING, FABRICATION & WORKSHOP
  const mfgKeywords = [
    'manufacturing', 'fabrication', 'workshop', 'welding', 'carpentry', 'furniture',
    'hardware', 'metal', 'steel', 'plastic', 'packaging material', 'building material', 'bricks'
  ];
  if (mfgKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.MANUFACTURING_FABRICATION,
      domainTitle: 'Light Manufacturing & Engineering Fabrication',
      tradeCategory: 'Manufacturing & Industrial Production',
      primaryTargetAudience: 'Contractors, Local Businesses, Retail Builders, and Institutional Buyers',
      unitTypeLabel: 'Manufactured Unit / Batch',
      isMachinery: true,
      isFoodOrDairy: false,
      summaryExplanation: 'Fabrication of physical goods, metal structures, parts, or industrial consumables.'
    };
  }

  // 8. RETAIL, GROCERY & KIRANA
  const retailKeywords = [
    'grocery', 'kirana', 'supermarket', 'retail shop', 'store', 'trading', 'wholesaler',
    'distributor', 'provisions', 'fmcg retail', 'merchant'
  ];
  if (retailKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.RETAIL_KIRANA_COMMERCE,
      domainTitle: 'Retail Commerce & Kirana Store',
      tradeCategory: 'Retail Trade',
      primaryTargetAudience: 'Neighborhood Families and Walk-in Consumers',
      unitTypeLabel: 'Basket / Transaction Order',
      isMachinery: false,
      isFoodOrDairy: false,
      summaryExplanation: 'Retail distribution and consumer goods merchandising.'
    };
  }

  // 9. LOGISTICS & TRANSPORT
  const transportKeywords = ['transport', 'logistics', 'delivery', 'cargo', 'truck', 'auto', 'warehouse'];
  if (transportKeywords.some(k => combinedText.includes(k))) {
    return {
      domainKey: BUSINESS_DOMAINS.SERVICES_LOGISTICS_TRANSPORT,
      domainTitle: 'Logistics, Transport & Supply Services',
      tradeCategory: 'Logistics & Transportation',
      primaryTargetAudience: 'Local Farmers, Merchants, Wholesalers, and Mandi Shippers',
      unitTypeLabel: 'Trip / Consignment',
      isMachinery: false,
      isFoodOrDairy: false,
      summaryExplanation: 'Local and inter-district goods transport, last-mile delivery, or freight logistics.'
    };
  }

  // 10. DEFAULT / GENERAL ENTERPRISE (Derive title gracefully)
  return {
    domainKey: BUSINESS_DOMAINS.GENERAL_ENTERPRISE,
    domainTitle: business.sector ? `${business.sector} Enterprise` : 'Local Micro-Enterprise',
    tradeCategory: business.sector || 'General Commerce',
    primaryTargetAudience: business.targetCustomers || 'Local Consumers & Regional Retailers',
    unitTypeLabel: 'Standard Unit',
    isMachinery: false,
    isFoodOrDairy: false,
    summaryExplanation: business.description || 'Specialized commercial goods or professional services tailored to regional demand.'
  };
}
