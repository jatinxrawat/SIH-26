/**
 * Configurable Government & Institutional Funding Products
 * 
 * Configured specifically around Problem Statement PS26091 parameters:
 * - Micro Finance Scheme: Up to ₹1.40L project cost, 90% financing capped at ₹1.25L, 6.5% p.a., 3 yrs, 3 mo moratorium
 * - Term Loan Scheme: ₹1.40L to ₹50L project cost, 90% financing capped at ₹45L, 8.0% p.a., 7 yrs, 6 mo moratorium
 * - Ceiling: > ₹50L project cost requires specialized MSME consortium or commercial financing
 */

export const PS26091_FUNDING_PRODUCTS = [
  {
    id: 'micro-finance',
    name: 'Micro Finance Scheme',
    code: 'PS26091-MFS',
    tagline: 'Collateral-free micro enterprise financing for early-stage rural & urban ventures',
    minProjectCost: 1,
    maxProjectCost: 140000, // ₹1.40 Lakh
    marginPercentage: 10,   // 10% own contribution
    financingPercentage: 90,// Up to 90%
    maximumLoanAmount: 125000, // ₹1.25 Lakh (Strict Cap)
    interestRate: 6.5,      // 6.5% per annum
    tenureYears: 3,         // 3 years (36 months)
    moratoriumMonths: 3,    // 3 months grace period
    repaymentFrequencies: ['monthly', 'quarterly'],
    defaultRepaymentFrequency: 'quarterly',
    description: 'Designed for nano and micro entrepreneurs requiring project capital up to ₹1.40 lakh with minimal promoter margin.',
    targetBeneficiaries: 'Micro entrepreneurs, artisans, rural self-employed, nano service providers',
    keyFeatures: [
      'Up to 90% financing capped at ₹1.25 lakh',
      'Concessional interest rate of 6.5% p.a.',
      '3-month initial repayment moratorium',
      'Flexible monthly or quarterly repayment schedule',
      'Low 10% promoter equity requirement'
    ],
    governingAgency: 'National Minorities / Backward Classes & Micro Enterprise Finance Channelizing Agencies'
  },
  {
    id: 'term-loan',
    name: 'Term Loan Scheme',
    code: 'PS26091-TLS',
    tagline: 'Comprehensive asset creation & expansion term financing for MSME enterprises',
    minProjectCost: 140001, // Above ₹1.40 Lakh
    maxProjectCost: 5000000, // Up to ₹50 Lakh
    marginPercentage: 10,   // 10% own contribution
    financingPercentage: 90,// Up to 90%
    maximumLoanAmount: 4500000, // ₹45 Lakh (Strict Cap)
    interestRate: 8.0,      // 8.0% per annum
    tenureYears: 7,         // 7 years (84 months)
    moratoriumMonths: 6,    // 6 months grace period
    repaymentFrequencies: ['monthly', 'quarterly'],
    defaultRepaymentFrequency: 'quarterly',
    description: 'Subsidized term lending for manufacturing, agro-processing, services, and expansion projects up to ₹50 lakh.',
    targetBeneficiaries: 'Small & medium micro-enterprises, food processors, light manufacturing, tech services',
    keyFeatures: [
      'Up to 90% project financing capped at ₹45 lakh',
      'Competitive rate of 8.0% p.a.',
      '6-month initial moratorium to achieve operational cash flow',
      'Long-term 7-year repayment window',
      'Eligible for interest subvention and capital subsidy stacking'
    ],
    governingAgency: 'State Financial Corporations (SFC), Scheduled Commercial Banks & Channelizing Agencies'
  }
];

export const FUNDING_MODEL_CEILING = 5000000; // ₹50 Lakhs

export const STATUTORY_FINANCIAL_DISCLAIMER = `Calculations shown by Business Compass are estimates based on the information provided and configured scheme parameters. They are intended for planning and educational purposes and do not guarantee eligibility, loan approval, sanction amount, interest rate, or business profitability. Final terms are determined by the relevant government authority, channelizing agency, or lending institution.`;

export const MORATORIUM_DISCLAIMER = `Moratorium treatment (whether interest is capitalized, serviced during grace, or deferred) should be confirmed with the implementing lending agency.`;
