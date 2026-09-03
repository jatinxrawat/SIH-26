import React from 'react';

/**
 * UdyamSaathi Brand Logo Component
 * Combines the rising enterprise glyph (Udyam) with the guiding compass star (Saathi).
 */
export function LogoMark({ className = 'w-10 h-10', variant = 'dark', iconClassName = '' }) {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  return (
    <div
      className={`relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${className} ${
        isDark
          ? 'bg-slate-900 text-white shadow-soft-sm border border-slate-800 group-hover:border-emerald-500/40 group-hover:bg-slate-800'
          : isLight
          ? 'bg-emerald-600 text-white shadow-soft-sm group-hover:bg-emerald-500'
          : 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-soft-md'
      }`}
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-3/5 h-3/5 transform transition-transform duration-500 group-hover:rotate-6 ${iconClassName}`}
      >
        {/* Guiding Companion Halo */}
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-30" />
        
        {/* Rising Enterprise Wings / Udyam Chevron */}
        <path
          d="M7 23.5L18 8L29 23.5L18 19L7 23.5Z"
          className="fill-emerald-400/90"
        />
        
        {/* Core Guiding Compass Star (Saathi) */}
        <path
          d="M18 6L20.2 14.8L29 17L20.2 19.2L18 28L15.8 19.2L7 17L15.8 14.8L18 6Z"
          className="fill-amber-400"
          style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))' }}
        />
        
        {/* Dynamic Inner Light */}
        <circle cx="18" cy="17" r="2.5" className="fill-white" />
      </svg>

      {/* Online indicator / companion node */}
      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-[#FBFBFA]" />
      </span>
    </div>
  );
}

export default function Logo({
  variant = 'dark', // 'dark' (for light backgrounds), 'light' (for dark backgrounds)
  size = 'md', // 'sm', 'md', 'lg'
  showTagline = true,
  className = '',
}) {
  const isLightText = variant === 'light';

  const titleSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-lg tracking-tight',
    lg: 'text-xl sm:text-2xl tracking-tight',
  };

  const markSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <LogoMark className={markSizes[size]} variant={variant === 'light' ? 'light' : 'dark'} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black uppercase ${titleSizes[size]} ${
              isLightText ? 'text-white' : 'text-slate-900'
            }`}
          >
            Udyam<span className="text-emerald-500">Saathi</span>
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 leading-none hidden sm:inline-block">
            उद्यम साथी
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
              isLightText ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          >
            AI Digital Business Companion
          </span>
        )}
      </div>
    </div>
  );
}
