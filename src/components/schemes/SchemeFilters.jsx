import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { SCHEME_CATEGORIES, BUSINESS_SECTORS, FUNDING_RANGES } from '../../data/schemesData';

export default function SchemeFilters({
  filters,
  onFilterChange,
  onReset,
  totalCount,
  matchedCount
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-soft-sm space-y-4">
      {/* Search and Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by scheme name, ministry, or keywords (e.g. PMEGP, Subsidy, ODOP)..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-emerald-700">{matchedCount}</strong> of {totalCount} schemes
          </span>
          {(filters.category !== 'ALL' || filters.sector !== 'ALL' || filters.fundingRange !== 'ALL' || filters.locationScope !== 'ALL' || filters.search) && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
        {/* Scheme Type */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Support Type
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {SCHEME_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Business Sector */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Target Sector
          </label>
          <select
            value={filters.sector}
            onChange={(e) => onFilterChange('sector', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {BUSINESS_SECTORS.map(sec => (
              <option key={sec.id} value={sec.id}>{sec.label}</option>
            ))}
          </select>
        </div>

        {/* Funding Range */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Funding Scale
          </label>
          <select
            value={filters.fundingRange}
            onChange={(e) => onFilterChange('fundingRange', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {FUNDING_RANGES.map(f => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </div>

        {/* Location Scope */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Jurisdiction
          </label>
          <select
            value={filters.locationScope}
            onChange={(e) => onFilterChange('locationScope', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Sources (Central, State, Banks, CSR)</option>
            <option value="CENTRAL">Central National Schemes</option>
            <option value="STATE">State-Specific Schemes</option>
            <option value="BANKING">Banking & Institutional Credit</option>
            <option value="PRIVATE">Startup Grants, Incubators & CSR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
