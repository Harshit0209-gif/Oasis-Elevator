"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";
import { Button } from "@/components/ui/button";

export function OfficeMap() {
  const [loaded, setLoaded] = useState(false);
  const { lat, lng } = companyInfo.geo;

  if (!loaded) {
    return (
      <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border border-hairline bg-bg-secondary p-8 text-center">
        <MapPin className="size-8 text-brand-blue" />
        <div>
          <p className="font-heading text-base font-medium">
            {companyInfo.address.city}, {companyInfo.address.state}
          </p>
          <p className="mt-1 text-sm text-graphite">
            {companyInfo.address.line1}, {companyInfo.address.line2}
          </p>
        </div>
        <Button variant="outline" onClick={() => setLoaded(true)}>
          Load Map
        </Button>
      </div>
    );
  }

  return (
    <iframe
      title="Oasis Elevators office location"
      src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
      className="h-full min-h-[320px] w-full rounded-2xl border border-hairline grayscale-[0.3]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
