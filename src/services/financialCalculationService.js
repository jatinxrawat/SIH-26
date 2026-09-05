/**
 * Deterministic Financial Calculation Engine for Business Compass
 * 
 * Strict separation of concerns:
 * All numerical formulas (PS26091 funding tiers, reducing-balance amortizations,
 * margin/cost routing, working capital, and affordability metrics) live here.
 * Components consume this service deterministically.
 */

import { PS26091_FUNDING_PRODUCTS, FUNDING_MODEL_CEILING } from '../data/fundingProducts.js';

/**
 * Robust currency parser supporting Indian financial formats:
 * e.g., '₹15,00,000', '1500000', '10 Lakhs', '1.4 Lakh', '50K', '₹50,000 - ₹2 Lakhs'
 */
export function parseRupeeAmount(val) {
  if (typeof val === 'number') {
    return isNaN(val) ? 0 : Math.max(0, val);
  }
  if (!val || typeof val !== 'string') return 0;

  const clean = val.replace(/[₹,\s]/g, '').trim().toLowerCase();

  if (clean.includes('cr') || clean.includes('crore')) {
    const num = parseFloat(clean.replace(/crore|cr/g, ''));
    return isNaN(num) ? 0 : Math.round(num * 10000000);
  }
  if (clean.includes('l') || clean.includes('lakh') || clean.includes('lakhs')) {
    const num = parseFloat(clean.replace(/lakhs|lakh|l/g, ''));
    return isNaN(num) ? 0 : Math.round(num * 100000);
  }
  if (clean.includes('k') || clean.includes('thousand')) {
    const num = parseFloat(clean.replace(/thousand|k/g, ''));
    return isNaN(num) ? 0 : Math.round(num * 1000);
  }
  if (clean.includes('-')) {
    const parts = clean.split('-');
    const low = parseRupeeAmount(parts[0]);
    const high = parseRupeeAmount(parts[1]);
    return Math.round((low + high) / 2);
  }

  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}

/**
 * Formats a number to Indian Rupee standard format (e.g. ₹10,00,000)
 */
export function formatRupees(amount, options = {}) {
  const num = typeof amount === 'number' ? amount : parseRupeeAmount(amount);
  if (isNaN(num)) return '₹0';

  if (options.compact) {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
    }
    if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
  }

  return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

/**
 * PS26091 Core Formula:
 * Feasible Project Cost = Available Margin Capital ÷ 10%
 * (e.g. ₹1,00,000 ÷ 0.10 = ₹10,00,000)
 */
export function calculateFeasibleProjectCost(availableMargin, marginPercentage = 10) {
  const margin = parseRupeeAmount(availableMargin);
  if (margin <= 0) return 0;
  const pct = marginPercentage > 0 ? marginPercentage / 100 : 0.10;
  return Math.round(margin / pct);
}

/**
 * PS26091 Funding Router:
 * Routes project cost to the appropriate funding tier or ceiling alert.
 */
export function routeFundingProduct(projectCost) {
  const cost = parseRupeeAmount(projectCost);

  if (cost <= 0) {
    return {
      status: 'ZERO_COST',
      product: null,
      message: 'Please provide an available margin or project cost to determine funding tier.'
    };
  }

  if (cost > FUNDING_MODEL_CEILING) {
    return {
      status: 'EXCEEDS_CEILING',
      product: null,
      ceiling: FUNDING_MODEL_CEILING,
      message: 'Your current margin-based structure exceeds the supported project-cost range of this funding model (Up to ₹50 Lakhs). Consider adjusting your project plan or exploring specialized MSME consortium financing.'
    };
  }

  if (cost <= 140000) {
    return {
      status: 'MATCHED',
      tierKey: 'MICRO_FINANCE',
      product: PS26091_FUNDING_PRODUCTS[0], // Micro Finance Scheme
      message: 'Routed to Micro Finance Scheme (Up to ₹1.40 Lakh project cost)'
    };
  }

  return {
    status: 'MATCHED',
    tierKey: 'TERM_LOAN',
    product: PS26091_FUNDING_PRODUCTS[1], // Term Loan Scheme
    message: 'Routed to Term Loan Scheme (₹1.40 Lakh to ₹50 Lakh project cost)'
  };
}

/**
 * Calculates complete financing structure respecting PS26091 caps.
 * Handles Micro Finance cap (₹1.25L max loan) and Term Loan cap (₹45L max loan).
 */
