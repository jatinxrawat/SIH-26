import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requireCompletedOnboarding = false, requireIncompleteOnboarding = false }) {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not logged in -> send to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user visits /onboarding but has ALREADY completed it -> send to /dashboard
  if (requireIncompleteOnboarding && userProfile?.onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user visits /dashboard but has NOT completed onboarding yet -> send to /onboarding
  if (requireCompletedOnboarding && !userProfile?.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
