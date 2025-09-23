// Fix: Replace UMD-style destructuring with a proper module import for React.
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

type Language = 'en' | 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fix: Export the provider component.
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es' || browserLang === 'pt') {
      setLanguage(browserLang as Language);
    } else {
      setIsLoading(false); // If default is 'en', no need to fetch initially
    }
  }, []);
  
  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`./translations/${language}.json`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(`Failed to load translations for ${language}, falling back to English:`, error);
        // Attempt to load English as a fallback
        try {
            const fallbackResponse = await fetch('./translations/en.json');
            if (!fallbackResponse.ok) throw new Error('Fallback failed');
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
        } catch (fallbackError) {
            console.error("Failed to load fallback English translations:", fallbackError);
            setTranslations({}); // Set to empty to avoid broken state
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    translations,
  }), [language, translations]);

  // Render nothing until the initial translations are loaded to prevent showing placeholder keys
  if (isLoading && Object.keys(translations).length === 0) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Fix: Export the custom hook.
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};