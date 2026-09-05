/**
 * Deterministic Government Scheme Eligibility & Match Scoring Engine
 * 
 * Strict architectural principle:
 * 1. Deterministic rules evaluate eligibility (ELIGIBLE, POTENTIALLY_ELIGIBLE, NOT_ELIGIBLE).
 * 2. Transparent multi-factor match scoring (0 - 100 points).
 * 3. Never implies "approval probability".
 */

// Helper to parse currency strings (e.g., '₹15,00,000' or '₹12.5 Lakhs' or '1500000') into numbers
export function parseRupeeAmount(val) {
  if (typeof val === 'number') return val;
  if (!val || typeof val !== 'string') return 0;
  
  const clean = val.replace(/[₹,\s]/g, '').trim().toLowerCase();
  
  if (clean.includes('cr') || clean.includes('crore')) {
    const num = parseFloat(clean.replace(/crore|cr/g, ''));
    return isNaN(num) ? 0 : num * 10000000;
  }
  if (clean.includes('l') || clean.includes('lakh') || clean.includes('lakhs')) {
    const num = parseFloat(clean.replace(/lakhs|lakh|l/g, ''));
    return isNaN(num) ? 0 : num * 100000;
  }
  if (clean.includes('k') || clean.includes('thousand')) {
    const num = parseFloat(clean.replace(/thousand|k/g, ''));
    return isNaN(num) ? 0 : num * 1000;
  }
  
  // If it's a range like "5 Lakhs - 10 Lakhs", pick the average or lower bound
  if (clean.includes('-')) {
    const parts = clean.split('-');
    const low = parseRupeeAmount(parts[0]);
    const high = parseRupeeAmount(parts[1]);
    return (low + high) / 2;
  }

  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

// Normalize strings for robust matching
function norm(str) {
  return (str || '').toString().trim().toUpperCase();
}

/**
 * Evaluates whether a scheme applies to the entrepreneur profile.
 * Distinguishes:
 * - 'ELIGIBLE'
 * - 'POTENTIALLY_ELIGIBLE'
 * - 'NOT_ELIGIBLE'
 */
export function evaluateSchemeEligibility(profile, scheme) {
  const warnings = [];
  const disqualifications = [];
  const matchedPillars = [];

  if (!profile || !scheme) {
    return {
      status: 'POTENTIALLY_ELIGIBLE',
      disqualifications: [],
      warnings: ['Profile data unavailable for complete verification'],
      matchedPillars: []
    };
  }

  const personal = profile.personalInfo || {};
  const eligibility = profile.eligibilityProfile || {};
  const business = profile.business || {};
  const financial = profile.financialProfile || {};

  // 1. LOCATION EVALUATION (State & Rural/Urban)
  const userState = personal.state || '';
  const schemeStates = scheme.applicableStates || ['ALL'];
  const stateMatches = schemeStates.includes('ALL') || schemeStates.some(s => norm(s) === norm(userState));
  
  if (!stateMatches) {
    disqualifications.push(`Scheme is exclusively restricted to ${schemeStates.join(', ')} (Your registered state: ${userState || 'Not specified'})`);
  } else {
    matchedPillars.push(`Location matches: ${schemeStates.includes('ALL') ? 'All-India National Scheme' : userState}`);
  }

  const userRuralUrban = norm(personal.ruralUrban);
  const schemeRuralUrban = scheme.eligibilityRules?.ruralUrban || ['ALL'];
  if (!schemeRuralUrban.includes('ALL')) {
    if (userRuralUrban && !schemeRuralUrban.includes(userRuralUrban)) {
      disqualifications.push(`Scheme is designated for ${schemeRuralUrban.join('/')} areas only (Profile: ${personal.ruralUrban})`);
    } else if (!userRuralUrban) {
      warnings.push('Rural/Urban location status not confirmed in profile');
    } else {
      matchedPillars.push(`${userRuralUrban === 'RURAL' ? 'Rural Area' : 'Urban Area'} aligned`);
    }
  }

  // 2. SECTOR & BUSINESS TYPE EVALUATION
  const userSector = norm(business.sector);
  const schemeSectors = (scheme.businessSectors || []).map(norm);
  
  let sectorMatch = false;
  if (schemeSectors.includes('ALL')) {
    sectorMatch = true;
    matchedPillars.push('Universal sector support');
  } else if (userSector) {
    // Check direct match or allied terms
    sectorMatch = schemeSectors.some(s => {
      if (s === userSector) return true;
      if (s === 'AGRI_PROCESSING' && (userSector.includes('AGRI') || userSector.includes('FOOD') || userSector.includes('PROCESSING'))) return true;
      if (s === 'MANUFACTURING' && (userSector.includes('MANUFACTURING') || userSector.includes('PRODUCT') || userSector.includes('ENGINEERING'))) return true;
      if (s === 'SERVICES' && (userSector.includes('SERVICE') || userSector.includes('CONSULTING') || userSector.includes('DIGITAL'))) return true;
      if (s === 'HANDICRAFTS' && (userSector.includes('HANDLOOM') || userSector.includes('CRAFT') || userSector.includes('ARTISAN') || userSector.includes('TEXTILE'))) return true;
      if (s === 'DAIRY_LIVESTOCK' && (userSector.includes('DAIRY') || userSector.includes('ANIMAL') || userSector.includes('FARM'))) return true;
      if (s === 'TRADING' && (userSector.includes('TRADE') || userSector.includes('RETAIL') || userSector.includes('WHOLESALE'))) return true;
      return false;
    });

    if (sectorMatch) {
      matchedPillars.push(`Supports ${business.sector || 'your industry'} sector`);
    } else {
      disqualifications.push(`Scheme targets [${scheme.businessSectors?.join(', ')}], while your business is in [${business.sector || 'Other'}]`);
    }
  } else {
    warnings.push('Business sector not specified');
  }

  // 3. SOCIAL CATEGORY & GENDER EVALUATION
  const userCategory = norm(eligibility.category);
  const userGender = norm(personal.gender);
  const allowedCategories = (scheme.eligibilityRules?.categoriesAllowed || ['ALL']).map(norm);
  const allowedGenders = (scheme.eligibilityRules?.genderAllowed || ['ALL']).map(norm);
  const beneficiaries = (scheme.targetBeneficiaries || []).map(norm);

  let categoryEligible = true;
  if (!allowedGenders.includes('ALL')) {
    if (userGender && !allowedGenders.includes(userGender)) {
      categoryEligible = false;
      disqualifications.push(`Restricted to ${scheme.eligibilityRules.genderAllowed.join('/')} entrepreneurs`);
    } else if (!userGender) {
      warnings.push('Gender not verified in profile');
    }
  }

  if (!allowedCategories.includes('ALL')) {
    const catMatch = allowedCategories.some(c => {
      if (c === userCategory) return true;
      if (c === 'WOMEN' && (userGender === 'FEMALE' || userCategory === 'WOMEN')) return true;
      return false;
    });

    if (!catMatch && userCategory) {
      categoryEligible = false;
      disqualifications.push(`Designated for ${scheme.eligibilityRules.categoriesAllowed.join(', ')} categories`);
    }
  }

  if (categoryEligible) {
    if (userGender === 'FEMALE' && (beneficiaries.includes('WOMEN') || allowedGenders.includes('FEMALE'))) {
      matchedPillars.push('Woman entrepreneur priority & enhanced subsidy');
    }
    if (userCategory && userCategory !== 'GENERAL' && beneficiaries.includes(userCategory)) {
      matchedPillars.push(`Category benefits available for ${eligibility.category}`);
    }
  }

  // 4. BUSINESS STAGE (New vs Existing)
  const userStage = norm(business.stage);
  const schemeStages = (scheme.businessStages || []).map(norm);
  const isExistingUnit = userStage === 'OPERATING' || userStage === 'GROWING';
  
  if (scheme.eligibilityRules?.existingBusinessAllowed === false && isExistingUnit) {
    disqualifications.push('Scheme strictly requires greenfield / new business setup (your profile is in Operating/Growing stage)');
  } else if (scheme.eligibilityRules?.newBusinessAllowed === false && !isExistingUnit) {
    disqualifications.push('Scheme is only applicable for existing operational enterprises (your business is in early stage)');
  } else if (schemeStages.length > 0) {
    const stageMatch = schemeStages.some(s => s === userStage || s === 'ALL');
    if (stageMatch) {
      matchedPillars.push(`Stage aligned: ${business.stage || 'Current stage'}`);
    } else {
      warnings.push(`Primary focus is ${scheme.businessStages?.join('/')} stages`);
    }
  }

  // 5. AGE REQUIREMENTS
  const userAge = parseInt(personal.age, 10);
  const minAge = scheme.eligibilityRules?.minAge || 18;
  const maxAge = scheme.eligibilityRules?.maxAge || 70;
  if (!isNaN(userAge)) {
    if (userAge < minAge || userAge > maxAge) {
      disqualifications.push(`Applicant age (${userAge} yrs) falls outside allowable limit (${minAge} to ${maxAge} yrs)`);
    } else {
      matchedPillars.push(`Age eligibility verified (${userAge} yrs)`);
    }
  } else {
    warnings.push('Applicant age not declared in profile');
  }

  // 6. FINANCIAL & PROJECT COST FIT
  const projectCost = parseRupeeAmount(financial.estimatedProjectCost) || parseRupeeAmount(financial.fundingRequired) || 0;
  const minCost = scheme.eligibilityRules?.minProjectCost || 0;
  const maxCost = scheme.eligibilityRules?.maxProjectCost || Infinity;

  if (projectCost > 0) {
    if (projectCost < minCost) {
      warnings.push(`Estimated project cost (₹${projectCost.toLocaleString('en-IN')}) is below typical minimum of ₹${minCost.toLocaleString('en-IN')}`);
    } else if (projectCost > maxCost) {
      warnings.push(`Project cost (₹${projectCost.toLocaleString('en-IN')}) exceeds scheme ceiling of ₹${maxCost.toLocaleString('en-IN')}; partial coverage applies`);
    } else {
      matchedPillars.push(`Financial requirement fits within scheme parameters (₹${minCost.toLocaleString('en-IN')} - ₹${maxCost.toLocaleString('en-IN')})`);
    }
  }

  // Final Status Determination
  let status = 'ELIGIBLE';
  if (disqualifications.length > 0) {
    status = 'NOT_ELIGIBLE';
  } else if (warnings.length > 1 || !sectorMatch) {
    status = 'POTENTIALLY_ELIGIBLE';
  }

  return {
    status,
    matchedPillars,
    warnings,
    disqualifications,
    disclaimer: 'Final eligibility determination rests strictly with the respective government department and financing bank.'
  };
}

/**
 * Calculates a transparent 0 - 100 Match Score.
 * Dynamic scoring weights:
 * - Sector Match: up to 25 pts
 * - Location Match: up to 20 pts
 * - Category / Demographic Fit: up to 15 pts
 * - Financial / Project Cost Fit: up to 15 pts
 * - Business Stage Fit: up to 15 pts
 * - Profile Completeness Bonus: up to 10 pts
 */
export function calculateMatchScore(profile, scheme, eligibility) {
  if (!profile || !scheme) return 50;

  // If hard disqualified, cap score between 15 - 35
  if (eligibility.status === 'NOT_ELIGIBLE') {
    const partialSector = eligibility.matchedPillars.length > 0 ? 15 : 5;
    return Math.min(30, 15 + partialSector);
  }

  let score = 0;
  const personal = profile.personalInfo || {};
  const eligibilityProf = profile.eligibilityProfile || {};
  const business = profile.business || {};
  const financial = profile.financialProfile || {};

  // 1. Sector Alignment (0 - 25 pts)
  const userSector = norm(business.sector);
  const schemeSectors = (scheme.businessSectors || []).map(norm);
  if (schemeSectors.includes(userSector)) {
    score += 25;
  } else if (schemeSectors.includes('ALL')) {
    score += 20;
  } else {
    // Partial sector synergy
    const hasSynergy = schemeSectors.some(s => 
      (s === 'AGRI_PROCESSING' && userSector.includes('AGRI')) ||
      (s === 'MANUFACTURING' && userSector.includes('PRODUCT')) ||
      (s === 'SERVICES' && userSector.includes('SERVICE'))
    );
    score += hasSynergy ? 22 : 8;
  }

  // 2. Location Alignment (0 - 20 pts)
  const userState = norm(personal.state);
  const schemeStates = (scheme.applicableStates || ['ALL']).map(norm);
  if (schemeStates.includes(userState)) {
    // Exact state specific scheme!
    score += 20;
  } else if (schemeStates.includes('ALL')) {
    // Central All-India scheme
    score += 18;
  } else {
    score += 0;
  }

  // Bonus for Rural / Urban synergy
  const userRural = norm(personal.ruralUrban);
  const schemeRural = scheme.eligibilityRules?.ruralUrban || ['ALL'];
  if (schemeRural.includes(userRural) || schemeRural.includes('ALL')) {
    score += 2;
  }

  // 3. Category & Gender Bonus (0 - 15 pts)
  const userCategory = norm(eligibilityProf.category);
  const userGender = norm(personal.gender);
  const beneficiaries = (scheme.targetBeneficiaries || []).map(norm);
  
  if (userGender === 'FEMALE' && (beneficiaries.includes('WOMEN') || scheme.id.includes('mahila') || scheme.id.includes('stand_up'))) {
    score += 15;
  } else if (beneficiaries.includes(userCategory) && userCategory !== 'GENERAL') {
    score += 15;
  } else if (beneficiaries.includes('GENERAL') || beneficiaries.includes('MICRO_ENTERPRISES')) {
    score += 12;
  } else {
    score += 8;
  }

  // 4. Financial & Project Cost Fit (0 - 15 pts)
  const userProjectCost = parseRupeeAmount(financial.estimatedProjectCost) || parseRupeeAmount(financial.fundingRequired) || 0;
  const minCost = scheme.eligibilityRules?.minProjectCost || 0;
  const maxCost = scheme.eligibilityRules?.maxProjectCost || Infinity;
  
  if (userProjectCost > 0 && userProjectCost >= minCost && userProjectCost <= maxCost) {
    score += 15;
  } else if (userProjectCost > 0) {
    score += 10;
  } else {
    score += 8;
  }

  // 5. Business Stage Compatibility (0 - 15 pts)
  const userStage = norm(business.stage);
  const schemeStages = (scheme.businessStages || []).map(norm);
  if (schemeStages.includes(userStage)) {
    score += 15;
  } else if (schemeStages.includes('ALL')) {
    score += 12;
  } else {
    score += 6;
  }

  // 6. Profile Completeness Bonus (0 - 10 pts)
  let completePoints = 0;
  if (personal.state && personal.age) completePoints += 3;
  if (business.sector && business.stage) completePoints += 4;
  if (financial.fundingRequired || financial.estimatedProjectCost) completePoints += 3;
  score += completePoints;

  // Cap at 98 (never claim 100% since final grant depends on DIC/bank)
  return Math.min(98, Math.max(25, score));
}

/**
 * Checks which required documents are already indicated in the profile
 * vs which ones need to be acquired.
 */
export function checkSchemeDocuments(profile, scheme) {
  if (!scheme?.requiredDocuments) return [];

  const personal = profile?.personalInfo || {};
  const eligibility = profile?.eligibilityProfile || {};
  const business = profile?.business || {};
  const financial = profile?.financialProfile || {};

  return scheme.requiredDocuments.map(doc => {
    let availableInProfile = false;
    let note = 'Document verification pending';

    if (doc.id === 'doc_aadhaar' && personal.fullName) {
      availableInProfile = true;
      note = 'Identity details collected during registration';
    } else if (doc.id === 'doc_pan' && personal.fullName) {
      availableInProfile = true;
      note = 'Promoter tax record linked';
    } else if (doc.id === 'doc_udyam' && business.registrationStatus === 'UDYAM_REGISTERED') {
      availableInProfile = true;
      note = 'Udyam registration indicated in profile';
    } else if (doc.id === 'doc_fssai' && (business.licensesHeld || '').toLowerCase().includes('fssai')) {
      availableInProfile = true;
      note = 'FSSAI food license indicated in profile';
    } else if (doc.id === 'doc_caste' && eligibility.category && eligibility.category !== 'General') {
      availableInProfile = false;
      note = 'Physical caste/category certificate required for application';
    } else if (doc.id === 'doc_project_report' || doc.id === 'doc_dpr') {
      availableInProfile = false;
      note = 'Detailed Project Report (DPR) must be prepared for bank appraisal';
    } else if (doc.id === 'doc_bank_stmt' || doc.id === 'doc_bank_passbook') {
      availableInProfile = Boolean(financial.availableCapital);
      note = availableInProfile ? 'Bank balance indicated; 6 months physical statement required' : 'Bank statement required';
    }

    return {
      ...doc,
      status: availableInProfile ? 'AVAILABLE_FROM_PROFILE' : 'MAY_BE_REQUIRED',
      statusNote: note
    };
  });
}

/**
 * Evaluates, scores, and ranks all schemes for the given profile.
 */
export function evaluateAndRankSchemes(profile, schemes) {
  if (!schemes || schemes.length === 0) return [];

  const evaluated = schemes.map(scheme => {
    const eligibility = evaluateSchemeEligibility(profile, scheme);
    const matchScore = calculateMatchScore(profile, scheme, eligibility);
    const documentChecklist = checkSchemeDocuments(profile, scheme);

    return {
      ...scheme,
      eligibility,
      matchScore,
      documentChecklist
    };
  });

  // Sort descending by match score
  return evaluated.sort((a, b) => b.matchScore - a.matchScore);
}
