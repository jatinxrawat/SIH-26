export const heroProfiles = {
  sita: {
    id: "sita",
    name: "Sita Devi",
    greeting: "Good morning, Sita",
    sector: "Food Processing · Uttar Pradesh",
    businessIdea: "Pickles & Spice Processing Micro-Unit",
    avatarInitials: "SD",
    badgeLabel: "Micro Food Enterprise",
    metrics: [
      { label: "Matched Schemes", value: "4", change: "Top match 94%", color: "text-growth" },
      { label: "Funding Gap", value: "₹2.25L", change: "Need ₹3.00L total", color: "text-ink" },
      { label: "Journey Progress", value: "72%", change: "Stage 3 of 5", color: "text-growth" }
    ],
    nextBestAction: {
      tag: "PRIORITY ACTION",
      title: "Explore matched government scheme",
      subtitle: "PMFME (Micro Food Processing Enterprises)",
      potentialSupport: "₹1,00,000",
      matchScore: "94% Match",
      actionLabel: "View Recommendation",
      rationale: "Matches your Food Processing category in rural Varanasi. Up to 35% credit-linked capital subsidy."
    },
    floatingBadges: [
      { text: "94% Match", icon: "CheckCircle2", type: "success" },
      { text: "Funding Ready", icon: "ShieldCheck", type: "primary" },
      { text: "3 actions remaining", icon: "Clock", type: "neutral" }
    ]
  },
  rajesh: {
    id: "rajesh",
    name: "Rajesh Kumar",
    greeting: "Good morning, Rajesh",
    sector: "Handloom & Textiles · Bihar",
    businessIdea: "Solar Loom Silk Weaving Unit",
    avatarInitials: "RK",
    badgeLabel: "Artisan Cluster",
    metrics: [
      { label: "Matched Schemes", value: "3", change: "Top match 96%", color: "text-growth" },
      { label: "Funding Gap", value: "₹1.80L", change: "Need ₹2.50L total", color: "text-ink" },
      { label: "Journey Progress", value: "65%", change: "Stage 3 of 5", color: "text-growth" }
    ],
    nextBestAction: {
      tag: "PRIORITY ACTION",
      title: "Apply for Weaver Credit Card & Mudra Tarun",
      subtitle: "National Handloom Development Programme (NHDP)",
      potentialSupport: "₹75,000",
      matchScore: "96% Match",
      actionLabel: "View Recommendation",
      rationale: "Eligible for 7% interest subvention and concessional credit support for rural weavers in Bhagalpur."
    },
    floatingBadges: [
      { text: "96% Match", icon: "CheckCircle2", type: "success" },
      { text: "Subsidy Verified", icon: "ShieldCheck", type: "primary" },
      { text: "2 actions remaining", icon: "Clock", type: "neutral" }
    ]
  }
};

export const comparisonData = {
  without: {
    title: "Without Business Compass",
    subtitle: "The Fragmented Maze",
    badge: "The Traditional Way",
    items: [
      {
        title: "Information Fragmentation",
        desc: "Entrepreneurs must browse 40+ disconnected state and central ministry portals with confusing jargon.",
        status: "negative"
      },
      {
        title: "Unknown Capital Gap",
        desc: "Visiting multiple bank branches only to get turned down for missing margin calculations or wrong collateral.",
        status: "negative"
      },
      {
        title: "Compliance Paralysis",
        desc: "Uncertainty whether Udyam, GST, or FSSAI apply, leading to costly middle-men agents and fines.",
        status: "negative"
      },
      {
        title: "Zero Guidance on Next Step",
        desc: "Collecting stacks of certificates without knowing what to submit next or when to launch.",
        status: "negative"
      }
    ]
  },
  with: {
    title: "With Business Compass",
    subtitle: "One Guided Journey",
    badge: "The Intelligent Way",
    items: [
      {
        title: "Deterministic Scheme Match",
        desc: "Rules match location, gender, trade, and scale against 1,200+ schemes in under 3 minutes.",
        status: "positive"
      },
      {
        title: "Transparent Capital Stack",
        desc: "Clear visual formula: Project Cost - Own Capital - Subsidy = Exact Bank Loan Required.",
        status: "positive"
      },
      {
        title: "Sequential Roadmap",
        desc: "Step-by-step checklist pointing directly to official free portals without intermediaries.",
        status: "positive"
      },
      {
        title: "Next Best Action Engine",
        desc: "One prioritized high-impact action item always highlighted on the entrepreneur's home screen.",
        status: "positive"
      }
    ]
  }
};

