/**
 * Startup Grants, Incubators & Private/CSR Foundations Catalog
 * Verified Government Grants, NITI Aayog AIM, DST, MeitY, BIRAC, and Apex Corporate CSR Foundations
 */

export const STARTUP_GRANT_SCHEMES = [
  // 1. STARTUP INDIA SEED FUND SCHEME (SISFS)
  {
    id: 'startup_india_seed_fund',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    shortDescription: 'Up to ₹20 Lakhs grant for proof of concept and prototype development, and up to ₹50 Lakhs convertible debentures/debt for market entry and scaling.',
    ministry: 'Ministry of Commerce and Industry', department: 'DPIIT',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹20L Grant + ₹50L Seed Debt',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'STUDENTS', 'WOMEN', 'RURAL_YOUTH', 'TECH_ENTREPRENEURS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'DPIIT recognized startup incorporated < 2 years'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Grant up to ₹20 Lakhs',
      subsidyDetails: 'Milestone-linked non-repayable grant up to ₹20 Lakhs for POC, prototype development, product trials; up to ₹50 Lakhs debt/convertible debenture for commercialization.',
      loanDetails: 'Zero interest or soft convertible debt.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest on grant.', repaymentDetails: 'Non-repayable for prototype grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar of Founder', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpiit', name: 'DPIIT Startup Recognition Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Active Startup India certificate' },
      { id: 'doc_pitch', name: 'Pitch Deck & Prototype Milestone Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Product roadmap and fund utilization schedule' }
    ],
    applicationProcess: [
      { step: 1, title: 'Obtain DPIIT Recognition', description: 'Apply on startupindia.gov.in.' },
      { step: 2, title: 'Select 3 Partner Incubators', description: 'Choose preferred incubators across India on seedfund.startupindia.gov.in.' },
      { step: 3, title: 'Incubator Pitch & Tranche Disbursement', description: 'Present to incubator seed committee and receive funds.' }
    ],
    officialWebsite: 'https://seedfund.startupindia.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/sisfs',
    officialSource: 'DPIIT, Ministry of Commerce and Industry',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹20 Lakhs 100% non-dilutive equity-free grant', 'Up to ₹50 Lakhs soft investment for commercial launch', 'Applied directly through 300+ accredited national incubators']
  },

  // 2. MEITY TIDE 2.0 (TECHNOLOGY INCUBATION & DEVELOPMENT)
  {
    id: 'meity_tide_2',
    name: 'MeitY TIDE 2.0 (Entrepreneur-in-Residence & Seed Grant)',
    shortDescription: '₹7 Lakhs Entrepreneur-in-Residence (EIR) fellowship grant and up to ₹30 Lakhs seed grant for tech innovators in IoT, AI, blockchain, and rural digital tech.',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)', department: 'Innovation and IPR Division',
    schemeType: 'GRANT', schemeCategoryLabel: '₹7L EIR Fellowship + ₹30L Seed Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TECH_ENTREPRENEURS', 'STARTUPS', 'STUDENTS', 'RURAL_YOUTH'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 50, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic technical acumen'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 3000000, minimumFunding: 400000,
      subsidyPercentage: '100% Non-Dilutive Government Fellowship & Grant',
      subsidyDetails: '₹30,000 per month stipend for 12-18 months (EIR: ₹7 Lakhs); ₹15L - ₹30L grant for prototype development and Minimum Viable Product (MVP).',
      loanDetails: 'Zero debt / 100% equity-free grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable grant.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Technical Proposal & MVP Blueprint', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Tech architecture and development timeline' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select TIDE 2.0 Incubator', description: 'Apply via MeitY Startup Hub (MSH) at meitystartuphub.in.' },
      { step: 2, title: 'Screening by Technical Advisory Committee', description: 'Interview and feasibility check.' },
      { step: 3, title: 'Incubation & Monthly Tranches', description: 'Receive EIR fellowship and lab prototyping funding.' }
    ],
    officialWebsite: 'https://meitystartuphub.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/tide2-meity',
    officialSource: 'MeitY Startup Hub (MSH)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Monthly founder stipend of ₹30,000 for up to 18 months', 'Up to ₹30 Lakhs grant for building functional hardware/software prototype', 'Free lab infrastructure and computing cloud credits']
  },

  // 3. MEITY SAMRIDH ACCELERATOR
  {
    id: 'meity_samridh_accel',
    name: 'MeitY SAMRIDH Accelerator Scheme',
    shortDescription: 'Government matching investment up to ₹40 Lakhs with intensive 6-month mentorship and investor matchmaking for software product startups.',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)', department: 'MeitY Startup Hub',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹40 Lakhs Matching Accelerator Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'TECH_ENTREPRENEURS', 'WOMEN'],
    businessSectors: ['TECHNOLOGY', 'SERVICES'],
    businessTypes: ['PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Active product with initial market traction'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 4000000, minimumFunding: 1000000,
      subsidyPercentage: '1:1 Matching Equity / Grant Funding up to ₹40 Lakhs',
      subsidyDetails: 'MeitY matches private angel/accelerator funding up to ₹40 Lakhs; customized masterclasses in customer acquisition, enterprise sales, and overseas expansion.',
      loanDetails: 'Equity matching or convertible grant.',
      marginMoneyDetails: 'Nil.', interestDetails: 'Zero interest.', repaymentDetails: 'Non-repayable or convertible.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_coi', name: 'Certificate of Incorporation', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MCA registration certificate' },
      { id: 'doc_traction', name: 'Product Traction & Customer Metrics', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Revenue metrics and user data' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply via MeitY Startup Hub', description: 'Submit application on meitystartuphub.in/samridh.' },
      { step: 2, title: 'Accelerator Cohort Selection', description: 'Partner accelerators (CIIE, T-Hub, NASSCOM) shortlist cohorts.' },
      { step: 3, title: 'Matching Investment Disbursement', description: 'Up to ₹40 Lakhs deployed with 6 months acceleration.' }
    ],
    officialWebsite: 'https://meitystartuphub.in/samridh',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/samridh-meity',
    officialSource: 'MeitY Startup Hub',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Matching government funding up to ₹40 Lakhs per venture', 'Access to global customer networks and international demo days', 'Mentorship from top institutional venture capitalists']
  },

  // 4. BIRAC BIOTECHNOLOGY IGNITION GRANT (BIG)
  {
    id: 'birac_big_grant',
    name: 'BIRAC Biotechnology Ignition Grant (BIG)',
    shortDescription: 'Up to ₹50 Lakhs 100% non-dilutive grant for high-impact innovations in agriculture biotechnology, medical diagnostics, food tech, and bio-industrial manufacturing.',
    ministry: 'Ministry of Science and Technology', department: 'Biotechnology Industry Research Assistance Council (BIRAC)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹50 Lakhs 100% Biotech/Agri Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SCIENTISTS', 'TECH_ENTREPRENEURS', 'STARTUPS', 'STUDENTS'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'TECHNOLOGY'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Graduation in Science, Agriculture, Medicine, or Engineering'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Government Research Grant',
      subsidyDetails: 'Up to ₹50 Lakhs disbursed in milestone-linked tranches for 18 months for proof-of-concept, lab testing, clinical trials, or field validation.',
      loanDetails: 'Zero debt / 100% grant with zero equity dilution.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_degree', name: 'Science / Engineering Degree Certificate', category: 'EDUCATION', mandatory: true, profileFieldMatch: 'personalInfo.experienceLevel', description: 'Educational certificate' },
      { id: 'doc_proposal', name: 'Scientific Research Proposal & Milestones', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Detailed experimental protocol and budget' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on BIRAC Portal', description: 'Apply during open calls on birac.nic.in/big.php.' },
      { step: 2, title: 'Technical Review by Scientific Panel', description: 'Evaluation by expert committee (BIG Partners: C-CAMP, IKP, FITT).' },
      { step: 3, title: 'Grant Agreement & Milestone Releases', description: 'Disbursement directly to designated project account.' }
    ],
    officialWebsite: 'https://birac.nic.in/big.php',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/birac-big',
    officialSource: 'BIRAC, Department of Biotechnology',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹50 Lakhs 100% non-repayable grant with zero equity stake taken', '18-month access to high-end wet lab facilities and scientific mentors', 'Dedicated intellectual property (IP) patent filing support']
  },

  // 5. BIRAC SPARSH (SOCIAL INNOVATION)
  {
    id: 'birac_sparsh_grant',
    name: 'BIRAC SPARSH (Social Innovation in Maternal & Healthcare Tech)',
    shortDescription: 'Up to ₹50 Lakhs grant funding and ₹50,000/month Social Innovation Fellowship for developing affordable rural health and waste management devices.',
    ministry: 'Ministry of Science and Technology', department: 'BIRAC',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹50 Lakhs Social Healthcare Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SOCIAL_ENTREPRENEURS', 'STARTUPS', 'WOMEN', 'STUDENTS'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'TECHNOLOGY'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Relevant degree or diploma'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Grant + Monthly Fellowship',
      subsidyDetails: '₹50,000 monthly fellowship for 18 months + up to ₹50 Lakhs project development grant for clinical pilot validation in rural settings.',
      loanDetails: 'Zero debt / 100% equity-free grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_proposal', name: 'Social Innovation Proposal & Clinical Need', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Description of rural healthcare problem solved' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on BIRAC SPARSH Portal', description: 'Apply on birac.nic.in/sparsh.php.' },
      { step: 2, title: 'Panel Defense before SPARSH Centre', description: 'Present solution before medical jury.' },
      { step: 3, title: 'Sanction and Deployment to Rural Hospitals', description: 'Direct grant disbursement.' }
    ],
    officialWebsite: 'https://birac.nic.in/sparsh.php',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/birac-sparsh',
    officialSource: 'BIRAC, Ministry of Science & Technology',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹50 Lakhs direct research and development grant', 'Monthly ₹50,000 fellowship stipend for lead innovator', 'Direct clinical pilot access across district civil hospitals']
  },

  // 6. DST NIDHI-PRAYAS
  {
    id: 'dst_nidhi_prayas',
    name: 'DST NIDHI-PRAYAS (Prototype Grant for Innovators)',
    shortDescription: 'Up to ₹10 Lakhs 100% non-repayable grant for building physical hardware prototypes, IoT devices, clean energy tech, and machinery.',
    ministry: 'Ministry of Science and Technology', department: 'Department of Science and Technology (DST)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹10 Lakhs 100% Prototyping Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['INNOVATORS', 'STUDENTS', 'RURAL_YOUTH', 'STARTUPS'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'TECHNOLOGY'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic technical or tinkering experience'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1000000, minimumFunding: 100000,
      subsidyPercentage: '100% Non-Dilutive Government Prototype Grant',
      subsidyDetails: 'Up to ₹10 Lakhs grant for fabricating physical prototypes, 3D printing, circuit assembly, raw materials, and testing.',
      loanDetails: 'Zero debt / 100% equity-free grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_proposal', name: 'Proof of Concept & Prototyping Budget', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Bill of materials and 12-month prototype plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select PRAYAS Centre (PC)', description: 'Apply via DST PRAYAS incubators (SINE IIT Bombay, Venture Center, etc.).' },
      { step: 2, title: 'Screening by PRAYAS Monitoring Committee', description: 'Present CAD models and technical feasibility.' },
      { step: 3, title: 'Makerspace Lab Access & Tranche Disbursement', description: 'Funds released directly to procure prototyping parts.' }
    ],
    officialWebsite: 'https://dst.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nidhi-prayas',
    officialSource: 'Department of Science & Technology (DST)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹10 Lakhs 100% equity-free grant to convert idea into physical product', 'Free access to state-of-the-art PRAYAS fabrication makerspaces', 'No company incorporation required at application stage']
  },

  // 7. DST NIDHI SEED SUPPORT SYSTEM (SSS)
  {
    id: 'dst_nidhi_seed',
    name: 'DST NIDHI Seed Support System (SSS)',
    shortDescription: 'Early-stage seed investment up to ₹1 Crore in the form of soft loan or equity for technology startups incubated at Technology Business Incubators (TBIs).',
    ministry: 'Ministry of Science and Technology', department: 'National Science & Technology Entrepreneurship Development Board (NSTEDB)',
    schemeType: 'GRANT', schemeCategoryLabel: 'Early Stage Seed Investment up to ₹1 Crore',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'TECH_ENTREPRENEURS', 'WOMEN'],
    businessSectors: ['TECHNOLOGY', 'MANUFACTURING', 'AGRI_PROCESSING', 'SERVICES'],
    businessTypes: ['PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 500000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Incubated at a DST-recognized TBI'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 10000000, minimumFunding: 500000,
      subsidyPercentage: 'Concessional Seed Funding up to ₹1 Crore',
      subsidyDetails: 'Early stage financing up to ₹1 Crore as soft loan with nominal interest or equity/quasi-equity via incubated TBI.',
      loanDetails: 'Soft loan at concessional rate (approx 4% - 6%) with flexible repayment.',
      marginMoneyDetails: 'Nil.', interestDetails: '4% - 6% soft interest if loan format.', repaymentDetails: '5 years with 2-year moratorium.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_coi', name: 'Certificate of Incorporation', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MCA incorporation certificate' },
      { id: 'doc_incubation', name: 'TBI Incubation Agreement', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Proof of incubation at DST recognized TBI' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply through Incubator TBI', description: 'Submit business plan to host TBI Seed Committee.' },
      { step: 2, title: 'Seed Support Management Committee (SSMC) Review', description: 'Present financial projections and commercialization model.' },
      { step: 3, title: 'Disbursement of Seed Capital', description: 'Funds deployed in tranches to corporate account.' }
    ],
    officialWebsite: 'https://dst.gov.in/scientific-programmes/st-and-socio-economic-development/national-science-technology-entrepreneurship-development-board-nstedb',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/nidhi-sss',
    officialSource: 'NSTEDB, Department of Science & Technology',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Patient capital up to ₹1 Crore for scaling product sales', 'Flexible debt or equity instrument terms', 'Backed by premier DST university incubators']
  },

  // 8. ATAL INNOVATION MISSION (AIC / EIC INCUBATORS)
  {
    id: 'aim_atal_incubation',
    name: 'Atal Innovation Mission - Atal Incubation Centres (AIC)',
    shortDescription: 'Free plug-and-play incubation, state-of-the-art testing labs, regulatory guidance, and seed funding support for grassroots and innovative ventures.',
    ministry: 'NITI Aayog', department: 'Atal Innovation Mission (AIM)',
    schemeType: 'INFRASTRUCTURE', schemeCategoryLabel: 'World-Class Incubation & Prototyping Labs',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'STUDENTS', 'RURAL_YOUTH', 'WOMEN', 'ALL'],
    businessSectors: ['TECHNOLOGY', 'AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 25000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 50000,
      subsidyPercentage: '100% Subsidized Incubation Labs + Seed Grants',
      subsidyDetails: 'Zero-cost plug & play co-working space; free access to ₹10 Crore rapid prototyping tools; micro-seed grants up to ₹25 Lakhs via AIC seed funds.',
      loanDetails: 'Zero debt / pure incubation support.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Innovative Venture Abstract', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Product and target market overview' }
    ],
    applicationProcess: [
      { step: 1, title: 'Find Nearest AIC Incubator', description: 'Explore 70+ Atal Incubation Centres on aim.gov.in.' },
      { step: 2, title: 'Submit Cohort Application', description: 'Apply for open incubation cohorts online.' },
      { step: 3, title: 'Onboarding & Lab Access', description: 'Receive desk space, lab access, and mentor assignment.' }
    ],
    officialWebsite: 'https://aim.gov.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/aim-aic',
    officialSource: 'NITI Aayog Atal Innovation Mission',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct access to over 70 world-class AIC incubation facilities across India', 'High-end machining, 3D printing, testing, and electronics labs provided free of cost', 'Direct mentorship from industry corporate partners']
  },

  // 9. VILLGRO SOCIAL ENTERPRISE INCUBATION
  {
    id: 'villgro_social_incubator',
    name: 'Villgro Innovations - Social Enterprise Grant & Incubation',
    shortDescription: 'Seed grants up to ₹25 Lakhs, intensive field piloting, and business mentoring for social enterprises solving challenges in climate, agriculture, and rural livelihoods.',
    ministry: 'Private / CSR Foundation', department: 'Villgro Innovations Foundation',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹25 Lakhs Social Enterprise Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SOCIAL_ENTREPRENEURS', 'WOMEN', 'RURAL_YOUTH', 'STARTUPS'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'MANUFACTURING', 'TECHNOLOGY'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Grant / Soft Seed Capital',
      subsidyDetails: '₹10L - ₹25L non-dilutive grant to deploy pilots with smallholder farmers, rural artisans, or healthcare clinics; high-touch portfolio management.',
      loanDetails: 'Zero debt / non-dilutive grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Social Impact Pitch & Pilot Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Impact metrics on rural income and deployment roadmap' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Pitch on Villgro Portal', description: 'Apply on villgro.org under open calls (I-Venture / Climate Action).' },
      { step: 2, title: 'Due Diligence & Field Assessment', description: 'Villgro investment managers evaluate impact and tech readiness.' },
      { step: 3, title: 'Grant Sanction & Pilot Execution', description: 'Milestone-based fund deployment.' }
    ],
    officialWebsite: 'https://villgro.org/',
    mySchemeUrl: 'https://villgro.org/programs/',
    officialSource: 'Villgro Innovations Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Non-dilutive seed funding up to ₹25 Lakhs with zero equity loss', 'Field deployment support with rural agricultural cooperatives', 'Hands-on mentoring by dedicated Entrepreneur-in-Residence']
  },

  // 10. DESHPANDE FOUNDATION SANDBOX STARTUPS
  {
    id: 'deshpande_sandbox',
    name: 'Deshpande Foundation - Sandbox Startups Incubation',
    shortDescription: 'Seed funding up to ₹15 Lakhs and dedicated incubation designed specifically for non-metro, Tier 2/3 city, and rural Bharat grassroots entrepreneurs.',
    ministry: 'Private / CSR Foundation', department: 'Deshpande Startups',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹15 Lakhs Bharat Sandbox Seed Fund',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'MICRO_ENTERPRISES', 'AGRI_PRENEURS'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'MANUFACTURING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 1500000, minimumFunding: 100000,
      subsidyPercentage: 'Grant / Soft Convertible Seed Funding',
      subsidyDetails: 'Up to ₹15 Lakhs early seed capital; free state-of-the-art co-working space in Hubballi and regional sandboxes; extensive rural supply-chain network.',
      loanDetails: 'Soft grant/equity with favorable entrepreneur terms.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable for prototype grants.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Venture Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Business model and local market opportunity' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on Deshpande Startups', description: 'Register on deshpandestartups.org.' },
      { step: 2, title: 'Sandbox Boot Camp', description: 'Attend 3-day practical business validation bootcamp.' },
      { step: 3, title: 'Incubation & Seed Fund Release', description: 'Direct seed capital disbursement.' }
    ],
    officialWebsite: 'https://deshpandestartups.org/',
    mySchemeUrl: 'https://deshpandestartups.org/programs/',
    officialSource: 'Deshpande Startups & Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Tailored specifically for grassroots entrepreneurs in Tier 2, Tier 3, and rural areas', 'Up to ₹15 Lakhs early seed funding and prototyping makerspace', 'Access to vast rural agricultural distribution channels']
  },

  // 11. TATA TRUSTS FISE SOCIAL INNOVATION
  {
    id: 'tata_social_innovation',
    name: 'Tata Trusts - Foundation for Innovation & Social Entrepreneurship (FISE)',
    shortDescription: 'Grants up to ₹25 Lakhs and engineering labs (Social Alpha) for developing deep-science solutions for water, sanitation, agriculture, and healthcare.',
    ministry: 'Private / CSR Foundation', department: 'Tata Trusts & Social Alpha',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹25 Lakhs Tata Social Innovation Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SOCIAL_ENTREPRENEURS', 'STARTUPS', 'SCIENTISTS', 'WOMEN'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES', 'TECHNOLOGY'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Relevant technical expertise'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 500000,
      subsidyPercentage: '100% Non-Dilutive Innovation Grant',
      subsidyDetails: 'Non-dilutive grant up to ₹25 Lakhs for product development, lab testing, and social impact pilots; incubation through Social Alpha architecture.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_proposal', name: 'Innovation Proposal & Social Impact Model', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Technical design and validation roadmap' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on Social Alpha Portal', description: 'Submit proposal on socialalpha.org under thematic challenges.' },
      { step: 2, title: 'Screening and Lab Feasibility Audit', description: 'Technical evaluation by engineering fellows.' },
      { step: 3, title: 'Grant Award & Deployment', description: 'Grant release linked with milestone achievement.' }
    ],
    officialWebsite: 'https://www.socialalpha.org/',
    mySchemeUrl: 'https://www.tatatrusts.org/',
    officialSource: 'Tata Trusts & Social Alpha',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹25 Lakhs non-dilutive grant backed by Tata Trusts philanthropic heritage', 'Full access to Social Alpha prototyping and testing infrastructure', 'Assistance with large-scale rural distribution partnerships']
  },

  // 12. RELIANCE WE-HUB ACCELERATOR
  {
    id: 'reliance_we_hub',
    name: 'Reliance Foundation & WE-Hub Women Entrepreneurship Accelerator',
    shortDescription: 'Dedicated seed grants up to ₹25 Lakhs, retail shelf placement in JioMart / Reliance Retail, and customized business acceleration for women founders.',
    ministry: 'Private / CSR Foundation', department: 'Reliance Foundation & WE-Hub',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹25L Grant + Retail Distribution',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES', 'TRADING', 'HANDICRAFTS'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Women-founded enterprise (>51% equity)'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 200000,
      subsidyPercentage: '100% Equity-Free Seed Grants + Market Access',
      subsidyDetails: 'Seed grants up to ₹25 Lakhs; guaranteed retail shelving opportunities on JioMart and regional Reliance Retail supermarkets; brand packaging design support.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration with woman majority ownership' },
      { id: 'doc_product', name: 'Product Catalogue & Samples', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Photos and pricing of products' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Online Application', description: 'Apply on wehub.telangana.gov.in or reliancefoundation.org.' },
      { step: 2, title: 'Product Evaluation & Sampling', description: 'Retail procurement team samples product quality.' },
      { step: 3, title: 'Grant Credit & Purchase Order', description: 'Disbursement of seed grant and issue of initial purchase order.' }
    ],
    officialWebsite: 'https://wehub.telangana.gov.in/',
    mySchemeUrl: 'https://www.reliancefoundation.org/',
    officialSource: 'Reliance Foundation & WE-Hub',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct retail shelf access across JioMart and Reliance Retail supermarket networks', 'Up to ₹25 Lakhs non-dilutive seed grant', 'Masterclasses in brand packaging, food safety compliance, and digital marketing']
  },

  // 13. HDFC PARIVARTAN SMARTUP GRANTS
  {
    id: 'hdfc_parivartan_grants',
    name: 'HDFC Bank Parivartan SmartUp Social Innovation Grants',
    shortDescription: 'Up to ₹50 Lakhs non-dilutive grant to grassroots startups and micro-enterprises developing impactful solutions in education, agriculture, and healthcare.',
    ministry: 'Private / CSR Foundation', department: 'HDFC Bank Parivartan CSR',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹50 Lakhs CSR Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['SOCIAL_ENTREPRENEURS', 'STARTUPS', 'MICRO_ENTERPRISES', 'WOMEN'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'TECHNOLOGY', 'MANUFACTURING'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Registered enterprise or social venture'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 1000000,
      subsidyPercentage: '100% Non-Dilutive CSR Grant up to ₹50 Lakhs',
      subsidyDetails: 'Annual Parivartan SmartUp grant provides ₹15L - ₹50L non-dilutive grant to startups solving rural Bharat challenges in partnership with premier incubators.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam / Startup Registration', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'Enterprise proof' },
      { id: 'doc_pitch', name: 'Social Impact Proposal', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Detailed budget and measurable social metric goals' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on HDFC SmartUp Portal', description: 'Apply on hdfcbank.com/smartup.' },
      { step: 2, title: 'Jury Evaluation with IIT / IIM Incubators', description: 'Present pitch to eminent screening panel.' },
      { step: 3, title: 'Direct CSR Grant Disbursement', description: 'Grant transferred in milestone tranches.' }
    ],
    officialWebsite: 'https://www.hdfcbank.com/sme/smartup',
    mySchemeUrl: 'https://www.hdfcbank.com/csr',
    officialSource: 'HDFC Bank Parivartan & SmartUp',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Non-dilutive grant up to ₹50 Lakhs per enterprise', 'Zero equity dilution and zero loan repayment burden', 'Special banking privileges including free zero-balance current account']
  },

  // 14. ICICI FOUNDATION RURAL LIVELIHOODS
  {
    id: 'icici_rural_livelihood',
    name: 'ICICI Foundation Rural Livelihoods & Enterprise Grant',
    shortDescription: 'Free practical skills training, toolkits, and micro-grant assistance for establishing rural micro-enterprises in tailoring, food processing, and electrical services.',
    ministry: 'Private / CSR Foundation', department: 'ICICI Academy for Skills & Rural Livelihoods',
    schemeType: 'TRAINING', schemeCategoryLabel: '100% Free Training & Toolkit Support',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'DIFF_ABLED', 'ARTISANS'],
    businessSectors: ['SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING', 'HANDICRAFTS'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 40, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 15000, maxProjectCost: 500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic literacy (8th pass preferred)'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 200000, minimumFunding: 20000,
      subsidyPercentage: '100% Free Training, Toolkits, & Market Linkages',
      subsidyDetails: 'ICICI Foundation covers 100% training, uniform, toolkits, and provides working capital credit linkage via ICICI Bank priority lending.',
      loanDetails: 'Priority micro-credit up to ₹2 Lakhs with zero processing fee.',
      marginMoneyDetails: 'Nil.', interestDetails: 'Subsidized priority rate on credit.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_residence', name: 'Village / Rural Residence Proof', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.ruralUrban', description: 'Proof of rural residence' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register at ICICI Rural Skill Centre', description: 'Apply on icicifoundation.org or visit local center.' },
      { step: 2, title: 'Complete Practical 12-Week Vocational Course', description: 'Hands-on practical training with master craftsmen.' },
      { step: 3, title: 'Toolkit Distribution & Enterprise Setup', description: 'Receive commercial toolkit and micro-credit linkage.' }
    ],
    officialWebsite: 'https://icicifoundation.org/',
    mySchemeUrl: 'https://icicifoundation.org/rural-livelihood/',
    officialSource: 'ICICI Foundation for Inclusive Growth',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% free professional vocational training with complete practical toolkits', 'Direct micro-credit tie-ups with ICICI Bank rural branches', 'Free mentorship for 12 months after starting enterprise']
  },

  // 15. INFOSYS FOUNDATION AAROHAN AWARDS
  {
    id: 'infosys_aarohan_grants',
    name: 'Infosys Foundation Aarohan Social Innovation Awards',
    shortDescription: 'Cash awards and scale-up grants up to ₹50 Lakhs for grassroots innovators who have developed practical solutions for rural and underprivileged communities.',
    ministry: 'Private / CSR Foundation', department: 'Infosys Foundation',
    schemeType: 'GRANT', schemeCategoryLabel: 'Cash Awards & Grants up to ₹50 Lakhs',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['INNOVATORS', 'RURAL_YOUTH', 'WOMEN', 'SOCIAL_ENTREPRENEURS'],
    businessSectors: ['AGRI_PROCESSING', 'SERVICES', 'MANUFACTURING', 'TECHNOLOGY'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'SHG'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Functional innovation / prototype developed'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 500000,
      subsidyPercentage: '100% Cash Award & Non-Dilutive Scale-Up Grant',
      subsidyDetails: 'Cash prize of ₹20 Lakhs to ₹50 Lakhs directly awarded to winners across Healthcare, Education, and Rural Development; incubation support at IIT Hyderabad.',
      loanDetails: 'Zero debt / 100% non-taxable cash award.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_prototype', name: 'Working Prototype Demonstration Video / Photos', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Visual proof of functional solution' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Online Entry', description: 'Apply on infosys.com/aarohan.' },
      { step: 2, title: 'Field Validation by Evaluation Committee', description: 'Jury visits site to verify working prototype.' },
      { step: 3, title: 'Award Ceremony & Grant Disbursement', description: 'Direct cash award credited to bank account.' }
    ],
    officialWebsite: 'https://www.infosys.com/infosys-foundation/aarohan-social-innovation-awards.html',
    mySchemeUrl: 'https://www.infosys.com/infosys-foundation.html',
    officialSource: 'Infosys Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct cash awards up to ₹50 Lakhs with zero strings attached', 'Access to IIT Hyderabad incubation and technical mentoring', 'National recognition and press visibility']
  },

  // 16. CISCO & NASSCOM THINGQBATOR
  {
    id: 'cisco_thingqbator',
    name: 'Cisco & NASSCOM Foundation ThingQbator Innovation Fund',
    shortDescription: 'Up to ₹5 Lakhs micro-grant and hands-on makerspace access for student and youth entrepreneurs developing IoT, AI, and smart hardware prototypes.',
    ministry: 'Private / CSR Foundation', department: 'Cisco CSR & NASSCOM Foundation',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹5 Lakhs Hardware Innovation Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STUDENTS', 'RURAL_YOUTH', 'TECH_ENTREPRENEURS'],
    businessSectors: ['TECHNOLOGY', 'MANUFACTURING', 'AGRI_PROCESSING'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD'],
    businessStages: ['IDEA', 'PLANNING'],
    eligibilityRules: {
      minAge: 18, maxAge: 35, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 1000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Enrolled student or recent graduate'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 500000, minimumFunding: 50000,
      subsidyPercentage: '100% Non-Dilutive Prototyping Grant',
      subsidyDetails: '₹1 Lakh to ₹5 Lakhs prototyping grant; free access to Cisco ThingQbator IoT labs equipped with sensors, 3D printers, and developer boards.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Project Abstract & Bill of Materials', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Hardware design and component plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on ThingQbator Platform', description: 'Register on thingqbator.nasscomfoundation.org.' },
      { step: 2, title: 'Virtual Hackathon & Pitch', description: 'Present proof of concept to Cisco engineers.' },
      { step: 3, title: 'Grant Award & Makerspace Fabrication', description: 'Disbursement of parts budget and mentor support.' }
    ],
    officialWebsite: 'https://thingqbator.nasscomfoundation.org/',
    mySchemeUrl: 'https://nasscomfoundation.org/',
    officialSource: 'Cisco Systems & NASSCOM Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['₹5 Lakhs 100% equity-free prototyping grant', 'Mentorship directly from senior Cisco Systems network engineers', 'Free access to state-of-the-art IoT hardware testbeds']
  },

  // 17. MARICO SCALE-UP INNOVATION
  {
    id: 'marico_scaleup_grant',
    name: 'Marico Innovation Foundation - Scale-Up Challenge',
    shortDescription: 'Zero-equity mentoring and financial acceleration grants up to ₹25 Lakhs for innovative ventures operating in plastics circularity and agritech.',
    ministry: 'Private / CSR Foundation', department: 'Marico Innovation Foundation',
    schemeType: 'GRANT', schemeCategoryLabel: 'Zero-Equity Scale-Up Acceleration Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['AGRI_PRENEURS', 'STARTUPS', 'MANUFACTURERS', 'WOMEN'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: false, educationRequired: 'Operating enterprise with active commercial product'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 500000,
      subsidyPercentage: 'Zero-Equity Financial Grants & Executive Mentoring',
      subsidyDetails: 'MIF deploys top CXO mentors and scale-up grants up to ₹25 Lakhs to resolve distribution, unit economics, and operational bottlenecks.',
      loanDetails: 'Zero debt / pure acceleration grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_udyam', name: 'Udyam Certificate', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.registrationStatus', description: 'MSME registration certificate' },
      { id: 'doc_financials', name: 'Audited Financial Statements (Last FY)', category: 'FINANCIAL', mandatory: true, profileFieldMatch: 'financialProfile.estimatedProjectCost', description: 'Proof of commercial revenue' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on MIF Scale-Up Portal', description: 'Submit company profile on maricoinnovationfoundation.org.' },
      { step: 2, title: 'Executive Diagnostic Review', description: 'MIF team analyzes supply chain and market bottlenecks.' },
      { step: 3, title: 'Deployment of CXO Mentors & Grants', description: '12-month intensive scaling intervention.' }
    ],
    officialWebsite: 'https://maricoinnovationfoundation.org/',
    mySchemeUrl: 'https://maricoinnovationfoundation.org/scale-up-program/',
    officialSource: 'Marico Innovation Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Zero-equity involvement - founders retain 100% of their company', 'Direct mentoring by industry CXOs and supply chain veterans', 'Substantial acceleration grants to eliminate operational bottlenecks']
  },

  // 18. IIM BANGALORE NSRCEL WOMEN STARTUP PROGRAM
  {
    id: 'iimb_nsrcel_wsp',
    name: 'IIM Bangalore NSRCEL Women Startup Program (WSP)',
    shortDescription: 'Comprehensive incubation, masterclasses from IIM faculty, and prototype seed grants up to ₹25 Lakhs for women entrepreneurs across India.',
    ministry: 'Apex Academic / Incubation', department: 'NSRCEL, IIM Bangalore',
    schemeType: 'GRANT', schemeCategoryLabel: 'IIM Incubation & up to ₹25 Lakhs Seed Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN'],
    businessSectors: ['SERVICES', 'AGRI_PROCESSING', 'MANUFACTURING', 'TECHNOLOGY', 'HANDICRAFTS'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['FEMALE'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 200000,
      subsidyPercentage: '100% Non-Dilutive Government & CSR Seed Grants',
      subsidyDetails: 'Seed funding up to ₹25 Lakhs; fully funded 6-month entrepreneurship curriculum delivered by IIM Bangalore professors and industry leaders.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card (Woman Entrepreneur)', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Enterprise Idea / Business Model', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Description of product and vision' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Application on NSRCEL Portal', description: 'Apply on nsrcel.org/women-startup-program.' },
      { step: 2, title: 'MOOC Online Certification', description: 'Complete 5-week foundational digital course.' },
      { step: 3, title: 'IIM Incubation & Seed Grant Award', description: 'Pitch to jury and receive seed funding.' }
    ],
    officialWebsite: 'https://www.nsrcel.org/women-startup-program/',
    mySchemeUrl: 'https://www.nsrcel.org/',
    officialSource: 'NSRCEL, Indian Institute of Management Bangalore',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Prestige and credential of incubation at IIM Bangalore', 'Up to ₹25 Lakhs non-dilutive seed grant funding', 'Lifelong membership in India’s largest alumni network of women founders']
  },

  // 19. IIM AHMEDABAD CIIE BHARAT INCLUSION
  {
    id: 'iima_ciie_seed',
    name: 'IIM Ahmedabad CIIE.CO Bharat Inclusion Seed Fund',
    shortDescription: 'Seed investment up to ₹50 Lakhs for ventures developing solutions tailored for lower-income and rural populations in savings, credit, agritech, and livelihoods.',
    ministry: 'Apex Academic / Incubation', department: 'CIIE.CO, IIM Ahmedabad',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹50 Lakhs Bharat Inclusion Seed Fund',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TECH_ENTREPRENEURS', 'STARTUPS', 'SOCIAL_ENTREPRENEURS'],
    businessSectors: ['SERVICES', 'TECHNOLOGY', 'AGRI_PROCESSING'],
    businessTypes: ['PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 200000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic technical or business experience'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 5000000, minimumFunding: 1000000,
      subsidyPercentage: 'Early Stage Seed Grants & Catalytic Capital',
      subsidyDetails: 'Grants and catalytic seed investments up to ₹50 Lakhs; incubation support through IIMA CIIE.CO experts in financial inclusion and rural distribution.',
      loanDetails: 'Convertible grant or patient capital.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable for prototype grants.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Inclusion Venture Pitch Deck', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Product overview and target Bharat customer metrics' }
    ],
    applicationProcess: [
      { step: 1, title: 'Apply on CIIE.CO Bharat Inclusion Portal', description: 'Submit pitch on ciie.co.' },
      { step: 2, title: 'Screening and Partner Interview', description: 'Meet with investment partners.' },
      { step: 3, title: 'Investment Committee Sanction', description: 'Deployment of catalytic seed capital.' }
    ],
    officialWebsite: 'https://ciie.co/',
    mySchemeUrl: 'https://ciie.co/bharat-inclusion-seed-fund/',
    officialSource: 'CIIE.CO, IIM Ahmedabad',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Backed by IIM Ahmedabad, Gates Foundation, and Michael & Susan Dell Foundation', 'Up to ₹50 Lakhs catalytic seed funding', 'Access to vast financial inclusion testbeds across Bharat']
  },

  // 20. IIT MADRAS RURAL TECH INCUBATOR
  {
    id: 'iitm_rural_tech',
    name: 'IIT Madras Rural Technology & Business Incubator (RTBI)',
    shortDescription: 'Technical validation, precision engineering laboratory access, and seed grants up to ₹25 Lakhs for rural hardware, solar machinery, and agritech.',
    ministry: 'Apex Academic / Incubation', department: 'IIT Madras Incubation Cell (IITMIC)',
    schemeType: 'GRANT', schemeCategoryLabel: 'IITM Lab Support & up to ₹25L Seed Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['INNOVATORS', 'RURAL_YOUTH', 'STARTUPS', 'ENGINEERS'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'SERVICES', 'TECHNOLOGY'],
    businessTypes: ['PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic technical qualification'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 300000,
      subsidyPercentage: '100% Non-Dilutive Prototyping Grants & Seed Support',
      subsidyDetails: 'Grants up to ₹25 Lakhs via IITMIC seed funds; access to world-class testing and fabrication facilities at IIT Madras Research Park.',
      loanDetails: 'Zero debt / equity-free grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_proposal', name: 'Engineering Architecture & Rural Feasibility', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Hardware schematic and validation plan' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on IITMIC Portal', description: 'Apply on incubation.iitm.ac.in.' },
      { step: 2, title: 'Technical Evaluation by IIT Madras Professors', description: 'Evaluation of scientific feasibility.' },
      { step: 3, title: 'Incubation at Research Park & Grant Release', description: 'Receive lab access and seed funding.' }
    ],
    officialWebsite: 'https://incubation.iitm.ac.in/',
    mySchemeUrl: 'https://rtbi.in/',
    officialSource: 'IIT Madras Incubation Cell',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct mentorship from world-renowned IIT Madras engineering faculty', 'Full access to IIT Madras Research Park rapid testing laboratories', 'Up to ₹25 Lakhs seed grant funding']
  },

  // 21. AWS ACTIVATE STARTUP GRANTS
  {
    id: 'aws_startup_credits',
    name: 'AWS Activate India Startup & Cloud Acceleration Program',
    shortDescription: 'Up to $10,000 (₹8.3 Lakhs) in free AWS cloud promotional credits, architecture reviews, and business training for digital and tech-enabled micro-ventures.',
    ministry: 'Private / Technology Cloud Partner', department: 'Amazon Web Services (AWS) India',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to $10,000 (₹8.3L) Cloud Server Grant',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TECH_ENTREPRENEURS', 'STARTUPS', 'SERVICES', 'STUDENTS'],
    businessSectors: ['TECHNOLOGY', 'SERVICES', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 20000, maxProjectCost: 5000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic digital literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 830000, minimumFunding: 80000,
      subsidyPercentage: '100% Free Cloud Computing Promotional Credits',
      subsidyDetails: '$1,000 to $10,000 in free AWS credits covering hosting, database, AI/ML APIs, and server infrastructure for 1 to 2 years; 1-on-1 technical advisory sessions.',
      loanDetails: 'Zero debt / 100% free credits.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_website', name: 'Working Website URL / Product Link', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Active website or application demo' }
    ],
    applicationProcess: [
      { step: 1, title: 'Create AWS Account', description: 'Sign up on aws.amazon.com.' },
      { step: 2, title: 'Apply on AWS Activate Portal', description: 'Submit startup details on aws.amazon.com/activate.' },
      { step: 3, title: 'Instant Cloud Credit Approval', description: 'Credits deposited to AWS billing console within 7 days.' }
    ],
    officialWebsite: 'https://aws.amazon.com/activate/',
    mySchemeUrl: 'https://aws.amazon.com/activate/founders/',
    officialSource: 'Amazon Web Services Activate',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to $10,000 (₹8.3 Lakhs) in free cloud hosting, AI tools, and servers', 'Reduces software hosting expenses to zero for first 2 years', 'Free access to certified AWS cloud solution architects']
  },

  // 22. GOOGLE FOR STARTUPS INDIA
  {
    id: 'google_startups_india',
    name: 'Google for Startups Cloud & AI Scale Program',
    shortDescription: 'Up to $100,000 in Google Cloud & Firebase credits (up to ₹83 Lakhs equivalent) along with Google AI mentorship for Indian tech and micro-software ventures.',
    ministry: 'Private / Technology Cloud Partner', department: 'Google for Startups India',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to $100,000 Google Cloud & AI Credits',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['TECH_ENTREPRENEURS', 'STARTUPS', 'STUDENTS', 'WOMEN'],
    businessSectors: ['TECHNOLOGY', 'SERVICES'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic software development capability'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 8300000, minimumFunding: 160000,
      subsidyPercentage: '100% Free Google Cloud & Gemini AI Credits',
      subsidyDetails: 'First year up to $100,000 in Google Cloud and Firebase credits; free Gemini API tokens; 1-on-1 technical office hours with Google engineers.',
      loanDetails: 'Zero debt / 100% free credits.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_app', name: 'App / Website Link', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Functional web or mobile app prototype' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Google for Startups', description: 'Apply on startup.google.com.' },
      { step: 2, title: 'Submit Tech Architecture', description: 'Briefly explain Google Cloud/AI usage.' },
      { step: 3, title: 'Credit Activation', description: 'Credits activated directly on Google Cloud billing.' }
    ],
    officialWebsite: 'https://startup.google.com/',
    mySchemeUrl: 'https://cloud.google.com/startup',
    officialSource: 'Google for Startups',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to $100,000 in Google Cloud, Firebase, and Gemini AI tokens', '1-on-1 technical office hours with Google engineers', 'Free listing and growth workshops via Google Play Academy']
  },

  // 23. TIE INDIA ANGEL & SEED MENTORSHIP
  {
    id: 'tie_india_angel_seed',
    name: 'TiE (The Indus Entrepreneurs) India Seed & Angel Mentorship',
    shortDescription: 'Dedicated pitch platforms, seed angel grants up to ₹25 Lakhs, and 1-on-1 mentoring by seasoned entrepreneurs across 26 TiE chapters in India.',
    ministry: 'Private / Non-Profit Global Entrepreneur Network', department: 'TiE India',
    schemeType: 'GRANT', schemeCategoryLabel: 'Angel Pitching & up to ₹25 Lakhs Seed Capital',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['STARTUPS', 'WOMEN', 'RURAL_YOUTH', 'MICRO_ENTERPRISES'],
    businessSectors: ['SERVICES', 'MANUFACTURING', 'AGRI_PROCESSING', 'TECHNOLOGY', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 10000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 100000,
      subsidyPercentage: 'Seed Angel Funding & Pro Bono Mentorship',
      subsidyDetails: 'Access to TiE Angel network investing ₹10L - ₹25L seed capital; free weekly mentoring sessions with successful founders and enterprise CEOs.',
      loanDetails: 'Angel equity or soft convertible seed.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable for competition grants.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Executive Summary Pitch', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Overview of enterprise' }
    ],
    applicationProcess: [
      { step: 1, title: 'Connect with Local TiE Chapter', description: 'Register on tie.org (Delhi, Mumbai, Bengaluru, Hyderabad, Hubli, etc.).' },
      { step: 2, title: 'Attend Pitch Fest / TiE SmashUp', description: 'Present elevator pitch before angel jury.' },
      { step: 3, title: 'Term Sheet & Mentorship Allotment', description: 'Receive seed funding and assigned mentor.' }
    ],
    officialWebsite: 'https://tie.org/',
    mySchemeUrl: 'https://tie.org/about-tie/',
    officialSource: 'The Indus Entrepreneurs (TiE) Global',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct personal mentorship from veteran founders and corporate leaders', 'Access to angel investors across 26 chapters in India', 'Special TiE Women global pitch competition with cash prizes']
  },

  // 24. SELCO FOUNDATION SUSTAINABLE ENERGY LIVELIHOODS
  {
    id: 'selco_energy_livelihoods',
    name: 'SELCO Foundation - Sustainable Energy-Driven Rural Enterprise Grant',
    shortDescription: 'Up to 50% capital grant for installing solar-powered sewing machines, solar flour mills, solar cold storages, and pottery wheels for rural micro-units.',
    ministry: 'Private / CSR Foundation', department: 'SELCO Foundation Rural Energy Lab',
    schemeType: 'SUBSIDY', schemeCategoryLabel: 'Up to 50% Solar Machinery Subsidy',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['RURAL_YOUTH', 'WOMEN', 'ARTISANS', 'FARMERS', 'MICRO_ENTERPRISES'],
    businessSectors: ['MANUFACTURING', 'AGRI_PROCESSING', 'SERVICES', 'HANDICRAFTS'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'SHG', 'COOPERATIVE'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 30000, maxProjectCost: 1500000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic craft or trade literacy'
    },
    financialBenefits: {
      fundingType: 'SUBSIDY', maximumFunding: 750000, minimumFunding: 25000,
      subsidyPercentage: '40% to 50% Direct Capital Equipment Subsidy',
      subsidyDetails: 'SELCO Foundation provides up to 50% capital grant on solar-powered productive appliances; remaining 50% facilitated via local Grameen / regional rural bank micro-loan.',
      loanDetails: 'Bank micro-loan at affordable priority interest rate.',
      marginMoneyDetails: '10% beneficiary contribution.', interestDetails: 'Concessional priority lending rate.', repaymentDetails: '3 to 5 years.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_rural', name: 'Proof of Rural Residence / Trade Practice', category: 'LOCATION', mandatory: true, profileFieldMatch: 'personalInfo.ruralUrban', description: 'Village residence verification' }
    ],
    applicationProcess: [
      { step: 1, title: 'Select Solar Productive Appliance', description: 'Choose equipment on selcofoundation.org (solar loom, solar chiller, solar dryer).' },
      { step: 2, title: 'Energy Audit by SELCO Field Engineer', description: 'Assessment of solar irradiance and machine capacity.' },
      { step: 3, title: 'Machinery Installation & Subsidy Credit', description: 'Equipment installed with 50% direct subsidy adjustment.' }
    ],
    officialWebsite: 'https://selcofoundation.org/',
    mySchemeUrl: 'https://selcofoundation.org/programmes/',
    officialSource: 'SELCO Foundation',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to 50% direct capital subsidy on solar equipment (sewing, milling, chilling)', 'Eliminates reliance on erratic rural electricity grids', 'Boosts rural artisan daily earnings by 40% to 70%']
  },

  // 25. MINISTRY OF AGRICULTURE AGRITECH GRAND CHALLENGE
  {
    id: 'agri_grand_challenge',
    name: 'Ministry of Agriculture - Agritech Innovation Grand Challenge',
    shortDescription: 'Up to ₹25 Lakhs cash prizes and government procurement pilot contracts for innovations in post-harvest processing, cold storage, and farm machinery.',
    ministry: 'Ministry of Agriculture and Farmers Welfare', department: 'DA&FW & Startup India',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹25 Lakhs Prize & Pilot Contract',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['AGRI_PRENEURS', 'STARTUPS', 'STUDENTS', 'FARMERS'],
    businessSectors: ['AGRI_PROCESSING', 'MANUFACTURING', 'SERVICES'],
    businessTypes: ['INDIVIDUAL', 'PROPRIETORSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 50000, maxProjectCost: 3000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'No formal requirement'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2500000, minimumFunding: 500000,
      subsidyPercentage: '100% Equity-Free Cash Prize & Field Pilot Contract',
      subsidyDetails: 'Top 3 winners receive ₹25L, ₹15L, and ₹10L cash grants with direct pilot deployment contracts with State Agriculture Departments and KVKs.',
      loanDetails: 'Zero debt / 100% grant.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_pitch', name: 'Agritech Innovation Blueprint', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Design specs and pilot test results' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal on Startup India Challenge Hub', description: 'Apply on startupindia.gov.in.' },
      { step: 2, title: 'Field Trial Demonstration', description: 'Demonstrate machinery at Indian Agricultural Research Institute (IARI).' },
      { step: 3, title: 'Award Credit & Pilot Work Order', description: 'Direct cash grant and official pilot contract.' }
    ],
    officialWebsite: 'https://agricoop.nic.in/',
    mySchemeUrl: 'https://www.startupindia.gov.in/',
    officialSource: 'Department of Agriculture and Farmers Welfare (DA&FW)',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹25 Lakhs equity-free cash prize for winning innovations', 'Direct pilot deployment order across Krishi Vigyan Kendras (KVKs)', 'National recognition by Union Minister of Agriculture']
  },

  // 26. AGNII COMMERCIALIZATION ASSISTANCE
  {
    id: 'agnii_commercialization',
    name: 'AGNIi (Accelerating Growth of New India’s Innovations)',
    shortDescription: 'Free technology commercialization, patent protection, and enterprise market matching support executed under the Principal Scientific Adviser to GoI.',
    ministry: 'Prime Minister’s Science, Technology and Innovation Advisory Council', department: 'Office of the Principal Scientific Adviser to GoI & Invest India',
    schemeType: 'TRAINING', schemeCategoryLabel: 'National Tech Transfer & Market Linkage',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['INNOVATORS', 'STARTUPS', 'MANUFACTURERS', 'SCIENTISTS'],
    businessSectors: ['MANUFACTURING', 'TECHNOLOGY', 'AGRI_PROCESSING', 'SERVICES'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['PLANNING', 'OPERATING', 'GROWING'],
    eligibilityRules: {
      minAge: 18, maxAge: 70, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['ALL'],
      minProjectCost: 100000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Patented or innovative product'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 2000000, minimumFunding: 100000,
      subsidyPercentage: '100% Free Corporate Linkage & Technology Transfer Support',
      subsidyDetails: 'AGNIi team connects indigenous innovators with Fortune 500 companies, central PSUs, and defense organizations for multimillion rupee procurement contracts.',
      loanDetails: 'Zero debt / market expansion support.',
      marginMoneyDetails: 'Nil.', interestDetails: '0% interest.', repaymentDetails: 'Non-repayable.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_ip', name: 'Patent Application / Technical Specification', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Proof of intellectual property or innovation' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Innovation Profile on AGNIi Portal', description: 'Register on agnii.gov.in.' },
      { step: 2, title: 'Institutional Technical Assessment', description: 'Invest India engineers assess commercial viability.' },
      { step: 3, title: 'Facilitated Buyer Pitching', description: 'Direct meetings with PSU and corporate buyers.' }
    ],
    officialWebsite: 'https://www.agnii.gov.in/',
    mySchemeUrl: 'https://www.investindia.gov.in/agnii',
    officialSource: 'Office of the Principal Scientific Adviser & Invest India',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Direct institutional showcase to Central PSUs, defense forces, and state ministries', 'Zero agency fees or commission on resulting corporate deals', 'Assistance with enterprise pricing and IP safeguarding']
  },

  // 27. STAND-UP MITRA HANDHOLDING AGENCY NETWORK
  {
    id: 'standup_mitra_handhold',
    name: 'Stand-Up Mitra Handholding & DPR Preparation Assistance',
    shortDescription: 'Free project report preparation, machinery vendor identification, and bank loan handholding for SC/ST and Women entrepreneurs.',
    ministry: 'Ministry of Finance', department: 'SIDBI Stand-Up India Mission',
    schemeType: 'TRAINING', schemeCategoryLabel: 'Free Handholding & DPR Assistance',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['WOMEN', 'SC', 'ST'],
    businessSectors: ['MANUFACTURING', 'SERVICES', 'AGRI_PROCESSING', 'TRADING'],
    businessTypes: ['PROPRIETORSHIP', 'PARTNERSHIP', 'PVT_LTD', 'LLP'],
    businessStages: ['IDEA', 'PLANNING', 'FUNDING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['SC', 'ST', 'WOMEN'], ruralUrban: ['ALL'],
      minProjectCost: 1000000, maxProjectCost: 10000000, existingBusinessAllowed: false, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 10000000, minimumFunding: 1000000,
      subsidyPercentage: '100% Free Handholding + Loans up to ₹1 Crore',
      subsidyDetails: 'SIDBI-certified Handholding Agencies (HHAs) prepare Detailed Project Reports and credit proposals free of cost for SC/ST and women founders.',
      loanDetails: 'Bank financing between ₹10 Lakhs and ₹1 Crore at lowest applicable interest rate.',
      marginMoneyDetails: '15% own contribution (can be converged with state subsidy).', interestDetails: 'Lowest applicable priority bank rate.', repaymentDetails: '7 years with 18-month moratorium.', collateralRequirement: 'Credit Guarantee Scheme for Stand-Up India (CGSSI).'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_caste', name: 'SC/ST Certificate (if claiming caste category)', category: 'ELIGIBILITY', mandatory: false, profileFieldMatch: 'eligibilityProfile.category', description: 'Category proof' }
    ],
    applicationProcess: [
      { step: 1, title: 'Register on Stand-Up Mitra Portal', description: 'Apply on standupmitra.in under Handholding Support.' },
      { step: 2, title: 'Select Local Handholding Agency (HHA)', description: 'Choose nearest empaneled agency to formulate DPR.' },
      { step: 3, title: 'Bank Branch Allocation & Sanction', description: 'Forwarded directly to designated bank manager for sanction.' }
    ],
    officialWebsite: 'https://www.standupmitra.in/',
    mySchemeUrl: 'https://www.myscheme.gov.in/schemes/suis',
    officialSource: 'SIDBI Stand-Up India Portal',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['100% free professional Detailed Project Report (DPR) preparation', 'Assistance with machinery vendor price quotes and factory layouts', 'Guaranteed interview with designated bank loan manager']
  },

  // 28. NABARD CATALYTIC CAPITAL FUND
  {
    id: 'nabard_catalytic_seed',
    name: 'NABARD Catalytic Capital Fund for Rural Startups',
    shortDescription: 'Patient early-stage catalytic funding up to ₹1 Crore for agri-tech, rural craft clusters, cold chains, and farmer collectives.',
    ministry: 'Ministry of Agriculture and Farmers Welfare & Ministry of Finance', department: 'NABARD Innovations Department',
    schemeType: 'GRANT', schemeCategoryLabel: 'Up to ₹1 Crore Catalytic Rural Seed Capital',
    applicableStates: ['ALL'], applicableDistricts: ['ALL'],
    targetBeneficiaries: ['AGRI_PRENEURS', 'RURAL_YOUTH', 'WOMEN', 'FPO', 'STARTUPS'],
    businessSectors: ['AGRI_PROCESSING', 'DAIRY_LIVESTOCK', 'HANDICRAFTS', 'SERVICES'],
    businessTypes: ['PVT_LTD', 'LLP', 'PROPRIETORSHIP', 'FPO'],
    businessStages: ['IDEA', 'PLANNING', 'OPERATING'],
    eligibilityRules: {
      minAge: 18, maxAge: 65, genderAllowed: ['ALL'], categoriesAllowed: ['ALL'], ruralUrban: ['RURAL', 'SEMI_URBAN'],
      minProjectCost: 200000, maxProjectCost: 20000000, existingBusinessAllowed: true, newBusinessAllowed: true, educationRequired: 'Basic commercial literacy'
    },
    financialBenefits: {
      fundingType: 'GRANT', maximumFunding: 10000000, minimumFunding: 500000,
      subsidyPercentage: 'Patient Catalytic Capital up to ₹1 Crore',
      subsidyDetails: 'NABARD provides patient seed capital and matching grants to de-risk rural enterprises before they become commercially bankable.',
      loanDetails: 'Patient capital with flexible revenue-share or soft debt terms.',
      marginMoneyDetails: 'Nil.', interestDetails: 'Concessional soft interest.', repaymentDetails: '5 to 7 years with 2-year repayment holiday.', collateralRequirement: 'Zero collateral.'
    },
    requiredDocuments: [
      { id: 'doc_aadhaar', name: 'Aadhaar Card', category: 'IDENTITY', mandatory: true, profileFieldMatch: 'personalInfo.fullName', description: 'Applicant identity' },
      { id: 'doc_dpr', name: 'Rural Enterprise Transformation Plan', category: 'BUSINESS', mandatory: true, profileFieldMatch: 'business.name', description: 'Detailed budget and farmer/artisan impact metrics' }
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Proposal to NABARD DDM / State Office', description: 'Apply on nabard.org or via NABARD incubators (a-IDEA, NABVENTURES).' },
      { step: 2, title: 'Project Screening Committee Evaluation', description: 'Review of rural community impact.' },
      { step: 3, title: 'Tranche Disbursement', description: 'Direct catalytic funding credit.' }
    ],
    officialWebsite: 'https://www.nabard.org/',
    mySchemeUrl: 'https://www.nabard.org/content1.aspx?id=516',
    officialSource: 'NABARD Innovations Department',
    lastVerified: '2026-02-28', status: 'ACTIVE',
    keyHighlights: ['Up to ₹1 Crore patient early-stage catalytic capital', '2-year repayment holiday during enterprise ramp-up', 'Backed by NABARD’s extensive grassroots agricultural network']
  }
];
