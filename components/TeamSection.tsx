
import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS } from '../constants';
import type { TeamMember } from '../types';
import Modal from './Modal';
import { FaLinkedin, FaTwitter, FaInstagram, FaBehance } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import useTranslations from '../hooks/useTranslations';

const socialIconMap = {
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    behance: <FaBehance />,
};

const TeamSection: React.FC = () => {
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
                    <FiChevronLeft className="w-8 h-8" />
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
                    <FiChevronRight className="w-8 h-8" />
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

export default TeamSection;