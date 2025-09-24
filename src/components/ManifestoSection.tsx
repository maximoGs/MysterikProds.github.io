// FIX: Add imports for React and hooks to satisfy the TypeScript compiler.
import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

// React and custom hooks (useIntersectionObserver, useTranslations) are available globally.

// FIX: Export ManifestoSection component to be importable in other modules.
export const ManifestoSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();

    const pillars = [
        {
            title: t('manifesto.pillar1.title'),
            description: t('manifesto.pillar1.description'),
        },
        {
            title: t('manifesto.pillar2.title'),
            description: t('manifesto.pillar2.description'),
        },
        {
            title: t('manifesto.pillar3.title'),
            description: t('manifesto.pillar3.description'),
        },
        {
            title: t('manifesto.pillar4.title'),
            description: t('manifesto.pillar4.description'),
        }
    ];

    return (
        <section ref={sectionRef} id="manifesto" className="py-20 md:py-32 bg-brand-dark">
            <div className="container mx-auto px-6 text-center">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-6">
                        {t('manifesto.title')}
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-brand-parchment/80 font-serif-alt leading-relaxed mb-16">
                        {t('manifesto.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                    {pillars.map((pillar, index) => (
                         <div 
                            key={index} 
                            className={`border-t-2 border-brand-gold/30 pt-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150 + 300}ms` }}
                        >
                            <h3 className="text-2xl font-serif text-brand-gold mb-3">{pillar.title}</h3>
                            <p className="text-brand-parchment/70 font-sans">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};