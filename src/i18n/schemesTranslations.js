/**
 * Comprehensive Schemes Translations & Localization Helpers
 * Supporting 22 Official Scheduled Indian Languages + English
 */

import { SCHEME_NAMES_MAP, SCHEME_BENEFITS_MAP, MINISTRY_MAP } from './schemesDictionary.js';
import { mr } from "./locales/mr.js";
import { gu } from "./locales/gu.js";
import { ta } from "./locales/ta.js";
import { te } from "./locales/te.js";
import { kn } from "./locales/kn.js";
import { ml } from "./locales/ml.js";
import { pa } from "./locales/pa.js";
import { or as orLocale } from "./locales/or.js";
import { as as asLocale } from "./locales/as.js";
import { ur } from "./locales/ur.js";
import { SCRIPT_FAMILY_FALLBACKS } from "./locales/familyFallbacks.js";


export const SCHEMES_TRANSLATIONS = {
  en: {
    pageBadge: 'Government Scheme Matcher',
    pageTitle: 'Personalized Government Support Opportunities',
    pageSubtitle: 'Deterministic eligibility evaluation across verified Central and State MSME programs. Ranked specifically for',
    profileSync: 'Profile Synchronized',
    inRoadmap: 'in Roadmap',
    activeParams: 'Active Match Parameters From Your Profile',
    editProfile: 'Edit Profile',
    stateLocation: 'State / Location',
    categoryLabel: 'Category',
    industrySector: 'Industry Sector',
    businessStage: 'Business Stage',
    capitalNeed: 'Capital Need',
    improveAccuracy: 'Improve Your Match Accuracy',
    missingDetails: 'Your profile is missing details that could unlock state-specific subsidies:',
    completeProfile: 'Complete Profile',
    aiSpotlight: 'AI Recommendation Spotlight',
    whyRecommend: 'Why We Recommend',
    topMatchedProgram: 'Top Matched Program',
    inspectTopMatch: 'Inspect Top Match',
    searchPlaceholder: 'Search by scheme name, ministry, or keywords (e.g. PMEGP, Subsidy, ODOP)...',
    showing: 'Showing',
    to: 'to',
    of: 'of',
    schemesCount: 'schemes',
    perPage: 'Per Page:',
    all: 'All',
    supportType: 'Support Type',
    targetSector: 'Target Sector',
    fundingScale: 'Funding Scale',
    jurisdiction: 'Jurisdiction',
    jurisdictionAll: 'All Sources (Central, State, Banks, CSR)',
    jurisdictionCentral: 'Central National Schemes',
    jurisdictionState: 'State-Specific Schemes',
    jurisdictionBanking: 'Banking & Institutional Credit',
    jurisdictionPrivate: 'Startup Grants, Incubators & CSR',
    reset: 'Reset',
    clear: 'Clear',
    rankedSchemes: 'Your Ranked Government Schemes',
    rankedDesc: 'Ranked deterministically by alignment with your business profile.',
    compareSchemesBtn: 'Compare Schemes',
    compare: 'Compare',
    comparing: 'Comparing',
    viewDetails: 'View Details',
    matchScore: 'Match Score',
    eligible: 'Eligible',
    notEligible: 'Not Eligible',
    potentiallyEligible: 'Potentially Eligible',
    potentialBenefit: 'Potential Benefit',
    facilityType: 'Facility Type',
    documentsToPrepare: 'documents to be prepared',
    documentToPrepare: 'document to be prepared',
    profileDocsReady: 'Basic profile documents ready',
    backToMatcher: 'Back to Schemes Matcher',
    lastVerified: 'Last Verified:',
    verifiedSource: 'Verified Source',
    profileCompatibility: 'Profile Compatibility',
    savedInRoadmap: 'Saved in Roadmap',
    addRoadmap: 'Add to My Roadmap',
    visitNodalPortal: 'Visit Nodal Portal',
    nationalPortal: 'National myScheme Portal',
    matchBreakdown: 'Your Match Breakdown',
    whyMatchesProfile: 'Why this matches your profile:',
    considerations: 'Considerations / Criteria to Confirm:',
    unmatchedConditions: 'Unmatched Conditions:',
    officialDisclaimer: 'Official Disclaimer:',
    potentialBenefitsTitle: 'Potential Benefits & Financing Structure',
    docChecklistTitle: 'Document Checklist & Profile Readiness',
    howToApplyTitle: 'How to Apply: Verified Application Sequence',
    mandatory: 'Mandatory',
    available: 'Available',
    toPrepare: 'To Prepare',
    subsidyScale: 'Subsidy Scale',
    subsidyDetails: 'Subsidy Details',
    marginMoney: 'Margin Money (Promoter Equity)',
    collateralGuarantee: 'Collateral & Guarantee',
    repaymentTerms: 'Loan & Repayment Terms',
    allSupportTypes: 'All Support Types',
    allSectors: 'All Sectors',
    anyAmount: 'Any Funding Amount',
    profileReflects: 'Reflects alignment with your declared profile.',
    roadmapSuccess: "Successfully added to your business roadmap! You can track this scheme's preparation steps.",
    docReadinessNote: 'Cross-referenced with information collected during your onboarding.',
    accountedFor: 'Document Types Accounted For',
    workflowNote: 'Standard government workflow according to nodal agency operating guidelines.',
    dataTrustTitle: 'Data Trust & Provenance',
    sourceLabel: 'Source:',
    verifiedAsOf: 'Verified directly from official departmental notifications.',
    nodalAgencyPortal: 'Nodal Agency Portal',
    nationalMySchemePage: 'National myScheme Page',
    upTo: 'Up to',
    facilities: {
      loan: 'Loan',
      grant: 'Grant',
      subsidy: 'Subsidy',
      credit_linked_subsidy: 'Credit-Linked Subsidy',
      credit_guarantee: 'Credit Guarantee',
      equity: 'Equity',
      interest_subvention: 'Interest Subvention',
      training: 'Training & Skill Support',
      infrastructure: 'Infrastructure Support',
      government_support: 'Government Support'
    },
    types: {
      loan: 'Central Concessional Loan',
      grant: 'Seed Grant & Subsidy',
      subsidy: 'Capital Subsidy',
      credit_linked_subsidy: 'Credit-Linked Subsidy',
      training: 'Skilling & Toolkit Grant',
      infrastructure: 'Infrastructure Support'
    },
    pillars: {
      allIndia: 'Location matches: All-India National Scheme',
      locationMatches: 'Location matches',
      supports: 'Supports',
      sector: 'sector',
      universalSector: 'Universal sector support',
      stageAligned: 'Stage aligned',
      womanPriority: 'Woman entrepreneur priority & enhanced subsidy',
      categoryBenefits: 'Category benefits available for',
      ageVerified: 'Age eligibility verified',
      financialFit: 'Financial requirement fits within scheme parameters',
      ruralAligned: 'Rural Area aligned',
      urbanAligned: 'Urban Area aligned'
    },
    stages: {
      idea: 'Idea / Concept',
      planning: 'Planning Stage',
      operating: 'Operational Unit',
      growing: 'Scaling & Growth'
    }
  },

  bn: {
    pageBadge: 'সরকারি সহায়তা সুযোগ',
    pageTitle: 'ব্যক্তিগত সরকারি সহায়তা ও প্রকল্প',
    pageSubtitle: 'যাচাইকৃত কেন্দ্রীয় ও রাজ্য এমএসএমই কর্মসূচির জন্য যোগ্যতা মূল্যায়ন। বিশেষভাবে সাজানো হয়েছে',
    profileSync: 'প্রোফাইল সমন্বিত',
    inRoadmap: 'রোডম্যাপে যুক্ত',
    activeParams: 'আপনার প্রোফাইল থেকে সক্রিয় প্যারামিটার',
    editProfile: 'প্রোফাইল পরিবর্তন',
    stateLocation: 'রাজ্য / অবস্থান',
    categoryLabel: 'শ্রেণী',
    industrySector: 'শিল্প খাত',
    businessStage: 'ব্যবসার পর্যায়',
    capitalNeed: 'পুঁজির পরিমাণ',
    improveAccuracy: 'ম্যাচের সঠিকতা উন্নত করুন',
    missingDetails: 'আপনার প্রোফাইলে কিছু তথ্য অনুপস্থিত রয়েছে:',
    completeProfile: 'প্রোফাইল সম্পূর্ণ করুন',
    aiSpotlight: 'এআই সুপারিশ স্পটলাইট',
    whyRecommend: 'আমরা কেন এটি সুপারিশ করি',
    topMatchedProgram: 'সর্বোচ্চ মিল থাকা প্রকল্প',
    inspectTopMatch: 'প্রকল্পটি পরীক্ষা করুন',
    searchPlaceholder: 'প্রকল্পের নাম, মন্ত্রণালয় বা কীওয়ার্ড দিয়ে খুঁজুন (যেমন PMEGP, সাবসিডি)...',
    showing: 'প্রদর্শিত',
    to: 'থেকে',
    of: 'এর মধ্যে',
    schemesCount: 'টি প্রকল্প',
    perPage: 'প্রতি পৃষ্ঠায়:',
    all: 'সকল',
    supportType: 'সহায়তার ধরন',
    targetSector: 'লক্ষ্যভুক্ত খাত',
    fundingScale: 'তহবিলের পরিমাণ',
    jurisdiction: 'এখতিয়ার',
    jurisdictionAll: 'সকল উৎস (কেন্দ্রীয়, রাজ্য, ব্যাংক, সিএসআর)',
    jurisdictionCentral: 'কেন্দ্রীয় সরকারি প্রকল্প',
    jurisdictionState: 'রাজ্য স্তরের প্রকল্প',
    jurisdictionBanking: 'ব্যাংকিং ও প্রাতিষ্ঠানিক ঋণ',
    jurisdictionPrivate: 'স্টার্টআপ অনুদান ও সিএসআর',
    reset: 'রিসেট',
    clear: 'মুছুন',
    rankedSchemes: 'আপনার জন্য উপযোগী সরকারি প্রকল্প',
    rankedDesc: 'আপনার ব্যবসায়িক প্রোফাইলের সাথে সামঞ্জস্য অনুযায়ী সাজানো।',
    compareSchemesBtn: 'প্রকল্প তুলনা করুন',
    compare: 'তুলনা করুন',
    comparing: 'তুলনা হচ্ছে',
    viewDetails: 'বিস্তারিত দেখুন',
    matchScore: 'ম্যাচ স্কোর',
    eligible: 'যোগ্য',
    notEligible: 'অযোগ্য',
    potentiallyEligible: 'সম্ভাব্য যোগ্য',
    potentialBenefit: 'সম্ভাব্য সুবিধা',
    facilityType: 'সুবিধার ধরন',
    documentsToPrepare: 'টি নথি প্রস্তুত করতে হবে',
    documentToPrepare: 'টি নথি প্রস্তুত করতে হবে',
    profileDocsReady: 'প্রোফাইল নথি প্রস্তুত',
    backToMatcher: 'প্রকল্প তালিকায় ফিরে যান',
    lastVerified: 'সর্বশেষ যাচাইকৃত:',
    verifiedSource: 'যাচাইকৃত তথ্যসূত্র',
    profileCompatibility: 'প্রোফাইল সামঞ্জস্যতা',
    savedInRoadmap: 'রোডম্যাপে সংরক্ষিত',
    addRoadmap: 'আমার রোডম্যাপে যুক্ত করুন',
    visitNodalPortal: 'অফিসিয়াল পোর্টালে যান',
    nationalPortal: 'জাতীয় myScheme পোর্টাল',
    matchBreakdown: 'আপনার মিলের বিশ্লেষণ',
    whyMatchesProfile: 'কেন এটি আপনার জন্য প্রযোজ্য:',
    considerations: 'বিবেচ্য শর্তাবলী:',
    unmatchedConditions: 'অনুপযুক্ত শর্তাবলী:',
    officialDisclaimer: 'অফিসিয়াল সতর্কবার্তা:',
    potentialBenefitsTitle: 'সম্ভাব্য সুবিধা ও আর্থিক কাঠামো',
    docChecklistTitle: 'নথিপত্রের তালিকা ও প্রস্তুতি',
    howToApplyTitle: 'আবেদন পদ্ধতি: ধাপে ধাপে নির্দেশনা',
    mandatory: 'বাধ্যতামূলক',
    available: 'প্রস্তুত আছে',
    toPrepare: 'প্রস্তুত করতে হবে',
    subsidyScale: 'ভর্তুকির অনুপাত',
    subsidyDetails: 'ভর্তুকির বিবরণ',
    marginMoney: 'মার্জিন মানি (উদ্যোক্তার নিজস্ব অংশ)',
    collateralGuarantee: 'জামানত ও গ্যারান্টি',
    repaymentTerms: 'ঋণ ও পরিশোধের শর্তাবলী',
    allSupportTypes: 'সকল সহায়তার ধরন',
    allSectors: 'সকল খাত',
    anyAmount: 'যেকোনো তহবিলের পরিমাণ',
    profileReflects: 'আপনার ঘোষিত প্রোফাইলের সাথে সামঞ্জস্য প্রতিফলিত করে।',
    roadmapSuccess: 'সফলভাবে আপনার ব্যবসায়িক রোডম্যাপে যুক্ত করা হয়েছে! আপনি এই প্রকল্পের প্রস্তুতির ধাপগুলো ট্র্যাক করতে পারেন।',
    docReadinessNote: 'অনবোর্ডিংয়ের সময় সংগৃহীত তথ্যের সাথে সমন্বিত।',
    accountedFor: 'ধরনের নথি অন্তর্ভুক্ত',
    workflowNote: 'নোডাল এজেন্সির নির্দেশিকা অনুযায়ী আদর্শ সরকারি কার্যপদ্ধতি।',
    dataTrustTitle: 'তথ্যের নির্ভরযোগ্যতা ও উৎস',
    sourceLabel: 'উৎস:',
    verifiedAsOf: 'বিভাগীয় অফিসিয়াল বিজ্ঞপ্তি থেকে সরাসরি যাচাইকৃত।',
    nodalAgencyPortal: 'নোডাল এজেন্সি পোর্টাল',
    nationalMySchemePage: 'জাতীয় myScheme পেজ',
    upTo: 'সর্বোচ্চ',
    facilities: {
      loan: 'ঋণ',
      grant: 'অনুদান',
      subsidy: 'ভর্তুকি',
      credit_linked_subsidy: 'ঋণ-সংযুক্ত ভর্তুকি',
      credit_guarantee: 'ক্রেডিট গ্যারান্টি',
      equity: 'ইকুইটি',
      interest_subvention: 'সুদ ভর্তুকি',
      training: 'প্রশিক্ষণ সহায়তা',
      infrastructure: 'অবকাঠামো সহায়তা',
      government_support: 'সরকারি সহায়তা'
    },
    types: {
      loan: 'কেন্দ্রীয় সহজ শর্তের ঋণ',
      grant: 'অনুদান ও বীজ তহবিল',
      subsidy: 'পুঁজি ভর্তুকি প্রকল্প',
      credit_linked_subsidy: 'ঋণ-সংযুক্ত ভর্তুকি',
      training: 'দক্ষতা ও টুলকিট অনুদান',
      infrastructure: 'অবকাঠামো সহায়তা'
    },
    pillars: {
      allIndia: 'অবস্থান মিল: সর্বভারতীয় জাতীয় প্রকল্প',
      locationMatches: 'অবস্থান মিল',
      supports: 'সহায়তা করে',
      sector: 'খাত',
      universalSector: 'সকল খাতের জন্য উন্মুক্ত',
      stageAligned: 'পর্যায় সামঞ্জস্যপূর্ণ',
      womanPriority: 'নারী উদ্যোক্তা অগ্রাধিকার ও বর্ধিত ভর্তুকি',
      categoryBenefits: 'বিশেষ শ্রেণীর সুবিধা উপলব্ধ',
      ageVerified: 'বয়স যাচাইকৃত',
      financialFit: 'আর্থিক প্রয়োজনীয়তা প্রকল্প কাঠামোর অনুকূল',
      ruralAligned: 'গ্রামীণ এলাকার জন্য প্রযোজ্য',
      urbanAligned: 'শহরাঞ্চলের জন্য প্রযোজ্য'
    },
    stages: {
      idea: 'ধারণা (Idea)',
      planning: 'পরিকল্পনা (Planning)',
      operating: 'পরিচালনা (Operating)',
      growing: 'সম্প্রসারণ (Growing)'
    }
  },

  hi: {
    pageBadge: 'सरकारी योजना मिलानकर्ता',
    pageTitle: 'व्यक्तिगत सरकारी सहायता और योजनाएं',
    pageSubtitle: 'सत्यापित केंद्रीय और राज्य एमएसएमई कार्यक्रमों में पात्रता मूल्यांकन। विशेष रूप से क्रमित',
    profileSync: 'प्रोफ़ाइल समन्वयित',
    inRoadmap: 'रोडमैप में शामिल',
    activeParams: 'आपकी प्रोफ़ाइल से सक्रिय मिलान मापदंड',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    stateLocation: 'राज्य / स्थान',
    categoryLabel: 'वर्ग / श्रेणी',
    industrySector: 'उद्योग क्षेत्र',
    businessStage: 'व्यवसाय का चरण',
    capitalNeed: 'पूंजी की आवश्यकता',
    improveAccuracy: 'मिलान की सटीकता बढ़ाएं',
    missingDetails: 'आपकी प्रोफ़ाइल में कुछ विवरण अधूरे हैं:',
    completeProfile: 'प्रोफ़ाइल पूर्ण करें',
    aiSpotlight: 'एआई अनुशंसा स्पॉटलाइट',
    whyRecommend: 'हम इसकी अनुशंसा क्यों करते हैं',
    topMatchedProgram: 'शीर्ष अनुशंसित कार्यक्रम',
    inspectTopMatch: 'योजना का अवलोकन करें',
    searchPlaceholder: 'योजना का नाम, मंत्रालय या कीवर्ड खोजें (उदा. PMEGP, सब्सिडी)...',
    showing: 'दिखाया जा रहा है',
    to: 'से',
    of: 'में से',
    schemesCount: 'योजनाएं',
    perPage: 'प्रति पृष्ठ:',
    all: 'सभी',
    supportType: 'सहायता का प्रकार',
    targetSector: 'लक्षित क्षेत्र',
    fundingScale: 'वित्तीय दायरा',
    jurisdiction: 'अधिकार क्षेत्र',
    jurisdictionAll: 'सभी स्रोत (केंद्रीय, राज्य, बैंक, सीएसआर)',
    jurisdictionCentral: 'केंद्रीय राष्ट्रीय योजनाएं',
    jurisdictionState: 'राज्य-विशिष्ट योजनाएं',
    jurisdictionBanking: 'बैंकिंग एवं संस्थागत ऋण',
    jurisdictionPrivate: 'स्टार्टअप अनुदान एवं सीएसआर',
    reset: 'रीसेट',
    clear: 'हटाएं',
    rankedSchemes: 'आपके लिए अनुकूलित सरकारी योजनाएं',
    rankedDesc: 'आपके व्यावसायिक प्रोफ़ाइल के अनुसार क्रमित।',
    compareSchemesBtn: 'योजनाओं की तुलना करें',
    compare: 'तुलना करें',
    comparing: 'तुलना हो रही है',
    viewDetails: 'विवरण देखें',
    matchScore: 'मैच स्कोर',
    eligible: 'पात्र',
    notEligible: 'अपात्र',
    potentiallyEligible: 'संभावित पात्र',
    potentialBenefit: 'संभावित लाभ',
    facilityType: 'सुविधा का प्रकार',
    documentsToPrepare: 'दस्तावेज़ तैयार करने होंगे',
    documentToPrepare: 'दस्तावेज़ तैयार करना होगा',
    profileDocsReady: 'मूल प्रोफ़ाइल दस्तावेज़ तैयार हैं',
    backToMatcher: 'योजना सूची में वापस जाएं',
    lastVerified: 'अंतिम सत्यापन:',
    verifiedSource: 'सत्यापित स्रोत',
    profileCompatibility: 'प्रोफ़ाइल अनुकूलता',
    savedInRoadmap: 'रोडमैप में सहेजा गया',
    addRoadmap: 'मेरे रोडमैप में जोड़ें',
    visitNodalPortal: 'नोडल पोर्टल पर जाएं',
    nationalPortal: 'राष्ट्रीय myScheme पोर्टल',
    matchBreakdown: 'आपकी पात्रता का विश्लेषण',
    whyMatchesProfile: 'यह आपकी प्रोफ़ाइल से क्यों मेल खाता है:',
    considerations: 'पुष्टि करने योग्य शर्तें / विचारणीय बिंदु:',
    unmatchedConditions: 'अपात्रता की शर्तें:',
    officialDisclaimer: 'आधिकारिक अस्वीकरण:',
    potentialBenefitsTitle: 'संभावित लाभ एवं वित्तीय ढांचा',
    docChecklistTitle: 'दस्तावेज़ चेकलिस्ट एवं प्रोफ़ाइल सज्जता',
    howToApplyTitle: 'आवेदन कैसे करें: चरणबद्ध प्रक्रिया',
    mandatory: 'अनिवार्य',
    available: 'उपलब्ध',
    toPrepare: 'तैयार करना है',
    subsidyScale: 'सब्सिडी पैमाना',
    subsidyDetails: 'सब्सिडी विवरण',
    marginMoney: 'मार्जिन मनी (प्रमोटर इक्विटी)',
    collateralGuarantee: 'संपार्श्विक एवं गारंटी',
    repaymentTerms: 'ऋण एवं पुनर्भुगतान शर्तें',
    allSupportTypes: 'सभी सहायता के प्रकार',
    allSectors: 'सभी क्षेत्र',
    anyAmount: 'कोई भी वित्तीय राशि',
    profileReflects: 'आपकी घोषित प्रोफ़ाइल के साथ संरेखण को दर्शाता है।',
    roadmapSuccess: 'सफलतापूर्वक आपके बिजनेस रोडमैप में जोड़ा गया! आप इस योजना के तैयारी चरणों को ट्रैक कर सकते हैं।',
    docReadinessNote: 'ऑनबोर्डिंग के दौरान एकत्रित जानकारी के साथ क्रॉस-रेफ़रेंस किया गया।',
    accountedFor: 'प्रकार के दस्तावेज़ शामिल',
    workflowNote: 'नोडल एजेंसी के परिचालन दिशानिर्देशों के अनुसार मानक सरकारी प्रक्रिया।',
    dataTrustTitle: 'डेटा विश्वसनीयता एवं स्रोत',
    sourceLabel: 'स्रोत:',
    verifiedAsOf: 'विभागीय आधिकारिक अधिसूचनाओं से सीधे सत्यापित।',
    nodalAgencyPortal: 'नोडल एजेंसी पोर्टल',
    nationalMySchemePage: 'राष्ट्रीय myScheme पेज',
    upTo: 'अधिकतम',
    facilities: {
      loan: 'ऋण',
      grant: 'अनुदान',
      subsidy: 'सब्सिडी',
      credit_guarantee: 'क्रेडिट गारंटी',
      equity: 'इक्विटी',
      interest_subvention: 'ब्याज छूट',
      training: 'प्रशिक्षण सहायता',
      infrastructure: 'अवसंरचना सहायता',
      government_support: 'सरकारी सहायता'
    },
    types: {
      loan: 'केंद्रीय रियायती ऋण',
      grant: 'बीज अनुदान एवं ऋण',
      subsidy: 'पूंजीगत सब्सिडी योजना',
      credit_linked_subsidy: 'क्रेडिट लिंक्ड सब्सिडी',
      training: 'कौशल एवं टूलकिट अनुदान',
      infrastructure: 'अवसंरचना सहायता'
    },
    pillars: {
      allIndia: 'स्थान मिलान: अखिल भारतीय राष्ट्रीय योजना',
      locationMatches: 'स्थान मिलान',
      supports: 'समर्थन',
      sector: 'क्षेत्र',
      universalSector: 'सभी क्षेत्रों के लिए मान्य',
      stageAligned: 'व्यावसायिक चरण अनुकूलित',
      womanPriority: 'महिला उद्यमी प्राथमिकता एवं अतिरिक्त सब्सिडी',
      categoryBenefits: 'श्रेणी लाभ उपलब्ध',
      ageVerified: 'आयु पात्रता सत्यापित',
      financialFit: 'वित्तीय आवश्यकता योजना सीमा के भीतर',
      ruralAligned: 'ग्रामीण क्षेत्र अनुकूल',
      urbanAligned: 'शहरी क्षेत्र अनुकूल'
    },
    stages: {
      idea: 'विचार (Idea)',
      planning: 'योजना (Planning)',
      operating: 'संचालन (Operating)',
      growing: 'विस्तार (Growing)'
    }
  },

  mr: mr.schemes,
  gu: gu.schemes,
  ta: ta.schemes,
  te: te.schemes,
  kn: kn.schemes,
  ml: ml.schemes,
  pa: pa.schemes,
  or: orLocale.schemes,
  as: asLocale.schemes,
  ur: ur.schemes
};

