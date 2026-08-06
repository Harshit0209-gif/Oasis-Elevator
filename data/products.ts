// PLACEHOLDER CONTENT — spec values are illustrative/typical-range; replace with real spec sheets before launch.
import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "passenger",
    slug: "passenger-elevator",
    name: "Passenger Elevator",
    category: "Vertical Mobility",
    shortDescription:
      "Refined, high-speed passenger transit engineered for everyday elegance.",
    features: ["Ultra-smooth ride", "Whisper-quiet operation", "Custom cabin finishes"],
    specs: {
      capacity: "6–13 persons · 450–1000 kg",
      speed: "1.0–1.75 m/s",
      idealFor: "Mid to high-rise buildings",
    },
  },
  {
    id: "hospital",
    slug: "hospital-elevator",
    name: "Hospital Elevator",
    category: "Critical Care Mobility",
    shortDescription:
      "Stretcher-and-bed-friendly cabins engineered for speed, hygiene, and silence.",
    features: ["Antimicrobial surfaces", "Emergency power override", "Wide-clearance doors"],
    specs: {
      capacity: "Bed + 3 attendants · 1600–2500 kg",
      speed: "1.0–2.5 m/s",
      idealFor: "Hospitals & healthcare facilities",
    },
  },
  {
    id: "capsule",
    slug: "capsule-elevator",
    name: "Capsule Elevator",
    category: "Panoramic Glass",
    shortDescription:
      "A glass cabin engineered to turn every ride into an architectural moment.",
    features: ["360° panoramic glass", "LED ambient lighting", "Statement centerpiece design"],
    specs: {
      capacity: "8–13 persons · 630–1000 kg",
      speed: "1.0–1.75 m/s",
      idealFor: "Lobbies & architectural landmarks",
    },
  },
  {
    id: "freight",
    slug: "freight-elevator",
    name: "Freight Elevator",
    category: "Heavy Load Transit",
    shortDescription:
      "Engineered for maximum payload, continuous cycles, and industrial durability.",
    features: ["High load capacity", "Reinforced steel cabin", "Continuous-duty motors"],
    specs: {
      capacity: "Up to 5000 kg",
      speed: "0.5–1.0 m/s",
      idealFor: "Warehouses & industrial facilities",
    },
  },
  {
    id: "home",
    slug: "home-elevator",
    name: "Home Elevator",
    category: "Residential Luxury",
    shortDescription:
      "Compact, quiet, and beautifully finished mobility for the modern private residence.",
    features: ["Space-saving footprint", "Bespoke interior finishes", "Whisper-quiet hydraulics"],
    specs: {
      capacity: "2–4 persons · 250–400 kg",
      speed: "0.15–0.3 m/s",
      idealFor: "Private residences & villas",
    },
  },
  {
    id: "mrl",
    slug: "machine-room-less-elevator",
    name: "Machine Room-Less Elevator",
    category: "Space-Efficient Engineering",
    shortDescription:
      "Compact drive engineering that reclaims valuable building space without compromise.",
    features: ["No dedicated machine room", "Reduced energy footprint", "Compact shaft design"],
    specs: {
      capacity: "6–13 persons · 450–1000 kg",
      speed: "1.0–1.75 m/s",
      idealFor: "Space-constrained buildings",
    },
  },
  {
    id: "hydraulic",
    slug: "hydraulic-elevator",
    name: "Hydraulic Elevator",
    category: "Low-Rise Precision",
    shortDescription:
      "Robust hydraulic systems engineered for smooth, precise low-rise performance.",
    features: ["Precision leveling", "Low maintenance design", "Reliable for low-rise buildings"],
    specs: {
      capacity: "6–10 persons · 450–800 kg",
      speed: "0.5–1.0 m/s",
      idealFor: "Low-rise buildings up to 6 floors",
    },
  },
];
