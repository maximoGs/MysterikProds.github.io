// FIX: Import React and types to satisfy the TypeScript compiler.
import React from 'react';
import { GalleryImage, MapPoint, NewsPost, PortfolioItem, Service, TeamMember } from './types';

// Types are globally available from types.ts.
// React is globally available from the CDN script.
// Constants are defined in the global scope for other components to use.

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const WandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.5A2.25 2.25 0 006 20.25z" />
  </svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2m-14 0H3m14.07-9.93l-1.42 1.42M5.35 18.65l-1.42 1.42m14.14 0l-1.42-1.42M5.35 5.35L6.77 6.77" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);


// FIX: Export constants to make them available for import in other modules.
export const SERVICES: Service[] = [
  {
    title: 'Brand Mythology',
    description: 'We craft compelling brand narratives that resonate deeply, transforming your business into a cultural touchstone. Our strategic storytelling builds a loyal following and a timeless legacy.',
    icon: <WandIcon />,
  },
  {
    title: 'Visual Alchemy',
    description: 'Our design and audiovisual production transmutes ideas into stunning visual experiences. From cinematic commercials to captivating digital content, we create art that commands attention.',
    icon: <EyeIcon />,
  },
  {
    title: 'Digital Seership',
    description: 'We navigate the complexities of the digital cosmos, charting a course for maximum impact. Our data-driven strategies ensure your message reaches and engages your ideal audience.',
    icon: <CompassIcon />,
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Sofía Gómez Saá',
    role: 'Diseñadora',
    title: 'Diseñadora (Sede en España)',
    bio: 'Con sede en España, Sofía aporta una perspectiva global y estética refinada a cada proyecto, tendiendo puentes entre continentes a través del diseño visual.',
    imageUrl: 'https://picsum.photos/seed/sofia/400/600',
    portfolioUrl: '#',
    keywords: ['Diseño Gráfico', 'Dirección de Arte', 'Diseño Internacional'],
    socials: [
      { name: 'linkedin', url: '#' },
      { name: 'instagram', url: '#' },
    ],
  },
  {
    id: 2,
    name: 'Augusto Gómez Saá',
    role: 'Desarrollador',
    title: 'Desarrollador de software',
    bio: 'Augusto transforma visiones creativas en realidades digitales robustas. Su dominio del código asegura que cada experiencia sea rápida, escalable e inmersiva.',
    imageUrl: 'https://picsum.photos/seed/augusto/400/600',
    portfolioUrl: '#',
    keywords: ['Desarrollo Web', 'Arquitectura de Software', 'Innovación Digital'],
    socials: [
      { name: 'linkedin', url: '#' },
    ],
  },
  {
    id: 3,
    name: 'Máximo Gómez Saá',
    role: 'CEO & Productor',
    title: 'Publicista, productor y CEO',
    bio: 'Como corazón y fuerza motriz de Mysterik, Máximo lidera la producción y la estrategia publicitaria, orquestando equipos para forjar legados de marca con impacto real.',
    imageUrl: 'https://picsum.photos/seed/maximo/400/600',
    portfolioUrl: '#',
    keywords: ['Producción Audiovisual', 'Estrategia Publicitaria', 'Liderazgo'],
    socials: [
      { name: 'linkedin', url: '#' },
      { name: 'instagram', url: '#' },
    ],
  },
  {
    id: 4,
    name: 'Laureano Torre',
    role: 'Filmmaker',
    title: 'Filmmaker y editor',
    bio: 'La lente de Laureano captura la esencia de cada historia. Su talento para la cinematografía y la precisión en la edición dan vida a narrativas visuales que cautivan.',
    imageUrl: 'https://picsum.photos/seed/laureano/400/600',
    portfolioUrl: '#',
    keywords: ['Cinematografía', 'Edición de Video', 'Narrativa Visual'],
    socials: [
      { name: 'instagram', url: '#' },
      { name: 'behance', url: '#' },
    ],
  },
  {
    id: 5,
    name: 'Magalí Sumaran',
    role: 'Diseñadora',
    title: 'Diseñadora en Mendoza',
    bio: 'Arraigada en Mendoza, Magalí destila la energía y cultura local en diseños impactantes, asegurando que cada proyecto resuene con autenticidad y belleza.',
    imageUrl: 'https://picsum.photos/seed/magali/400/600',
    portfolioUrl: '#',
    keywords: ['Diseño UX/UI', 'Identidad Visual', 'Creatividad Local'],
    socials: [
      { name: 'linkedin', url: '#' },
      { name: 'behance', url: '#' },
    ],
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 'dQw4w9WgXcQ', title: 'Cosmic Elixir', description: 'A beverage that promises a taste of the stars.' },
  { id: '3JZ_D3pSS4U', title: 'Chrono Watches', description: 'Timepieces that are both an instrument and an heirloom.' },
  { id: '6g4dkBF5anU', title: 'Nocturne Vehicles', description: 'Experience the art of motion in the dead of night.' },
];

