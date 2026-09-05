/**
 * Vercel Serverless Function for /api/ai
 * Provides server-side Gemini/Grok calls in deployed environments.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  try {
    const { provider, task, context, question } = req.body || {};
    const businessName = context?.businessName || 'Your Business';
    const sector = context?.sector || 'General';
    const companyDescription = context?.businessDescription || context?.description || context?.productService || context?.domainTitle || '';
    const targetCustomers = context?.targetCustomers || context?.targetAudience || '';
    const taskTitle = task?.title || 'this task';

    const isFunding = task?.type === 'FUNDING_ADVISORY';
    const systemRole = isFunding
      ? `You are an expert MSME Financial Structuring Advisor for an Indian rural & micro entrepreneur. Ground your advice strictly in the provided deterministic calculations: ${JSON.stringify(context?.financials || {})}. Never invent interest rates or sanction guarantees.`
      : `You are an expert Indian MSME Business Advisor.`;

    if (provider === 'gemini' && geminiKey) {
      try {
        const prompt = isFunding
          ? `${systemRole}
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Topic: ${taskTitle}.
Context Details: ${JSON.stringify(context?.financials || {})}.
User Question: ${question || 'How should I structure my finances?'}.

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, encouraging, jargon-free explanation grounded strictly in the provided figures",
  "why": "Financial context or reason for this structure",
  "whatToDo": ["Key insight 1", "Key insight 2", "Key insight 3"],
  "documents": "Mandatory financial documents or 'None required'",
  "nextStep": "Recommended next financial step",
  "warnings": "Important financial or compliance risk to avoid"
}`
          : `You are an expert AI Business Advisor for an Indian micro-enterprise entrepreneur.
Business Name: ${businessName}
Location: ${context?.location || 'India'}
What this business actually makes / provides: ${companyDescription || sector}
Target Customers: ${targetCustomers || 'Local buyers'}
Registered Sector: ${sector}
Current Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
User Question: ${question || 'How do I complete this task efficiently?'}.

Important instruction: Base your advice strictly on what this company actually makes and does (${companyDescription || sector}). Do NOT make generic assumptions or confuse their trade with unrelated sectors.

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, jargon-free summary answering the question tailored to what this company actually does",
  "why": "Why this task is critical for this specific business",
  "whatToDo": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "documents": "Mandatory documents or 'None required'",
  "nextStep": "What unlocking happens next",
  "warnings": "Important warning or compliance trap to avoid"
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const structured = JSON.parse(rawText);
            return res.status(200).json({ success: true, structured });
          }
        }
      } catch (e) {
        console.warn('Vercel serverless live call failed:', e);
      }
    }

    // Live Groq Execution
    if (grokKey || process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY) {
      const activeGroqKey = grokKey || process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
      try {
        const prompt = isFunding
          ? `${systemRole}
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Grounded Financial Calculations: ${JSON.stringify(context?.financials || {})}.
User Question: ${question || 'How should I structure my finances?'}.

Respond ONLY with valid JSON containing:
{
  "answer": "Clear, encouraging, jargon-free explanation grounded strictly in the provided figures (e.g. loan amount, margin, interest, repayment)",
  "why": "Financial context or reason for this structure",
  "whatToDo": ["Key insight 1", "Key insight 2", "Key insight 3"],
  "documents": "Mandatory financial documents or 'None required'",
  "nextStep": "Recommended next financial step",
  "warnings": "Important financial or compliance risk to avoid"
}`
          : `You are an expert Indian MSME & startup advisor.
Business Name: ${businessName}
Location: ${context?.location || 'India'}
What this business actually makes / provides: ${companyDescription || sector}
Target Customers: ${targetCustomers || 'Local buyers'}
Registered Sector: ${sector}
Current Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
Question: ${question || 'How do I execute this task step-by-step?'}.

Important instruction: Base your advice strictly on what this company actually makes and does (${companyDescription || sector}). Do NOT make generic assumptions or confuse their trade with unrelated sectors.

Respond ONLY with valid JSON containing:
{
  "answer": "Concise, actionable advice tailored to what this company actually makes and provides",
  "why": "Why this specific step is critical for bank credit or government compliance for this exact business",
  "whatToDo": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "documents": "Mandatory paperwork or 'None required'",
  "nextStep": "What will be unlocked next",
  "warnings": "Common fraud, agent fee, or compliance trap to avoid"
}`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeGroqKey}`
          },
          body: JSON.stringify({
            model: 'groq/compound-mini',
            max_tokens: 500,
            messages: [
              { role: 'system', content: isFunding ? 'You are an expert MSME Financial Advisor. Always respond in valid JSON format.' : 'You are an expert MSME Business Advisor on Indian government schemes and compliance. Always respond in valid JSON format.' },
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' }
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const rawContent = groqData?.choices?.[0]?.message?.content;
          if (rawContent) {
            const structured = JSON.parse(rawContent);
            return res.status(200).json({ success: true, structured: { ...structured, provider: 'Groq (Ultra-Fast Cloud)', isLive: true } });
          }
        }
      } catch (e) {
        console.warn('Groq serverless live call failed:', e);
      }
    }

    // Default structured response
    let structured;
    if (isFunding) {
      const fin = context?.financials || {};
      const qLower = (question || '').toLowerCase();
      let answer = `Under the configured PS26091 financial model, your available margin of ₹${(fin.availableMargin || 100000).toLocaleString('en-IN')} supports an indicative project outlay of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}. This qualifies you for the ${fin.fundingTier || 'Term Loan Scheme'} with potential financing of up to ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} at ${fin.interestRate || 8}% p.a. over ${fin.tenureYears || 7} years.`;

      if (qLower.includes('afford')) {
        answer = `Based on your numbers, your available margin of ₹${(fin.availableMargin || 100000).toLocaleString('en-IN')} supports an indicative ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')} project. With an estimated ${fin.repaymentFrequency || 'quarterly'} repayment of ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')} (~₹${(fin.monthlyEquivalent || 14097).toLocaleString('en-IN')}/mo) and a projected monthly surplus of ₹${(fin.monthlySurplus || 55000).toLocaleString('en-IN')}, your repayment coverage ratio is approximately ${fin.coverageRatio || 3.9}x (Comfortable).`;
      } else if (qLower.includes('how much should i borrow') || qLower.includes('how much to borrow')) {
        answer = `For a project cost of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}, your maximum potential loan is ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} (90% debt financing). However, prudent practice advises borrowing only what is strictly required for essential machinery and 2-3 months of working capital to keep your debt service burden low.`;
      } else if (qLower.includes('tier') || qLower.includes('why')) {
        answer = `Your project outlay of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')} falls into the ${fin.fundingTier || 'Term Loan Scheme'} (for projects between ₹1.40 Lakh and ₹50 Lakh). This tier provides an 8.0% p.a. interest rate, a 7-year repayment tenure, and a 6-month moratorium grace period.`;
      } else if (qLower.includes('repay')) {
        answer = `For a potential loan of ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} at ${fin.interestRate || 8}% p.a., your estimated ${fin.repaymentFrequency || 'quarterly'} installment is ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')}. Over ${fin.tenureYears || 7} years, your estimated total repayment is ₹${(fin.totalRepayment || 1184148).toLocaleString('en-IN')}, including ₹${(fin.totalInterest || 284148).toLocaleString('en-IN')} in interest.`;
      } else if (qLower.includes('moratorium')) {
        answer = `During the ${fin.moratoriumMonths || 6}-month moratorium grace period, no principal repayments are due. Regular repayments of ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')} commence from Month ${(fin.moratoriumMonths || 6) + 1}.`;
      } else if (qLower.includes('reduce')) {
        answer = `You can reduce your debt requirement by: 1) Stacking government capital subsidies like PMEGP (15-35% subsidy) or PMFME (35% grant up to ₹10L); 2) Contributing higher promoter margin above 10%; and 3) Phasing machinery purchases.`;
      } else if (qLower.includes('working capital')) {
        answer = `For your venture, we recommend keeping an illustrative working capital reserve of ₹${(fin.workingCapitalReserve || 130000).toLocaleString('en-IN')} (2 months of operating expenses) to safeguard against payment delays.`;
      } else if (qLower.includes('50,000') || qLower.includes('50000')) {
        answer = `With ₹50,000 margin, under the 10% model your feasible project cost becomes ₹5,00,000, with potential financing of ₹4,50,000 under the Term Loan Scheme (8% p.a., 7 years tenure, 6 months moratorium).`;
      }

      structured = {
        answer,
        why: `Structured under configured PS26091 ${fin.fundingTier || 'Term Loan'} parameters.`,
        whatToDo: [
          `Project Outlay: ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}`,
          `Potential Loan: ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')}`,
          `Repayment: ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')} (${fin.repaymentFrequency || 'quarterly'})`
        ],
        documents: 'Detailed Project Report (DPR), quotation for machinery, Udyam registration',
        nextStep: 'Consolidate vendor quotations and register on Udyam portal',
        warnings: 'Loan figures are estimates based on scheme parameters. Sanction is subject to bank underwriting.',
        source: 'Business Compass Financial Intelligence',
        isLive: false
      };
    } else {
      structured = {
        answer: `For ${businessName} in ${sector}, executing "${taskTitle}" establishes verifiable traction required by banks and government schemes.`,
        why: task?.whyThisMatters || 'Essential for mitigating risk and meeting official underwriting standards.',
        whatToDo: task?.whatToDo || [
          `Define specific parameters for ${taskTitle}.`,
          'Verify against local government guidelines or bank appraisal forms.',
          'Record evidence in UdyamSaathi to unlock subsequent milestones.'
        ],
        documents: task?.requiredDocuments?.length > 0
          ? `Required: ${task.requiredDocuments.join(', ')}`
          : 'No statutory attachments required.',
        nextStep: task?.unlocks?.length > 0
          ? `Completing this unlocks: ${task.unlocks.join(', ')}`
          : 'Proceed to next milestone in roadmap.',
        warnings: 'Never pay intermediaries for free central government registrations (Udyam, FoSCoS).',
        source: 'Business Compass Intelligence',
        isLive: false
      };
    }

    return res.status(200).json({ success: true, structured });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
