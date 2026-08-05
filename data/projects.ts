// PLACEHOLDER CONTENT — project names, locations and specs are illustrative; replace with real case studies before launch.
import type { Project } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const projects: Project[] = [
  {
    id: "meridian-residences",
    slug: "meridian-residences",
    name: "Meridian Residences",
    location: "Gurugram, Haryana",
    buildingType: "Residential Tower",
    productsUsed: ["Passenger Elevator", "Machine Room-Less Elevator"],
    image: {
      src: unsplash("1551038247-3d9af20df552"),
      alt: "Modern white and blue residential apartment tower",
    },
    year: 2024,
  },
  {
    id: "constellation-corporate-park",
    slug: "constellation-corporate-park",
    name: "Constellation Corporate Park",
    location: "Bengaluru, Karnataka",
    buildingType: "Corporate Headquarters",
    productsUsed: ["Passenger Elevator", "Capsule Elevator"],
    image: {
      src: unsplash("1487958449943-2429e8be8625"),
      alt: "Angular glass corporate headquarters facade",
    },
    year: 2023,
  },
  {
    id: "solitaire-resort-spa",
    slug: "solitaire-resort-spa",
    name: "The Solitaire Resort & Spa",
    location: "Udaipur, Rajasthan",
    buildingType: "Hospitality / Resort",
    productsUsed: ["Capsule Elevator", "Passenger Elevator"],
    image: {
      src: unsplash("1445019980597-93fa8acb246c"),
      alt: "Luxury resort loungers overlooking mountains at dusk",
    },
    year: 2023,
  },
  {
    id: "sunrise-multispecialty-hospital",
    slug: "sunrise-multispecialty-hospital",
    name: "Sunrise Multispecialty Hospital",
    location: "Pune, Maharashtra",
    buildingType: "Healthcare",
    productsUsed: ["Hospital Elevator", "Freight Elevator"],
    image: {
      src: unsplash("1586773860418-d37222d8fce3"),
      alt: "Modern multispecialty hospital building exterior",
    },
    year: 2022,
  },
  {
    id: "ashford-private-villa",
    slug: "ashford-private-villa",
    name: "Ashford Private Villa",
    location: "Alibaug, Maharashtra",
    buildingType: "Residential Villa",
    productsUsed: ["Home Elevator"],
    image: {
      src: unsplash("1591474200742-8e512e6f98f8"),
      alt: "Modern private villa exterior with expansive glazing",
    },
    year: 2024,
  },
  {
    id: "lumen-retail-flagship",
    slug: "lumen-retail-flagship",
    name: "Lumen Retail Flagship",
    location: "Mumbai, Maharashtra",
    buildingType: "Retail",
    productsUsed: ["Passenger Elevator", "Machine Room-Less Elevator"],
    image: {
      src: unsplash("1441986300917-64674bd600d8"),
      alt: "Modern boutique retail store interior",
    },
    year: 2022,
  },
];
