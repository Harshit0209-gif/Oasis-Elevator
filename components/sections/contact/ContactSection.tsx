import { Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { companyInfo } from "@/data/company";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ContactForm } from "./ContactForm";
import { OfficeMap } from "./OfficeMap";

export function ContactSection() {
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
          <ul className="flex flex-col gap-5 rounded-2xl border border-hairline bg-bg-primary p-8">
            <li className="flex items-start gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" />
              <span className="text-sm">
                {companyInfo.address.line1}, {companyInfo.address.line2}
                <br />
                {companyInfo.address.city}, {companyInfo.address.state}{" "}
                {companyInfo.address.postalCode}
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="size-5 shrink-0 text-brand-blue" />
              <a href={`tel:${companyInfo.phone}`} className="text-sm">
                {companyInfo.phone}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="size-5 shrink-0 text-brand-blue" />
              <a href={`mailto:${companyInfo.email}`} className="text-sm">
                {companyInfo.email}
              </a>
            </li>
            <li className="border-t border-hairline pt-5 text-xs uppercase tracking-[0.15em] text-graphite">
              {companyInfo.hours}
            </li>
          </ul>

          <div className="flex items-start gap-4 rounded-2xl border border-accent-orange/40 bg-bg-primary p-6">
            <PhoneCall className="mt-0.5 size-5 shrink-0 text-accent-orange" />
            <div>
              <p className="font-heading text-sm font-medium">Alternate Contact Number</p>
              <a
                href={`tel:${companyInfo.emergencyPhone}`}
                className="text-sm text-accent-orange hover:text-navy"
              >
                {companyInfo.emergencyPhone}
              </a>
            </div>
          </div>

          <OfficeMap />
        </RevealOnScroll>
      </div>
    </section>
  );
}
