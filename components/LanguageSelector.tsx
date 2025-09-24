// FIX: Add imports for React and useLanguage hook to satisfy the TypeScript compiler.
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// React and useLanguage hook are available globally.

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
] as const;

type LanguageCode = typeof languages[number]['code'];

// FIX: Export LanguageSelector component to be importable in other modules.
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 border border-brand-gold/50 text-brand-gold rounded-full hover:bg-brand-gold/10 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <span className="font-sans text-sm font-bold">{language.toUpperCase()}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-24 bg-brand-dark border border-brand-gold/50 rounded-md shadow-lg z-10">
          <ul>
            {languages.map(lang => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'text-brand-gold font-bold' : 'text-brand-parchment'} hover:bg-brand-gold/10`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};