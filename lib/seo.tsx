import { getSiteSettings } from "./content";
import { useContent } from "@/hooks/use-content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";

interface SeoProps {
  title: string;
  description?: string;
  path?: string;
}

// Per-page <head> tags — React 19 automatically hoists <title>/<meta>/<link>
// rendered anywhere in the tree into the real <head>, deduping as newer ones
// mount. That's the client-rendered equivalent of Next's `metadata` export.
// No SSR here, so search engines only see these once JS executes — a
// deliberate trade-off of leaving Next.js.
export function Seo({ title, description, path = "" }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const desc = description ?? SITE_DESCRIPTION;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </>
  );
}

export function OrganizationJsonLd() {
  const { data: settings } = useContent(getSiteSettings);
  if (!settings) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/oasis-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.phone,
      contactType: "customer service",
      email: settings.email,
    },
    sameAs: Object.values(settings.socials).filter(Boolean),
  };

  return <script type="application/ld+json">{JSON.stringify(json)}</script>;
}

export function LocalBusinessJsonLd() {
  const { data: settings } = useContent(getSiteSettings);
  if (!settings) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.legalName,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${settings.address.line1}, ${settings.address.line2}`,
      addressLocality: settings.address.city,
      addressRegion: settings.address.state,
      postalCode: settings.address.postalCode,
      addressCountry: settings.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.geo.lat,
      longitude: settings.geo.lng,
    },
    url: SITE_URL,
  };

  return <script type="application/ld+json">{JSON.stringify(json)}</script>;
}