export const problemCards = [
  {
    id: "schemes",
    title: "Government Schemes",
    description: "Thousands of programs across central and state portals. Difficult to know which ones actually apply to your specific craft, district, or social category.",
    icon: "Landmark",
    stat: "1,200+ Central & State Schemes",
    issue: "Information fragmentation"
  },
  {
    id: "funding",
    title: "Funding",
    description: "Uncertainty around bank loans, margin money, subsidies, own contribution, and hidden funding gaps that stall businesses before they start.",
    icon: "CircleDollarSign",
    stat: "78% struggle with own margin estimation",
    issue: "Capital opacity"
  },
  {
    id: "setup",
    title: "Business Setup",
    description: "Udyam registration, GST thresholds, FSSAI compliance, documentation, and operational permits feel overwhelming and confusing for first-timers.",
    icon: "FileCheck2",
    stat: "Multiple portals & complex forms",
    issue: "Compliance friction"
  },
  {
    id: "what-next",
    title: "What Next?",
    description: "Even after collecting paperwork and information, entrepreneurs often don't know their next best action.",
    icon: "HelpCircle",
    stat: "No unified priority guidance",
    issue: "Decision paralysis"
  }
];

export const journeyStages = [
  {
    id: 1,
    code: "YOUR IDEA",
    title: "Your Idea",
    tagline: "Define the craft & aspiration",
    description: "Input trade, location, scale, and aspirations in plain conversational language.",
    sitaContext: "Expanding home-made mango pickle production into a certified micro-unit in Mirzapur, UP.",
    action: "Craft Business Profile",
    status: "completed"
  },
  {
    id: 2,
    code: "UNDERSTAND YOUR BUSINESS",
    title: "Understand Your Business",
    tagline: "Structure unit economics & requirements",
    description: "Automatic sizing of machinery, space, raw materials, and initial working capital needs.",
    sitaContext: "Evaluated equipment (sealing machine, grinder) and 3-month raw mango & spice inventory.",
    action: "Review Project Economics",
    status: "completed"
  },
  {
    id: 3,
    code: "FIND SUPPORT",
    title: "Find Support",
    tagline: "Filter 1,000+ schemes down to best fit",
    description: "Deterministic rules match your trade and profile to high-probability government programs.",
    sitaContext: "PMFME identified with 35% capital subsidy for food processing in rural Uttar Pradesh.",
    action: "Matched 4 Schemes",
    status: "completed"
  },
  {
    id: 4,
    code: "PLAN FUNDING",
    title: "Plan Funding",
    tagline: "Calculate own contribution & bank loan",
    description: "Deconstruct the capital stack: personal savings, credit guarantee, and subsidy disbursement.",
    sitaContext: "Total ₹3,00,000. Own margin ₹75,000 (25%). Bank loan ₹1,25,000 + Subsidy ₹1,00,000.",
    action: "Active: Prepare DPR",
    status: "active"
  },
  {
    id: 5,
    code: "BUILD",
    title: "Build",
    tagline: "Udyam, FSSAI & machinery setup",
    description: "Step-by-step guidance to official portals for MSME registration and essential compliance.",
    sitaContext: "Next queue: Free Udyam registration followed by FSSAI Basic Registration.",
    action: "Compliance Checklist",
    status: "upcoming"
  },
  {
    id: 6,
    code: "GROW",
    title: "Grow",
    tagline: "Market linkages & recurring capital",
    description: "Connect to regional buyers, ONDC, exhibitions, and working capital top-ups.",
    sitaContext: "Future milestone: Local retail tie-ups and SHG cluster distribution.",
    action: "Market Linkages",
    status: "upcoming"
  }
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Tell us about your business",
    description: "Answer a few simple questions about your idea, location, business stage, investment, and goals.",
    detail: "No complex financial jargon. Just clear inputs about your trade and where you operate.",
    badge: "5-Minute Guided Intake"
  },
  {
    number: "02",
    title: "Discover what fits you",
    description: "Business Compass analyzes your profile against relevant government schemes and support options.",
    detail: "Eliminates irrelevant programs, highlighting exact subsidies and grants designed for your profile.",
    badge: "Deterministic Filtering"
  },
  {
    number: "03",
    title: "Plan your path",
    description: "Understand your funding requirement, potential support, documents, and business milestones.",
    detail: "Know exactly how much cash you need in hand versus what the bank and government provide.",
    badge: "Clear Financial Blueprint"
  },
  {
    number: "04",
    title: "Know what to do next",
    description: "Get a personalized next-best action based on your current business stage.",
    detail: "Dynamic milestone alerts ensure you focus on one high-impact step at a time.",
    badge: "Zero Decision Fatigue"
  }
];

