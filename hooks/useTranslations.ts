import { useLanguage } from '../contexts/LanguageContext';

// Helper function to get nested properties from an object using a string path
const get = (obj: Record<string, any>, path: string): string => {
  const keys = path.split('.');
  let result: any = obj;
  for (const key of keys) {
    // Fix: Add robust checking to prevent runtime errors when traversing the path.
    // This ensures we only proceed if the current value is a non-null object.
    if (result === null || typeof result !== 'object') {
      return path; // Return the key itself if path is invalid
    }
    result = result[key];
  }

  // Fix: Check if the resolved value is a string before returning. This solves the
  // type error where an object could be returned for a function expecting a string.
  // It also correctly returns empty strings, which the original `result || path` would incorrectly discard.
  if (typeof result === 'string') {
    return result;
  }
  
  return path;
};

const useTranslations = () => {
  const { translations } = useLanguage();

  const t = (key: string): string => {
    return get(translations, key);
  };

  return { t };
};

export default useTranslations;
