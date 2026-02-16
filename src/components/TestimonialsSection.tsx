import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

interface Testimonial {
    id: number;
    quoteKey: string;
    authorKey: string;
    roleKey: string;
}

const TESTIMONIALS: Testimonial[] = [
    { id: 1, quoteKey: 'testimonials.items.t1.quote', authorKey: 'testimonials.items.t1.author', roleKey: 'testimonials.items.t1.role' },
    { id: 2, quoteKey: 'testimonials.items.t2.quote', authorKey: 'testimonials.items.t2.author', roleKey: 'testimonials.items.t2.role' },
    { id: 3, quoteKey: 'testimonials.items.t3.quote', authorKey: 'testimonials.items.t3.author', roleKey: 'testimonials.items.t3.role' },
];

export const TestimonialsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startAutoPlay = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
    }, []);

    useEffect(() => {
        startAutoPlay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoPlay]);

    const goTo = (index: number) => {
        setActiveIndex(index);
        if (intervalRef.current) clearInterval(intervalRef.current);
        startAutoPlay();
    };

    return (
        <section ref={sectionRef} id="testimonials" className="py-20 md:py-32 bg-brand-dark relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-gold/30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-gold/20"></div>
            </div>

            <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('testimonials.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('testimonials.description')}
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="max-w-3xl mx-auto relative" style={{ minHeight: '220px' }}>
                    {TESTIMONIALS.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center text-center px-4
                                ${index === activeIndex ? 'opacity-100 translate-x-0 scale-100' : index < activeIndex ? 'opacity-0 -translate-x-12 scale-95' : 'opacity-0 translate-x-12 scale-95'}`}
                        >
                            <div className="border border-brand-gold/30 rounded-lg p-8 md:p-12 bg-brand-dark/60 backdrop-blur-sm w-full">
                                {/* Quote deco */}
                                <svg className="w-10 h-10 text-brand-gold/40 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                                </svg>
                                <p className="text-lg md:text-xl text-brand-parchment/90 font-serif-alt italic leading-relaxed mb-6">
                                    "{t(testimonial.quoteKey)}"
                                </p>
                                <div>
                                    <p className="text-brand-gold font-serif font-bold text-lg">{t(testimonial.authorKey)}</p>
                                    <p className="text-brand-parchment/60 font-sans text-sm mt-1">{t(testimonial.roleKey)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center space-x-3 mt-8">
                    {TESTIMONIALS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-all duration-300
                                ${index === activeIndex ? 'bg-brand-gold scale-125 shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-brand-gold/30 hover:bg-brand-gold/60'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
