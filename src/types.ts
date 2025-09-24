// FIX: Add import for React to use React.ReactNode type.
import React from 'react';

// Interfaces are defined in the global scope and available to all other scripts
// loaded after this one in index.html.

// FIX: Export interfaces to make them available for import in other modules.
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