import React, { useState, useRef } from 'react';
import {
  FileText,
  FolderCheck,
  ShieldCheck,
  Upload,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  Check,
  Trash2,
  Lock
} from 'lucide-react';
import { useRoadmap } from '../roadmap/context/RoadmapContext';
import { MASTER_DOCUMENTS } from '../roadmap/data/roadmapDefinitions';

export default function DocumentsPage() {
  const { documentStatus, simulateDocumentUpload, toggleDocumentStatus } = useRoadmap();
  const [activeCategory, setActiveCategory] = useState('Personal');
  const fileInputRef = useRef(null);
  const [activeDocForUpload, setActiveDocForUpload] = useState(null);

  const categories = [
    {
      id: 'Personal',
      name: 'Personal Documents',
      desc: 'Identification and promoter KYC required for statutory registrations and bank appraisals.'
    },
    {
      id: 'Business',
      name: 'Business Documents',
      desc: 'Establishment records, premises tenancy leases, and municipal permits.'
    },
    {
      id: 'Financial',
      name: 'Financial Documents',
      desc: 'Banking statements, margin equity proof, and existing loan clearance vouchers.'
    },
    {
      id: 'Government',
      name: 'Government Documents',
      desc: 'Statutory registrations: Udyam MSME certificate, GSTIN, and industry licenses.'
    },
    {
      id: 'Funding',
      name: 'Funding Documents',
      desc: 'Detailed Project Report (DPR), machine vendor quotes, and scheme subsidy dossiers.'
    }
  ];

  const currentCategoryObj = categories.find((c) => c.id === activeCategory) || categories[0];
  const currentDocs = MASTER_DOCUMENTS.filter((doc) => doc.category === activeCategory);

  const totalMasterDocs = MASTER_DOCUMENTS.length;
  const verifiedMasterDocs = MASTER_DOCUMENTS.filter((d) => Boolean(documentStatus[d.id])).length;
  const completionRate = Math.round((verifiedMasterDocs / totalMasterDocs) * 100);

  const handleTriggerUpload = (docId) => {
    setActiveDocForUpload(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file && activeDocForUpload) {
      simulateDocumentUpload(activeDocForUpload, file.name);
    } else if (activeDocForUpload) {
      simulateDocumentUpload(activeDocForUpload);
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveDocForUpload(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Hidden File Input for simulated & real uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        className="hidden"
      />

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

        {/* Live Vault Status Pill */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Readiness</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-lg font-black text-slate-900">
              {verifiedMasterDocs} / {totalMasterDocs}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {completionRate}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Category Selector + Document Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Categories Sidebar */}
        <div className="md:col-span-4 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft-sm space-y-1">
          {categories.map((cat) => {
            const catDocs = MASTER_DOCUMENTS.filter((d) => d.category === cat.id);
            const catReady = catDocs.filter((d) => Boolean(documentStatus[d.id])).length;
            const isAllReady = catReady === catDocs.length && catDocs.length > 0;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-soft-sm'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeCategory === cat.id
                    ? 'bg-emerald-700 text-white'
                    : isAllReady
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {catReady}/{catDocs.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{currentCategoryObj.name}</h2>
              <p className="text-xs text-slate-500 mt-1">{currentCategoryObj.desc}</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentDocs.map((item) => {
              const isVerified = Boolean(documentStatus[item.id]);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isVerified
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-soft-xs'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isVerified ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.name}</span>
                        {isVerified ? (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Verified
                          </span>
                        ) : (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            Required
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        {isVerified
                          ? 'Uploaded & verified in local encrypted vault'
                          : `Required for ${item.requiredFor?.join(', ') || 'Statutory Compliance'}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      onClick={() => toggleDocumentStatus(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isVerified
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {isVerified ? 'Mark Pending' : 'Mark Ready'}
                    </button>

                    <button
                      onClick={() => handleTriggerUpload(item.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-soft-xs cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isVerified ? 'Replace' : 'Upload'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted at rest. Documents securely tied to your active enterprise ID.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
