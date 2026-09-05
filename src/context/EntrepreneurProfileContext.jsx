import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const EntrepreneurProfileContext = createContext(null);

const DEMO_PROFILE_DATA_KEY = 'udyamsathi_demo_profile_data';

export const DEFAULT_DEMO_ENTREPRENEUR_PROFILE = {
  personalInfo: {
    fullName: 'Priya Sharma',
    age: '29',
    gender: 'Female',
    phone: '+91 98765 43210',
    state: 'Maharashtra',
    district: 'Pune',
    locality: 'Kothrud',
    ruralUrban: 'URBAN',
    entrepreneurStatus: 'IDEATION',
    experienceLevel: 'BEGINNER'
  },
  eligibilityProfile: {
    category: 'WOMEN',
    incomeRange: '3L - 6L',
    employmentStatus: 'SELF_EMPLOYED',
    disabilityStatus: 'NONE',
    minorityStatus: 'NO',
    notes: 'First-generation woman entrepreneur launching value-added agro enterprise.'
  },
  business: {
    status: 'IDEATION',
    name: 'Sahyadri Agro Naturals',
    sector: 'AGRI_PROCESSING',
    type: 'PRODUCT',
    description: 'Eco-packaged organic fruit pulps and cold-pressed cold chain direct-from-farmer supply.',
    productService: 'Organic fruit purees and value-added spices',
    targetCustomers: 'B2B food brands, urban supermarkets, export merchants',
    location: 'Pune, Maharashtra',
    stage: 'PLANNING',
    employeesCount: '4',
    monthlyRevenue: '₹85,000',
    annualRevenue: '₹10,20,000',
    registrationStatus: 'UDYAM_REGISTERED',
    licensesHeld: 'FSSAI, Udyam MSME Registration'
  },
  financialProfile: {
    availableCapital: '₹2,50,000',
    estimatedProjectCost: '₹15,00,000',
    fundingRequired: '₹12,50,000',
    existingRevenue: '₹85,000 / mo',
    existingExpenses: '₹45,000 / mo',
    hasExistingLoans: 'NO',
    existingEmi: '0',
    preferredFundingType: 'GOVT_SUBSIDY_LOAN'
  },
  goals: {
    supportNeeded: ['Govt Subsidies & Schemes', 'Bank Credit Linkage', 'Food Processing Compliance'],
    primaryChallenge: 'Navigating collateral-free PMEGP/CGTMSE credit subsidies',
    twelveMonthGoal: 'Establish solar-powered processing micro-unit & expand to 3 regional markets.',
    additionalNotes: 'Targeting PMFME & Stand-Up India scheme benefits.'
  },
  onboarding: {
    completed: true,
    completedAt: new Date().toISOString()
  }
};

export function EntrepreneurProfileProvider({ children }) {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async (uid) => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return null;
    }

    // If running in demo mode or without Firestore db
    if (!db || currentUser?.isDemo) {
      setLoading(true);
      try {
        const stored = localStorage.getItem(DEMO_PROFILE_DATA_KEY);
        const data = stored ? JSON.parse(stored) : DEFAULT_DEMO_ENTREPRENEUR_PROFILE;
        setProfile(data);
        return data;
      } catch (e) {
        setProfile(DEFAULT_DEMO_ENTREPRENEUR_PROFILE);
        return DEFAULT_DEMO_ENTREPRENEUR_PROFILE;
      } finally {
        setLoading(false);
      }
    }

    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, 'entrepreneurProfiles', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        return data;
      } else {
        setProfile(null);
        return null;
      }
    } catch (err) {
      console.error('Error fetching entrepreneur profile:', err);
      setError(err.message || 'Failed to load business profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchProfile(currentUser.uid);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [currentUser]);

  // Update specific sections of the profile
  const updateProfileData = async (sectionKey, sectionData) => {
    if (!currentUser?.uid) return false;

    if (!db || currentUser?.isDemo) {
      const updated = {
        ...(profile || DEFAULT_DEMO_ENTREPRENEUR_PROFILE),
        [sectionKey]: {
          ...((profile && profile[sectionKey]) ? profile[sectionKey] : {}),
          ...sectionData
        }
      };
      setProfile(updated);
      try {
        localStorage.setItem(DEMO_PROFILE_DATA_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('LocalStorage save error:', e);
      }
      return true;
    }

    try {
      const docRef = doc(db, 'entrepreneurProfiles', currentUser.uid);
      const updates = {
        [sectionKey]: sectionData,
        'onboarding.updatedAt': serverTimestamp()
      };

      await updateDoc(docRef, updates);
      setProfile((prev) => ({
        ...prev,
        [sectionKey]: {
          ...(prev ? prev[sectionKey] : {}),
          ...sectionData
        }
      }));
      return true;
    } catch (err) {
      console.error('Error updating entrepreneur profile section:', err);
      throw err;
    }
  };

  const refreshProfile = async () => {
    if (currentUser?.uid) {
      return await fetchProfile(currentUser.uid);
    }
    return null;
  };

  const value = {
    profile,
    loading,
    error,
    updateProfileData,
    refreshProfile
  };

  return (
    <EntrepreneurProfileContext.Provider value={value}>
      {children}
    </EntrepreneurProfileContext.Provider>
  );
}

export function useEntrepreneurProfile() {
  const context = useContext(EntrepreneurProfileContext);
  if (!context) {
    throw new Error('useEntrepreneurProfile must be used within an EntrepreneurProfileProvider');
  }
  return context;
}

