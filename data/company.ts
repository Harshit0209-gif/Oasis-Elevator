// Sourced from https://oasiselevators.co.in/ (fetched 2026-08-07). Geo
// coordinates are the exact office location, provided directly by the client
// (22°29'04.4"N 88°23'58.8"E → 22.484556, 88.399667) — confirms the site is
// in the Panchasayar area of South Kolkata (PIN 700094), not the unrelated
// New Town/Nabadiganta industrial township an earlier pass mistakenly
// assumed. Business hours aren't listed on the live site and are a
// reasonable placeholder pending confirmation.
import type { CompanyInfo } from "./types";

export const companyInfo: CompanyInfo = {
  legalName: "Oasis Elevators Pvt. Ltd.",
  tagline: "Building Up Vision, Leading Future",
  phone: "+91 90023 43706",
  emergencyPhone: "+91 94311 86893",
  email: "info@oasiselevators.co.in",
  address: {
    line1: "Uttaran Regency",
    line2: "19 No. Nabadiganta",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700094",
    country: "India",
  },
  geo: {
    lat: 22.484556,
    lng: 88.399667,
  },
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  socials: {
    facebook: "https://www.facebook.com/oasiselevators18/?ti=as",
    linkedin: "https://www.linkedin.com/in/oasis-elevators-06362b157/",
    instagram: "https://www.instagram.com/oasiselevators/",
  },
};