/**
 * Helper to get scheme translation with fallback to English
 */
export function getSchemesText(lang, path, fallback = '') {
  const fallbackLang = SCRIPT_FAMILY_FALLBACKS[lang] || 'en';
  const target = SCHEMES_TRANSLATIONS[lang] || SCHEMES_TRANSLATIONS[fallbackLang] || SCHEMES_TRANSLATIONS.en;
  const parts = path.split('.');
  let current = target;
  for (const p of parts) {
    if (current && typeof current === 'object' && p in current) {
      current = current[p];
    } else {
      current = null;
      break;
    }
  }
  if (typeof current === 'string') return current;

  // Fallback to English
  let enCurrent = SCHEMES_TRANSLATIONS.en;
  for (const p of parts) {
    if (enCurrent && typeof enCurrent === 'object' && p in enCurrent) {
      enCurrent = enCurrent[p];
    } else {
      enCurrent = null;
      break;
    }
  }
  if (typeof enCurrent === 'string') return enCurrent;
  return fallback;
}

/**
 * Localize Ministry & Department Names
 */
export function localizeMinistry(ministry, lang) {
  if (!ministry || lang === 'en') return ministry;

  const fallbackLang = SCRIPT_FAMILY_FALLBACKS[lang] || 'en';
  // Direct hit from master dictionary
  if (MINISTRY_MAP?.[lang]?.[ministry]) {
    return MINISTRY_MAP[lang][ministry];
  }
  if (MINISTRY_MAP?.[fallbackLang]?.[ministry]) {
    return MINISTRY_MAP[fallbackLang][ministry];
  }

  const map = {
    bn: {
      'Ministry of Food Processing Industries (MoFPI)': 'খাদ্য প্রক্রিয়াকরণ শিল্প মন্ত্রণালয় (MoFPI)',
      'National Institute of Food Technology Entrepreneurship and Management': 'জাতীয় খাদ্য প্রযুক্তি প্রতিষ্ঠান (NIFTEM)',
      'National Institute of Food Technology (NIFTEM)': 'জাতীয় খাদ্য প্রযুক্তি প্রতিষ্ঠান (NIFTEM)',
      'Khadi and Village Industries Commission (KVIC)': 'খাদি ও গ্রামোদ্যোগ কমিশন (KVIC)',
      'Department of Financial Services (DFS)': 'আর্থিক সেবা বিভাগ (DFS)',
      'Department of Financial Services': 'আর্থিক সেবা বিভাগ (DFS)',
      'Ministry of Commerce and Industry': 'বাণিজ্য ও শিল্প মন্ত্রণালয়',
      'Ministry of Food Processing': 'খাদ্য প্রক্রিয়াকরণ মন্ত্রণালয়',
      'Ministry of Housing and Urban Affairs': 'আবাসন ও নগর বিষয়ক মন্ত্রণালয় (MoHUA)',
      'Ministry of Housing and Urban Affairs (MoHUA)': 'আবাসন ও নগর বিষয়ক মন্ত্রণালয় (MoHUA)',
      'Urban Livelihoods Division': 'শহুরে জীবিকা বিভাগ',
      'DPIIT': 'শিল্প ও অভ্যন্তরীণ বাণিজ্য প্রচার দপ্তর (DPIIT)',
      'DA&FW': 'কৃষি ও কৃষক কল্যাণ দপ্তর (DA&FW)',
      'DAHD': 'পশুপালন ও দুগ্ধ দপ্তর (DAHD)',
      'Ministry of Skill Development': 'দক্ষতা উন্নয়ন মন্ত্রণালয়',
      'Ministry of Rural Development': 'পল্লী উন্নয়ন মন্ত্রণালয়',
      'Ministry of Electronics and IT': 'তথ্যপ্রযুক্তি মন্ত্রণালয়',
      'Ministry of Agriculture': 'কৃষি মন্ত্রণালয়',
      'Ministry of Agriculture and Farmers Welfare': 'কৃষি ও কৃষক কল্যাণ মন্ত্রণালয়',
      'Farmers Welfare': 'কৃষক কল্যাণ',
      'Ministry of Textiles': 'বস্ত্র মন্ত্রণালয়',
      'Ministry of Finance': 'অর্থ মন্ত্রণালয়',
      'Ministry of MSME': 'এমএসএমই মন্ত্রণালয়',
      'Skill Development Joint Cell': 'দক্ষতা উন্নয়ন যৌথ সেল',
      'SIDBI': 'সিডবি (SIDBI)',
      'NABARD': 'নাবার্ড (NABARD)'
    },
    hi: {
      'Ministry of Food Processing Industries (MoFPI)': 'खाद्य प्रसंस्करण उद्योग मंत्रालय (MoFPI)',
      'National Institute of Food Technology Entrepreneurship and Management': 'राष्ट्रीय खाद्य प्रौद्योगिकी संस्थान (NIFTEM)',
      'National Institute of Food Technology (NIFTEM)': 'राष्ट्रीय खाद्य प्रौद्योगिकी संस्थान (NIFTEM)',
      'Khadi and Village Industries Commission (KVIC)': 'खादी एवं ग्रामोद्योग आयोग (KVIC)',
      'Department of Financial Services (DFS)': 'वित्तीय सेवाएं विभाग (DFS)',
      'Department of Financial Services': 'वित्तीय सेवाएं विभाग (DFS)',
      'Ministry of Commerce and Industry': 'वाणिज्य एवं उद्योग मंत्रालय',
      'Ministry of Food Processing': 'खाद्य प्रसंस्करण मंत्रालय',
      'Ministry of Housing and Urban Affairs': 'आवासन एवं शहरी कार्य मंत्रालय (MoHUA)',
      'Ministry of Housing and Urban Affairs (MoHUA)': 'आवासन एवं शहरी कार्य मंत्रालय (MoHUA)',
      'Urban Livelihoods Division': 'शहरी आजीविका प्रभाग',
      'DPIIT': 'उद्योग संवर्धन एवं आंतरिक व्यापार विभाग (DPIIT)',
      'DA&FW': 'कृषि एवं किसान कल्याण विभाग (DA&FW)',
      'DAHD': 'पशुपालन एवं डेयरी विभाग (DAHD)',
      'Ministry of Skill Development': 'कौशल विकास मंत्रालय',
      'Ministry of Rural Development': 'ग्रामीण विकास मंत्रालय',
      'Ministry of Electronics and IT': 'इलेक्ट्रॉनिक्स एवं आईटी मंत्रालय',
      'Ministry of Agriculture': 'कृषि मंत्रालय',
      'Ministry of Agriculture and Farmers Welfare': 'कृषि एवं किसान कल्याण मंत्रालय',
      'Farmers Welfare': 'किसान कल्याण',
      'Ministry of Textiles': 'कपड़ा मंत्रालय',
      'Ministry of Finance': 'वित्त मंत्रालय',
      'Ministry of MSME': 'एमएसएमई मंत्रालय',
      'Skill Development Joint Cell': 'कौशल विकास संयुक्त प्रकोष्ठ',
      'SIDBI': 'सिडबी (सिडबी)',
      'NABARD': 'नाबार्ड (नाबार्ड)'
    },
    mr: {
      'Ministry of Food Processing Industries (MoFPI)': 'अन्न प्रक्रिया उद्योग मंत्रालय (MoFPI)',
      'Department of Financial Services (DFS)': 'वित्तीय सेवा विभाग (DFS)',
      'Khadi and Village Industries Commission (KVIC)': 'खादी व ग्रामोद्योग आयोग (KVIC)',
      'Ministry of Finance': 'वित्त मंत्रालय',
      'Ministry of MSME': 'एमएसएमई मंत्रालय',
      'Ministry of Agriculture': 'कृषी मंत्रालय',
      'Ministry of Commerce and Industry': 'उद्योग आणि वाणिज्य मंत्रालय',
      'Ministry of Food Processing': 'अन्न प्रक्रिया मंत्रालय',
      'Ministry of Textiles': 'वस्त्रोद्योग मंत्रालय',
      'SIDBI': 'सिडबी (SIDBI)'
    },
    ta: {
      'Ministry of Finance': 'நிதி அமைச்சகம்',
      'Ministry of MSME': 'MSME அமைச்சகம்',
      'Ministry of Agriculture': 'வேளாண் அமைச்சகம்',
      'Ministry of Commerce and Industry': 'வர்த்தக மற்றும் தொழில் அமைச்சகம்',
      'SIDBI': 'SIDBI வங்கி'
    },
    te: {
      'Ministry of Finance': 'ఆర్థిక మంత్రిత్వ శాఖ',
      'Ministry of MSME': 'MSME మంత్రిత్వ శాఖ',
      'Ministry of Agriculture': 'వ్యవసాయ మంత్రిత్వ శాఖ',
      'SIDBI': 'SIDBI'
    }
  };

  const combinedMap = {
    ...(map[lang] || {}),
    ...(MINISTRY_MAP?.[lang] || {})
  };

  let res = ministry;
  // Sort keys by length descending to replace specific phrases first
  const sortedKeys = Object.keys(combinedMap).sort((a, b) => b.length - a.length);
  for (const enKey of sortedKeys) {
    if (res.includes(enKey)) {
      const localized = combinedMap[enKey];
      res = res.replace(new RegExp(enKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), localized);
    }
  }

  if (lang === 'hi') {
    res = res.replace(/\s+&\s+/g, ' एवं ');
    res = res.replace(/\s+and\s+/gi, ' एवं ');
    res = res.replace(/\bTrusts\b/gi, 'ट्रस्ट्स');
    res = res.replace(/\bTrust\b/gi, 'ट्रस्ट');
    res = res.replace(/\bDivision\b/gi, 'प्रभाग');
    res = res.replace(/\bDepartment\b/gi, 'विभाग');
    res = res.replace(/\bMinistry\b/gi, 'मंत्रालय');
  } else if (lang === 'bn') {
    res = res.replace(/\s+&\s+/g, ' ও ');
    res = res.replace(/\s+and\s+/gi, ' ও ');
    res = res.replace(/\bTrusts\b/gi, 'ট্রাস্ট');
    res = res.replace(/\bTrust\b/gi, 'ট্রাস্ট');
    res = res.replace(/\bDivision\b/gi, 'বিভাগ');
    res = res.replace(/\bDepartment\b/gi, 'দপ্তর');
    res = res.replace(/\bMinistry\b/gi, 'মন্ত্রণালয়');
  }

  return res;
}

