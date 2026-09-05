import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Edit3, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { useEntrepreneurProfile } from '../../context/EntrepreneurProfileContext';
import { useBusiness } from '../../context/BusinessContext';
import EditBusinessModal from '../business/EditBusinessModal';

export default function BusinessSnapshot() {
  const { profile } = useEntrepreneurProfile();
  const { activeBusiness } = useBusiness();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const business = activeBusiness || profile?.business || profile || {};
  const personal = business.personalInfo || profile?.personalInfo || {};
  const finances = business.financialProfile || profile?.financialProfile || {};

  const details = [
    { label: 'Business Name', value: business.name || 'Not provided', highlight: true },
    { label: 'Industry Sector', value: business.sector || 'Not provided' },
    {
      label: 'Location',
      value: business.location || (personal.district
        ? `${personal.district}, ${personal.state || ''}`
        : 'Not provided')
    },
    {
      label: 'Business Stage',
      value: business.stage ? business.stage.replace('_', ' ') : 'Not provided'
    },
    { label: 'Available Margin', value: finances.availableCapital || 'Not provided' },
    { label: 'Estimated Project Cost', value: finances.estimatedProjectCost || 'Not provided' },
    { label: 'Funding Gap', value: finances.fundingRequired || 'Not provided' },
    { label: 'Entity Status', value: business.operatingStatus || (business.status === 'OPERATING' ? 'Active Enterprise' : 'Planning to Launch') },
    { label: 'Entity Structure', value: business.type || 'Not provided' },
    { label: 'Area Type', value: business.areaClassification || personal.ruralUrban || 'Urban' }
  ];

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shadow-soft-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Business Snapshot
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {business.stage || 'IDEA'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Core enterprise parameters evaluated across subsidies and bank credit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Details</span>
            </button>

            <Link
              to="/business"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors border border-emerald-200"
            >
              <span>Manage Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          {details.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.highlight
                  ? 'bg-emerald-50/50 border-emerald-200 shadow-soft-xs'
                  : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-300'
              }`}
            >
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

      {/* Interactive Modal to Edit Parameters */}
      <EditBusinessModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
