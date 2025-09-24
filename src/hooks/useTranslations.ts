// FIX: Add import for useLanguage hook to satisfy the TypeScript compiler.
import { useLanguage } from '../contexts/LanguageContext';

// useLanguage hook is available globally from the LanguageContext.tsx script.

// Helper function to get nested properties from an object using a string path
const get = (obj: Record<string, any>, path: string): string => {
  const keys = path.split('.');
  let result: any = obj;
  for (const key of keys) {
    // Add robust checking to prevent runtime errors when traversing the path.
    // This ensures we only proceed if the current value is a non-null object.
    if (result === null || typeof result !== 'object') {
      return path; // Return the key itself if path is invalid
    }
    result = result[key];
  }

  // Check if the resolved value is a string before returning. This solves the
  // type error where an object could be returned for a function expecting a string.
  // It also correctly returns empty strings, which the original `result || path` would incorrectly discard.
  if (typeof result === 'string') {
    return result;
  }
  
  return path;
};

// FIX: Export useTranslations hook to be importable in other modules.
export const useTranslations = () => {
  const { translations } = useLanguage();

  const t = (key: string): string => {
    return get(translations, key);
  };

  return { t };
};