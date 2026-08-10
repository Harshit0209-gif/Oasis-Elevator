import { Seo, LocalBusinessJsonLd } from "@/lib/seo";
import { useSeo } from "@/hooks/use-seo";
import { PageHero } from "@/components/shared/PageHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export function ContactPage() {
  const seo = useSeo(
    "contact",
    "Contact",
    "Get in touch with Oasis Elevators for a consultation on your next project.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/contact" />
      <LocalBusinessJsonLd />
      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        description="Whether it's a new installation or an emergency callout, our team is ready to help."
      />
      <ContactSection />
    </>
  );
}
