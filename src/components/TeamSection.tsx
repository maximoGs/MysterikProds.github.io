// FIX: Add imports for React, types, constants, hooks, and components to satisfy the TypeScript compiler.
import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useTranslations } from '../hooks/useTranslations';
import { TeamMember } from '../types';
import { Modal } from './Modal';

// React, dependencies, and hooks are available globally.

const LinkedinIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 53.79-54.3c29.7 0 53.79 24.2 53.79 54.3a53.79 53.79 0 0 1-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>;
const TwitterIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>;
const InstagramIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>;
const BehanceIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-83.3-132.9-83.3H0v352h156.9c98.5 0 143.1-43.1 143.1-125.7 0-61.4-35.5-94.4-68-113.5zM91.1 133.4h28.1c21.7 0 37.5 7.3 37.5 28.1 0 21.3-15.8 27.6-37.5 27.6h-28.1v-55.7zm31.3 226.9h-31.3V247.4h31.3c23.2 0 42.9 8.3 42.9 31.3 0 22.5-19.7 31.3-42.9 31.3zM576 251.5c0-117.8-98-135.5-202.9-135.5-103.4 0-188.3 25.7-188.3 118.9 0 71.1 55.2 96.3 124.7 96.3 49.3 0 101-18.1 120.2-51.5H396.9c-1.5 5.2-3.1 10.4-3.1 15.6 0 35 20.2 49.3 54.7 49.3 33 0 52.1-14.8 52.1-50.8V251.5zm-113.8 31.3c-20.2 0-31.3-11.4-31.3-31.3s11.1-31.3 31.3-31.3c20.2 0 31.3 11.4 31.3 31.3s-11.1 31.3-31.3 31.3zM425.1 182.2h-63.5V136h63.5v46.2z"></path></svg>;
const ChevronLeftIcon = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRightIcon = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>;


const socialIconMap = {
    linkedin: <LinkedinIcon />,
    twitter: <TwitterIcon />,
    instagram: <InstagramIcon />,
    behance: <BehanceIcon />,
};

// FIX: Export TeamSection component to be importable in other modules.
export const TeamSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const { t } = useTranslations();

    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05 });
    
    const teamKeys = ['elara', 'jax', 'orion', 'lyra'];

    const nextMember = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % TEAM_MEMBERS.length);
    };

    const prevMember = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
    };

    const getMemberTranslation = (memberId: number) => {
        const key = teamKeys[memberId - 1];
        if (!key) return { role: '', title: '', bio: '', keywords: [] };
        return {
            role: t(`team.members.${key}.role`),
            title: t(`team.members.${key}.title`),
            bio: t(`team.members.${key}.bio`),
            keywords: t(`team.members.${key}.keywords`).split(', '),
        };
    };

    return (
        <section ref={sectionRef} id="team" className="py-20 md:py-32 bg-brand-dark/95 overflow-hidden" style={{backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, rgba(10,10,10,0) 70%)'}}>
            <div className="container mx-auto px-6 text-center">
                 <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-gold-gradient mb-4">
                        {t('team.title')}
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-brand-parchment/80 font-serif-alt">
                        {t('team.description')}
                    </p>
                </div>
            </div>

            <div className={`relative flex items-center justify-center h-96 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '300ms'}}>
                <button 
                    onClick={prevMember} 
                    className="absolute left-4 md:left-16 z-30 p-2 rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    aria-label={t('team.prevAria')}
                >
                    <span className="w-8 h-8 flex items-center justify-center">
                        <ChevronLeftIcon />
                    </span>
                </button>

                <div className="w-full h-full flex justify-center items-center [perspective:1000px]">
                    {TEAM_MEMBERS.map((member, index) => {
                        const offset = index - currentIndex;
                        const isVisible = Math.abs(offset) <= 1;
                        const transform = `translateX(${offset * 40}%) scale(${1 - Math.abs(offset) * 0.2}) rotateY(${-offset * 15}deg)`;
                        const opacity = isVisible ? (1 - Math.abs(offset) * 0.4) : 0;
                        const zIndex = TEAM_MEMBERS.length - Math.abs(offset);
                        const pointerEvents = currentIndex === index ? 'auto' : 'none';
                        const memberT = getMemberTranslation(member.id);

                        return (
                            <div
                                key={member.id}
                                className="absolute w-64 h-96 transition-all duration-500 ease-out"
                                style={{ transform, opacity, zIndex, pointerEvents, visibility: isVisible ? 'visible' : 'hidden' }}
                            >
                                <div 
                                    className="w-full h-full bg-brand-dark border-2 border-brand-gold/70 rounded-lg shadow-lg p-4 transition-all duration-300 hover:border-brand-gold hover:scale-105 hover:z-20 hover:gold-glow cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-56 object-cover rounded-md mb-3 border border-brand-gold/20" />
                                    <h3 className="font-serif text-lg text-brand-gold text-center">{memberT.role}</h3>
                                    <p className="text-sm text-brand-parchment text-center font-sans">{member.name}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button 
                    onClick={nextMember} 
                    className="absolute right-4 md:right-16 z-30 p-2 rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    aria-label={t('team.nextAria')}
                >
                    <span className="w-8 h-8 flex items-center justify-center">
                        <ChevronRightIcon />
                    </span>
                </button>
            </div>

            {selectedMember && (
                <Modal isOpen={!!selectedMember} onClose={() => setSelectedMember(null)}>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <img src={selectedMember.imageUrl} alt={selectedMember.name} className="w-48 h-72 object-cover rounded-lg border-2 border-brand-gold flex-shrink-0"/>
                        <div className="flex-grow text-left">
                           <h3 className="text-3xl font-serif text-brand-gold">{getMemberTranslation(selectedMember.id).role}</h3>
                           <p className="text-xl font-sans text-brand-parchment mb-4">{selectedMember.name} - <span className="text-base opacity-80">{getMemberTranslation(selectedMember.id).title}</span></p>
                           
                           <div className="flex flex-wrap gap-2 mb-4">
                               {getMemberTranslation(selectedMember.id).keywords.map(keyword => (
                                   <span key={keyword} className="bg-brand-gold/20 text-brand-gold-light text-xs font-sans font-bold px-3 py-1 rounded-full">
                                       {keyword}
                                   </span>
                               ))}
                           </div>

                           <p className="text-brand-parchment/80 font-serif-alt mb-6">{getMemberTranslation(selectedMember.id).bio}</p>

                           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                                <div className="flex items-center space-x-4 text-brand-parchment/70">
                                    {selectedMember.socials.map(social => (
                                        <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="hover:text-brand-gold transition-colors text-2xl">
                                            {socialIconMap[social.name]}
                                        </a>
                                    ))}
                                </div>
                                <a href={selectedMember.portfolioUrl} target="_blank" rel="noopener noreferrer" 
                                    className="inline-block bg-brand-gold text-brand-dark font-bold font-sans uppercase tracking-widest py-3 px-6 border-2 border-brand-gold rounded-sm
                                               hover:bg-transparent hover:text-brand-gold transition-all duration-300 transform hover:scale-105 gold-glow"
                                >
                                    {t('team.cta')}
                                </a>
                           </div>
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};