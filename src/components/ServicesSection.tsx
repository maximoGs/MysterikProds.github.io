// FIX: Add imports for React, types, constants, and hooks to satisfy the TypeScript compiler.
import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';
import { Service } from '../types';
import { SERVICES } from '../constants';

// React, types, constants, and hooks are available globally.

interface ServiceCardProps {
  service: Service;
  titleKey: string;
  descriptionKey: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, titleKey, descriptionKey }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslations();
  const title = t(titleKey);
  const description = t(descriptionKey);


  return (
    <div 
        className="w-full h-96 perspective-1000 group" 
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-brand-dark border-2 border-brand-gold/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer group-hover:border-brand-gold group-hover:gold-glow transition-all duration-300">
          <div className="mb-4">{service.icon}</div>
          <h3 className="text-2xl font-serif text-brand-gold">{title}</h3>
        </div>
        
        {/* Back of Card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-parchment border-2 border-brand-gold rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer gold-glow">
          <h3 className="text-2xl font-serif text-brand-dark mb-4">{title}</h3>
          <p className="text-brand-dark/80 font-sans">{description}</p>
        </div>
      </div>
    </div>
  );
};


// FIX: Export ServicesSection component to be importable in other modules.
export const ServicesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const serviceKeys = ['mythology', 'alchemy', 'seership'];

    return (
        <section ref={sectionRef} id="services" className="py-20 md:py-32 bg-brand-dark/95" style={{backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(10,10,10,0) 60%)'}}>
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('services.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('services.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    {SERVICES.map((service, index) => (
                        <div 
                            key={index} 
                            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${index * 150 + 200}ms` }}
                        >
                            <ServiceCard 
                                service={service} 
                                titleKey={`services.cards.${serviceKeys[index]}.title`}
                                descriptionKey={`services.cards.${serviceKeys[index]}.description`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};