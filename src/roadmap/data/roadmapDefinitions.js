/**
 * Comprehensive Roadmap Stage & Task Definitions for UdyamSaathi / Business Compass
 * Deterministic metadata powering dependencies, unlocks, documents, schemes, and AI explanations.
 */

export const ROADMAP_STAGES = [
  {
    id: 'IDEA',
    number: 1,
    title: 'Business Idea Validation',
    shortName: 'Idea',
    tagline: 'Validate Problem & Customer Need',
    objective: 'Prove that your business idea solves a genuine, paying customer need before committing capital.',
    readinessKey: 'ideaValidation',
    readinessLabel: 'Idea Validation'
  },
  {
    id: 'FEASIBILITY',
    number: 2,
    title: 'Business Feasibility & Model',
    shortName: 'Planning',
    tagline: 'Cost Sizing, Suppliers & Economics',
    objective: 'Evaluate equipment costs, premises, supply channels, and unit profitability.',
    readinessKey: 'businessPlanning',
    readinessLabel: 'Business Planning'
  },
  {
    id: 'SUPPORT',
    number: 3,
    title: 'Government Support & Schemes',
    shortName: 'Govt Support',
    tagline: 'Subsidy Matching & Scheme Selection',
    objective: 'Identify high-fit Central and State government schemes to minimize initial financial risk.',
    readinessKey: 'governmentSupport',
    readinessLabel: 'Government Support'
  },
  {
    id: 'FUNDING',
    number: 4,
    title: 'Funding & Bank Credit',
    shortName: 'Funding',
    tagline: 'Capital Stack, DPR & Bank Loan',
    objective: 'Structure own margin, government subsidy, and bank credit with a formal Detailed Project Report.',
    readinessKey: 'fundingReadiness',
    readinessLabel: 'Funding Readiness'
  },
  {
    id: 'REGISTRATION',
    number: 5,
    title: 'Entity Registration & Compliance',
    shortName: 'Registration',
    tagline: 'Udyam, GST, FSSAI & Bank Current A/C',
    objective: 'Formalize the enterprise through free official government portals and obtain statutory permits.',
    readinessKey: 'complianceReadiness',
    readinessLabel: 'Compliance Readiness'
  },
  {
    id: 'SETUP',
    number: 6,
    title: 'Equipment & Operational Setup',
    shortName: 'Setup',
    tagline: 'Workspace, Machinery & Staffing',
    objective: 'Procure verified machinery, install infrastructure, and secure initial inventory.',
    readinessKey: 'setupReadiness',
    readinessLabel: 'Setup Readiness'
  },
  {
    id: 'LAUNCH',
    number: 7,
    title: 'Commercial Launch',
    shortName: 'Launch',
    tagline: 'Marketing, Go-To-Market & First Billing',
    objective: 'Open doors to customers, conduct initial promotional billing, and stabilize delivery.',
    readinessKey: 'launchReadiness',
    readinessLabel: 'Launch Readiness'
  },
  {
    id: 'GROWTH',
    number: 8,
    title: 'Expansion & Scale',
    shortName: 'Growth',
    tagline: 'Cash Flow, Digital Portals & Repeat Scale',
    objective: 'Optimize working capital, access institutional expansion credit, and list on digital commerce.',
    readinessKey: 'growthReadiness',
    readinessLabel: 'Growth Readiness'
  }
];