/**
 * Localize Scheme Official Name
 */
export function localizeSchemeName(name, lang = 'en') {
  if (!name || lang === 'en') return name;
  const fallbackLang = SCRIPT_FAMILY_FALLBACKS[lang] || 'en';
  return SCHEME_NAMES_MAP?.[lang]?.[name] ||
    SCHEME_NAMES_MAP?.[lang]?.[name.replace(/’/g, "'").trim()] ||
    SCHEME_NAMES_MAP?.[fallbackLang]?.[name] ||
    SCHEME_NAMES_MAP?.[fallbackLang]?.[name.replace(/’/g, "'").trim()] ||
    name;
}

/**
 * Localize Scheme Benefit Description
 */
export function localizeSchemeBenefit(benefit, lang = 'en') {
  if (!benefit || lang === 'en') return benefit;
  const fallbackLang = SCRIPT_FAMILY_FALLBACKS[lang] || 'en';
  return SCHEME_BENEFITS_MAP?.[lang]?.[benefit] ||
    SCHEME_BENEFITS_MAP?.[lang]?.[benefit.replace(/’/g, "'").trim()] ||
    SCHEME_BENEFITS_MAP?.[fallbackLang]?.[benefit] ||
    SCHEME_BENEFITS_MAP?.[fallbackLang]?.[benefit.replace(/’/g, "'").trim()] ||
    benefit;
}

