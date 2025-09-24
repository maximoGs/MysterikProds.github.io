// FIX: Add imports for React, ReactDOM, and hooks to satisfy the TypeScript compiler.
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslations } from '../hooks/useTranslations';

// React, ReactDOM, and useTranslations hook are available globally.

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// FIX: Export Modal component to be importable in other modules.
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const { t } = useTranslations();
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-w-3xl w-full bg-brand-dark p-8 border-2 border-brand-gold rounded-lg shadow-2xl shadow-brand-gold/20
                           transform transition-all duration-300 ease-out animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out forwards;
                    }
                `}</style>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-brand-parchment/70 hover:text-brand-gold transition-colors"
                    aria-label={t('modal.closeAria')}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};