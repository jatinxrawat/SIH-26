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
    const { provider, task, context, question, messages, type } = req.body || {};
    const businessName = context?.businessName || context?.name || 'Your Business';
    const sector = context?.sector || 'General';
    const taskTitle = task?.title || 'this task';

    // --- A. Conversational Chat Mode for AI Advisor ---
    if (type === 'chat' || messages || (!task && question)) {
      const userQuestion = question || (Array.isArray(messages) && messages[messages.length - 1]?.content) || 'How can I grow my business?';
      const activeGroqKey = grokKey || process.env.GROQ_API_KEY;
      const activeGeminiKey = geminiKey || process.env.GEMINI_API_KEY;

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
- Cite relevant government programs with official subsidy/guarantee terms (e.g. PMEGP 25-35% capital subsidy, Mudra loan up to ₹10L, CGTMSE collateral-free guarantee, Stand-Up India, PMFME 35% credit-linked subsidy).
- Highlight statutory steps (Udyam, GST, Shop & Establishment, FSSAI) and bank DPR norms.
- Warn against middlemen fees and unverified external agents.
- Format with clean markdown: bold headings, bullet points, and actionable next steps.`;

      if (activeGroqKey) {
        try {
          const groqHistory = [
            { role: 'system', content: systemPrompt },
            ...(Array.isArray(messages) ? messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })) : [{ role: 'user', content: userQuestion }])
          ];

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
          });

          if (groqRes.ok) {
            const groqData = await groqRes.json();
            const reply = groqData?.choices?.[0]?.message?.content;
            if (reply) {
              return res.status(200).json({
                success: true,
                reply: reply.trim(),
                provider: 'Groq (Ultra-Fast Cloud)',
                isLive: true
              });
            }
          }
        } catch (e) {
          console.warn('Groq serverless chat exception:', e);
        }
      }

      if (activeGeminiKey) {
        try {
          const conversationText = Array.isArray(messages)
            ? messages.map(m => `${m.role === 'assistant' ? 'Advisor' : 'User'}: ${m.content}`).join('\n\n')
            : `User: ${userQuestion}`;

          const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationText}\n\nAdvisor:`;

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
          );

          if (geminiRes.ok) {
            const geminiData = await geminiRes.json();
            const reply = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              return res.status(200).json({
                success: true,
                reply: reply.trim(),
                provider: 'Google Gemini 3.5 Flash',
                isLive: true
              });
            }
          }
        } catch (e) {
          console.warn('Gemini serverless chat exception:', e);
        }
      }
    }

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
    if ((provider === 'grok' || provider === 'groq') && (grokKey || process.env.GROQ_API_KEY)) {
      const activeGroqKey = grokKey || process.env.GROQ_API_KEY;
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
}`;

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
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const rawContent = groqData?.choices?.[0]?.message?.content;
          if (rawContent) {
            const structured = JSON.parse(rawContent);
            return res.status(200).json({ success: true, structured });
          }
        }
      } catch (e) {
        console.warn('Groq serverless live call failed:', e);
      }
    }

    // Default structured response
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
    };

    return res.status(200).json({ success: true, structured });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
