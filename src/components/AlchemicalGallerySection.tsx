// FIX: Add imports for React, constants, hooks, and components to satisfy the TypeScript compiler.
import React, { useState, useRef } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';
import { Lightbox } from './Lightbox';

// React, constants, hooks, and Lightbox component are available globally.

// FIX: Export AlchemicalGallerySection component to be importable in other modules.
export const AlchemicalGallerySection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
    const { t } = useTranslations();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    return (
        <>
            <section ref={sectionRef} id="gallery" className="py-20 md:py-32 bg-brand-dark/95" style={{backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, rgba(10,10,10,0) 60%)'}}>
                <div className="container mx-auto px-6">
                    <div className={`text-center mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                            {t('gallery.title')}
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                            {t('gallery.description')}
                        </p>
                    </div>
                    <div
                        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
                    >
                        {GALLERY_IMAGES.map((image, index) => (
                            <div
                                key={image.id}
                                className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                                onClick={() => openLightbox(index)}
                            >
                                <img src={image.src} alt={image.title} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 flex items-end p-4">
                                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="font-serif text-lg text-brand-gold-light">{image.title}</h3>
                                    </div>
                                </div>
                                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold transition-all duration-300 rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {lightboxIndex !== null && (
                <Lightbox
                    images={GALLERY_IMAGES}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                    setCurrentIndex={setLightboxIndex}
                />
            )}
        </>
    );
};