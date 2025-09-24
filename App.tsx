// FIX: Add imports for React and all child components to satisfy the TypeScript compiler.
import React from 'react';
import { AlchemicalGallerySection } from './components/AlchemicalGallerySection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { NewsSection } from './components/NewsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';

// All child components are loaded via script tags in index.html
// and are available globally in this scope.

// FIX: Export App component to be importable in other modules like index.tsx.
export const App = () => {
  return (
    <div className="bg-brand-dark min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <PortfolioSection />
        <AlchemicalGallerySection />
        <TeamSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};