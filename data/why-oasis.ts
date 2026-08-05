import type { WhyOasisFeature } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const whyOasisFeatures: WhyOasisFeature[] = [
  {
    id: "engineering",
    eyebrow: "01 — Engineering",
    title: "Precision, by design.",
    description:
      "Every cabin is engineered to millimeter tolerances — from shaft alignment to door timing — because true luxury is invisible engineering.",
    image: {
      src: unsplash("1524230572899-a752b3835840"),
      alt: "Precisely repeating white architectural archways",
    },
    imagePosition: "right",
  },
  {
    id: "safety",
    eyebrow: "02 — Safety",
    title: "Trust, engineered in.",
    description:
      "Redundant safety systems, certified components and continuous monitoring — built to protect every passenger, every ride.",
    image: {
      src: unsplash("1497366216548-37526070297c"),
      alt: "Secure modern glass-walled office corridor",
    },
    imagePosition: "left",
  },
  {
    id: "innovation",
    eyebrow: "03 — Innovation",
    title: "Ahead of the curve.",
    description:
      "From machine room-less drives to smart destination control, we bring next-generation vertical mobility to every project.",
    image: {
      src: unsplash("1486718448742-163732cd1544"),
      alt: "Sculptural modern architecture with sweeping curves",
    },
    imagePosition: "right",
  },
  {
    id: "materials",
    eyebrow: "04 — Premium Materials",
    title: "Materials that endure.",
    description:
      "Brushed steel, walnut veneer, tempered glass — every finish is selected for beauty that lasts decades, not seasons.",
    image: {
      src: unsplash("1497366811353-6870744d04b2"),
      alt: "Interior showcasing rich natural wood and steel materials",
    },
    imagePosition: "left",
  },
  {
    id: "installation",
    eyebrow: "05 — Certified Installation",
    title: "Certified from day one.",
    description:
      "Our installation teams are factory-trained and certified, ensuring every deployment meets the same exacting standard.",
    image: {
      src: unsplash("1541888946425-d81bb19240f5"),
      alt: "Certified engineers reviewing a construction site",
    },
    imagePosition: "right",
  },
  {
    id: "maintenance",
    eyebrow: "06 — 24×7 Maintenance",
    title: "Always in motion.",
    description:
      "Round-the-clock monitoring and rapid-response servicing mean your elevators are never far from expert care.",
    image: {
      src: unsplash("1541746972996-4e0b0f43e02a"),
      alt: "Team working late in a modern office, always on",
    },
    imagePosition: "left",
  },
];
