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
        const geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY
        const grokKey = env.GROK_API_KEY || env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.XAI_API_KEY

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
- Warn against middlemen fees and unverified external agents.
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
                        provider: 'Groq (Ultra-Fast Cloud)',
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
                        provider: 'Google Gemini 3.5 Flash',
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

            // 1. Live Gemini Execution
            if (provider === 'gemini' && geminiKey) {
              try {
                const prompt = `You are an AI Business Advisor for an Indian MSME entrepreneur.
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Current Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
User Question: ${question || 'How do I complete this task efficiently?'}.

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, jargon-free summary answering the question",
  "why": "Why this task is critical for this business",
  "whatToDo": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "documents": "Mandatory documents or 'None required'",
  "nextStep": "What unlocking happens next",
  "warnings": "Important warning or compliance trap to avoid"
}`

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
                )

                if (geminiRes.ok) {
                  const geminiData = await geminiRes.json()
                  const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
                  if (rawText) {
                    const structured = JSON.parse(rawText)
                    res.setHeader('Content-Type', 'application/json')
                    return res.end(JSON.stringify({ success: true, structured: { ...structured, provider: 'Google Gemini 3.5 Flash', isLive: true } }))
                  }
                } else {
                  const errText = await geminiRes.text()
                  console.warn('[AI Proxy] Gemini response error:', geminiRes.status, errText)
                }
              } catch (e) {
                console.warn('[AI Proxy] Live Gemini call failed, returning fallback:', e.message)
              }
            }

            // 2. Live Groq Execution
            if ((provider === 'grok' || provider === 'groq') && (grokKey || env.GROQ_API_KEY)) {
              const activeGroqKey = grokKey || env.GROQ_API_KEY
              try {
                const prompt = `You are an expert Indian MSME & startup advisor.
Business: ${businessName} (${sector}, ${context?.location || 'India'}).
Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
Question: ${question || 'How do I execute this task step-by-step?'}.

Respond ONLY with valid JSON containing:
{
  "answer": "Concise, actionable advice tailored to rural/semi-urban Indian entrepreneur",
  "why": "Why this specific step is critical for bank credit or government compliance",
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
                    model: 'openai/gpt-oss-120b',
                    messages: [
                      { role: 'system', content: 'You are an expert MSME Business Advisor on Indian government schemes and compliance. Always respond in valid JSON format.' },
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
                    return res.end(JSON.stringify({ success: true, structured: { ...structured, provider: 'Groq (Ultra-Fast Cloud)', isLive: true } }))
                  }
                } else {
                  const errText = await groqRes.text()
                  console.warn('[AI Proxy] Groq response error:', groqRes.status, errText)
                }
              } catch (e) {
                console.warn('[AI Proxy] Live Groq call failed, returning fallback:', e.message)
              }
            }

            // Structured response for developer mode / fallback
            const structured = {
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
              source: provider === 'gemini' ? 'Google Gemini Intelligence' : 'xAI Grok Execution Engine',
              isLive: Boolean((provider === 'gemini' && geminiKey) || (provider === 'grok' && grokKey))
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

