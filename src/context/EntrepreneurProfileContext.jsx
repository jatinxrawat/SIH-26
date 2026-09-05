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

import { useBusiness } from './BusinessContext';

export function EntrepreneurProfileProvider({ children }) {
  const { activeBusiness, loading: bizLoading, error: bizError, updateBusiness, refreshBusinesses } = useBusiness();

  // The active business profile is the single source of truth
  const profile = activeBusiness;
  const loading = bizLoading;
  const error = bizError;

  // Update specific sections of the profile
  const updateProfileData = async (sectionKey, sectionData) => {
    if (!activeBusiness?.id) return false;
    try {
      await updateBusiness(activeBusiness.id, {
        [sectionKey]: sectionData
      });
      return true;
    } catch (err) {
      console.error('Error updating entrepreneur profile section:', err);
      throw err;
    }
  };

  const refreshProfile = async () => {
    refreshBusinesses();
    return activeBusiness;
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

