// Component categories sourced from https://oasiselevators.co.in/Accessories.aspx
// (fetched 2026-08-07). The source page lists category names and photos only —
// no specs or copy — so descriptions below are our own factual summaries of
// what each component does, not text pulled from the source.
import type { Accessory } from "./types";

export const accessories: Accessory[] = [
  {
    id: "cabin-cage",
    name: "Cabin & Cage",
    description:
      "The passenger compartment itself, available in a range of finishes and layouts to match the building's interior.",
  },
  {
    id: "gate-door",
    name: "Gate & Door",
    description:
      "Car and landing doors engineered for smooth, reliable operation across thousands of daily cycles.",
  },
  {
    id: "cop-lop",
    name: "COP & LOP",
    description:
      "Car Operating Panels and Landing Operating Panels — the tactile interface passengers use to call and direct the elevator.",
  },
  {
    id: "controller",
    name: "Controller",
    description:
      "The electronic control system governing elevator movement, safety interlocks, and floor positioning.",
  },
  {
    id: "machine",
    name: "Machine",
    description:
      "The drive unit — motor and traction gear — that powers the elevator's vertical movement.",
  },
];
