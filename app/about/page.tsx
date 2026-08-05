import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { CertificationMarquee } from "@/components/sections/certifications/CertificationMarquee";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { GoldDivider } from "@/components/shared/GoldDivider";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Oasis Elevators engineers premium vertical mobility for India's most ambitious buildings.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()) }}
      />
      <PageHero
        eyebrow="About Oasis"
        title="Possibilities unlimited."
        description="For over two decades, we've engineered the vertical mobility behind India's most ambitious buildings."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
          <RevealOnScroll className="flex flex-col gap-5">
            <GoldDivider />
            <h2 className="font-heading text-2xl font-medium text-foreground md:text-3xl">
              Engineering, not just installation.
            </h2>
            <p className="text-graphite leading-relaxed">
              Oasis Elevators was founded on a simple belief: vertical mobility should feel as
              considered as the architecture it serves. Every project starts with the building,
              not a catalogue — we engineer cabins, drives and finishes around how a space will
              actually be lived in.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col gap-5">
            <GoldDivider />
            <h2 className="font-heading text-2xl font-medium text-foreground md:text-3xl">
              A team obsessed with the details.
            </h2>
            <p className="text-graphite leading-relaxed">
              From certified installation engineers to a 24×7 maintenance desk, our team stays
              involved long after handover. It&apos;s why architects and developers return to us
              project after project.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <TrustIndicators />
      <CertificationMarquee />

      <CtaBand
        title="Let's build something worth engineering."
        description="Tell us about your next project — we'd love to be part of it."
      />
    </>
  );
}
