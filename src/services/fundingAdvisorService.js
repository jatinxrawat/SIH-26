/**
 * Grounded AI Financial Advisor Service
 * 
 * Complies with Section 28, 29, 30:
 * The AI does NOT independently calculate or invent financial facts.
 * It receives structured numerical outputs from the deterministic financialCalculationService
 * and explains them clearly in the context of MSME and government scheme underwriting.
 * 
 * Communicates with backend proxy /api/ai.
 * If backend/keys are offline, executes an instant, rich deterministic synthesis engine.
 */

import { formatRupees } from './financialCalculationService.js';

export const FUNDING_SUGGESTED_QUESTIONS = [
  'Can I afford this project?',
  'How much should I borrow?',
  'Why was this funding tier selected?',
  'How much will I repay?',
  'What happens after the moratorium?',
  'How can I reduce my funding requirement?',
  'How much working capital should I keep?',
  'What should I change if I only have ₹50,000?',
  'Is my current project cost realistic?'
];

/**
 * Synthesizes a factual, deterministic response grounded exclusively in the calculated numbers.
 */
function synthesizeDeterministicFundingAdvice(question, context) {
  const q = (question || '').toLowerCase();
  const {
    margin,
    effectiveProjectCost,
    potentialLoan,
    product,
    repayment,
    affordability,
    workingCapital,
    business
  } = context;

  const tierName = product?.name || 'Configured Scheme Tier';
  const interestRate = product?.interestRate || 8.0;
  const tenureYears = product?.tenureYears || 7;
  const moratorium = product?.moratoriumMonths || 6;
  const marginStr = formatRupees(margin);
  const costStr = formatRupees(effectiveProjectCost);
  const loanStr = formatRupees(potentialLoan);
  const repStr = formatRupees(repayment?.installment || 0);
  const freqStr = repayment?.frequency || 'quarterly';
  const surplusStr = formatRupees(affordability?.monthlySurplus || 0);

  if (q.includes('afford')) {
    if (affordability?.status === 'NO_DATA') {
      return `To evaluate affordability, we need your estimated monthly revenue and operating expenses. Based on your current structure, your estimated ${freqStr} repayment obligation is approximately ${repStr}. We recommend updating your revenue projections in your profile to view your exact repayment coverage ratio.`;
    }
    return `Based on the information provided, your available margin of ${marginStr} structures an indicative ${costStr} project under the 10% promoter margin model. With an estimated ${freqStr} repayment of ${repStr} (~${formatRupees(repayment?.monthlyEquivalent || 0)}/mo) and a projected monthly operating surplus of ${surplusStr}, your repayment coverage ratio is approximately ${affordability.coverageRatio}x (${affordability.label}). This suggests an ${affordability.label.toLowerCase()} cash flow profile, though actual business revenue and lender sanction terms will dictate formal approval.`;
  }

  if (q.includes('how much should i borrow') || q.includes('how much to borrow')) {
    return `Under the 10% margin / 90% financing model, for a ${costStr} project your potential loan capacity is ${loanStr}. However, prudent financial practice advises borrowing only what is strictly needed for revenue-generating machinery, critical infrastructure, and 2-3 months of working capital. If your project requirements can be staged gradually, borrowing less will reduce your interest burden from the start.`;
  }

  if (q.includes('why was this funding tier selected') || q.includes('funding tier')) {
    if (product?.id === 'micro-finance') {
      return `Your calculated project cost of ${costStr} falls within the Micro Finance Scheme threshold (up to ₹1.40 Lakhs). This tier offers a preferential interest rate of 6.5% p.a., a 3-year tenure, a 3-month moratorium, and a financing cap of ₹1.25 Lakhs.`;
    }
    return `Your calculated project cost of ${costStr} exceeds ₹1.40 Lakhs and is within the ₹50 Lakhs limit, placing you squarely in the Term Loan Scheme tier. This tier supports larger MSME capital investments with an 8.0% p.a. interest rate, 7-year repayment window, and a 6-month initial moratorium to help your venture stabilize cash flow.`;
  }

  if (q.includes('how much will i repay') || q.includes('repay')) {
    const totalRepay = formatRupees(repayment?.totalPayment || 0);
    const totalInt = formatRupees(repayment?.totalInterest || 0);
    return `For a potential loan of ${loanStr} at ${interestRate}% p.a. over ${tenureYears} years, your estimated ${freqStr} installment is ${repStr}. Over the full term across ${repayment?.numberOfInstallments || 0} installments, your estimated total repayment is ${totalRepay}, comprising ${loanStr} principal and approximately ${totalInt} in reducing-balance interest.`;
  }

  if (q.includes('moratorium')) {
    return `During the ${moratorium}-month moratorium period, principal repayments are paused to give your enterprise time to install machinery, procure inventory, and generate initial cash flows. Regular repayments of ${repStr} commence from Month ${moratorium + 1}. Please confirm with your implementing agency whether interest is serviced during the moratorium or capitalized into the principal.`;
  }

  if (q.includes('reduce') || q.includes('lower')) {
    return `You can reduce your debt requirement by: 1) Stacking government capital subsidies like PMEGP (15-35% subsidy) or PMFME (35% grant up to ₹10L); 2) Leasing equipment instead of outright purchase; 3) Phase-1 launching with core product lines; and 4) Contributing slightly higher promoter margin above 10%.`;
  }

  if (q.includes('working capital')) {
    const reserve = formatRupees(workingCapital?.recommendedReserve || 0);
    return `For healthy business continuity, we recommend keeping an illustrative working-capital reserve of ${reserve} (${workingCapital?.reserveMonths || 2} months of operating costs). This protects against receivables delays from retail buyers, seasonal raw material surges, and utility fluctuations.`;
  }

  if (q.includes('50,000') || q.includes('50000')) {
    return `With an available margin of ₹50,000, under the 10% margin structure your feasible project cost becomes ₹5,00,000, with potential financing of up to ₹4,50,000 under the Term Loan Scheme (8% p.a., 7 years tenure, 6 months moratorium). This would result in an estimated quarterly repayment of approximately ₹21,248.`;
  }

  if (q.includes('realistic')) {
    const sector = business?.sector || 'your industry';
    return `For a ${sector} business, a project outlay of ${costStr} with ${marginStr} promoter equity is a viable structural starting point. Ensure your project cost breakdown allocates at least 50-60% to revenue-generating machinery/infrastructure and 20-25% to initial inventory and working capital reserves to satisfy bank appraisal criteria.`;
  }

  // General grounded synthesis
  return `Under the configured financial structuring framework for ${business?.name || 'your enterprise'}, your available contribution of ${marginStr} supports an indicative ${costStr} project. Based on this, you qualify for the ${tierName} with potential financing of ${loanStr} at ${interestRate}% p.a. over ${tenureYears} years with a ${moratorium}-month grace period. Estimated ${freqStr} repayment is ${repStr}.`;
}

