// Maps the semantic keys in data/cabin-config.ts to concrete CSS values.
// Kept separate from the data layer so visual tuning never touches content.

export const MATERIAL_WALL: Record<string, string> = {
  "brushed-steel": "linear-gradient(135deg, #9a9ea3 0%, #5c6065 55%, #74787d 100%)",
  "matte-white": "linear-gradient(135deg, #ececea 0%, #d2d3d0 60%, #e2e2e0 100%)",
  glass: "linear-gradient(135deg, rgba(140,185,210,0.4) 0%, rgba(25,35,48,0.75) 60%, rgba(90,130,155,0.35) 100%)",
  "reinforced-steel": "linear-gradient(135deg, #767b81 0%, #35383c 55%, #55585c 100%)",
  "walnut-veneer": "linear-gradient(135deg, #7a5439 0%, #3d2a1e 55%, #5e402c 100%)",
  "matte-graphite": "linear-gradient(135deg, #565a60 0%, #232528 55%, #3a3d41 100%)",
};

export const MATERIAL_FLOOR: Record<string, string> = {
  "brushed-steel": "linear-gradient(180deg, #4c4f53 0%, #2c2e31 100%)",
  "matte-white": "linear-gradient(180deg, #c7c8c5 0%, #a8a9a6 100%)",
  glass: "linear-gradient(180deg, rgba(30,42,58,0.9) 0%, rgba(12,17,24,0.95) 100%)",
  "reinforced-steel": "linear-gradient(180deg, #46494d 0%, #232527 100%)",
  "walnut-veneer": "linear-gradient(180deg, #4a3120 0%, #291b12 100%)",
  "matte-graphite": "linear-gradient(180deg, #313337 0%, #1a1b1d 100%)",
};

export const LIGHTING_GLOW: Record<string, string> = {
  warm: "#f3d9a6",
  clinical: "#dbe9f0",
  ambient: "#e6cf9a",
  industrial: "#c7ccd1",
  cool: "#c9d2da",
};
