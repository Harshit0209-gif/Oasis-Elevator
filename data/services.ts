import type { Service } from "./types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

export const services: Service[] = [
  {
    id: "erection-new-installation",
    title: "Erection & New Installation",
    description:
      "Precision installation backed by premium-grade material and engineers dedicated to a smooth, safe and comfortable ride — every project executed to safety code from first fix through commissioning.",
    image: {
      src: unsplash("1743662490169-342a322f98b4"),
      alt: "Interior view of an elevator shaft during installation",
    },
  },
  {
    id: "maintenance-repair-service",
    title: "Maintenance, Repair & Service",
    description:
      "Genuine, reliable servicing across OTIS, ADAMS, Mitsubishi and other major elevator brands, led by engineers with hands-on OTIS experience — for safe, trouble-free operation year-round.",
    image: {
      src: unsplash("1621905251189-08b45d6a269e"),
      alt: "Technician servicing wiring and controls on site",
    },
  },
  {
    id: "modernization-renovation",
    title: "Modernization & Renovation",
    description:
      "Transform an ageing elevator into a modern system — upgraded controls, drives, display and cabin finish — at a fraction of full replacement cost.",
    features: [
      "Relay logic upgraded to microprocessor controller",
      "Single-speed drive converted to variable-speed",
      "7-segment display upgraded to LCD",
      "Cabin refinished in M.S. / S.S. in place of wood",
      "Round cable replaced with lift-duty cable",
      "ARD (Automatic Rescue Device) and overload protection added",
      "Non-stop function clock with temperature display",
    ],
    image: {
      src: unsplash("1592256410394-51c948ec13d5"),
      alt: "Modern stainless steel elevator panel with buttons",
    },
  },
];
