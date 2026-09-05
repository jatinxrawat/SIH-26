/**
 * State Government Entrepreneurship & Subsidy Schemes Catalog
 * Real, verified schemes covering all major Indian states.
 */

export const STATE_SCHEMES = [
  // ================= MAHARASHTRA =================
  {
    id: 'maha_cmeegp',
    name: "Chief Minister's Employment Generation Programme (CMEEGP - Maharashtra)",
    shortDescription: 'State capital subsidy up to 35% for setting up new micro-enterprises in manufacturing and services in Maharashtra.',
    ministry: 'Government of Maharashtra', department: 'Directorate of Industries',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'State Capital Subsidy (15% - 35%)',
    applicableStates: ['Maharashtra'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'REGISTRATION', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'VII pass for project above ₹10L Mfg'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 5000000, minimumFunding: 100000,
      subsidyPercentage: '15% to 35% State Capital Subsidy',
      subsidyDetails: 'Rural Special (Women/SC/ST/OBC): 35%. Urban Special: 25%. Rural General: 25%. Urban General: 15%.',
      loanDetails: 'Bank sanctions 90% - 95% project cost as composite loan.',
      marginMoneyDetails: 'Own contribution 5% for Special Categories, 10% for General.',
      interestDetails: 'Commercial bank rate with state interest subvention convergence.',
      repaymentDetails: '3 to 7 years with 6-month moratorium.',
      collateralRequirement: 'Collateral-free covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile', name: 'Maharashtra Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Mandatory proof of residence in Maharashtra' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Capital project blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration', description: 'Register on maha-cmegp.gov.in.' },
      { step: 2, title: 'DIC Scrutiny & Bank Sanction', description: 'General Manager DIC verifies and bank sanctions loan with 35% margin subsidy.' }
    ],
    officialWebsite: 'https://maha-cmegp.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cmeegp-maharashtra',
    officialSource: 'Directorate of Industries, Govt of Maharashtra',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 35% state capital subsidy matching Central PMEGP scale', 'Single-window DIC digital clearance', 'Special 5% promoter equity concession for women']
  },
  {
    id: 'maha_psi_msme',
    name: 'Maharashtra Package Scheme of Incentives (PSI) for MSMEs',
    shortDescription: 'Industrial promotion subsidy (up to 100% of Fixed Capital Investment), electricity duty exemption, and 5% interest subsidy.',
    ministry: 'Government of Maharashtra', department: 'Industries, Energy and Labour Department',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'State Industrial Subsidy (up to 100% FCI)',
    applicableStates: ['Maharashtra'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'WOMEN', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 100000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME with Udyam in Maharashtra'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 25000000, minimumFunding: 500000,
      subsidyPercentage: 'Up to 80% - 100% of Fixed Capital Investment (FCI)',
      subsidyDetails: 'Reimbursement of SGST, 5% interest subvention for 5 years, and 100% electricity duty exemption for 7 to 10 years.',
      loanDetails: 'Sanctioned by MSFC or scheduled commercial banks.',
      marginMoneyDetails: 'Normal industrial margin 15% - 25%.',
      interestDetails: '5% interest subsidy credited annually.',
      repaymentDetails: '7 to 10 years.', collateralRequirement: 'Standard industrial collateral terms.'
    },
    requiredDocuments: [
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_fci', name: 'Fixed Capital Investment (FCI) CA Certificate', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Certified plant & machinery investment' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Maitri Portal', description: 'Register on maitri.mahaonline.gov.in.' },
      { step: 2, title: 'Eligibility Certificate (EC)', description: 'DIC issues Eligibility Certificate for SGST refund and electricity exemption.' }
    ],
    officialWebsite: 'https://di.maharashtra.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/psi-maharashtra',
    officialSource: 'Directorate of Industries, Maharashtra',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 100% reimbursement of eligible Fixed Capital Investment', '5% annual interest rebate for 5 years', '100% electricity duty exemption for up to 10 years']
  },

  // ================= UTTAR PRADESH =================
  {
    id: 'up_cmysy',
    name: 'Mukhyamantri Yuva Swarojgar Yojana (UP - CMYSY)',
    shortDescription: '25% margin money subsidy up to ₹6.25 Lakhs for industry units (up to ₹25L) and up to ₹2.5 Lakhs for service ventures in UP.',
    ministry: 'Government of Uttar Pradesh', department: 'Department of MSME and Export Promotion',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'State Capital Subsidy (25%)',
    applicableStates: ['Uttar Pradesh'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 40, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Minimum High School (10th passed)'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: '25% Margin Money Capital Subsidy',
      subsidyDetails: '25% margin subsidy (max ₹6.25L in Mfg, ₹2.5L in Services) converted to grant after 2 years successful unit operation.',
      loanDetails: 'Bank provides 75% - 85% project cost as credit.',
      marginMoneyDetails: '10% promoter equity for general; 5% for SC/ST/OBC/Women.',
      interestDetails: 'Standard MSME commercial lending rate.',
      repaymentDetails: '5 to 7 years with 6-month moratorium.',
      collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_up', name: 'UP Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Residence proof of UP' },
      { id: 'doc_10th', name: 'High School (10th) Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Proof of age and qualification' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on DIUP Portal', description: 'Submit digital application on diupmsme.upsdc.gov.in.' },
      { step: 2, title: 'Bank Loan Sanction', description: 'Bank sanctions loan; state deposits 25% margin money into TDR.' }
    ],
    officialWebsite: 'https://diupmsme.upsdc.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cmysy-up',
    officialSource: 'Department of MSME, Govt of Uttar Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% margin money subsidy up to ₹6.25 Lakhs', 'Subsidies convert to non-repayable grant after 2 years', 'Fast-track digital clearance via DIUP single-window portal']
  },
  {
    id: 'up_odop_margin',
    name: 'Uttar Pradesh ODOP Margin Money Scheme',
    shortDescription: 'Up to 25% margin money subsidy (capped at ₹20 Lakhs) for artisans and micro-entrepreneurs in 75 designated ODOP craft clusters.',
    ministry: 'Government of Uttar Pradesh', department: 'Directorate of Industries, UP',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'ODOP Cluster Subsidy up to ₹20 Lakhs',
    applicableStates: ['Uttar Pradesh'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['ARTISANS', 'TRADITIONAL_CRAFTS', 'WOMEN', 'SC', 'ST', 'OBC'],
    businessSectors: ['HANDICRAFTS', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 25000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Practicing artisan in district ODOP craft'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2000000, minimumFunding: 50000,
      subsidyPercentage: '10% to 25% Margin Money Subsidy',
      subsidyDetails: 'Project up to ₹25L: 25% (max ₹6.25L). Project ₹25L - ₹50L: 20% (max ₹10L). Project ₹50L - ₹1.5 Cr: 10% (max ₹20L).',
      loanDetails: 'Bank provides credit for balance amount.',
      marginMoneyDetails: 'Promoter contributes 10%.', interestDetails: 'Bank lending rate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity' },
      { id: 'doc_odop_product', name: 'Proof of ODOP Craft Trade', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.productService', description: 'Verification of district ODOP trade' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit ODOP Dossier', description: 'Apply online on diupmsme.upsdc.gov.in under ODOP window.' },
      { step: 2, title: 'Subsidy Release', description: 'Margin subsidy credited upon bank loan disbursement.' }
    ],
    officialWebsite: 'https://diupmsme.upsdc.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/odop-up',
    officialSource: 'Directorate of Industries, UP',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹20 Lakhs margin money grant for designated district crafts', 'Covers Varanasi Silk, Bhadohi Carpets, Moradabad Brass, Agra Leather, etc.', 'Includes free modern toolkits and marketing fair stalls']
  },

  // ================= BIHAR =================
  {
    id: 'bihar_mmy_udyami',
    name: 'Bihar Mukhyamantri Udyami Yojana (Women/SC/ST/EBC/Yuva)',
    shortDescription: '₹10 Lakhs financial assistance comprising 50% non-repayable grant (₹5 Lakhs) and 50% interest-free loan (₹5 Lakhs) for new micro-units.',
    ministry: 'Government of Bihar', department: 'Department of Industries, Bihar',
    schemeType: 'GRANT', schemeCategoryLabel: '50% Grant (₹5L) + 50% Interest-Free Loan (₹5L)',
    applicableStates: ['Bihar'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH', 'GENERAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 50, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 1000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: '10+2 (Intermediate) or ITI / Diploma pass'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 200000,
      subsidyPercentage: '50% Direct Grant (₹5,00,000) + 50% Interest-Free Loan',
      subsidyDetails: '₹5 Lakhs provided as non-repayable direct government grant; remaining ₹5 Lakhs repayable in 84 monthly installments with 0% interest (1% for Yuva category).',
      loanDetails: '₹5,00,000 interest-free term loan funded directly by State Govt.',
      marginMoneyDetails: 'Nil promoter contribution mandated.',
      interestDetails: '0% interest for Women, SC, ST, EBC; only 1% simple interest for General/OBC Yuva.',
      repaymentDetails: '84 monthly installments (7 years) starting after 1 year moratorium.',
      collateralRequirement: 'Zero collateral required.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_bihar', name: 'Bihar Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Proof of residence in Bihar' },
      { id: 'doc_12th', name: '10+2 / Intermediate / ITI Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Annual Online Registration', description: 'Register on udyami.bihar.gov.in.' },
      { step: 2, title: 'Computerized Lottery Selection', description: 'State conducts transparent computerized draw.' },
      { step: 3, title: '2-Week Free Training in Patna', description: 'Attend residential enterprise training.' },
      { step: 4, title: 'Direct Disbursement in 3 Tranches', description: 'Funds released directly to entrepreneur current account in 3 stages.' }
    ],
    officialWebsite: 'https://udyami.bihar.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/bmuy',
    officialSource: 'Department of Industries, Govt of Bihar',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['₹5,00,000 non-repayable grant + ₹5,00,000 interest-free loan (0% interest)', 'No collateral, funded directly by State Government without bank hurdles', 'Over 102 industrial project profiles supported']
  },

  // ================= TAMIL NADU =================
  {
    id: 'tamilnadu_needs',
    name: 'New Entrepreneur-cum-Enterprise Development Scheme (NEEDS - Tamil Nadu)',
    shortDescription: '25% capital subsidy up to ₹75 Lakhs and 3% interest subvention for educated first-generation entrepreneurs in Tamil Nadu.',
    ministry: 'Government of Tamil Nadu', department: 'Department of MSME, Tamil Nadu',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '25% Subsidy up to ₹75 Lakhs & 3% Interest Rebate',
    applicableStates: ['Tamil Nadu'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 21, maxAge: 35, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 1000000, maxProjectCost: 50000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Degree / Diploma / ITI / Vocational passed'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 50000000, minimumFunding: 1000000,
      subsidyPercentage: '25% State Capital Subsidy (up to ₹75 Lakhs)',
      subsidyDetails: '25% project cost subsidy up to ₹75 Lakhs ceiling + 3% interest subvention for entire tenure.',
      loanDetails: 'TIIC or Commercial banks sanction up to 65% - 70% project cost.',
      marginMoneyDetails: '10% promoter equity for General; only 5% for Women, SC, ST, and OBC.',
      interestDetails: '3% interest subvention throughout repayment.',
      repaymentDetails: 'Up to 7 to 9 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_degree', name: 'Degree / Diploma / ITI Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Online Application', description: 'Register on msmeonline.tn.gov.in.' },
      { step: 2, title: 'Task Force Interview', description: 'DIC interviews applicant and recommends to bank.' },
      { step: 3, title: 'EDP Training at EDII-TN', description: 'Complete 1-month Entrepreneurship Development Programme.' }
    ],
    officialWebsite: 'https://www.msmeonline.tn.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/needs-tn',
    officialSource: 'Department of MSME, Govt of Tamil Nadu',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% state capital subsidy up to ₹75,00,000', '3% interest rebate for entire loan tenure', 'Dedicated to first-generation educated entrepreneurs in Tamil Nadu']
  },
  {
    id: 'tamilnadu_uagree',
    name: 'Unemployed Youth Employment Generation Programme (UYEGP - Tamil Nadu)',
    shortDescription: '25% capital subsidy up to ₹1.25 Lakhs for micro-enterprises with total project cost up to ₹15 Lakhs in Tamil Nadu.',
    ministry: 'Government of Tamil Nadu', department: 'Directorate of Industries and Commerce',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'State Subsidy (25% up to ₹1.25 Lakhs)',
    applicableStates: ['Tamil Nadu'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'SC', 'ST', 'OBC', 'DIFF_ABLED'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'INDIVIDUAL'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 35, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 1500000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Minimum 8th standard pass'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 1500000, minimumFunding: 50000,
      subsidyPercentage: '25% Capital Subsidy (up to ₹1.25 Lakhs)',
      subsidyDetails: '25% government subsidy capped at ₹1.25 Lakhs.',
      loanDetails: 'Bank term loan and working capital credit up to 90% - 95%.',
      marginMoneyDetails: '5% for Special Categories; 10% for General.',
      interestDetails: 'Normal priority sector lending rate.',
      repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_tc', name: '8th / 10th School Transfer Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Proof of educational qualification' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on UYEGP Portal', description: 'Submit digital form on msmeonline.tn.gov.in/uyegp.' },
      { step: 2, title: 'Bank Loan Sanction', description: 'Bank releases composite loan with 25% front-ended state subsidy.' }
    ],
    officialWebsite: 'https://www.msmeonline.tn.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/uyegp-tn',
    officialSource: 'Directorate of Industries and Commerce, Tamil Nadu',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% capital subsidy up to ₹1,25,000 for unemployed youth', 'Covers trading and commercial retail ventures', 'Low minimum qualification: 8th pass']
  },

  // ================= GUJARAT =================
  {
    id: 'gujarat_msme_capital',
    name: 'Gujarat Scheme for Assistance to MSMEs (Capital & Interest Subsidy)',
    shortDescription: 'Capital investment subsidy up to 25% (up to ₹35 Lakhs) and 5% to 7% interest subsidy for 5 to 7 years in Gujarat.',
    ministry: 'Government of Gujarat', department: 'Industries and Mines Department, Gujarat',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Capital Subsidy & 7% Interest Rebate',
    applicableStates: ['Gujarat'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in Gujarat'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3500000, minimumFunding: 200000,
      subsidyPercentage: 'Up to 25% Capital Investment Subsidy + 7% Interest Subsidy',
      subsidyDetails: '25% of eligible plant and machinery cost in Category 3 talukas; 7% interest subsidy for 5 years (up to ₹35 Lakhs per year).',
      loanDetails: 'Bank term loan approved by scheduled commercial bank/GSFC.',
      marginMoneyDetails: '15% promoter contribution.', interestDetails: '7% interest rebate for micro enterprises.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Standard bank security.'
    },
    requiredDocuments: [
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active Gujarat MSME' },
      { id: 'doc_fci', name: 'CA Certificate for Plant & Machinery Investment', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Certified investment invoice' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Investor Portal', description: 'Log in on ifp.gujarat.gov.in.' },
      { step: 2, title: 'Submit Subsidy Claim', description: 'Upload CA certificate and bank term loan sanction letter.' }
    ],
    officialWebsite: 'https://msme.gujarat.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/msme-gujarat',
    officialSource: 'Industries Commissionerate, Govt of Gujarat',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 25% direct capital investment grant on plant machinery', '7% interest subvention for 5 consecutive years', 'Additional 1% interest rebate for women entrepreneurs']
  },

  // ================= KARNATAKA =================
  {
    id: 'karnataka_cmegp',
    name: "Chief Minister's Employment Generation Programme (CMEGP - Karnataka)",
    shortDescription: 'State capital subsidy up to 35% (max ₹10 Lakhs) for new micro-enterprises in manufacturing, services, and processing in Karnataka.',
    ministry: 'Government of Karnataka', department: 'Department of Commerce and Industries, Karnataka',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'State Capital Subsidy (up to 35%)',
    applicableStates: ['Karnataka'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 21, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'No formal restriction'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2000000, minimumFunding: 100000,
      subsidyPercentage: '25% (General) to 35% (Women/SC/ST/Minorities)',
      subsidyDetails: '35% capital subsidy for Special Category (Women, SC/ST/OBC); 25% for General Category.',
      loanDetails: 'Nationalized and cooperative banks sanction 90% - 95% project cost.',
      marginMoneyDetails: '5% for Special Category; 10% for General.',
      interestDetails: 'Commercial bank rate.', repaymentDetails: '5 to 7 years with 6-month moratorium.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity proof' },
      { id: 'doc_domicile_kar', name: 'Karnataka Domicile / Ration Card', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Karnataka residential proof' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Project cost blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on CEDOK Portal', description: 'Submit digital application on cmegp.kar.nic.in.' },
      { step: 2, title: 'DLTFC Selection & EDP Training', description: 'Attend mandatory training at CEDOK / RUDSETI.' },
      { step: 3, title: 'Bank Disbursement & Subsidy Lock-in', description: 'Bank disburses loan with margin money subsidy held in escrow.' }
    ],
    officialWebsite: 'https://karnatakacedok.com/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cmegp-karnataka',
    officialSource: 'Department of Commerce and Industries, Govt of Karnataka',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 35% state capital subsidy (max ₹10,00,000)', 'Free CEDOK / RUDSETI entrepreneurship training', '5% promoter contribution for women and SC/ST beneficiaries']
  },

  // ================= RAJASTHAN =================
  {
    id: 'rajasthan_mlupy',
    name: 'Mukhyamantri Laghu Udyog Protsahan Yojana (Rajasthan - MLUPY)',
    shortDescription: 'Concessional loans up to ₹10 Crore with 5% to 8% interest subsidy for manufacturing, service, and trading enterprises in Rajasthan.',
    ministry: 'Government of Rajasthan', department: 'Department of Industries and Commerce, Rajasthan',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '5% - 8% Interest Subsidy up to ₹10 Crore',
    applicableStates: ['Rajasthan'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 100000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No minimum qualification'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 100000000, minimumFunding: 50000,
      subsidyPercentage: '8% (up to ₹25L), 6% (₹25L-₹5Cr), 5% (₹5Cr-₹10Cr) Interest Subsidy',
      subsidyDetails: '8% interest subsidy for loans up to ₹25 Lakhs; 6% interest subsidy for loans from ₹25L to ₹5 Crore; 5% up to ₹10 Crore.',
      loanDetails: 'Composite term loan and working capital credit issued by banks and RFC.',
      marginMoneyDetails: '10% to 15% promoter contribution.',
      interestDetails: 'Net effective interest rate as low as 2% - 3% p.a. after 8% state subsidy.',
      repaymentDetails: '5 years repayment tenure.', collateralRequirement: 'CGTMSE covered up to ₹2 Crore.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar / Jan Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Rajasthan Jan Aadhaar card' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN of the enterprise' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply via SSO Rajasthan', description: 'Log in on sso.rajasthan.gov.in and select MLUPY.' },
      { step: 2, title: 'Bank Loan Sanction & Subsidy Credit', description: 'State Govt reimburses interest rebate directly to bank quarterly.' }
    ],
    officialWebsite: 'https://industries.rajasthan.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mlupy',
    officialSource: 'Department of Industries and Commerce, Govt of Rajasthan',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Huge 8% annual interest subsidy on loans up to ₹25 Lakhs', 'Covers trading and retail businesses in addition to manufacturing', 'Loans up to ₹10 Crore supported for enterprise expansion']
  },

  // ================= MADHYA PRADESH =================
  {
    id: 'mp_cmeegp',
    name: 'Mukhyamantri Udyam Kranti Yojana (Madhya Pradesh)',
    shortDescription: 'Collateral-free bank loans from ₹1 Lakh to ₹50 Lakhs with 3% interest subvention and 100% credit guarantee fee waiver in MP.',
    ministry: 'Government of Madhya Pradesh', department: 'Department of MSME, Madhya Pradesh',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '3% Interest Subvention & Zero Collateral',
    applicableStates: ['Madhya Pradesh'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Minimum 12th class pass (Intermediate)'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 5000000, minimumFunding: 100000,
      subsidyPercentage: '3% p.a. Interest Subvention for 7 years',
      subsidyDetails: '3% per annum interest subsidy for 7 years + State Govt pays 100% CGTMSE guarantee fee on behalf of entrepreneur.',
      loanDetails: 'Bank provides composite term loan and working capital credit.',
      marginMoneyDetails: 'Promoter equity 10% - 15%.', interestDetails: 'Bank rate minus 3% state subvention.', repaymentDetails: '7 years.', collateralRequirement: 'Completely collateral-free.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card / Samagra ID', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'MP Samagra portal ID' },
      { id: 'doc_domicile_mp', name: 'MP Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of Madhya Pradesh' },
      { id: 'doc_12th_mp', name: '12th Class Pass Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on MP Online Samast Portal', description: 'Submit digital application on samast.mponline.gov.in.' },
      { step: 2, title: 'Bank Sanction with 3% Subvention', description: 'Bank sanctions loan without asking for collateral.' }
    ],
    officialWebsite: 'https://mpmsme.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mmuky-mp',
    officialSource: 'Department of MSME, Govt of Madhya Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['3% annual interest subvention for 7 full years', 'State Govt pays 100% CGTMSE credit guarantee fee', 'Loans up to ₹50 Lakhs for manufacturing and up to ₹25 Lakhs for services']
  },

  // ================= KERALA =================
  {
    id: 'kerala_ess',
    name: 'Kerala Entrepreneur Support Scheme (ESS)',
    shortDescription: 'Investment subsidy up to 25% (up to ₹30 Lakhs) for micro, small, and medium enterprises in manufacturing and agro-processing in Kerala.',
    ministry: 'Government of Kerala', department: 'Directorate of Industries and Commerce, Kerala',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'State Investment Subsidy up to ₹30 Lakhs',
    applicableStates: ['Kerala'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'DIFF_ABLED'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 30000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in Kerala'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3000000, minimumFunding: 200000,
      subsidyPercentage: '15% to 25% Investment Subsidy (up to ₹30 Lakhs)',
      subsidyDetails: '15% for General (max ₹20L); 25% for Women, SC/ST, Differently-abled (max ₹30L) on plant, machinery, and land cost.',
      loanDetails: 'KFC (Kerala Financial Corporation) or commercial bank term loan.',
      marginMoneyDetails: '15% - 25% promoter equity.', interestDetails: 'Bank commercial lending rates.', repaymentDetails: '5 to 8 years.', collateralRequirement: 'KFC / Bank norms apply.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_invoices', name: 'Plant & Machinery Invoices & CA Certificate', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Proof of capital investment' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Kerala Industries Portal', description: 'Submit claim on schemes.kerala.gov.in.' },
      { step: 2, title: 'DIC Inspection & Grant Release', description: 'General Manager DIC inspects factory and releases subsidy directly to loan account.' }
    ],
    officialWebsite: 'https://industry.kerala.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ess-kerala',
    officialSource: 'Directorate of Industries and Commerce, Govt of Kerala',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 25% investment subsidy up to ₹30,00,000 for women and SC/ST', 'Covers capital expenditure on plant, machinery, and factory buildings', 'Fast single-window clearance through K-SWIFT portal']
  },

  // ================= TELANGANA =================
  {
    id: 'telangana_tpride',
    name: 'T-PRIDE (Telangana Program for Rapid Incubation of Dalit Entrepreneurs)',
    shortDescription: '35% to 45% capital investment subsidy up to ₹50 Lakhs and 100% stamp duty waiver for SC/ST and women entrepreneurs in Telangana.',
    ministry: 'Government of Telangana', department: 'Industries and Commerce Department, Telangana',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '35% - 45% Capital Subsidy up to ₹50 Lakhs',
    applicableStates: ['Telangana'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC', 'ST', 'DIFF_ABLED', 'WOMEN'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'ST'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'SC/ST/PH entrepreneur with 100% equity'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 200000,
      subsidyPercentage: '35% to 45% Capital Investment Subsidy (up to ₹50 Lakhs)',
      subsidyDetails: '35% capital subsidy on plant and machinery (45% for women); 100% stamp duty reimbursement, 9% interest subvention for 5 years.',
      loanDetails: 'TSIIC or commercial banks finance remaining portion.',
      marginMoneyDetails: 'Only 5% - 10% promoter equity required.',
      interestDetails: '9% interest subvention credited to bank account.',
      repaymentDetails: '7 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste_ts', name: 'Telangana SC / ST Caste Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Caste certificate' },
      { id: 'doc_tsipass', name: 'TS-iPASS Clearance Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Single window industrial clearance' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain TS-iPASS Clearance', description: 'Apply on tsipass.telangana.gov.in.' },
      { step: 2, title: 'Claim T-PRIDE Subsidy', description: 'Upload investment invoices to receive 35%-45% subsidy credit.' }
    ],
    officialWebsite: 'https://tsipass.telangana.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/t-pride',
    officialSource: 'Industries and Commerce Department, Govt of Telangana',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 45% capital investment subsidy for SC/ST and women entrepreneurs', '9% annual interest rebate for 5 years', '100% reimbursement of stamp duty and transfer charges']
  },

  // ================= ANDHRA PRADESH =================
  {
    id: 'ap_ysr_navodayam',
    name: 'YSR Navodayam & MSME Industrial Incentives (Andhra Pradesh)',
    shortDescription: '15% to 25% capital investment subsidy up to ₹30 Lakhs, 3% interest rebate, and power tariff subsidy of ₹1/unit in Andhra Pradesh.',
    ministry: 'Government of Andhra Pradesh', department: 'Industries and Commerce Department, AP',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'State Investment Subsidy up to ₹30 Lakhs',
    applicableStates: ['Andhra Pradesh'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'BC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in AP'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3000000, minimumFunding: 200000,
      subsidyPercentage: '15% for General; 25% for Women and BC/SC/ST',
      subsidyDetails: '15% to 25% subsidy on cost of fixed capital investment (plant and machinery); 3% interest subvention for 5 years.',
      loanDetails: 'Sanctioned by scheduled commercial banks and APSFC.',
      marginMoneyDetails: '10% - 15% promoter margin.', interestDetails: '3% interest subvention.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on AP Single Desk Portal', description: 'Register on apindustries.gov.in.' },
      { step: 2, title: 'Incentive Disbursement', description: 'DIC verifies and deposits capital subsidy into bank account.' }
    ],
    officialWebsite: 'https://apindustries.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/msme-ap',
    officialSource: 'Industries and Commerce Department, Govt of Andhra Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 25% capital investment subsidy for women and backward classes', '₹1.00 per unit power tariff concession for 5 years', '3% annual interest subvention on term loans']
  },

  // ================= WEST BENGAL =================
  {
    id: 'wb_banglashree',
    name: 'Banglashree Scheme for MSMEs (West Bengal)',
    shortDescription: 'State capital investment subsidy up to 40% (up to ₹50 Lakhs), 6% interest subsidy, and electricity duty waiver for 5 years in West Bengal.',
    ministry: 'Government of West Bengal', department: 'Micro, Small & Medium Enterprises and Textiles Department',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'State Capital Subsidy (up to 40%)',
    applicableStates: ['West Bengal'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in West Bengal'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 200000,
      subsidyPercentage: '20% to 40% State Capital Investment Subsidy',
      subsidyDetails: 'Micro units receive up to 40% subsidy on plant and machinery; 6% interest subvention for 5 years; 100% waiver of electricity duty for 5 years.',
      loanDetails: 'Bank term loan sanctioned by scheduled banks or WBFC.',
      marginMoneyDetails: '10% - 15% promoter margin.', interestDetails: '6% interest subvention.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Silpa Sathi Portal', description: 'Apply on myenterprisewb.in under Banglashree.' },
      { step: 2, title: 'DIC Approval & Disbursement', description: 'District Industries Centre scrutinizes and releases incentive.' }
    ],
    officialWebsite: 'https://myenterprisewb.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/banglashree-wb',
    officialSource: 'MSME and Textiles Department, Govt of West Bengal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 40% capital investment subsidy for micro manufacturing units', '6% interest rebate for 5 years', '100% electricity duty waiver for 5 years']
  },

  // ================= ODISHA =================
  {
    id: 'odisha_msmep',
    name: 'Odisha MSME Policy - Capital Investment Subsidy (CIS)',
    shortDescription: '25% to 33% capital investment subsidy up to ₹1 Crore for micro and small units, plus 5% interest subvention for 5 years in Odisha.',
    ministry: 'Government of Odisha', department: 'MSME Department, Odisha',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '25% - 33% Capital Subsidy up to ₹1 Crore',
    applicableStates: ['Odisha'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'DIFF_ABLED', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME in Odisha with Udyam'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 10000000, minimumFunding: 200000,
      subsidyPercentage: '25% (General) to 33% (Women/SC/ST) Capital Investment Subsidy',
      subsidyDetails: '25% capital subsidy on plant and machinery (33% for women, SC, ST, technical entrepreneurs); 5% interest subsidy for 5 years.',
      loanDetails: 'Bank term loan sanctioned by OSFC or commercial banks.',
      marginMoneyDetails: '10% - 15% promoter margin.', interestDetails: '5% interest subvention.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on GO SWIFT Portal', description: 'Register on goswift.odisha.gov.in.' },
      { step: 2, title: 'Subsidy Release', description: 'DIC releases capital subsidy directly into bank loan account.' }
    ],
    officialWebsite: 'https://msmeodisha.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/msme-odisha',
    officialSource: 'MSME Department, Govt of Odisha',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 33% capital subsidy up to ₹1,00,00,000 for women and SC/ST', '5% annual interest rebate for 5 years', 'Fast-track clearances via GO-SWIFT single window portal']
  },

  // ================= PUNJAB =================
  {
    id: 'punjab_msme_incentive',
    name: 'Punjab Industrial and Business Development Scheme (IBDP)',
    shortDescription: 'Capital subsidy up to 25% (up to ₹25 Lakhs), 5% interest subvention for 7 years, and 100% exemption on stamp duty & electricity duty in Punjab.',
    ministry: 'Government of Punjab', department: 'Department of Industries and Commerce, Punjab',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Capital Subsidy & 5% Interest Rebate',
    applicableStates: ['Punjab'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'MICRO_ENTERPRISES', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in Punjab'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2500000, minimumFunding: 200000,
      subsidyPercentage: '25% Capital Investment Subsidy + 5% Interest Subsidy',
      subsidyDetails: '25% subsidy on plant & machinery up to ₹25 Lakhs; 5% interest subvention for 7 years; 100% electricity duty exemption for 7 years.',
      loanDetails: 'Bank financing through commercial banks or PFC.',
      marginMoneyDetails: '15% promoter margin.', interestDetails: '5% interest subvention.', repaymentDetails: '7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active Punjab MSME' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Invest Punjab Portal', description: 'Apply online on pbindustries.gov.in.' },
      { step: 2, title: 'Incentive Disbursement', description: 'State scrutinizes and disburses incentive directly.' }
    ],
    officialWebsite: 'https://pbindustries.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ibdp-punjab',
    officialSource: 'Department of Industries and Commerce, Govt of Punjab',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% capital subsidy on plant and machinery up to ₹25,00,000', '5% interest rebate for 7 full years', '100% electricity duty and stamp duty exemption']
  },

  // ================= HARYANA =================
  {
    id: 'haryana_hrip_msme',
    name: 'Haryana Enterprises and Employment Policy (HEEP - MSME Subsidy)',
    shortDescription: 'Capital investment subsidy up to 25% (up to ₹30 Lakhs), 6% interest subsidy for 5 years, and ₹48,000/year per worker employment subsidy in Haryana.',
    ministry: 'Government of Haryana', department: 'Department of Industries and Commerce, Haryana',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '25% Capital Subsidy & 6% Interest Rebate',
    applicableStates: ['Haryana'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'MICRO_ENTERPRISES', 'RURAL_YOUTH'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME registration in Haryana'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 3000000, minimumFunding: 200000,
      subsidyPercentage: 'Up to 25% Capital Investment Subsidy (up to ₹30 Lakhs)',
      subsidyDetails: '25% capital investment subsidy in C & D category blocks; 6% interest subsidy for 5 years (up to ₹10L/year); ₹48,000/year employment generation subsidy per local worker.',
      loanDetails: 'Bank term loan approved by scheduled commercial banks.',
      marginMoneyDetails: '15% promoter margin.', interestDetails: '6% interest rebate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active Haryana MSME' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Invest Haryana Portal', description: 'Register on investharyana.in.' },
      { step: 2, title: 'Incentive Approval & Release', description: 'DIC releases subsidy directly into enterprise account.' }
    ],
    officialWebsite: 'https://investharyana.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/heep-haryana',
    officialSource: 'Department of Industries and Commerce, Govt of Haryana',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 25% capital subsidy up to ₹30,00,000 in emerging industrial blocks', '6% interest subvention for 5 years', '₹48,000 annual subsidy per local worker hired']
  },

  // ================= DELHI =================
  {
    id: 'delhi_dsiidc_seed',
    name: 'Delhi Financial Corporation & DSIIDC Seed Capital Scheme',
    shortDescription: 'Collateral-free soft seed loans and working capital assistance up to ₹15 Lakhs for micro-enterprises and service providers in Delhi NCR.',
    ministry: 'Government of NCT of Delhi', department: 'Delhi Financial Corporation (DFC) & DSIIDC',
    schemeType: 'LOAN', schemeCategoryLabel: 'State Soft Loan up to ₹15 Lakhs',
    applicableStates: ['Delhi'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'MICRO_ENTERPRISES', 'RURAL_YOUTH'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'TRADING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['URBAN'],
      minProjectCost: 50000, maxProjectCost: 2000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Resident of Delhi'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 1500000, minimumFunding: 50000,
      subsidyPercentage: 'Concessional Soft Loan Facility',
      subsidyDetails: 'Soft loan assistance at reduced interest rate (2% below standard bank rate) with minimal paperwork.',
      loanDetails: 'Direct lending by Delhi Financial Corporation (DFC).',
      marginMoneyDetails: '10% promoter equity.', interestDetails: 'Concessional rate approx 7.5% - 8.5% p.a.', repaymentDetails: '5 years.', collateralRequirement: 'Personal guarantee / CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Delhi address proof' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Tax identity' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Form on DSIIDC/DFC Portal', description: 'Apply on dsiidc.org or dfc.delhi.gov.in.' },
      { step: 2, title: 'Direct Sanction & Loan Release', description: 'DFC disburses soft loan.' }
    ],
    officialWebsite: 'https://dsiidc.org/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/dfc-delhi',
    officialSource: 'Delhi Financial Corporation & DSIIDC, Govt of NCT of Delhi',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct lending by Delhi Financial Corporation up to ₹15 Lakhs', '2% interest concession below commercial rates', 'Fast-track digital clearance for Delhi NCR entrepreneurs']
  },

  // ================= ASSAM & NORTH EAST =================
  {
    id: 'assam_svayem',
    name: 'Swami Vivekananda Assam Youth Empowerment (SVAYEM - Assam)',
    shortDescription: 'Direct seed grant of ₹50,000 per youth and up to ₹2 Lakhs for youth enterprise groups to start manufacturing and service ventures in Assam.',
    ministry: 'Government of Assam', department: 'Industries and Commerce Department, Assam',
    schemeType: 'GRANT', schemeCategoryLabel: 'Seed Grant (up to ₹2 Lakhs per Group)',
    applicableStates: ['Assam'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'SHG', 'INDIVIDUAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS', 'TRADING'],
    businessTypes: ['INDIVIDUAL', 'SHG', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 40, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Minimum 10th pass'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 200000, minimumFunding: 50000,
      subsidyPercentage: '100% Direct Seed Grant (₹50,000 per member)',
      subsidyDetails: 'Direct seed grant of ₹50,000 in 2 installments into savings account; zero repayment obligation.',
      loanDetails: 'Bank credit linkage up to ₹5 Lakhs facilitated for scaling.',
      marginMoneyDetails: 'Nil promoter contribution.', interestDetails: 'Zero interest on grant.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Nil.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_assam', name: 'Assam Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Proof of residence in Assam' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on SVAYEM Portal', description: 'Apply on industriescom.assam.gov.in.' },
      { step: 2, title: 'District Committee Verification', description: 'DLC approves and credits ₹50,000 grant directly to bank.' }
    ],
    officialWebsite: 'https://industriescom.assam.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/svayem-assam',
    officialSource: 'Industries and Commerce Department, Govt of Assam',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% direct seed grant of ₹50,000 per entrepreneur', 'Up to ₹2,00,000 for youth groups and SHG collectives', 'Zero repayment obligation - non-dilutive seed assistance']
  },

  // 21. MAHARASHTRA ANNASAHEB PATIL ARTHIK VIKAS
  {
    id: 'maha_annasaheb_patil',
    name: 'Maharashtra Annasaheb Patil Arthik Vikas Mahamandal Scheme',
    shortDescription: '100% interest reimbursement up to 12% p.a. on project bank loans up to ₹10 Lakhs for youth micro-enterprises.',
    ministry: 'Skill Development, Employment and Entrepreneurship Department, Maharashtra', department: 'Annasaheb Patil Mahamandal',
    schemeType: 'LOAN', schemeCategoryLabel: '100% Interest Subvention Loan up to ₹10L',
    applicableStates: ['MAHARASHTRA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'RURAL_YOUTH', 'WOMEN', 'MICRO_ENTERPRISES'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 50, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'SSC (10th) passed'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: '100% Interest Reimbursement up to 12% p.a.',
      subsidyDetails: 'The Mahamandal directly reimburses monthly interest up to ₹3 Lakhs over 5 years directly to bank loan account.',
      loanDetails: 'Nationalized bank provides 85% to 90% project cost loan.',
      marginMoneyDetails: '10% to 15% own contribution.', interestDetails: 'Net 0% interest to entrepreneur after monthly government reimbursement.', repaymentDetails: '5 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_mh', name: 'Maharashtra Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of Maharashtra' },
      { id: 'doc_10th', name: '10th Marksheet / Passing Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational proof' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Mahaswayam Portal', description: 'Apply on mahaswayam.gov.in under Annasaheb Patil tab.' },
      { step: 2, title: 'LOI Issuance & Bank Sanction', description: 'Receive Letter of Intent and apply for bank loan.' },
      { step: 3, title: 'Direct Interest Refund', description: 'Monthly interest reimbursed straight into bank loan account.' }
    ],
    officialWebsite: 'https://mahaswayam.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/apavm-maha',
    officialSource: 'Govt of Maharashtra Mahaswayam Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Effective 0% interest rate loan up to ₹10 Lakhs', 'Monthly automated DBT interest reimbursement', 'Covers manufacturing, trade, transport, and service ventures']
  },

  // 22. UP MUKHYAMANTRI YUVA SWAROJGAR YOJANA (MYSY)
  {
    id: 'up_yuva_svarojgar',
    name: 'UP Mukhyamantri Yuva Swarojgar Yojana (MYSY)',
    shortDescription: '25% margin money capital subsidy up to ₹6.25 Lakhs for industry projects up to ₹25 Lakhs and service units up to ₹10 Lakhs.',
    ministry: 'Department of MSME and Export Promotion, Uttar Pradesh', department: 'Directorate of Industries',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '25% Margin Money Capital Subsidy',
    applicableStates: ['UTTAR_PRADESH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'GENERAL', 'OBC', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 40, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'High School (10th) passed'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: '25% Margin Money Subsidy (up to ₹6.25L in Mfg, ₹2.5L in Services)',
      subsidyDetails: 'Subsidy kept in interest-free fixed deposit for 2 years and adjusted on successful unit run.',
      loanDetails: 'Bank provides 70% to 75% term loan and working capital.',
      marginMoneyDetails: '10% promoter equity for General; 5% for SC/ST/OBC/Women.', interestDetails: 'Standard MSME bank rate.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'No collateral needed up to ₹10 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_up', name: 'UP Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Proof of UP residency' },
      { id: 'doc_10th', name: 'High School Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Proof of age and qualification' }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration on DIUPMSME', description: 'Apply on diupmsme.upsdc.gov.in.' },
      { step: 2, title: 'District Task Force Committee Interview', description: 'DIC evaluates viability and forwards to bank.' },
      { step: 3, title: 'Bank Loan Release & Margin Money Credit', description: 'Bank sanctions loan and margin money TDR deposited.' }
    ],
    officialWebsite: 'https://diupmsme.upsdc.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mysy-up',
    officialSource: 'MSME Department, Government of Uttar Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% capital margin money subsidy up to ₹6.25 Lakhs', 'Manufacturing units supported up to ₹25 Lakhs', 'Special margin relaxation down to 5% for women and OBC/SC/ST']
  },

  // 23. STARTUP BIHAR SEED GRANT
  {
    id: 'bihar_startup_policy',
    name: 'Bihar Startup Policy - Seed Funding & Sustenance Allowance',
    shortDescription: '₹10 Lakhs 10-year interest-free seed loan + ₹10,000/month sustenance allowance for 1 year for registered Bihar startups.',
    ministry: 'Department of Industries, Bihar', department: 'Bihar Startup Hub',
    schemeType: 'GRANT', schemeCategoryLabel: '₹10 Lakhs Interest-Free Seed Fund',
    applicableStates: ['BIHAR'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'SC', 'ST'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 55, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '12th Pass or Diploma'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: '100% 10-Year Interest-Free Loan + 5% Extra for Women',
      subsidyDetails: '₹10 Lakhs seed capital with zero interest repayable after 10 years; 5% extra seed fund for women founders (₹10.5L); ₹10,000/month allowance.',
      loanDetails: 'Zero repayment for first 10 years; non-dilutive equity-free funding.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest rate.', repaymentDetails: '10-year repayment holiday.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_bihar', name: 'Bihar Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Bihar residency proof' },
      { id: 'doc_pitch', name: 'Pitch Deck / Business Proposal', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Product overview and market potential' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Startup Bihar Portal', description: 'Apply on startup.bihar.gov.in.' },
      { step: 2, title: 'Pitch Presentation before Expert Committee', description: 'Present deck to Startup Bihar screening panel.' },
      { step: 3, title: 'Direct Seed Capital Disbursement', description: 'Seed fund released in tranches directly to corporate account.' }
    ],
    officialWebsite: 'https://startup.bihar.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/bsp-bihar',
    officialSource: 'Department of Industries, Government of Bihar',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['₹10 Lakhs 10-year interest-free seed capital', '₹10,000 per month sustenance allowance for founder', '5% bonus funding for women-led startups']
  },

  // 24. GUJARAT MAHILA UDHYAM SARTHI
  {
    id: 'gujarat_women_udhyami',
    name: 'Gujarat Mahila Udhyam Sarthi Yojana',
    shortDescription: 'Additional 5% interest subsidy on bank loans and 25% capital subsidy for women-owned micro and small enterprises in Gujarat.',
    ministry: 'Industries and Mines Department, Gujarat', department: 'Industries Commissionerate',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '25% Capital + 5% Interest Subsidy for Women',
    applicableStates: ['GUJARAT'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'HANDICRAFTS', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 1250000, minimumFunding: 100000,
      subsidyPercentage: '25% Capital Subsidy + 5% Annual Interest Rebate',
      subsidyDetails: '25% capital subsidy up to ₹12.5 Lakhs on plant & machinery; 5% interest subsidy for 5 years.',
      loanDetails: 'Commercial bank term loan covers remaining cost.',
      marginMoneyDetails: '10% own equity.', interestDetails: 'Effective net bank interest as low as 3% - 4% p.a.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE cover available.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration with >51% women ownership' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on IFP Gujarat Portal', description: 'Submit application on ifp.gujarat.gov.in.' },
      { step: 2, title: 'District Industries Centre (DIC) Inspection', description: 'Field officer inspects machinery.' },
      { step: 3, title: 'Direct Subsidy Credit', description: 'Capital subsidy and interest rebates credited to bank.' }
    ],
    officialWebsite: 'https://ifp.gujarat.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/musy-gujarat',
    officialSource: 'Industries Commissionerate, Govt of Gujarat',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% capital subsidy up to ₹12.5 Lakhs for women micro-units', '5% annual interest subsidy for 5 continuous years', 'Single window online approval via Investor Facilitation Portal']
  },

  // 25. KARNATAKA SAMRUDDHI SCHEME
  {
    id: 'karnataka_samruddhi',
    name: 'Karnataka Samruddhi Micro-Franchise Scheme',
    shortDescription: 'Up to ₹10 Lakhs capital grant and retail franchise tie-up for rural youth, SC/ST, and women entrepreneurs to establish branded retail stores.',
    ministry: 'Social Welfare & Skill Development Department, Karnataka', department: 'Dr. B.R. Ambedkar Development Corporation',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹10 Lakhs Micro-Franchise Grant',
    applicableStates: ['KARNATAKA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC', 'ST', 'RURAL_YOUTH', 'WOMEN'],
    businessSectors: ['TRADING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'ST'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '10th class pass'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: 'Up to 50% Non-Repayable Capital Grant (up to ₹5L)',
      subsidyDetails: 'Government provides 50% non-repayable grant; remaining 50% via soft bank loan at 4% interest.',
      loanDetails: 'Bank soft loan with 4% interest rate.',
      marginMoneyDetails: '5% own contribution.', interestDetails: '4% concessional interest.', repaymentDetails: '5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste_kar', name: 'Karnataka SC/ST Caste Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Caste verification' },
      { id: 'doc_domicile_kar', name: 'Karnataka Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of Karnataka' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select Retail Franchise Category', description: 'Choose partnered brand on karnataka.gov.in/adcl.' },
      { step: 2, title: 'Apply on Seva Sindhu Portal', description: 'Register on sevasindhu.karnataka.gov.in.' },
      { step: 3, title: 'Store Setup & Fund Disbursement', description: 'Turnkey retail store setup and grant credited.' }
    ],
    officialWebsite: 'https://sevasindhu.karnataka.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/samruddhi-kar',
    officialSource: 'Government of Karnataka Social Welfare Department',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹5 Lakhs non-repayable direct government grant', 'Turnkey franchise support with proven brands in grocery, opticals, pharmacies', 'Zero collateral requirement']
  },

  // 26. RAJASTHAN ISTART SEED GRANT
  {
    id: 'rajasthan_i_start',
    name: 'Rajasthan iStart Seed & Sustenance Grant',
    shortDescription: 'Up to ₹5 Lakhs prototype grant, ₹25 Lakhs seed grant, and ₹20,000/month sustenance allowance for innovative ventures.',
    ministry: 'Department of Information Technology & Communication (DoIT&C), Rajasthan', department: 'iStart Rajasthan',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹25 Lakhs Equity-Free Grant',
    applicableStates: ['RAJASTHAN'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'STUDENTS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 55, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 50000,
      subsidyPercentage: '100% Non-Dilutive Government Grant',
      subsidyDetails: '₹5 Lakhs Idea Stage grant; ₹15L - ₹25L seed deployment grant; ₹20,000/month sustenance for 1 year (₹25,000 for women founders).',
      loanDetails: 'Zero debt / 100% equity-free grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Jan Aadhaar / Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Rajasthan Jan Aadhaar card' },
      { id: 'doc_pitch', name: 'Pitch Presentation', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Innovation and problem statement pitch' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on iStart Portal', description: 'Apply on istart.rajasthan.gov.in with QRate evaluation.' },
      { step: 2, title: 'Pitching before Seed Committee', description: 'Present to state incubation committee at Techno Hub Jaipur.' },
      { step: 3, title: 'Direct Grant Release to Bank Account', description: 'Grant disbursed in milestone tranches.' }
    ],
    officialWebsite: 'https://istart.rajasthan.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/istart-rajasthan',
    officialSource: 'DoIT&C, Government of Rajasthan',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹25 Lakhs 100% equity-free non-repayable grant', 'Monthly founder sustenance allowance up to ₹25,000', 'Free plug-and-play office space at Bhamashah Techno Hub']
  },

  // 27. MP MUKHYAMANTRI UDYAM KRANTI
  {
    id: 'mp_mukhyamantri_udyami',
    name: 'MP Mukhyamantri Udyam Kranti Yojana',
    shortDescription: 'Loans from ₹1 Lakh to ₹50 Lakhs for manufacturing and ₹1L to ₹25L for services with 3% interest subsidy for 7 years and 100% credit guarantee fee waiver.',
    ministry: 'Department of Micro, Small and Medium Enterprises, Madhya Pradesh', department: 'Directorate of Industries',
    schemeType: 'LOAN', schemeCategoryLabel: '3% Interest Subvention Loan up to ₹50L',
    applicableStates: ['MADHYA_PRADESH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'GENERAL', 'OBC', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '12th class passed'
    },
    financialBenefits: {
      fundingType: 'INTEREST_SUBVENTION', maximumFunding: 5000000, minimumFunding: 100000,
      subsidyPercentage: '3% Annual Interest Subsidy for 7 Years + 100% Credit Guarantee Cover',
      subsidyDetails: 'State govt pays 3% interest subvention for 7 years directly to bank and covers 100% CGTMSE guarantee fees.',
      loanDetails: 'Public sector banks provide term loan and working capital.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: 'Net bank interest reduced to around 5% - 6% p.a.', repaymentDetails: '7 years.', collateralRequirement: 'Zero collateral (100% covered by MP state credit guarantee).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card / Samagra ID', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'MP Samagra ID and Aadhaar' },
      { id: 'doc_domicile_mp', name: 'MP Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Proof of residence in MP' },
      { id: 'doc_12th', name: '12th Pass Marksheet', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Samast Portal', description: 'Submit application on samast.mponline.gov.in.' },
      { step: 2, title: 'Bank Branch Allocation & Scrutiny', description: 'DIC forwards application to selected bank.' },
      { step: 3, title: 'Sanction and Interest Subsidy Activation', description: 'Bank sanctions loan and MP Govt activates 3% subsidy.' }
    ],
    officialWebsite: 'https://samast.mponline.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mmuky-mp',
    officialSource: 'MSME Department, Government of Madhya Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Loans up to ₹50 Lakhs with zero third-party collateral', '3% per annum interest subvention for 7 full years', '100% credit guarantee fee borne by MP State Govt']
  },

  // 28. TELANGANA T-IDEA
  {
    id: 'telangana_tidea',
    name: 'Telangana T-IDEA (Industrial Development & Entrepreneur Assistance)',
    shortDescription: '35% capital investment subsidy up to ₹50 Lakhs on plant & machinery and 5% interest subsidy for 5 years for General/OBC micro-enterprises.',
    ministry: 'Industries and Commerce Department, Telangana', department: 'TS-iPASS',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '35% Capital Investment Subsidy',
    applicableStates: ['TELANGANA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'OBC', 'WOMEN', 'RURAL_YOUTH', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 200000,
      subsidyPercentage: '35% Capital Investment Subsidy (up to ₹50 Lakhs)',
      subsidyDetails: '35% rebate on machinery investment; 5% interest subvention for 5 years; 100% stamp duty and electricity duty reimbursement for 5 years.',
      loanDetails: 'Bank term loan via scheduled commercial banks.',
      marginMoneyDetails: '15% own investment.', interestDetails: '5% interest subsidy applied annually.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE cover applicable.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_tsipass', name: 'TS-iPASS Clearance', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Online industrial approval clearance' },
      { id: 'doc_machinery_inv', name: 'Machinery Invoices & CA Certificate', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Verified investment bills' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain TS-iPASS Single Window Clearance', description: 'Register factory/unit on ipass.telangana.gov.in.' },
      { step: 2, title: 'Submit T-IDEA Claim Online', description: 'Upload investment invoices within 6 months of commissioning.' },
      { step: 3, title: 'State Level Committee (SLC) Approval', description: 'Direct DBT subsidy credit to bank loan account.' }
    ],
    officialWebsite: 'https://ipass.telangana.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/tidea-ts',
    officialSource: 'Industries and Commerce Department, Govt of Telangana',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['35% capital subsidy up to ₹50 Lakhs on manufacturing equipment', '5% annual interest subvention for 5 full years', '100% stamp duty and power duty reimbursement']
  },

  // 29. ANDHRA PRADESH YSR CHEYUTHA
  {
    id: 'ap_ysr_cheyutha',
    name: 'AP YSR Cheyutha & Asara Enterprise Development',
    shortDescription: '₹75,000 direct financial grant in 4 tranches with institutional bank tie-ups for BC/SC/ST/Minority women to start grocery, dairy, and retail units.',
    ministry: 'Panchayat Raj and Rural Development, Andhra Pradesh', department: 'SERP Andhra Pradesh',
    schemeType: 'GRANT', schemeCategoryLabel: '₹75,000 Direct Grant + Bank Tie-Up',
    applicableStates: ['ANDHRA_PRADESH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'OBC', 'SC', 'ST', 'MINORITY'],
    businessSectors: ['TRADING', 'DAIRY_LIVESTOCK', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 45, maxAge: 60, genderAllowed: ['FEMALE'], categoriesAllowed: ['OBC', 'SC', 'ST', 'MINORITY'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 75000, minimumFunding: 18750,
      subsidyPercentage: '100% Non-Repayable DBT Cash Grant of ₹75,000',
      subsidyDetails: '₹18,750 per year for 4 years directly into bank account; partnered with ITC, HUL, Amul for rural retail store stock.',
      loanDetails: 'Bank provides additional collateral-free loan up to ₹2 Lakhs under Stree Nidhi.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest on grant; 3% on Stree Nidhi loan.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity proof' },
      { id: 'doc_caste_ap', name: 'AP BC/SC/ST/Minority Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Category proof' },
      { id: 'doc_ration_ap', name: 'AP Rice Card / Household Card', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Household verification' }
    ],
    applicationProcess: [
      { step: 1, title: 'Verify Details at Grama / Ward Sachivalayam', description: 'Village Welfare Assistant verifies name on beneficiary list.' },
      { step: 2, title: 'Select Livelihood Activity', description: 'Choose Kirana, Amul Milk Collection, or Tailoring.' },
      { step: 3, title: 'Direct DBT Transfer', description: 'Grant transferred straight to Aadhaar-linked bank account.' }
    ],
    officialWebsite: 'https://navasakam.ap.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/ysr-cheyutha',
    officialSource: 'SERP & Navasakam Portal, Government of Andhra Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['₹75,000 100% non-repayable direct cash grant', 'Direct supply chain tie-up with Amul, ITC, and Procter & Gamble', 'Stree Nidhi additional micro-credit at just 3% interest']
  },

  // 30. KERALA NANO HOUSEHOLD ENTERPRISES
  {
    id: 'kerala_nano_units',
    name: 'Kerala Nano Household Enterprises Assistance Scheme',
    shortDescription: 'Up to 40% capital subsidy (up to ₹2 Lakhs) and 6% interest subsidy for micro home-based manufacturing and food processing ventures.',
    ministry: 'Department of Industries and Commerce, Kerala', department: 'Directorate of Industries & Commerce (DIC)',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '40% Capital Subsidy for Micro Home Units',
    applicableStates: ['KERALA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'RURAL_YOUTH', 'ARTISANS', 'MICRO_ENTERPRISES'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'INDIVIDUAL', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 200000, minimumFunding: 30000,
      subsidyPercentage: '40% Capital Grant on Plant & Machinery',
      subsidyDetails: '40% capital subsidy for general entrepreneurs; 50% for women, SC/ST, and transgender entrepreneurs; 6% interest subsidy for 3 years.',
      loanDetails: 'Cooperative or commercial bank loan for remaining component.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: '6% interest subvention for 3 years.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' },
      { id: 'doc_invoices_kerala', name: 'Machinery Invoices', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Machinery bills' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Kerala Industries Portal', description: 'Apply on industry.kerala.gov.in.' },
      { step: 2, title: 'Taluk Industries Officer Inspection', description: 'Physical inspection of machinery installation.' },
      { step: 3, title: 'Direct Subsidy Release', description: 'Subsidy credited directly to bank account.' }
    ],
    officialWebsite: 'https://industry.kerala.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nano-kerala',
    officialSource: 'Department of Industries & Commerce, Kerala',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 50% capital subsidy on home-based machinery', '6% interest subvention for 3 consecutive years', 'Zero collateral required for micro units']
  },

  // 31. JHARKHAND MUKHYAMANTRI ROJGAR SRIJAN (CMEGP)
  {
    id: 'jharkhand_mukhyamantri_rojgar',
    name: 'Jharkhand Mukhyamantri Rojgar Srijan Yojana (MMRSY)',
    shortDescription: 'Up to 40% capital subsidy (up to ₹5 Lakhs) on loans up to ₹25 Lakhs for ST/SC/OBC/Minority youth to start business enterprises.',
    ministry: 'Welfare Department, Jharkhand', department: 'Jharkhand Tribal Development Society',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '40% Capital Subsidy up to ₹5 Lakhs',
    applicableStates: ['JHARKHAND'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC', 'ST', 'OBC', 'MINORITY', 'DIFF_ABLED'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'ST', 'OBC', 'MINORITY'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 2500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '10th class pass'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2500000, minimumFunding: 50000,
      subsidyPercentage: '40% Government Subsidy (up to ₹5 Lakhs)',
      subsidyDetails: '40% of project cost (max ₹5 Lakhs) provided as direct government capital grant; balance loan at just 6% simple interest.',
      loanDetails: 'Direct loan from State Welfare Corporation or nationalized banks.',
      marginMoneyDetails: '5% own contribution.', interestDetails: 'Concessional 6% simple interest rate.', repaymentDetails: '5 years with 6-month moratorium.', collateralRequirement: 'No collateral up to ₹5 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste_jh', name: 'Jharkhand Caste Certificate (ST/SC/OBC/Minority)', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Category proof' },
      { id: 'doc_domicile_jh', name: 'Jharkhand Residential Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Proof of residence in Jharkhand' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Application Online', description: 'Apply on mmrsy.jharkhand.gov.in.' },
      { step: 2, title: 'District Level Selection Committee Scrutiny', description: 'Deputy Commissioner reviews application.' },
      { step: 3, title: 'Sanction and 40% Subsidy Credit', description: 'Loan disbursed and subsidy adjusted.' }
    ],
    officialWebsite: 'https://mmrsy.jharkhand.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mmrsy-jharkhand',
    officialSource: 'Welfare Department, Government of Jharkhand',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['40% non-repayable capital subsidy up to ₹5 Lakhs', 'Concessional 6% simple interest on loan portion', 'Zero collateral required for loans up to ₹5 Lakhs']
  },

  // 32. CHHATTISGARH CM YUVA SWAROJGAR
  {
    id: 'chhattisgarh_cm_yuva',
    name: 'Chhattisgarh Mukhyamantri Yuva Swarojgar Yojana (MMYSY)',
    shortDescription: '25% margin money subsidy (up to ₹3 Lakhs) for manufacturing loans up to ₹25 Lakhs and service units up to ₹10 Lakhs.',
    ministry: 'Commerce and Industries Department, Chhattisgarh', department: 'Directorate of Industries',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '25% Margin Money Capital Subsidy',
    applicableStates: ['CHHATTISGARH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'SC', 'ST', 'OBC', 'GENERAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 35, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: '8th class pass'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: '15% to 25% Capital Margin Money Subsidy',
      subsidyDetails: '25% subsidy for SC/ST/Women (up to ₹3.75L); 15% for General category (up to ₹2.25L).',
      loanDetails: 'Nationalized and regional rural banks provide term loan.',
      marginMoneyDetails: '5% for SC/ST/Women; 10% for General.', interestDetails: '5% interest subvention for 5 years.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_cg', name: 'Chhattisgarh Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of Chhattisgarh' },
      { id: 'doc_8th', name: '8th / 10th School Passing Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational proof' }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration', description: 'Submit application on industry.cg.gov.in.' },
      { step: 2, title: 'District Task Force Committee Interview', description: 'General Manager DIC interviews applicant.' },
      { step: 3, title: 'Loan Sanction & Subsidy Lock-In', description: 'Bank sanctions loan and margin money credited.' }
    ],
    officialWebsite: 'https://industry.cg.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mmysy-cg',
    officialSource: 'Commerce and Industries Department, Chhattisgarh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['25% capital margin money subsidy up to ₹3.75 Lakhs', '5% annual interest subvention for 5 years', 'Covers manufacturing, services, and small retail enterprises']
  },

  // 33. UTTARAKHAND SPECIAL MSME HILL POLICY
  {
    id: 'uttarakhand_msme_policy',
    name: 'Uttarakhand Special Integrated MSME Promotion Policy',
    shortDescription: 'Up to 40% capital investment subsidy (up to ₹40 Lakhs) and 6% interest subsidy for setting up industrial units in hilly districts (Category A & B).',
    ministry: 'Department of MSME, Uttarakhand', department: 'Directorate of Industries',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '40% Capital Subsidy for Hill Enterprises',
    applicableStates: ['UTTARAKHAND'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'MICRO_ENTERPRISES', 'GENERAL', 'OBC', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'SERVICES', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 4000000, minimumFunding: 200000,
      subsidyPercentage: '40% Capital Investment Subsidy (up to ₹40 Lakhs)',
      subsidyDetails: '40% subsidy for Category A hilly areas (Uttarkashi, Chamoli, Pithoragarh, etc.); 35% for Category B; 6% interest subsidy for 5 years.',
      loanDetails: 'Bank term loan via commercial banks or State Financial Corporation.',
      marginMoneyDetails: '10% own contribution.', interestDetails: '6% interest subsidy for 5 years.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE cover available.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_uk', name: 'Uttarakhand Permanent Resident Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Domicile of Uttarakhand' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Project cost blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Uttarakhand Single Window Portal', description: 'Apply on investuttarakhand.uk.gov.in.' },
      { step: 2, title: 'District Level Committee Approval', description: 'DLC approves hill classification category.' },
      { step: 3, title: 'Direct Capital Subsidy Credit', description: 'Subsidy disbursed directly to loan account.' }
    ],
    officialWebsite: 'https://investuttarakhand.uk.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/msme-policy-uk',
    officialSource: 'Directorate of Industries, Uttarakhand',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['40% capital investment subsidy up to ₹40 Lakhs in hilly terrain', '6% interest subsidy for 5 consecutive years', '100% electricity duty exemption for 10 years']
  },

  // 34. HIMACHAL MUKHYA MANTRI SWAVALAMBAN
  {
    id: 'himachal_cm_swavalamban',
    name: 'Himachal Pradesh Mukhya Mantri Swavalamban Yojana (MMSY)',
    shortDescription: 'Up to 35% capital subsidy on project costs up to ₹40 Lakhs and 5% interest subvention for 3 years for youth & women entrepreneurs.',
    ministry: 'Department of Industries, Himachal Pradesh', department: 'Emerging Himachal Portal',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '30% - 35% Capital Subsidy up to ₹40L',
    applicableStates: ['HIMACHAL_PRADESH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'GENERAL', 'OBC', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 4000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 4000000, minimumFunding: 200000,
      subsidyPercentage: '25% to 35% Capital Investment Subsidy',
      subsidyDetails: '35% subsidy for women and SC/ST (up to ₹14 Lakhs); 30% for young men; 5% interest subvention on term loan up to ₹40L for 3 years.',
      loanDetails: 'Bank provides 60% - 70% term loan.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: '5% interest subvention for 3 years.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_bonafide_hp', name: 'HP Bonafide Himachali Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of Himachal Pradesh' },
      { id: 'doc_dpr', name: 'DPR & Quotations', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Project cost blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Emerging Himachal Portal', description: 'Apply on mmsy.hp.gov.in.' },
      { step: 2, title: 'DLC Approval & Bank Forwarding', description: 'District committee forwards approved case to bank.' },
      { step: 3, title: 'Loan Disbursement & Front-Ended Subsidy', description: 'Subsidy credited directly to bank loan account.' }
    ],
    officialWebsite: 'https://mmsy.hp.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mmsy-hp',
    officialSource: 'Department of Industries, Govt of Himachal Pradesh',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['35% capital subsidy up to ₹14 Lakhs for women & SC/ST', '5% annual interest subvention for 3 years', 'Government-assisted stamp duty concession down to just 3%']
  },

  // 35. INNOVATION MISSION PUNJAB SEED FUND
  {
    id: 'punjab_startup_seed',
    name: 'Innovation Mission Punjab & Startup Seed Fund',
    shortDescription: 'Up to ₹10 Lakhs seed prototype grant and ₹30,000/month sustenance allowance for innovative ventures in Punjab.',
    ministry: 'Department of Industries and Commerce, Punjab', department: 'Startup Punjab',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹10 Lakhs Seed Grant',
    applicableStates: ['PUNJAB'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'RURAL_YOUTH', 'WOMEN', 'STUDENTS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 55, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: '100% Equity-Free Non-Dilutive Grant',
      subsidyDetails: 'Seed prototype funding up to ₹10 Lakhs; ₹30,000/month sustenance for 1 year; reimbursement of 100% patent filing costs.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Startup Pitch & Business Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Innovation proposal' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Startup Punjab Portal', description: 'Apply on startuppunjab.punjab.gov.in.' },
      { step: 2, title: 'Pitch Presentation', description: 'Present before state screening jury.' },
      { step: 3, title: 'Grant Release', description: 'Direct disbursement into startup bank account.' }
    ],
    officialWebsite: 'https://startuppunjab.punjab.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sp-punjab',
    officialSource: 'Startup Punjab, Government of Punjab',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹10 Lakhs 100% non-repayable seed grant', 'Monthly founder sustenance allowance of ₹30,000', '100% reimbursement of domestic & international patent filing fees']
  },

  // 36. HARYANA MSME CAPITAL INVESTMENT SUBSIDY
  {
    id: 'haryana_venture_capital',
    name: 'Haryana MSME Capital Investment Subsidy Scheme',
    shortDescription: '15% capital investment subsidy up to ₹20 Lakhs on plant & machinery and 6% interest subsidy for 5 years in Category B, C & D blocks.',
    ministry: 'Industries & Commerce Department, Haryana', department: 'Directorate of MSME',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '15% Capital Subsidy up to ₹20 Lakhs',
    applicableStates: ['HARYANA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'WOMEN', 'RURAL_YOUTH', 'GENERAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 15000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 2000000, minimumFunding: 200000,
      subsidyPercentage: '15% of Fixed Capital Investment on Plant & Machinery',
      subsidyDetails: '15% capital subsidy up to ₹20 Lakhs in rural and developing blocks; 6% interest subsidy up to ₹10 Lakhs/year for 5 years.',
      loanDetails: 'Bank term loan via scheduled commercial banks.',
      marginMoneyDetails: '15% own investment.', interestDetails: '6% interest subvention for 5 years.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE coverage applicable.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card / Parivar Pehchan Patra (PPP)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Haryana PPP / Aadhaar card' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_fci', name: 'CA Certificate for Plant & Machinery', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Certified capital bills' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Haryana HEPC Portal', description: 'Register on inwestharyana.in under HEPC single window.' },
      { step: 2, title: 'Joint Inspection Team Verification', description: 'DIC officers verify installed machinery.' },
      { step: 3, title: 'Direct Subsidy Credit', description: 'Subsidy credited directly into bank loan account.' }
    ],
    officialWebsite: 'https://inwestharyana.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/haryana-msme',
    officialSource: 'Directorate of MSME, Government of Haryana',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['15% capital subsidy up to ₹20 Lakhs on plant & equipment', '6% interest subsidy for 5 full years', 'Special fast-track clearance within 21 days on HEPC portal']
  },

  // 37. STARTUP ODISHA POLICY
  {
    id: 'odisha_startup_policy',
    name: 'Startup Odisha Monthly Sustenance & Matching Grant',
    shortDescription: '₹20,000/month sustenance allowance for 1 year (₹22,000 for women) and up to ₹16 Lakhs product development & marketing grant.',
    ministry: 'MSME Department, Odisha', department: 'Startup Odisha Directorate',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹16 Lakhs Matching Grant',
    applicableStates: ['ODISHA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'STUDENTS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 55, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1600000, minimumFunding: 100000,
      subsidyPercentage: '100% Equity-Free Product Development Grant',
      subsidyDetails: '₹20,000/month founder allowance for 12 months; up to ₹16 Lakhs grant for product development, marketing, and prototyping.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Product Innovation Pitch', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Detailed startup pitch deck' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Startup Odisha Portal', description: 'Submit on startupodisha.gov.in.' },
      { step: 2, title: 'Task Force Evaluation', description: 'Present product roadmap to task force committee.' },
      { step: 3, title: 'Grant Disbursement', description: 'Direct DBT payment to startup account.' }
    ],
    officialWebsite: 'https://startupodisha.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/startup-odisha',
    officialSource: 'Startup Odisha, Government of Odisha',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹16 Lakhs 100% equity-free product development grant', 'Monthly founder allowance up to ₹22,000 for women founders', 'Free incubation at O-Hub state-of-the-art facility']
  },

  // 38. WEST BENGAL SWARNJAYANTI / ATMASHREE
  {
    id: 'wb_swarojgar_bikas',
    name: 'West Bengal Swami Vivekananda Swanirbhar Karmasuchi (Atmashree)',
    shortDescription: 'Up to 30% government subsidy (up to ₹1.5 Lakhs) for micro business projects up to ₹5 Lakhs for unemployed youth and SHGs.',
    ministry: 'Self Help Group & Self Employment Department, West Bengal', department: 'WB Swarojgar Corporation',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '30% Direct Government Subsidy',
    applicableStates: ['WEST_BENGAL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'GENERAL', 'SC', 'ST', 'OBC'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'SHG', 'INDIVIDUAL'],
    businessStages: ['IDEA', 'PLANNING', 'PRE_LAUNCH'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 500000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 500000, minimumFunding: 50000,
      subsidyPercentage: '30% Direct Capital Subsidy (up to ₹1.5 Lakhs)',
      subsidyDetails: '30% project cost credited directly as government subsidy; remaining 65% bank loan; 5% promoter equity.',
      loanDetails: 'Nationalized or regional rural bank term loan.',
      marginMoneyDetails: '5% own contribution.', interestDetails: 'Subsidized priority micro interest.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_ration_wb', name: 'Khadya Sathi / Digital Ration Card', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'West Bengal residence proof' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply at BDO / Municipal Office', description: 'Submit form through shg.wb.gov.in.' },
      { step: 2, title: 'Field Screening Committee', description: 'Verification by Block Development Officer.' },
      { step: 3, title: 'Bank Loan Sanction & Subsidy Release', description: 'Bank sanctions loan and 30% subsidy released.' }
    ],
    officialWebsite: 'https://shg.wb.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/svskp-wb',
    officialSource: 'SHG & Self Employment Department, Govt of West Bengal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['30% direct government capital subsidy up to ₹1.5 Lakhs', 'Low 5% promoter contribution requirement', 'Zero collateral required for micro units']
  },

  // 39. CHIEF MINISTER'S ATMANIRBHAR ASOM ABHIJAN (CMAAA)
  {
    id: 'assam_atmanirbhar_asom',
    name: "Chief Minister's Atmanirbhar Asom Abhijan (CMAAA)",
    shortDescription: '₹2 Lakhs to ₹5 Lakhs financial assistance (50% non-refundable government grant + 50% interest-free government loan) for youth enterprises.',
    ministry: 'Industries, Commerce and Public Enterprises Department, Assam', department: 'Directorate of Industries',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '50% Government Grant + 50% 0% Loan',
    applicableStates: ['ASSAM'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'SC', 'ST', 'OBC', 'GENERAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 28, maxAge: 40, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '10th class pass (Degree for ₹5L category)'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 500000, minimumFunding: 200000,
      subsidyPercentage: '50% Non-Refundable Grant + 50% 0% Interest Govt Loan',
      subsidyDetails: '₹1 Lakh non-refundable grant + ₹1 Lakh 0% interest loan for 10th pass; ₹2.5 Lakhs grant + ₹2.5 Lakhs 0% loan for degree/engineers.',
      loanDetails: 'Direct loan from Assam Government with zero bank involvement and zero interest.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest rate.', repaymentDetails: '5 years with 2-year repayment holiday.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_employment_assam', name: 'Assam Employment Exchange Card', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Registered in Assam Employment Exchange' },
      { id: 'doc_dpr', name: 'Business Proposal DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Business blueprint' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on CMAAA Portal', description: 'Register on cmaaa.assam.gov.in.' },
      { step: 2, title: '1-Month Practical EDP Training', description: 'Complete mandatory training with ₹10,000 stipend.' },
      { step: 3, title: 'Direct Two-Tranche Fund Release', description: '50% grant and 50% 0% loan credited directly to bank.' }
    ],
    officialWebsite: 'https://cmaaa.assam.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cmaaa-assam',
    officialSource: 'Govt of Assam CMAAA Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['50% direct non-refundable grant (up to ₹2.5 Lakhs)', '50% government loan at completely 0% interest', '₹10,000 stipend provided during mandatory 1-month business training']
  },

  // 40. GOA CHIEF MINISTER'S ROZGAR YOJANA (CMRY)
  {
    id: 'goa_cmry',
    name: "Goa Chief Minister's Rozgar Yojana (CMRY)",
    shortDescription: 'Loans up to ₹25 Lakhs with 80% project financing at an ultra-concessional 2% to 3% interest rate and 25% share capital grant.',
    ministry: 'Directorate of Industries, Trade and Commerce, Goa', department: 'Economic Development Corporation (EDC) Goa',
    schemeType: 'LOAN', schemeCategoryLabel: '2% Concessional Interest Loan up to ₹25L',
    applicableStates: ['GOA'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'DIFF_ABLED', 'GENERAL'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 45, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: '8th class pass'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: '2% to 3% Interest Rate + 25% Share Capital Subsidy',
      subsidyDetails: 'EDC Goa finances 80% of project cost; 25% share capital subsidy; effective interest rate is just 2% for women and 3% for men.',
      loanDetails: 'Direct term loan from EDC Limited Goa.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: 'Ultra-low 2% (women) / 3% (men) interest.', repaymentDetails: '5 to 7 years with 6-month moratorium.', collateralRequirement: 'No third-party collateral for loans up to ₹6 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_goa', name: '15-Year Goa Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: '15-year residence certificate in Goa' },
      { id: 'doc_dpr', name: 'Project Report & Quotations', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Machinery and business projections' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Application to EDC Goa', description: 'Apply on edc-goa.com under CMRY.' },
      { step: 2, title: 'EDC Task Force Committee Interview', description: 'Project appraisal and sanction.' },
      { step: 3, title: 'Fund Release at 2% Interest', description: 'Direct loan disbursement.' }
    ],
    officialWebsite: 'https://edc-goa.com/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/cmry-goa',
    officialSource: 'EDC Limited, Government of Goa',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Ultra-concessional 2% annual interest rate for women entrepreneurs', 'Up to ₹25 Lakhs project funding with 25% share capital subsidy', 'Fast-track sanction directly by EDC Goa']
  },

  // 41. J&K MISSION YOUTH MUMKIN SCHEME
  {
    id: 'jk_mumkin_mission',
    name: 'J&K Mission Youth - Mumkin Livelihood Scheme',
    shortDescription: '100% on-road commercial vehicle support with 20% upfront government & manufacturer subsidy (up to ₹1.6 Lakhs) with 0% margin down payment.',
    ministry: 'Mission Youth, Government of Jammu & Kashmir', department: 'Employment Department J&K',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '20% Upfront Commercial Vehicle Subsidy',
    applicableStates: ['JAMMU_AND_KASHMIR', 'LADAKH'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'DRIVER_ENTREPRENEURS', 'WOMEN', 'MICRO_ENTERPRISES'],
    businessSectors: ['SERVICES', 'TRADING', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 35, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 300000, maxProjectCost: 1200000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Valid Commercial Driving License'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 160000, minimumFunding: 80000,
      subsidyPercentage: '20% On-Road Price Subsidy (10% Govt + 10% OEM)',
      subsidyDetails: '10% on-road price paid by J&K Govt + 10% discount by vehicle manufacturer; remaining 80% financed by J&K Bank with zero down payment.',
      loanDetails: 'J&K Bank term loan at concessional priority interest rate.',
      marginMoneyDetails: '0% down payment (covered by 20% combined subsidy).', interestDetails: 'Concessional priority lending rate.', repaymentDetails: '5 years.', collateralRequirement: 'Vehicle hypothecation only (no collateral).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_domicile_jk', name: 'J&K Domicile Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of J&K' },
      { id: 'doc_dl', name: 'Commercial Driving License', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Valid commercial transport license' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Mission Youth Portal', description: 'Register on missionyouth.jk.gov.in.' },
      { step: 2, title: 'District Level Task Force Approval', description: 'Deputy Commissioner sanctions vehicle allotment.' },
      { step: 3, title: 'Dealership Vehicle Delivery', description: 'Take delivery with zero down payment.' }
    ],
    officialWebsite: 'https://missionyouth.jk.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/mumkin-jk',
    officialSource: 'Mission Youth, Government of Jammu and Kashmir',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Zero down payment (20% covered by upfront government & OEM subsidy)', '100% on-road commercial vehicle delivery (Tata, Mahindra, Ashok Leyland)', 'Fast-track approval by District Level Task Force']
  },

  // 42. NEDFI OPPORTUNITY SCHEME FOR NORTH EAST
  {
    id: 'ne_nedfi_opportunity',
    name: 'NEDFi Opportunity Scheme for Women & Rural Entrepreneurs',
    shortDescription: 'Term loans up to ₹25 Lakhs at a concessional 8% interest rate with up to 25% back-ended capital subsidy for North Eastern Region enterprises.',
    ministry: 'Ministry of Development of North Eastern Region (MDoNER)', department: 'NEDFi',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: 'Concessional Credit & Capital Subsidy for NE',
    applicableStates: ['ASSAM', 'MANIPUR', 'MEGHALAYA', 'MIZORAM', 'NAGALAND', 'TRIPURA', 'ARUNACHAL_PRADESH', 'SIKKIM'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'RURAL_YOUTH', 'ARTISANS', 'MICRO_ENTERPRISES', 'ST'],
    businessSectors: ['AGRI_PROCESSING', 'HANDICRAFTS', 'SERVICES', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: 'Up to 25% Back-Ended Capital Subsidy',
      subsidyDetails: 'Concessional 8% p.a. term loan + 25% capital subsidy on machinery and equipment.',
      loanDetails: 'Direct loan from NEDFi.',
      marginMoneyDetails: '10% promoter contribution.', interestDetails: 'Concessional 8% interest rate.', repaymentDetails: '5 to 7 years with 1-year moratorium.', collateralRequirement: 'No third-party collateral required up to ₹10 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_ne_domicile', name: 'North East Domicile / PRC Certificate', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.state', description: 'Resident of North Eastern states' },
      { id: 'doc_dpr', name: 'Project Proposal DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Enterprise plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal to NEDFi Branch', description: 'Apply on nedfi.com or visit local NEDFi office.' },
      { step: 2, title: 'Field Technical Appraisal', description: 'Appraisal officer inspects business location.' },
      { step: 3, title: 'Loan Disbursement & Subsidy Booking', description: 'Loan released with 1-year repayment moratorium.' }
    ],
    officialWebsite: 'https://www.nedfi.com/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nedfi-opportunity',
    officialSource: 'North Eastern Development Finance Corporation (NEDFi)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Dedicated financing for all 8 North Eastern states', 'Concessional 8% interest rate with 1-year moratorium', '25% back-ended capital subsidy on machinery']
  }
];
