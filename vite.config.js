import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

function aiProxyPlugin() {
  return {
    name: 'ai-proxy-server',
    configureServer(server) {
      server.middlewares.use('/api/ai', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        const env = loadEnv('development', process.cwd(), '')
        const geminiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
        const grokKey = env.GROQ_API_KEY || env.VITE_GROQ_API_KEY || env.XAI_API_KEY || process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}')
            const { provider, task, context, question, messages, type } = parsed

            const businessName = context?.businessName || context?.name || 'Your Business'
            const sector = context?.sector || 'General'
            const companyDescription = context?.businessDescription || context?.description || context?.productService || context?.domainTitle || ''
            const targetCustomers = context?.targetCustomers || context?.targetAudience || ''
            const taskTitle = task?.title || 'this task'

            // --- A. Conversational Chat Mode for AI Advisor ---
            if (type === 'chat' || messages || (!task && question)) {
              const userQuestion = question || (Array.isArray(messages) && messages[messages.length - 1]?.content) || 'How can I grow my business?'
              const activeGroqKey = grokKey || env.GROQ_API_KEY
              const activeGeminiKey = geminiKey || env.GEMINI_API_KEY

              const systemPrompt = `You are UdyamSaathi AI Business Advisor — an expert digital companion for Indian MSMEs, startups, and entrepreneurs.
Enterprise Profile:
- Business: ${businessName} (${context?.stage || 'IDEA'} stage, ${sector} sector)
- Location: ${context?.location || 'India'} (${context?.areaClassification || 'Urban'})
- Structure: ${context?.type || 'Proprietorship'}
- Financials: Project Cost ${context?.estimatedProjectCost || 'N/A'}, Own Margin ${context?.availableCapital || 'N/A'}, Funding Required ${context?.fundingRequired || 'N/A'}
- Statutory Status: ${context?.registrationStatus || 'Unregistered'}
- 12-Month Goal: ${context?.twelveMonthGoal || 'Commercial launch and revenue stability'}
- Primary Challenge: ${context?.primaryChallenge || 'Navigating government schemes & paperwork'}

Guidelines:
- Provide actionable, factual advice tailored specifically to this business in India.
- Cite relevant government programs with official subsidy/guarantee terms (e.g., PMEGP 25-35% capital subsidy, Mudra loan up to ₹10L, CGTMSE collateral-free guarantee, Stand-Up India, PMFME 35% credit-linked subsidy).
- Highlight statutory steps (Udyam, GST, Shop & Establishment, FSSAI) and bank DPR norms.
- Warn against middlemen fees and unverified external agents.${context?.preferredLanguage && context.preferredLanguage !== 'en' ? `\n- The user's preferred official Indian language is language code "${context.preferredLanguage}". Respond fluently in this language (using natural native phrasing) while keeping official scheme acronyms (PMEGP, Mudra, Udyam, CGTMSE) recognizable.` : ''}
- Format with clean markdown: bold headings, bullet points, and actionable next steps.`

              // 1. Try Live Groq (High Speed)
              if (activeGroqKey) {
                try {
                  const groqHistory = [
                    { role: 'system', content: systemPrompt },
                    ...(Array.isArray(messages) ? messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })) : [{ role: 'user', content: userQuestion }])
                  ]

                  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${activeGroqKey}`
                    },
                    body: JSON.stringify({
                      model: 'openai/gpt-oss-120b',
                      messages: groqHistory,
                      temperature: 0.3,
                      max_tokens: 1200
                    })
                  })

                  if (groqRes.ok) {
                    const groqData = await groqRes.json()
                    const reply = groqData?.choices?.[0]?.message?.content
                    if (reply) {
                      res.setHeader('Content-Type', 'application/json')
                      return res.end(JSON.stringify({
                        success: true,
                        reply: reply.trim(),
                        provider: 'Saathi Tactical Core',
                        isLive: true
                      }))
                    }
                  } else {
                    console.warn('[AI Proxy] Groq chat status:', groqRes.status)
                  }
                } catch (e) {
                  console.warn('[AI Proxy] Groq chat exception, trying Gemini fallback:', e.message)
                }
              }

              // 2. Try Live Gemini
              if (activeGeminiKey) {
                try {
                  const conversationText = Array.isArray(messages)
                    ? messages.map(m => `${m.role === 'assistant' ? 'Advisor' : 'User'}: ${m.content}`).join('\n\n')
                    : `User: ${userQuestion}`

                  const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationText}\n\nAdvisor:`

                  const geminiRes = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${activeGeminiKey}`,
                    {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        contents: [{ parts: [{ text: fullPrompt }] }],
                        generationConfig: { temperature: 0.3, maxOutputTokens: 1200 }
                      })
                    }
                  )

                  if (geminiRes.ok) {
                    const geminiData = await geminiRes.json()
                    const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
                    if (reply) {
                      res.setHeader('Content-Type', 'application/json')
                      return res.end(JSON.stringify({
                        success: true,
                        reply: reply.trim(),
                        provider: 'Saathi Strategic Intelligence',
                        isLive: true
                      }))
                    }
                  }
                } catch (e) {
                  console.warn('[AI Proxy] Gemini chat exception:', e.message)
                }
              }

              // 3. High-Quality Deterministic Advisor Fallback
              const lowerQ = userQuestion.toLowerCase()
              let synthesizedAdvice = ''

              if (lowerQ.includes('scheme') || lowerQ.includes('subsidy')) {
                synthesizedAdvice = `### Top Recommended Government Schemes for ${businessName}\n\n` +
                  `Based on your profile in **${sector}** (${context?.location || 'India'}), here are the most aligned schemes:\n\n` +
                  `1. **Prime Minister's Employment Generation Programme (PMEGP)**\n` +
                  `   - **Subsidy**: 25% (Urban) to 35% (Rural) margin money subsidy for special categories.\n` +
                  `   - **Project Limit**: Up to ₹50 Lakhs for manufacturing, ₹20 Lakhs for service units.\n` +
                  `   - **Own Contribution**: Only 5% to 10% of total project cost.\n\n` +
                  `2. **Pradhan Mantri Mudra Yojana (PMMY)**\n` +
                  `   - **Shishu**: Loans up to ₹50,000 for initial working tools.\n` +
                  `   - **Kishore**: Loans from ₹50,000 to ₹5,00,000 (Ideal for your funding gap).\n` +
                  `   - **Tarun**: Loans up to ₹10,00,000 without collateral.\n\n` +
                  `3. **CGTMSE Credit Guarantee**\n` +
                  `   - Banks extend collateral-free term loans and working capital with 85% credit guarantee coverage from the government.\n\n` +
                  `> **Action Tip**: Apply directly through the official [Udyam Portal](https://udyamregistration.gov.in) and [JanSamarth Portal](https://www.jansamarth.in). Never pay any application fee to unverified intermediaries.`
              } else if (lowerQ.includes('margin') || lowerQ.includes('bank') || lowerQ.includes('loan')) {
                synthesizedAdvice = `### Bank Appraisal & Margin Money Norms for ${businessName}\n\n` +
                  `For your **${context?.estimatedProjectCost || '₹3,00,000'}** project outlay:\n\n` +
                  `• **Own Margin Required**: Under PMEGP and Mudra, banks typically mandate 5% to 15% own contribution (${context?.availableCapital || '₹75,000'} meets this threshold).\n` +
                  `• **Detailed Project Report (DPR)**: Prepare a 3-year projected cash flow, profit & loss statement, and unit cost breakdown.\n` +
                  `• **Bank Current Account**: Open a current account under your registered business name after completing Udyam registration.\n` +
                  `• **Security**: Mudra loans up to ₹10 Lakhs are strictly collateral-free under RBI guidelines.`
              } else if (lowerQ.includes('license') || lowerQ.includes('registration') || lowerQ.includes('compliance')) {
                synthesizedAdvice = `### Mandatory Regulatory Registrations for ${businessName}\n\n` +
                  `To operate legally and unlock institutional benefits in ${context?.location || 'India'}:\n\n` +
                  `1. **Udyam MSME Registration**: 100% free official registration via Aadhaar & PAN on [udyamregistration.gov.in](https://udyamregistration.gov.in).\n` +
                  `2. **Shop & Establishment Act**: Municipal license for premises, staff, and local commercial recognition.\n` +
                  `3. **GST Registration**: Mandatory if annual aggregate turnover exceeds ₹20 Lakhs (Services) or ₹40 Lakhs (Goods), or if selling across state borders.\n` +
                  `4. **Professional Tax & Trade License**: Required by local municipal corporation in ${context?.location || 'your district'}.`
              } else {
                synthesizedAdvice = `### Business Growth & Strategic Roadmap for ${businessName}\n\n` +
                  `For an enterprise in the **${sector}** sector at the **${context?.stage || 'IDEA'}** stage:\n\n` +
                  `1. **Customer Demand Validation**: Secure initial non-binding pre-orders or letters of intent from 10–20 prospective clients to prove market pull.\n` +
                  `2. **Formal Entity Setup**: Complete Udyam MSME registration to establish priority lending status.\n` +
                  `3. **Government Credit Linkage**: Apply for collateral-free credit on the JanSamarth single-window portal under PMEGP or Mudra.\n` +
                  `4. **Digital Presence**: List on local search directories, Google Business Profile, and open a dedicated business banking channel.\n\n` +
                  `*Feel free to ask specific questions about any scheme, loan sizing, or legal requirement!*`
              }

              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({
                success: true,
                reply: synthesizedAdvice,
                provider: 'UdyamSaathi Deterministic MSME Intelligence',
                isLive: false
              }))
            }

            const isFunding = task?.type === 'FUNDING_ADVISORY'
            const systemRole = isFunding
              ? `You are an expert MSME Financial Structuring Advisor for an Indian rural & micro entrepreneur. Ground your advice strictly in the provided deterministic calculations: ${JSON.stringify(context?.financials || {})}. Never invent interest rates or sanction guarantees.`
              : `You are an expert Indian MSME Business Advisor.`

            // 1. Live Groq Execution (High priority, fast and verified)
            const activeGroqKey = grokKey || env.GROQ_API_KEY
            if (activeGroqKey) {
              try {
                const prompt = isFunding
                  ? `${systemRole}
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Topic: ${taskTitle}.
Context Details: ${JSON.stringify(context?.financials || {})}.
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
}`

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
                })

                if (groqRes.ok) {
                  const groqData = await groqRes.json()
                  const rawContent = groqData?.choices?.[0]?.message?.content
                  if (rawContent) {
                    const structured = JSON.parse(rawContent)
                    res.setHeader('Content-Type', 'application/json')
                    return res.end(JSON.stringify({ success: true, structured: { ...structured, provider: 'Saathi Tactical Core', isLive: true } }))
                  }
                } else {
                  const errText = await groqRes.text()
                  console.warn('[AI Proxy] Groq response error:', groqRes.status, errText)
                }
              } catch (e) {
                console.warn('[AI Proxy] Live Groq call failed, trying Gemini:', e.message)
              }
            }

            // 2. Live Gemini Execution (Fallback)
            const activeGeminiKey = geminiKey || env.GEMINI_API_KEY
            if (activeGeminiKey) {
              try {
                const prompt = isFunding
                  ? `${systemRole}
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Topic: ${taskTitle}.
Context Details: ${JSON.stringify(context?.financials || {})}.
User Question: ${question || 'How should I structure my finances?'}.

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, encouraging, jargon-free explanation grounded in the provided figures",
  "why": "Financial context or reason for this structure",
  "whatToDo": ["Key insight 1", "Key insight 2", "Key insight 3"],
  "documents": "Mandatory financial documents like project report or 'None required'",
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
}`

                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeGeminiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: [{ parts: [{ text: prompt }] }],
                      generationConfig: { responseMimeType: 'application/json' }
                    })
                  }
                )

                if (geminiRes.ok) {
                  const geminiData = await geminiRes.json()
                  const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
                  if (rawText) {
                    const structured = JSON.parse(rawText)
                    res.setHeader('Content-Type', 'application/json')
                    return res.end(JSON.stringify({ success: true, structured: { ...structured, provider: 'Saathi Strategic Intelligence', isLive: true } }))
                  }
                } else {
                  const errText = await geminiRes.text()
                  console.warn('[AI Proxy] Gemini response error:', geminiRes.status, errText)
                }
              } catch (e) {
                console.warn('[AI Proxy] Live Gemini call failed, returning fallback:', e.message)
              }
            }

            // Tailored structured response for offline/fallback
            let structured
            if (isFunding) {
              const fin = context?.financials || {}
              const qLower = (question || '').toLowerCase()
              let answer = `Under the configured PS26091 financial model, your available margin of ₹${(fin.availableMargin || 100000).toLocaleString('en-IN')} supports an indicative project outlay of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}. This qualifies you for the ${fin.fundingTier || 'Term Loan Scheme'} with potential financing of up to ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} at ${fin.interestRate || 8}% p.a. over ${fin.tenureYears || 7} years.`

              if (qLower.includes('afford')) {
                answer = `Based on your numbers, your available margin of ₹${(fin.availableMargin || 100000).toLocaleString('en-IN')} supports an indicative ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')} project. With an estimated ${fin.repaymentFrequency || 'quarterly'} repayment of ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')} (~₹${(fin.monthlyEquivalent || 14097).toLocaleString('en-IN')}/mo) and a projected monthly surplus of ₹${(fin.monthlySurplus || 55000).toLocaleString('en-IN')}, your repayment coverage ratio is approximately ${fin.coverageRatio || 3.9}x (Comfortable).`
              } else if (qLower.includes('how much should i borrow') || qLower.includes('how much to borrow')) {
                answer = `For a project cost of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}, your maximum potential loan is ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} (90% debt financing). However, prudent practice advises borrowing only what is strictly required for essential machinery and 2-3 months of working capital to keep your debt service burden low.`
              } else if (qLower.includes('tier') || qLower.includes('why')) {
                answer = `Your project outlay of ₹${(fin.projectCost || 1000000).toLocaleString('en-IN')} falls into the ${fin.fundingTier || 'Term Loan Scheme'} (for projects between ₹1.40 Lakh and ₹50 Lakh). This tier provides an 8.0% p.a. interest rate, a 7-year repayment tenure, and a 6-month moratorium grace period.`
              } else if (qLower.includes('repay')) {
                answer = `For a potential loan of ₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')} at ${fin.interestRate || 8}% p.a., your estimated ${fin.repaymentFrequency || 'quarterly'} installment is ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')}. Over ${fin.tenureYears || 7} years, your estimated total repayment is ₹${(fin.totalRepayment || 1184148).toLocaleString('en-IN')}, including ₹${(fin.totalInterest || 284148).toLocaleString('en-IN')} in interest.`
              } else if (qLower.includes('moratorium')) {
                answer = `During the ${fin.moratoriumMonths || 6}-month moratorium grace period, no principal repayments are due. Regular repayments of ₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')} commence from Month ${(fin.moratoriumMonths || 6) + 1}.`
              } else if (qLower.includes('reduce')) {
                answer = `You can reduce your debt requirement by: 1) Stacking government capital subsidies like PMEGP (15-35% subsidy) or PMFME (35% grant up to ₹10L); 2) Contributing higher promoter margin above 10%; and 3) Phasing machinery purchases.`
              } else if (qLower.includes('working capital')) {
                answer = `For your venture, we recommend keeping an illustrative working capital reserve of ₹${(fin.workingCapitalReserve || 130000).toLocaleString('en-IN')} (2 months of operating expenses) to safeguard against payment delays.`
              } else if (qLower.includes('50,000') || qLower.includes('50000')) {
                answer = `With ₹50,000 margin, under the 10% model your feasible project cost becomes ₹5,00,000, with potential financing of ₹4,50,000 under the Term Loan Scheme (8% p.a., 7 years tenure, 6 months moratorium).`
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
                source: 'Saathi Strategic Intelligence',
                isLive: false
              }
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
                source: provider === 'gemini' ? 'Saathi Strategic Intelligence' : 'Saathi Tactical Action Engine',
                isLive: Boolean((provider === 'gemini' && geminiKey) || (provider === 'grok' && grokKey))
              }
            }

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, structured }))
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: error.message }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aiProxyPlugin()],
})
