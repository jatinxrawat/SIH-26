/**
 * Upgraded Business Roadmap Page
 * State-driven Business Journey Engine connecting Profile, Schemes, Funding,
 * Document Intelligence, Next Best Action Engine, and AI Assistant.
 */

import React from 'react';
import { RoadmapProvider } from '../roadmap/context/RoadmapContext';
import JourneyHeader from '../roadmap/components/JourneyHeader';
import NextBestActionCard from '../roadmap/components/NextBestActionCard';
import JourneyTimeline from '../roadmap/components/JourneyTimeline';
import BusinessReadinessCard from '../roadmap/components/BusinessReadinessCard';
import BlockersCard from '../roadmap/components/BlockersCard';
import TaskDetailDrawer from '../roadmap/components/TaskDetailDrawer';
import SuccessToast from '../roadmap/components/SuccessToast';

function RoadmapContent() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 pb-12">
      {/* 1. TOP: Business Journey Header & 8-Stage Pipeline */}
      <JourneyHeader />

      {/* 2. SECOND: 🎯 YOUR NEXT BEST ACTION (Visual Centerpiece) */}
      <NextBestActionCard />

      {/* 3. THIRD & FOURTH: Business Journey Timeline & Stage Details */}
      <JourneyTimeline />

      {/* 4. FIFTH: Intelligence Grid - Business Readiness & Blocker Resolution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-6">
          <BusinessReadinessCard />
        </div>
        <div className="lg:col-span-6">
          <BlockersCard />
        </div>
      </div>

      {/* 5. Slide-Over Task Detail Drawer */}
      <TaskDetailDrawer />

      {/* 6. Feedback Toast */}
      <SuccessToast />
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <RoadmapProvider>
      <RoadmapContent />
    </RoadmapProvider>
  );
}
