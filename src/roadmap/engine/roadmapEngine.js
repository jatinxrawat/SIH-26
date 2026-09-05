/**
 * Roadmap Engine
 * Assembles and tailors the roadmap stages and tasks according to entrepreneur profile parameters
 * and real business description / domain classification.
 */

import { ROADMAP_STAGES, MASTER_TASKS } from '../data/roadmapDefinitions';
import { classifyBusinessDomain, BUSINESS_DOMAINS } from '../../services/strategy/businessDomainClassifier';

/**
 * Generates a personalized roadmap task list based on entrepreneur profile and real business description.
 */
export function generatePersonalizedRoadmap(profile = {}) {
  const business = profile?.business || {};
  const personal = profile?.personalInfo || {};
  const businessName = business.name || profile?.businessName || 'Enterprise';

  const domainInfo = classifyBusinessDomain(business, personal);
  const { domainKey } = domainInfo;

  const isAgriMachineryOrMfg = domainKey === BUSINESS_DOMAINS.AGRI_EQUIPMENT_MACHINERY || domainKey === BUSINESS_DOMAINS.MANUFACTURING_FABRICATION;
  const isFoodProcessing = domainKey === BUSINESS_DOMAINS.AGRI_FOOD_PROCESSING;
  const isDairy = domainKey === BUSINESS_DOMAINS.DAIRY_ANIMAL_HUSBANDRY;
  const isTextile = domainKey === BUSINESS_DOMAINS.TEXTILE_APPAREL_FASHION;
  const isTechOrServices = domainKey === BUSINESS_DOMAINS.TECH_ELECTRONICS_REPAIR || domainKey === BUSINESS_DOMAINS.SERVICES_LOGISTICS_TRANSPORT || domainKey === BUSINESS_DOMAINS.RETAIL_KIRANA_COMMERCE;

  return MASTER_TASKS.map((task) => {
    const personalized = { ...task };

    // Tailor compliance & statutory licensing tasks
    if (task.id === 'reg-permits') {
      if (isAgriMachineryOrMfg) {
        personalized.title = 'Obtain Workshop Trade License, Udyam MSME Registration & Green/White PCB NOC';
        personalized.shortTitle = 'Workshop License & PCB NOC';
        personalized.description = `Register ${businessName} under Udyam MSME (NIC 2821 - Agricultural Machinery) and obtain local Panchayat/Municipal trade permit and Pollution Control Board White-Category consent.`;
        personalized.whatToDo = [
          'Register on official portal udyamregistration.gov.in under Manufacturing (NIC 2821).',
          'Obtain local Gram Panchayat or Municipal Corporation workshop trade permit.',
          'File State Pollution Control Board (SPCB) White-Category intimation (zero polluting effluent for light assembly).'
        ];
        personalized.requiredDocuments = ['Aadhaar & PAN', 'Workshop Premises Lease / Electricity Bill', 'Udyam Registration Certificate'];
      } else if (isFoodProcessing) {
        personalized.title = 'Obtain Mandatory FSSAI Basic Registration & Trade NOC';
        personalized.shortTitle = 'FSSAI & Trade Permits';
        personalized.description = 'Apply for FSSAI registration via FoSCoS portal (₹100/yr) and local Gram Panchayat/Municipal Trade NOC.';
        personalized.whatToDo = [
          'Visit official portal: foscos.fssai.gov.in',
          'Upload photo, Aadhaar, and premises lease agreement.',
          'Obtain 14-digit FSSAI registration certificate to print on product packaging.'
        ];
      } else if (isDairy) {
        personalized.title = 'Obtain Dairy FSSAI License, Veterinary NOC & Local Panchayat Permit';
        personalized.shortTitle = 'Dairy Permits & Veterinary NOC';
        personalized.description = 'Register on FSSAI FoSCoS for dairy handling and obtain local animal husbandry / veterinary health clearance.';
        personalized.whatToDo = [
          'Register on FoSCoS portal for milk collection and handling category.',
          'Obtain local veterinary officer health inspection certificate for livestock.',
          'Obtain Gram Panchayat trade permit for dairy premises.'
        ];
      } else if (isTextile) {
        personalized.title = 'Obtain Handloom Mark / Silk Mark & Weaver ID';
        personalized.shortTitle = 'Handloom Mark & Permits';
        personalized.description = 'Enroll with Weaver Service Centre for authentic Handloom Mark certification and yarn subsidy.';
      } else if (isTechOrServices) {
        personalized.title = 'Obtain Shop & Commercial Establishment License & Trade NOC';
        personalized.shortTitle = 'Shop Act & Permits';
        personalized.description = `Register ${businessName} under state Shops & Commercial Establishments Act and local municipal trade license.`;
        personalized.whatToDo = [
          'Visit State Labor Department / Municipal Corporation portal.',
          'Submit business PAN, Aadhaar, and premises lease or utility bill.',
          'Obtain statutory Shop & Establishment certificate for bank current account.'
        ];
      }
    }

    // Tailor machinery and infrastructure procurement
    if (task.id === 'setup-procurement') {
      if (isAgriMachineryOrMfg) {
        personalized.title = 'Procure Workshop Tooling, Inverter Welders, Cutting Gear & Steel Stock';
        personalized.shortTitle = 'Workshop Tooling & Steel';
        personalized.description = `Procure heavy-duty welding inverters, metal cutting equipment, lathe/bench drills, calibration jigs, and initial structural steel tubes for ${businessName}.`;
        personalized.whatToDo = [
          'Finalize vendor quotes for ARC/MIG welding sets, metal chop saws, and bench drill presses.',
          'Fabricate assembly jigs for standardized frame welding and blade alignment.',
          'Stock initial batch of structural steel, hardened wear plates, and fastening hardware.'
        ];
      } else if (isFoodProcessing) {
        personalized.description = 'Procure food-grade machinery (heavy-duty pulverizer, pouch sealer, stainless steel sorting tables).';
      } else if (isDairy) {
        personalized.title = 'Procure Milking Equipment, Insulated Cans & Stainless Steel Handling Cans';
        personalized.shortTitle = 'Dairy Equipment Setup';
        personalized.description = 'Procure stainless steel 304 food-grade milk cans, automated milking units, and lactometer testing kits.';
      } else if (isTechOrServices) {
        personalized.title = 'Procure Core Hardware, Diagnostic Tools & Premises Setup';
        personalized.shortTitle = 'Tech & Office Setup';
        personalized.description = `Procure workstations, diagnostic tools, broadband connection, and operational premises tooling for ${businessName}.`;
      }
    }

    // Tailor marketing and pilot launch
    if (task.id === 'launch-pilot') {
      if (isAgriMachineryOrMfg) {
        personalized.title = 'Conduct On-Farm Field Demonstrations for 15 Local Farmers';
        personalized.shortTitle = 'On-Farm Pilot Demonstrations';
        personalized.description = `Conduct 15 live on-farm trials across nearby villages to prove machine performance on local soil before full commercial launch.`;
        personalized.whatToDo = [
          'Select 3 progressive village farmers to test prototypes on their actual fields.',
          'Record before-and-after labor savings and speed improvements.',
          'Capture 30-second demonstration video clips to share on farmer WhatsApp groups.'
        ];
      }
    }

    return personalized;
  });
}

/**
 * Derives current active stage based on incomplete tasks.
 */
export function determineActiveStage(allTasks = [], completedTaskIds = []) {
  for (const stage of ROADMAP_STAGES) {
    const stageTasks = allTasks.filter((t) => t.stage === stage.id);
    const allCompleted = stageTasks.length > 0 && stageTasks.every((t) => completedTaskIds.includes(t.id));
    if (!allCompleted) {
      return stage.id;
    }
  }
  return ROADMAP_STAGES[ROADMAP_STAGES.length - 1].id;
}
