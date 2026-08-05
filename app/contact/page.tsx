import type { Metadata } from "next";
import { buildMetadata, buildLocalBusinessJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Oasis Elevators for a consultation on your next project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Whether it's a new installation or an emergency callout, our team is ready to help."
      />
      <ContactSection />
    </>
  );
}
