import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { OFFICIAL_LANGUAGES } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'udyam_language';

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
   * Usage: t('nav.dashboard') or t('common.save', 'Save')
   */
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');

    // 1. Try active language
    let current = TRANSLATIONS[language];
    let found = true;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }

    if (found && typeof current === 'string') {
      return current;
    }

    // 2. Try English fallback
    let enCurrent = TRANSLATIONS.en;
    let enFound = true;
    for (const part of parts) {
      if (enCurrent && typeof enCurrent === 'object' && part in enCurrent) {
        enCurrent = enCurrent[part];
      } else {
        enFound = false;
        break;
      }
    }

    if (enFound && typeof enCurrent === 'string') {
      return enCurrent;
    }

    return fallback || path;
  }, [language]);

  const currentLanguageInfo = useMemo(() => {
    return OFFICIAL_LANGUAGES.find((l) => l.code === language) || OFFICIAL_LANGUAGES[0];
  }, [language]);

  const isRTL = useMemo(() => ['ur', 'ks', 'sd'].includes(language), [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    languages: OFFICIAL_LANGUAGES,
    currentLanguageInfo,
    isRTL
  }), [language, setLanguage, t, currentLanguageInfo, isRTL]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback if rendered outside provider
    return {
      language: 'en',
      setLanguage: () => {},
      t: (path, fallback = '') => fallback || path,
      languages: OFFICIAL_LANGUAGES,
      currentLanguageInfo: OFFICIAL_LANGUAGES[0],
      isRTL: false
    };
  }
  return context;
}
