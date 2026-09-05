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
            const { provider, task, context, question } = parsed

            const businessName = context?.businessName || 'Your Business'
            const sector = context?.sector || 'General'
            const companyDescription = context?.businessDescription || context?.description || context?.productService || context?.domainTitle || ''
            const targetCustomers = context?.targetCustomers || context?.targetAudience || ''
            const taskTitle = task?.title || 'this task'

            // 1. Live Gemini Execution
            if (provider === 'gemini' && geminiKey) {
              try {
                const prompt = `You are an expert AI Business Advisor for an Indian micro-enterprise entrepreneur.
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

