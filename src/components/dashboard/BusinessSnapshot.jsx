import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';

export default function BusinessSnapshot() {
  const { profile } = useEntrepreneurProfile();

  const business = profile?.business || {};
  const personal = profile?.personalInfo || {};
  const finances = profile?.financialProfile || {};

  const details = [
    { label: 'Business Name', value: business.name || 'Not provided' },
    { label: 'Industry Sector', value: business.sector || 'Not provided' },
    {
      label: 'Location',
      value: personal.district
        ? `${personal.district}, ${personal.state || ''}`
        : 'Not provided'
    },
    {
      label: 'Business Stage',
      value: business.stage ? business.stage.replace('_', ' ') : 'Not provided'
    },
    { label: 'Available Capital', value: finances.availableCapital || 'Not provided' },
    { label: 'Estimated Project Cost', value: finances.estimatedProjectCost || 'Not provided' },
    { label: 'Entity Status', value: business.status === 'OPERATING' ? 'Active Enterprise' : 'Planning to Start' },
    { label: 'Entity Structure', value: business.type || 'Not provided' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Business Snapshot
            </h2>
            <p className="text-xs text-slate-500">
              Core enterprise parameters registered during onboarding.
            </p>
          </div>
        </div>

        <Link
          to="/business"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>View Business Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {details.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {item.label}
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
