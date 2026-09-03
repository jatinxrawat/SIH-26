import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import JourneySection from './components/JourneySection';
import HowItWorks from './components/HowItWorks';
import FeatureShowcase from './components/FeatureShowcase';
import AISection from './components/AISection';
import TrustSection from './components/TrustSection';
import ImpactSection from './components/ImpactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#0F172A] selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Sticky/Floating Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section with interactive profile switcher toggle */}
        <Hero />

        {/* Section 2: The Problem with Before/After comparison toggle */}
        <ProblemSection />

        {/* Section 3: The Solution (Connected Milestone Track) */}
        <JourneySection />

        {/* Section 4: How UdyamSaathi Works (4 Connected Steps) */}
        <HowItWorks />

        {/* Section 5: Feature Showcase with Segmented Control Toggle */}
        <FeatureShowcase />

        {/* Section 6: Context-Aware AI Layer with Scenario Switcher Toggle */}
        <AISection />

        {/* Section 7: Trust & Responsible AI */}
        <TrustSection />

        {/* Section 8: National Impact Metrics */}
        <ImpactSection />

        {/* Section 9: Dark Closing CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
