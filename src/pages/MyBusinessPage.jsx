import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Tag, Users, Calendar, ShieldCheck, Edit3, ArrowRight } from 'lucide-react';
import { useEntrepreneurProfile } from '../context/EntrepreneurProfileContext';

export default function MyBusinessPage() {
  const { profile } = useEntrepreneurProfile();
  const business = profile?.business || {};
  const personal = profile?.personalInfo || {};

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-soft-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {business.name || 'My Enterprise'}
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {business.stage ? business.stage.replace('_', ' ') : 'PLANNING'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Registered entity profile and operational details.
            </p>
          </div>
        </div>

        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all self-start sm:self-center"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Business Info</span>
        </Link>
      </div>

      {/* Business Core Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entity Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
            Entity Structure
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Business Structure:</span>
              <strong className="text-slate-900">{business.type || 'Not specified'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Industry Sector:</span>
              <strong className="text-slate-900">{business.sector || 'General'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Operating Status:</span>
              <strong className="text-slate-900">
                {business.status === 'OPERATING' ? 'Active Enterprise' : 'Planning to Launch'}
              </strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Location:</span>
              <strong className="text-slate-900">{personal.district || 'District'}, {personal.state || 'State'}</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Area Classification:</span>
              <strong className="text-slate-900">{personal.ruralUrban || 'Urban'}</strong>
            </div>
          </div>
        </div>

        {/* Operational & Compliance Metrics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
            Operations & Compliance
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Registration Status:</span>
              <strong className="text-slate-900">{business.registrationStatus || 'Unregistered'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Licenses Held:</span>
              <strong className="text-slate-900">{business.licensesHeld || 'None'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Team Size:</span>
              <strong className="text-slate-900">{business.employeesCount || '1 (Solo founder)'}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Monthly Revenue:</span>
              <strong className="text-slate-900">{business.monthlyRevenue || 'Pre-revenue'}</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Annual Revenue Bracket:</span>
              <strong className="text-slate-900">{business.annualRevenue || 'N/A'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Product Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
          Concept & Target Market
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 font-medium block mb-1">Business Description:</span>
            <p className="text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {business.description || 'No business description provided.'}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-slate-500 font-medium block mb-1">Product / Service Provided:</span>
              <p className="text-slate-800 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                {business.productService || 'General Products/Services'}
              </p>
            </div>
            <div>
              <span className="text-slate-500 font-medium block mb-1">Target Customers:</span>
              <p className="text-slate-800 font-semibold bg-slate-50 p-3 rounded-xl border border-slate-100">
                {business.targetCustomers || 'Local consumers'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
