// PLACEHOLDER CONTENT — quotes and names are illustrative; replace with real client testimonials before launch.
import type { Testimonial } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=300&auto=format&fit=crop&crop=faces`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Oasis didn't just install elevators — they engineered an experience that matches the building's ambition. Every detail was considered.",
    clientName: "Arvind Rao",
    clientTitle: "Managing Director",
    company: "Constellation Developers",
    photo: { src: unsplash("1560250097-0b93528c311a"), alt: "Portrait of Arvind Rao" },
  },
  {
    id: "t2",
    quote:
      "From consultation to handover, the process felt like working with a true engineering partner, not just a vendor.",
    clientName: "Meera Kulkarni",
    clientTitle: "Facilities Director",
    company: "Sunrise Healthcare Group",
    photo: { src: unsplash("1573497019940-1c28c88b4f3e"), alt: "Portrait of Meera Kulkarni" },
  },
  {
    id: "t3",
    quote:
      "The capsule elevator became the architectural centerpiece of our lobby. Guests notice it the moment they walk in.",
    clientName: "Devraj Singh",
    clientTitle: "Principal Architect",
    company: "Singh & Associates",
    photo: { src: unsplash("1519085360753-af0119f7cbe7"), alt: "Portrait of Devraj Singh" },
  },
  {
    id: "t4",
    quote:
      "Their 24x7 maintenance response has been faster than any vendor we've worked with in fifteen years of operations.",
    clientName: "Priya Nair",
    clientTitle: "Operations Head",
    company: "Lumen Retail Group",
    photo: { src: unsplash("1580489944761-15a19d654956"), alt: "Portrait of Priya Nair" },
  },
  {
    id: "t5",
    quote:
      "Precision, reliability, and a finish quality that feels genuinely premium. Exactly what our residents expect.",
    clientName: "Karan Malhotra",
    clientTitle: "Project Head",
    company: "Meridian Residences",
    photo: { src: unsplash("1500648767791-00dcc994a43e"), alt: "Portrait of Karan Malhotra" },
  },
];
