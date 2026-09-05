/**
 * Banking, Apex Institutional & Corporate Foundation Schemes Catalog
 * Public Sector Banks, SIDBI, NABARD, Apex Corporations, and Corporate Grants
 */

export const INSTITUTIONAL_BANK_SCHEMES = [
  // ================= SBI =================
  {
    id: 'sbi_stree_shakti',
    name: 'State Bank of India (SBI) Stree Shakti Package',
    shortDescription: 'Concessional interest rate (0.50% rebate) and zero margin for loans up to ₹25,000 for women-owned enterprises.',
    ministry: 'State Bank of India (SBI)', department: 'SME Banking Division',
    schemeType: 'LOAN', schemeCategoryLabel: 'Banking Concession for Women',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['WOMEN'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Woman holding min 51% equity'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 5000000, minimumFunding: 25000,
      subsidyPercentage: '0.50% Interest Concession + Zero Margin up to ₹25,000',
      subsidyDetails: '0.50% lower interest on loans above ₹2 Lakhs; zero promoter margin on loans up to ₹25,000; minimal margin on higher loans.',
      loanDetails: 'Term loan and working capital sanctioned across all SBI branches.',
      marginMoneyDetails: 'Nil up to ₹25k; 10% - 15% above ₹2 Lakhs.', interestDetails: '0.50% below standard SBI SME card rate.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Covered under CGTMSE for collateral-free credit.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card of Woman Entrepreneur', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Tax identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: false, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Visit SBI Branch or Apply on YONO Business', description: 'Apply via bank.sbi or nearest SBI SME branch.' },
      { step: 2, title: 'Loan Sanction with Stree Shakti Concession', description: 'Bank sanctions facility with 0.50% interest concession.' }
    ],
    officialWebsite: 'https://sbi.co.in/web/business/sme',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sbi-stree-shakti',
    officialSource: 'State Bank of India Official SME Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['0.50% interest reduction exclusively for women entrepreneurs', 'Zero margin money required for loans up to ₹25,000', 'Available at all 22,000+ SBI branches across India']
  },

  {
    id: 'sbi_sme_collateral_free',
    name: 'SBI SME Collateral-Free Credit Linkage (CGTMSE)',
    shortDescription: 'Collateral-free term loan and working capital cash credit up to ₹2 Crore backed by CGTMSE credit guarantee at SBI.',
    ministry: 'State Bank of India (SBI)', department: 'Commercial & SME Banking',
    schemeType: 'LOAN', schemeCategoryLabel: 'Collateral-Free Bank Credit up to ₹2 Cr',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'OBC', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Active business unit with Udyam'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 20000000, minimumFunding: 100000,
      subsidyPercentage: '100% Collateral Waiver under CGTMSE Cover',
      subsidyDetails: 'Bank waives mortgage of land, building, and third-party guarantee up to ₹2 Crore under sovereign guarantee scheme.',
      loanDetails: 'Term loan for machinery/equipment and Cash Credit (CC) limit for inventory.',
      marginMoneyDetails: '15% to 20% promoter contribution.', interestDetails: 'EBLR linked competitive rates (approx 8.5% - 10.5%).', repaymentDetails: '5 to 7 years.', collateralRequirement: 'Zero secondary collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration' },
      { id: 'doc_bank_stmt', name: 'Bank Statement (6 months)', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.availableCapital', description: 'Banking track record' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on SBI SME Digital Portal', description: 'Submit financials and DPR on bank.sbi.' },
      { step: 2, title: 'In-Principle Digital Sanction', description: 'Fast automated evaluation and fund release.' }
    ],
    officialWebsite: 'https://sbi.co.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sbi-sme',
    officialSource: 'State Bank of India',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Collateral-free loans up to ₹2 Crore', 'EBLR benchmark linked transparent rates', 'Composite term loan and working capital cash credit']
  },

  // ================= BANK OF BARODA =================
  {
    id: 'bob_mahila_shakti',
    name: 'Bank of Baroda - Baroda Mahila Swarojgar Yojana',
    shortDescription: 'Collateral-free micro-credit loans up to ₹5 Lakhs for women entrepreneurs with 0.25% interest concession and flexible repayment.',
    ministry: 'Bank of Baroda', department: 'MSME & Financial Inclusion',
    schemeType: 'LOAN', schemeCategoryLabel: 'Banking Concession for Women',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'AGRI_PROCESSING', 'HANDICRAFTS', 'TRADING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['FEMALE'], categoriesAllowed: ['WOMEN'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Woman entrepreneur'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 500000, minimumFunding: 20000,
      subsidyPercentage: '0.25% Interest Concession + Zero Processing Fee',
      subsidyDetails: '0.25% interest concession; zero upfront processing fee; zero collateral requirement.',
      loanDetails: 'Sanctioned under MUDRA Shishu and Kishore guidelines.',
      marginMoneyDetails: 'Nil for loans up to ₹50k; only 10% above ₹50k.', interestDetails: 'Competitive MCLR-linked rate with 0.25% discount.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Tax identity' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply at Bank of Baroda Branch', description: 'Visit BoB branch or apply on bankofbaroda.in.' },
      { step: 2, title: 'Direct Sanction & Baroda Debit Card', description: 'Receive credit facility and ATM card for working capital.' }
    ],
    officialWebsite: 'https://www.bankofbaroda.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/bob-mahila',
    officialSource: 'Bank of Baroda Official SME Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['0.25% interest rate discount for women entrepreneurs', 'Zero upfront loan processing fees', '100% collateral-free up to ₹5,00,000']
  },

  // ================= PUNJAB NATIONAL BANK =================
  {
    id: 'pnb_sanjeevani',
    name: 'Punjab National Bank (PNB) Sanjeevani MSME Scheme',
    shortDescription: 'Working capital and term loan assistance up to ₹5 Crore for micro and small manufacturing units with quick turnaround time.',
    ministry: 'Punjab National Bank', department: 'MSME Banking Division',
    schemeType: 'LOAN', schemeCategoryLabel: 'Commercial MSME Bank Credit',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 50000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Active business with Udyam'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 50000000, minimumFunding: 200000,
      subsidyPercentage: 'Credit Guarantee Coverage under CGTMSE',
      subsidyDetails: 'Competitive interest rates with collateral waiver up to ₹2 Crore under CGTMSE.',
      loanDetails: 'Term loan for plant machinery and Cash Credit for raw materials.',
      marginMoneyDetails: '15% to 20% promoter contribution.', interestDetails: 'RLLR linked rates.', repaymentDetails: '5 to 7 years.', collateralRequirement: 'CGTMSE covered up to ₹2 Cr.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on PNB Portal', description: 'Submit application on pnbindia.in under MSME section.' },
      { step: 2, title: 'Appraisal & Fund Release', description: 'Loan sanctioned and disbursed.' }
    ],
    officialWebsite: 'https://www.pnbindia.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/pnb-msme',
    officialSource: 'Punjab National Bank Official Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Financing up to ₹5 Crore for MSME manufacturing', 'Fast-track digital processing within 59 minutes', 'Collateral-free facility up to ₹2 Crore']
  },

  // ================= SIDBI =================
  {
    id: 'sidbi_smile',
    name: 'SIDBI Make in India Soft Loan Fund for MSMEs (SMILE)',
    shortDescription: 'Quasi-equity soft loans and term credit at concessional interest rates for high-growth manufacturing and service MSMEs.',
    ministry: 'Small Industries Development Bank of India (SIDBI)', department: 'Direct Credit Division',
    schemeType: 'LOAN', schemeCategoryLabel: 'Concessional Soft Loan & Quasi-Equity',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'SC', 'ST', 'STARTUPS', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'FUNDING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 2500000, maxProjectCost: 100000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'MSME with viable project'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 50000000, minimumFunding: 2500000,
      subsidyPercentage: 'Soft Loan Assistance with Concessional Interest',
      subsidyDetails: 'Soft loan in nature of quasi-equity up to ₹1 Crore at attractive base rate + 1% p.a. for first 3 years.',
      loanDetails: 'Term loan up to ₹5 Crore with moratorium up to 3 years.',
      marginMoneyDetails: 'Promoter equity can be as low as 15%.', interestDetails: 'Concessional rate for 3 years.', repaymentDetails: 'Up to 10 years with 36-month moratorium.', collateralRequirement: 'Asset-backed security and CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Promoter KYC' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_dpr', name: 'Detailed Bankable DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Machinery quotes and financial model' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on SIDBI Portal', description: 'Register on sidbi.in under Direct Credit SMILE.' },
      { step: 2, title: 'SIDBI Appraisal & Soft Loan Sanction', description: 'SIDBI reviews techno-economic viability and disburses composite credit.' }
    ],
    officialWebsite: 'https://www.sidbi.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sidbi-smile',
    officialSource: 'Small Industries Development Bank of India (SIDBI)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Soft loan acting as quasi-equity to meet promoter margin shortfall', 'Long repayment period up to 10 years with 3-year moratorium', 'Direct lending from apex development bank (SIDBI)']
  },

  {
    id: 'sidbi_speed',
    name: 'SIDBI SPEED Scheme (Loan in 100 Minutes for Solar & Green Tech)',
    shortDescription: '100% financing up to ₹1 Crore for purchasing green machinery and rooftop solar plants with zero processing fee and no collateral.',
    ministry: 'Small Industries Development Bank of India (SIDBI)', department: 'Green Finance & Sustainable Development',
    schemeType: 'LOAN', schemeCategoryLabel: '100% Green Machine & Solar Financing',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'WOMEN', 'GENERAL'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'MSME operating for at least 3 years'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 10000000, minimumFunding: 200000,
      subsidyPercentage: '100% Financing of Equipment Invoice + Zero Processing Fee',
      subsidyDetails: '100% of equipment proforma invoice financed directly to machine vendor; zero promoter margin required.',
      loanDetails: 'Fast-track digital sanction within 100 minutes.',
      marginMoneyDetails: '0% promoter margin (100% bank financing).', interestDetails: 'Fixed low rate (approx 7.5% - 8.25% p.a.).', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Only hypothecation of purchased machinery (no land/building collateral).'
    },
    requiredDocuments: [
      { id: 'doc_udyam', name: 'Udyam Registration Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_invoice', name: 'Machine Vendor Quotation / Proforma Invoice', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Vendor proforma invoice' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proforma Invoice Online', description: 'Upload equipment quotation on sidbi.in/speed.' },
      { step: 2, title: 'Automated 100-Minute Sanction', description: 'Loan approved digitally; funds released directly to machinery manufacturer.' }
    ],
    officialWebsite: 'https://www.sidbi.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sidbi-speed',
    officialSource: 'SIDBI Green Finance Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% financing of machinery cost - zero down payment required', 'Automated in-principle sanction in 100 minutes', 'Only bought equipment hypothecated - zero property collateral']
  },

  // ================= NABARD =================
  {
    id: 'nabard_ac_abc',
    name: 'NABARD Agri-Clinics and Agri-Business Centres (AC&ABC) Scheme',
    shortDescription: '36% (General) to 44% (Women/SC/ST/NER) composite capital subsidy for setting up agri-ventures like bio-fertilizers, custom hiring, and soil labs.',
    ministry: 'National Bank for Agriculture and Rural Development (NABARD)', department: 'MANAGE & NABARD Joint Cell',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '36% - 44% Capital Subsidy up to ₹1 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_ENTREPRENEURS', 'WOMEN', 'SC', 'ST', 'RURAL_YOUTH'],
    businessSectors: ['AGRI_PROCESSING', 'DAIRY_LIVESTOCK', 'SERVICES'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PARTNERSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Graduates/Diploma holders in Agriculture, Horticulture, Dairy, Forestry'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 10000000, minimumFunding: 200000,
      subsidyPercentage: '36% for General; 44% for Women, SC/ST, and NER States',
      subsidyDetails: '36% (44% for Women/SC/ST) back-ended capital subsidy on project cost up to ₹20 Lakhs per individual, and up to ₹1 Crore for groups of 5 trained agri-graduates.',
      loanDetails: 'Bank sanctions composite project loan.',
      marginMoneyDetails: '10% - 15% promoter margin.', interestDetails: 'Standard agricultural priority lending rate.', repaymentDetails: '5 to 10 years with 2-year moratorium.', collateralRequirement: 'Collateral-free up to ₹10 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_agri_degree', name: 'Agri Degree / Diploma / Training Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Proof of agriculture/allied qualification or MANAGE training' }
    ],
    applicationProcess: [
      { step: 1, title: 'Complete 45-Day Training at MANAGE Centre', description: 'Attend free residential training at designated institute.' },
      { step: 2, title: 'Bank Loan Sanction & Subsidy Lock-in', description: 'Bank sanctions loan; NABARD deposits back-ended capital subsidy into borrower account.' }
    ],
    officialWebsite: 'https://www.manage.gov.in/acabc/acabc.asp',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/acabc',
    officialSource: 'MANAGE & NABARD Official Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['44% direct capital subsidy for women and SC/ST agri-entrepreneurs', 'Up to ₹1,00,00,000 subsidy for group ventures of 5 graduates', 'Covers soil testing, organic fertilizer units, seed processing, and custom farm equipment hiring']
  },

  // ================= NATIONAL CORPORATIONS (NBCFDC & NSFDC) =================
  {
    id: 'nbcfdc_term_loan',
    name: 'National Backward Classes Finance & Development Corporation (NBCFDC) Term Loan',
    shortDescription: 'Concessional loans up to ₹15 Lakhs at low interest rate (3% to 6% p.a.) for entrepreneurs belonging to Other Backward Classes (OBC).',
    ministry: 'Ministry of Social Justice and Empowerment', department: 'NBCFDC',
    schemeType: 'LOAN', schemeCategoryLabel: 'Concessional OBC Loan at 3% - 6% Interest',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['OBC'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'HANDICRAFTS', 'TRADING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['ALL'], categoriesAllowed: ['OBC'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'OBC certificate with family income under ₹3.00 Lakhs'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 1500000, minimumFunding: 50000,
      subsidyPercentage: 'Concessional Low Interest Rate (3% to 6% p.a.)',
      subsidyDetails: 'NBCFDC provides up to 85% project cost at 3% - 6% p.a. interest rate; State Channelising Agency (SCA) provides balance.',
      loanDetails: 'Direct term loan through State Channelising Agency (SCA) or Regional Rural Bank.',
      marginMoneyDetails: 'Beneficiary pays only 5% promoter equity.', interestDetails: 'Extremely low interest rate of 3% for women (Mahila Samridhi) and 6% for general OBC.', repaymentDetails: 'Up to 5 to 7 years.', collateralRequirement: 'Guaranteed through SCA.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste_obc', name: 'OBC Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Competent authority OBC caste certificate' },
      { id: 'doc_income', name: 'Income Certificate', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'eligibilityProfile.incomeRange', description: 'Annual family income certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply via State Channelising Agency (SCA)', description: 'Submit form through district backward classes development corporation.' },
      { step: 2, title: 'Sanction at 3% - 6% Interest', description: 'Direct disbursement with minimal interest burden.' }
    ],
    officialWebsite: 'https://nbcfdc.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nbcfdc-tl',
    officialSource: 'NBCFDC, Ministry of Social Justice',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Extremely low 3% to 6% annual interest rate', 'Promoter equity requirement is only 5%', 'Loans up to ₹15 Lakhs for transport, agriculture, artisan trades, and retail']
  },

  {
    id: 'nsfdc_term_loan',
    name: 'National Scheduled Castes Finance & Development Corporation (NSFDC) Term Loan',
    shortDescription: 'Concessional term loans up to ₹50 Lakhs at 4% to 8% interest rate for Scheduled Caste entrepreneurs.',
    ministry: 'Ministry of Social Justice and Empowerment', department: 'NSFDC',
    schemeType: 'LOAN', schemeCategoryLabel: 'Concessional SC Loan at 4% - 8% Interest',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING', 'HANDICRAFTS'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'PARTNERSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['SC'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'SC certificate'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 5000000, minimumFunding: 50000,
      subsidyPercentage: 'Concessional Interest Rate of 4% (Women) to 8% p.a.',
      subsidyDetails: 'NSFDC finances up to 90% of project cost up to ₹50 Lakhs at 4% for women (Mahila Adhikarita) and 6%-8% for general SC entrepreneurs.',
      loanDetails: 'Disbursed through State SC Corporations or RRBs.',
      marginMoneyDetails: 'Promoter equity 5% to 10%.', interestDetails: '4% to 8% p.a. fixed interest.', repaymentDetails: '5 to 10 years with 1-year moratorium.', collateralRequirement: 'Covered under state guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste_sc', name: 'SC Certificate', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Scheduled Caste certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Form to State SC Corporation', description: 'Apply via district SC development corporation office or nsfdc.nic.in.' },
      { step: 2, title: 'Sanction & Fund Release', description: 'Facility sanctioned at subsidized 4%-8% interest rate.' }
    ],
    officialWebsite: 'https://nsfdc.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nsfdc-tl',
    officialSource: 'National Scheduled Castes Finance & Development Corporation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Financing up to ₹50 Lakhs at 4% to 8% interest rate', 'Up to 90% of total project cost funded', 'Special 4% rate for women-owned micro-ventures']
  },

  // ================= PRIVATE / CSR & FOUNDATION GRANTS =================
  {
    id: 'tata_trusts_livelihoods',
    name: 'Tata Trusts Social Enterprise & Rural Livelihoods Grant',
    shortDescription: 'Philanthropic grant assistance up to ₹25 Lakhs for grassroots farmer collectives, rural artisans, and women self-help micro-enterprises.',
    ministry: 'Tata Trusts', department: 'Livelihoods & Enterprise Promotion Cell',
    schemeType: 'GRANT', schemeCategoryLabel: 'Corporate Foundation Grant up to ₹25 Lakhs',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'RURAL_YOUTH', 'ARTISANS', 'FARMERS', 'SHG'],
    businessSectors: ['AGRI_PROCESSING', 'HANDICRAFTS', 'DAIRY_LIVESTOCK', 'SERVICES'],
    businessTypes: ['SHG', 'COOPERATIVE', 'FPO', 'INDIVIDUAL', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Rural or artisan enterprise'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 50000,
      subsidyPercentage: '100% Philanthropic Grant Assistance',
      subsidyDetails: 'Non-repayable direct grant funding for procuring tools, machinery, and market linkages for rural community enterprises.',
      loanDetails: 'N/A - Philanthropic grant funding.',
      marginMoneyDetails: 'Nil.', interestDetails: 'Zero interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Leader / Representative identity' },
      { id: 'doc_concept', name: 'Community Enterprise Proposal', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.description', description: 'Description of rural livelihood activity and beneficiaries' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Livelihoods Concept', description: 'Apply via tatatrusts.org or partnering rural development agency.' },
      { step: 2, title: 'Field Assessment & Direct Grant Release', description: 'Trust assesses community impact and releases funds directly.' }
    ],
    officialWebsite: 'https://www.tatatrusts.org/',
    mySchemeUrl: 'https://www.tatatrusts.org/our-work/rural-livelihoods',
    officialSource: 'Tata Trusts Official Livelihoods Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% non-repayable philanthropic grant assistance up to ₹25 Lakhs', 'Dedicated to rural artisans, women SHGs, and smallholder farming collectives', 'Free technical handholding and pan-India retail exhibition access']
  },

  {
    id: 'hdfc_smartup_msme',
    name: 'HDFC Bank SmartUp & Parivartan MSME Grant Program',
    shortDescription: 'CSR social innovation grants up to ₹25 Lakhs and collateral-free credit facilities with special fee waivers for micro-entrepreneurs.',
    ministry: 'HDFC Bank', department: 'Parivartan CSR & SmartUp Initiative',
    schemeType: 'GRANT', schemeCategoryLabel: 'Private Bank Innovation Grant & Credit',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'MICRO_ENTERPRISES'],
    businessSectors: ['SERVICES', 'TECHNOLOGY', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Registered enterprise or social venture'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: 'Social Innovation Grant up to ₹25 Lakhs',
      subsidyDetails: 'Annual HDFC Bank Parivartan SmartUp grant provides ₹10L - ₹25L non-dilutive grant to grassroots startups solving education, agri, and healthcare challenges.',
      loanDetails: 'Priority MSME working capital credit lines.',
      marginMoneyDetails: 'Nil for grant component.', interestDetails: 'Commercial bank rate on loan.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral for grant.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam / Startup Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Enterprise proof' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on HDFC SmartUp Portal', description: 'Submit social impact pitch on hdfcbank.com/smartup.' },
      { step: 2, title: 'Jury Evaluation & Grant Disbursement', description: 'Jury selects impactful social micro-units for grant.' }
    ],
    officialWebsite: 'https://www.hdfcbank.com/sme/smartup',
    mySchemeUrl: 'https://www.hdfcbank.com/csr',
    officialSource: 'HDFC Bank SmartUp & Parivartan',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Non-dilutive grant up to ₹25 Lakhs per micro-enterprise', 'Free current account with zero balance requirement for 1 year', 'Access to mentorship and corporate market networks']
  },

  // 12. CANARA MSME PRAGATI
  {
    id: 'canara_msme_express',
    name: 'Canara Bank - MSME Pragati / Express Business Loan',
    shortDescription: 'Collateral-free working capital and machinery term loans up to ₹25 Lakhs under CGTMSE cover with instant in-principle approval.',
    ministry: 'Ministry of Finance', department: 'Canara Bank MSME Wing',
    schemeType: 'LOAN', schemeCategoryLabel: 'Collateral-Free Bank Loan up to ₹25L',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'MICRO_ENTERPRISES', 'RETAILERS', 'SERVICE_PROVIDERS'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 2500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic business literacy'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: 'Collateral-Free Priority MSME Loan',
      subsidyDetails: 'Attractive interest rates starting from 8.65% p.a. with CGTMSE guarantee fee subsidized for micro-enterprises.',
      loanDetails: 'Term loan for plant/machinery + cash credit limit for working capital.',
      marginMoneyDetails: '10% margin.', interestDetails: 'Competitive floating rate linked to RLLR.', repaymentDetails: '5 to 7 years.', collateralRequirement: '100% collateral-free under CGTMSE cover.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN of proprietor' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Canara Online MSME Portal', description: 'Fill digital application on canarabank.com.' },
      { step: 2, title: 'In-Principle Sanction Letter', description: 'Instant algorithm-based in-principle sanction.' },
      { step: 3, title: 'Document Verification & Loan Release', description: 'Branch visits unit and releases funds within 3 days.' }
    ],
    officialWebsite: 'https://canarabank.com/msme-banking',
    mySchemeUrl: 'https://canarabank.com/User_page.aspx?othlink=384',
    officialSource: 'Canara Bank Official MSME Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Collateral-free loans up to ₹25 Lakhs with CGTMSE backing', 'Instant in-principle sanction online', 'Competitive interest starting at 8.65% p.a.']
  },

  // 13. UNION BANK UNION NARI SHAKTI
  {
    id: 'union_nari_shakti',
    name: 'Union Bank of India - Union Nari Shakti Scheme',
    shortDescription: 'Concessional credit up to ₹50 Lakhs for women entrepreneurs with a 0.50% interest discount and 100% processing fee waiver.',
    ministry: 'Ministry of Finance', department: 'Union Bank of India',
    schemeType: 'LOAN', schemeCategoryLabel: 'Women Concessional Loan up to ₹50L',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'TRADING', 'HANDICRAFTS', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 5000000, minimumFunding: 50000,
      subsidyPercentage: '0.50% Concessional Interest Rate + Zero Processing Fee',
      subsidyDetails: '0.50% concession over card interest rate; zero upfront processing and documentation charges.',
      loanDetails: 'Term loan up to 7 years + working capital OD limit.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: 'Concessional rate from 8.25% p.a.', repaymentDetails: 'Up to 7 years with 6-month moratorium.', collateralRequirement: 'No collateral required up to ₹10 Lakhs (CGTMSE).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN card' },
      { id: 'doc_udyam', name: 'Udyam Certificate (>51% Woman Shareholding)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Online Application on Union Bank Portal', description: 'Submit details on unionbankofindia.co.in.' },
      { step: 2, title: 'Dedicated Women Entrepreneur Cell Review', description: 'Fast-track appraisal by specialized women banking officers.' },
      { step: 3, title: 'Disbursement with Zero Fee', description: 'Loan disbursed without processing charges.' }
    ],
    officialWebsite: 'https://www.unionbankofindia.co.in/english/msme-schemes.aspx',
    mySchemeUrl: 'https://www.unionbankofindia.co.in/',
    officialSource: 'Union Bank of India MSME Department',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['0.50% interest rate concession exclusively for women entrepreneurs', '100% waiver of processing and inspection fees', 'Repayment flexibility up to 7 years with moratorium']
  },

  // 14. INDIAN BANK IND SHAKTI
  {
    id: 'indian_bank_ind_shakti',
    name: 'Indian Bank - IND Shakti Micro Enterprise Loan',
    shortDescription: 'Simplified hassle-free micro credit up to ₹10 Lakhs for micro-enterprises and women self-help groups with turnaround within 3 days.',
    ministry: 'Ministry of Finance', department: 'Indian Bank',
    schemeType: 'LOAN', schemeCategoryLabel: 'Fast-Track Micro Credit up to ₹10L',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'MICRO_ENTERPRISES', 'RURAL_YOUTH', 'SHG'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'SHG', 'INDIVIDUAL', 'PARTNERSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 1000000, minimumFunding: 25000,
      subsidyPercentage: 'Collateral-Free Micro Loan at Concessional Interest',
      subsidyDetails: 'Priority sector micro credit with flexible repayment and zero foreclosure penalties.',
      loanDetails: 'Composite loan for equipment and inventory.',
      marginMoneyDetails: '5% own contribution.', interestDetails: 'Priority sector micro rate.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral up to ₹10 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_bank_stmt', name: 'Bank Account Statement (6 Months)', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Proof of regular banking transactions' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply at Indian Bank Branch or Online', description: 'Submit application on indianbank.in.' },
      { step: 2, title: 'Field Appraisal by Agricultural / MSME Officer', description: 'Quick verification of business premises.' },
      { step: 3, title: 'Sanction and Fund Credit', description: 'Funds released within 72 hours.' }
    ],
    officialWebsite: 'https://www.indianbank.in/departments/msme/',
    mySchemeUrl: 'https://www.indianbank.in/',
    officialSource: 'Indian Bank Official MSME Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Turnaround time within 3 working days', 'Zero collateral and zero guarantor up to ₹10 Lakhs', 'Nil prepayment penalty']
  },

  // 15. BANK OF INDIA STAR SME
  {
    id: 'bank_of_india_star_sme',
    name: 'Bank of India - BOI Star SME Auto & Machinery Loan',
    shortDescription: 'Up to 90% financing for commercial vehicles, transport delivery fleets, and industrial plant machinery with repayment up to 7 years.',
    ministry: 'Ministry of Finance', department: 'Bank of India MSME Department',
    schemeType: 'LOAN', schemeCategoryLabel: '90% Machinery & Commercial Vehicle Financing',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MICRO_ENTERPRISES', 'DRIVER_ENTREPRENEURS', 'MANUFACTURERS', 'LOGISTICS'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 150000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 4500000, minimumFunding: 150000,
      subsidyPercentage: 'Up to 90% Project Equipment Loan',
      subsidyDetails: 'BOI finances up to 90% of proforma invoice value of machinery and vehicles.',
      loanDetails: 'Term loan linked with asset hypothecation.',
      marginMoneyDetails: '10% down payment.', interestDetails: 'Competitive MSME asset finance interest.', repaymentDetails: 'Up to 7 years.', collateralRequirement: 'Hypothecation of purchased machinery/vehicle only (no land collateral).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_quotation', name: 'Machinery / Vehicle Proforma Invoice', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Authorized dealer quotation' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain Dealer Invoice', description: 'Get machinery or vehicle quote from authorized supplier.' },
      { step: 2, title: 'Apply on BOI Portal', description: 'Submit online on bankofindia.co.in.' },
      { step: 3, title: 'Direct Payment to Dealer', description: 'Bank pays 90% invoice value directly to supplier.' }
    ],
    officialWebsite: 'https://bankofindia.co.in/msme-schemes',
    mySchemeUrl: 'https://bankofindia.co.in/',
    officialSource: 'Bank of India MSME Department',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Finances up to 90% of machinery invoice value', 'No immovable property collateral required', 'Repayment tenure up to 84 months']
  },

  // 16. CENTRAL BANK CENT KALYANI
  {
    id: 'central_bank_cent_kalyani',
    name: 'Central Bank of India - Cent Kalyani Scheme for Women',
    shortDescription: 'Collateral-free credit up to ₹1 Crore for women micro-entrepreneurs with zero processing fee and concession in interest rate.',
    ministry: 'Ministry of Finance', department: 'Central Bank of India',
    schemeType: 'LOAN', schemeCategoryLabel: 'Women Business Credit up to ₹1 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'HANDICRAFTS', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 10000000, minimumFunding: 100000,
      subsidyPercentage: 'Concessional Interest + Zero Processing Fee',
      subsidyDetails: '0.25% - 0.50% interest concession; zero upfront processing fee; term loan and working capital credit.',
      loanDetails: 'Term loan up to 7 years + overdraft/cash credit.',
      marginMoneyDetails: '10% margin.', interestDetails: 'Concessional interest rate.', repaymentDetails: 'Up to 7 years.', collateralRequirement: 'No third-party collateral required (covered under CGTMSE).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN card' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Online Application', description: 'Register on centralbankofindia.co.in.' },
      { step: 2, title: 'Branch Scrutiny', description: 'Dedicated branch officer verifies proposal.' },
      { step: 3, title: 'Zero Fee Sanction & Disbursement', description: 'Loan sanctioned without processing charges.' }
    ],
    officialWebsite: 'https://www.centralbankofindia.co.in/en/cent-kalyani',
    mySchemeUrl: 'https://www.centralbankofindia.co.in/',
    officialSource: 'Central Bank of India Official Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Financing up to ₹1 Crore for women-owned enterprises', 'Zero processing and documentation charges', 'Covered under CGTMSE collateral guarantee']
  },

  // 17. IDBI BANK MUDRA PLUS
  {
    id: 'idbi_mudra_plus',
    name: 'IDBI Bank - MUDRA Plus & MSME Growth Credit',
    shortDescription: 'Digital collateral-free composite loans up to ₹20 Lakhs for micro-enterprises under Pradhan Mantri Mudra Yojana with minimal documentation.',
    ministry: 'Ministry of Finance', department: 'IDBI Bank MSME Wing',
    schemeType: 'LOAN', schemeCategoryLabel: 'Digital MUDRA Credit up to ₹20L',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['GENERAL', 'WOMEN', 'MICRO_ENTERPRISES', 'RURAL_YOUTH'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 2000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 2000000, minimumFunding: 50000,
      subsidyPercentage: 'Collateral-Free Composite Credit',
      subsidyDetails: 'Digital end-to-end sanction with zero processing fee up to ₹5 Lakhs; competitive RLLR-linked interest.',
      loanDetails: 'Term loan + Mudra RuPay Debit Card for instant cash credit.',
      marginMoneyDetails: '5% - 10% own equity.', interestDetails: 'RLLR linked priority interest.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral (Credit Guarantee for Micro Units - CGFMU).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pan', name: 'PAN Card', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'PAN card' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on IDBI Digital MSME Portal', description: 'Submit on idbibank.in or JanSamarth portal.' },
      { step: 2, title: 'Digital KYC & Credit Appraisal', description: 'Instant in-principle approval via account aggregator.' },
      { step: 3, title: 'Disbursement & RuPay Mudra Card Issuance', description: 'Funds credited and operational debit card issued.' }
    ],
    officialWebsite: 'https://www.idbibank.in/mudra-loan.aspx',
    mySchemeUrl: 'https://www.idbibank.in/',
    officialSource: 'IDBI Bank Official MSME Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Digital end-to-end loan approval with paperless KYC', 'Includes Mudra RuPay Card for anytime cash withdrawal', 'Zero collateral required under CGFMU guarantee']
  },

  // 18. SIDBI 4E (END-TO-END ENERGY EFFICIENCY)
  {
    id: 'sidbi_4e_energy',
    name: 'SIDBI - End to End Energy Efficiency (4E) Scheme',
    shortDescription: 'Concessional term loans at 5.5% to 7% p.a. for MSMEs investing in energy-saving machinery, solar rooftops, and green process equipment.',
    ministry: 'Ministry of MSME & Ministry of Finance', department: 'SIDBI Green Climate Finance',
    schemeType: 'LOAN', schemeCategoryLabel: 'Green Energy Concessional Loan (5.5% - 7%)',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MANUFACTURERS', 'MICRO_ENTERPRISES', 'GREEN_ENTREPRENEURS'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'SERVICES'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 30000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Operating enterprise for at least 1 year'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 15000000, minimumFunding: 200000,
      subsidyPercentage: 'Ultra-Low Concessional Interest Rate (5.5% - 7% p.a.)',
      subsidyDetails: 'Direct funding from World Bank / KfW green credit line; 75% cost of technical energy audit subsidized by SIDBI.',
      loanDetails: 'Term loan up to 90% of equipment cost.',
      marginMoneyDetails: '10% promoter contribution.', interestDetails: '5.5% - 7.0% p.a. fixed concessional interest.', repaymentDetails: '5 years with 1-year moratorium.', collateralRequirement: 'CGTMSE cover available.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' },
      { id: 'doc_audit', name: 'Walk-Through Energy Audit Report', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Certified BEE energy auditor report' }
    ],
    applicationProcess: [
      { step: 1, title: 'Energy Audit Assessment', description: 'SIDBI-empaneled energy auditor evaluates factory savings.' },
      { step: 2, title: 'Submit Proposal to SIDBI', description: 'Apply online on sidbi.in/green-initiatives.' },
      { step: 3, title: 'Sanction at 5.5% - 7% Interest', description: 'Disbursement directly to machinery manufacturer.' }
    ],
    officialWebsite: 'https://www.sidbi.in/en/green-initiatives',
    mySchemeUrl: 'https://www.sidbi.in/',
    officialSource: 'Small Industries Development Bank of India (SIDBI)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Ultra-low interest rate starting at just 5.5% p.a.', 'SIDBI covers 75% fee of certified energy auditor', 'Cuts enterprise electricity consumption by 20% to 40%']
  },

  // 19. SIDBI ARIISE
  {
    id: 'sidbi_ariise',
    name: 'SIDBI - ARIISE Scheme for Micro & Small Enterprises',
    shortDescription: 'Financial assistance up to ₹3 Crore for setting up new micro manufacturing units and scaling existing production lines with 100% fast-track processing.',
    ministry: 'Ministry of MSME & Ministry of Finance', department: 'SIDBI Direct Lending Vertical',
    schemeType: 'LOAN', schemeCategoryLabel: 'Direct SIDBI Term Loan up to ₹3 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MANUFACTURERS', 'MICRO_ENTERPRISES', 'SERVICES'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 30000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic industrial experience'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 30000000, minimumFunding: 500000,
      subsidyPercentage: 'Concessional Direct MSME Financing',
      subsidyDetails: 'Direct lending from SIDBI with turnaround time under 10 days; linked with CGTMSE credit guarantee.',
      loanDetails: 'Term loan for factory construction, plant & machinery.',
      marginMoneyDetails: '15% own contribution.', interestDetails: 'Competitive SIDBI direct lending rate.', repaymentDetails: 'Up to 8 years including moratorium.', collateralRequirement: 'Covered under CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active MSME registration' },
      { id: 'doc_dpr', name: 'Detailed Project Report (DPR)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Manufacturing project feasibility report' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit DPR on SIDBI Direct Lending Portal', description: 'Apply on sidbi.in/direct-lending.' },
      { step: 2, title: 'Video KYC & Desk Appraisal', description: 'Fast-track appraisal within 7 working days.' },
      { step: 3, title: 'Sanction and Fund Release', description: 'Direct term loan disbursement.' }
    ],
    officialWebsite: 'https://www.sidbi.in/en/direct-lending',
    mySchemeUrl: 'https://www.sidbi.in/',
    officialSource: 'Small Industries Development Bank of India (SIDBI)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct lending up to ₹3 Crore without third-party bank intermediary', 'Fast-track sanction within 10 days', 'Moratorium up to 18 months during unit construction']
  },

  // 20. NABARD DAIRY & COLD STORAGE TERM ASSISTANCE
  {
    id: 'nabard_dairy_infra',
    name: 'NABARD - Rural Cold Storage & Agri-Logistics Refinance',
    shortDescription: 'Long-term bank loans with up to 33.33% back-ended capital subsidy for rural cold rooms, ripening chambers, and grain storage godowns.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'NABARD Farm Sector Division',
    schemeType: 'SUBSIDY', schemeCategoryLabel: '33.33% Capital Subsidy for Rural Cold Storage',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['FARMERS', 'AGRI_PRENEURS', 'RURAL_YOUTH', 'WOMEN', 'FPO'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'DAIRY_LIVESTOCK'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'FPO', 'COOPERATIVE', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 300000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No requirement'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 5000000, minimumFunding: 300000,
      subsidyPercentage: '25% to 33.33% Back-Ended Capital Subsidy',
      subsidyDetails: '33.33% subsidy for SC/ST, Women, and North-Eastern States (max ₹50 Lakhs); 25% for general category (max ₹33.33 Lakhs).',
      loanDetails: 'Bank term loan covers up to 65% of project cost.',
      marginMoneyDetails: '10% - 15% own investment.', interestDetails: 'NABARD refinanced concessional rate.', repaymentDetails: '7 to 11 years with 2-year moratorium.', collateralRequirement: 'Pledge of warehouse receipts / CGTMSE.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_land', name: 'Land Ownership / Long Lease Agreement', category: 'LOCATION', mandatory: true, profileFieldMatch: 'business.location', description: 'Proof of land for godown/cold room' },
      { id: 'doc_dpr', name: 'Cold Storage Civil & Refrigeration DPR', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Engineering specs and farmer capacity tie-ups' }
    ],
    applicationProcess: [
      { step: 1, title: 'Formulate Cold Storage DPR', description: 'Include technical drawings from refrigeration engineer.' },
      { step: 2, title: 'Submit Loan Application to Bank', description: 'Apply at financing bank with NABARD subsidy claim.' },
      { step: 3, title: 'Joint Inspection & Subsidy Release', description: 'NABARD and bank inspect structure and release subsidy.' }
    ],
    officialWebsite: 'https://www.nabard.org/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nabard-cold-chain',
    officialSource: 'National Bank for Agriculture and Rural Development (NABARD)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 33.33% capital subsidy (up to ₹50 Lakhs) on rural cold chain', 'Generates reliable recurring warehouse rental income', 'Long repayment schedule up to 11 years with 2-year moratorium']
  },

  // 21. NABARD MEDP FOR SHGS
  {
    id: 'nabard_medp_micro',
    name: 'NABARD Micro Enterprise Development Programme (MEDP)',
    shortDescription: '100% grant-funded vocational training and up to ₹5 Lakhs micro-enterprise credit for Self-Help Groups in handicrafts, textiles, and food processing.',
    ministry: 'Ministry of Finance & Ministry of Rural Development', department: 'NABARD Micro Credit Innovations Department (MCID)',
    schemeType: 'TRAINING', schemeCategoryLabel: '100% Free Training & ₹5L SHG Credit',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'SHG', 'ARTISANS', 'RURAL_YOUTH'],
    businessSectors: ['HANDICRAFTS', 'AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['SHG', 'PROPRIETORSHIP', 'INDIVIDUAL'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL'],
      minProjectCost: 20000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 500000, minimumFunding: 20000,
      subsidyPercentage: '100% Free Technical Training + Collateral-Free Micro Credit',
      subsidyDetails: 'NABARD pays 100% cost of 15-day hands-on enterprise skill course; partnering banks sanction loans up to ₹5 Lakhs per group.',
      loanDetails: 'Bank credit linkage at concessional SHG interest rate (approx 7%).',
      marginMoneyDetails: 'Nil.', interestDetails: '7% priority SHG lending rate.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar of SHG Members', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Member identity' },
      { id: 'doc_shg_passbook', name: 'SHG Bank Passbook & Resolution', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Proof of group savings and enterprise resolution' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal via District Development Manager (DDM)', description: 'Contact local NABARD DDM office.' },
      { step: 2, title: 'Attend 15-Day On-Site Enterprise Training', description: 'Master production, packaging, and pricing.' },
      { step: 3, title: 'Bank Loan Release & Production Start', description: 'Partnering bank sanctions collateral-free credit.' }
    ],
    officialWebsite: 'https://www.nabard.org/content1.aspx?id=516',
    mySchemeUrl: 'https://www.nabard.org/',
    officialSource: 'NABARD MCID Department',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% free professional hands-on skill training by master trainers', 'Direct bank loan linkage up to ₹5 Lakhs with zero collateral', 'Marketing stalls provided free of cost at regional NABARD melas']
  },

  // 22. NSKFDC SWACHHTA UDYAMI YOJANA
  {
    id: 'nskfdc_swachhta_udyam',
    name: 'NSKFDC Swachhta Udyami Yojana (Sanitation & Waste Ventures)',
    shortDescription: 'Loans up to ₹50 Lakhs at 4% concessional interest with up to 50% capital subsidy (up to ₹3.25 Lakhs) for mechanized waste & sanitation ventures.',
    ministry: 'Ministry of Social Justice and Empowerment', department: 'National Safai Karamcharis Finance & Development Corporation (NSKFDC)',
    schemeType: 'CREDIT_LINKED_SUBSIDY', schemeCategoryLabel: '4% Concessional Loan + 50% Capital Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SC', 'RURAL_YOUTH', 'MICRO_ENTERPRISES', 'SANITATION_WORKERS'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 55, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'GENERAL', 'ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'CREDIT_LINKED_SUBSIDY', maximumFunding: 5000000, minimumFunding: 100000,
      subsidyPercentage: 'Up to 50% Capital Subsidy (max ₹3.25L) + 4% Interest Rate',
      subsidyDetails: 'Direct capital subsidy from Ministry of Social Justice; loan at an ultra-low 4% p.a. (3% for women) for procuring vacuum suckers, desludging trucks, garbage recyclers.',
      loanDetails: 'Financed via State Channelizing Agencies (SCAs) and PSU banks.',
      marginMoneyDetails: '10% beneficiary margin.', interestDetails: '4% (men) / 3% (women) p.a.', repaymentDetails: 'Up to 7 years including 6-month moratorium.', collateralRequirement: 'Vehicle hypothecation only (no immovable collateral).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_target_cert', name: 'Target Beneficiary Certificate / Recommendation', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Verification by local municipality / SCA' },
      { id: 'doc_quotation', name: 'Equipment / Truck Proforma Invoice', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Quotation from authorized vehicle fabricator' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Form to State Channelizing Agency', description: 'Apply on nskfdc.nic.in or State SC Development Corporation.' },
      { step: 2, title: 'Screening and Procurement Approval', description: 'Technical committee approves machinery quotes.' },
      { step: 3, title: 'Vehicle Delivery at 4% Interest', description: 'Direct disbursement with upfront capital subsidy credit.' }
    ],
    officialWebsite: 'https://nskfdc.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/suy-nskfdc',
    officialSource: 'NSKFDC, Ministry of Social Justice and Empowerment',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Ultra-low 4% interest rate (3% for women entrepreneurs)', 'Up to ₹3.25 Lakhs capital subsidy directly adjusted in loan', 'Transforms manual sanitation workers into proud mechanized fleet owners']
  },

  // 23. NMDFC VIRASAT CRAFT CREDIT
  {
    id: 'nmdfc_virasat',
    name: 'NMDFC Virasat Scheme for Minority Craftspersons',
    shortDescription: 'Concessional credit up to ₹10 Lakhs at 5% interest rate for men and 4% for women artisans belonging to notified minority communities.',
    ministry: 'Ministry of Minority Affairs', department: 'National Minorities Development & Finance Corporation (NMDFC)',
    schemeType: 'LOAN', schemeCategoryLabel: '4% - 5% Concessional Artisan Credit up to ₹10L',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['MINORITY', 'ARTISANS', 'WOMEN', 'RURAL_YOUTH'],
    businessSectors: ['HANDICRAFTS', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 60, genderAllowed: ['ALL'], categoriesAllowed: ['MINORITY'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Recognized craft artisan'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 1000000, minimumFunding: 25000,
      subsidyPercentage: '4% - 5% Ultra-Low Concessional Interest Rate',
      subsidyDetails: 'Interest rate is just 4% p.a. for female craftspersons and 5% p.a. for male craftspersons; repayment in 5 years.',
      loanDetails: 'Financed via State Channelizing Agencies (SCAs) and regional banks.',
      marginMoneyDetails: '5% own contribution.', interestDetails: '4% (women) / 5% (men).', repaymentDetails: '5 years in quarterly installments.', collateralRequirement: 'Zero collateral up to ₹2 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_minority_cert', name: 'Minority Community Certificate / Self Declaration', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Muslim, Christian, Sikh, Buddhist, Jain, Parsi proof' },
      { id: 'doc_artisan_pehchan', name: 'Pehchan Artisan ID Card / DC Handicrafts Card', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Artisan identity card' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply via State Minority Financial Corporation', description: 'Submit form on nmdfc.org.' },
      { step: 2, title: 'Craft Verification by Artisan Welfare Officer', description: 'Demonstration of handicraft skill.' },
      { step: 3, title: 'Disbursement at 4% Interest', description: 'Direct credit into artisan bank account.' }
    ],
    officialWebsite: 'https://www.nmdfc.org/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/virasat-nmdfc',
    officialSource: 'NMDFC, Ministry of Minority Affairs',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Ultra-low 4% annual interest rate for women artisans (5% for men)', 'Zero collateral requirement for loans up to ₹2 Lakhs', 'Direct participation in national Hunar Haat trade exhibitions']
  },

  // 24. NHFDC DIVYANGJAN SELF EMPLOYMENT
  {
    id: 'nhfdc_divyang_udyam',
    name: 'NHFDC Self-Employment Loan for Divyangjan Entrepreneurs',
    shortDescription: 'Concessional self-employment loans up to ₹25 Lakhs at 5% to 6% interest rate with 1% additional rebate for women with disabilities.',
    ministry: 'Ministry of Social Justice and Empowerment', department: 'National Handicapped Finance and Development Corporation (NHFDC)',
    schemeType: 'LOAN', schemeCategoryLabel: '5% Concessional Credit for Divyangjan',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['DIFF_ABLED', 'WOMEN', 'RURAL_YOUTH'],
    businessSectors: ['SERVICES', 'TRADING', 'MANUFACTURING', 'AGRI_PROCESSING', 'HANDICRAFTS'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PARTNERSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 2500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial knowledge'
    },
    financialBenefits: {
      fundingType: 'LOAN', maximumFunding: 2500000, minimumFunding: 25000,
      subsidyPercentage: '5% Interest Rate + 1% Rebate for Women / Timely Repayment',
      subsidyDetails: 'Loans up to ₹50,000 at 5% p.a.; ₹50,000 to ₹5L at 6% p.a.; 1% special rebate for women entrepreneurs with disabilities.',
      loanDetails: 'Channeled through State Channelizing Agencies and RRBs.',
      marginMoneyDetails: '5% own contribution.', interestDetails: '5% - 6% p.a. concessional interest.', repaymentDetails: '5 to 7 years with 6-month moratorium.', collateralRequirement: 'Zero collateral up to ₹3 Lakhs.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_disability_udid', name: 'UDID Card / Disability Certificate (40%+)', category: 'ELIGIBILITY', mandatory: true, profileFieldMatch: 'eligibilityProfile.category', description: 'Unique Disability ID card' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Application to State Disability Corporation', description: 'Register on nhfdc.nic.in or State SCA.' },
      { step: 2, title: 'Medical Board / SCA Verification', description: 'Verification of disability certificate and project plan.' },
      { step: 3, title: 'Fund Release at 5% Interest', description: 'Direct loan disbursement.' }
    ],
    officialWebsite: 'https://nhfdc.nic.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nhfdc-se',
    officialSource: 'NHFDC, Department of Empowerment of Persons with Disabilities',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Concessional 5% interest rate with 1% prompt repayment rebate', 'Zero collateral required for loans up to ₹3 Lakhs', 'Covers retail shops, service centers, manufacturing, and transport']
  },

  // 25. EXIM BANK MSME EXPORT CAPABILITY CREATION
  {
    id: 'exim_bank_msme_export',
    name: 'EXIM Bank - MSME Export Capability Creation Assistance',
    shortDescription: 'Term finance and grant support up to ₹50 Lakhs for Indian MSMEs acquiring international quality certifications, CE/FDA compliance, and export packaging.',
    ministry: 'Ministry of Commerce and Industry & Ministry of Finance', department: 'Export-Import Bank of India',
    schemeType: 'GRANT', schemeCategoryLabel: 'Export Compliance & Global Market Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['EXPORTERS', 'MICRO_ENTERPRISES', 'MANUFACTURERS'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'HANDICRAFTS', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 68, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Operating enterprise with export potential'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 200000,
      subsidyPercentage: 'Up to 50% Reimbursement on Global Certification & Packaging',
      subsidyDetails: '50% reimbursement of laboratory testing fees, international quality certifications (CE mark, ISO, FDA), and overseas buyer booth fees.',
      loanDetails: 'Export packing credit and term loans at LIBOR/SOFR linked interest.',
      marginMoneyDetails: '15% own investment.', interestDetails: 'Concessional export credit interest.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Covered under ECGC export credit guarantee.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_iec', name: 'Importer Exporter Code (IEC)', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'DGFT issued IEC code' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain DGFT IEC Code', description: 'Register on dgft.gov.in for export code.' },
      { step: 2, title: 'Submit Claim on EXIM Bank Portal', description: 'Apply on eximbankindia.in under MSME support.' },
      { step: 3, title: 'Technical Audit & Grant Disbursement', description: 'Direct reimbursement of overseas testing and certification expenses.' }
    ],
    officialWebsite: 'https://www.eximbankindia.in/msme-support',
    mySchemeUrl: 'https://www.eximbankindia.in/',
    officialSource: 'Export-Import Bank of India',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['50% reimbursement on expensive global testing and export certifications (CE, FDA, ISO)', 'Concessional export working capital credit backed by ECGC', 'Helps rural and micro manufacturers sell to global buyers']
  }
];
