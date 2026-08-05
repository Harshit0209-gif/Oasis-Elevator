import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { MaintenancePlans } from "@/components/sections/maintenance-plans/MaintenancePlans";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Maintenance Plans",
  description: "Three tiers of ongoing care — from essential upkeep to round-the-clock white-glove service.",
  path: "/maintenance",
});

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Maintenance"
        title="Care that never clocks out."
        description="Preventive inspection, rapid response, and lifetime servicing — engineered into every plan."
      />

      <MaintenancePlans />
      <FaqSection />

      <CtaBand
        title="Ready for reliable, round-the-clock care?"
        description="Talk to our team about the right maintenance plan for your building."
      />
    </>
  );
}
