/**
 * Roadmap Engine
 * Assembles and tailors the roadmap stages and tasks according to entrepreneur profile parameters.
 */

import { ROADMAP_STAGES, MASTER_TASKS } from '../data/roadmapDefinitions';

/**
 * Generates a personalized roadmap task list based on entrepreneur profile.
 * Customizes compliance and setup tasks (e.g. FSSAI for food vs Handloom Mark for weavers).
 */
export function generatePersonalizedRoadmap(profile = {}) {
  const sector = (profile?.business?.sector || profile?.sector || 'GENERAL').toUpperCase();
  const businessType = (profile?.business?.type || profile?.type || '').toUpperCase();
  const businessName = profile?.businessName || profile?.business?.name || 'Enterprise';
  const isFoodProcessing = sector.includes('FOOD') || sector.includes('AGRI');
  const isTextile = sector.includes('HANDLOOM') || sector.includes('TEXTILE');
  const isTechOrServices = sector.includes('TECH') || sector.includes('SERVICE') || sector.includes('HOSPITALITY') || sector.includes('COMMERCE') || businessType.includes('SERVICE');

  return MASTER_TASKS.map((task) => {
    // Clone task
    const personalized = { ...task };

    // Tailor compliance tasks
    if (task.id === 'reg-permits') {
      if (isFoodProcessing) {
        personalized.title = 'Obtain Mandatory FSSAI Basic Registration & Trade NOC';
        personalized.shortTitle = 'FSSAI & Trade Permits';
        personalized.description = 'Apply for FSSAI registration via FoSCoS portal (₹100/yr) and local Gram Panchayat/Municipal Trade NOC.';
        personalized.whatToDo = [
          'Visit official portal: foscos.fssai.gov.in',
          'Upload photo, Aadhaar, and premises lease agreement.',
          'Obtain 14-digit FSSAI registration certificate to print on product labels.'
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
      if (isFoodProcessing) {
        personalized.description = 'Procure food-grade machinery (heavy-duty pulverizer, pouch sealer, stainless steel sorting tables).';
      } else if (isTechOrServices) {
        personalized.title = 'Procure Core Hardware, Cloud Infrastructure & Premises Utilities';
        personalized.shortTitle = 'Tech & Office Setup';
        personalized.description = `Procure workstations, cloud servers, networking equipment, and operational premises tooling for ${businessName}.`;
        personalized.whatToDo = [
          'Finalize vendor quotes for hardware, broadband, and premises furnishings.',
          'Configure cloud infrastructure, domain, SSL, and payment gateway.',
          'Establish premises safety, high-speed broadband, and operations stations.'
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
