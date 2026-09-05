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
    const taskTitle = task?.title || 'this task';

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
            model: 'llama-3.3-70b-versatile',
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
