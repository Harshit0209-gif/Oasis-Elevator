import type { CabinType } from "./types";

// Drives the Interactive Elevator Experience cabin illustration.
// panelMaterial / lightingTone / doorStyle are semantic keys consumed by
// CabinIllustration.tsx to pick gradients, filters and transform presets —
// keeping the visual language centralized instead of scattered inline styles.
export const cabinTypes: CabinType[] = [
  {
    id: "passenger",
    name: "Passenger",
    panelMaterial: "brushed-steel",
    lightingTone: "warm",
    doorStyle: "center-split",
    accentColor: "#C8A96A",
    description: "Refined brushed steel panels with warm ambient lighting.",
  },
  {
    id: "hospital",
    name: "Hospital",
    panelMaterial: "matte-white",
    lightingTone: "clinical",
    doorStyle: "wide-split",
    accentColor: "#8FB8C8",
    description: "Antimicrobial matte panels under clean, clinical light.",
  },
  {
    id: "capsule",
    name: "Capsule",
    panelMaterial: "glass",
    lightingTone: "ambient",
    doorStyle: "glass-slide",
    accentColor: "#D6B87A",
    description: "Panoramic glass walls with soft ambient LED lighting.",
  },
  {
    id: "freight",
    name: "Freight",
    panelMaterial: "reinforced-steel",
    lightingTone: "industrial",
    doorStyle: "vertical-lift",
    accentColor: "#9AA5AD",
    description: "Reinforced steel plating built for continuous heavy load.",
  },
  {
    id: "home",
    name: "Home",
    panelMaterial: "walnut-veneer",
    lightingTone: "warm",
    doorStyle: "center-split",
    accentColor: "#C8A96A",
    description: "Walnut veneer panelling finished for private residences.",
  },
  {
    id: "mrl",
    name: "Machine Room-Less",
    panelMaterial: "matte-graphite",
    lightingTone: "cool",
    doorStyle: "center-split",
    accentColor: "#6B7280",
    description: "Compact drive engineering behind a minimal matte facade.",
  },
  {
    id: "hydraulic",
    name: "Hydraulic",
    panelMaterial: "brushed-steel",
    lightingTone: "industrial",
    doorStyle: "wide-split",
    accentColor: "#B99456",
    description: "Precision hydraulics behind a durable brushed steel shell.",
  },
];
