import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { OFFICIAL_LANGUAGES, LOCALE_MAP } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';
import { SCRIPT_FAMILY_FALLBACKS } from '../i18n/locales/familyFallbacks';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'udyam_language';

function interpolate(template, params) {
  if (!params || typeof params !== 'object' || typeof template !== 'string') return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}|\{\s*(\w+)\s*\}/g, (_, k1, k2) => {
    const key = k1 || k2;
    return key in params ? String(params[key]) : `{${key}}`;
  });
}

function resolveNestedKey(obj, parts) {
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return typeof current === 'string' ? current : null;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && OFFICIAL_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = useCallback((code) => {
    if (!code) return;
    const exists = OFFICIAL_LANGUAGES.some((l) => l.code === code);
    if (!exists) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
      document.documentElement.lang = code;
      if (['ur', 'ks', 'sd'].includes(code)) {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch (e) {
      console.warn('Could not save language to storage:', e);
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
      if (['ur', 'ks', 'sd'].includes(language)) {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {
      // ignore
    }
  }, [language]);

  /**
   * Universal translation helper
   * Usage:
   *   t('nav.dashboard')
   *   t('common.save', 'Save Changes')
   *   t('dashboard.managingEnterprises', { count: 3 })
   *   t('dashboard.greeting', 'Hello {name}', { name: 'Jatin' })
   */
  const t = useCallback((path, fallbackOrParams = '', possibleParams = null) => {
    let fallback = '';
    let params = null;

    if (typeof fallbackOrParams === 'object' && fallbackOrParams !== null) {
      params = fallbackOrParams;
      fallback = '';
    } else {
      fallback = typeof fallbackOrParams === 'string' ? fallbackOrParams : '';
      params = possibleParams;
    }

    if (!path) return interpolate(fallback, params) || '';
    const parts = path.split('.');

    // 1. Try active language
    const directResult = resolveNestedKey(TRANSLATIONS[language], parts);
    if (directResult !== null) {
      return interpolate(directResult, params);
    }

    // 2. Try script family fallback (e.g. mai -> hi)
    const fallbackLangCode = SCRIPT_FAMILY_FALLBACKS[language];
    if (fallbackLangCode && TRANSLATIONS[fallbackLangCode]) {
      const famResult = resolveNestedKey(TRANSLATIONS[fallbackLangCode], parts);
      if (famResult !== null) {
        return interpolate(famResult, params);
      }
    }

    // 3. Try English fallback
    const enResult = resolveNestedKey(TRANSLATIONS.en, parts);
    if (enResult !== null) {
      return interpolate(enResult, params);
    }

    // 4. Default fallback or clean path
    return interpolate(fallback || path, params);
  }, [language]);

  const activeLocale = useMemo(() => LOCALE_MAP[language] || 'en-IN', [language]);

  const formatNumber = useCallback((value, options) => {
    if (value === undefined || value === null || isNaN(Number(value))) return '0';
    try {
      return new Intl.NumberFormat(activeLocale, options).format(Number(value));
    } catch {
      return String(value);
    }
  }, [activeLocale]);

  const formatCurrency = useCallback((value, currency = 'INR', options = {}) => {
    if (value === undefined || value === null || isNaN(Number(value))) return '₹0';
    try {
      return new Intl.NumberFormat(activeLocale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
        ...options
      }).format(Number(value));
    } catch {
      return `₹${Number(value).toLocaleString('en-IN')}`;
    }
  }, [activeLocale]);

  const formatDate = useCallback((date, options = {}) => {
    if (!date) return '';
    try {
      const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
      return new Intl.DateTimeFormat(activeLocale, {
        dateStyle: 'medium',
        ...options
      }).format(d);
    } catch {
      return String(date);
    }
  }, [activeLocale]);

  const currentLanguageInfo = useMemo(() => {
    return OFFICIAL_LANGUAGES.find((l) => l.code === language) || OFFICIAL_LANGUAGES[0];
  }, [language]);

  const isRTL = useMemo(() => ['ur', 'ks', 'sd'].includes(language), [language]);

  const value = useMemo(() => ({
    language,
    locale: activeLocale,
    setLanguage,
    t,
    formatNumber,
    formatCurrency,
    formatINR: formatCurrency,
    formatDate,
    languages: OFFICIAL_LANGUAGES,
    currentLanguageInfo,
    isRTL
  }), [language, activeLocale, setLanguage, t, formatNumber, formatCurrency, formatDate, currentLanguageInfo, isRTL]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en',
      locale: 'en-IN',
      setLanguage: () => {},
      t: (path, fallbackOrParams = '', params = null) => {
        const fallback = typeof fallbackOrParams === 'string' ? fallbackOrParams : '';
        const p = typeof fallbackOrParams === 'object' ? fallbackOrParams : params;
        return interpolate(fallback || path, p);
      },
      formatNumber: (v) => String(v ?? '0'),
      formatCurrency: (v) => `₹${Number(v || 0).toLocaleString('en-IN')}`,
      formatINR: (v) => `₹${Number(v || 0).toLocaleString('en-IN')}`,
      formatDate: (d) => String(d || ''),
      languages: OFFICIAL_LANGUAGES,
      currentLanguageInfo: OFFICIAL_LANGUAGES[0],
      isRTL: false
    };
  }
  return context;
}
