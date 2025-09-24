// FIX: Add imports for React, hooks, and components to satisfy the TypeScript compiler.
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ParticleBackground } from './ParticleBackground';

// React, useTranslations hook, and ParticleBackground component are available globally.

// FIX: Export HeroSection component to be importable in other modules.
export const HeroSection: React.FC = () => {
  const { t } = useTranslations();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-brand-dark opacity-80"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-4">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl font-serif-alt text-gold-gradient mb-8">
          {t('hero.subtitle')}
        </p>
        <a 
          href="#contact" 
          className="inline-block bg-brand-gold text-brand-dark font-bold font-sans uppercase tracking-widest py-3 px-8 border-2 border-brand-gold rounded-sm
                     hover:bg-transparent hover:text-brand-gold transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-gold-light gold-glow"
        >
          {t('hero.cta')}
        </a>
      </div>
    </section>
  );
};