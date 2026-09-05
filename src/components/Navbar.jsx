import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import Logo from './common/Logo';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getPrimaryAction = () => {
    if (!currentUser) {
      return { label: 'Get Started', to: '/signup' };
    }
    if (userProfile?.onboardingCompleted) {
      return { label: 'Dashboard', to: '/dashboard' };
    }
    return { label: 'Complete Onboarding', to: '/onboarding' };
  };

  const primaryAction = getPrimaryAction();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-full ${
        scrolled
          ? 'py-2.5 sm:py-3 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-slate-200/80 shadow-soft-sm'
          : 'py-3 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-2">
          {/* Logo Mark */}
          <Link
            to="/"
            className="focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-0.5 shrink-0"
            aria-label="UdyamSaathi Home"
          >
            <Logo variant="dark" size="sm" showTagline={false} className="sm:hidden" />
            <Logo variant="dark" size="md" className="hidden sm:flex" />
          </Link>

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

          {/* Right Action: Login + Get Started (or Dashboard if logged in) */}
          <div className="hidden md:flex items-center gap-2.5">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl transition-all"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={primaryAction.to}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{primaryAction.label}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Log out"
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Compact Quick Action */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="text-xs px-2 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-xs px-2.5 py-1.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                to={primaryAction.to}
                className="text-xs px-2.5 py-1.5 font-semibold text-white bg-emerald-600 rounded-lg truncate max-w-[120px]"
              >
                {primaryAction.label}
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center py-2.5 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={primaryAction.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl"
                >
                  <span>{primaryAction.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
