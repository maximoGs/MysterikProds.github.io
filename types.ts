// Fix: Add React import for React.ReactNode type.
import React from 'react';

// Fix: Export all interfaces to make them available in other modules.
export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  title: string;
  bio: string;
  imageUrl: string;
  portfolioUrl: string;
  keywords: string[];
  socials: {
    name: 'linkedin' | 'twitter' | 'instagram' | 'behance';
    url: string;
  }[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
}

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
}

export interface MapPoint {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  type: 'production' | 'inspiration' | 'partnership';
  coords: {
    top: string;
    left: string;
  };
}