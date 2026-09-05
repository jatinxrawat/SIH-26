import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const BusinessContext = createContext(null);

export const STORAGE_KEYS = {
  BUSINESSES: 'udyamsaathi.businesses',
  ACTIVE_ID: 'udyamsaathi.activeBusinessId'
};

// Initial default seed profile (RoomNext)
export const DEFAULT_BUSINESS = {
  id: 'biz_roomnext_primary',
  name: 'RoomNext',
  stage: 'IDEA',
  sector: 'Services',
  type: 'Proprietorship',
  description: 'A newly idea for Students and young professionals seeking flexible, tech-enabled managed co-living spaces.',
  productService: 'General Products/Services',
  targetCustomers: 'Local consumers & retail',
  location: 'Agra, Uttar Pradesh',
  areaClassification: 'Urban',
  operatingStatus: 'Planning to Launch',
  employeesCount: '0',
  monthlyRevenue: 'N/A',
  annualRevenue: 'N/A',
  registrationStatus: 'Unregistered',
  licensesHeld: 'None',
  financialProfile: {
    availableCapital: '₹75,000',
    estimatedProjectCost: '₹3,00,000',
    fundingRequired: '₹2,25,000',
    existingRevenue: 'N/A',
    existingExpenses: 'N/A',
    hasExistingLoans: 'No',
    existingEmi: '0',
    preferredFundingType: 'Government scheme grant / credit guarantee'
  },
  goals: {
    supportNeeded: ['Government schemes', 'Loans / funding', 'Business registration'],
    primaryChallenge: 'Navigating government schemes & paperwork',
    twelveMonthGoal: 'Start my business and onboard first 50 residents',
    additionalNotes: 'Targeting PMEGP and local enterprise incentives'
  },
  personalInfo: {
    fullName: 'Jatin Rawat',
    age: '24',
    gender: 'Male',
    phone: '+91 98765 43210',
    state: 'Uttar Pradesh',
    district: 'Agra',
    locality: 'Agra City',
    ruralUrban: 'Urban',
    entrepreneurStatus: 'PLANNING',
    experienceLevel: 'First-time entrepreneur'
  },
  eligibilityProfile: {
    category: 'General',
    incomeRange: '₹2.5 Lakhs - ₹5 Lakhs',
    employmentStatus: 'Employed',
    disabilityStatus: 'No',
    minorityStatus: 'No',
    notes: 'Aspiring student housing entrepreneur'
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z'
};

// Helper to ensure nested compatibility for existing consumers (profile.business.*, profile.financialProfile.*)
export function normalizeBusinessRecord(raw) {
  if (!raw) return null;
  const bizObj = raw.business || {};
  const personal = raw.personalInfo || {};
  const fin = raw.financialProfile || {};
  const goals = raw.goals || {};
  const eligibility = raw.eligibilityProfile || {};

  const name = raw.name || bizObj.name || 'RoomNext';
  const stage = (raw.stage || bizObj.stage || 'IDEA').toUpperCase();
  const sector = raw.sector || bizObj.sector || 'Services';
  const type = raw.type || bizObj.type || 'Proprietorship';
  const description = raw.description || bizObj.description || '';
  const productService = raw.productService || bizObj.productService || '';
  const targetCustomers = raw.targetCustomers || bizObj.targetCustomers || 'Local consumers & retail';
  const location = raw.location || bizObj.location || (personal.district ? `${personal.district}, ${personal.state}` : 'Agra, Uttar Pradesh');
  const areaClassification = raw.areaClassification || personal.ruralUrban || 'Urban';
  const operatingStatus = raw.operatingStatus || (bizObj.status === 'OPERATING' ? 'Active Enterprise' : 'Planning to Launch');
  const employeesCount = raw.employeesCount || bizObj.employeesCount || '0';
  const monthlyRevenue = raw.monthlyRevenue || bizObj.monthlyRevenue || 'N/A';
  const annualRevenue = raw.annualRevenue || bizObj.annualRevenue || 'N/A';
  const registrationStatus = raw.registrationStatus || bizObj.registrationStatus || 'Unregistered';
  const licensesHeld = raw.licensesHeld || bizObj.licensesHeld || 'None';

  const normalized = {
    ...raw,
    id: raw.id || `biz_${Date.now()}`,
    name,
    stage,
    sector,
    type,
    description,
    productService,
    targetCustomers,
    location,
    areaClassification,
    operatingStatus,
    employeesCount,
    monthlyRevenue,
    annualRevenue,
    registrationStatus,
    licensesHeld,
    personalInfo: {
      fullName: personal.fullName || 'Jatin Rawat',
      age: personal.age || '',
      gender: personal.gender || 'Not specified',
      phone: personal.phone || '',
      state: personal.state || (location.includes(',') ? location.split(',')[1].trim() : 'Uttar Pradesh'),
      district: personal.district || (location.includes(',') ? location.split(',')[0].trim() : 'Agra'),
      locality: personal.locality || '',
      ruralUrban: areaClassification,
      entrepreneurStatus: raw.operatingStatus === 'Active Enterprise' ? 'OPERATING' : 'PLANNING',
      experienceLevel: personal.experienceLevel || 'First-time entrepreneur',
      ...personal
    },
    eligibilityProfile: {
      category: eligibility.category || 'General',
      incomeRange: eligibility.incomeRange || '₹2.5 Lakhs - ₹5 Lakhs',
      employmentStatus: eligibility.employmentStatus || 'Self-employed',
      disabilityStatus: eligibility.disabilityStatus || 'No',
      minorityStatus: eligibility.minorityStatus || 'No',
      notes: eligibility.notes || '',
      ...eligibility
    },
    financialProfile: {
      availableCapital: fin.availableCapital || '₹75,000',
      estimatedProjectCost: fin.estimatedProjectCost || '₹3,00,000',
      fundingRequired: fin.fundingRequired || '₹2,25,000',
      existingRevenue: fin.existingRevenue || 'N/A',
      existingExpenses: fin.existingExpenses || 'N/A',
      hasExistingLoans: fin.hasExistingLoans || 'No',
      existingEmi: fin.existingEmi || '0',
      preferredFundingType: fin.preferredFundingType || 'Government scheme grant / credit guarantee',
      ...fin
    },
    goals: {
      supportNeeded: goals.supportNeeded || ['Government schemes', 'Loans / funding'],
      primaryChallenge: goals.primaryChallenge || 'Navigating government schemes & paperwork',
      twelveMonthGoal: goals.twelveMonthGoal || 'Launch operations',
      additionalNotes: goals.additionalNotes || '',
      ...goals
    },
    // Mirror nested business object for backward compatibility
    business: {
      name,
      stage,
      sector,
      type,
      description,
      productService,
      targetCustomers,
      location,
      status: operatingStatus === 'Active Enterprise' ? 'OPERATING' : 'PLANNING',
      employeesCount,
      monthlyRevenue,
      annualRevenue,
      registrationStatus,
      licensesHeld,
      ...bizObj
    }
  };

  return normalized;
}

export function BusinessProvider({ children }) {
  const { currentUser } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [activeBusinessId, setActiveBusinessIdState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize and load businesses from storage or Firestore
  useEffect(() => {
    async function loadBusinesses() {
      setLoading(true);
      setError(null);
      try {
        let loadedList = [];
        let storedActiveId = null;

        // 1. Check local storage
        try {
          const rawStored = localStorage.getItem(STORAGE_KEYS.BUSINESSES);
          if (rawStored) {
            const parsed = JSON.parse(rawStored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              loadedList = parsed.map(normalizeBusinessRecord);
            }
          }
          storedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
        } catch (e) {
          console.warn('Error reading businesses from localStorage', e);
        }

        // 2. If Firestore is active and user logged in, check user's profile
        if (db && currentUser?.uid && !currentUser?.isDemo) {
          try {
            const docRef = doc(db, 'entrepreneurProfiles', currentUser.uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              if (data.businesses && Array.isArray(data.businesses) && data.businesses.length > 0) {
                loadedList = data.businesses.map(normalizeBusinessRecord);
                if (data.activeBusinessId) {
                  storedActiveId = data.activeBusinessId;
                }
              } else if (data.business?.name) {
                // Migrate single profile into multi-business list
                const single = normalizeBusinessRecord({
                  ...data,
                  id: data.business.id || `biz_${currentUser.uid.slice(0, 8)}`,
                  name: data.business.name,
                  stage: data.business.stage
                });
                loadedList = [single];
                storedActiveId = single.id;
              }
            }
          } catch (fireErr) {
            console.warn('Firestore business fetch error, using local fallback:', fireErr);
          }
        }

        // 3. Fallback: if no businesses found, seed default (RoomNext)
        if (loadedList.length === 0) {
          // Check if legacy demo profile exists
          let legacyData = null;
          try {
            const leg = localStorage.getItem('udyamsathi_demo_profile_data');
            if (leg) legacyData = JSON.parse(leg);
          } catch {}

          const initialBiz = normalizeBusinessRecord(legacyData || DEFAULT_BUSINESS);
          loadedList = [initialBiz];
          storedActiveId = initialBiz.id;
        }

        // Determine active ID
        const validActiveId = loadedList.some(b => b.id === storedActiveId)
          ? storedActiveId
          : loadedList[0].id;

        setBusinesses(loadedList);
        setActiveBusinessIdState(validActiveId);

        // Sync to localStorage
        try {
          localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(loadedList));
          localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, validActiveId);
        } catch {}
      } catch (err) {
        console.error('Fatal error loading businesses:', err);
        setError('Failed to load businesses');
        const fallback = [DEFAULT_BUSINESS];
        setBusinesses(fallback);
        setActiveBusinessIdState(DEFAULT_BUSINESS.id);
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, [currentUser]);

  // Derived active business
  const activeBusiness = useMemo(() => {
    if (!businesses || businesses.length === 0) return null;
    const found = businesses.find(b => b.id === activeBusinessId);
    return found || businesses[0];
  }, [businesses, activeBusinessId]);

  // Persist helper
  const persistState = async (updatedList, newActiveId) => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESSES, JSON.stringify(updatedList));
      if (newActiveId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, newActiveId);
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    if (db && currentUser?.uid && !currentUser?.isDemo) {
      try {
        const docRef = doc(db, 'entrepreneurProfiles', currentUser.uid);
        await setDoc(
          docRef,
          {
            businesses: updatedList,
            activeBusinessId: newActiveId || activeBusinessId,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      } catch (e) {
        console.warn('Firestore sync error:', e);
      }
    }
  };

  // Set Active Business
  const setActiveBusiness = (id) => {
    const target = businesses.find(b => b.id === id);
    if (!target) return;

    setActiveBusinessIdState(id);
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
    } catch {}

    if (db && currentUser?.uid && !currentUser?.isDemo) {
      try {
        const docRef = doc(db, 'entrepreneurProfiles', currentUser.uid);
        updateDoc(docRef, { activeBusinessId: id, updatedAt: serverTimestamp() });
      } catch {}
    }
  };

  // Create Business
  const createBusiness = async (formData) => {
    const newId = `biz_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const newRecord = normalizeBusinessRecord({
      ...formData,
      id: newId,
      ownerId: currentUser?.uid || 'local_user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    const updatedList = [...businesses, newRecord];
    setBusinesses(updatedList);
    setActiveBusinessIdState(newId);
    await persistState(updatedList, newId);
    return newRecord;
  };

  // Update Business
  const updateBusiness = async (id, updatedFields) => {
    const targetId = id || activeBusinessId;
    let updatedRecord = null;

    const updatedList = businesses.map((item) => {
      if (item.id === targetId) {
        const merged = {
          ...item,
          ...updatedFields,
          financialProfile: {
            ...item.financialProfile,
            ...(updatedFields.financialProfile || {})
          },
          goals: {
            ...item.goals,
            ...(updatedFields.goals || {})
          },
          personalInfo: {
            ...item.personalInfo,
            ...(updatedFields.personalInfo || {})
          },
          eligibilityProfile: {
            ...item.eligibilityProfile,
            ...(updatedFields.eligibilityProfile || {})
          },
          updatedAt: new Date().toISOString()
        };
        updatedRecord = normalizeBusinessRecord(merged);
        return updatedRecord;
      }
      return item;
    });

    setBusinesses(updatedList);
    await persistState(updatedList, activeBusinessId);
    return updatedRecord;
  };

  // Delete Business
  const deleteBusiness = async (id) => {
    if (businesses.length <= 1) {
      throw new Error('Cannot delete the only business profile.');
    }

    const updatedList = businesses.filter(b => b.id !== id);
    let nextActiveId = activeBusinessId;
    if (activeBusinessId === id) {
      nextActiveId = updatedList[0].id;
    }

    setBusinesses(updatedList);
    setActiveBusinessIdState(nextActiveId);
    await persistState(updatedList, nextActiveId);
    return true;
  };

  // Refresh businesses
  const refreshBusinesses = () => {
    try {
      const rawStored = localStorage.getItem(STORAGE_KEYS.BUSINESSES);
      if (rawStored) {
        const parsed = JSON.parse(rawStored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBusinesses(parsed.map(normalizeBusinessRecord));
        }
      }
      const storedActive = localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
      if (storedActive) setActiveBusinessIdState(storedActive);
    } catch {}
  };

  const value = {
    businesses,
    activeBusiness,
    activeBusinessId,
    loading,
    error,
    setActiveBusiness,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    refreshBusinesses
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
