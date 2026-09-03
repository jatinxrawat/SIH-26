import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './common/Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Impact', href: '#impact' },
    { name: 'About', href: '#trust' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-slate-200/80 shadow-soft-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Mark */}
          <a
            href="#"
            className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-0.5"
            aria-label="UdyamSaathi Home"
          >
            <Logo variant="dark" size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-soft-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#how-it-works"
              className="text-xs px-3.5 py-1.5 font-semibold text-white bg-emerald-600 rounded-lg"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-soft-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