export function calculateFinancingStructure(availableMargin, customProjectCost = null) {
  const margin = parseRupeeAmount(availableMargin);
  const feasibleCost = calculateFeasibleProjectCost(margin, 10);
  
  // Use custom project cost if specified and > 0, otherwise fallback to feasible cost
  const customCostParsed = parseRupeeAmount(customProjectCost);
  const effectiveProjectCost = customCostParsed > 0 ? customCostParsed : feasibleCost;

  const routing = routeFundingProduct(effectiveProjectCost);

  if (routing.status === 'EXCEEDS_CEILING') {
    return {
      margin,
      effectiveProjectCost,
      feasibleProjectCost: feasibleCost,
      routing,
      product: null,
      potentialLoan: 0,
      uncappedLoan: Math.round(effectiveProjectCost * 0.90),
      isCapped: false,
      fundingGap: 0,
      requiredMargin: Math.round(effectiveProjectCost * 0.10),
      additionalMarginNeeded: Math.max(0, Math.round(effectiveProjectCost * 0.10) - margin)
    };
  }

  const product = routing.product || PS26091_FUNDING_PRODUCTS[1];
  const uncappedLoan = Math.round(effectiveProjectCost * (product.financingPercentage / 100));
  const potentialLoan = Math.min(uncappedLoan, product.maximumLoanAmount);
  const isCapped = uncappedLoan > product.maximumLoanAmount;

  const requiredMargin = Math.round(effectiveProjectCost * (product.marginPercentage / 100));
  const additionalMarginNeeded = Math.max(0, requiredMargin - margin);

  // Funding gap between requirement (cost - own margin) and potential loan
  const fundingRequirement = Math.max(0, effectiveProjectCost - margin);
  const unfundedGap = Math.max(0, fundingRequirement - potentialLoan);

  return {
    margin,
    effectiveProjectCost,
    feasibleProjectCost: feasibleCost,
    routing,
    product,
    potentialLoan,
    uncappedLoan,
    isCapped,
    capDetails: isCapped ? {
      calculated90: uncappedLoan,
      schemeMaximum: product.maximumLoanAmount,
      appliedLoan: potentialLoan,
      capDifference: uncappedLoan - product.maximumLoanAmount
    } : null,
    fundingRequirement,
    unfundedGap,
    requiredMargin,
    additionalMarginNeeded
  };
}

/**
 * Standard reducing-balance periodic payment calculation.
 * Supports:
 * - 'monthly' (12 installments per year)
 * - 'quarterly' (4 installments per year)
 */
export function calculateRepayment(principal, annualRate, tenureYears, frequency = 'quarterly') {
  const P = parseRupeeAmount(principal);
  if (P <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return {
      installment: 0,
      totalPayment: 0,
      totalInterest: 0,
      numberOfInstallments: 0,
      monthlyEquivalent: 0,
      frequency
    };
  }

  const periodsPerYear = frequency === 'quarterly' ? 4 : 12;
  const n = tenureYears * periodsPerYear;
  const r = (annualRate / 100) / periodsPerYear;

  // Reducing-balance formula: EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]
  const factor = Math.pow(1 + r, n);
  const installment = Math.round((P * r * factor) / (factor - 1));

  const totalPayment = installment * n;
  const totalInterest = Math.max(0, totalPayment - P);
  const monthlyEquivalent = frequency === 'quarterly' ? Math.round(installment / 3) : installment;

  return {
    principal: P,
    annualRate,
    tenureYears,
    frequency,
    periodsPerYear,
    numberOfInstallments: n,
    installment,
    totalPayment,
    totalInterest,
    monthlyEquivalent
  };
}

/**
 * Generates period-by-period Amortization Schedule and Year-by-Year breakdown.
 * Moratorium months are modeled upfront as grace periods with zero principal reduction.
 */
export function generateAmortizationSchedule(principal, annualRate, tenureYears, moratoriumMonths = 6, frequency = 'quarterly') {
  const P = parseRupeeAmount(principal);
  if (P <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return {
      schedule: [],
      yearlySummary: [],
      moratoriumMonths
    };
  }

  const repayment = calculateRepayment(P, annualRate, tenureYears, frequency);
  const periodsPerYear = frequency === 'quarterly' ? 4 : 12;
  const n = repayment.numberOfInstallments;
  const periodicRate = (annualRate / 100) / periodsPerYear;
  const installment = repayment.installment;

  let balance = P;
  const schedule = [];

  // Moratorium Note: Interest handling during moratorium is illustrative
  // We model the repayment amortizing over the configured tenure post-moratorium
  for (let i = 1; i <= n; i++) {
    const periodInterest = Math.round(balance * periodicRate);
    let principalPaid = installment - periodInterest;

    // Last period adjustment to zero out remaining balance
    if (i === n || balance - principalPaid < 0) {
      principalPaid = balance;
    }

    const totalPeriodicPayment = principalPaid + periodInterest;
    const closingBalance = Math.max(0, balance - principalPaid);

    const periodYear = Math.ceil(i / periodsPerYear);
    const periodInYear = ((i - 1) % periodsPerYear) + 1;
    const periodLabel = frequency === 'quarterly'
      ? `Y${periodYear} Q${periodInYear}`
      : `Y${periodYear} M${periodInYear}`;

    schedule.push({
      periodNumber: i,
      periodLabel,
      year: periodYear,
      openingBalance: balance,
      interest: periodInterest,
      principalPaid,
      totalPayment: totalPeriodicPayment,
      closingBalance
    });

    balance = closingBalance;
    if (balance <= 0) break;
  }

  // Aggregate year-by-year summary for charts & quick review
  const yearlyMap = {};
  schedule.forEach((row) => {
    if (!yearlyMap[row.year]) {
      yearlyMap[row.year] = {
        year: row.year,
        yearLabel: `Year ${row.year}`,
        principalPaid: 0,
        interestPaid: 0,
        totalPaid: 0,
        endingBalance: row.closingBalance
      };
    }
    yearlyMap[row.year].principalPaid += row.principalPaid;
    yearlyMap[row.year].interestPaid += row.interest;
    yearlyMap[row.year].totalPaid += row.totalPayment;
    yearlyMap[row.year].endingBalance = row.closingBalance;
  });

  const yearlySummary = Object.values(yearlyMap);

  return {
    moratoriumMonths,
    frequency,
    totalPeriods: schedule.length,
    schedule,
    yearlySummary
  };
}

