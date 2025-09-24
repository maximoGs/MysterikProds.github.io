// FIX: Add imports for React and hooks to satisfy the TypeScript compiler.
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

// React and useTranslations hook are available globally.

// FIX: Export Footer component to be importable in other modules.
export const Footer: React.FC = () => {
    const { t } = useTranslations();
    return (
        <footer className="bg-brand-dark border-t border-brand-gold/20 py-8">
            <div className="container mx-auto px-6 text-center text-brand-parchment/60">
                <p className="font-sans text-sm">&copy; {new Date().getFullYear()} Mysterik Producciones. {t('footer.rights')}</p>
                <p className="font-serif-alt text-xs mt-2">{t('footer.tagline')}</p>
            </div>
        </footer>
    );
};