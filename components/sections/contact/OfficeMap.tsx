import { ExternalLink, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";

export function OfficeMap() {
  const { lat, lng } = companyInfo.geo;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  // Deep-links straight into the Google Maps app on mobile, or a new tab on
  // desktop — same coordinates as the embed below, so the pin matches.
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  // No key configured (VITE_GOOGLE_MAPS_API_KEY unset) — fail gracefully
  // with an address card rather than an embed that just errors.
  if (!apiKey) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-hairline bg-bg-secondary p-8 text-center">
        <MapPin className="size-8 text-brand-blue" />
        <p className="max-w-xs text-sm text-graphite">
          Map unavailable — set <code className="text-xs">VITE_GOOGLE_MAPS_API_KEY</code> to enable it.
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-brand-blue-hover"
        >
          Open in Google Maps
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[320px] w-full">
      <iframe
        title="Oasis Elevators office location"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=16`}
        className="h-full w-full rounded-2xl border border-hairline"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-bg-secondary/95 px-3 py-1.5 text-xs font-medium text-navy shadow-sm backdrop-blur-sm transition-colors hover:bg-bg-secondary hover:text-brand-blue"
      >
        Open in Google Maps
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
