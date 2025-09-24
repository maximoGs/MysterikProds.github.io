// FIX: Add imports for React and hooks to satisfy the TypeScript compiler.
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

// React and useTranslations hook are available globally.

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5.03l-1.42 5.16 5.28-1.39a9.92 9.92 0 004.71 1.2c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.88 11.53c-.28.14-.62.21-1.77.1c-1.15-.1-1.95-.7-2.22-1.32c-.27-.62-.48-1.13-.6-1.32c-.12-.18-.2-.3-.3-.42c-.2-.23-.42-.35-.6-.35c-.18 0-.36.03-.5.18c-.13.14-.54.53-.7 1.2c-.15.68-.15 1.25.03 1.83c.18.58.58 1.23 1.18 1.83c.88.88 1.63 1.35 2.62 1.77c.98.42 1.77.37 2.37.23c.6-.15 1.05-.63 1.22-1.23c.18-.6.18-1.12.1-1.32c-.08-.2-.2-.32-.4-.4z" />
    </svg>
);


// FIX: Export FloatingWhatsApp component to be importable in other modules.
export const FloatingWhatsApp: React.FC = () => {
    const { t } = useTranslations();
    return (
        <a 
            href="https://wa.me/yourphonenumber" // Replace with your WhatsApp number
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark
                       shadow-lg animate-pulse-slow transition-transform hover:scale-110 gold-glow-hard z-40"
            aria-label={t('whatsapp.ariaLabel')}
        >
            <WhatsAppIcon className="w-8 h-8" />
        </a>
    );
};