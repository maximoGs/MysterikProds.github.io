// FIX: Add imports for React, hooks, and components to satisfy the TypeScript compiler.
import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { LanguageSelector } from './LanguageSelector';

// React, LanguageSelector component, and useTranslations hook are available globally.

const MysticalSymbol: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 V 90 M10 50 H 90" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
    </svg>
);


// FIX: Export Header component to be importable in other modules.
export const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslations();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { key: 'manifesto', href: '#manifesto' },
        { key: 'services', href: '#services' },
        { key: 'portfolio', href: '#portfolio' },
        { key: 'gallery', href: '#gallery' },
        { key: 'team', href: '#team' },
        { key: 'contact', href: '#contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-sm shadow-lg shadow-brand-gold/10' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-2 text-brand-gold hover:text-brand-gold-light transition-colors">
                    <MysticalSymbol className="h-8 w-8" />
                    <span className="font-serif text-xl font-bold tracking-wider">MYSTERIK</span>
                </a>
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <a key={link.key} href={link.href} className="text-brand-parchment hover:text-brand-gold transition-colors font-sans uppercase tracking-widest text-sm">
                            {t(`header.${link.key}`)}
                        </a>
                    ))}
                    <LanguageSelector />
                </div>
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSelector />
                    <button onClick={() => setIsOpen(!isOpen)} className="text-brand-parchment focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden bg-brand-dark/95">
                    {navLinks.map(link => (
                         <a key={link.key} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 px-6 text-center text-brand-parchment hover:bg-brand-gold/10 hover:text-brand-gold transition-colors font-sans uppercase tracking-widest text-sm">
                            {t(`header.${link.key}`)}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};