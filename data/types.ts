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
  icon?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  features: string[];
  idealFor: string;
  image: ImageAsset;
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
  icon?: string;
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

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features?: string[];
  image: ImageAsset;
  icon?: string;
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
  socials: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}
