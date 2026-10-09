import React, { useState, useEffect, useRef } from 'react';
import {
  Users2,
  Search,
  Star,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  CalendarCheck,
  Sparkles,
  Phone,
  MessageSquare,
  Award,
  BookOpen,
  Filter,
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Coins,
  Briefcase,
  Layers,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBusiness } from '../context/BusinessContext';
import { useLanguage } from '../context/LanguageContext';
import { localizeBusinessValue } from '../i18n/platformTranslations';
import { PROFESSIONAL_CATEGORIES } from '../data/professionalsData';
import {
  getAllProfessionals,
  getUserBookings,
  getCurrentProfessional
} from '../services/professionalsService';
import RegisterProfessionalModal from '../components/professionals/RegisterProfessionalModal';
import HireProfessionalModal from '../components/professionals/HireProfessionalModal';
import ProfessionalChatModal from '../components/professionals/ProfessionalChatModal';
import ProfessionalPortalDrawer from '../components/professionals/ProfessionalPortalDrawer';
import BookingsDrawer from '../components/professionals/BookingsDrawer';

export default function ProfessionalsPage() {
  const { currentUser, userProfile } = useAuth();
  const { activeBusiness } = useBusiness();
  const { language, t } = useLanguage();

  const [professionals, setProfessionals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hiringTypeFilter, setHiringTypeFilter] = useState('All'); // 'All' | 'Full-Time' | 'Service'
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef(null);

  // Modal states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedProfessionalForHire, setSelectedProfessionalForHire] = useState(null);
  const [selectedProfessionalForChat, setSelectedProfessionalForChat] = useState(null);
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [isPortalDrawerOpen, setIsPortalDrawerOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const refreshData = () => {
    setProfessionals(getAllProfessionals());
    setBookings(getUserBookings());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleProfessionalRegistered = (newPro) => {
    refreshData();
    showToast(`Welcome! ${newPro.name} has been published with salary range ${newPro.salaryRange}.`);
  };

  const handleBookingSuccess = (newBooking) => {
    refreshData();
    showToast(`Proposal sent to ${newBooking.professionalName} for ${newBooking.hireType}!`);
  };

  const handleBookingCancelled = () => {
    refreshData();
    showToast('Inquiry cancelled.');
  };

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth'
      });
    }
  };

  const getCategoryCount = (cat) => {
    if (cat === 'All') return professionals.length;
    return professionals.filter((p) => p.category === cat).length;
  };

  // Filter logic
  const filteredProfessionals = professionals.filter((pro) => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || pro.category === selectedCategory;

    // Hiring type filter
    let matchesHiringType = true;
    if (hiringTypeFilter === 'Full-Time') {
      matchesHiringType = !pro.hiringTypes || pro.hiringTypes.includes('Full-Time');
    } else if (hiringTypeFilter === 'Service') {
      matchesHiringType = !pro.hiringTypes || pro.hiringTypes.includes('Service / Project');
    }

    // Search filter
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      pro.name.toLowerCase().includes(query) ||
      pro.role.toLowerCase().includes(query) ||
      pro.category.toLowerCase().includes(query) ||
      pro.location.toLowerCase().includes(query) ||
      (pro.salaryRange && pro.salaryRange.toLowerCase().includes(query)) ||
      (pro.specialties && pro.specialties.some((s) => s.toLowerCase().includes(query)));

    return matchesCategory && matchesHiringType && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 animate-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold tracking-wide uppercase">
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('professionals.bannerTag', 'Direct Freelance & Full-Time MSME Hiring')}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {t('professionals.title', 'Professional & Freelance Directory')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('professionals.subtitle', 'Hire verified Chartered Accountants, Corporate Lawyers, DPR Financial Consultants, and Web Experts for one-time services or full-time roles.')}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            {/* Professional Portal button (for the professional side) */}
            <button
              onClick={() => setIsPortalDrawerOpen(true)}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              <Briefcase className="w-4 h-4 text-emerald-200" />
              <span>{t('professionals.portalBtn', 'Professional Portal')}</span>
            </button>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer shadow-soft-xs"
            >
              <UserPlus className="w-4 h-4 text-emerald-300" />
              <span>{t('professionals.registerBtn', 'Register')}</span>
            </button>

            <button
              onClick={() => setIsBookingsDrawerOpen(true)}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('professionals.myHires', 'My Hires')}</span>
              {bookings.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black">
                  {bookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white">{t('professionals.statVerified', '100% Verified')}</div>
              <div className="text-[11px] text-slate-400">{t('professionals.statVerifiedDesc', 'Credentials & Backgrounds')}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <div className="font-bold text-emerald-300">{t('professionals.statSalary', 'Salary Ranges')}</div>
              <div className="text-[11px] text-slate-400">{t('professionals.statSalaryDesc', 'Published transparently')}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <div className="font-bold text-white">{t('professionals.statDomains', 'Service & Full-Time')}</div>
              <div className="text-[11px] text-slate-400">{t('professionals.statDomainsDesc', '12 Specialized Domains')}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-teal-300" />
            </div>
            <div>
              <div className="font-bold text-white">{t('professionals.statChat', 'Direct Chat')}</div>
              <div className="text-[11px] text-slate-400">{t('professionals.statChatDesc', 'Discuss rates & scope')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('professionals.searchPlaceholder', 'Search by name, role, category, salary, or skill...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-600 transition-all bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {t('common.clear', 'Clear')}
              </button>
            )}
          </div>

          {/* Hiring Arrangement Filter (Service vs Full-Time) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0">
            {[
              { id: 'All', label: t('professionals.allHires', 'All Hires') },
              { id: 'Service', label: t('professionals.serviceHire', 'Service Hire') },
              { id: 'Full-Time', label: t('professionals.fullTimeHire', 'Full-Time Hire') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setHiringTypeFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  hiringTypeFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Filter with Smooth Navigation */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => scrollCategories('left')}
            className="hidden sm:flex p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0 mr-1 cursor-pointer transition-colors"
            title="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 scroll-smooth"
          >
            {PROFESSIONAL_CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-soft-sm'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{cat === 'All' ? t('common.all', 'All') : localizeBusinessValue(cat, language)}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-200/90 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollCategories('right')}
            className="hidden sm:flex p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0 ml-1 cursor-pointer transition-colors"
            title="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Count & Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold text-slate-500">
          {t('professionals.showing', 'Showing')} <span className="text-slate-900 font-extrabold">{filteredProfessionals.length}</span> {t('professionals.verifiedPractitioners', 'verified practitioners')}
          {selectedCategory !== 'All' && <span> {t('professionals.inDomain', 'in')} <span className="text-emerald-700 font-black">{localizeBusinessValue(selectedCategory, language)}</span></span>}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredProfessionals.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 space-y-3 shadow-soft-xs">
          <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Users2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">{t('professionals.noResults', 'No professionals found')}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t('professionals.noResultsDesc', 'Try adjusting your search terms or select another domain category.')}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setHiringTypeFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            {t('professionals.resetFilters', 'Reset Filters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
          {filteredProfessionals.map((pro) => (
            <div
              key={pro.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Card Top: Name, Category, Verified badge, Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-950 transition-colors">
                        {pro.name}
                      </h3>
                      {pro.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{t('professionals.verified', 'Verified')}</span>
                        </span>
                      )}
                      {pro.isNewlyRegistered && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold">
                          {t('professionals.newExpert', 'New Expert')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-emerald-700 mt-1">{localizeBusinessValue(pro.role, language)}</p>
                    <span className="text-[11px] font-semibold text-slate-400">{localizeBusinessValue(pro.category, language)}</span>
                  </div>

                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-extrabold shrink-0 shadow-soft-2xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{pro.rating}</span>
                    <span className="text-[10px] text-amber-700/80 font-normal">({pro.reviewCount || 1})</span>
                  </div>
                </div>

                {/* SALARY RANGE HIGHLIGHT (KEY USER REQUIREMENT) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-xs font-black text-slate-900">{t('professionals.expectedSalary', 'Expected Salary Range')}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-900 bg-white px-2.5 py-1 rounded-xl border border-emerald-200 shadow-2xs">
                      {pro.salaryRange || '₹35,000 - ₹65,000 / mo'}
                    </span>
                  </div>

                  {/* Service vs Full-Time breakdown tags */}
                  <div className="flex flex-wrap gap-2 text-[11px] pt-1 border-t border-emerald-200/60">
                    <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                      <Layers className="w-3 h-3 text-emerald-600" />
                      <span>{t('professionals.serviceTag', 'Service')}: <strong className="text-slate-900">{pro.serviceSalaryRange || pro.salaryRange}</strong></span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                      <Briefcase className="w-3 h-3 text-indigo-600" />
                      <span>{t('professionals.fullTimeTag', 'Full-Time')}: <strong className="text-slate-900">{pro.fullTimeSalaryRange || pro.salaryRange}</strong></span>
                    </span>
                  </div>
                </div>

                {/* Location & Experience */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{localizeBusinessValue(pro.location, language)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{localizeBusinessValue(pro.experience, language)} • {pro.availability ? localizeBusinessValue(pro.availability, language) : t('professionals.openAvailability', 'Open for Full-Time & Projects')}</span>
                  </div>
                </div>

                {/* Specialties chips */}
                {pro.specialties && pro.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pro.specialties.slice(0, 4).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        {localizeBusinessValue(spec, language)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bio snippet */}
                {pro.bio && (
                  <p className="text-xs text-slate-500 line-clamp-2 italic pt-1 border-t border-slate-100">
                    "{localizeBusinessValue(pro.bio, language)}"
                  </p>
                )}
              </div>

              {/* Card Footer Actions: CHAT ABOUT SALARY + HIRE */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
                {/* Direct Chat to Discuss Salary */}
                <button
                  type="button"
                  onClick={() => setSelectedProfessionalForChat(pro)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('professionals.discussSalary', 'Discuss Salary')}</span>
                </button>

                {/* Primary Hire Button (Service vs Full-Time) */}
                <button
                  onClick={() => setSelectedProfessionalForHire(pro)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-soft-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('professionals.hireBtn', 'Hire Professional')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: Register as Professional */}
      <RegisterProfessionalModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegistered={handleProfessionalRegistered}
      />

      {/* MODAL 2: Hire Professional (Service vs Full-Time + Salary Range) */}
      <HireProfessionalModal
        isOpen={!!selectedProfessionalForHire}
        professional={selectedProfessionalForHire}
        onClose={() => setSelectedProfessionalForHire(null)}
        initialUser={currentUser || userProfile}
        initialBusiness={activeBusiness}
        onBookingSuccess={handleBookingSuccess}
        onOpenChat={(pro) => {
          setSelectedProfessionalForHire(null);
          setSelectedProfessionalForChat(pro);
        }}
      />

      {/* MODAL 3: Direct Salary & Terms Discussion Chat */}
      <ProfessionalChatModal
        isOpen={!!selectedProfessionalForChat}
        professional={selectedProfessionalForChat}
        onClose={() => setSelectedProfessionalForChat(null)}
        currentUser={currentUser || userProfile}
        activeBusiness={activeBusiness}
      />

      {/* DRAWER 1: Professional Side Management Portal */}
      <ProfessionalPortalDrawer
        isOpen={isPortalDrawerOpen}
        onClose={() => setIsPortalDrawerOpen(false)}
        onOpenChat={(pro) => {
          setIsPortalDrawerOpen(false);
          setSelectedProfessionalForChat(pro);
        }}
        onProfileUpdated={() => refreshData()}
      />

      {/* DRAWER 2: Entrepreneur Hires & Proposals */}
      <BookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        bookings={bookings}
        onBookingCancelled={handleBookingCancelled}
        onOpenChat={(pro) => {
          setIsBookingsDrawerOpen(false);
          setSelectedProfessionalForChat(pro);
        }}
      />
    </div>
  );
}
