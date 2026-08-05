// PLACEHOLDER CONTENT — descriptions are illustrative; refine with real project data before launch.
import type { Industry } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const industries: Industry[] = [
  {
    id: "residential",
    slug: "residential",
    name: "Residential",
    description:
      "Elevators engineered for the rhythm of home — quiet, refined, and built to last generations.",
    image: {
      src: unsplash("1580587771525-78b9dba3b914"),
      alt: "Modern luxury residential villa with a private pool",
    },
  },
  {
    id: "commercial",
    slug: "commercial",
    name: "Commercial",
    description:
      "High-throughput vertical transportation engineered for the pace of modern business.",
    image: {
      src: unsplash("1554469384-e58fac16e23a"),
      alt: "Low-angle view of a modern glass commercial office tower",
    },
  },
  {
    id: "healthcare",
    slug: "healthcare",
    name: "Healthcare",
    description:
      "Precision-critical mobility for hospitals — stretcher-friendly, silent, and always dependable.",
    image: {
      src: unsplash("1519494026892-80bbd2d6fd0d"),
      alt: "Clean, modern hospital reception and corridor",
    },
  },
  {
    id: "hospitality",
    slug: "hospitality",
    name: "Hospitality",
    description:
      "Cabins designed to feel like an extension of the lobby — the first and last impression of luxury.",
    image: {
      src: unsplash("1578683010236-d716f9a3f461"),
      alt: "Luxury hotel suite bedroom with floor-to-ceiling glass",
    },
  },
  {
    id: "industrial",
    slug: "industrial",
    name: "Industrial",
    description:
      "Heavy-duty engineering built for continuous load, harsh environments, and zero downtime.",
    image: {
      src: unsplash("1513828583688-c52646db42da"),
      alt: "Clean, modern industrial machinery and steel piping",
    },
  },
  {
    id: "retail",
    slug: "retail",
    name: "Retail",
    description:
      "Elevators and escalators that move footfall effortlessly through premium retail environments.",
    image: {
      src: unsplash("1567958451986-2de427a4a0be"),
      alt: "Bright, modern retail store interior",
    },
  },
  {
    id: "corporate-offices",
    slug: "corporate-offices",
    name: "Corporate Offices",
    description:
      "Vertical mobility that matches the ambition of a headquarters — fast, quiet, and effortless.",
    image: {
      src: unsplash("1497215728101-856f4ea42174"),
      alt: "Bright modern corporate office with skyline views",
    },
  },
  {
    id: "educational",
    slug: "educational",
    name: "Educational Institutions",
    description:
      "Safe, accessible mobility engineered for high foot-traffic campuses and academic landmarks.",
    image: {
      src: unsplash("1541339907198-e08756dedf3f"),
      alt: "Graduating students celebrating on a university campus",
    },
  },
];
