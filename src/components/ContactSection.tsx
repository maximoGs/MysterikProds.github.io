import React, { useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';

export const ContactSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Build mailto link fallback
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        const subject = encodeURIComponent(`Mysterik Consultation - ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        window.location.href = `mailto:mysterikproducciones@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            form.reset();
            setTimeout(() => setIsSubmitted(false), 4000);
        }, 1000);
    };

    return (
        <section ref={sectionRef} id="contact" className="py-20 md:py-32 bg-brand-dark/95" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(10,10,10,0) 60%)' }}>
            <div className={`container mx-auto px-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('contact.title')}
                    </h2>
                    <p className="text-lg text-brand-parchment/80 font-serif-alt mb-10">
                        {t('contact.description')}
                    </p>

                    {isSubmitted && (
                        <div className="mb-6 p-4 rounded-sm border border-brand-gold/50 bg-brand-gold/10 text-brand-gold font-sans text-sm animate-pulse">
                            {t('contact.success')}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder={t('contact.namePlaceholder')}
                            aria-label={t('contact.namePlaceholder')}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder={t('contact.emailPlaceholder')}
                            aria-label={t('contact.emailPlaceholder')}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        />
                        <textarea
                            name="message"
                            required
                            placeholder={t('contact.messagePlaceholder')}
                            aria-label={t('contact.messagePlaceholder')}
                            rows={4}
                            className="w-full bg-brand-dark/30 border border-brand-gold/40 rounded-sm p-3 text-brand-parchment placeholder-brand-parchment/50 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-gold text-brand-dark font-bold font-sans uppercase tracking-widest py-3 px-8 border-2 border-brand-gold rounded-sm
                                       hover:bg-transparent hover:text-brand-gold transition-all duration-300 transform hover:scale-105
                                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold-light gold-glow
                                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isSubmitting ? '...' : t('contact.cta')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};