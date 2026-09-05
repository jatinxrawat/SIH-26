import React, { useState } from 'react';
import { FileText, FolderCheck, ShieldCheck, Upload, AlertCircle, FileCheck, CheckCircle2 } from 'lucide-react';

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('Personal Documents');

  const categories = [
    {
      name: 'Personal Documents',
      desc: 'Identification and proof of address for promoter verification.',
      items: [
        { name: 'Aadhaar Card (Linked to Mobile)', status: 'Ready to Upload', required: true },
        { name: 'PAN Card of Proprietor / Partners', status: 'Ready to Upload', required: true },
        { name: 'Passport Size Photographs', status: 'Ready to Upload', required: false },
        { name: 'Category / Caste Certificate (if applicable)', status: 'Ready to Upload', required: false }
      ]
    },
    {
      name: 'Business Documents',
      desc: 'Commercial establishment records, leases, and permits.',
      items: [
        { name: 'Rent Agreement / Land Title Deed', status: 'Ready to Upload', required: true },
        { name: 'Electricity Bill of Business Premises', status: 'Ready to Upload', required: true },
        { name: 'Partnership Deed / MoA / AoA', status: 'Ready to Upload', required: false },
        { name: 'Shop and Establishment Certificate', status: 'Ready to Upload', required: false }
      ]
    },
    {
      name: 'Financial Documents',
      desc: 'Banking statements, margin proof, and accounts.',
      items: [
        { name: 'Last 6 Months Bank Account Statement', status: 'Ready to Upload', required: true },
        { name: 'ITR Returns (if existing business)', status: 'Ready to Upload', required: false },
        { name: 'Cancelled Cheque', status: 'Ready to Upload', required: true }
      ]
    },
    {
      name: 'Government Documents',
      desc: 'Statutory government registrations and certificates.',
      items: [
        { name: 'Udyam Registration Certificate', status: 'Ready to Upload', required: true },
        { name: 'GSTIN Certificate', status: 'Ready to Upload', required: false },
        { name: 'FSSAI License (Food ventures)', status: 'Ready to Upload', required: false }
      ]
    },
    {
      name: 'Funding Documents',
      desc: 'Project blueprints and bank loan appraisal files.',
      items: [
        { name: 'Detailed Project Report (DPR)', status: 'Generated via UdyamSaathi', required: true },
        { name: 'Machinery & Equipment Quotations', status: 'Ready to Upload', required: true },
        { name: 'PMEGP / Mudra Loan Application Form', status: 'Auto-filled via Profile', required: true }
      ]
    }
  ];

  const current = categories.find((c) => c.name === activeCategory) || categories[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
            <FolderCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Document Vault & Checklist</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Document Center
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Central repository for regulatory compliance records, banking appraisal requirements, and scheme subsidy attachments.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold shrink-0 self-start sm:self-center">
          Secure Vault Beta
        </span>
      </div>

      {/* Main Grid: Category Selector + Document Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Categories Sidebar */}
        <div className="md:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft-sm space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                activeCategory === cat.name
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeCategory === cat.name ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Category Details */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">{current.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{current.desc}</p>
          </div>

          <div className="space-y-3">
            {current.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      {item.required && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          Required
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">{item.status}</span>
                  </div>
                </div>

                <button
                  disabled
                  className="px-3.5 py-1.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold cursor-not-allowed shrink-0 self-start sm:self-center"
                >
                  Upload (Coming Soon)
                </button>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted at rest. Documents will be uploaded to secure government-grade cloud buckets.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
