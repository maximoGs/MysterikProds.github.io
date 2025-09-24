// FIX: Add imports for React, constants, and hooks to satisfy the TypeScript compiler.
import React, { useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

// React, constants, and hooks are available globally.

// FIX: Export PortfolioSection component to be importable in other modules.
export const PortfolioSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const portfolioKeys = ['cosmicElixir', 'chronoWatches', 'nocturneVehicles'];

    return (
        <section ref={sectionRef} id="portfolio" className="py-20 md:py-32 bg-brand-dark">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('portfolio.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('portfolio.description')}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {PORTFOLIO_ITEMS.map((item, index) => (
                        <div 
                            key={item.id}
                            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150 + 200}ms` }}
                        >
                            <div className="group overflow-hidden rounded-lg border-2 border-transparent hover:border-brand-gold hover:gold-glow transition-all duration-300">
                                 <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${item.id}`}
                                        title={t(`portfolio.items.${portfolioKeys[index]}.title`)}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                                <div className="p-4 bg-brand-dark/50">
                                    <h3 className="text-xl font-serif text-brand-gold">{t(`portfolio.items.${portfolioKeys[index]}.title`)}</h3>
                                    <p className="text-sm text-brand-parchment/70 font-sans mt-1">{t(`portfolio.items.${portfolioKeys[index]}.description`)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};