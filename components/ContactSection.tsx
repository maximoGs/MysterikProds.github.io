// FIX: Add imports for React and hooks to satisfy the TypeScript compiler.
import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

// React and custom hooks are available globally.

// FIX: Export ContactSection component to be importable in other modules.
export const ContactSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <section ref={sectionRef} id="contact" className="py-20 md:py-32 bg-brand-dark/95" style={{backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(10,10,10,0) 60%)'}}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('contact.title')}
                    </h2>
                    <p className="text-lg text-brand-parchment/80 font-serif-alt mb-10">
                        {t('contact.description')}
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input 
                            type="text" 
                            placeholder={t('contact.namePlaceholder')}
                            aria-label={t('contact.namePlaceholder')}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        />
                        <input 
                            type="email" 
                            placeholder={t('contact.emailPlaceholder')}
                            aria-label={t('contact.emailPlaceholder')}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        />
                        <textarea 
                            placeholder={t('contact.messagePlaceholder')}
                            aria-label={t('contact.messagePlaceholder')}
                            rows={4}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        ></textarea>
                        <button 
                            type="submit"
                            className="w-full bg-brand-gold text-brand-dark font-bold font-sans uppercase tracking-widest py-3 px-8 border-2 border-brand-gold rounded-sm
                                       hover:bg-transparent hover:text-brand-gold transition-all duration-300 transform hover:scale-105
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold-light gold-glow"
                        >
                            {t('contact.cta')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};