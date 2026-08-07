import { Seo } from "@/lib/seo";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { IndustriesShowcase } from "@/components/sections/industries/IndustriesShowcase";
import { WhyOasis } from "@/components/sections/why-oasis/WhyOasis";
import { ProcessShaft } from "@/components/sections/process/ProcessShaft";
import { ClientsMarquee } from "@/components/sections/clients/ClientsMarquee";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { CertificationMarquee } from "@/components/sections/certifications/CertificationMarquee";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export function HomePage() {
  return (
    <>
      <Seo title="Premium Elevators Engineered for Architectural Excellence" path="/" />
      <Hero />
      <TrustIndicators />
      <IndustriesShowcase />
      <WhyOasis />
      <ProcessShaft />
      <ClientsMarquee />
      <Testimonials />
      <CertificationMarquee />
      <FaqSection />
      <ContactSection />
    </>
  );
}