export const featureDetails = {
  scheme: {
    title: "Scheme Intelligence",
    icon: "Landmark",
    summary: "Find government schemes relevant to your profile instead of searching through endless information.",
    badge: "94% Match",
    headline: "PM Formalisation of Micro food processing (PMFME)",
    supportAmount: "₹1,00,000",
    supportType: "Credit-Linked Capital Subsidy (35%)",
    highlights: [
      "Eligible for rural individual micro-entrepreneurs",
      "Special incentives for women-led food processing units in UP",
      "Direct benefit transfer (DBT) linked to bank account",
      "Official portal verification: pmfme.mofpi.gov.in"
    ],
    metrics: [
      { label: "Fit Score", value: "94%" },
      { label: "Potential Support", value: "₹1,00,000" },
      { label: "Turnaround", value: "30-45 Days" }
    ]
  },
  funding: {
    title: "Funding Intelligence",
    icon: "Coins",
    summary: "Understand your project cost, own contribution, funding gap, and potential financing routes.",
    headline: "Capital Structure Breakdown",
    cost: "₹3,00,000",
    ownCapital: "₹75,000",
    fundingGap: "₹2,25,000",
    breakdown: [
      { label: "Total Project Cost", amount: "₹3,00,000", share: "100%", color: "bg-slate-900" },
      { label: "Entrepreneur Margin (Own Funds)", amount: "₹75,000", share: "25%", color: "bg-amber-500" },
      { label: "Capital Subsidy (PMFME)", amount: "₹1,00,000", share: "33.3%", color: "bg-growth" },
      { label: "Term Loan / Bank Borrowing", amount: "₹1,25,000", share: "41.7%", color: "bg-sky-600" }
    ],
    insight: "Your effective funding gap is reduced by ₹1,00,000 through the matched capital subsidy."
  },
  roadmap: {
    title: "Business Roadmap",
    icon: "MapPin",
    summary: "Turn your business idea into a clear sequence of actions.",
    steps: [
      { name: "Business assessment", status: "done", date: "Completed" },
      { name: "Scheme discovery", status: "done", date: "Completed" },
      { name: "Funding preparation", status: "active", date: "Active Step" },
      { name: "Registration", status: "pending", date: "Upcoming" },
      { name: "Launch", status: "pending", date: "Upcoming" }
    ]
  },
  nextAction: {
    title: "Next Best Action",
    icon: "Target",
    summary: "Instead of overwhelming entrepreneurs with information, Business Compass tells them what deserves attention now.",
    currentAction: "Prepare your project report for the funding application.",
    priority: "HIGH PRIORITY",
    estimatedTime: "45 mins",
    impact: "Unlocks ₹1.25L bank loan appraisal and PMFME subsidy filing.",
    guideBullets: [
      "Upload quotations for 2 machines (dry grinder + pouch sealer)",
      "Estimate 12-month raw mango procurement cost",
      "Standard bank DPR format ready for submission"
    ],
    buttonText: "View Action Details"
  }
};

export const trustPrinciples = [
  {
    title: "Verified Information",
    description: "Important scheme information should be linked to official government sources.",
    icon: "ShieldCheck",
    badge: "Official Sources"
  },
  {
    title: "Rules Before AI",
    description: "Eligibility and financial calculations are based on structured rules and deterministic logic.",
    icon: "Cpu",
    badge: "Deterministic Logic"
  },
  {
    title: "Clear Guidance",
    description: "AI explains information in simple language and clearly distinguishes recommendations from official decisions.",
    icon: "FileCheck",
    badge: "Transparent Guidance"
  }
];

export const impactMetrics = [
  {
    value: "1.5B+",
    label: "People in India",
    context: "Designed for a nation of aspirational youth, artisans, and women leaders.",
    badge: "Designed for"
  },
  {
    value: "Millions",
    label: "of micro & small entrepreneurs",
    context: "The backbone of India's economy, navigating business setup and funding.",
    badge: "Built around"
  },
  {
    value: "1 Journey",
    label: "to simplify business support",
    context: "Connecting schemes, funding, compliance, and the single next best action.",
    badge: "One unified journey"
  }
];
