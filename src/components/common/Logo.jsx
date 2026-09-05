import React from 'react';

/**
 * UdyamSaathi Standalone Emblem (LogoMark)
 * 
 * Standalone organic vector design without a constraining dark container box:
 * 1. "Udyam" (Enterprise & Momentum): An ascending, fluid ribbon forming the foundational 'U'
 *    that sweeps dynamically into upward business growth.
 * 2. "Saathi" (Companion & Guidance): An energetic 45° saffron compass trajectory paired with
 *    the luminous North Star (Dhruva Tara) representing trusted AI navigation and mentorship.
 * 3. Color Harmony: Sovereign Indian entrepreneurial palette — Forest Emerald (#047857) to Electric Mint (#34D399)
 *    paired with Sunrise Saffron & Gold (#F59E0B -> #EA580C).
 */
export function LogoMark({ className = 'w-10 h-10', variant = 'dark', iconClassName = '' }) {
  const isLight = variant === 'light';

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 select-none ${className} ${iconClassName}`}
      aria-hidden="true"
    >
      <defs>
        {/* Vibrant Emerald Gradient for Udyam Ascent */}
        <linearGradient id="udyam-emerald-gradient" x1="6" y1="36" x2="34" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        {/* Vibrant Saffron/Gold Gradient for Saathi Direction */}
        <linearGradient id="saathi-saffron-gradient" x1="20" y1="26" x2="38" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* Luminous Golden Star */}
        <linearGradient id="saathi-star-gradient" x1="18" y1="6" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* 1. Udyam: The Foundation & Ascending Enterprise Arc */}
      <path
        d="M8 14C8 24.5 14 34 23.5 34C28.5 34 32.8 31.2 35.5 27.2L30.5 23.8C28.8 26.5 26.2 28.2 23.5 28.2C17.5 28.2 13.8 21.8 13.8 14H8Z"
        fill="url(#udyam-emerald-gradient)"
      />

      {/* 2. Growth Momentum: Dynamic 45° Forward Arrow */}
      <path
        d="M23 20L38 8L32 23L28.8 18.2L20.2 24.5L17.5 20.8L26.2 14.5L23 20Z"
        fill="url(#saathi-saffron-gradient)"
      />

      {/* 3. Saathi: The Guiding Pole Star (Dhruva Tara) */}
      <path
        d="M22 6L23.8 12.2L30 14L23.8 15.8L22 22L20.2 15.8L14 14L20.2 12.2L22 6Z"
        fill="url(#saathi-star-gradient)"
      />
      <circle cx="22" cy="14" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}

export default function Logo({
  variant = 'dark', // 'dark' (for light backgrounds), 'light' (for dark backgrounds)
  size = 'md', // 'sm', 'md', 'lg'
  showTagline = true,
  showHindi = true,
  className = '',
}) {
  const isLightText = variant === 'light';

  const titleSizes = {
    sm: 'text-base tracking-tight',
    md: 'text-lg sm:text-xl tracking-tight',
    lg: 'text-xl sm:text-2xl tracking-tight',
  };

  const markSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <LogoMark className={markSizes[size]} variant={variant} />

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-tight leading-tight ${titleSizes[size]} ${
              isLightText ? 'text-white' : 'text-slate-900'
            }`}
          >
            Udyam<span className="text-emerald-600 dark:text-emerald-400 font-black">Saathi</span>
          </span>

          {showHindi && (
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none hidden sm:inline-flex items-center ${
                isLightText
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
              }`}
            >
              उद्यम साथी
            </span>
          )}
        </div>

        {showTagline && (
          <span
            className={`text-[9.5px] uppercase font-bold tracking-wider mt-0.5 leading-none ${
              isLightText ? 'text-emerald-400' : 'text-emerald-700/90'
            }`}
          >
            AI Digital Business Companion
          </span>
        )}
      </div>
    </div>
  );
}
