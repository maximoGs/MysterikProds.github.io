// Fix: Add a type-only import for React to resolve namespace error.
import type * as React from 'react';

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

// Fix: Define and export the 'MapPoint' interface.
export interface MapPoint {
  id: number;
  title: string;
  description: string;
  coords: {
    top: string;
    left: string;
  };
  type: 'production' | 'inspiration' | 'partnership';
  imageUrl: string;
}