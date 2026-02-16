import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslations();

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 600);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label={t('scrollToTop.ariaLabel')}
            className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-gold/50 text-brand-gold
                         flex items-center justify-center shadow-lg backdrop-blur-sm
                         hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold
                         transition-all duration-300 transform
                         ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};