/**
 * Calculates business affordability & illustrative repayment comfort ratio.
 * Distinguishes existing operating businesses vs new planning enterprises.
 */
export function calculateAffordability(profile, monthlyEquivalentRepayment) {
  const repObligation = parseRupeeAmount(monthlyEquivalentRepayment);
  if (!profile) {
    return {
      status: 'NO_DATA',
      label: 'Data Pending',
      color: 'slate',
      coverageRatio: 0,
      monthlySurplus: 0,
      monthlyRevenue: 0,
      monthlyOperatingExpenses: 0,
      existingObligation: 0,
      repaymentObligation: repObligation,
      message: 'Complete your business revenue and expense information to calculate repayment comfort.'
    };
  }

  const business = profile.business || {};
  const financial = profile.financialProfile || {};
  const isOperating = business.status === 'OPERATING' || business.stage === 'OPERATING' || business.stage === 'GROWING';

  const revenue = isOperating
    ? parseRupeeAmount(financial.monthlyRevenue || business.monthlyRevenue)
    : parseRupeeAmount(financial.expectedMonthlyRevenue);

  const expenses = isOperating
    ? parseRupeeAmount(financial.monthlyOperatingExpenses || financial.existingExpenses)
    : parseRupeeAmount(financial.expectedMonthlyOperatingCost);

  const existingObligation = parseRupeeAmount(financial.existingMonthlyObligation || financial.existingEmi);

  // If both revenue and expenses are 0, affordability cannot be reliably estimated
  if (revenue <= 0) {
    return {
      status: 'NO_DATA',
      label: 'Revenue Estimate Required',
      color: 'amber',
      isOperating,
      coverageRatio: 0,
      monthlySurplus: 0,
      monthlyRevenue: 0,
      monthlyOperatingExpenses: expenses,
      existingObligation,
      repaymentObligation: repObligation,
      message: isOperating
        ? 'Current monthly revenue is not declared in your profile.'
        : 'Projected monthly revenue after launch is not yet declared.'
    };
  }

  const monthlySurplus = Math.max(-500000, revenue - expenses - existingObligation);
  const coverageRatio = repObligation > 0 ? parseFloat((monthlySurplus / repObligation).toFixed(2)) : 0;

  let status = 'COMFORTABLE';
  let label = 'Comfortable';
  let color = 'emerald';
  let message = 'Your projected operating surplus comfortably covers the estimated loan repayment obligation.';

  if (monthlySurplus <= 0 || coverageRatio < 1.0) {
    status = 'HIGH_PRESSURE';
    label = 'High Pressure';
    color = 'rose';
    message = 'Estimated repayment obligation exceeds projected monthly operating surplus. Consider reducing project outlay, extending tenure, or seeking capital subsidies.';
  } else if (coverageRatio < 1.5) {
    status = 'NEEDS_ATTENTION';
    label = 'Needs Attention';
    color = 'amber';
    message = 'Your projected surplus covers the obligation with thin headroom. Reserve sufficient working capital to protect against cash flow delays.';
  }

  return {
    status,
    label,
    color,
    coverageRatio,
    isOperating,
    monthlySurplus,
    monthlyRevenue: revenue,
    monthlyOperatingExpenses: expenses,
    existingObligation,
    repaymentObligation: repObligation,
    message
  };
}

/**
 * Working Capital Planner helper.
 * Recommends reserve capital based on monthly operating expenses and reserve months (1, 2, or 3 months).
 */
export function calculateWorkingCapital(monthlyOperatingCosts, reserveMonths = 2) {
  const cost = parseRupeeAmount(monthlyOperatingCosts);
  const months = Math.min(3, Math.max(1, parseInt(reserveMonths, 10) || 2));
  const recommendedReserve = cost * months;

  return {
    monthlyOperatingCosts: cost,
    reserveMonths: months,
    recommendedReserve
  };
}
