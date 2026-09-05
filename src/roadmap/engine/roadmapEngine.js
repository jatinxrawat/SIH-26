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
  const isFoodProcessing = sector.includes('FOOD') || sector.includes('AGRI');
  const isTextile = sector.includes('HANDLOOM') || sector.includes('TEXTILE');

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
      }
    }

    // Tailor machinery procurement
    if (task.id === 'setup-procurement') {
      if (isFoodProcessing) {
        personalized.description = 'Procure food-grade machinery (heavy-duty pulverizer, pouch sealer, stainless steel sorting tables).';
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
