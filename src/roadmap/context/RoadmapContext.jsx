/**
 * Roadmap Context & State Management
 * Coordinates deterministic journey engine state, persistence, persona presets,
 * interactive step-checklists, custom AI milestones, search/filter, and document vault.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { ROADMAP_STAGES, MASTER_DOCUMENTS, DEMO_PERSONAS } from '../data/roadmapDefinitions';
import { generatePersonalizedRoadmap, determineActiveStage } from '../engine/roadmapEngine';
import { calculateOverallProgress, calculateBusinessReadiness, calculateBlockers } from '../engine/progressEngine';
import { getNextBestAction } from '../engine/nextActionEngine';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

const RoadmapContext = createContext(null);

export function RoadmapProvider({ children }) {
  const { profile: loggedInProfile } = useEntrepreneurProfile();

  // Derive real user business profile from loggedInProfile
  const userRealProfile = useMemo(() => {
    const biz = loggedInProfile?.business || {};
    const personal = loggedInProfile?.personalInfo || {};
    const fin = loggedInProfile?.financialProfile || {};

    const businessName = biz.name || personal.businessName || 'RoomNext';
    const sector = biz.sector || 'SERVICES_AND_TECH';
    const industry = biz.type || biz.description || 'Enterprise Platform';
    const location = biz.location || (personal.locality ? `${personal.locality}, ${personal.state || 'India'}` : (personal.state || 'India'));

    return {
      id: 'myBusiness',
      isRealUser: true,
      name: personal.fullName || 'Jatin Rawat',
      businessName: businessName,
      sector: sector,
      industry: industry,
      location: location,
      stage: biz.stage || biz.status || 'IDEA',
      availableCapital: fin.availableCapital || '₹2,50,000',
      estimatedProjectCost: fin.estimatedProjectCost || '₹10,00,000',
      fundingRequired: fin.fundingRequired || '₹7,50,000',
      recommendedScheme: 'PMEGP / Stand-Up India',
      schemeMatchScore: '96% Fit',
      schemeSubsidy: 'Up to 35% Capital Subsidy',
      targetCustomers: biz.targetCustomers || 'Students, Young Professionals & Urban Travelers',
      productService: biz.productService || biz.description || `${businessName} Solutions`,
      initialCompletedTasks: [
        'idea-define',
        'idea-customer'
      ],
      initialDocumentStatus: {
        'doc-aadhaar': true,
        'doc-pan': true,
        'doc-caste-cert': false,
        'doc-rent-agreement': false,
        'doc-electricity-bill': false,
        'doc-bank-statement': true,
        'doc-cancelled-cheque': false,
        'doc-quotations': false,
        'doc-dpr': false,
        'doc-udyam': (biz.registrationStatus || '').toUpperCase().includes('UDYAM'),
        'doc-fssai': (biz.licensesHeld || '').toUpperCase().includes('FSSAI')
      },
      selectedSchemeId: null
    };
  }, [loggedInProfile]);

  // Persona management: Default to 'myBusiness' (the user's real business project!)
  const [activePersonaKey, setActivePersonaKey] = useState(() => {
    const saved = localStorage.getItem('udyamsathi_active_persona');
    if (!saved || saved === 'sita') {
      return 'myBusiness';
    }
    return saved;
  });

  const activePersona = useMemo(() => {
    if (activePersonaKey === 'myBusiness') {
      return userRealProfile;
    }
    return DEMO_PERSONAS[activePersonaKey] || userRealProfile;
  }, [activePersonaKey, userRealProfile]);

  const activeProfile = activePersona;

  // Persisted task completions
  const storageCompletedKey = `udyamsathi_completed_tasks_${activePersonaKey}`;
  const [completedTaskIds, setCompletedTaskIds] = useState(() => {
    try {
      const saved = localStorage.getItem(storageCompletedKey);
      return saved ? JSON.parse(saved) : (activePersona.initialCompletedTasks || []);
    } catch {
      return activePersona.initialCompletedTasks || [];
    }
  });

  // Persisted document readiness
  const storageDocsKey = `udyamsathi_docs_${activePersonaKey}`;
  const [documentStatus, setDocumentStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(storageDocsKey);
      return saved ? JSON.parse(saved) : (activePersona.initialDocumentStatus || {});
    } catch {
      return activePersona.initialDocumentStatus || {};
    }
  });

  // Persisted selected scheme
  const storageSchemeKey = `udyamsathi_scheme_${activePersonaKey}`;
  const [selectedSchemeId, setSelectedSchemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(storageSchemeKey);
      return saved !== null ? JSON.parse(saved) : activePersona.selectedSchemeId;
    } catch {
      return activePersona.selectedSchemeId;
    }
  });

  // Persisted task step checklists (sub-task completion map: { taskId: { [stepIdx]: true } })
  const storageChecklistsKey = `udyamsathi_checklists_${activePersonaKey}`;
  const [taskChecklists, setTaskChecklists] = useState(() => {
    try {
      const saved = localStorage.getItem(storageChecklistsKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persisted AI custom tasks
  const storageCustomTasksKey = `udyamsathi_custom_tasks_${activePersonaKey}`;
  const [customTasks, setCustomTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(storageCustomTasksKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Interactive States
  const [activeDrawerTaskId, setActiveDrawerTaskId] = useState(null);
  const [expandedStageIds, setExpandedStageIds] = useState([]);
  const hasInitializedStagesRef = useRef(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'AVAILABLE' | 'COMPLETED' | 'BLOCKED'
  const [isAIMilestoneModalOpen, setIsAIMilestoneModalOpen] = useState(false);
  const [quickAIPlanTask, setQuickAIPlanTask] = useState(null);

  // Sync state when switching persona
  const switchPersona = useCallback((key) => {
    const target = key === 'myBusiness' ? userRealProfile : (DEMO_PERSONAS[key] || userRealProfile);
    setActivePersonaKey(key);
    localStorage.setItem('udyamsathi_active_persona', key);

    const savedTasks = localStorage.getItem(`udyamsathi_completed_tasks_${key}`);
    setCompletedTaskIds(savedTasks ? JSON.parse(savedTasks) : (target.initialCompletedTasks || []));

    const savedDocs = localStorage.getItem(`udyamsathi_docs_${key}`);
    setDocumentStatus(savedDocs ? JSON.parse(savedDocs) : (target.initialDocumentStatus || {}));

    const savedScheme = localStorage.getItem(`udyamsathi_scheme_${key}`);
    setSelectedSchemeId(savedScheme !== null ? JSON.parse(savedScheme) : target.selectedSchemeId);

    const savedChecklists = localStorage.getItem(`udyamsathi_checklists_${key}`);
    setTaskChecklists(savedChecklists ? JSON.parse(savedChecklists) : {});

    const savedCustom = localStorage.getItem(`udyamsathi_custom_tasks_${key}`);
    setCustomTasks(savedCustom ? JSON.parse(savedCustom) : []);

    setActiveDrawerTaskId(null);
    hasInitializedStagesRef.current = false;
    setExpandedStageIds([]);
  }, [userRealProfile]);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageCompletedKey, JSON.stringify(completedTaskIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [completedTaskIds, storageCompletedKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageDocsKey, JSON.stringify(documentStatus));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [documentStatus, storageDocsKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageSchemeKey, JSON.stringify(selectedSchemeId));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [selectedSchemeId, storageSchemeKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageChecklistsKey, JSON.stringify(taskChecklists));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [taskChecklists, storageChecklistsKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageCustomTasksKey, JSON.stringify(customTasks));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customTasks, storageCustomTasksKey]);

  // Generate personalized tasks and combine with any custom AI milestones
  const allTasks = useMemo(() => {
    const base = generatePersonalizedRoadmap(activeProfile);
    return [...base, ...customTasks];
  }, [activeProfile, customTasks]);

  // Current active stage
  const currentStageId = useMemo(() => {
    return determineActiveStage(allTasks, completedTaskIds);
  }, [allTasks, completedTaskIds]);

  // Auto-expand active stage initially (or on persona switch)
  useEffect(() => {
    if (!hasInitializedStagesRef.current && currentStageId) {
      setExpandedStageIds([currentStageId]);
      hasInitializedStagesRef.current = true;
    }
  }, [currentStageId]);

  // Stage expansion helpers
  const toggleStage = useCallback((stageId) => {
    setExpandedStageIds((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  }, []);

  const expandStage = useCallback((stageId) => {
    setExpandedStageIds((prev) => (prev.includes(stageId) ? prev : [...prev, stageId]));
  }, []);

  const collapseStage = useCallback((stageId) => {
    setExpandedStageIds((prev) => prev.filter((id) => id !== stageId));
  }, []);

  const expandAllStages = useCallback(() => {
    setExpandedStageIds(ROADMAP_STAGES.map((s) => s.id));
  }, []);

  const collapseAllStages = useCallback(() => {
    setExpandedStageIds([]);
  }, []);

  const setExpandedStageId = useCallback((id) => {
    if (id === null || id === undefined) {
      setExpandedStageIds([]);
    } else {
      setExpandedStageIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }
  }, []);

  // Overall progress %
  const overallProgress = useMemo(() => {
    return calculateOverallProgress(allTasks, completedTaskIds);
  }, [allTasks, completedTaskIds]);

  // Business readiness radar
  const businessReadiness = useMemo(() => {
    return calculateBusinessReadiness(allTasks, completedTaskIds, documentStatus, selectedSchemeId);
  }, [allTasks, completedTaskIds, documentStatus, selectedSchemeId]);

  // Blockers
  const blockers = useMemo(() => {
    return calculateBlockers(allTasks, completedTaskIds, documentStatus, selectedSchemeId, MASTER_DOCUMENTS);
  }, [allTasks, completedTaskIds, documentStatus, selectedSchemeId]);

  // Dynamic Next Best Action
  const nextBestAction = useMemo(() => {
    return getNextBestAction({
      allTasks,
      completedTaskIds,
      documentStatus,
      selectedSchemeId,
      profile: activeProfile
    });
  }, [allTasks, completedTaskIds, documentStatus, selectedSchemeId, activeProfile]);

  // Show auto-clearing toast
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4500);
  }, []);

  // Action: Toggle task completion
  const toggleTaskCompletion = useCallback((taskId) => {
    setCompletedTaskIds((prev) => {
      const exists = prev.includes(taskId);
      const updated = exists ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      
      const targetTask = allTasks.find((t) => t.id === taskId);
      const title = targetTask ? targetTask.shortTitle || targetTask.title : 'Task';

      if (!exists) {
        showToast(`✓ Completed "${title}". Next milestone unlocked!`, 'success');
      } else {
        showToast(`Marked "${title}" as incomplete.`, 'info');
      }

      return updated;
    });
  }, [allTasks, showToast]);

  // Action: Toggle individual sub-task checklist step
  const toggleTaskStep = useCallback((taskId, stepIndex) => {
    setTaskChecklists((prev) => {
      const taskSteps = prev[taskId] || {};
      const nextVal = !taskSteps[stepIndex];
      const updated = {
        ...prev,
        [taskId]: {
          ...taskSteps,
          [stepIndex]: nextVal
        }
      };

      const taskObj = allTasks.find((t) => t.id === taskId);
      const totalSteps = taskObj?.whatToDo?.length || 1;
      const completedSteps = Object.values(updated[taskId] || {}).filter(Boolean).length;

      if (completedSteps === totalSteps && !completedTaskIds.includes(taskId)) {
        showToast(`All ${totalSteps} checkpoints completed for "${taskObj?.shortTitle || taskObj?.title}". Milestone ready!`, 'success');
      } else {
        showToast(`Step ${stepIndex + 1} ${nextVal ? 'checked' : 'unchecked'}`, 'info');
      }

      return updated;
    });
  }, [allTasks, completedTaskIds, showToast]);

  // Action: Toggle document readiness
  const toggleDocumentStatus = useCallback((docId) => {
    setDocumentStatus((prev) => {
      const nextVal = !prev[docId];
      const docObj = MASTER_DOCUMENTS.find((d) => d.id === docId);
      const docName = docObj ? docObj.name : 'Document';
      showToast(nextVal ? `✓ ${docName} verified & ready` : `${docName} marked as pending`, 'info');
      return { ...prev, [docId]: nextVal };
    });
  }, [showToast]);

  // Action: Simulate file upload with instant verification
  const simulateDocumentUpload = useCallback((docId, customName) => {
    const docObj = MASTER_DOCUMENTS.find((d) => d.id === docId);
    const docName = customName || (docObj ? docObj.name : 'Document');
    setDocumentStatus((prev) => ({ ...prev, [docId]: true }));
    showToast(`✓ Uploaded & verified: ${docName}. Blocker resolved!`, 'success');
  }, [showToast]);

  // Action: Formally select scheme
  const selectScheme = useCallback((schemeId) => {
    setSelectedSchemeId(schemeId);
    setCompletedTaskIds((prev) => (prev.includes('scheme-selection') ? prev : [...prev, 'scheme-selection']));
    showToast(`✓ Formally linked to ${schemeId} scheme. Required documents checklist updated.`, 'success');
  }, [showToast]);

  // Action: Add custom AI milestone
  const addCustomMilestone = useCallback((customTask) => {
    const id = `custom-${Date.now()}`;
    const newTask = {
      id,
      stage: customTask.stage || 'GROWTH',
      title: customTask.title,
      shortTitle: customTask.shortTitle || customTask.title,
      priority: customTask.priority || 'HIGH',
      estimatedTime: customTask.estimatedTime || '2-3 days',
      description: customTask.description || 'Custom business milestone synthesized by AI.',
      whyThisMatters: customTask.whyThisMatters || 'Accelerates enterprise milestone execution.',
      whatToDo: customTask.whatToDo || ['Execute preliminary verification.', 'Assemble required filings.', 'Log progress in UdyamSaathi.'],
      requiredInputs: customTask.requiredInputs || ['Milestone approval'],
      prerequisites: customTask.prerequisites || [],
      unlocks: [],
      requiredDocuments: customTask.requiredDocuments || [],
      relatedSchemes: customTask.relatedSchemes || [],
      isCustom: true
    };

    setCustomTasks((prev) => [...prev, newTask]);
    showToast(`✨ Added custom milestone: "${newTask.title}"`, 'success');
    return newTask;
  }, [showToast]);

  // Action: Reset journey to demo baseline
  const resetJourney = useCallback(() => {
    const target = DEMO_PERSONAS[activePersonaKey] || DEMO_PERSONAS.sita;
    setCompletedTaskIds(target.initialCompletedTasks || []);
    setDocumentStatus(target.initialDocumentStatus || {});
    setSelectedSchemeId(target.selectedSchemeId || null);
    setTaskChecklists({});
    setCustomTasks([]);
    setActiveDrawerTaskId(null);
    setSearchQuery('');
    setActiveFilter('ALL');
    showToast('Roadmap journey reset to demo baseline.', 'info');
  }, [activePersonaKey, showToast]);

  // Action: Print / Export Clean Roadmap Dossier
  const printRoadmapSummary = useCallback(() => {
    window.print();
  }, []);

  const value = {
    // Data
    stages: ROADMAP_STAGES,
    allTasks,
    documents: MASTER_DOCUMENTS,
    profile: activeProfile,
    activePersonaKey,
    // State
    completedTaskIds,
    documentStatus,
    selectedSchemeId,
    taskChecklists,
    customTasks,
    currentStageId,
    expandedStageIds,
    setExpandedStageIds,
    toggleStage,
    expandStage,
    collapseStage,
    expandAllStages,
    collapseAllStages,
    expandedStageId: expandedStageIds[0] || null,
    setExpandedStageId,
    activeDrawerTaskId,
    toast,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isAIMilestoneModalOpen,
    setIsAIMilestoneModalOpen,
    quickAIPlanTask,
    setQuickAIPlanTask,
    // Metrics
    overallProgress,
    businessReadiness,
    blockers,
    nextBestAction,
    // Actions
    toggleTaskCompletion,
    toggleTaskStep,
    toggleDocumentStatus,
    simulateDocumentUpload,
    selectScheme,
    addCustomMilestone,
    openTaskDrawer: setActiveDrawerTaskId,
    closeTaskDrawer: () => setActiveDrawerTaskId(null),
    switchPersona,
    resetJourney,
    showToast,
    printRoadmapSummary
  };

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

const fallbackRoadmapContext = {
  stages: ROADMAP_STAGES,
  allTasks: [],
  documents: MASTER_DOCUMENTS,
  profile: DEMO_PERSONAS.sita,
  activePersonaKey: 'sita',
  completedTaskIds: [],
  documentStatus: {},
  selectedSchemeId: null,
  taskChecklists: {},
  customTasks: [],
  currentStageId: 1,
  expandedStageIds: [1],
  setExpandedStageIds: () => {},
  toggleStage: () => {},
  expandStage: () => {},
  collapseStage: () => {},
  expandAllStages: () => {},
  collapseAllStages: () => {},
  expandedStageId: 1,
  setExpandedStageId: () => {},
  activeDrawerTaskId: null,
  toast: null,
  searchQuery: '',
  setSearchQuery: () => {},
  activeFilter: 'ALL',
  setActiveFilter: () => {},
  isAIMilestoneModalOpen: false,
  setIsAIMilestoneModalOpen: () => {},
  quickAIPlanTask: null,
  setQuickAIPlanTask: () => {},
  overallProgress: 0,
  businessReadiness: { overallScore: 0, dimensions: {} },
  blockers: { totalBlockers: 0, blockerList: [] },
  nextBestAction: null,
  toggleTaskCompletion: () => {},
  toggleTaskStep: () => {},
  toggleDocumentStatus: () => {},
  simulateDocumentUpload: () => {},
  selectScheme: () => {},
  addCustomMilestone: () => {},
  openTaskDrawer: () => {},
  closeTaskDrawer: () => {},
  switchPersona: () => {},
  resetJourney: () => {},
  showToast: () => {},
  printRoadmapSummary: () => {}
};

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (!context) {
    return fallbackRoadmapContext;
  }
  return context;
}
