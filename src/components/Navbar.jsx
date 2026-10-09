import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, LogOut, LayoutDashboard, Globe, ChevronDown, Check } from 'lucide-react';
import Logo from './common/Logo';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef(null);
  const { currentUser, userProfile, logout } = useAuth();
  const { language, setLanguage, languages, currentLanguageInfo, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('landing.howItWorks', 'How It Works'), href: '#how-it-works' },
    { name: t('landing.solutions', 'Solutions'), href: '#solutions' },
    { name: t('landing.impact', 'Impact'), href: '#impact' },
    { name: t('landing.about', 'About'), href: '#trust' },
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
      return { label: t('landing.getStarted', 'Get Started'), to: '/signup' };
    }
    if (userProfile?.onboardingCompleted) {
      return { label: t('nav.dashboard', 'Dashboard'), to: '/dashboard' };
    }
    return { label: t('landing.completeOnboarding', 'Complete Onboarding'), to: '/onboarding' };
  };

  const primaryAction = getPrimaryAction();

  const quickLanguages = [
    { code: 'en', native: 'English', en: 'English' },
    { code: 'hi', native: 'हिन्दी', en: 'Hindi' },
    { code: 'mr', native: 'मराठी', en: 'Marathi' },
    { code: 'bn', native: 'বাংলা', en: 'Bengali' },
    { code: 'gu', native: 'ગુજરાતી', en: 'Gujarati' },
    { code: 'ta', native: 'தமிழ்', en: 'Tamil' },
    { code: 'te', native: 'తెలుగు', en: 'Telugu' },
    { code: 'kn', native: 'ಕನ್ನಡ', en: 'Kannada' },
    { code: 'ml', native: 'മലയാളം', en: 'Malayalam' },
    { code: 'pa', native: 'ਪੰਜਾਬੀ', en: 'Punjabi' },
    { code: 'or', native: 'ଓଡ଼ିଆ', en: 'Odia' },
    { code: 'as', native: 'অসমীয়া', en: 'Assamese' },
    { code: 'ur', native: 'اردو', en: 'Urdu' }
  ];

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
            <Logo variant="dark" size="md" />
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

          {/* Right Action: Language Selector + Login + Get Started */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white border border-slate-200 rounded-xl transition-all shadow-soft-xs"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentLanguageInfo?.nativeName || 'English'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-soft-xl py-2 z-50 animate-in fade-in-50 zoom-in-95 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t('common.selectLanguage', 'Select Language')}
                  </div>
                  {quickLanguages.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{l.native}</span>
                          <span className="text-[11px] text-slate-400">({l.en})</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                    );
                  })}
                  <div className="pt-1 border-t border-slate-100 px-3">
                    <Link
                      to="/settings"
                      onClick={() => setLangDropdownOpen(false)}
                      className="block text-center text-[11px] text-emerald-600 hover:text-emerald-700 font-bold py-1.5"
                    >
                      {t('common.allLanguages', 'All 22 Official Languages')} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 rounded-xl transition-all"
                >
                  {t('landing.signIn', 'Sign In')}
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-soft-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
                >
                  <span>{t('landing.getStarted', 'Get Started')}</span>
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
                  title={t('nav.logout', 'Sign Out')}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Quick Actions */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            {/* Language pill */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-1 text-xs font-semibold"
            >
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{currentLanguageInfo?.code?.toUpperCase()}</span>
            </button>

            {!currentUser ? (
              <>
                <Link
                  to="/login"
                  className="text-xs px-2 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  {t('landing.signIn', 'Sign In')}
                </Link>
                <Link
                  to="/signup"
                  className="text-xs px-2.5 py-1.5 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                >
                  {t('landing.signUp', 'Sign Up')}
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
          {/* Mobile Language Switcher */}
          <div className="py-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {t('common.language', 'Language')}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {quickLanguages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    language === l.code
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

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
                  {t('landing.signIn', 'Sign In')}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 rounded-xl"
                >
                  <span>{t('landing.getStarted', 'Get Started')}</span>
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
                  <span>{t('nav.logout', 'Sign Out')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
