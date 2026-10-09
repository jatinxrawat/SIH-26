/**
 * Vercel Serverless Function for /api/ai
 * Provides server-side Gemini/Grok calls with strict multilingual enforcement.
 */

const LANGUAGE_MAP = {
  en: { name: 'English', native: 'English', script: 'Latin' },
  hi: { name: 'Hindi', native: 'हिन्दी', script: 'Devanagari' },
  mr: { name: 'Marathi', native: 'मराठी', script: 'Devanagari' },
  bn: { name: 'Bengali', native: 'বাংলা', script: 'Bengali' },
  gu: { name: 'Gujarati', native: 'ગુજરાતી', script: 'Gujarati' },
  ta: { name: 'Tamil', native: 'தமிழ்', script: 'Tamil' },
  te: { name: 'Telugu', native: 'తెలుగు', script: 'Telugu' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Kannada' },
  ml: { name: 'Malayalam', native: 'മലയാളം', script: 'Malayalam' },
  pa: { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  or: { name: 'Odia', native: 'ଓଡ଼ିଆ', script: 'Odia' },
  as: { name: 'Assamese', native: 'অসমীয়া', script: 'Bengali-Assamese' },
  ur: { name: 'Urdu', native: 'اردو', script: 'Perso-Arabic' },
  sa: { name: 'Sanskrit', native: 'संस्कृतम्', script: 'Devanagari' },
  mai: { name: 'Maithili', native: 'मैथिली', script: 'Devanagari' },
  ne: { name: 'Nepali', native: 'नेपाली', script: 'Devanagari' },
  kok: { name: 'Konkani', native: 'कोंकणी', script: 'Devanagari' },
  sd: { name: 'Sindhi', native: 'सिंधी', script: 'Devanagari/Arabic' },
  ks: { name: 'Kashmiri', native: 'कॉशुर', script: 'Perso-Arabic/Devanagari' },
  doi: { name: 'Dogri', native: 'डोगरी', script: 'Devanagari' },
  mni: { name: 'Manipuri', native: 'মৈতৈলোন্', script: 'Bengali' },
  brx: { name: 'Bodo', native: 'बड़ो', script: 'Devanagari' },
  sat: { name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki' }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const grokKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  try {
    const { provider, task, context, question, messages, type, preferredLanguage: bodyLang } = req.body || {};
    const langCode = bodyLang || context?.preferredLanguage || 'en';
    const langInfo = LANGUAGE_MAP[langCode] || LANGUAGE_MAP.en;

    const businessName = context?.businessName || context?.name || 'Your Business';
    const sector = context?.sector || 'General';
    const companyDescription = context?.businessDescription || context?.description || context?.productService || context?.domainTitle || '';
    const targetCustomers = context?.targetCustomers || context?.targetAudience || '';
    const taskTitle = task?.title || 'this task';

    const langDirective = langCode !== 'en'
      ? `\n\nCRITICAL LANGUAGE INSTRUCTION:\nThe user has selected ${langInfo.name} (${langInfo.native}, code: ${langCode}, script: ${langInfo.script}) as their language.\nYou MUST write your entire response, including all explanations, steps, warnings, document names, and headings, strictly in ${langInfo.name} using natural native phrasing.\nKeep standard government scheme acronyms (PMEGP, Mudra, Udyam, CGTMSE, GST, PAN, FSSAI) and numerical figures with currency (₹) legible.\nDo NOT mix English sentences into the output.`
      : '';

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
- Format with clean markdown: bold headings, bullet points, and actionable next steps.${langDirective}`;

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
                provider: 'Saathi Tactical Core',
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
                provider: 'Saathi Strategic Intelligence',
                isLive: true
              });
            }
          }
        } catch (e) {
          console.warn('Gemini serverless chat exception:', e);
        }
      }
    }

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
User Question: ${question || 'How should I structure my finances?'}.${langDirective}

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, encouraging explanation grounded strictly in the provided figures in ${langInfo.name}",
  "why": "Financial context or reason for this structure in ${langInfo.name}",
  "whatToDo": ["Key insight 1 in ${langInfo.name}", "Key insight 2 in ${langInfo.name}", "Key insight 3 in ${langInfo.name}"],
  "documents": "Mandatory financial documents or 'None required' in ${langInfo.name}",
  "nextStep": "Recommended next financial step in ${langInfo.name}",
  "warnings": "Important financial or compliance risk in ${langInfo.name}"
}`
          : `You are an expert AI Business Advisor for an Indian micro-enterprise entrepreneur.
Business Name: ${businessName}
Location: ${context?.location || 'India'}
What this business actually makes / provides: ${companyDescription || sector}
Target Customers: ${targetCustomers || 'Local buyers'}
Registered Sector: ${sector}
Current Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
User Question: ${question || 'How do I complete this task efficiently?'}.${langDirective}

Important instruction: Base your advice strictly on what this company actually makes and does (${companyDescription || sector}). Do NOT make generic assumptions or confuse their trade with unrelated sectors.

Provide a response in JSON format with exactly these keys:
{
  "answer": "Clear, summary answering the question tailored to what this company actually does in ${langInfo.name}",
  "why": "Why this task is critical for this specific business in ${langInfo.name}",
  "whatToDo": ["Step 1 in ${langInfo.name}", "Step 2 in ${langInfo.name}", "Step 3 in ${langInfo.name}", "Step 4 in ${langInfo.name}"],
  "documents": "Mandatory documents in ${langInfo.name}",
  "nextStep": "What unlocking happens next in ${langInfo.name}",
  "warnings": "Important warning or compliance trap in ${langInfo.name}"
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
            return res.status(200).json({ success: true, structured: { ...structured, provider: 'Saathi Strategic Intelligence', isLive: true } });
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
User Question: ${question || 'How should I structure my finances?'}.${langDirective}

Respond ONLY with valid JSON containing:
{
  "answer": "Clear, encouraging explanation grounded strictly in the provided figures in ${langInfo.name}",
  "why": "Financial context or reason in ${langInfo.name}",
  "whatToDo": ["Key insight 1 in ${langInfo.name}", "Key insight 2 in ${langInfo.name}", "Key insight 3 in ${langInfo.name}"],
  "documents": "Mandatory financial documents in ${langInfo.name}",
  "nextStep": "Recommended next financial step in ${langInfo.name}",
  "warnings": "Important financial risk in ${langInfo.name}"
}`
          : `You are an expert Indian MSME & startup advisor.
Business Name: ${businessName}
Location: ${context?.location || 'India'}
What this business actually makes / provides: ${companyDescription || sector}
Target Customers: ${targetCustomers || 'Local buyers'}
Registered Sector: ${sector}
Current Task: ${taskTitle}.
Context: ${JSON.stringify(task || {})}.
Question: ${question || 'How do I execute this task step-by-step?'}.${langDirective}

Important instruction: Base your advice strictly on what this company actually makes and does (${companyDescription || sector}).

Respond ONLY with valid JSON containing:
{
  "answer": "Concise, actionable advice tailored to what this company makes in ${langInfo.name}",
  "why": "Why this specific step is critical for bank credit or government compliance in ${langInfo.name}",
  "whatToDo": ["Step 1 in ${langInfo.name}", "Step 2 in ${langInfo.name}", "Step 3 in ${langInfo.name}", "Step 4 in ${langInfo.name}"],
  "documents": "Mandatory paperwork in ${langInfo.name}",
  "nextStep": "What will be unlocked next in ${langInfo.name}",
  "warnings": "Common fraud or agent fee to avoid in ${langInfo.name}"
}`;

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activeGroqKey}`
          },
          body: JSON.stringify({
            model: 'groq/compound-mini',
            max_tokens: 600,
            messages: [
              { role: 'system', content: isFunding ? `You are an expert MSME Financial Advisor. Always respond in valid JSON format.${langDirective}` : `You are an expert MSME Business Advisor on Indian government schemes. Always respond in valid JSON format.${langDirective}` },
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
            return res.status(200).json({ success: true, structured: { ...structured, provider: 'Saathi Tactical Core', isLive: true } });
          }
        }
      } catch (e) {
        console.warn('Groq serverless live call failed:', e);
      }
    }

    // Default structured response
    let structured;
    const fin = context?.financials || {};
    const costFormatted = `₹${(fin.projectCost || 1000000).toLocaleString('en-IN')}`;
    const marginFormatted = `₹${(fin.availableMargin || 100000).toLocaleString('en-IN')}`;
    const loanFormatted = `₹${(fin.potentialLoan || 900000).toLocaleString('en-IN')}`;
    const installmentFormatted = `₹${(fin.periodicInstallment || 42291).toLocaleString('en-IN')}`;

    if (isFunding) {
      if (langCode === 'hi') {
        structured = {
          answer: `आपके उपलब्ध मार्जिन ${marginFormatted} के आधार पर, 10% प्रमोटर मार्जिन मॉडल के तहत आपकी परियोजना लागत ${costFormatted} बनती है। आप ${fin.fundingTier || 'टर्म लोन योजना'} के लिए पात्र हैं जिसमें ${loanFormatted} तक का ऋण ${fin.interestRate || 8}% प्रति वर्ष की दर से ${fin.tenureYears || 7} वर्षों के लिए उपलब्ध हो सकता है।`,
          why: `यह संरचना आपके ${fin.fundingTier || 'टर्म लोन'} के निर्धारित मापदंडों के अनुसार तैयार की गई है।`,
          whatToDo: [
            `परियोजना व्यय: ${costFormatted}`,
            `संभावित ऋण राशि: ${loanFormatted}`,
            `अनुमानित किस्त: ${installmentFormatted} (${fin.repaymentFrequency || 'त्रैमासिक'})`
          ],
          documents: 'विस्तृत परियोजना रिपोर्ट (DPR), मशीनरी कोटेशन, उद्यम पंजीकरण',
          nextStep: 'विक्रेताओं से कोटेशन एकत्र करें और उद्यम पोर्टल पर पंजीकरण करें',
          warnings: 'ऋण आंकड़े सांकेतिक हैं। अंतिम स्वीकृति बैंक द्वारा परियोजना मूल्यांकन पर निर्भर करेगी।',
          source: 'Saathi Strategic Intelligence',
          isLive: false
        };
      } else if (langCode === 'mr') {
        structured = {
          answer: `तुमच्या उपलब्ध भांडवल ${marginFormatted} नुसार, १०% प्रमोटर मार्जिन मॉडेलनुसार तुमचा प्रकल्प खर्च ${costFormatted} ठरतो. तुम्ही ${fin.fundingTier || 'मुदत कर्ज योजना'} साठी पात्र आहात ज्यात ${loanFormatted} पर्यंतचे कर्ज ${fin.interestRate || 8}% वार्षिक दराने ${fin.tenureYears || 7} वर्षांसाठी मिळू शकते.`,
          why: `ही रचना तुमच्या ${fin.fundingTier || 'मुदत कर्ज'} निकषांनुसार तयार करण्यात आली आहे.`,
          whatToDo: [
            `प्रकल्प खर्च: ${costFormatted}`,
            `संभाव्य कर्ज: ${loanFormatted}`,
            `अंदाजे हप्ता: ${installmentFormatted} (${fin.repaymentFrequency || 'त्रैमासिक'})`
          ],
          documents: 'सविस्तर प्रकल्प अहवाल (DPR), मशिनरी कोटेशन, उद्यम नोंदणी',
          nextStep: 'विक्रेत्यांकडून कोटेशन गोळा करा आणि उद्यम पोर्टलवर नोंदणी करा',
          warnings: 'कर्जाचे आकडे अंदाजे आहेत. अंतिम मंजुरी बँकेच्या मूल्यांकनावर अवलंबून असेल.',
          source: 'Saathi Strategic Intelligence',
          isLive: false
        };
      } else if (langCode === 'bn') {
        structured = {
          answer: `আপনার উপলব্ধ মার্জিন ${marginFormatted}-এর ভিত্তিতে, ১০% প্রবর্তক মার্জিন মডেলে আপনার প্রকল্প ব্যয় হয় ${costFormatted}। আপনি ${fin.fundingTier || 'মেয়াদী ঋণ প্রকল্প'}-এর জন্য যোগ্য যাতে ${fin.tenureYears || 7} বছরের জন্য ${fin.interestRate || 8}% বার্ষিক হারে ${loanFormatted} পর্যন্ত ঋণ পেতে পারেন।`,
          why: `এই কাঠামোটি আপনার ${fin.fundingTier || 'মেয়াদী ঋণ'} পরামিতির সাথে সরাসরি সংগতিপূর্ণ।`,
          whatToDo: [
            `প্রকল্প ব্যয়: ${costFormatted}`,
            `সম্ভাব্য ঋণ: ${loanFormatted}`,
            `আনুমানিক কিস্তি: ${installmentFormatted} (${fin.repaymentFrequency || 'ত্রৈমাসিক'})`
          ],
          documents: 'বিস্তারিত প্রকল্প রিপোর্ট (DPR), যন্ত্রপাতির কোটেশন, উদ্যম নিবন্ধন',
          nextStep: 'বিক্রেতাদের কাছ থেকে কোটেশন সংগ্রহ করুন এবং উদ্যম পোর্টালে নিবন্ধন করুন',
          warnings: 'ঋণের পরিসংখ্যান নির্দেশক। চূড়ান্ত অনুমোদন ব্যাংকের মূল্যায়নের উপর নির্ভর করবে।',
          source: 'Saathi Strategic Intelligence',
          isLive: false
        };
      } else {
        structured = {
          answer: `Under the configured financial model, your available margin of ${marginFormatted} supports an indicative project outlay of ${costFormatted}. This qualifies you for the ${fin.fundingTier || 'Term Loan Scheme'} with potential financing of up to ${loanFormatted} at ${fin.interestRate || 8}% p.a. over ${fin.tenureYears || 7} years.`,
          why: `Structured under configured ${fin.fundingTier || 'Term Loan'} parameters.`,
          whatToDo: [
            `Project Outlay: ${costFormatted}`,
            `Potential Loan: ${loanFormatted}`,
            `Repayment: ${installmentFormatted} (${fin.repaymentFrequency || 'quarterly'})`
          ],
          documents: 'Detailed Project Report (DPR), quotation for machinery, Udyam registration',
          nextStep: 'Consolidate vendor quotations and register on Udyam portal',
          warnings: 'Loan figures are estimates based on scheme parameters. Sanction is subject to bank underwriting.',
          source: 'Saathi Strategic Intelligence',
          isLive: false
        };
      }
    } else {
      if (langCode === 'hi') {
        structured = {
          answer: `${sector} क्षेत्र में ${businessName} के लिए "${taskTitle}" को पूरा करना बैंकों और सरकारी योजनाओं के लिए आवश्यक प्रमाण स्थापित करता है।`,
          why: task?.whyThisMatters || 'जोखिम कम करने और सरकारी मानकों को पूरा करने के लिए यह कदम अनिवार्य है।',
          whatToDo: [
            `"${taskTitle}" के लिए विशिष्ट आवश्यकताएं निर्धारित करें।`,
            'स्थानीय सरकारी दिशानिर्देशों या बैंक मूल्यांकन प्रपत्रों के अनुसार सत्यापन करें।',
            'रोडमॅप में अगले चरण को अनलॉक करने के लिए उद्यमसाथी में जानकारी दर्ज करें।'
          ],
          documents: task?.requiredDocuments?.length > 0
            ? `आवश्यक दस्तावेज: ${task.requiredDocuments.join(', ')}`
            : 'किसी विशेष वैधानिक दस्तावेज की आवश्यकता नहीं है।',
          nextStep: task?.unlocks?.length > 0
            ? `इसे पूरा करने पर अनलॉक होगा: ${task.unlocks.join(', ')}`
            : 'रोडमॅप के अगले मील के पत्थर पर आगे बढ़ें।',
          warnings: 'मुफ्त सरकारी पंजीकरणों (उद्यम, FoSCoS) के लिए कभी भी दलालों को पैसे न दें।',
          source: provider === 'gemini' ? 'Saathi Strategic Intelligence' : 'Saathi Tactical Action Engine',
          isLive: false
        };
      } else if (langCode === 'mr') {
        structured = {
          answer: `${sector} क्षेत्रातील ${businessName} साठी "${taskTitle}" पूर्ण केल्याने बँक आणि शासकीय योजनांसाठी आवश्यक पडताळणी पूर्ण होते.`,
          why: task?.whyThisMatters || 'जोखीम कमी करण्यासाठी आणि अधिकृत मानकांची पूर्तता करण्यासाठी हे आवश्यक आहे.',
          whatToDo: [
            `"${taskTitle}" साठी आवश्यक बाबी निश्चित करा.`,
            'स्थानिक शासकीय मार्गदर्शक तत्त्वांचे पालन करून पडताळणी करा.',
            'पुढील टप्पा अनलॉक करण्यासाठी उद्यमसाथीमध्ये नोंदी ठेवा.'
          ],
          documents: task?.requiredDocuments?.length > 0
            ? `आवश्यक कागदपत्रे: ${task.requiredDocuments.join(', ')}`
            : 'कोणत्याही विशेष कागदपत्रांची आवश्यकता नाही.',
          nextStep: task?.unlocks?.length > 0
            ? `हे पूर्ण केल्यावर अनलॉक होईल: ${task.unlocks.join(', ')}`
            : 'पुढील टप्प्याकडे वाटचाल करा.',
          warnings: 'विनामूल्य सरकारी नोंदणीसाठी (उद्यम, FoSCoS) कधीही दलालांना पैसे देऊ नका.',
          source: provider === 'gemini' ? 'Saathi Strategic Intelligence' : 'Saathi Tactical Action Engine',
          isLive: false
        };
      } else if (langCode === 'bn') {
        structured = {
          answer: `${sector} খাতে ${businessName}-এর জন্য "${taskTitle}" সম্পন্ন করা ব্যাংক ও সরকারি প্রকল্পের জন্য প্রয়োজনীয় ট্র্যাকশন স্থাপন করে।`,
          why: task?.whyThisMatters || 'ঝুঁকি হ্রাস এবং সরকারি মূল্যায়ন মান পূরণের জন্য এটি অপরিহার্য।',
          whatToDo: [
            `"${taskTitle}"-এর জন্য নির্দিষ্ট মানদণ্ড নির্ধারণ করুন।`,
            'স্থানীয় সরকারি নির্দেশিকা বা ব্যাংক মূল্যায়ন ফর্ম যাচাই করুন।',
            'পরবর্তী ধাপ আনলক করতে উদ্যমসাথীতে তথ্য লিপিবদ্ধ করুন।'
          ],
          documents: task?.requiredDocuments?.length > 0
            ? `প্রয়োজনীয় নথিপত্র: ${task.requiredDocuments.join(', ')}`
            : 'কোনো বিধিবদ্ধ সংযুক্তি প্রয়োজন নেই।',
          nextStep: task?.unlocks?.length > 0
            ? `এটি সম্পন্ন করলে আনলক হবে: ${task.unlocks.join(', ')}`
            : 'রোডম্যাপের পরবর্তী মাইলফলকে এগিয়ে যান।',
          warnings: 'বিনামূল্যের সরকারি নিবন্ধনের (উদ্যম, FoSCoS) জন্য কখনই মধ্যস্বত্বভোগীদের অর্থ প্রদান করবেন না।',
          source: provider === 'gemini' ? 'Saathi Strategic Intelligence' : 'Saathi Tactical Action Engine',
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
          source: provider === 'gemini' ? 'Saathi Strategic Intelligence' : 'Saathi Tactical Action Engine',
          isLive: false
        };
      }
    }

    return res.status(200).json({ success: true, structured });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
