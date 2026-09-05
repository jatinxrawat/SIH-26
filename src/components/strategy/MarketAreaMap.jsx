import React, { useState } from 'react';
import { MapPin, Navigation, Users, Building2, Store, Truck, Compass, ShieldCheck } from 'lucide-react';

export default function MarketAreaMap({ marketReach, competitors }) {
  const [activeRadius, setActiveRadius] = useState('ALL'); // 'ALL' | '5KM' | '10KM'

  const locality = marketReach?.locationOverview?.locality || 'Village / Ward Core';
  const district = marketReach?.locationOverview?.district || 'District';
  const primary = marketReach?.primaryReach;
  const extended = marketReach?.extendedReach;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-1">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hyper-Local Geographic Model</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            5–10 km Local Market Catchment
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Concentric geographic distribution of customer demand, settlements, and competitor density.
          </p>
        </div>

        {/* Radius Filter Tabs */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveRadius('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRadius === 'ALL'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Full 10 km Catchment
          </button>
          <button
            onClick={() => setActiveRadius('5KM')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRadius === '5KM'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            0–5 km Primary
          </button>
          <button
            onClick={() => setActiveRadius('10KM')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeRadius === '10KM'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5–10 km Extended
          </button>
        </div>
      </div>

      {/* Visual Geographic Map Component */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-4 shadow-inner">
        {/* Subtle Map Grid lines */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* 10 km Outer Catchment Circle */}
        <div
          className={`absolute rounded-full border-2 border-dashed transition-all duration-500 flex items-center justify-center ${
            activeRadius === '5KM'
              ? 'w-72 h-72 sm:w-88 sm:h-88 border-slate-700/40 opacity-30'
              : 'w-72 h-72 sm:w-88 sm:h-88 border-sky-500/40 bg-sky-500/5'
          }`}
        >
          {/* Label 10km Outer */}
          <span className="absolute top-2 right-6 text-[10px] font-black uppercase tracking-wider text-sky-400/80 bg-slate-900/80 px-2 py-0.5 rounded-md border border-sky-500/30 backdrop-blur-sm">
            10 km Outer Boundary
          </span>

          {/* Extended settlements & nodes */}
          <div className="absolute -top-3 left-1/4 flex items-center gap-1 bg-slate-800/90 text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
            <Store className="w-3 h-3 text-sky-400" />
            <span>Regional Haat / Mandi</span>
          </div>

          <div className="absolute bottom-6 right-8 flex items-center gap-1 bg-slate-800/90 text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
            <Building2 className="w-3 h-3 text-amber-400" />
            <span>Sub-District Tehsil Node</span>
          </div>

          <div className="absolute top-1/3 -left-3 flex items-center gap-1 bg-slate-800/90 text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
            <Users className="w-3 h-3 text-indigo-400" />
            <span>Satellite Hamlets</span>
          </div>

          {/* 5 km Inner Catchment Circle */}
          <div
            className={`rounded-full border-2 transition-all duration-500 flex items-center justify-center relative ${
              activeRadius === '10KM'
                ? 'w-44 h-44 sm:w-56 sm:h-56 border-slate-700/40 opacity-40'
                : 'w-44 h-44 sm:w-56 sm:h-56 border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-950/40'
            }`}
          >
            {/* Label 5km Inner */}
            <span className="absolute top-1 left-4 text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-emerald-500/40">
              5 km Primary Zone
            </span>

            {/* Inner settlements */}
            <div className="absolute bottom-3 left-6 flex items-center gap-1 bg-slate-900/90 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-500/30">
              <Truck className="w-2.5 h-2.5" />
              <span>Doorstep Route</span>
            </div>

            <div className="absolute top-4 right-5 flex items-center gap-1 bg-slate-900/90 text-slate-300 text-[9px] px-1.5 py-0.5 rounded-full border border-slate-700">
              <Store className="w-2.5 h-2.5 text-amber-400" />
              <span>Bazaar Junction</span>
            </div>

            {/* Center Anchor: Entrepreneur Hub */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 animate-ping absolute inset-0" />
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-500/50 relative border-2 border-white">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
              </div>
              <div className="mt-1.5 text-center">
                <span className="text-[10px] font-extrabold text-white bg-slate-900/95 px-2 py-0.5 rounded-full border border-emerald-500/40 block truncate max-w-[130px]">
                  {locality} (YOU)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend Overlay at Bottom-Left */}
        <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-xl p-2 text-[10px] space-y-1 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-white">0–5 km:</span> Direct Customers & Doorstep
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
            <span className="font-semibold text-white">5–10 km:</span> Haats, Mandis & Institutions
          </div>
        </div>

        {/* Disclaimer in Top-Right */}
        <div className="absolute top-3 right-3 text-[10px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
          Source: {marketReach?.source ? 'Census / NSSO Benchmarks' : 'Regional Data'}
        </div>
      </div>

      {/* Two-Column Reach Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Primary Reach 0-5 km */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h4 className="font-extrabold text-emerald-950 text-sm">{primary?.label}</h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              Immediate Walk-in & Doorstep
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Population</span>
              <strong className="text-slate-900 text-xs font-black">{primary?.estimatedPopulation}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Households</span>
              <strong className="text-slate-900 text-xs font-black">{primary?.estimatedHouseholds}</strong>
            </div>
          </div>

          <p className="text-[11px] text-emerald-900/90 leading-relaxed">
            <strong>Connectivity & Settlement:</strong> {primary?.densityCharacteristic}. Connected via {primary?.connectivity}.
          </p>
        </div>

        {/* Extended Reach 5-10 km */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
              <h4 className="font-extrabold text-sky-950 text-sm">{extended?.label}</h4>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">
              Weekly Haats & B2B
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="p-2.5 rounded-xl bg-white border border-sky-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Population</span>
              <strong className="text-slate-900 text-xs font-black">{extended?.estimatedPopulation}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-white border border-sky-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Est. Households</span>
              <strong className="text-slate-900 text-xs font-black">{extended?.estimatedHouseholds}</strong>
            </div>
          </div>

          <p className="text-[11px] text-sky-900/90 leading-relaxed">
            <strong>Connectivity & Settlement:</strong> {extended?.densityCharacteristic}. Connected via {extended?.connectivity}.
          </p>
        </div>
      </div>
    </div>
  );
}
