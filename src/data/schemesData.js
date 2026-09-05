/**
 * Government & Entrepreneurship Schemes Master Database
 * Verified data across Central, State, Institutional Banking, and Startup/Private Grants.
 * Total Catalog: 135+ verified schemes.
 * All schemes strictly follow deterministic schemas for the Eligibility Engine.
 */

import { CENTRAL_SCHEMES } from './centralSchemes';
import { STATE_SCHEMES } from './stateSchemes';
import { INSTITUTIONAL_BANK_SCHEMES } from './institutionalBankSchemes';
import { STARTUP_GRANT_SCHEMES } from './startupGrantSchemes';

export const SCHEME_CATEGORIES = [
  { id: 'ALL', label: 'All Support Types' },
  { id: 'SUBSIDY', label: 'Capital Subsidies' },
  { id: 'CREDIT_LINKED_SUBSIDY', label: 'Credit-Linked Subsidies' },
  { id: 'LOAN', label: 'Collateral-Free & Concessional Loans' },
  { id: 'GRANT', label: 'Grants & Seed Funding' },
  { id: 'TRAINING', label: 'Skill & Tool Support' },
  { id: 'INFRASTRUCTURE', label: 'Infrastructure & Tech Labs' }
];

export const BUSINESS_SECTORS = [
  { id: 'ALL', label: 'All Sectors' },
  { id: 'AGRI_PROCESSING', label: 'Food & Agro Processing' },
  { id: 'MANUFACTURING', label: 'Manufacturing & Engineering' },
  { id: 'SERVICES', label: 'Services & Logistics' },
  { id: 'HANDICRAFTS', label: 'Handloom & Handicrafts' },
  { id: 'TRADING', label: 'Retail & Trading' },
  { id: 'DAIRY_LIVESTOCK', label: 'Dairy & Animal Husbandry' },
  { id: 'TECHNOLOGY', label: 'Technology, Hardware & Startups' }
];

export const FUNDING_RANGES = [
  { id: 'ALL', label: 'Any Funding Amount' },
  { id: 'UNDER_1L', label: 'Under ₹1 Lakh', max: 100000 },
  { id: '1L_5L', label: '₹1 Lakh - ₹5 Lakhs', min: 100000, max: 500000 },
  { id: '5L_10L', label: '₹5 Lakhs - ₹10 Lakhs', min: 500000, max: 1000000 },
  { id: '10L_25L', label: '₹10 Lakhs - ₹25 Lakhs', min: 1000000, max: 2500000 },
  { id: '25L_PLUS', label: '₹25 Lakhs & Above', min: 2500000 }
];

// Composite master array tagging each scheme with its jurisdiction type
export const GOVERNMENT_SCHEMES = [
  ...CENTRAL_SCHEMES.map(s => ({ ...s, jurisdictionType: 'CENTRAL' })),
  ...STATE_SCHEMES.map(s => ({ ...s, jurisdictionType: 'STATE' })),
  ...INSTITUTIONAL_BANK_SCHEMES.map(s => ({ ...s, jurisdictionType: 'BANKING' })),
  ...STARTUP_GRANT_SCHEMES.map(s => ({ ...s, jurisdictionType: 'PRIVATE' }))
];

export { CENTRAL_SCHEMES, STATE_SCHEMES, INSTITUTIONAL_BANK_SCHEMES, STARTUP_GRANT_SCHEMES };
