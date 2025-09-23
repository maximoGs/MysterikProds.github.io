import React, { useState, useRef } from 'react';
import { MAP_POINTS } from '../constants';
import type { MapPoint } from '../types';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useTranslations from '../hooks/useTranslations';

const XIcon = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const MapBackground: React.FC = () => (
    <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
        <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{ stopColor: 'rgba(212, 175, 55, 0.1)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(212, 175, 55, 0)', stopOpacity: 1 }} />
            </radialGradient>
        </defs>
        <rect width="800" height="450" fill="#0a0a0a" />
        <path d="M 250,50 L 150,150 L 200,300 L 350,400 L 450,300 L 600,100 L 400,80 Z" fill="rgba(212, 175, 55, 0.03)" />
        <path d="M 700,50 L 750,200 L 600,350 L 500,400" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" fill="none" />
        <path d="M 100,400 L 200,250 L 400,200 L 600,250" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" fill="none" />
        <circle cx="300" cy="250" r="200" fill="url(#grad1)" />
    </svg>
);

const symbolMap = {
    production: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    inspiration: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    partnership: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z'
};

const ArcaneMapSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const [activePoint, setActivePoint] = useState<MapPoint | null>(null);

    const handlePointClick = (point: MapPoint) => {
        setActivePoint(point);
    };

    const handleCloseCard = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActivePoint(null);
    }

    return (
        <section ref={sectionRef} id="map" className="py-20 md:py-32 bg-brand-dark">
            <div className="container mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('map.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('map.description')}
                    </p>
                </div>
                
                <div 
                    className={`relative w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden border-2 border-brand-gold/20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <MapBackground />
                    {MAP_POINTS.map((point, index) => (
                        <button
                            key={point.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                            style={{ top: point.coords.top, left: point.coords.left }}
                            onClick={() => handlePointClick(point)}
                            aria-label={`Show details for ${point.title}`}
                        >
                            <svg className="w-8 h-8 text-brand-gold drop-shadow-[0_0_5px_#D4AF37] group-hover:drop-shadow-[0_0_10px_#FBF5B7] transition-all duration-300 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d={symbolMap[point.type]} />
                            </svg>
                            <div className="absolute inset-0 bg-brand-gold rounded-full animate-ping opacity-0 group-hover:opacity-30"></div>
                        </button>
                    ))}

                    {activePoint && (
                        <div 
                            className="absolute max-w-xs w-full bg-brand-dark/90 backdrop-blur-sm border border-brand-gold/50 rounded-lg shadow-lg p-4 text-left animate-fade-in-fast"
                            style={{ top: activePoint.coords.top, left: activePoint.coords.left, transform: 'translate(20px, -50%)' }}
                        >
                            <button onClick={handleCloseCard} className="absolute top-2 right-2 text-brand-parchment/50 hover:text-brand-gold">
                                <XIcon />
                            </button>
                            <img src={activePoint.imageUrl} alt={activePoint.title} className="w-full h-24 object-cover rounded-md mb-3" />
                            <h4 className="font-serif text-brand-gold text-lg">{activePoint.title}</h4>
                            <p className="font-sans text-sm text-brand-parchment/80">{activePoint.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ArcaneMapSection;