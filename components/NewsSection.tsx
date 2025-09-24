// FIX: Add imports for React, constants, and hooks to satisfy the TypeScript compiler.
import React, { useRef } from 'react';
import { NEWS_POSTS } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

// React, constants, and hooks are available globally.

// FIX: Export NewsSection component to be importable in other modules.
export const NewsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const newsKeys = ['alchemy', 'artDeco', 'legacy'];

    return (
        <section ref={sectionRef} id="grimoire" className="py-20 md:py-32 bg-brand-dark">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('news.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('news.description')}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {NEWS_POSTS.map((post, index) => (
                        <div 
                            key={post.id}
                            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150 + 200}ms` }}
                        >
                            <div className="group bg-brand-dark/50 rounded-lg overflow-hidden border border-brand-gold/20 hover:border-brand-gold/70 hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300">
                                <img src={post.imageUrl} alt={t(`news.posts.${newsKeys[index]}.title`)} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-serif text-brand-gold mb-2">{t(`news.posts.${newsKeys[index]}.title`)}</h3>
                                    <p className="text-brand-parchment/70 font-sans mb-4">{t(`news.posts.${newsKeys[index]}.excerpt`)}</p>
                                    <a href="#" className="font-bold text-brand-gold uppercase tracking-wider text-sm">{t('news.cta')} &rarr;</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};