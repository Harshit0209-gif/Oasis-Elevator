// Sourced from https://oasiselevators.co.in/ (fetched 2026-08-07). Geo
// coordinates are an approximate New Town/Nabadiganta, Kolkata pin — not
// geocoded from a verified source. Business hours aren't listed on the live
// site and are a reasonable placeholder pending confirmation.
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
    lat: 22.5958,
    lng: 88.4497,
  },
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  socials: {
    facebook: "https://www.facebook.com/oasiselevators18/?ti=as",
    linkedin: "https://www.linkedin.com/in/oasis-elevators-06362b157/",
    instagram: "https://www.instagram.com/oasiselevators/",
  },
};
