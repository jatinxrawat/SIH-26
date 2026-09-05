import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

const DEMO_USER_STORAGE_KEY = 'udyamsathi_demo_user';
const DEMO_PROFILE_STORAGE_KEY = 'udyamsathi_demo_profile';

const DEFAULT_DEMO_USER = {
  uid: 'demo-entrepreneur-01',
  displayName: 'Priya Sharma',
  email: 'priya.sharma@udyamsathi.in',
  photoURL: null,
  isDemo: true
};

const DEFAULT_DEMO_PROFILE = {
  id: 'demo-entrepreneur-01',
  name: 'Priya Sharma',
  email: 'priya.sharma@udyamsathi.in',
  onboardingCompleted: true,
  isDemo: true
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user profile from Firestore
  const fetchUserProfile = async (uid) => {
    if (!db) {
      const stored = localStorage.getItem(DEMO_PROFILE_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }

    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUserProfile(data);
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile from Firestore:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check for stored demo user first
    const storedDemoUser = localStorage.getItem(DEMO_USER_STORAGE_KEY);
    const storedDemoProfile = localStorage.getItem(DEMO_PROFILE_STORAGE_KEY);

    if (storedDemoUser && storedDemoProfile) {
      try {
        setCurrentUser(JSON.parse(storedDemoUser));
        setUserProfile(JSON.parse(storedDemoProfile));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem(DEMO_USER_STORAGE_KEY);
        localStorage.removeItem(DEMO_PROFILE_STORAGE_KEY);
      }
    }

    if (!auth) {
      // Firebase not configured; finish loading immediately
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Demo user login for fast review or when Firebase credentials are not set
  const loginAsDemoUser = (completedOnboarding = true) => {
    const demoUser = { ...DEFAULT_DEMO_USER };
    const demoProfile = {
      ...DEFAULT_DEMO_PROFILE,
      onboardingCompleted: completedOnboarding
    };

    localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
    localStorage.setItem(DEMO_PROFILE_STORAGE_KEY, JSON.stringify(demoProfile));

    setCurrentUser(demoUser);
    setUserProfile(demoProfile);
    return { user: demoUser, profile: demoProfile };
  };

  // Sign up with Email and Password
  const signupWithEmail = async (fullName, email, password) => {
    if (!auth || !db) {
      throw new Error(
        'Firebase credentials are not configured in this deployment. Please configure VITE_FIREBASE_* environment variables or continue as Demo Entrepreneur.'
      );
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: fullName
    });

    // Create user document in Firestore
    const newProfile = {
      id: user.uid,
      name: fullName,
      email: user.email,
      onboardingCompleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), newProfile);
    setUserProfile(newProfile);

    return user;
  };

  // Log in with Email and Password
  const loginWithEmail = async (email, password) => {
    if (!auth) {
      throw new Error(
        'Firebase credentials are not configured in this deployment. Please configure VITE_FIREBASE_* environment variables or continue as Demo Entrepreneur.'
      );
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await fetchUserProfile(userCredential.user.uid);
    return { user: userCredential.user, profile };
  };

  // Sign in with Google (Popup)
  const loginWithGoogle = async () => {
    if (!auth || !googleProvider || !db) {
      throw new Error(
        'Firebase credentials are not configured in this deployment. Please configure VITE_FIREBASE_* environment variables or continue as Demo Entrepreneur.'
      );
    }

    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Check if user record already exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    let profile;
    if (!userDocSnap.exists()) {
      profile = {
        id: user.uid,
        name: user.displayName || 'Entrepreneur',
        email: user.email,
        photoURL: user.photoURL || null,
        onboardingCompleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(userDocRef, profile);
    } else {
      profile = userDocSnap.data();
    }

    setUserProfile(profile);
    return { user, profile };
  };

  // Log out
  const logout = async () => {
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    localStorage.removeItem(DEMO_PROFILE_STORAGE_KEY);

    if (auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Error signing out of Firebase:', err);
      }
    }

    setCurrentUser(null);
    setUserProfile(null);
  };

  // Refresh profile state
  const refreshProfile = async () => {
    if (currentUser?.isDemo) {
      const stored = localStorage.getItem(DEMO_PROFILE_STORAGE_KEY);
      if (stored) {
        const p = JSON.parse(stored);
        setUserProfile(p);
        return p;
      }
    }
    if (auth?.currentUser) {
      return await fetchUserProfile(auth.currentUser.uid);
    }
    return null;
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    isFirebaseConfigured,
    loginAsDemoUser,
    signupWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Loading UdyamSaathi...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

