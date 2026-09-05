import React, { useState } from 'react';
import { Users2, Search, Star, MapPin, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';

export default function ProfessionalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Accountants & CA',
    'Tax & GST Filing',
    'Legal & Trademarks',
    'Business Consultants',
    'Marketing & Branding',
    'Web & Technology',
    'Loan DPR Assistance'
  ];

  const sampleProfessionals = [
    {
      name: 'Ramesh Sharma & Associates',
      role: 'Chartered Accountant & GST Specialist',
      category: 'Accountants & CA',
      location: 'Local / Remote Support',
      experience: '12+ Years with MSMEs',
      rating: '4.9',
      verified: true
    },
    {
      name: 'Advocate Priya Sen',
      role: 'Corporate Legal & Trademark Counsel',
      category: 'Legal & Trademarks',
      location: 'Pan-India / Virtual Filing',
      experience: '8+ Years IP & Setup',
      rating: '4.8',
      verified: true
    },
    {
      name: 'Apex Financial Services',
      role: 'DPR Preparation & Bank Loan Consultant',
      category: 'Loan DPR Assistance',
      location: 'Regional Lead Bank Coordination',
      experience: '15+ Years CGTMSE / PMEGP',
      rating: '5.0',
      verified: true
    },
    {
      name: 'DigiCraft India',
      role: 'MSME Digital Storefronts & Branding',
      category: 'Web & Technology',
      location: 'Remote Support',
      experience: '6+ Years Small Retail Setup',
      rating: '4.7',
      verified: true
    }
  ];

  const filtered = selectedCategory === 'All'
    ? sampleProfessionals
    : sampleProfessionals.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <Users2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Expert Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Professional Assistance Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Connect with verified accountants, tax filing experts, legal counsel, and web developers trained in small enterprise compliance.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold shrink-0 self-start sm:self-center">
          Marketplace Beta Coming Soon
        </span>
      </div>

      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-soft-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filtered.map((pro, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900">{pro.name}</h3>
                    {pro.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Practitioner" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{pro.role}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shrink-0">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{pro.rating}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{pro.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{pro.experience}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Direct Booking
              </span>
              <button
                disabled
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
