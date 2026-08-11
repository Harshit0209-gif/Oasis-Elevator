import { Seo } from "@/lib/seo";
import { useSeo } from "@/hooks/use-seo";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { IndustriesShowcase } from "@/components/sections/industries/IndustriesShowcase";
import { WhyOasis } from "@/components/sections/why-oasis/WhyOasis";
import { ProcessShaft } from "@/components/sections/process/ProcessShaft";
import { ClientsMarquee } from "@/components/sections/clients/ClientsMarquee";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";

export function HomePage() {
  const seo = useSeo(
    "home",
    "Premium Elevators Engineered for Architectural Excellence",
    "Premium elevators engineered for residential, commercial, healthcare, hospitality and industrial projects across India.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/" />
      <Hero />
      <TrustIndicators />
      <IndustriesShowcase />
      <WhyOasis />
      <ProcessShaft />
      <ClientsMarquee />
      <Testimonials />
      <FaqSection />
      <CtaBand
        title="Ready to engineer your next project?"
        description="Tell us about your building and requirements — our team responds within one business day."
      />
    </>
  );
}
