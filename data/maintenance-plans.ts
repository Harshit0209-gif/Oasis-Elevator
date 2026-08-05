// PLACEHOLDER CONTENT — plan inclusions and response times are illustrative; confirm real SLAs before launch.
import type { MaintenancePlan } from "./types";

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: "silver",
    tier: "Silver",
    tagline: "Essential care for consistent performance.",
    responseTime: "48-hour response",
    features: [
      "Quarterly preventive inspection",
      "Safety compliance checks",
      "Priority spare parts access",
      "Business-hours support",
    ],
  },
  {
    id: "gold",
    tier: "Gold",
    tagline: "Proactive coverage for high-traffic buildings.",
    responseTime: "24-hour response",
    features: [
      "Monthly preventive inspection",
      "Safety compliance checks",
      "Priority spare parts access",
      "Extended-hours support",
      "Annual performance audit",
    ],
    recommended: true,
  },
  {
    id: "platinum",
    tier: "Platinum",
    tagline: "Round-the-clock white-glove coverage.",
    responseTime: "4-hour emergency response",
    features: [
      "Monthly preventive inspection",
      "Safety compliance checks",
      "Dedicated spare parts inventory",
      "24×7 priority support",
      "Annual performance audit",
      "Dedicated account engineer",
    ],
  },
];
