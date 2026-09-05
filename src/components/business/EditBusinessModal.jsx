import React, { useState, useEffect } from 'react';
import {
  X,
  Building2,
  MapPin,
  Briefcase,
  ShieldCheck,
  IndianRupee,
  Target,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle
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

export default function EditBusinessModal({ isOpen, onClose, onSaveSuccess }) {
  const { activeBusiness, updateBusiness } = useBusiness();

  const [activeTab, setActiveTab] = useState('identity');
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Populate form when modal opens or activeBusiness changes
  useEffect(() => {
    if (activeBusiness && isOpen) {
      const personal = activeBusiness.personalInfo || {};
      const fin = activeBusiness.financialProfile || {};
      const goals = activeBusiness.goals || {};

      setFormData({
        // Identity
        name: activeBusiness.name || '',
        stage: activeBusiness.stage || 'IDEA',
        type: activeBusiness.type || 'Proprietorship',
        operatingStatus: activeBusiness.operatingStatus || 'Planning to Launch',
        description: activeBusiness.description || '',

        // Sector & Offering
        sector: activeBusiness.sector || 'Services',
        productService: activeBusiness.productService || '',
        targetCustomers: activeBusiness.targetCustomers || 'Local consumers & retail',

        // Location
        state: personal.state || (activeBusiness.location?.includes(',') ? activeBusiness.location.split(',')[1].trim() : 'Uttar Pradesh'),
        district: personal.district || (activeBusiness.location?.includes(',') ? activeBusiness.location.split(',')[0].trim() : 'Agra'),
        locality: personal.locality || '',
        areaClassification: activeBusiness.areaClassification || personal.ruralUrban || 'Urban',

        // Operations
        registrationStatus: activeBusiness.registrationStatus || 'Unregistered',
        licensesHeld: activeBusiness.licensesHeld || 'None',
        employeesCount: activeBusiness.employeesCount || '0',
        monthlyRevenue: activeBusiness.monthlyRevenue || 'N/A',
        annualRevenue: activeBusiness.annualRevenue || 'N/A',

        // Financials
        estimatedProjectCost: fin.estimatedProjectCost || '₹3,00,000',
        availableCapital: fin.availableCapital || '₹75,000',
        fundingRequired: fin.fundingRequired || '₹2,25,000',
        hasExistingLoans: fin.hasExistingLoans || 'No',
        existingEmi: fin.existingEmi || '0',
        preferredFundingType: fin.preferredFundingType || 'Government scheme grant / credit guarantee',

        // Goals
        primaryChallenge: goals.primaryChallenge || 'Navigating government schemes & paperwork',
        twelveMonthGoal: goals.twelveMonthGoal || 'Launch commercial operations'
      });
      setValidationErrors({});
      setErrorMessage('');
      setSaveSuccess(false);
    }
  }, [activeBusiness, isOpen]);

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

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setErrorMessage('Please fill in all mandatory fields before saving.');
      return;
    }

    try {
      setSaving(true);
      setErrorMessage('');

      const updatedPayload = {
        name: formData.name.trim(),
        stage: formData.stage,
        type: formData.type,
        operatingStatus: formData.operatingStatus,
        description: formData.description.trim(),
        sector: formData.sector,
        productService: formData.productService.trim(),
        targetCustomers: formData.targetCustomers,
        location: `${formData.district.trim()}, ${formData.state}`,
        areaClassification: formData.areaClassification,
        registrationStatus: formData.registrationStatus,
        licensesHeld: formData.licensesHeld.trim() || 'None',
        employeesCount: formData.employeesCount,
        monthlyRevenue: formData.monthlyRevenue,
        annualRevenue: formData.annualRevenue,

        personalInfo: {
          ...(activeBusiness.personalInfo || {}),
          state: formData.state,
          district: formData.district.trim(),
          locality: formData.locality.trim(),
          ruralUrban: formData.areaClassification,
          entrepreneurStatus: formData.operatingStatus === 'Active Enterprise' ? 'OPERATING' : 'PLANNING'
        },

        financialProfile: {
          ...(activeBusiness.financialProfile || {}),
          estimatedProjectCost: formData.estimatedProjectCost,
          availableCapital: formData.availableCapital,
          fundingRequired: formData.fundingRequired,
          hasExistingLoans: formData.hasExistingLoans,
          existingEmi: formData.existingEmi,
          preferredFundingType: formData.preferredFundingType
        },

        goals: {
          ...(activeBusiness.goals || {}),
          primaryChallenge: formData.primaryChallenge,
          twelveMonthGoal: formData.twelveMonthGoal
        }
      };

      await updateBusiness(activeBusiness.id, updatedPayload);

      setSaving(false);
      setSaveSuccess(true);

      if (onSaveSuccess) {
        onSaveSuccess('Business information updated successfully.');
      }

      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 700);
    } catch (err) {
      console.error('Error updating business:', err);
      setSaving(false);
      setErrorMessage('Unable to update business information. Please try again.');
    }
  };

  const tabs = [
    { id: 'identity', label: 'Identity & Stage', icon: Building2 },
    { id: 'offering', label: 'Sector & Offering', icon: Briefcase },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'operations', label: 'Operations & Legal', icon: ShieldCheck },
    { id: 'finance', label: 'Financial Profile', icon: IndianRupee },
    { id: 'goals', label: 'Goals & Targets', icon: Target }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft-sm font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Edit Business Information
              </h2>
              <p className="text-xs text-slate-500">
                Keep your business profile accurate to improve scheme, funding and roadmap recommendations.
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-100 overflow-x-auto scrollbar-none bg-white">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap rounded-t-xl transition-all border-b-2 ${
                  isActive
                    ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: IDENTITY */}
          {activeTab === 'identity' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Enterprise Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. RoomNext"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
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
                    value={formData.stage || 'IDEA'}
                    onChange={(e) => handleChange('stage', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.id} — {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Legal Business Structure
                  </label>
                  <select
                    value={formData.type || 'Proprietorship'}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    {BUSINESS_STRUCTURES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Operating Status
                  </label>
                  <select
                    value={formData.operatingStatus || 'Planning to Launch'}
                    onChange={(e) => handleChange('operatingStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Planning to Launch">Planning to Launch</option>
                    <option value="Active Enterprise">Active Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business Concept Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Summarize the product/service and customer problem being addressed..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SECTOR & OFFERING */}
          {activeTab === 'offering' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industry Sector <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.sector || 'Services'}
                  onChange={(e) => handleChange('sector', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
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
                  Product / Service Specifics
                </label>
                <input
                  type="text"
                  value={formData.productService || ''}
                  onChange={(e) => handleChange('productService', e.target.value)}
                  placeholder="e.g. Managed student housing & co-living spaces"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Customers
                </label>
                <input
                  type="text"
                  value={formData.targetCustomers || ''}
                  onChange={(e) => handleChange('targetCustomers', e.target.value)}
                  placeholder="e.g. College students, remote professionals, young travelers"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State / UT <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.state || 'Uttar Pradesh'}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
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
                    value={formData.district || ''}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="e.g. Agra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                  {validationErrors.district && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1">{validationErrors.district}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Locality / Industrial Area / Ward
                  </label>
                  <input
                    type="text"
                    value={formData.locality || ''}
                    onChange={(e) => handleChange('locality', e.target.value)}
                    placeholder="e.g. Dayalbagh / Sanjay Place"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Area Classification
                  </label>
                  <select
                    value={formData.areaClassification || 'Urban'}
                    onChange={(e) => handleChange('areaClassification', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                    <option value="Semi-Urban">Semi-Urban</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OPERATIONS & COMPLIANCE */}
          {activeTab === 'operations' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registration Status
                  </label>
                  <select
                    value={formData.registrationStatus || 'Unregistered'}
                    onChange={(e) => handleChange('registrationStatus', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="Unregistered">Unregistered</option>
                    <option value="Udyam Registered">Udyam Registered</option>
                    <option value="GST Registered">GST Registered</option>
                    <option value="Udyam & GST Registered">Udyam & GST Registered</option>
                    <option value="Incorporated (MCA)">Incorporated (MCA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Licenses Held
                  </label>
                  <input
                    type="text"
                    value={formData.licensesHeld || ''}
                    onChange={(e) => handleChange('licensesHeld', e.target.value)}
                    placeholder="e.g. FSSAI, Trade License, Shop Act, or None"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Team Size
                  </label>
                  <input
                    type="text"
                    value={formData.employeesCount || '0'}
                    onChange={(e) => handleChange('employeesCount', e.target.value)}
                    placeholder="e.g. 0, 1-5, 10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Monthly Revenue
                  </label>
                  <input
                    type="text"
                    value={formData.monthlyRevenue || 'N/A'}
                    onChange={(e) => handleChange('monthlyRevenue', e.target.value)}
                    placeholder="e.g. N/A or ₹85,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Annual Revenue Bracket
                  </label>
                  <input
                    type="text"
                    value={formData.annualRevenue || 'N/A'}
                    onChange={(e) => handleChange('annualRevenue', e.target.value)}
                    placeholder="e.g. Under ₹5 Lakhs"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCIAL PROFILE */}
          {activeTab === 'finance' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Project Cost
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedProjectCost || ''}
                    onChange={(e) => handleChange('estimatedProjectCost', e.target.value)}
                    placeholder="e.g. ₹3,00,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Own Investment / Margin
                  </label>
                  <input
                    type="text"
                    value={formData.availableCapital || ''}
                    onChange={(e) => handleChange('availableCapital', e.target.value)}
                    placeholder="e.g. ₹75,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Funding Required / Gap
                  </label>
                  <input
                    type="text"
                    value={formData.fundingRequired || ''}
                    onChange={(e) => handleChange('fundingRequired', e.target.value)}
                    placeholder="e.g. ₹2,25,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Existing Loans
                  </label>
                  <select
                    value={formData.hasExistingLoans || 'No'}
                    onChange={(e) => handleChange('hasExistingLoans', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500 bg-white"
                  >
                    <option value="No">No Existing Loans</option>
                    <option value="Yes">Yes, Active Business Loan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Funding Channel
                  </label>
                  <input
                    type="text"
                    value={formData.preferredFundingType || ''}
                    onChange={(e) => handleChange('preferredFundingType', e.target.value)}
                    placeholder="e.g. Government scheme grant / subsidy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GOALS & TARGETS */}
          {activeTab === 'goals' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Enterprise Challenge
                </label>
                <input
                  type="text"
                  value={formData.primaryChallenge || ''}
                  onChange={(e) => handleChange('primaryChallenge', e.target.value)}
                  placeholder="e.g. Navigating government schemes & paperwork"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  12-Month Target Milestone
                </label>
                <textarea
                  rows={3}
                  value={formData.twelveMonthGoal || ''}
                  onChange={(e) => handleChange('twelveMonthGoal', e.target.value)}
                  placeholder="e.g. Launch commercial operations and onboard first 50 residents"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="text-[11px] text-slate-400 font-medium">
            Changes update schemes, funding, and roadmap instantly.
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
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-xl shadow-soft-xs flex items-center gap-1.5 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
