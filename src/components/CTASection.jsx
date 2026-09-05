import React from 'react';
import { Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden">
      {/* Background Compass Graphic Watermark */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 sm:w-[540px] sm:h-[540px] text-emerald-900/20 pointer-events-none -z-0">
        <Compass className="w-full h-full stroke-[0.8] animate-spin" style={{ animationDuration: '120s' }} />
      </div>

      {/* Subtle radial emerald flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>One Guided Journey</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Your idea deserves a <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
            clear path forward.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Start with your business idea. UdyamSaathi helps you understand the opportunities, plan the journey, and take the next step.
        </p>

        {/* Primary CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-2xl shadow-soft-lg hover:shadow-emerald-500/20 transition-all duration-200 group active:scale-[0.98]"
          >
            <span>Start Your Business Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Secondary Text */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Built for first-time entrepreneurs</span>
          <span className="text-slate-600">•</span>
          <span>Free & Open Framework</span>
        </div>

      </div>
    </section>
  );
}
