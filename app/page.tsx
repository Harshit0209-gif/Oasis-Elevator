import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero/Hero";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { IndustriesShowcase } from "@/components/sections/industries/IndustriesShowcase";
import { WhyOasis } from "@/components/sections/why-oasis/WhyOasis";
import { ProcessShaft } from "@/components/sections/process/ProcessShaft";
import { ProjectsPortfolio } from "@/components/sections/projects-portfolio/ProjectsPortfolio";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { CertificationMarquee } from "@/components/sections/certifications/CertificationMarquee";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = buildMetadata({
  title: "Premium Elevators Engineered for Architectural Excellence",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <IndustriesShowcase />
      <WhyOasis />
      <ProcessShaft />
      <ProjectsPortfolio />
      <Testimonials />
      <CertificationMarquee />
      <FaqSection />
      <ContactSection />
    </>
  );
}