export const NEWS_POSTS: NewsPost[] = [
  { id: 1, title: 'The Alchemy of Virality', excerpt: 'Decoding the hidden patterns behind content that captures the world\'s attention.', imageUrl: 'https://picsum.photos/seed/news1/600/400' },
  { id: 2, title: 'Art Deco in the Digital Age', excerpt: 'How timeless aesthetics are being reborn in modern web experiences.', imageUrl: 'https://picsum.photos/seed/news2/600/400' },
  { id: 3, title: 'Beyond the Campaign: Building a Brand Legacy', excerpt: 'Our philosophy on creating marketing that transcends the immediate and builds lasting value.', imageUrl: 'https://picsum.photos/seed/news3/600/400' },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/gallery1/800/1200', title: 'Vineyard Twilight', description: 'Behind the scenes of our award-winning winery campaign.' },
  { id: 2, src: 'https://picsum.photos/seed/gallery2/1200/800', title: 'Andean Echoes', description: 'Capturing the majestic spirit of the mountains for a luxury travel brand.' },
  { id: 3, src: 'https://picsum.photos/seed/gallery3/800/1000', title: 'The Alchemist\'s Table', description: 'A still from our collaboration with a Michelin-starred chef.' },
  { id: 4, src: 'https://picsum.photos/seed/gallery4/1200/900', title: 'Urban Overture', description: 'A dynamic shot from a high-fashion commercial in downtown Mendoza.' },
  { id: 5, src: 'https://picsum.photos/seed/gallery5/800/1200', title: 'Director\'s Vision', description: 'The magic of filmmaking, captured between takes.' },
  { id: 6, src: 'https://picsum.photos/seed/gallery6/900/1200', title: 'Harvest Rituals', description: 'Documenting the timeless tradition of the grape harvest.' },
  { id: 7, src: 'https://picsum.photos/seed/gallery7/1200/800', title: 'Desert Bloom', description: 'Finding beauty in the arid landscapes of Luján de Cuyo.' },
  { id: 8, src: 'https://picsum.photos/seed/gallery8/800/1000', title: 'Shadow & Light', description: 'An experimental shot exploring contrast and form.' },
];

export const MAP_POINTS: MapPoint[] = [
  {
    id: 1,
    title: 'Mendoza City Production Hub',
    description: 'Our central command for audiovisual production, where cinematic magic is born.',
    imageUrl: 'https://picsum.photos/seed/map1/400/200',
    type: 'production',
    coords: { top: '35%', left: '30%' },
  },
  {
    id: 2,
    title: 'Uco Valley Vineyards',
    description: 'A source of endless inspiration, where we capture the soul of wine country.',
    imageUrl: 'https://picsum.photos/seed/map2/400/200',
    type: 'inspiration',
    coords: { top: '65%', left: '45%' },
  },
  {
    id: 3,
    title: 'Buenos Aires Partnership Office',
    description: 'Connecting with global brands and fostering creative collaborations from the capital.',
    imageUrl: 'https://picsum.photos/seed/map3/400/200',
    type: 'partnership',
    coords: { top: '25%', left: '75%' },
  },
  {
    id: 4,
    title: 'Patagonia Film Unit',
    description: 'Our remote unit for capturing the raw, untamed beauty of the southern landscapes.',
    imageUrl: 'https://picsum.photos/seed/map4/400/200',
    type: 'production',
    coords: { top: '80%', left: '20%' },
  },
];