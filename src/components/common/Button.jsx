import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft-sm hover:shadow-soft-md focus:ring-emerald-500 rounded-xl',
    secondary: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 shadow-soft-sm hover:shadow-soft-md focus:ring-slate-400 rounded-xl',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-soft-sm hover:shadow-soft-md focus:ring-slate-700 rounded-xl',
    outline: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl focus:ring-slate-300',
    ghost: 'bg-transparent hover:bg-slate-100/80 text-slate-700 rounded-xl focus:ring-slate-200',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
}
