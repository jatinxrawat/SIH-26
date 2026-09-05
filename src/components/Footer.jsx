import React from 'react';
import { ArrowUp } from 'lucide-react';
import Logo from './common/Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B132B] text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#" aria-label="UdyamSaathi Home">
              <Logo variant="light" size="md" />
            </a>

            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-sm">
              From Business Idea to Business Growth — One Guided Journey.
            </p>

            <p className="mt-3 text-xs text-slate-500 leading-relaxed max-w-sm">
              Empowering India’s rural and marginalized first-time entrepreneurs with government scheme discovery, transparent funding plans, and personalized next best actions.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Scheme Intelligence
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  Funding
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#trust" className="hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-emerald-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-emerald-400 transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Back to Top */}
          <div className="md:col-span-1 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 UdyamSaathi. Built for entrepreneurial empowerment.
          </div>
          <div className="flex items-center gap-2">
            <span>National MSME Digital Enablement Platform</span>
            <span>•</span>
            <span className="text-emerald-500 font-medium">Digital India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
