
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import AlchemicalGallerySection from './components/AlchemicalGallerySection';
import TeamSection from './components/TeamSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
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

export default App;