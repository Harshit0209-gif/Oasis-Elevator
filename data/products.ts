// PLACEHOLDER CONTENT — spec values are illustrative/typical-range; replace with real spec sheets before launch.
// Passenger, Hospital, Home, MRL and Hydraulic photos are real Oasis installation
// photography (sourced from oasiselevators.co.in/ProductDetails.aspx) — the full
// real product catalog, confirmed against that page (Capsule and Freight are not
// real Oasis product lines and have been removed).
import type { Product } from "./types";

const oasis = (name: string) => `/images/products/${name}.jpg`;

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
    image: {
      src: oasis("passenger-3"),
      alt: "Brushed-steel passenger elevator interior with control panel",
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
    image: {
      src: oasis("hospital-1"),
      alt: "Hospital attendant wheeling a bed into a stainless steel hospital elevator",
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
    image: {
      src: oasis("home-1"),
      alt: "Compact glass-cabin home elevator installed beside a wooden staircase",
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
    image: {
      src: oasis("mrl-1"),
      alt: "Compact machine-room-less gearless traction machine mounted in the shaft head",
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
    image: {
      src: oasis("hydraulic-1"),
      alt: "Cylindrical glass hydraulic elevator cabin on a steel frame",
    },
  },
];
