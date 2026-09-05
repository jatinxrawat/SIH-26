import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const EntrepreneurProfileContext = createContext(null);

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
