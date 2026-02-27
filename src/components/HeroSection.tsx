import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ParticleBackground } from './ParticleBackground';
import logoImg from '../assets/logo.png';

export const HeroSection: React.FC = () => {
  const { t } = useTranslations();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-brand-dark opacity-80"></div>
      <div className="relative z-10 p-4 flex flex-col items-center">
        {/* Hero Logo with floating animation and glow */}
        <div className="mb-6 animate-float">
          <img
            src={logoImg}
            alt="Mysterik Producciones Logo"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-2 border-brand-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.15)]"
          />
        </div>
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