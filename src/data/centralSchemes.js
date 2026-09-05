/**
 * Central Government Schemes Catalog
 * Verified Central Ministries: MSME, MoFPI, Agriculture, Textiles, Commerce, Finance, MNRE, Fisheries
 */

export const CENTRAL_SCHEMES = [
  // 1. PMEGP
  {
    id: 'pmegp',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortDescription: 'Credit-linked capital subsidy up to 35% for setting up new micro-enterprises in manufacturing and services.',
    ministry: 'Ministry of MSME',
    department: 'Khadi and Village Industries Commission (KVIC)',
    schemeType: 'CREDIT_LINKED_SUBSIDY',
    schemeCategoryLabel: 'Central Credit-Linked Subsidy',
    applicableStates: ['ALL'],
    applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MINORITY', 'EX_SERVICEMEN', 'DIFF_ABLED'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'REGISTRATION', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: false, newBusinessAllowed: true,
      educationRequired: 'VIII passed for project cost > ₹10 Lakhs in Mfg, > ₹5 Lakhs in Services'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 5000000, minimumFunding: 100000,
      subsidyPercentage: '15% to 35% of Project Cost',
      subsidyDetails: 'Rural Special Category (Women, SC/ST/OBC/PH): 35%. Urban Special: 25%. Rural General: 25%. Urban General: 15%.',
      loanDetails: 'Bank provides 90% - 95% of project cost as term loan and working capital.',
      marginMoneyDetails: 'Own contribution 5% for Special Categories, 10% for General.',
      interestDetails: 'Normal banking interest rate (8.5% - 11.5% p.a.).',
      repaymentDetails: '3 to 7 years with initial moratorium period of 6 months.',
      collateralRequirement: 'No collateral required up to ₹10 Lakhs (covered under CGTMSE).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'UIDAI Aadhaar of applicant' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN card of applicant/entity' },
      { id: 'doc_caste', name: 'Caste / Category Certificate', category: 'ELIGIBILITY', mandatory: false, profileFieldMatch: 'eligibilityProfile.category', description: 'For claiming 25%-35% special category subsidy' },
      { id: 'doc_rural', name: 'Rural Area Certificate', category: 'LOCATION', mandatory: false, profileFieldMatch: 'personalInfo.ruralUrban', description: 'For claiming 10% rural subsidy bonus' },
      { id: 'doc_edu', name: 'Educational Certificate (8th/10th/Degree)', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Mandatory for projects above ₹10L Mfg / ₹5L Services' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Machinery quotation and cash flow projections' }
    ],
    applicationProcess: [
      { step: 1, title: 'Prepare Project Profile & DPR', description: 'Prepare cost estimation, machinery quotations, and DPR.' },
      { step: 2, title: 'Submit Online on PMEGP Portal', description: 'Register on pmegp.msme.gov.in or kviconline.gov.in.' },
      { step: 3, title: 'DLTFC Committee Scrutiny', description: 'District committee scrutinizes and forwards to chosen financing bank.' },
      { step: 4, title: 'Bank Loan Sanction & EDP Training', description: 'Complete mandatory 5 to 10-day EDP training online or offline.' },
      { step: 5, title: 'Disbursement & Subsidy TDR', description: 'Bank releases loan funds; subsidy held in TDR for 3 years before adjusting.' }
    ],
    officialWebsite: 'https://pmegp.msme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmegp',
    officialSource: 'Ministry of MSME & KVIC National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 35% capital subsidy for rural women & marginalized entrepreneurs', 'Manufacturing projects eligible up to ₹50 Lakhs', 'No collateral needed under CGTMSE linkage']
  },

  // 2. PMFME
  {
    id: 'pmfme',
    name: 'PM Formalisation of Micro food processing Enterprises (PMFME)',
    shortDescription: '35% credit-linked capital subsidy up to ₹10 Lakhs for micro food processing units under ODOP.',
    ministry: 'Ministry of Food Processing Industries (MoFPI)',
    department: 'National Institute of Food Technology (NIFTEM)',
    schemeType: 'CREDIT_LINKED_SUBSIDY',
    schemeCategoryLabel: 'Central Credit-Linked Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'FARMERS', 'SHG', 'MICRO_ENTERPRISES'],
    businessSectors: ['AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'FPO', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'REGISTRATION', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal minimum qualification mandated'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 1000000, minimumFunding: 50000,
      subsidyPercentage: '35% of eligible project cost (Max ₹10 Lakhs)',
      subsidyDetails: '35% credit-linked capital subsidy capped at ₹10 Lakhs per micro food unit.',
      loanDetails: 'Bank provides remaining 55% - 65% project cost as institutional credit.',
      marginMoneyDetails: 'Beneficiary equity minimum 10%.',
      interestDetails: 'Standard commercial MSME lending rates.',
      repaymentDetails: '3 to 7 years with moratorium up to 1 year.',
      collateralRequirement: 'Covered under CGTMSE credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'UIDAI Aadhaar of owner' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN of applicant' },
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: false, profileFieldMatch: 'business.registrationStatus', description: 'Recommended for micro food unit' },
      { id: 'doc_fssai', name: 'FSSAI License / Registration', category: 'COMPLIANCE', mandatory: false, profileFieldMatch: 'business.licensesHeld', description: 'Food safety registration' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR) for Food Processing', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Processing capacity and cash flow' }
    ],
    applicationProcess: [
      { step: 1, title: 'Identify ODOP Product', description: 'Align with One District One Product (ODOP) or perishable agro-food line.' },
      { step: 2, title: 'Apply on MoFPI PMFME Portal', description: 'Submit application on pmfme.mofpi.gov.in with DRP assistance.' },
      { step: 3, title: 'DLC Approval & Bank Sanction', description: 'District Level Committee verifies and bank sanctions credit-linked loan.' }
    ],
    officialWebsite: 'https://pmfme.mofpi.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmfme',
    officialSource: 'Ministry of Food Processing Industries (MoFPI)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Flat 35% capital subsidy up to ₹10,00,000', 'Free District Resource Person (DRP) handholding support', 'Brand development and FSSAI packaging support']
  },

  // 3. PMMY MUDRA
  {
    id: 'pmmy_mudra',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    shortDescription: 'Collateral-free institutional loans up to ₹10 Lakhs (and up to ₹20 Lakhs under Tarun Plus) across Shishu, Kishore, and Tarun categories.',
    ministry: 'Ministry of Finance', department: 'Department of Financial Services (DFS)',
    schemeType: 'LOAN', schemeCategoryLabel: 'Central Collateral-Free Loan',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'SHG', 'INDIVIDUAL'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'REGISTRATION', 'PRE_LAUNCH', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 10000, maxProjectCost: 2000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No minimum qualification'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 2000000, minimumFunding: 10000,
      subsidyPercentage: 'Credit Guarantee Coverage via CGFMU',
      subsidyDetails: 'Provides credit guarantee coverage under CGFMU with zero collateral requirement.',
      loanDetails: 'Shishu: Up to ₹50,000 | Kishore: ₹50,001 to ₹5 Lakhs | Tarun: ₹5 Lakhs to ₹10 Lakhs (Tarun Plus: up to ₹20L).',
      marginMoneyDetails: 'Nil for Shishu; up to 10%-15% for Kishore/Tarun.',
      interestDetails: 'Benchmark MCLR linked (approx 8.4% - 11.5% p.a.).',
      repaymentDetails: '3 to 5 years tenure with working capital cash credit.',
      collateralRequirement: 'Zero collateral and zero third-party guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card / Voter ID', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Proof of identity' },
      { id: 'doc_address', name: 'Proof of Residence', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Electricity bill / Ration card' },
      { id: 'doc_pan', name: 'PAN Card / Form 60', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Tax identity' },
      { id: 'doc_quotation', name: 'Quotation of Machinery / Inventory', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Vendor quotation' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select Loan Tier', description: 'Choose Shishu (up to ₹50k), Kishore (up to ₹5L), or Tarun (up to ₹10L/20L).' },
      { step: 2, title: 'Apply on JanSamarth or Bank', description: 'Submit request digitally on jansamarth.in or mudra.org.in.' },
      { step: 3, title: 'Disbursement with Mudra Card', description: 'Sanction issued without collateral; debit card provided for daily withdrawals.' }
    ],
    officialWebsite: 'https://www.mudra.org.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmmy',
    officialSource: 'MUDRA Ltd & Department of Financial Services',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% collateral-free loans up to ₹20,00,000', 'Includes Mudra Card for seamless daily cash withdrawals & purchases', 'Offered across all Commercial Banks, RRBs, Small Finance Banks, and MFIs']
  },

  // 4. STAND-UP INDIA
  {
    id: 'stand_up_india',
    name: 'Stand-Up India Scheme',
    shortDescription: 'Composite bank loans from ₹10 Lakhs to ₹1 Crore for greenfield enterprises founded by SC, ST, and Women entrepreneurs.',
    ministry: 'Ministry of Finance', department: 'SIDBI',
    schemeType: 'LOAN', schemeCategoryLabel: 'Central Concessional Loan',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'REGISTRATION', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['FEMALE'], categoriesAllowed: ['WOMEN', 'SC', 'ST'], ruralUrban: ['ALL'],
      minProjectCost: 1000000, maxProjectCost: 10000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'No restriction'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 10000000, minimumFunding: 1000000,
      subsidyPercentage: 'Credit Guarantee under CGFSI + State convergence margin support',
      subsidyDetails: 'Eligible for convergence with State subsidies to bring promoter contribution down to 10%.',
      loanDetails: 'Composite loan covering up to 85% of project cost.',
      marginMoneyDetails: 'Minimum 15% (can reduce to 10% in convergence).',
      interestDetails: 'Lowest applicable rate of bank for category (MCLR + 3%).',
      repaymentDetails: '7 years with moratorium up to 18 months.',
      collateralRequirement: 'Collateral-free backed by CGFSI credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste', name: 'Caste Proof (SC/ST) or Female Identity', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Proof of SC/ST or Female applicant ownership' },
      { id: 'doc_dpr', name: 'Greenfield Project Report', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Feasibility analysis of new project' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Stand-Up Mitra', description: 'Log in on standupmitra.in as Ready Borrower.' },
      { step: 2, title: 'Bank Appraisal & Sanction', description: 'Commercial bank branch evaluates and sanctions composite credit.' }
    ],
    officialWebsite: 'https://www.standupmitra.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/suis',
    officialSource: 'SIDBI & Department of Financial Services',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Exclusively for SC, ST, and Women entrepreneurs', 'Loans between ₹10 Lakhs and ₹1 Crore for greenfield ventures', 'Mandatory 2 borrowers per commercial bank branch']
  },

  // 5. PM VISHWAKARMA
  {
    id: 'pm_vishwakarma',
    name: 'PM Vishwakarma Scheme',
    shortDescription: 'Support for traditional artisans: ₹15,000 toolkit grant, skilling stipend, and 5% concessional credit up to ₹3 Lakhs.',
    ministry: 'Ministry of MSME', department: 'Skill Development Joint Cell',
    schemeType: 'TRAINING', schemeCategoryLabel: 'Central Skilling & Toolkit Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'TRADITIONAL_CRAFTS', 'OBC', 'SC', 'ST', 'WOMEN', 'RURAL_YOUTH'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'FAMILY_UNIT'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 10000, maxProjectCost: 300000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Traditional artisan in 18 designated family trades'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 300000, minimumFunding: 15000,
      subsidyPercentage: '100% Free Toolkit Grant (₹15,000) + 8% Interest Subvention',
      subsidyDetails: '₹15,000 direct e-voucher toolkit grant + ₹500/day training stipend.',
      loanDetails: 'Tranche 1: ₹1,00,000 (18 mo) | Tranche 2: ₹2,00,000 (30 mo).',
      marginMoneyDetails: 'Nil contribution required.',
      interestDetails: 'Concessional interest rate of only 5% charged to artisan.',
      repaymentDetails: 'Flexible monthly installments.',
      collateralRequirement: 'Completely collateral-free backed by NCGTC.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Aadhaar with mobile link' },
      { id: 'doc_bank_passbook', name: 'Bank Passbook / Cancelled Cheque', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.availableCapital', description: 'DBT bank account' }
    ],
    applicationProcess: [
      { step: 1, title: 'Enroll via CSC Center', description: 'Visit Common Services Centre with Aadhaar and trade details.' },
      { step: 2, title: 'Gram Panchayat Verification', description: 'Local authority verifies traditional practice of craft.' },
      { step: 3, title: 'Training & Toolkit Credit', description: 'Receive ₹500/day training stipend + ₹15,000 toolkit voucher.' }
    ],
    officialWebsite: 'https://pmvishwakarma.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pm-vishwakarma',
    officialSource: 'Official PM Vishwakarma National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['18 traditional trades covered', 'Free ₹15,000 modern toolkit grant + ₹500/day training stipend', 'Concessional collateral-free loan up to ₹3 Lakhs at only 5% interest']
  },

  // 6. CGTMSE
  {
    id: 'cgtmse',
    name: 'Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)',
    shortDescription: 'Collateral-free credit guarantee up to ₹5 Crore with 75% - 85% sovereign risk cover for micro and small units.',
    ministry: 'Ministry of MSME', department: 'SIDBI & Ministry of MSME Trust',
    schemeType: 'LOAN', schemeCategoryLabel: 'Credit Guarantee / Collateral Waiver',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TECHNOLOGY', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'REGISTRATION', 'PRE_LAUNCH', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal restriction'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 50000000, minimumFunding: 200000,
      subsidyPercentage: 'Up to 85% Guarantee coverage for Women & Micro units',
      subsidyDetails: '85% sovereign guarantee for loans up to ₹5 Lakhs and for Women-led units; 75% for others up to ₹5 Crore.',
      loanDetails: 'Term loan and working capital sanctioned without secondary collateral.',
      marginMoneyDetails: 'Normal promoter margin of 10% - 25%.',
      interestDetails: 'Capped bank lending rates.',
      repaymentDetails: '7 to 10 years including moratorium.',
      collateralRequirement: 'Zero secondary collateral or third-party guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Promoter identity' },
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Mandatory MSME Udyam' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain Udyam Registration', description: 'Register on udyamregistration.gov.in.' },
      { step: 2, title: 'Approach Member Lending Institution', description: 'Submit DPR to commercial bank or SIDBI requesting CGTMSE guarantee.' }
    ],
    officialWebsite: 'https://www.cgtmse.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cgtmse',
    officialSource: 'CGTMSE Trust & Ministry of MSME',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Borrow up to ₹5 Crore without pledging land or home', '85% guarantee coverage for women-owned enterprises', 'Accepted across all nationalized and private scheduled banks']
  },

  // 7. PM SVANIDHI
  {
    id: 'pm_svanidhi',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    shortDescription: 'Collateral-free micro working capital loan from ₹10,000 to ₹50,000 with 7% interest subsidy and UPI cashback.',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)', department: 'Urban Livelihoods Division',
    schemeType: 'LOAN', schemeCategoryLabel: 'Micro Working Capital Loan',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STREET_VENDORS', 'INFORMAL_WORKERS', 'WOMEN', 'SC', 'ST', 'OBC'],
    businessSectors: ['TRADING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['URBAN'],
      minProjectCost: 5000, maxProjectCost: 50000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'No education requirement'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 50000, minimumFunding: 10000,
      subsidyPercentage: '7% Interest Subsidy directly credited to bank account',
      subsidyDetails: '7% p.a. interest rebate on timely repayment plus up to ₹1,200/year cashback for digital UPI transactions.',
      loanDetails: '1st Tranche: ₹10,000 | 2nd Tranche: ₹20,000 | 3rd Tranche: ₹50,000.',
      marginMoneyDetails: 'Nil margin money.',
      interestDetails: 'Normal bank rates minus 7% government subvention.',
      repaymentDetails: 'Monthly EMIs via UPI or bank mandate.',
      collateralRequirement: 'Completely collateral-free.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_vending_cert', name: 'Certificate of Vending / LOR from ULB', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'personalInfo.locality', description: 'Urban Local Body recommendation letter' }
    ],
    applicationProcess: [
      { step: 1, title: 'Verify Municipal Survey', description: 'Check vending identity with local municipal body or obtain LOR.' },
      { step: 2, title: 'Apply on PM SVANidhi Portal', description: 'Apply digitally on pmsvanidhi.mohua.gov.in.' }
    ],
    officialWebsite: 'https://pmsvanidhi.mohua.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmsvanidhi',
    officialSource: 'Ministry of Housing and Urban Affairs',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Graduating credit ladder: ₹10k → ₹20k → ₹50k', '7% annual interest subsidy deposited in bank', 'Earn monthly cashbacks for UPI customer payments']
  },

  // 8. STARTUP INDIA SEED FUND
  {
    id: 'startup_india_seed',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    shortDescription: 'Financial grant up to ₹20 Lakhs for prototype validation and up to ₹50 Lakhs for market entry via approved incubators.',
    ministry: 'Ministry of Commerce and Industry', department: 'DPIIT',
    schemeType: 'GRANT', schemeCategoryLabel: 'Central Seed Grant & Debt',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'TECHNOLOGY'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'DPIIT-recognized startup incorporated under 2 years'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Grant up to ₹20 Lakhs',
      subsidyDetails: 'Up to ₹20 Lakhs grant for proof of concept and prototype; up to ₹50 Lakhs for commercialization via debt/convertible debenture.',
      loanDetails: 'Convertible debt at low rates through approved incubators.',
      marginMoneyDetails: 'Nil promoter equity mandated for grant component.',
      interestDetails: 'Zero interest on prototype grant.',
      repaymentDetails: 'Grant is milestone-driven and non-repayable.',
      collateralRequirement: 'Completely collateral-free.'
    },
    requiredDocuments: [
      { id: 'doc_dpiit', name: 'DPIIT Startup Recognition Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Startup recognition certificate' },
      { id: 'doc_pitch_deck', name: 'Pitch Deck & Prototype Validation Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.description', description: 'Product roadmap and milestone plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain DPIIT Recognition', description: 'Register on startupindia.gov.in.' },
      { step: 2, title: 'Apply on SISFS Portal', description: 'Submit proposal on seedfund.startupindia.gov.in choosing up to 3 incubators.' }
    ],
    officialWebsite: 'https://seedfund.startupindia.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sisfs',
    officialSource: 'DPIIT & Startup India National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹20 Lakhs non-dilutive prototype grant', 'Up to ₹50 Lakhs market scale-up support', 'Zero equity dilution on grant tranche']
  },

  // 9. AGRICULTURE INFRASTRUCTURE FUND
  {
    id: 'aif_agri_infra',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortDescription: '3% interest subvention and CGTMSE credit guarantee for setting up cold chains, sorting units, and post-harvest infra.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'DA&FW',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '3% Interest Subvention Facility',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_ENTREPRENEURS', 'SHG', 'FPO', 'WOMEN', 'STARTUPS'],
    businessSectors: ['AGRI_PROCESSING', 'DAIRY_LIVESTOCK', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'FPO', 'SHG', 'COOPERATIVE'],
    businessStages: ['PLANNING', 'FUNDING', 'PRE_LAUNCH', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 200000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No degree required'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 20000000, minimumFunding: 500000,
      subsidyPercentage: '3% p.a. Interest Subvention up to ₹2 Crore for 7 years',
      subsidyDetails: '3% interest subvention paid directly by Central Govt to financing bank for 7 years.',
      loanDetails: 'Bank provides term loans up to 90% of eligible project cost.',
      marginMoneyDetails: 'Promoter margin 10% - 20%.',
      interestDetails: 'Interest capped at 9% - net borrower interest approx 6% p.a.',
      repaymentDetails: 'Up to 10 years including moratorium.',
      collateralRequirement: 'Covered under CGTMSE (fee paid by Govt).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land_record', name: 'Land Title / Long-term Lease Agreement', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Proof of land availability' },
      { id: 'doc_dpr', name: 'Bankable Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Technical design and financial projections' }
    ],
    applicationProcess: [
      { step: 1, title: 'Formulate Post-Harvest Infra DPR', description: 'Prepare DPR for cold store, processing, or drying facility.' },
      { step: 2, title: 'Apply on AIF Portal', description: 'Upload DPR on agriinfra.dac.gov.in.' }
    ],
    officialWebsite: 'https://agriinfra.dac.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/aif',
    officialSource: 'Ministry of Agriculture and Farmers Welfare',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['3% interest rebate for 7 consecutive years on loans up to ₹2 Crore', 'Zero collateral needed (Govt pays CGTMSE fee)', 'Ideal for cold rooms, sorting lines, and agro-packaging units']
  },

  // 10. NATIONAL LIVESTOCK MISSION (NLM)
  {
    id: 'nlm_livestock',
    name: 'National Livestock Mission (NLM) - Entrepreneurship Development',
    shortDescription: '50% capital subsidy up to ₹50 Lakhs for establishing poultry, goat, sheep breeding farms and fodder processing units.',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying', department: 'DAHD',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '50% Capital Subsidy up to ₹50 Lakhs',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'RURAL_YOUTH', 'WOMEN', 'SHG', 'FPO', 'OBC', 'SC', 'ST'],
    businessSectors: ['DAIRY_LIVESTOCK', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Experience in animal husbandry'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '50% Back-ended Capital Subsidy (up to ₹50 Lakhs)',
      subsidyDetails: '50% of project cost provided as capital subsidy in 2 equal tranches.',
      loanDetails: 'Bank or financial institution sanctions remaining 50% project cost.',
      marginMoneyDetails: 'Minimum 10% promoter equity.',
      interestDetails: 'Standard commercial loan rate on borrowed component.',
      repaymentDetails: '5 to 7 years.',
      collateralRequirement: 'Covered under credit guarantee trust.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Record / Lease for Farm', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Sufficient land area for farm housing' },
      { id: 'doc_dpr', name: 'Detailed Project Report for Livestock', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Biosecurity, feeding, and breed procurement plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Prepare Livestock Unit DPR', description: 'Draft DPR for poultry, goat/sheep breeding, or fodder.' },
      { step: 2, title: 'Apply on NLM Portal', description: 'Register on nlm.udyamimitra.in with land papers.' }
    ],
    officialWebsite: 'https://nlm.udyamimitra.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nlm',
    officialSource: 'Department of Animal Husbandry and Dairying (DAHD)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['50% direct capital subsidy up to ₹50,00,000', 'Covers poultry, goat, sheep breeding and fodder processing', 'Single-window application on UdyamiMitra NLM portal']
  },

  // 11. PM MATSYA SAMPADA YOJANA (PMMSY)
  {
    id: 'pmmsy_fisheries',
    name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    shortDescription: '40% to 60% government subsidy for inland aquaculture, biofloc, cold storage, and fish transport.',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying', department: 'Department of Fisheries',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '40% - 60% Capital Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'SC', 'ST', 'FARMERS', 'RURAL_YOUTH', 'SHG', 'COOPERATIVE'],
    businessSectors: ['AGRI_PROCESSING', 'DAIRY_LIVESTOCK', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No specific degree required'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 6000000, minimumFunding: 100000,
      subsidyPercentage: '40% for General; 60% for Women and SC/ST Beneficiaries',
      subsidyDetails: 'Direct capital grant covering 40% (General) or 60% (Women, SC, ST) of verified unit cost.',
      loanDetails: 'Bank provides remaining credit portion under Priority Sector lending.',
      marginMoneyDetails: 'Promoter contributes remaining 40% - 60% through own equity and loan.',
      interestDetails: 'KCC interest subvention on working capital at 4% net.',
      repaymentDetails: '5 to 7 years with seasonal moratorium.',
      collateralRequirement: 'Collateral-free credit linkage under NABARD guidelines.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land_water', name: 'Water Body / Land Ownership or Lease', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Registered lease (min 7 years) or ownership of water body' },
      { id: 'doc_dpr', name: 'Fisheries Project DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Biofloc, pond excavation, and feed projections' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Self-Contained Proposal (SCP)', description: 'Draft DPR for biofloc, pond construction, or refrigerated van.' },
      { step: 2, title: 'Apply on PMMSY Portal', description: 'Submit proposal on pmmsy.dof.gov.in.' }
    ],
    officialWebsite: 'https://pmmsy.dof.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmmsy',
    officialSource: 'Department of Fisheries, Ministry of Fisheries',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['60% non-repayable capital subsidy for Women, SC, and ST entrepreneurs', 'Covers Biofloc, RAS fish farming, ice plants, and refrigerated vans', 'Includes access to KCC working capital at 4% interest']
  },

  // 12. MSME ZED
  {
    id: 'zed_certification',
    name: 'MSME Sustainable (ZED) Certification Scheme',
    shortDescription: 'Up to 80% subsidy for micro-enterprises adopting Zero Defect Zero Effect green quality manufacturing standards.',
    ministry: 'Ministry of MSME', department: 'Quality Council of India (QCI)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Quality & Green Tech Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'WOMEN', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Valid manufacturing MSME with Udyam'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 500000, minimumFunding: 10000,
      subsidyPercentage: '80% for Micro, additional 10% for Women/SC/ST',
      subsidyDetails: 'Bronze, Silver, Gold certification fees subsidized up to 80%-90% + up to ₹5L for clean technology adoption.',
      loanDetails: 'Partner banks offer 0.50% interest concession on working capital for ZED MSMEs.',
      marginMoneyDetails: 'Enterprise pays only 10% - 20% of fee.',
      interestDetails: '0.25% - 0.50% interest discount on commercial bank loans.',
      repaymentDetails: 'One-time certification grant & ongoing loan concessions.',
      collateralRequirement: 'N/A'
    },
    requiredDocuments: [
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active manufacturing Udyam' },
      { id: 'doc_pan', name: 'Company PAN', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Tax registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Take ZED Pledge Online', description: 'Register on zed.msme.gov.in using Udyam number.' },
      { step: 2, title: 'Upload Assessment Evidence', description: 'Submit proof of safety and defect control.' },
      { step: 3, title: 'Download Certificate & Bank Concession', description: 'Present certificate to bank for interest discount.' }
    ],
    officialWebsite: 'https://zed.msme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/zed',
    officialSource: 'Ministry of MSME & Quality Council of India',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 90% subsidy on certification fees for women/SC/ST', '0.50% interest discount on existing bank loans', 'Up to ₹5 Lakhs assistance for installing clean tech & solar']
  },

  // 13. ASPIRE
  {
    id: 'aspire_msme',
    name: 'ASPIRE (Promotion of Innovation & Rural Industries)',
    shortDescription: 'Financial grants and handholding to establish Livelihood Business Incubators (LBIs) for agro-rural enterprises.',
    ministry: 'Ministry of MSME', department: 'Rural Innovation Cell',
    schemeType: 'GRANT', schemeCategoryLabel: 'Incubation Grant & Seed Support',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'FARMERS', 'STARTUPS', 'MICRO_ENTERPRISES'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL'],
      minProjectCost: 100000, maxProjectCost: 10000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Secondary school or vocational diploma'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: 'Up to 100% incubation grant + Seed capital funding',
      subsidyDetails: 'Incubatees receive free machinery access, mentorship, and seed grant up to ₹10 Lakhs.',
      loanDetails: 'Facilitated credit linkage with SIDBI after incubation.',
      marginMoneyDetails: 'Nil during incubation phase.',
      interestDetails: 'Zero interest on seed grant.',
      repaymentDetails: 'Grant is non-repayable.',
      collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch_deck', name: 'Agro-Rural Business Proposal', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.description', description: 'Business concept document' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply to Nearest LBI', description: 'Submit proposal on aspire.msme.gov.in.' },
      { step: 2, title: 'Prototype & Seed Pitch', description: 'Build product at incubator and pitch for ₹10 Lakhs seed grant.' }
    ],
    officialWebsite: 'https://aspire.msme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/aspire',
    officialSource: 'Ministry of MSME ASPIRE Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Free hands-on incubation in modern agro-food machinery', 'Seed capital grant up to ₹10,00,000 for innovative rural products', 'Zero equity dilution or personal collateral']
  },

  // 14. NHDP HANDLOOM
  {
    id: 'nhdp_handloom',
    name: 'National Handloom Development Programme (NHDP)',
    shortDescription: 'Concessional credit, 7% interest subvention, ₹10,000 margin money grant, and modern loom subsidies for handloom weavers.',
    ministry: 'Ministry of Textiles', department: 'Office of DC Handlooms',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'Weaver Margin Grant & Concession',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'WEAVERS', 'SC', 'ST', 'WOMEN', 'OBC'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 2000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Practicing weaver'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2000000, minimumFunding: 25000,
      subsidyPercentage: '₹10,000 Margin Money Grant + 7% Interest Subvention',
      subsidyDetails: 'Margin money assistance up to ₹10,000 per weaver; 7% interest subvention for 3 years.',
      loanDetails: 'Weaver Mudra loans issued up to ₹2,00,000 (individual) and ₹20,00,000 (weaver groups).',
      marginMoneyDetails: 'Government provides ₹10,000 towards promoter margin.',
      interestDetails: 'Effective interest rate capped at 6% p.a. for weaver after 7% Govt subvention.',
      repaymentDetails: '3 years revolving credit.',
      collateralRequirement: 'Covered under credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity proof' },
      { id: 'doc_pechan_card', name: 'Weaver Pehchan Card', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'business.licensesHeld', description: 'National Weaver Identity Card' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register at Weaver Service Centre', description: 'Obtain Weaver Pehchan Card.' },
      { step: 2, title: 'Apply for Weaver Mudra', description: 'Submit loan request through nationalized bank or local cooperative bank branch.' }
    ],
    officialWebsite: 'https://handlooms.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nhdp',
    officialSource: 'Office of Development Commissioner for Handlooms',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Capped 6% effective interest rate for rural handloom weavers', 'Free ₹10,000 margin money grant per weaver', 'Up to 90% subsidy for upgrading wooden pit looms to pneumatic looms']
  },

  // 15. SAMARTH TEXTILE
  {
    id: 'samarth_textiles',
    name: 'SAMARTH (Capacity Building in Textile Sector)',
    shortDescription: 'Free demand-driven, NSQF-certified technical training and direct credit linkage for garmenting and apparel units.',
    ministry: 'Ministry of Textiles', department: 'Skill Assessment Cell',
    schemeType: 'TRAINING', schemeCategoryLabel: 'Textile Skilling & Production Incubation',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'RURAL_YOUTH', 'SC', 'ST', 'ARTISANS'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 50, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Minimum 5th class pass'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1500000, minimumFunding: 20000,
      subsidyPercentage: '100% Free Training + Post-Training Credit Linkage',
      subsidyDetails: 'Free NSQF-aligned technical training with assessment certification fee paid by Government.',
      loanDetails: 'Direct linkage to MUDRA Tarun and Weaver Credit Cards upon course completion.',
      marginMoneyDetails: 'Nil fee charged from candidate.',
      interestDetails: 'N/A on grant.', repaymentDetails: 'N/A', collateralRequirement: 'Nil.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on SAMARTH Portal', description: 'Sign up on samarth-textiles.gov.in.' },
      { step: 2, title: 'Complete NSQF Skill Training', description: 'Attend hands-on training at certified center.' },
      { step: 3, title: 'Mudra Credit Linkage', description: 'Avail Mudra Tarun loan for micro-garment unit.' }
    ],
    officialWebsite: 'https://samarth-textiles.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/samarth',
    officialSource: 'Ministry of Textiles SAMARTH Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% free certified technical training on industrial sewing & textile machinery', 'Over 75% beneficiaries are women and rural youth', 'Priority processing for Mudra Kishore/Tarun loans upon completion']
  },

  // 16. SFURTI CLUSTERS
  {
    id: 'sfurti_clusters',
    name: 'Scheme of Fund for Regeneration of Traditional Industries (SFURTI)',
    shortDescription: 'Grants up to ₹2.5 Cr (Regular) to ₹5 Cr (Major) for establishing Common Facility Centres and shared processing machinery.',
    ministry: 'Ministry of MSME', department: 'Cluster Development Division',
    schemeType: 'INFRASTRUCTURE', schemeCategoryLabel: 'Cluster Grant up to ₹5 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'RURAL_YOUTH', 'SHG', 'COOPERATIVE', 'WOMEN', 'FARMERS'],
    businessSectors: ['HANDICRAFTS', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['SHG', 'COOPERATIVE', 'FPO', 'PARTNERSHIP', 'PVT_LTD'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL'],
      minProjectCost: 1000000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Artisan group or cluster SPV'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 50000000, minimumFunding: 1000000,
      subsidyPercentage: 'Up to 90% - 95% Cluster Development Grant',
      subsidyDetails: 'Common Facility Centres and modern machinery funded up to 90% (95% in NER/Himalayan states) by Government.',
      loanDetails: 'Cluster SPV arranges remaining 5% - 10%.',
      marginMoneyDetails: '5% to 10% collective contribution.',
      interestDetails: 'Zero interest on grant.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_spv', name: 'Cluster SPV Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Society, Section 8, or FPO registration' },
      { id: 'doc_dpr', name: 'Detailed Cluster Action Plan (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Machinery plan and diagnostic survey' }
    ],
    applicationProcess: [
      { step: 1, title: 'Form Artisan Collective / SPV', description: 'Group 100-500 artisans into registered cluster Society/FPO.' },
      { step: 2, title: 'Submit Proposal on SFURTI Portal', description: 'Submit diagnostic study on sfurti.msme.gov.in.' }
    ],
    officialWebsite: 'https://sfurti.msme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sfurti',
    officialSource: 'Ministry of MSME SFURTI National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹5,00,00,000 non-repayable grant for modern processing facilities', 'Artisans pay only 5% to 10% collective contribution', 'Provides shared industrial packaging, testing, and value-addition equipment']
  },

  // 17. NATIONAL SC-ST HUB (NSSH)
  {
    id: 'national_sc_st_hub',
    name: 'National SC-ST Hub (NSSH) Scheme',
    shortDescription: '25% capital subsidy for machinery up to ₹25 Lakhs, vendor registration, and 4% mandatory PSU procurement quota for SC/ST units.',
    ministry: 'Ministry of MSME', department: 'National Small Industries Corporation (NSIC)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '25% Machinery Subsidy & Vendor Linkage',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'ST'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'SC/ST certificate with min 51% share'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2500000, minimumFunding: 50000,
      subsidyPercentage: '25% Special Marketing Assistance & Machinery Subsidy',
      subsidyDetails: '25% capital subsidy up to ₹25 Lakhs for purchasing modern plant and machinery under SCLCSS.',
      loanDetails: 'Bank provides loan with zero processing fee and subsidized credit rating.',
      marginMoneyDetails: '10% - 15% promoter margin.', interestDetails: 'Priority sector rates.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste', name: 'SC / ST Caste Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Competent authority certificate' },
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Udyam certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on NSSH Portal', description: 'Register on scsthub.in.' },
      { step: 2, title: 'Apply for SCLCSS Machinery Subsidy', description: 'Submit machinery proforma invoice through financing bank.' }
    ],
    officialWebsite: 'https://www.scsthub.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nssh',
    officialSource: 'NSIC & Ministry of MSME',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% direct capital subsidy up to ₹25,00,000 for plant machinery', 'Mandatory 4% annual procurement reserved by CPSEs', '100% waiver on tender document fees and EMD']
  },

  // 18. TREAD WOMEN
  {
    id: 'tread_women',
    name: 'Trade Related Entrepreneurship Assistance and Development (TREAD) for Women',
    shortDescription: 'Government grant up to 30% of total project cost for promoting women-owned micro-enterprises in rural and peri-urban areas.',
    ministry: 'Ministry of MSME', department: 'Women Entrepreneurship Cell',
    schemeType: 'GRANT', schemeCategoryLabel: '30% Government Grant for Women',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'SHG', 'COOPERATIVE', 'PARTNERSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No minimum qualification'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 900000, minimumFunding: 30000,
      subsidyPercentage: '30% Direct Government Grant',
      subsidyDetails: 'Up to 30% of project cost as non-repayable grant through sponsoring NGO/bank.',
      loanDetails: 'Financing bank sanctions remaining 70% project cost as loan.',
      marginMoneyDetails: 'Promoter contributes 0% - 10%.', interestDetails: 'Standard bank lending rate.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Covered under credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Woman Entrepreneur', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity proof' },
      { id: 'doc_project', name: 'Simple Business Plan / Activity Report', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Enterprise activity details' }
    ],
    applicationProcess: [
      { step: 1, title: 'Connect with Facilitating Agency', description: 'Apply through empaneled NGO, SHG Federation, or DIC.' },
      { step: 2, title: '30% Grant & 70% Loan Release', description: 'Ministry releases 30% grant; bank disburses composite facility.' }
    ],
    officialWebsite: 'https://msme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/tread',
    officialSource: 'Ministry of MSME Women Cell',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['30% flat government grant on total project cost', 'Exclusively dedicated to rural and semi-urban women entrepreneurs', 'Training and market counseling provided free of charge']
  },

  // 19. MAHILA COIR YOJANA
  {
    id: 'mahila_coir_yojana',
    name: 'Mahila Coir Yojana (MCY)',
    shortDescription: 'Women empowerment scheme providing 75% capital subsidy on motorized coir spinning and yarn extraction machinery.',
    ministry: 'Ministry of MSME', department: 'Coir Board of India',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '75% Machinery Subsidy for Women',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['MANUFACTURING', 'HANDICRAFTS', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Training in coir spinning from Coir Board'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 400000, minimumFunding: 25000,
      subsidyPercentage: '75% Government Subsidy on Equipment Cost',
      subsidyDetails: '75% cost of motorized ratts / spinning machines borne by Coir Board.',
      loanDetails: 'Remaining 25% self-financed or availed through MUDRA/PMEGP.',
      marginMoneyDetails: 'Beneficiary pays only 25%.', interestDetails: 'N/A on subsidy.', repaymentDetails: 'N/A', collateralRequirement: 'Nil.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_training_cert', name: 'Coir Board Training Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: '2-month training certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Complete Coir Skill Training', description: 'Undergo practical spinning training at Coir Board Regional Center.' },
      { step: 2, title: 'Machinery Delivery', description: '75% subsidized motorized equipment delivered directly to premise.' }
    ],
    officialWebsite: 'https://coirboard.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mcy',
    officialSource: 'Coir Board of India & Ministry of MSME',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['75% direct grant on motorized equipment', 'Exclusively dedicated to rural women artisans', 'Training stipend of ₹3,000/month provided during skill workshop']
  },

  // 20. MSME CHAMPIONS
  {
    id: 'msme_champions',
    name: 'MSME Champions Scheme (Idea Hackathon & Design Support)',
    shortDescription: 'Financial grant up to ₹15 Lakhs for innovative business ideas, up to ₹1 Crore for design projects, and up to ₹5 Lakhs for IPR/Patent registration.',
    ministry: 'Ministry of MSME', department: 'Development Commissioner (MSME)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Idea Grant up to ₹15 Lakhs & IPR Support',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'STARTUPS', 'WOMEN', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TECHNOLOGY', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 2000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Any entrepreneur with Udyam'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1500000, minimumFunding: 50000,
      subsidyPercentage: '100% Financial Grant for Idea Incubation (up to ₹15 Lakhs)',
      subsidyDetails: 'Idea development grant up to ₹15 Lakhs per approved idea through Host Institutes (IITs, NITs).',
      loanDetails: 'N/A - Direct grant.', marginMoneyDetails: 'Nil promoter contribution.', interestDetails: 'Zero interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME Udyam' },
      { id: 'doc_proposal', name: 'Innovation Concept Note', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.description', description: 'Business challenge and innovative solution' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Idea in Hackathon', description: 'Apply online on champions.gov.in under MSME Idea Hackathon.' },
      { step: 2, title: 'Grant Release', description: 'Ministry releases ₹15 Lakhs grant in milestones for prototyping.' }
    ],
    officialWebsite: 'https://champions.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/msme-champions',
    officialSource: 'Ministry of MSME Champions Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹15,00,000 grant per approved concept for prototyping', 'Up to ₹5,00,000 subsidy for filing domestic and international patents', 'Handholding from top academic institutions like IITs and NITs']
  },

  // 21. PM KISAN SAMPADA
  {
    id: 'pm_kisan_sampada',
    name: 'Pradhan Mantri Kisan SAMPADA Yojana (Cold Chain & Food Processing)',
    shortDescription: '35% to 50% capital subsidy up to ₹10 Crore for setting up integrated cold chain, value addition, and agro-processing clusters.',
    ministry: 'Ministry of Food Processing Industries (MoFPI)', department: 'Cold Chain Division',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '35% - 50% Capital Grant up to ₹10 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_ENTREPRENEURS', 'FPO', 'WOMEN', 'MICRO_ENTERPRISES'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'FPO', 'COOPERATIVE', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 2500000, maxProjectCost: 100000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No restriction'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 100000000, minimumFunding: 2500000,
      subsidyPercentage: '35% for General areas; 50% for North East / Himalayan States',
      subsidyDetails: '35% to 50% grant of eligible plant, machinery, and technical civil works cost (capped at ₹10 Crore).',
      loanDetails: 'Bank term loan of at least 20% project cost required.',
      marginMoneyDetails: 'Promoter equity min 20%.', interestDetails: 'Commercial banking rate.', repaymentDetails: '7 to 10 years.', collateralRequirement: 'Bank security applies.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Title / Lease Document', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Clear title for agro-processing facility' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Engineering design and cash flow' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft DPR & Bank In-Principle Approval', description: 'Obtain in-principle bank term loan appraisal.' },
      { step: 2, title: 'Submit on SAMPADA Portal', description: 'Upload dossier on mofpi.gov.in.' }
    ],
    officialWebsite: 'https://mofpi.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmksy',
    officialSource: 'Ministry of Food Processing Industries',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹10 Crore capital subsidy for cold storage, sorting, pulp processing, and pack-houses', 'Ideal for farmer producer organizations (FPOs) and scaling agro-enterprises', 'Direct grant credited in milestone phases']
  },

  // 22. PM SURYA GHAR
  {
    id: 'pm_surya_ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana (MSME & Rooftop Solar)',
    shortDescription: 'Direct central capital subsidy up to ₹78,000 for solar rooftop units plus collateral-free concessional loans at 7% p.a.',
    ministry: 'Ministry of New and Renewable Energy (MNRE)', department: 'National Rooftop Solar Mission',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Capital Subsidy & 7% Concessional Credit',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'MICRO_ENTERPRISES', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 30000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No restriction'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 500000, minimumFunding: 30000,
      subsidyPercentage: 'Direct DBT Subsidy up to ₹78,000 + 7% Fixed Rate Loan',
      subsidyDetails: '₹30,000 for 1kW; ₹60,000 for 2kW; ₹78,000 for 3kW and above directly into bank account.',
      loanDetails: 'Collateral-free solar rooftop loans from public sector banks at 7% fixed interest.',
      marginMoneyDetails: 'Beneficiary pays only 10% down payment.',
      interestDetails: 'Concessional 7% p.a. interest.', repaymentDetails: 'Up to 10 years tenure.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_electricity_bill', name: 'Latest Electricity Bill (DISCOM)', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Electricity bill of operating site' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Solar Portal', description: 'Register on pmsuryaghar.gov.in selecting your state DISCOM.' },
      { step: 2, title: 'Choose Empaneled Vendor', description: 'Install on-grid solar and receive net meter inspection.' }
    ],
    officialWebsite: 'https://pmsuryaghar.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmsbmy',
    officialSource: 'Ministry of New and Renewable Energy',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹78,000 direct DBT capital subsidy into savings account', 'Collateral-free 7% interest loans repaid through power savings', 'Cuts enterprise electricity bills by 60% to 90%']
  },

  // 23. SILK SAMAGRA 2
  {
    id: 'silk_samagra',
    name: 'Silk Samagra 2 (Central Silk Board)',
    shortDescription: 'Financial assistance up to 50% - 75% subsidy for mulberry plantation, automatic silk reeling machinery, and spinning units.',
    ministry: 'Ministry of Textiles', department: 'Central Silk Board (CSB)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '50% - 75% Equipment Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'ARTISANS', 'WOMEN', 'SC', 'ST', 'RURAL_YOUTH'],
    businessSectors: ['HANDICRAFTS', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No restriction'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3500000, minimumFunding: 50000,
      subsidyPercentage: '50% for General; 75% for SC/ST and Women Artisans',
      subsidyDetails: 'Direct capital subsidy on automatic silk reeling machines (ARM), rearing sheds, and twisting equipment.',
      loanDetails: 'Bank financing available for remaining promoter contribution.',
      marginMoneyDetails: '25% - 50% beneficiary equity.', interestDetails: 'Priority sector rates.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Collateral waiver up to micro limits.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Record for Mulberry / Rearing Shed', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Land possession certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register with Sericulture Department', description: 'Register with State Sericulture Department or Central Silk Board.' },
      { step: 2, title: 'Machinery Supply & Subsidy', description: 'Subsidy credited and subsidized reeling machines installed.' }
    ],
    officialWebsite: 'https://csb.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/silk-samagra-2',
    officialSource: 'Central Silk Board, Ministry of Textiles',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 75% government subsidy on modern silk reeling and spinning machinery', 'Free technical training in cocoon rearing and silk extraction', 'Guaranteed buyback linkages through national silk exchanges']
  },

  // 24. AHIDF DAIRY
  {
    id: 'ahidf_dairy',
    name: 'Animal Husbandry Infrastructure Development Fund (AHIDF)',
    shortDescription: '3% interest subvention and up to 25% credit guarantee for dairy processing, meat processing, and animal feed plants.',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying', department: 'DAHD',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '3% Interest Subvention & Credit Guarantee',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['DAIRY_ENTREPRENEURS', 'FARMERS', 'WOMEN', 'MICRO_ENTERPRISES', 'SHG'],
    businessSectors: ['DAIRY_LIVESTOCK', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'SHG', 'COOPERATIVE', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 1000000, maxProjectCost: 100000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No mandatory qualification'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 15000000, minimumFunding: 1000000,
      subsidyPercentage: '3% Interest Subvention + 25% Credit Guarantee',
      subsidyDetails: '3% p.a. interest subvention provided for up to 8 years.',
      loanDetails: 'Commercial banks provide up to 90% project cost as term loan.',
      marginMoneyDetails: 'Minimum 10% margin for MSMEs.', interestDetails: 'Subsidized loan rate (6% - 7.5% net).', repaymentDetails: 'Up to 10 years including 2-year moratorium.', collateralRequirement: 'Credit guarantee cover up to 25% via NABSanrakshan.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity' },
      { id: 'doc_dpr', name: 'DPR for Dairy / Feed Processing', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Milk collection network and processing flow' }
    ],
    applicationProcess: [
      { step: 1, title: 'Formulate Dairy DPR', description: 'Draft DPR for milk chilling, paneer/ghee production, or feed.' },
      { step: 2, title: 'Submit on AHIDF Portal', description: 'Apply on ahidf.udyamimitra.in.' }
    ],
    officialWebsite: 'https://ahidf.udyamimitra.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ahidf',
    officialSource: 'DAHD & SIDBI UdyamiMitra Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['3% interest subvention for 8 full years', '2-year moratorium on principal repayment', 'Supported by NABSanrakshan Credit Guarantee Fund']
  },

  // 25. KVIC HONEY MISSION
  {
    id: 'honey_mission_kvic',
    name: 'KVIC Honey Mission (Beekeeping & Honey Processing)',
    shortDescription: 'Free distribution of 10 bee-boxes with live colonies, honey extractor kits, and 80% subsidy for apiary & honey bottling units.',
    ministry: 'Ministry of MSME', department: 'Khadi and Village Industries Commission (KVIC)',
    schemeType: 'GRANT', schemeCategoryLabel: '80% Equipment Grant & Colony Support',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'RURAL_YOUTH', 'WOMEN', 'ARTISANS', 'SC', 'ST'],
    businessSectors: ['AGRI_PROCESSING', 'DAIRY_LIVESTOCK', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 20000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal qualification required'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1200000, minimumFunding: 35000,
      subsidyPercentage: '80% Grant on Bee Boxes & Extraction Units',
      subsidyDetails: '80% grant on bee colonies and equipment; 5-day free master beekeeping practical training.',
      loanDetails: 'Bank tie-up under PMEGP for commercial honey processing units up to ₹25 Lakhs.',
      marginMoneyDetails: '20% beneficiary contribution.', interestDetails: 'Zero interest on direct grant component.', repaymentDetails: 'Not applicable for direct toolkit grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Possession / Orchard Availability Record', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Proof of land/orchard space for bee boxes' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Online on KVIC Portal', description: 'Apply under Honey Mission tab on kviconline.gov.in.' },
      { step: 2, title: '5-Day Technical Training', description: 'Attend training at nearest KVIC or State Beekeeping Training Centre.' },
      { step: 3, title: 'Bee Box Distribution & Extraction', description: 'Receive 10 live colonies and honey extractor kit with buyback support.' }
    ],
    officialWebsite: 'https://www.kviconline.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/hm',
    officialSource: 'KVIC National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['10 live bee colonies & modern hives provided with 80% grant', 'KVIC guaranteed honey buyback linkage', 'No formal educational requirement']
  },

  // 26. NATIONAL BAMBOO MISSION (NBM)
  {
    id: 'bamboo_mission_nbm',
    name: 'National Bamboo Mission (NBM)',
    shortDescription: 'Up to 50% capital subsidy for bamboo craft units, furniture manufacturing, agarbatti stick making, and bio-charcoal briquetting.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'Department of Agriculture and Farmers Welfare (DA&FW)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '50% Capital Subsidy for Bamboo Enterprises',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'FARMERS', 'RURAL_YOUTH', 'WOMEN', 'MICRO_ENTERPRISES'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: '50% of Equipment and Plant Cost',
      subsidyDetails: 'Direct capital subsidy up to ₹25 Lakhs for primary processing units, aggarbatti stick units, and bamboo treatment plants.',
      loanDetails: 'Bank term loan for remaining project cost.',
      marginMoneyDetails: '10% - 20% promoter contribution.', interestDetails: 'Standard priority sector bank interest.', repaymentDetails: '5 to 7 years with 6-month moratorium.', collateralRequirement: 'CGTMSE coverage up to standard limits.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'DPR for Bamboo Processing Unit', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Machinery quotation and bamboo supply chain model' },
      { id: 'doc_udyam', name: 'Udyam Registration', category: 'BUSINESS', mandatory: false, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Bamboo DPR', description: 'Detail machinery quotations for bamboo slicing, peeling, or furniture making.' },
      { step: 2, title: 'Apply on NBM Portal', description: 'Register on nbm.nic.in through State Bamboo Mission Directorate.' },
      { step: 3, title: 'Inspection & Bank Loan Release', description: 'State Bamboo Mission inspects site and releases back-ended subsidy.' }
    ],
    officialWebsite: 'https://nbm.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nbm',
    officialSource: 'Department of Agriculture and Farmers Welfare (DA&FW)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['50% capital subsidy on bamboo processing & craft equipment', 'Supports incense sticks, bamboo timber, furniture, and charcoal', 'Direct technical support from State Bamboo Missions']
  },

  // 27. COIR VIKAS YOJANA (CVY)
  {
    id: 'coir_vikas_yojana',
    name: 'Coir Vikas Yojana (CVY - Coir Board)',
    shortDescription: 'Up to 55% subsidy for modern coir defibering units, automated spinning machines, coir geotextiles, and pith composting plants.',
    ministry: 'Ministry of MSME', department: 'Coir Board',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Up to 55% Modernization Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'RURAL_YOUTH', 'ARTISANS', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'HANDICRAFTS', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 4000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2200000, minimumFunding: 100000,
      subsidyPercentage: '25% to 55% Capital Subsidy',
      subsidyDetails: '25% for general category; 55% for North Eastern Region, SC/ST, and women coir workers.',
      loanDetails: 'Bank finance covers up to 65% of plant cost.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: 'Normal priority lending interest.', repaymentDetails: '5 years with 6 months moratorium.', collateralRequirement: 'No collateral up to ₹10 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Coir Unit DPR & Machinery Invoices', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Quotation for automatic spinning or pith blocks' }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration', description: 'Submit application on coirboard.gov.in.' },
      { step: 2, title: 'Field Appraisal by Coir Board Officer', description: 'Inspection of unit premises and husk supply feasibility.' },
      { step: 3, title: 'Sanction and Machinery Installation', description: 'Direct DBT subsidy credit upon commissioning.' }
    ],
    officialWebsite: 'https://coirboard.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cvy',
    officialSource: 'Coir Board, Ministry of MSME',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 55% direct subsidy on automatic spinning and defibering machinery', 'Export marketing support and international fair participation', 'Free skill training at Central Coir Research Institute']
  },

  // 28. PM-PRANAM BIO-FERTILIZER ENTERPRISES
  {
    id: 'pm_pranam_biofert',
    name: 'PM-PRANAM Bio-Fertilizer & Organic Input Production Support',
    shortDescription: 'Financial incentives and capital grants for setting up bio-fertilizer, vermicompost, and liquid bio-stimulant manufacturing units.',
    ministry: 'Ministry of Chemicals and Fertilizers', department: 'Department of Fertilizers',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Organic & Bio-Input Production Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_PRENEURS', 'RURAL_YOUTH', 'SHG', 'FPO'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'FPO', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 200000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '10th class pass preferred'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2500000, minimumFunding: 200000,
      subsidyPercentage: '33% to 50% Capital Subsidy',
      subsidyDetails: '33% subsidy for commercial bio-fertilizer units; up to 50% for FPOs and SHG clusters.',
      loanDetails: 'Bank term loan via NABARD or commercial banks.',
      marginMoneyDetails: '15% own investment.', interestDetails: 'Priority sector interest rate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Covered under credit guarantee for agricultural infrastructure.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Bio-Fertilizer DPR & Technical Specification', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Lab testing facilities and composting equipment details' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Organic Input DPR', description: 'Include culture testing, fermenter specs, and soil input analysis.' },
      { step: 2, title: 'Apply via District Agriculture Office', description: 'Forward to State Department of Agriculture / Fertilizers portal.' },
      { step: 3, title: 'License & Subsidy Sanction', description: 'Obtain FCO manufacturing license and claim capital subsidy.' }
    ],
    officialWebsite: 'https://fert.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pm-pranam',
    officialSource: 'Department of Fertilizers & Ministry of Agriculture',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 50% capital subsidy for bio-fertilizer and vermicompost units', 'Accelerating national transition to chemical-free agriculture', 'Priority procurement linkage with local agricultural cooperatives']
  },

  // 29. MOVCDNER (ORGANIC VALUE CHAIN DEVELOPMENT)
  {
    id: 'movcdner_organic',
    name: 'Mission Organic Value Chain Development (MOVCDNER)',
    shortDescription: 'Financial assistance up to 75% subsidy for organic produce collection centres, sorting/grading units, and value addition processing.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'DA&FW',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '75% Organic Processing & Cold Chain Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_PRENEURS', 'FPO', 'WOMEN_SHG'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'MANUFACTURING'],
    businessTypes: ['FPO', 'COOPERATIVE', 'PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 15000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 7500000, minimumFunding: 500000,
      subsidyPercentage: '50% to 75% Capital Grant',
      subsidyDetails: '75% subsidy for organic collection, aggregation, and grading centres; 50% for customized refrigerated transport vans.',
      loanDetails: 'Promoter equity and bank loan cover remaining 25% - 50%.',
      marginMoneyDetails: '10% - 25% promoter equity.', interestDetails: 'Priority sector lending rate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Standard credit guarantee for agri-enterprises.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_organic_cert', name: 'Organic Certification / PGS-India Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.productService', description: 'Proof of organic sourcing or farmer tie-up' },
      { id: 'doc_dpr', name: 'Value Chain DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Post-harvest processing & marketing strategy' }
    ],
    applicationProcess: [
      { step: 1, title: 'Formulate Organic Value Chain DPR', description: 'Detail sorting, packaging, and cold chain parameters.' },
      { step: 2, title: 'Apply on MOVCDNER Portal', description: 'Submit via movcdner.dac.gov.in or State Mission Director.' },
      { step: 3, title: 'State Level Executive Committee Sanction', description: 'Fund release linked with milestone completion.' }
    ],
    officialWebsite: 'https://movcdner.dac.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/movcdner',
    officialSource: 'Ministry of Agriculture and Farmers Welfare',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 75% capital grant for organic packaging and cold chain facilities', 'Direct market access to domestic organic retail and export buyers', 'Supports farmer producer groups and individual food processors']
  },

  // 30. NATIONAL PROGRAMME FOR DAIRY DEVELOPMENT (NPDD)
  {
    id: 'deds_dairy',
    name: 'National Programme for Dairy Development (NPDD)',
    shortDescription: 'Grant support up to 60% for automatic milk collection stations, chilling units, testing kits, and dairy value-addition machinery.',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying', department: 'Department of Animal Husbandry and Dairying (DAHD)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Up to 60% Dairy Equipment Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['DAIRY_ENTREPRENEURS', 'WOMEN', 'FARMERS', 'SHG', 'COOPERATIVE'],
    businessSectors: ['DAIRY_LIVESTOCK', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 200000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3000000, minimumFunding: 200000,
      subsidyPercentage: '50% to 60% Capital Grant',
      subsidyDetails: '50% for general entrepreneurs; 60% for women dairy entrepreneurs, SC/ST, and hilly/remote regions.',
      loanDetails: 'Bank provides remaining project cost as term loan.',
      marginMoneyDetails: '10% - 15% beneficiary share.', interestDetails: 'Priority sector agriculture rate.', repaymentDetails: '5 to 7 years with 6-month grace period.', collateralRequirement: 'Zero collateral for micro installations under priority credit.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Dairy Unit DPR & Quotations', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Milk chilling and testing equipment estimate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Prepare Dairy Modernization DPR', description: 'Include bulk milk cooler specifications and farmer collection network.' },
      { step: 2, title: 'Submit to District Dairy Development Officer', description: 'Forward to State Milk Federation or DAHD portal.' },
      { step: 3, title: 'Sanction and Equipment Deployment', description: 'Direct DBT subsidy credit upon machinery verification.' }
    ],
    officialWebsite: 'https://dahd.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/npdd',
    officialSource: 'Department of Animal Husbandry and Dairying (DAHD)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 60% subsidy on bulk milk coolers and automated collection units', 'Modern electronic milk testing equipment covered', 'Strong tie-ups with district dairy cooperative unions']
  },

  // 31. PMKSY PER DROP MORE CROP (MICRO IRRIGATION)
  {
    id: 'pmksy_micro_irrigation',
    name: 'PMKSY - Per Drop More Crop (Micro Irrigation Enterprises)',
    shortDescription: 'Up to 55% subsidy for manufacturing, assembling, and installing drip & sprinkler irrigation systems and precision agri equipment.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'DA&FW',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '45% - 55% Micro Irrigation Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_PRENEURS', 'RURAL_YOUTH', 'MANUFACTURERS'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic technical knowledge'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 1650000, minimumFunding: 100000,
      subsidyPercentage: '45% to 55% Capital Subsidy',
      subsidyDetails: '55% for small/marginal farmers and SC/ST; 45% for general category entrepreneurs.',
      loanDetails: 'Commercial bank term loan for promoter component.',
      marginMoneyDetails: '10% promoter contribution.', interestDetails: 'Standard priority sector lending rate.', repaymentDetails: '5 years.', collateralRequirement: 'Normal priority sector norms.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Record / Farm Site Inspection', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Farm or installation site blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Design Irrigation Layout', description: 'Draft drip/sprinkler layout plan with certified equipment specs.' },
      { step: 2, title: 'Apply on PMKSY Portal', description: 'Submit through pmksy.gov.in or State Horticulture / Agriculture portal.' },
      { step: 3, title: 'GPS Verification & Direct DBT', description: 'Department engineers perform field geotagging and release subsidy.' }
    ],
    officialWebsite: 'https://pmksy.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pmksy-pdmc',
    officialSource: 'Ministry of Agriculture & Farmers Welfare',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['55% capital subsidy for precision drip & sprinkler installations', 'Saves up to 60% water while boosting farm crop yields by 40%', 'Direct DBT subsidy credit into bank account']
  },

  // 32. NATIONAL BIOENERGY PROGRAMME (MNRE)
  {
    id: 'national_bioenergy_prog',
    name: 'National Bioenergy Programme (MNRE Biogas & Biomass)',
    shortDescription: 'Direct capital subsidy up to ₹40,000 per small biogas plant and up to ₹50 Lakhs for commercial bio-CNG / biomass briquetting plants.',
    ministry: 'Ministry of New and Renewable Energy (MNRE)', department: 'Bioenergy Division',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Capital Subsidy for Green Bioenergy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['DAIRY_ENTREPRENEURS', 'FARMERS', 'RURAL_YOUTH', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'DAIRY_LIVESTOCK'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'COOPERATIVE', 'SHG', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 40000,
      subsidyPercentage: 'Fixed Capital CFA up to ₹50 Lakhs',
      subsidyDetails: '₹9,800 to ₹35,000 per family biogas plant; ₹4 Lakhs - ₹50 Lakhs for industrial/commercial bio-CNG and briquette plants.',
      loanDetails: 'Bank financing available under IREDA and priority sector lending.',
      marginMoneyDetails: '15% - 20% own funds.', interestDetails: 'Concessional green credit interest.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE cover applicable.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Biogas / Briquette DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Feedstock availability and plant capacity layout' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Bioenergy Plant DPR', description: 'Establish daily dung/crop residue feedstock volume.' },
      { step: 2, title: 'Apply on Biourja Portal', description: 'Register on biourja.mnre.gov.in through State Nodal Agency (SNA).' },
      { step: 3, title: 'Plant Commissioning & Subsidy Credit', description: 'SNA inspects live plant and credits Central Financial Assistance (CFA).' }
    ],
    officialWebsite: 'https://biourja.mnre.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nbp',
    officialSource: 'Ministry of New and Renewable Energy (MNRE)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct CFA capital subsidy up to ₹50 Lakhs for commercial bio-CNG', 'Turns dairy cattle dung and crop residue into saleable fuel and organic manure', 'Reduces enterprise diesel and cooking gas expenditures to near zero']
  },

  // 33. PM MITRA TEXTILE SCHEME
  {
    id: 'pm_mitra_textile',
    name: 'PM MITRA (Mega Integrated Textile Region and Apparel Units)',
    shortDescription: 'Incentives up to ₹300 Crore infrastructure support and up to 3% operational incentives for textile, apparel, and garment manufacturing units.',
    ministry: 'Ministry of Textiles', department: 'Textile Division',
    schemeType: 'INFRASTRUCTURE', schemeCategoryLabel: 'Textile Manufacturing & Modernization Support',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TEXTILE_ENTREPRENEURS', 'WOMEN', 'MICRO_ENTERPRISES', 'EXPORTERS'],
    businessSectors: ['MANUFACTURING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic industrial knowledge'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 15000000, minimumFunding: 500000,
      subsidyPercentage: 'Up to 30% Capital Support + Plug & Play Infrastructure',
      subsidyDetails: 'Zero infrastructure capital cost for plug-and-play textile park sheds; 3% operational turnover incentive for 3 years.',
      loanDetails: 'Consortium bank financing with priority textile interest rates.',
      marginMoneyDetails: '15% promoter margin.', interestDetails: 'Concessional priority textile lending.', repaymentDetails: '7 to 10 years.', collateralRequirement: 'Credit guarantee coverage available.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' },
      { id: 'doc_dpr', name: 'Garmenting / Weaving DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Production volume, machinery, and market linkages' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Garment Manufacturing DPR', description: 'Detail machinery setup, loom counts, and export orders.' },
      { step: 2, title: 'Apply on Ministry of Textiles Portal', description: 'Submit on texmin.nic.in.' },
      { step: 3, title: 'Unit Allotment & Incentive Sanction', description: 'Receive plug-and-play manufacturing shed allotment.' }
    ],
    officialWebsite: 'https://texmin.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pm-mitra',
    officialSource: 'Ministry of Textiles National Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Plug-and-play manufacturing sheds with zero factory construction hassle', 'Integrated common effluent treatment (CETP) and logistics support', 'Substantial operational turnover incentive for 3 consecutive years']
  },

  // 34. IFLDP (INDIAN FOOTWEAR & LEATHER DEVELOPMENT)
  {
    id: 'ifldp_leather_footwear',
    name: 'Indian Footwear and Leather Development Programme (IFLDP)',
    shortDescription: 'Up to 30% capital subsidy for modernizing footwear, leather goods, and saddlery manufacturing equipment.',
    ministry: 'Ministry of Commerce and Industry', department: 'DPIIT',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '30% Machinery Modernization Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'MICRO_ENTERPRISES', 'SC', 'ST', 'WOMEN'],
    businessSectors: ['MANUFACTURING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic craft or technical experience'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3000000, minimumFunding: 200000,
      subsidyPercentage: '30% of Plant and Machinery Cost',
      subsidyDetails: '30% capital subsidy on state-of-the-art cutting, stitching, lasting, and finishing machines for micro/small enterprises.',
      loanDetails: 'Term loan from scheduled commercial banks.',
      marginMoneyDetails: '15% own investment.', interestDetails: 'Standard commercial MSME rate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' },
      { id: 'doc_dpr', name: 'Machinery Quotation DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Invoice quotations from certified machinery suppliers' }
    ],
    applicationProcess: [
      { step: 1, title: 'Procure Machinery Quotations', description: 'Obtain proforma invoices for modern footwear machinery.' },
      { step: 2, title: 'Submit on IFLDP Portal', description: 'Apply online on ifldp.dpiit.gov.in.' },
      { step: 3, title: 'Inspection & Direct Reimbursement', description: 'FDDI technical team inspects installation and releases grant.' }
    ],
    officialWebsite: 'https://dpiit.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ifldp',
    officialSource: 'DPIIT, Ministry of Commerce and Industry',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['30% capital subsidy on modern footwear machinery', 'Inspection and certification facilitated by Footwear Design & Development Institute (FDDI)', 'Dedicated incentives for indigenous artisan clusters and micro cobblers']
  },

  // 35. MEITY CHIPS TO STARTUP / DLI
  {
    id: 'meity_chips_to_startup',
    name: 'MeitY Chips to Startup & Design-Linked Incentive (DLI)',
    shortDescription: 'Financial reimbursement up to 50% of eligible design expenditure and deployment incentives up to 6% for Indian electronics and hardware ventures.',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)', department: 'India Semiconductor Mission (ISM)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to 50% Hardware & Design Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TECH_ENTREPRENEURS', 'STARTUPS', 'STUDENTS', 'ENGINEERS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP', 'PARTNERSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 30000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Diploma or Degree in technical field preferred'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 15000000, minimumFunding: 200000,
      subsidyPercentage: 'Up to 50% of Eligible Expenditure',
      subsidyDetails: '50% reimbursement on EDA design tools, PCB fabrication, and prototype testing; 4%-6% incentive on net sales for 5 years.',
      loanDetails: 'Equity and seed grants available via C-DAC.',
      marginMoneyDetails: 'Not required for prototyping grants.', interestDetails: 'Non-repayable grant.', repaymentDetails: 'Not applicable for pure grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Hardware Design & Prototype Proposal', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Technical design document and bill of materials' }
    ],
    applicationProcess: [
      { step: 1, title: 'Prepare Architecture Proposal', description: 'Detail schematic, hardware component list, and target application.' },
      { step: 2, title: 'Submit on C-DAC / ISM Portal', description: 'Register on c2s.gov.in or meity.gov.in.' },
      { step: 3, title: 'Peer Review & Fund Disbursement', description: 'Technical evaluation committee sanctions prototyping grant.' }
    ],
    officialWebsite: 'https://www.c2s.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/dli-semicon',
    officialSource: 'MeitY & India Semiconductor Mission',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['50% direct grant on EDA design tools and prototype PCB fabrication', 'Free access to national supercomputing facilities and test beds', 'Deployment incentive of up to 6% on product sales']
  },

  // 36. PM E-DRIVE (ELECTRIC MOBILITY & COMMERCIAL TRANSPORT)
  {
    id: 'pm_e_drive_transport',
    name: 'PM Electric Drive Revolution (PM E-DRIVE)',
    shortDescription: 'Direct upfront purchase subsidy of ₹25,000 to ₹50,000 for electric commercial three-wheelers, cargo delivery autos, and electric light trucks.',
    ministry: 'Ministry of Heavy Industries', department: 'Automotive Division',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Electric Commercial Vehicle Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'MICRO_ENTERPRISES', 'DRIVER_ENTREPRENEURS'],
    businessSectors: ['SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'INDIVIDUAL', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 150000, maxProjectCost: 1200000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Valid Commercial Driving License'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 50000, minimumFunding: 25000,
      subsidyPercentage: 'Direct ₹25,000 - ₹50,000 Upfront Price Deduction',
      subsidyDetails: 'Deducted directly on invoice at authorized dealership; funded via DBT from Ministry of Heavy Industries.',
      loanDetails: 'PSU bank tie-ups (SBI, PNB) provide 85% vehicle loan at concessional green EV rates.',
      marginMoneyDetails: '10% - 15% down payment.', interestDetails: 'Concessional EV interest rate (approx 7.5% - 9%).', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Vehicle hypothecation only (no third-party guarantee needed).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN card' },
      { id: 'doc_dl', name: 'Commercial Driving License', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Valid driver license for 3W/Light commercial vehicle' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select Electric Cargo / Auto Model', description: 'Visit authorized OEM dealership with Aadhaar and driving license.' },
      { step: 2, title: 'Generate e-Voucher on PM E-DRIVE Portal', description: 'Dealer enters Aadhaar OTP on heavyindustries.gov.in.' },
      { step: 3, title: 'Instant Price Discount & Delivery', description: 'Subsidy deducted directly from ex-showroom invoice.' }
    ],
    officialWebsite: 'https://heavyindustries.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pm-e-drive',
    officialSource: 'Ministry of Heavy Industries',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Instant upfront price deduction up to ₹50,000 at showroom', 'Cuts commercial cargo running cost by over 75% compared to diesel', 'Subsidized priority financing through public sector banks']
  },

  // 37. PTUAS (PHARMA TECHNOLOGY UPGRADATION)
  {
    id: 'ptuas_pharma_msme',
    name: 'Pharmaceutical Technology Upgradation Assistance Scheme (PTUAS)',
    shortDescription: 'Up to 20% capital subsidy or 6% interest subvention for pharmaceutical and Ayurvedic/Ayush MSMEs upgrading to revised Schedule M and WHO-GMP standards.',
    ministry: 'Ministry of Chemicals and Fertilizers', department: 'Department of Pharmaceuticals',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Up to 20% Quality Modernization Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['PHARMA_ENTREPRENEURS', 'MICRO_ENTERPRISES', 'AYUSH_MANUFACTURERS'],
    businessSectors: ['MANUFACTURING', 'SERVICES'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 1000000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Relevant technical degree or pharmacy background'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2000000, minimumFunding: 1000000,
      subsidyPercentage: 'Up to 20% Capital Reimbursement or 6% Interest Subvention',
      subsidyDetails: '20% capital subsidy up to ₹2 Crore for plant modernization, HVAC cleanrooms, and testing instruments.',
      loanDetails: 'Bank term loan linked subsidy via SIDBI or scheduled banks.',
      marginMoneyDetails: '15% own contribution.', interestDetails: 'Net interest as low as 4% after 6% subvention.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_drug_license', name: 'Manufacturing Drug License / Ayush License', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Valid state drug controller manufacturing license' },
      { id: 'doc_dpr', name: 'WHO-GMP Upgradation DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Cleanroom specifications and test equipment quotes' }
    ],
    applicationProcess: [
      { step: 1, title: 'Draft Modernization DPR', description: 'Consult certified pharmaceutical architect for Schedule M upgrade.' },
      { step: 2, title: 'Submit on DoP Online Portal', description: 'Apply via pharmaceuticals.gov.in.' },
      { step: 3, title: 'Sanction & Reimbursement via SIDBI', description: 'Subsidy disbursed post technical validation inspection.' }
    ],
    officialWebsite: 'https://pharmaceuticals.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ptuas',
    officialSource: 'Department of Pharmaceuticals',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹2 Crore capital subsidy for upgrading to global WHO-GMP quality standards', '6% interest subvention on commercial bank modernization loans', 'Enables Indian pharma and herbal units to export globally']
  },

  // 38. ROOFTOP SOLAR MSME ACCELERATED INCENTIVE
  {
    id: 'solar_rooftop_msme',
    name: 'MNRE Rooftop Solar MSME Accelerated Incentive',
    shortDescription: 'Up to 40% capital subsidy and accelerated depreciation for MSME factory rooftops to slash manufacturing power bills by up to 70%.',
    ministry: 'Ministry of New and Renewable Energy (MNRE)', department: 'Solar Rooftop Division',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '40% Rooftop Solar Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'MANUFACTURERS', 'SERVICES', 'ALL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'DAIRY_LIVESTOCK'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 60000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2000000, minimumFunding: 60000,
      subsidyPercentage: '40% Capital Subsidy for Units up to 10kW; 20% beyond',
      subsidyDetails: 'Direct DBT subsidy credited within 30 days of net meter installation; 40% accelerated tax depreciation under IT Act.',
      loanDetails: 'Concessional 7% collateral-free solar loans via SIDBI and nationalized banks.',
      marginMoneyDetails: '10% down payment.', interestDetails: 'Concessional green credit interest (approx 7%).', repaymentDetails: '5 to 7 years (EMI lower than power bill savings).', collateralRequirement: 'Zero collateral up to ₹50 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_ebill', name: 'Recent Factory / Enterprise Electricity Bill', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Proof of commercial connection and consumer number' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on National Solar Portal', description: 'Apply on solarrooftop.gov.in with consumer account number.' },
      { step: 2, title: 'Technical Feasibility Approval', description: 'Local DISCOM approves net metering within 15 days.' },
      { step: 3, title: 'Installation & DBT Subsidy Release', description: 'Certified vendor installs panels; subsidy credited directly to bank.' }
    ],
    officialWebsite: 'https://solarrooftop.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pm-surya-ghar',
    officialSource: 'Ministry of New and Renewable Energy (MNRE)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct DBT subsidy credited into bank account within 30 days of net metering', 'Cuts enterprise electricity bills by up to 70% for 25 years', 'Concessional 7% collateral-free bank financing available']
  },

  // 39. SFAC FORMATION & PROMOTION OF 10,000 FPOS
  {
    id: 'fpo_equity_grant',
    name: 'SFAC Equity Grant & Credit Guarantee for FPOs',
    shortDescription: 'Matching equity grant up to ₹15 Lakhs and credit guarantee cover up to ₹2 Crore for farmer-owned collectives and agro-processing producer companies.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'Small Farmers Agri-Business Consortium (SFAC)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Matching Equity Grant up to ₹15 Lakhs',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'WOMEN', 'AGRI_PRENEURS', 'RURAL_YOUTH', 'SHG'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'TRADING'],
    businessTypes: ['FPO', 'COOPERATIVE', 'PVT_LTD'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 200000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1500000, minimumFunding: 100000,
      subsidyPercentage: '1:1 Matching Equity Grant up to ₹15 Lakhs',
      subsidyDetails: 'Matches the equity capital contributed by farmer shareholder members rupee-for-rupee up to ₹15 Lakhs + ₹18 Lakhs 3-year management grant.',
      loanDetails: 'Eligible for collateral-free bank term loans and working capital up to ₹2 Crore.',
      marginMoneyDetails: 'Member equity acts as margin.', interestDetails: 'Priority sector agriculture lending rate.', repaymentDetails: '5 years with 1-year moratorium.', collateralRequirement: 'SFAC / NABSanrakshan credit guarantee cover up to 85%.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar of Board Directors', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Director identity' },
      { id: 'doc_coi', name: 'Certificate of Incorporation (FPO / Producer Company)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MCA incorporation certificate' },
      { id: 'doc_shareholders', name: 'Shareholder Member Registry & Bank Account Statement', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'List of paid-up farmer shareholders' }
    ],
    applicationProcess: [
      { step: 1, title: 'Incorporate Farmer Producer Company', description: 'Register with at least 100 farmers in plains or 30 in hills.' },
      { step: 2, title: 'Apply on SFAC Portal', description: 'Submit matching equity claim on sfacindia.com.' },
      { step: 3, title: 'Direct Equity Grant Credit', description: 'SFAC transfers matching equity grant directly to FPO capital account.' }
    ],
    officialWebsite: 'https://sfacindia.com/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sfac-egs',
    officialSource: 'Small Farmers Agri-Business Consortium (SFAC)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['1:1 matching equity grant up to ₹15 Lakhs with zero repayment obligation', 'Additional ₹18 Lakhs 3-year managerial and operational support grant', 'Credit guarantee cover up to ₹2 Crore without collateral']
  },

  // 40. GRAMODYOG VIKAS YOJANA (GVY)
  {
    id: 'gramodyog_vikas_yojana',
    name: 'Gramodyog Vikas Yojana (GVY - Village Industries Toolkit)',
    shortDescription: 'Free modern motorized toolkits and machinery distribution for pottery, incense sticks, handmade paper, and village leather crafts with master artisan training.',
    ministry: 'Ministry of MSME', department: 'Khadi and Village Industries Commission (KVIC)',
    schemeType: 'TRAINING', schemeCategoryLabel: 'Free Modern Machinery & Toolkit Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'RURAL_YOUTH', 'WOMEN', 'SC', 'ST'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 15000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Artisan lineage or basic craft skill'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 800000, minimumFunding: 20000,
      subsidyPercentage: '100% Free Toolkits & 80% Machinery Subsidy',
      subsidyDetails: 'Motorized electric pottery wheels, agarbatti making machines, leather stitchers distributed 100% free of cost with training stipends.',
      loanDetails: 'Bank linkage under PMEGP for enterprise scale-up.',
      marginMoneyDetails: 'Nil for direct toolkit grant.', interestDetails: 'Zero interest.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_artisan', name: 'Artisan Proof / Village Panchayat Recommendation', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Verification of traditional village craft trade' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register with Nearest KVIC Office', description: 'Apply online on kviconline.gov.in under GVY portal.' },
      { step: 2, title: 'Practical Hands-on Skill Training', description: 'Attend 5 to 10-day hands-on machinery training course.' },
      { step: 3, title: 'Toolkit Distribution & Enterprise Launch', description: 'Receive motorized machinery and raw material support.' }
    ],
    officialWebsite: 'https://www.kviconline.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/gvy',
    officialSource: 'KVIC, Ministry of MSME',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% free motorized equipment (electric pottery wheels, agarbatti machines)', 'Daily training stipend and certification included', 'Direct raw material bank and marketing tie-ups via Khadi Bhavans']
  }
];
