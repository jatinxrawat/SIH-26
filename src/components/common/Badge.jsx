import React from 'react';

export default function Badge({ children, variant = 'neutral', size = 'md', className = '' }) {
  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    growth: 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-medium',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium',
    sky: 'bg-sky-50 text-sky-800 border-sky-200/80 font-medium',
    dark: 'bg-slate-900 text-white border-slate-800 font-medium',
    outline: 'bg-transparent text-slate-600 border-slate-300',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wide',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3.5 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {children}
    </span>
  );
}
