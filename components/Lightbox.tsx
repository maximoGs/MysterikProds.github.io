
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import type { GalleryImage } from '../types';
import useTranslations from '../hooks/useTranslations';

interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    setCurrentIndex: (index: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, setCurrentIndex }) => {
    const { t } = useTranslations();
    const totalImages = images.length;

    const goToPrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + totalImages) % totalImages;
        setCurrentIndex(newIndex);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % totalImages;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                setCurrentIndex((currentIndex + 1) % totalImages);
            } else if (e.key === 'ArrowLeft') {
                setCurrentIndex((currentIndex - 1 + totalImages) % totalImages);
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, totalImages, onClose, setCurrentIndex]);

    if (currentIndex === null) return null;

    const currentImage = images[currentIndex];

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in-fast"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <style>{`
                @keyframes fade-in-fast {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }
            `}</style>
            
            <button
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
                onClick={onClose}
                aria-label={t('lightbox.closeAria')}
            >
                <FiX size={32} />
            </button>
            
            <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
                onClick={goToPrevious}
                aria-label={t('lightbox.prevAria')}
            >
                <FiChevronLeft size={40} />
            </button>
            
            <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
                onClick={goToNext}
                aria-label={t('lightbox.nextAria')}
            >
                <FiChevronRight size={40} />
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center p-16" onClick={e => e.stopPropagation()}>
                <img
                    src={currentImage.src}
                    alt={currentImage.title}
                    className="max-h-full max-w-full object-contain"
                />
                <div className="absolute bottom-8 text-center text-white p-4 bg-black/30 rounded-lg">
                    <h3 className="text-xl font-serif text-brand-gold-light">{currentImage.title}</h3>
                    <p className="text-sm font-sans opacity-80">{currentImage.description}</p>
                </div>
            </div>

        </div>,
        document.body
    );
};

export default Lightbox;