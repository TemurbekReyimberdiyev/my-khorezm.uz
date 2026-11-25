import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { uz } from '../locales/uz';
import { ru } from '../locales/ru';
import { en } from '../locales/en';

const translations = { uz, ru, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('khorezm-lang');
    return saved && translations[saved] ? saved : 'uz';
  });

  const t = translations[language] || uz;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('khorezm-lang', lang);
    }
  }, []);

  const pick = useCallback(
    (val) => {
      if (val == null) return '';
      if (typeof val === 'object' && !Array.isArray(val) && ('uz' in val || 'ru' in val || 'en' in val)) {
        return val[language] ?? val.uz ?? val.en ?? '';
      }
      return val;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
