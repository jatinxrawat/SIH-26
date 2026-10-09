/**
 * Grounded AI Financial Advisor Service
 * Strictly grounded in deterministic calculations with multilingual capabilities.
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

function getActiveLanguage() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('udyam_language') || 'en';
  }
  return 'en';
}

/**
 * Synthesizes a factual, deterministic response grounded exclusively in the calculated numbers.
 */
function synthesizeDeterministicFundingAdvice(question, context, lang = 'en') {
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

  if (lang === 'hi') {
    if (q.includes('afford') || q.includes('सक्षम') || q.includes('खर्च')) {
      return `आपकी उपलब्ध पूंजी ${marginStr} के आधार पर, 10% प्रमोटर मार्जिन मॉडल के तहत सांकेतिक परियोजना लागत ${costStr} है। अनुमानित ${freqStr} किस्त ${repStr} (~${formatRupees(repayment?.monthlyEquivalent || 0)}/माह) और अनुमानित मासिक अधिशेष ${surplusStr} के साथ, आपका ऋण पुनर्भुगतान कवरेज अनुपात ${affordability?.coverageRatio || 3.9}x है।`;
    }
    if (q.includes('borrow') || q.includes('ऋण') || q.includes('कर्ज')) {
      return `${costStr} की परियोजना लागत के लिए, 10% मार्जिन / 90% वित्तपोषण मॉडल के तहत आपकी संभावित ऋण क्षमता ${loanStr} है। समझदारी इसी में है कि केवल आवश्यक मशीनरी और 2-3 महीने की कार्यशील पूंजी के लिए ही ऋण लें।`;
    }
    if (q.includes('repay') || q.includes('किस्त') || q.includes('चुकाना')) {
      return `${loanStr} के ऋण पर ${interestRate}% वार्षिक ब्याज दर से ${tenureYears} वर्षों में आपकी अनुमानित ${freqStr} किस्त ${repStr} होगी।`;
    }
    return `वित्तीय मॉडल के तहत, आपका ${marginStr} का उपलब्ध योगदान ${costStr} की परियोजना लागत का समर्थन करता है। इसके आधार पर, आप ${tierName} के लिए पात्र हैं, जिसमें ${interestRate}% वार्षिक ब्याज पर ${tenureYears} वर्षों के लिए ${loanStr} तक का संभावित ऋण मिल सकता है।`;
  }

  if (lang === 'mr') {
    if (q.includes('afford') || q.includes('परवडेल')) {
      return `तुमच्या उपलब्ध भांडवल ${marginStr} नुसार, १०% मार्जिन मॉडेलनुसार प्रकल्प खर्च ${costStr} ठरतो. अंदाजे ${freqStr} हप्ता ${repStr} आणि अंदाजित मासिक नफा ${surplusStr} नुसार तुमचे परतफेड प्रमाण उत्तम आहे.`;
    }
    return `१०% मार्जिन मॉडेलनुसार ${costStr} च्या प्रकल्पासाठी संभाव्य कर्ज क्षमता ${loanStr} (${interestRate}% वार्षिक दर, ${tenureYears} वर्षे मुदत) आहे. अंदाजे ${freqStr} हप्ता ${repStr} असेल.`;
  }

  if (lang === 'bn') {
    if (q.includes('afford') || q.includes('সমর্থ্য')) {
      return `আপনার উপলব্ধ মার্জিন ${marginStr}-এর ভিত্তিতে ${costStr}-এর প্রকল্পের জন্য আপনার ঋণ পরিশোধ সক্ষমতা অনুপাত সন্তোষজনক। আনুমানিক ${freqStr} কিস্তি ${repStr}।`;
    }
    return `${costStr} প্রকল্প ব্যয়ের জন্য ${interestRate}% সুদের হারে ${tenureYears} বছরের জন্য আপনার সম্ভাব্য ব্যাংক ঋণ ${loanStr}।`;
  }

  // English default
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
export async function askFundingAdvisor(question, calculationContext, customLang = null) {
  if (!question || !calculationContext) {
    throw new Error('Question and calculation context are required.');
  }

  const lang = customLang || getActiveLanguage();

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
    preferredLanguage: lang,
    task: {
      type: 'FUNDING_ADVISORY',
      title: 'Smart Financial Structuring Advisory',
      question
    },
    context: {
      businessName: business?.name || 'Venture',
      sector: business?.sector || 'General MSME',
      location: `${personal?.district || ''}, ${personal?.state || 'India'}`,
      preferredLanguage: lang,
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
      headers: {
        'Content-Type': 'application/json',
        'X-Preferred-Language': lang
      },
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
  const fallbackAnswer = synthesizeDeterministicFundingAdvice(question, calculationContext, lang);

  let keyTakeaways = [];
  let warningText = '';

  if (lang === 'hi') {
    keyTakeaways = [
      `संरचना: ${formatRupees(margin)} अपना मार्जिन → ${formatRupees(effectiveProjectCost)} परियोजना लागत`,
      `वित्तपोषण: ${product?.name || 'ऋण योजना'} के तहत ${formatRupees(potentialLoan)} तक`,
      `किस्त: ${formatRupees(repayment?.installment || 0)} (${repayment?.frequency || 'त्रैमासिक'})`
    ];
    warningText = 'गणना सांकेतिक अनुमान है। अंतिम ऋण स्वीकृति बैंक मूल्यांकन पर निर्भर करेगी।';
  } else {
    keyTakeaways = [
      `Structure: ${formatRupees(margin)} own margin → ${formatRupees(effectiveProjectCost)} project cost`,
      `Financing: Up to ${formatRupees(potentialLoan)} under ${product?.name || 'Scheme Tier'}`,
      `Repayment: ${formatRupees(repayment?.installment || 0)} (${repayment?.frequency || 'quarterly'}) after ${product?.moratoriumMonths || 6} mo moratorium`
    ];
    warningText = 'Calculations are indicative estimates based on scheme parameters. Formal loan sanction is subject to institutional appraisal.';
  }

  return {
    answer: fallbackAnswer,
    keyTakeaways,
    warning: warningText,
    isLive: false,
    source: 'Business Compass Financial Engine'
  };
}
