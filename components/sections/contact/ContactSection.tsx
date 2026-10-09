import { Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { ContactForm } from "./ContactForm";
import { OfficeMap } from "./OfficeMap";

export function ContactSection() {
  const { data: settings, loading } = useContent(getSiteSettings);

  return (
    <section id="contact" className="bg-bg-secondary py-28 md:py-36">
      <div className="container-oasis mb-16">
        <SectionHeading
          eyebrow="Contact"
          title="Let's engineer your next project."
          description="Tell us about your building and requirements — our team responds within one business day."
        />
      </div>

      <div className="container-oasis grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <RevealOnScroll>
          <ContactForm />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex flex-col gap-6">
          {loading || !settings ? (
            <SectionLoader />
          ) : (
            <>
              <ul className="flex flex-col gap-5 rounded-2xl border border-hairline bg-bg-primary p-8">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" />
                  <span className="text-sm">
                    {settings.address.line1}, {settings.address.line2}
                    <br />
                    {settings.address.city}, {settings.address.state} {settings.address.postalCode}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="size-5 shrink-0 text-brand-blue" />
                  <span className="text-sm">
                    <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                    {settings.phoneSecondary && (
                      <>
                        {" / "}
                        <a href={`tel:${settings.phoneSecondary}`}>{settings.phoneSecondary}</a>
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="size-5 shrink-0 text-brand-blue" />
                  <a href={`mailto:${settings.email}`} className="text-sm">
                    {settings.email}
                  </a>
                </li>
              </ul>

              {settings.emergencyPhone && (
                <div className="flex items-start gap-4 rounded-2xl border border-accent-orange/40 bg-bg-primary p-6">
                  <PhoneCall className="mt-0.5 size-5 shrink-0 text-accent-orange" />
                  <div>
                    <p className="font-heading text-sm font-medium">Alternate Contact Number</p>
                    <a href={`tel:${settings.emergencyPhone}`} className="text-sm text-accent-orange hover:text-navy">
                      {settings.emergencyPhone}
                    </a>
                  </div>
                </div>
              )}
            </>
          )}

          <OfficeMap />
        </RevealOnScroll>
      </div>
    </section>
  );
}
