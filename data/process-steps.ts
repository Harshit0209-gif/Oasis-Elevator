import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    id: "consultation",
    order: 1,
    title: "Consultation",
    description: "We study your building, traffic patterns and vision before proposing a solution.",
  },
  {
    id: "site-survey",
    order: 2,
    title: "Site Survey",
    description: "Precise measurements and structural assessment to engineer the exact fit.",
  },
  {
    id: "engineering",
    order: 3,
    title: "Engineering",
    description: "Custom shaft, cabin and drive specifications drafted by our engineering team.",
  },
  {
    id: "manufacturing",
    order: 4,
    title: "Manufacturing",
    description: "Precision components manufactured under strict quality control.",
  },
  {
    id: "installation",
    order: 5,
    title: "Installation",
    description: "Certified technicians install with minimal disruption to your site.",
  },
  {
    id: "testing",
    order: 6,
    title: "Testing",
    description: "Rigorous safety and performance testing before handover.",
  },
  {
    id: "maintenance",
    order: 7,
    title: "Maintenance",
    description: "Ongoing 24/7 monitoring and servicing to keep every ride effortless.",
  },
];
