import React, { useState } from 'react';
import {
  X,
  Building2,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Briefcase,
  IndianRupee,
  Layers
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Puducherry'
];

const SECTORS = [
  'Services',
  'Food Processing',
  'Manufacturing',
  'Agriculture & Allied',
  'IT & Software',
  'Retail & E-commerce',
  'Healthcare',
  'Renewable Energy',
  'Handicrafts & Textiles',
  'Education & Skilling',
  'Tourism & Hospitality'
];

const STAGES = [
  { id: 'IDEA', label: 'Idea Validation' },
  { id: 'PLANNING', label: 'Business Planning' },
  { id: 'FUNDING', label: 'Capital & Funding' },
  { id: 'REGISTRATION', label: 'Statutory Registration' },
  { id: 'PRE_LAUNCH', label: 'Operational Setup' },
  { id: 'OPERATING', label: 'Commercial Launch' },
  { id: 'GROWING', label: 'Expansion & Scale' }
];

const BUSINESS_STRUCTURES = [
  'Proprietorship',
  'Partnership Firm',
  'Private Limited Company (Pvt Ltd)',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Cooperative / Farmer Producer Org (FPO)'
];

const INITIAL_NEW_BUSINESS = {
  name: '',
  stage: 'PLANNING',
  sector: 'Food Processing',
  type: 'Proprietorship',
  description: '',
  productService: '',
  targetCustomers: 'Local consumers & retail',
  state: 'Uttar Pradesh',
  district: '',
  locality: '',
  areaClassification: 'Urban',
  operatingStatus: 'Planning to Launch',
  employeesCount: '1-5',
  monthlyRevenue: 'N/A',
  annualRevenue: 'N/A',
  registrationStatus: 'Unregistered',
  licensesHeld: 'None',
  estimatedProjectCost: '₹5,00,000',
  availableCapital: '₹1,00,000',
  fundingRequired: '₹4,00,000',
  preferredFundingType: 'Government scheme grant / credit guarantee',
  twelveMonthGoal: 'Establish operations and achieve break-even',
  primaryChallenge: 'Navigating government schemes & bank credit'
};

export default function AddBusinessModal({ isOpen, onClose, onSuccess }) {
  const { createBusiness, activeBusiness } = useBusiness();
  const [formData, setFormData] = useState(INITIAL_NEW_BUSINESS);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name || !formData.name.trim()) {
      errs.name = 'Business name is required.';
    }
    if (!formData.sector) {
      errs.sector = 'Sector is required.';
    }
    if (!formData.district || !formData.district.trim()) {
      errs.district = 'District/City is required.';
    }
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage('Please fill in the required fields (Name, Sector, District).');
      return;
    }

    try {
      setSaving(true);
      setErrorMessage('');

      const personal = activeBusiness?.personalInfo || {};

      const newBusinessPayload = {
        name: formData.name.trim(),
        stage: formData.stage,
        sector: formData.sector,
        type: formData.type,
        description: formData.description.trim() || `${formData.name} - ${formData.sector} venture`,
        productService: formData.productService.trim() || `${formData.sector} solutions`,
        targetCustomers: formData.targetCustomers,
        location: `${formData.district.trim()}, ${formData.state}`,
        areaClassification: formData.areaClassification,
        operatingStatus: formData.operatingStatus,
        employeesCount: formData.employeesCount,
        monthlyRevenue: formData.monthlyRevenue,
        annualRevenue: formData.annualRevenue,
        registrationStatus: formData.registrationStatus,
        licensesHeld: formData.licensesHeld.trim() || 'None',

        personalInfo: {
          ...personal,
          state: formData.state,
          district: formData.district.trim(),
          locality: formData.locality.trim(),
          ruralUrban: formData.areaClassification
        },

        financialProfile: {
          estimatedProjectCost: formData.estimatedProjectCost,
          availableCapital: formData.availableCapital,
          fundingRequired: formData.fundingRequired,
          existingRevenue: 'N/A',
          existingExpenses: 'N/A',
          hasExistingLoans: 'No',
          existingEmi: '0',
          preferredFundingType: formData.preferredFundingType
        },

        goals: {
          supportNeeded: ['Government schemes', 'Loans / funding'],
          primaryChallenge: formData.primaryChallenge,
          twelveMonthGoal: formData.twelveMonthGoal,
          additionalNotes: ''
        }
      };

      const created = await createBusiness(newBusinessPayload);
      setSaving(false);

      if (onSuccess) {
        onSuccess(created);
      }

      setFormData(INITIAL_NEW_BUSINESS);
      onClose();
    } catch (err) {
      console.error('Error creating business:', err);
      setSaving(false);
      setErrorMessage('Unable to create new business. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Create New Business
              </h2>
              <p className="text-xs text-slate-500">
                Set up another business under your UdyamSaathi account.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Business Identity */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Business Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Sharma Foods"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    validationErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {validationErrors.name && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lifecycle Stage
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => handleChange('stage', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id} — {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {SECTORS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Structure
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {BUSINESS_STRUCTURES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Concept Description
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Briefly describe what this new enterprise will produce, sell, or deliver..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Location & Demographics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  State / UT <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  District / City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  placeholder="e.g. Pune"
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                    validationErrors.district ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {validationErrors.district && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1">{validationErrors.district}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Classification
                </label>
                <select
                  value={formData.areaClassification}
                  onChange={(e) => handleChange('areaClassification', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural</option>
                  <option value="Semi-Urban">Semi-Urban</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Financial Sizing */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
              <span>Capital & Funding</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Cost
                </label>
                <input
                  type="text"
                  value={formData.estimatedProjectCost}
                  onChange={(e) => handleChange('estimatedProjectCost', e.target.value)}
                  placeholder="e.g. ₹10,00,000"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Own Capital
                </label>
                <input
                  type="text"
                  value={formData.availableCapital}
                  onChange={(e) => handleChange('availableCapital', e.target.value)}
                  placeholder="e.g. ₹2,00,000"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Funding Required
                </label>
                <input
                  type="text"
                  value={formData.fundingRequired}
                  onChange={(e) => handleChange('fundingRequired', e.target.value)}
                  placeholder="e.g. ₹8,00,000"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="text-[11px] text-slate-400 font-medium">
            New business will automatically become active.
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-5 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl shadow-soft-xs flex items-center gap-1.5 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Business</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