/**
 * Localize Criteria Pillar Phrases
 */
export function localizePillar(pillar, t, lang) {
  if (!pillar) return '';
  if (lang === 'en') return pillar;

  if (pillar.includes('All-India National Scheme')) {
    return t('schemes.pillars.allIndia', 'स्थान मिलान: अखिल भारतीय राष्ट्रीय योजना');
  }

  if (pillar.startsWith('Location matches:')) {
    const stateName = pillar.replace('Location matches:', '').trim();
    return `${t('schemes.pillars.locationMatches', 'स्थान मिलान')}: ${stateName}`;
  }

  if (pillar.includes('Universal sector support')) {
    return t('schemes.pillars.universalSector', 'सभी क्षेत्रों के लिए मान्य');
  }

  const supportsMatch = pillar.match(/Supports\s+(.+?)\s+sector/i);
  if (supportsMatch) {
    const secName = supportsMatch[1].trim();
    let localizedSec = secName;
    if (lang === 'hi') {
      if (/services/i.test(secName)) localizedSec = 'सेवा';
      else if (/manufacturing/i.test(secName)) localizedSec = 'विनिर्माण';
      else if (/agri|food/i.test(secName)) localizedSec = 'कृषि एवं खाद्य प्रसंस्करण';
      else if (/trading/i.test(secName)) localizedSec = 'व्यापार एवं खुदरा';
      return `समर्थन: ${localizedSec} क्षेत्र`;
    } else if (lang === 'bn') {
      if (/services/i.test(secName)) localizedSec = 'সেবা';
      else if (/manufacturing/i.test(secName)) localizedSec = 'উৎপাদন';
      else if (/agri|food/i.test(secName)) localizedSec = 'কৃষি ও খাদ্য প্রক্রিয়াকরণ';
      else if (/trading/i.test(secName)) localizedSec = 'বাণিজ্য';
      return `সমর্থন: ${localizedSec} খাত`;
    }
    return `${t('schemes.pillars.supports', 'समर्थन')} ${secName} ${t('schemes.pillars.sector', 'क्षेत्र')}`;
  }

  if (pillar.startsWith('Stage aligned:')) {
    const stage = pillar.replace('Stage aligned:', '').trim();
    let localizedStage = stage;
    if (lang === 'hi') {
      if (/idea/i.test(stage)) localizedStage = 'विचार (IDEA)';
      else if (/planning|feasibility/i.test(stage)) localizedStage = 'योजना';
      else if (/operating|growth/i.test(stage)) localizedStage = 'सक्रिय';
      return `व्यावसायिक चरण अनुकूलित: ${localizedStage}`;
    } else if (lang === 'bn') {
      if (/idea/i.test(stage)) localizedStage = 'ধারণা (IDEA)';
      else if (/planning|feasibility/i.test(stage)) localizedStage = 'পরিকল্পনা';
      else if (/operating|growth/i.test(stage)) localizedStage = 'সক্রিয়';
      return `উদ্যোগের পর্যায় সমন্বিত: ${localizedStage}`;
    }
    return `${t('schemes.pillars.stageAligned', 'Stage aligned')}: ${stage}`;
  }

  if (pillar.includes('Woman entrepreneur priority')) {
    return t('schemes.pillars.womanPriority', 'महिला उद्यमी प्राथमिकता और बढ़ी हुई सब्सिडी');
  }

  if (pillar.startsWith('Category benefits available for')) {
    const cat = pillar.replace('Category benefits available for', '').trim();
    return `${t('schemes.pillars.categoryBenefits', 'श्रेणी लाभ उपलब्ध:')} ${cat}`;
  }

  if (pillar.includes('Age eligibility verified')) {
    const ageMatch = pillar.match(/\((\d+)\s*yrs\)/i);
    const ageStr = ageMatch ? ` (${ageMatch[1]} वर्ष)` : '';
    return `${t('schemes.pillars.ageVerified', 'आयु पात्रता सत्यापित')}${ageStr}`;
  }

  if (pillar.includes('Financial requirement fits within scheme parameters')) {
    return t('schemes.pillars.financialFit', 'वित्तीय आवश्यकता योजना सीमा के भीतर');
  }

  if (pillar.includes('Rural Area aligned')) {
    return t('schemes.pillars.ruralAligned', 'ग्रामीण क्षेत्र के अनुकूल');
  }

  if (pillar.includes('Urban Area aligned')) {
    return t('schemes.pillars.urbanAligned', 'शहरी क्षेत्र के अनुकूल');
  }

  return pillar;
}


/**
 * Localize Funding Facility Type
 */
export function localizeFacilityType(type, t) {
  if (!type) return t('schemes.facilities.government_support', 'Government Support');
  const key = type.toLowerCase().replace(/[\s-]+/g, '_');
  return t(`schemes.facilities.${key}`, type.replace(/_/g, ' '));
}

/**
 * Localize Scheme Category Badge Label
 */
export function localizeCategoryLabel(scheme, t, lang) {
  if (lang === 'en') {
    return scheme.schemeCategoryLabel || 'Government Scheme';
  }
  const typeKey = (scheme.schemeType || 'LOAN').toLowerCase();
  return t(`schemes.types.${typeKey}`, scheme.schemeCategoryLabel || 'Government Scheme');
}

/**
 * Localize Entity Stage
 */
export function localizeStage(stage, t) {
  if (!stage) return '';
  const key = stage.toLowerCase().replace(/[\s-]+/g, '_');
  return t(`schemes.stages.${key}`, stage.replace(/_/g, ' '));
}
