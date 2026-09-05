/**
 * Next Best Action Engine
 * The central intelligence component that dynamically evaluates the user's business state,
 * dependencies, funding status, scheme match, and document vault to determine the single
 * most critical Next Best Action.
 */

import { evaluateTaskStatus } from './dependencyEngine';

/**
 * Evaluates the business journey state and returns the top priority Next Best Action.
 * 
 * @param {Object} params
 * @param {Array} params.allTasks - Complete list of roadmap tasks
 * @param {Array} params.completedTaskIds - IDs of tasks marked complete
 * @param {Object} params.documentStatus - Map of docId -> boolean
 * @param {string|null} params.selectedSchemeId - ID of selected scheme (e.g. 'PMFME')
 * @param {Object} params.profile - Active entrepreneur profile
 * @returns {Object} Next Best Action item with title, reason, priority, taskId, impact, estimatedTime, unlocks
 */
export function getNextBestAction({
  allTasks = [],
  completedTaskIds = [],
  documentStatus = {},
  selectedSchemeId = null,
  profile = {}
}) {
  const isCompleted = (id) => completedTaskIds.includes(id);

  // Helper to construct structured NBA item
  const buildAction = (task, overrideReason, overrideImpact) => {
    return {
      taskId: task.id,
      stageId: task.stage,
      title: task.title,
      shortTitle: task.shortTitle || task.title,
      priority: task.priority || 'HIGH',
      estimatedTime: task.estimatedTime || '1–2 days',
      reason: overrideReason || task.whyThisMatters || 'Essential next step in your business journey.',
      impact: overrideImpact || (task.unlocks?.length > 0 ? `Unlocks ${task.unlocks.length} follow-up milestones.` : 'Brings your enterprise closer to commercial scale.'),
      unlocks: task.unlocks || [],
      requiredDocuments: task.requiredDocuments || [],
      recommendedProfessionalCategory: task.recommendedProfessionalCategory || null
    };
  };

  // Rule 1: Ideation & Demand Validation
  if (!isCompleted('idea-define')) {
    const task = allTasks.find((t) => t.id === 'idea-define');
    return buildAction(
      task,
      'Clarifying your core product concept and differentiator forms the bedrock of customer discovery.',
      'Unlocks target customer profiling and pricing analysis.'
    );
  }

  if (!isCompleted('idea-customer')) {
    const task = allTasks.find((t) => t.id === 'idea-customer');
    return buildAction(
      task,
      'Knowing who specifically will purchase your offering prevents wasted marketing spend.',
      'Unlocks customer demand validation.'
    );
  }

  if (!isCompleted('idea-validation')) {
    const task = allTasks.find((t) => t.id === 'idea-validation');
    return buildAction(
      task,
      'Before investing capital, validate that customers actually need and are willing to pay for your product.',
      'Completing this step unlocks Business Feasibility & Funding Planning.'
    );
  }

  // Rule 2: Feasibility & Unit Economics
  if (!isCompleted('feasibility-capital')) {
    const task = allTasks.find((t) => t.id === 'feasibility-capital');
    return buildAction(
      task,
      'Accurate equipment sizing and unit margin estimation are required before bank loan calculations.',
      'Unlocks Government Scheme Discovery and Capital Stack Sizing.'
    );
  }

  // Rule 3: Government Scheme Discovery & Selection
  if (!isCompleted('scheme-discovery')) {
    const task = allTasks.find((t) => t.id === 'scheme-discovery');
    const schemeName = profile?.recommendedScheme || 'PMFME';
    return buildAction(
      task,
      `Government schemes offer up to 35% capital subsidies for ${profile?.industry || 'your trade'}. Review matched schemes to lower startup risk.`,
      `Unlocks subsidy eligibility verification and formal scheme linkage.`
    );
  }

  if (!isCompleted('scheme-eligibility')) {
    const task = allTasks.find((t) => t.id === 'scheme-eligibility');
    return buildAction(
      task,
      'Verify social category, Aadhaar linkage, and age criteria to claim maximum subsidy entitlement.',
      'Unlocks formal scheme selection.'
    );
  }

  if (!isCompleted('scheme-selection') && !selectedSchemeId) {
    const task = allTasks.find((t) => t.id === 'scheme-selection');
    return buildAction(
      task,
      'Formally select your target scheme (e.g. PMFME 35% subsidy) to lock in DPR guidelines and bank templates.',
      'Unlocks scheme document assembly and institutional loan planning.'
    );
  }

  // Rule 4: Scheme Statutory Documents
  if (!isCompleted('scheme-documents')) {
    const task = allTasks.find((t) => t.id === 'scheme-documents');
    const missingDocsCount = (task.requiredDocuments || []).filter((d) => !documentStatus[d]).length;
    return buildAction(
      task,
      missingDocsCount > 0
        ? `Assemble the ${missingDocsCount} mandatory statutory documents to satisfy ${selectedSchemeId || 'scheme'} underwriting.`
        : 'Finalize statutory documents (Aadhaar, PAN, Bank Passbook, Lease) to clear committee scrutiny.',
      'Unlocks Detailed Project Report (DPR) preparation and bank appraisal dossier.'
    );
  }

  // Rule 5: Funding Gap & Stack
  if (!isCompleted('funding-gap')) {
    const task = allTasks.find((t) => t.id === 'funding-gap');
    return buildAction(
      task,
      'Deconstruct project outlay into own promoter margin, government subsidy, and required bank borrowing.',
      'Unlocks bank channel selection and DPR financial projections.'
    );
  }

  if (!isCompleted('funding-route')) {
    const task = allTasks.find((t) => t.id === 'funding-route');
    return buildAction(
      task,
      'Choose a local lead bank branch (SBI, PNB, Baroda) offering collateral-free CGTMSE credit guarantee.',
      'Unlocks bank appraisal submission.'
    );
  }

  // Rule 6: DPR & Loan Dossier
  if (!isCompleted('funding-dpr')) {
    const task = allTasks.find((t) => t.id === 'funding-dpr');
    return buildAction(
      task,
      'Your selected funding route and scheme require a standard bankable Detailed Project Report (DPR).',
      'Unlocks institutional credit appraisal and loan sanction.'
    );
  }

  if (!isCompleted('funding-dossier')) {
    const task = allTasks.find((t) => t.id === 'funding-dossier');
    return buildAction(
      task,
      'Assemble signed DPR, machine vendor quotations, and promoter margin proof for bank submission.',
      'Unlocks bank branch credit sanction and legal structure registration.'
    );
  }

  // Rule 7: Entity Registration & Statutory Compliance
  if (!isCompleted('reg-structure')) {
    const task = allTasks.find((t) => t.id === 'reg-structure');
    return buildAction(
      task,
      'Select Sole Proprietorship or Partnership to establish the legal operating entity.',
      'Unlocks free Udyam MSME registration and Current Bank Account.'
    );
  }

  if (!isCompleted('reg-udyam')) {
    const task = allTasks.find((t) => t.id === 'reg-udyam');
    return buildAction(
      task,
      'Obtain official 19-digit Government of India Udyam MSME certificate (100% free via official portal).',
      'Unlocks business current account and mandatory subsidy disbursement.'
    );
  }

  if (!isCompleted('reg-tax-bank')) {
    const task = allTasks.find((t) => t.id === 'reg-tax-bank');
    return buildAction(
      task,
      'Open a dedicated business current account in the enterprise name for subsidy Direct Benefit Transfer (DBT).',
      'Unlocks machinery loan disbursement and commercial transactions.'
    );
  }

  if (!isCompleted('reg-permits')) {
    const task = allTasks.find((t) => t.id === 'reg-permits');
    return buildAction(
      task,
      'Apply for FSSAI basic registration (for food processing) or local trade clearance.',
      'Unlocks commercial sales and legal retail distribution.'
    );
  }

  // Rule 8: Setup & Machinery
  if (!isCompleted('setup-workspace')) {
    const task = allTasks.find((t) => t.id === 'setup-workspace');
    return buildAction(
      task,
      'Prepare production premises with required power wiring, hygienic tables, and storage space.',
      'Unlocks machinery delivery and installation.'
    );
  }

  if (!isCompleted('setup-procurement')) {
    const task = allTasks.find((t) => t.id === 'setup-procurement');
    return buildAction(
      task,
      'Procure capital equipment against approved quotations and collect original GST tax invoices.',
      'Unlocks trial batch manufacturing and pre-launch audit.'
    );
  }

  if (!isCompleted('setup-inventory')) {
    const task = allTasks.find((t) => t.id === 'setup-inventory');
    return buildAction(
      task,
      'Stock first 30-day raw material batch, food-grade jars/pouches, and branded stickers.',
      'Unlocks pre-launch audit and marketing rollout.'
    );
  }

  // Rule 9: Commercial Launch
  if (!isCompleted('launch-compliance-check')) {
    const task = allTasks.find((t) => t.id === 'launch-compliance-check');
    return buildAction(
      task,
      'Perform mandatory audit on product labeling, MRP, batch number, FSSAI display, and seals.',
      'Unlocks first official commercial customer sale.'
    );
  }

  if (!isCompleted('launch-marketing')) {
    const task = allTasks.find((t) => t.id === 'launch-marketing');
    return buildAction(
      task,
      'Distribute sample pouches to local retail grocers and publish your WhatsApp Business catalog.',
      'Unlocks customer order volume and repeat billing.'
    );
  }

  if (!isCompleted('launch-first-sale')) {
    const task = allTasks.find((t) => t.id === 'launch-first-sale');
    return buildAction(
      task,
      'Fulfill initial paid customer orders and issue official retail cash memos/invoices.',
      'Unlocks commercial growth and working capital expansion.'
    );
  }

  // Rule 10: Growth & Scale
  if (!isCompleted('growth-financials')) {
    const task = allTasks.find((t) => t.id === 'growth-financials');
    return buildAction(
      task,
      'Maintain strict weekly sales vs operating overhead reconciliation to ensure steady bank EMI coverage.',
      'Unlocks working capital top-ups and credit line enhancements.'
    );
  }

  const defaultTask = allTasks.find((t) => !isCompleted(t.id)) || allTasks[allTasks.length - 1];
  return buildAction(
    defaultTask,
    'Scale your enterprise reach via digital channels, ONDC seller apps, and regional distributors.',
    'Expands revenue and business valuation.'
  );
}
