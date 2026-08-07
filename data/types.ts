export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ImageAsset;
}

export interface ProductSpecs {
  capacity: string;
  speed: string;
  idealFor: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  features: string[];
  specs: ProductSpecs;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
}

export interface CabinType {
  id: string;
  name: string;
  panelMaterial: string;
  lightingTone: string;
  doorStyle: string;
  accentColor: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

export interface WhyOasisFeature {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: ImageAsset;
  imagePosition: "left" | "right";
}

export interface Client {
  id: string;
  name: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  company: string;
  photo: ImageAsset;
}

export interface MaintenancePlan {
  id: string;
  tier: "Silver" | "Gold" | "Platinum";
  tagline: string;
  responseTime: string;
  features: string[];
  recommended?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
}

export interface CompanyInfo {
  legalName: string;
  tagline: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  geo: {
    lat: number;
    lng: number;
  };
  hours: string;
  socials: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}
