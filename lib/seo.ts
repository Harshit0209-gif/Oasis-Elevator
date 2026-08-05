import type { Metadata } from "next";
import { companyInfo } from "@/data/company";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

interface BuildMetadataArgs {
  title: string;
  description?: string;
  path?: string;
}

export function buildMetadata({ title, description, path = "" }: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const desc = description ?? SITE_DESCRIPTION;

  return {
    title: `${title} | ${SITE_NAME}`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description: desc,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/oasis-logo.png`,
    slogan: companyInfo.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      email: companyInfo.email,
    },
    sameAs: Object.values(companyInfo.socials),
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyInfo.legalName,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${companyInfo.address.line1}, ${companyInfo.address.line2}`,
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.state,
      postalCode: companyInfo.address.postalCode,
      addressCountry: companyInfo.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: companyInfo.geo.lat,
      longitude: companyInfo.geo.lng,
    },
    url: SITE_URL,
  };
}
