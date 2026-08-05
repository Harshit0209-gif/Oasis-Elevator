// PLACEHOLDER CONTENT — feature lists are illustrative; refine with real spec sheets before launch.
import type { Product } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const products: Product[] = [
  {
    id: "passenger",
    slug: "passenger-elevator",
    name: "Passenger Elevator",
    category: "Vertical Mobility",
    shortDescription:
      "Refined, high-speed passenger transit engineered for everyday elegance.",
    features: ["Ultra-smooth ride", "Whisper-quiet operation", "Custom cabin finishes"],
    image: {
      src: unsplash("1518005020951-eccb494ad742"),
      alt: "Curved white architectural atrium opening upward to the sky",
    },
    layoutVariant: "wide",
  },
  {
    id: "hospital",
    slug: "hospital-elevator",
    name: "Hospital Elevator",
    category: "Critical Care Mobility",
    shortDescription:
      "Stretcher-and-bed-friendly cabins engineered for speed, hygiene, and silence.",
    features: ["Antimicrobial surfaces", "Emergency power override", "Wide-clearance doors"],
    image: {
      src: unsplash("1586773860418-d37222d8fce3"),
      alt: "Modern hospital building exterior",
    },
    layoutVariant: "split",
  },
  {
    id: "capsule",
    slug: "capsule-elevator",
    name: "Capsule Elevator",
    category: "Panoramic Glass",
    shortDescription:
      "A glass cabin engineered to turn every ride into an architectural moment.",
    features: ["360° panoramic glass", "LED ambient lighting", "Statement centerpiece design"],
    image: {
      src: unsplash("1487958449943-2429e8be8625"),
      alt: "Angular glass architectural building facade",
    },
    layoutVariant: "tall",
  },
  {
    id: "freight",
    slug: "freight-elevator",
    name: "Freight Elevator",
    category: "Heavy Load Transit",
    shortDescription:
      "Engineered for maximum payload, continuous cycles, and industrial durability.",
    features: ["High load capacity", "Reinforced steel cabin", "Continuous-duty motors"],
    image: {
      src: unsplash("1581092160607-ee22621dd758"),
      alt: "Engineers working with heavy industrial machinery",
    },
    layoutVariant: "feature",
  },
  {
    id: "home",
    slug: "home-elevator",
    name: "Home Elevator",
    category: "Residential Luxury",
    shortDescription:
      "Compact, quiet, and beautifully finished mobility for the modern private residence.",
    features: ["Space-saving footprint", "Bespoke interior finishes", "Whisper-quiet hydraulics"],
    image: {
      src: unsplash("1512917774080-9991f1c4c750"),
      alt: "Modern luxury private villa with a pool",
    },
    layoutVariant: "wide",
  },
  {
    id: "mrl",
    slug: "machine-room-less-elevator",
    name: "Machine Room-Less Elevator",
    category: "Space-Efficient Engineering",
    shortDescription:
      "Compact drive engineering that reclaims valuable building space without compromise.",
    features: ["No dedicated machine room", "Reduced energy footprint", "Compact shaft design"],
    image: {
      src: unsplash("1518770660439-4636190af475"),
      alt: "Macro detail of precision engineered circuitry",
    },
    layoutVariant: "split",
  },
  {
    id: "hydraulic",
    slug: "hydraulic-elevator",
    name: "Hydraulic Elevator",
    category: "Low-Rise Precision",
    shortDescription:
      "Robust hydraulic systems engineered for smooth, precise low-rise performance.",
    features: ["Precision leveling", "Low maintenance design", "Reliable for low-rise buildings"],
    image: {
      src: unsplash("1513828583688-c52646db42da"),
      alt: "Clean industrial steel piping and machinery",
    },
    layoutVariant: "tall",
  },
];