export const MASTER_TASKS = [
  // STAGE 1: IDEA VALIDATION
  {
    id: 'idea-define',
    stage: 'IDEA',
    title: 'Define Core Business Concept',
    shortTitle: 'Business Concept',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Document your specific product or service value proposition and why customers will choose it.',
    whyThisMatters: 'Clear product definition prevents feature creep and ensures marketing focuses on the real customer problem.',
    whatToDo: [
      'Write a 2-sentence description of the core product or service you will sell.',
      'Specify the unique value (e.g. locally sourced, chemical-free, fast delivery).',
      'Identify the exact problem current alternatives fail to solve.'
    ],
    requiredInputs: ['Product category', 'Target price point', 'Core differentiator'],
    prerequisites: [],
    unlocks: ['idea-customer'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'idea-customer',
    stage: 'IDEA',
    title: 'Identify & Profile Target Customers',
    shortTitle: 'Customer Profiling',
    priority: 'HIGH',
    estimatedTime: '1-2 days',
    description: 'Determine who your primary buyers are (retail consumers, retail shops, wholesalers, or institutions).',
    whyThisMatters: 'Knowing your primary demographic prevents wasted marketing spend and informs pricing decisions.',
    whatToDo: [
      'Segment customers: B2C (local households) or B2B (local grocery stores / hotels).',
      'Estimate the monthly purchasing budget of your target customer.',
      'Document where these customers currently purchase similar items.'
    ],
    requiredInputs: ['Customer demographic', 'Geographic radius', 'Purchase frequency'],
    prerequisites: ['idea-define'],
    unlocks: ['idea-validation'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'idea-validation',
    stage: 'IDEA',
    title: 'Validate Customer Demand',
    shortTitle: 'Demand Validation',
    priority: 'HIGH',
    estimatedTime: '2-3 days',
    description: 'Directly interview at least 10 prospective customers to test purchase willingness and price acceptance.',
    whyThisMatters: 'Validating real demand before purchasing machinery or leasing land saves your personal capital from high-risk ventures.',
    whatToDo: [
      'Show sample prototypes, pictures, or service descriptions to 10 potential buyers.',
      'Ask: "If this were available tomorrow at ₹X, would you buy it?"',
      'Record specific feedback regarding taste, packaging, price point, or delivery expectations.',
      'Summarize positive commitments or pre-orders.'
    ],
    requiredInputs: ['Feedback summary from 10 customers', 'Accepted price range', 'Commitment rate'],
    prerequisites: ['idea-customer'],
    unlocks: ['feasibility-capital', 'feasibility-location'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },

  // STAGE 2: BUSINESS FEASIBILITY
  {
    id: 'feasibility-capital',
    stage: 'FEASIBILITY',
    title: 'Estimate Capital Requirements & Unit Economics',
    shortTitle: 'Capital Sizing',
    priority: 'HIGH',
    estimatedTime: '2 days',
    description: 'Estimate machinery costs, lease deposit, working capital, and calculate cost per unit.',
    whyThisMatters: 'Accurate capital sizing prevents mid-setup cash starvation and forms the exact basis for bank loan sizing.',
    whatToDo: [
      'List fixed assets required (e.g. grinder, sealer, solar dryer, packaging tables).',
      'Estimate 3 months of raw materials and operational buffer.',
      'Calculate raw material cost per batch and profit margin per packaged unit.'
    ],
    requiredInputs: ['Equipment list with approximate prices', 'Monthly raw material outlay', 'Unit gross margin %'],
    prerequisites: ['idea-validation'],
    unlocks: ['feasibility-suppliers', 'feasibility-pricing', 'scheme-discovery', 'funding-gap'],
    requiredDocuments: ['doc-quotations'],
    relatedSchemes: [],
    relatedFunding: { costRequired: true },
    recommendedProfessionalCategory: 'Accountants & CA'
  },
  {
    id: 'feasibility-location',
    stage: 'FEASIBILITY',
    title: 'Finalize Business Premises & Utilities',
    shortTitle: 'Premises & Utilities',
    priority: 'MEDIUM',
    estimatedTime: '2-3 days',
    description: 'Inspect and finalize the production facility or storefront, ensuring water, 3-phase electricity, and road access.',
    whyThisMatters: 'Government subsidies and bank disbursements require a verifiable commercial lease or land ownership deed.',
    whatToDo: [
      'Verify 3-phase electric power connection and clean municipal or borewell water supply.',
      'Negotiate lease terms with owner or verify ancestral land clear title deed.',
      'Obtain draft rent agreement or electricity bill copy for bank verification.'
    ],
    requiredInputs: ['Premises square footage', 'Monthly rent / lease terms', 'Electricity connection availability'],
    prerequisites: ['idea-validation'],
    unlocks: ['setup-workspace', 'reg-permits'],
    requiredDocuments: ['doc-rent-agreement', 'doc-electricity-bill'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Legal & Trademarks'
  },
  {
    id: 'feasibility-suppliers',
    stage: 'FEASIBILITY',
    title: 'Identify & Quote Raw Material Suppliers',
    shortTitle: 'Supplier Identification',
    priority: 'MEDIUM',
    estimatedTime: '2 days',
    description: 'Establish vendor relationships for raw ingredients, containers, and packaging materials.',
    whyThisMatters: 'Having at least two supplier quotations prevents supply disruption and secures realistic input costs.',
    whatToDo: [
      'Identify at least 2 wholesale suppliers for each primary raw input.',
      'Obtain written price quotations per kg/liter including transport delivery.',
      'Negotiate credit or consignment payment terms.'
    ],
    requiredInputs: ['Supplier names & contacts', 'Raw material unit cost quotes'],
    prerequisites: ['feasibility-capital'],
    unlocks: ['setup-inventory'],
    requiredDocuments: ['doc-quotations'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'feasibility-pricing',
    stage: 'FEASIBILITY',
    title: 'Finalize Pricing Structure & Break-Even',
    shortTitle: 'Pricing & Break-Even',
    priority: 'MEDIUM',
    estimatedTime: '1 day',
    description: 'Set wholesale vs retail distributor margins and determine monthly sales volume required to break even.',
    whyThisMatters: 'Banks inspect break-even volume to confirm whether the business can comfortably service interest & principal.',
    whatToDo: [
      'Calculate Cost of Goods Sold (COGS) including packaging and transport.',
      'Factor 15-20% margin for retail shopkeepers or distribution partners.',
      'Calculate monthly fixed overheads (rent, power, wages) and break-even units.'
    ],
    requiredInputs: ['Retail MRP', 'Wholesale price', 'Monthly break-even sales volume'],
    prerequisites: ['feasibility-capital'],
    unlocks: ['funding-dpr'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Accountants & CA'
  },

  // STAGE 3: GOVERNMENT SUPPORT & SCHEMES
  {
    id: 'scheme-discovery',
    stage: 'SUPPORT',
    title: 'Review Recommended Government Schemes',
    shortTitle: 'Review Schemes',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Review deterministic scheme recommendations matched to your state, sector, gender, and social category.',
    whyThisMatters: 'Choosing the right scheme can provide up to 35% non-refundable capital subsidy (e.g. PMFME or PMEGP).',
    whatToDo: [
      'Compare matched schemes (e.g. PMFME 35% subsidy vs PMEGP vs Mudra).',
      'Check maximum subsidy ceilings (e.g. ₹10 Lakh for PMFME / ₹12.5 Lakh for PMEGP).',
      'Confirm whether your district has special One District One Product (ODOP) priority.'
    ],
    requiredInputs: ['Preferred scheme match'],
    prerequisites: ['feasibility-capital'],
    unlocks: ['scheme-eligibility', 'scheme-selection'],
    requiredDocuments: [],
    relatedSchemes: ['PMFME', 'PMEGP', 'MUDRA'],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'scheme-eligibility',
    stage: 'SUPPORT',
    title: 'Verify Scheme Eligibility & Criteria',
    shortTitle: 'Verify Eligibility',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Confirm minimum age (18+), education requirement (8th pass for >₹10L), and promoter margin (10-25%).',
    whyThisMatters: 'Verifying criteria beforehand prevents rejection at the District Level Screening Committee.',
    whatToDo: [
      'Verify Aadhaar is linked with active mobile number for DigiLocker KYC.',
      'Confirm social category (Women, SC/ST, OBC, Rural) to claim enhanced 35% subsidy instead of standard 15-25%.',
      'Ensure neither promoter nor spouse has active default on institutional loans.'
    ],
    requiredInputs: ['Aadhaar linkage confirmation', 'Category certificate status', 'Education certificate status'],
    prerequisites: ['scheme-discovery'],
    unlocks: ['scheme-selection'],
    requiredDocuments: ['doc-aadhaar', 'doc-pan', 'doc-caste-cert'],
    relatedSchemes: ['PMFME', 'PMEGP'],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'scheme-selection',
    stage: 'SUPPORT',
    title: 'Select Target Government Scheme',
    shortTitle: 'Select Scheme',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Formally link your project roadmap to the highest subsidy scheme (e.g. PMFME for Agro/Food or PMEGP for Manufacturing).',
    whyThisMatters: 'Locks in the exact document templates, bank appraisal format, and subsidy calculation for your venture.',
    whatToDo: [
      'Select your primary scheme from the matched options.',
      'Review the scheme guidelines for promoter contribution (e.g. 10% for Special/Women, 25% for general).',
      'Commit to the application route (direct portal or District Industries Centre coordination).'
    ],
    requiredInputs: ['Selected scheme key'],
    prerequisites: ['scheme-discovery', 'scheme-eligibility'],
    unlocks: ['scheme-documents', 'funding-gap', 'funding-route'],
    requiredDocuments: [],
    relatedSchemes: ['PMFME', 'PMEGP'],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'scheme-documents',
    stage: 'SUPPORT',
    title: 'Prepare Scheme Statutory Documents',
    shortTitle: 'Scheme Documents',
    priority: 'HIGH',
    estimatedTime: '2-3 days',
    description: 'Assemble mandatory scheme attachments: Aadhaar, PAN, Bank Passbook, Category Certificate, and Rent Agreement.',
    whyThisMatters: '90% of scheme application delays happen due to mismatched names on Aadhaar/PAN or missing address proof.',
    whatToDo: [
      'Ensure name spelling matches across Aadhaar, PAN, and Bank Account.',
      'Obtain certified Copy of Rent Agreement / Land Title.',
      'Collect recent 6-month bank savings passbook / statements.'
    ],
    requiredInputs: ['Verified document checklist'],
    prerequisites: ['scheme-selection'],
    unlocks: ['funding-dpr', 'funding-dossier'],
    requiredDocuments: ['doc-aadhaar', 'doc-pan', 'doc-bank-statement', 'doc-rent-agreement'],
    relatedSchemes: ['PMFME', 'PMEGP'],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Loan DPR Assistance'
  },

  // STAGE 4: FUNDING & BANK CREDIT
  {
    id: 'funding-gap',
    stage: 'FUNDING',
    title: 'Calculate Capital Stack & Funding Gap',
    shortTitle: 'Funding Plan',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Deconstruct total project cost into Own Margin, Government Capital Subsidy, and required Bank Term Loan.',
    whyThisMatters: 'Clear mathematics shows exactly how much savings you must deposit in your current account to get the loan sanctioned.',
    whatToDo: [
      'Enter total project cost (e.g. ₹3,00,000).',
      'Deduct available entrepreneur margin (e.g. ₹75,000 / 25%).',
      'Apply government capital subsidy estimate (e.g. ₹1,00,000 / ~33%).',
      'Arrive at exact net bank loan required (e.g. ₹1,25,000).'
    ],
    requiredInputs: ['Project cost', 'Available margin', 'Calculated subsidy', 'Bank loan needed'],
    prerequisites: ['feasibility-capital', 'scheme-selection'],
    unlocks: ['funding-route', 'funding-dpr'],
    requiredDocuments: [],
    relatedSchemes: ['PMFME', 'PMEGP', 'MUDRA'],
    relatedFunding: { calculateGap: true },
    recommendedProfessionalCategory: 'Accountants & CA'
  },
  {
    id: 'funding-route',
    stage: 'FUNDING',
    title: 'Select Financing Route & Lead Bank',
    shortTitle: 'Bank Channel Selection',
    priority: 'HIGH',
    estimatedTime: '1-2 days',
    description: 'Select lead lending bank (SBI, Baroda, PNB, Regional Rural Bank) with active CGTMSE credit guarantee.',
    whyThisMatters: 'Choosing a bank where you already maintain an account significantly speeds up branch manager sanction.',
    whatToDo: [
      'Identify local bank branch within 5-10 km of your enterprise location.',
      'Check branch manager openness to PMFME/PMEGP credit linkages.',
      'Confirm CGTMSE coverage so no third-party collateral or land mortgage is requested.'
    ],
    requiredInputs: ['Preferred lending bank', 'Branch IFSC code'],
    prerequisites: ['funding-gap'],
    unlocks: ['funding-dpr'],
    requiredDocuments: ['doc-bank-statement'],
    relatedSchemes: ['MUDRA', 'CGTMSE'],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Loan DPR Assistance'
  },
  {
    id: 'funding-dpr',
    stage: 'FUNDING',
    title: 'Prepare Detailed Project Report (DPR)',
    shortTitle: 'Detailed Project Report',
    priority: 'HIGH',
    estimatedTime: '2-3 days',
    description: 'Generate standard bankable DPR containing 5-year balance sheet, cash flow, debt service coverage ratio (DSCR).',
    whyThisMatters: 'The DPR is the single most critical document evaluated by bank credit appraisal officers for loan sanction.',
    whatToDo: [
      'Draft manufacturing/processing capacity, product output, and wastage ratios.',
      'Incorporate equipment quotations and electricity cost estimates.',
      'Calculate Debt Service Coverage Ratio (DSCR must be > 1.5 for safe sanction).'
    ],
    requiredInputs: ['Machine quotations', 'Projected sales volume', 'Projected profit margins'],
    prerequisites: ['feasibility-pricing', 'funding-gap', 'scheme-documents'],
    unlocks: ['funding-dossier', 'reg-structure'],
    requiredDocuments: ['doc-dpr', 'doc-quotations'],
    relatedSchemes: ['PMFME', 'PMEGP'],
    relatedFunding: { dprReady: true },
    recommendedProfessionalCategory: 'Loan DPR Assistance'
  },
  {
    id: 'funding-dossier',
    stage: 'FUNDING',
    title: 'Assemble Bank Loan Appraisal Dossier',
    shortTitle: 'Bank Loan Dossier',
    priority: 'HIGH',
    estimatedTime: '2 days',
    description: 'Submit formal loan application file along with DPR, KYC, quotations, and margin proof to the bank.',
    whyThisMatters: 'A complete dossier prevents back-and-forth bank queries, cutting sanction turnaround from 60 days to 15 days.',
    whatToDo: [
      'Attach signed DPR, machine proforma invoices, and vendor quotations.',
      'Provide bank passbook showing promoter margin funds deposited.',
      'Obtain acknowledgment slip / digital reference number from the lending branch.'
    ],
    requiredInputs: ['Bank loan application number', 'Submission date'],
    prerequisites: ['funding-dpr', 'scheme-documents'],
    unlocks: ['reg-structure', 'setup-procurement'],
    requiredDocuments: ['doc-dpr', 'doc-quotations', 'doc-bank-statement', 'doc-aadhaar', 'doc-pan'],
    relatedSchemes: ['PMFME', 'PMEGP', 'MUDRA'],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Loan DPR Assistance'
  },

  // STAGE 5: REGISTRATION & COMPLIANCE
  {
    id: 'reg-structure',
    stage: 'REGISTRATION',
    title: 'Select Business Legal Structure',
    shortTitle: 'Legal Structure',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Choose Sole Proprietorship (easiest/zero cost) or Partnership / LLP / Private Limited for multiple founders.',
    whyThisMatters: 'Proprietorship has zero compliance filing fees, making it ideal for micro-enterprises launching on low budgets.',
    whatToDo: [
      'Evaluate ownership: Sole Proprietorship if individual; Partnership deed if multi-member.',
      'Draft partnership deed on stamp paper if choosing partnership.',
      'Verify PAN suitability.'
    ],
    requiredInputs: ['Chosen structure (Sole Proprietorship / Partnership)'],
    prerequisites: ['funding-dpr'],
    unlocks: ['reg-udyam', 'reg-tax-bank'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Legal & Trademarks'
  },
  {
    id: 'reg-udyam',
    stage: 'REGISTRATION',
    title: 'Complete Free Udyam MSME Registration',
    shortTitle: 'Udyam Registration',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Obtain official Government of India Udyam MSME Certificate via udyamregistration.gov.in (100% free).',
    whyThisMatters: 'Udyam is mandatory to claim government subsidies, collateral-free bank loans, and electricity tariff rebates.',
    whatToDo: [
      'Visit official portal: udyamregistration.gov.in (never pay intermediaries).',
      'Input promoter Aadhaar and verify OTP.',
      'Select National Industry Classification (NIC) code matching your trade (e.g. 1079 for food processing).',
      'Download instant digital Udyam Registration Certificate with QR code.'
    ],
    requiredInputs: ['19-digit Udyam Registration Number', 'NIC Code'],
    prerequisites: ['reg-structure'],
    unlocks: ['reg-tax-bank', 'reg-permits'],
    requiredDocuments: ['doc-udyam', 'doc-aadhaar', 'doc-pan'],
    relatedSchemes: ['PMFME', 'PMEGP', 'MUDRA'],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'reg-tax-bank',
    stage: 'REGISTRATION',
    title: 'Open Business Current Bank Account',
    shortTitle: 'Business Current A/C',
    priority: 'HIGH',
    estimatedTime: '2 days',
    description: 'Open official enterprise current account in the business trade name using Udyam certificate and rent deed.',
    whyThisMatters: 'Government subsidy Direct Benefit Transfer (DBT) and bank term loan funds can ONLY be disbursed into a business current account.',
    whatToDo: [
      'Carry Udyam Certificate, PAN, Aadhaar, and Rent Agreement to chosen bank branch.',
      'Submit Current Account Opening Form and deposit initial minimum balance.',
      'Obtain Chequebook, Net Banking credentials, and business debit card.'
    ],
    requiredInputs: ['Current Account Number', 'Bank IFSC', 'Cancelled Cheque image'],
    prerequisites: ['reg-udyam'],
    unlocks: ['reg-permits', 'setup-procurement'],
    requiredDocuments: ['doc-udyam', 'doc-pan', 'doc-cancelled-cheque', 'doc-rent-agreement'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Accountants & CA'
  },
  {
    id: 'reg-permits',
    stage: 'REGISTRATION',
    title: 'Obtain Sector Compliance Permits (FSSAI / Trade)',
    shortTitle: 'Sector Permits',
    priority: 'HIGH',
    estimatedTime: '3-4 days',
    description: 'Secure mandatory trade license, FSSAI registration (for food processing), or local municipal clearance.',
    whyThisMatters: 'Selling consumer goods without required statutory permits invites legal notices and prevents retail listing.',
    whatToDo: [
      'For Food Processing: Apply for FSSAI Basic Registration via FoSCoS portal (₹100/yr).',
      'Obtain local Gram Panchayat / Municipal Corporation Trade No-Objection Certificate (NOC).',
      'Verify whether GSTIN registration is mandatory (exempt under ₹40L turnover for goods, but needed for interstate).'
    ],
    requiredInputs: ['FSSAI Application / License Number', 'Trade NOC status'],
    prerequisites: ['reg-udyam', 'feasibility-location'],
    unlocks: ['setup-workspace', 'launch-compliance-check'],
    requiredDocuments: ['doc-fssai', 'doc-udyam'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Tax & GST Filing'
  },

  // STAGE 6: SETUP
  {
    id: 'setup-workspace',
    stage: 'SETUP',
    title: 'Prepare Facility Workspace & Power Line',
    shortTitle: 'Facility Setup',
    priority: 'MEDIUM',
    estimatedTime: '3-5 days',
    description: 'Install dedicated electrical wiring, wash area, pest-free storage, and hygiene packaging zones.',
    whyThisMatters: 'Clean processing spaces pass bank pre-disbursement inspection and FSSAI health audits.',
    whatToDo: [
      'Erect stainless steel or stone processing tables.',
      'Ensure covered drainage and pest-proof mesh screens on ventilation.',
      'Install adequate lighting and safety power trip breakers.'
    ],
    requiredInputs: ['Premises setup readiness photo / status'],
    prerequisites: ['feasibility-location', 'reg-permits'],
    unlocks: ['setup-procurement'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'setup-procurement',
    stage: 'SETUP',
    title: 'Procure & Install Machinery',
    shortTitle: 'Machinery Procurement',
    priority: 'HIGH',
    estimatedTime: '4-7 days',
    description: 'Purchase capital machinery (e.g. grinder, pulper, sealer) using bank loan disbursement / capital funds.',
    whyThisMatters: 'Tax invoices and machine installation certificates are mandatory for government subsidy verification.',
    whatToDo: [
      'Issue purchase order to shortlisted supplier against approved quotations.',
      'Inspect machinery during trial dry-run run for defect warranty.',
      'Collect original GST tax invoice and warranty certificates for bank submission.'
    ],
    requiredInputs: ['Machine serial numbers', 'Original GST tax invoice numbers'],
    prerequisites: ['funding-dossier', 'reg-tax-bank', 'setup-workspace'],
    unlocks: ['setup-inventory', 'launch-compliance-check'],
    requiredDocuments: ['doc-quotations'],
    relatedSchemes: ['PMFME', 'PMEGP'],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'setup-inventory',
    stage: 'SETUP',
    title: 'Procure Initial Raw Material & Packaging Stock',
    shortTitle: 'Inventory Procurement',
    priority: 'MEDIUM',
    estimatedTime: '2-3 days',
    description: 'Order 30-day initial raw ingredient inventory, food-grade glass/pouch packaging, and branded labels.',
    whyThisMatters: 'Having quality packaging and branded labels ready ensures day-one products build instant consumer trust.',
    whatToDo: [
      'Procure food-grade pouches, jars, and carton boxes.',
      'Print batch stickers with FSSAI number, Net Weight, MRP, and manufacturing date.',
      'Stock first production batch raw materials from verified vendors.'
    ],
    requiredInputs: ['Batch production size (kg/units)', 'Packaging inventory count'],
    prerequisites: ['feasibility-suppliers', 'setup-procurement'],
    unlocks: ['launch-compliance-check', 'launch-marketing'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Marketing & Branding'
  },
  {
    id: 'setup-hiring',
    stage: 'SETUP',
    title: 'Onboard Core Helpers & Operating Team',
    shortTitle: 'Team Onboarding',
    priority: 'LOW',
    estimatedTime: '2 days',
    description: 'Brief helpers on hygiene practices, machine operation safety, and daily packaging quotas.',
    whyThisMatters: 'Trained helpers minimize material wastage and prevent workplace injuries on electrical equipment.',
    whatToDo: [
      'Train operators on equipment cleaning and daily maintenance routine.',
      'Implement hairnet, apron, and hand-washing hygiene protocol.',
      'Set daily batch packaging targets.'
    ],
    requiredInputs: ['Team count', 'Safety briefing completion'],
    prerequisites: ['setup-procurement'],
    unlocks: ['launch-first-sale'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },

  // STAGE 7: LAUNCH
  {
    id: 'launch-compliance-check',
    stage: 'LAUNCH',
    title: 'Final Pre-Launch Regulatory & Hygiene Check',
    shortTitle: 'Pre-Launch Audit',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Conduct comprehensive internal audit verifying labeling, batch numbers, MRP prints, and sanitary storage.',
    whyThisMatters: 'Fixing labeling errors prior to retail distribution prevents expensive product recalls or administrative penalties.',
    whatToDo: [
      'Check label mandatory disclosures: Veg/Non-veg mark, FSSAI logo & number, Best Before date.',
      'Verify weight accuracy on certified electronic weighing scale.',
      'Ensure tamper-evident induction or shrink seals are intact.'
    ],
    requiredInputs: ['Pre-launch checklist signoff'],
    prerequisites: ['reg-permits', 'setup-procurement', 'setup-inventory'],
    unlocks: ['launch-first-sale'],
    requiredDocuments: ['doc-fssai', 'doc-udyam'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },
  {
    id: 'launch-marketing',
    stage: 'LAUNCH',
    title: 'Rollout Local Marketing & Wholesale Linkages',
    shortTitle: 'Marketing & Distribution',
    priority: 'HIGH',
    estimatedTime: '3 days',
    description: 'Distribute sample testers to local kirana stores, regional sweet shops, and setup WhatsApp Business catalog.',
    whyThisMatters: 'Personal sampling in local markets creates rapid word-of-mouth and generates immediate retail trial.',
    whatToDo: [
      'Distribute free 50g sample pouches to 20 local grocery and provision stores.',
      'Setup WhatsApp Business profile with product catalog, prices, and QR payment.',
      'Announce launch on local community networks and Self-Help Groups (SHGs).'
    ],
    requiredInputs: ['Store sample placements count', 'WhatsApp catalog link'],
    prerequisites: ['setup-inventory'],
    unlocks: ['launch-first-sale'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Marketing & Branding'
  },
  {
    id: 'launch-first-sale',
    stage: 'LAUNCH',
    title: 'First Commercial Invoicing & Customer Delivery',
    shortTitle: 'First Commercial Sale',
    priority: 'HIGH',
    estimatedTime: '1 day',
    description: 'Fulfill initial paid customer orders, generate formal GST/retail cash memos, and receive payments.',
    whyThisMatters: 'The first commercial invoice marks the legal transition from a project into an operating, revenue-generating enterprise.',
    whatToDo: [
      'Issue first official invoice / cash memo with business name and date.',
      'Collect payment via UPI QR code or cash into business current account.',
      'Capture customer feedback on product taste and packaging presentation.'
    ],
    requiredInputs: ['First bill invoice number', 'Customer feedback note', 'Revenue generated'],
    prerequisites: ['launch-compliance-check', 'launch-marketing', 'setup-hiring'],
    unlocks: ['growth-financials'],
    requiredDocuments: [],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: null
  },

  // STAGE 8: GROWTH
  {
    id: 'growth-financials',
    stage: 'GROWTH',
    title: 'Track Monthly Revenue, Cash Flow & Unit Margin',
    shortTitle: 'Financial Tracking',
    priority: 'HIGH',
    estimatedTime: 'Ongoing',
    description: 'Maintain strict weekly cash flow tracking of sales receipts vs raw material, wage, and power overheads.',
    whyThisMatters: 'Positive operating cash flow ensures smooth monthly bank loan EMI repayments and builds creditworthiness.',
    whatToDo: [
      'Log daily sales volume and cash/UPI receipts.',
      'Reconcile raw material spend weekly to detect shrinkage or packaging waste.',
      'Set aside 10% of monthly revenue into reserve buffer for loan EMIs.'
    ],
    requiredInputs: ['Monthly turnover', 'Gross margin achieved'],
    prerequisites: ['launch-first-sale'],
    unlocks: ['growth-working-capital', 'growth-market-expansion'],
    requiredDocuments: ['doc-bank-statement'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Accountants & CA'
  },
  {
    id: 'growth-working-capital',
    stage: 'GROWTH',
    title: 'Explore Working Capital Top-Ups & Expansion Credit',
    shortTitle: 'Working Capital Expansion',
    priority: 'MEDIUM',
    estimatedTime: 'Ongoing',
    description: 'Leverage 6 months of steady current account turnover to obtain a Cash Credit (CC) limit or Mudra Tarun loan.',
    whyThisMatters: 'Seasonal harvest buying requires quick liquidity so you can buy raw produce at rock-bottom peak season prices.',
    whatToDo: [
      'Present 6 months current account bank statements to branch manager.',
      'Apply for working capital Cash Credit (CC) facility under Mudra.',
      'Negotiate lower interest subvention under regional MSME schemes.'
    ],
    requiredInputs: ['Working capital limit requested'],
    prerequisites: ['growth-financials'],
    unlocks: ['growth-market-expansion'],
    requiredDocuments: ['doc-bank-statement', 'doc-udyam'],
    relatedSchemes: ['MUDRA', 'PMEGP'],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Loan DPR Assistance'
  },
  {
    id: 'growth-market-expansion',
    stage: 'GROWTH',
    title: 'Expand Market Reach (ONDC, E-Commerce, Regional Tie-ups)',
    shortTitle: 'Market Expansion',
    priority: 'MEDIUM',
    estimatedTime: 'Ongoing',
    description: 'Onboard onto Open Network for Digital Commerce (ONDC), regional retail supermarket chains, and government exhibitions.',
    whyThisMatters: 'Institutional and digital channels diversify revenue beyond local neighborhood walk-in trade.',
    whatToDo: [
      'Register seller profile on ONDC-enabled buyer apps.',
      'Participate in state SARAS fairs and District Industries Centre buyer-seller meets.',
      'Establish consignment supply contracts with regional wholesale distributors.'
    ],
    requiredInputs: ['Digital storefront link / exhibition participation'],
    prerequisites: ['growth-financials'],
    unlocks: [],
    requiredDocuments: ['doc-udyam', 'doc-fssai', 'doc-pan'],
    relatedSchemes: [],
    relatedFunding: null,
    recommendedProfessionalCategory: 'Web & Technology'
  }
];

export const MASTER_DOCUMENTS = [
  { id: 'doc-aadhaar', name: 'Aadhaar Card (Mobile Linked)', category: 'Personal', requiredFor: ['scheme-eligibility', 'scheme-documents', 'reg-udyam'] },
  { id: 'doc-pan', name: 'PAN Card of Proprietor / Entity', category: 'Personal', requiredFor: ['scheme-eligibility', 'scheme-documents', 'reg-tax-bank'] },
  { id: 'doc-caste-cert', name: 'Category / Caste Certificate (if claiming 35% subsidy)', category: 'Personal', requiredFor: ['scheme-eligibility'] },
  { id: 'doc-rent-agreement', name: 'Premises Lease Agreement / Land Deed', category: 'Business', requiredFor: ['feasibility-location', 'scheme-documents', 'reg-tax-bank'] },
  { id: 'doc-electricity-bill', name: 'Premises Electricity Bill', category: 'Business', requiredFor: ['feasibility-location', 'scheme-documents'] },
  { id: 'doc-bank-statement', name: 'Last 6 Months Bank Account Statement', category: 'Financial', requiredFor: ['scheme-documents', 'funding-route', 'funding-dossier', 'growth-financials'] },
  { id: 'doc-cancelled-cheque', name: 'Cancelled Bank Cheque', category: 'Financial', requiredFor: ['reg-tax-bank', 'funding-dossier'] },
  { id: 'doc-quotations', name: 'Machinery & Equipment Quotations (2 Vendors)', category: 'Funding', requiredFor: ['feasibility-capital', 'feasibility-suppliers', 'funding-dpr', 'funding-dossier', 'setup-procurement'] },
  { id: 'doc-dpr', name: 'Detailed Project Report (DPR)', category: 'Funding', requiredFor: ['funding-dpr', 'funding-dossier'] },
  { id: 'doc-udyam', name: 'Udyam MSME Registration Certificate', category: 'Government', requiredFor: ['reg-udyam', 'reg-tax-bank', 'reg-permits', 'growth-working-capital'] },
  { id: 'doc-fssai', name: 'FSSAI Food Safety Registration / License', category: 'Government', requiredFor: ['reg-permits', 'launch-compliance-check', 'growth-market-expansion'] }
];

export const DEMO_PERSONAS = {
  sita: {
    id: 'sita',
    name: 'Sita Sharma',
    businessName: 'Sharma Foods',
    sector: 'AGRI_PROCESSING',
    industry: 'Food Processing',
    location: 'Rural Varanasi, Uttar Pradesh',
    stage: 'IDEA',
    availableCapital: '₹75,000',
    estimatedProjectCost: '₹3,00,000',
    fundingRequired: '₹2,25,000',
    recommendedScheme: 'PMFME',
    schemeMatchScore: '94% Match',
    schemeSubsidy: '₹1,00,000 (35% capital subsidy)',
    targetCustomers: 'Local kirana retail stores & regional households',
    productService: 'Pickles, Ground Spices & Dehydrated Agro Condiments',
    initialCompletedTasks: [
      'idea-define',
      'idea-customer'
    ],
    initialDocumentStatus: {
      'doc-aadhaar': true,
      'doc-pan': true,
      'doc-caste-cert': true,
      'doc-rent-agreement': false,
      'doc-electricity-bill': false,
      'doc-bank-statement': true,
      'doc-cancelled-cheque': false,
      'doc-quotations': false,
      'doc-dpr': false,
      'doc-udyam': false,
      'doc-fssai': false
    },
    selectedSchemeId: null
  },
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    businessName: 'Sahyadri Agro Naturals',
    sector: 'AGRI_PROCESSING',
    industry: 'Food Processing',
    location: 'Pune, Maharashtra',
    stage: 'PLANNING',
    availableCapital: '₹2,50,000',
    estimatedProjectCost: '₹15,00,000',
    fundingRequired: '₹12,50,000',
    recommendedScheme: 'PMFME',
    schemeMatchScore: '92% Match',
    schemeSubsidy: '₹5,25,000 (35% capital subsidy)',
    targetCustomers: 'B2B food brands, urban supermarkets, export merchants',
    productService: 'Organic fruit purees and value-added spices',
    initialCompletedTasks: [
      'idea-define',
      'idea-customer',
      'idea-validation',
      'feasibility-capital'
    ],
    initialDocumentStatus: {
      'doc-aadhaar': true,
      'doc-pan': true,
      'doc-caste-cert': false,
      'doc-rent-agreement': true,
      'doc-electricity-bill': true,
      'doc-bank-statement': true,
      'doc-cancelled-cheque': true,
      'doc-quotations': true,
      'doc-dpr': false,
      'doc-udyam': false,
      'doc-fssai': false
    },
    selectedSchemeId: 'PMFME'
  }
};
