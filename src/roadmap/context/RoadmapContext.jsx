/**
 * Roadmap Context & State Management
 * Coordinates deterministic journey engine state, persistence, persona presets, and task actions.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ROADMAP_STAGES, MASTER_DOCUMENTS, DEMO_PERSONAS } from '../data/roadmapDefinitions';
import { generatePersonalizedRoadmap, determineActiveStage } from '../engine/roadmapEngine';
import { calculateOverallProgress, calculateBusinessReadiness, calculateBlockers } from '../engine/progressEngine';
import { getNextBestAction } from '../engine/nextActionEngine';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

const RoadmapContext = createContext(null);

export function RoadmapProvider({ children }) {
  const { profile: loggedInProfile } = useEntrepreneurProfile();

  // Persona management: Default to 'sita' (SIH demo benchmark) or 'priya'
  const [activePersonaKey, setActivePersonaKey] = useState(() => {
    return localStorage.getItem('udyamsathi_active_persona') || 'sita';
  });

  const activePersona = DEMO_PERSONAS[activePersonaKey] || DEMO_PERSONAS.sita;

  // Blended profile context
  const activeProfile = useMemo(() => {
    if (activePersonaKey === 'priya' && loggedInProfile?.personalInfo?.fullName) {
      return {
        ...activePersona,
        name: loggedInProfile.personalInfo.fullName,
        businessName: loggedInProfile.business?.name || activePersona.businessName,
        industry: loggedInProfile.business?.sector || activePersona.industry,
        location: loggedInProfile.personalInfo.locality
          ? `${loggedInProfile.personalInfo.locality}, ${loggedInProfile.personalInfo.state}`
          : activePersona.location,
        availableCapital: loggedInProfile.financialProfile?.availableCapital || activePersona.availableCapital,
        estimatedProjectCost: loggedInProfile.financialProfile?.estimatedProjectCost || activePersona.estimatedProjectCost,
        fundingRequired: loggedInProfile.financialProfile?.fundingRequired || activePersona.fundingRequired
      };
    }
    return activePersona;
  }, [activePersonaKey, activePersona, loggedInProfile]);

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

  // UI Drawer and Toast state
  const [activeDrawerTaskId, setActiveDrawerTaskId] = useState(null);
  const [expandedStageId, setExpandedStageId] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync state when switching persona
  const switchPersona = useCallback((key) => {
    const target = DEMO_PERSONAS[key] || DEMO_PERSONAS.sita;
    setActivePersonaKey(key);
    localStorage.setItem('udyamsathi_active_persona', key);

    const savedTasks = localStorage.getItem(`udyamsathi_completed_tasks_${key}`);
    setCompletedTaskIds(savedTasks ? JSON.parse(savedTasks) : (target.initialCompletedTasks || []));

    const savedDocs = localStorage.getItem(`udyamsathi_docs_${key}`);
    setDocumentStatus(savedDocs ? JSON.parse(savedDocs) : (target.initialDocumentStatus || {}));

    const savedScheme = localStorage.getItem(`udyamsathi_scheme_${key}`);
    setSelectedSchemeId(savedScheme !== null ? JSON.parse(savedScheme) : target.selectedSchemeId);

    setActiveDrawerTaskId(null);
  }, []);

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

  // Generate personalized tasks
  const allTasks = useMemo(() => {
    return generatePersonalizedRoadmap(activeProfile);
  }, [activeProfile]);

  // Current active stage
  const currentStageId = useMemo(() => {
    return determineActiveStage(allTasks, completedTaskIds);
  }, [allTasks, completedTaskIds]);

  // Derived expanded stage (defaults to current active stage)
  const effectiveExpandedStageId = expandedStageId !== null ? expandedStageId : currentStageId;

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
    }, 4000);
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

  // Action: Toggle document readiness
  const toggleDocumentStatus = useCallback((docId) => {
    setDocumentStatus((prev) => {
      const nextVal = !prev[docId];
      const docObj = MASTER_DOCUMENTS.find((d) => d.id === docId);
      const docName = docObj ? docObj.name : 'Document';
      showToast(nextVal ? `✓ ${docName} marked as ready` : `${docName} marked as pending`, 'info');
      return { ...prev, [docId]: nextVal };
    });
  }, [showToast]);

  // Action: Formally select scheme
  const selectScheme = useCallback((schemeId) => {
    setSelectedSchemeId(schemeId);
    // Automatically complete scheme-selection task if not already
    setCompletedTaskIds((prev) => (prev.includes('scheme-selection') ? prev : [...prev, 'scheme-selection']));
    showToast(`✓ Formally linked to ${schemeId} scheme. Required documents checklist updated.`, 'success');
  }, [showToast]);

  // Action: Reset journey to demo baseline
  const resetJourney = useCallback(() => {
    const target = DEMO_PERSONAS[activePersonaKey] || DEMO_PERSONAS.sita;
    setCompletedTaskIds(target.initialCompletedTasks || []);
    setDocumentStatus(target.initialDocumentStatus || {});
    setSelectedSchemeId(target.selectedSchemeId || null);
    setActiveDrawerTaskId(null);
    showToast('Roadmap journey reset to demo baseline.', 'info');
  }, [activePersonaKey, showToast]);

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
    currentStageId,
    expandedStageId: effectiveExpandedStageId,
    setExpandedStageId,
    activeDrawerTaskId,
    toast,
    // Metrics
    overallProgress,
    businessReadiness,
    blockers,
    nextBestAction,
    // Actions
    toggleTaskCompletion,
    toggleDocumentStatus,
    selectScheme,
    openTaskDrawer: setActiveDrawerTaskId,
    closeTaskDrawer: () => setActiveDrawerTaskId(null),
    switchPersona,
    resetJourney,
    showToast
  };

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