/**
 * Ask the Grounded AI Financial Advisor
 */
export async function askFundingAdvisor(question, calculationContext) {
  if (!question || !calculationContext) {
    throw new Error('Question and calculation context are required.');
  }

  const {
    margin,
    effectiveProjectCost,
    potentialLoan,
    product,
    repayment,
    affordability,
    workingCapital,
    business,
    personal
  } = calculationContext;

  const payload = {
    provider: 'grok',
    task: {
      type: 'FUNDING_ADVISORY',
      title: 'Smart Financial Structuring Advisory',
      question
    },
    context: {
      businessName: business?.name || 'Venture',
      sector: business?.sector || 'General MSME',
      location: `${personal?.district || ''}, ${personal?.state || 'India'}`,
      financials: {
        availableMargin: margin,
        projectCost: effectiveProjectCost,
        potentialLoan,
        fundingTier: product?.name,
        interestRate: product?.interestRate,
        tenureYears: product?.tenureYears,
        moratoriumMonths: product?.moratoriumMonths,
        repaymentFrequency: repayment?.frequency,
        periodicInstallment: repayment?.installment,
        totalRepayment: repayment?.totalPayment,
        totalInterest: repayment?.totalInterest,
        monthlySurplus: affordability?.monthlySurplus,
        coverageRatio: affordability?.coverageRatio,
        workingCapitalReserve: workingCapital?.recommendedReserve
      }
    },
    question
  };

  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      const ans = data?.structured?.answer;
      if (ans && !ans.includes('establishes verifiable traction') && !ans.includes('executing "')) {
        return {
          answer: ans,
          keyTakeaways: data.structured.whatToDo || [],
          warning: data.structured.warnings || null,
          isLive: Boolean(data.structured.isLive),
          source: data.structured.provider || data.structured.source || 'UdyamSaathi Financial Intelligence'
        };
      }
    }
  } catch (err) {
    console.warn('[FundingAdvisor] Backend proxy unavailable, using deterministic synthesizer:', err.message);
  }

  // Deterministic fallback execution
  const fallbackAnswer = synthesizeDeterministicFundingAdvice(question, calculationContext);
  return {
    answer: fallbackAnswer,
    keyTakeaways: [
      `Structure: ${formatRupees(margin)} own margin → ${formatRupees(effectiveProjectCost)} project cost`,
      `Financing: Up to ${formatRupees(potentialLoan)} under ${product?.name || 'Scheme Tier'}`,
      `Repayment: ${formatRupees(repayment?.installment || 0)} (${repayment?.frequency || 'quarterly'}) after ${product?.moratoriumMonths || 6} mo moratorium`
    ],
    warning: 'Calculations are indicative estimates based on scheme parameters. Formal loan sanction is subject to institutional appraisal.',
    isLive: false,
    source: 'Business Compass Financial Engine'
  };
}
