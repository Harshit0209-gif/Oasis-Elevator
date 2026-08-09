import { Handshake, ShieldCheck, Timer } from "lucide-react";
import { Seo, LocalBusinessJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AccentDivider } from "@/components/shared/AccentDivider";

const mission = [
  {
    id: "quality",
    icon: ShieldCheck,
    title: "Quality",
    description: "Quality products that make every journey safe, smoother and reliable.",
  },
  {
    id: "commitment",
    icon: Handshake,
    title: "Commitment",
    description: "Committed to what we can genuinely deliver, matched to our real ability.",
  },
  {
    id: "execution",
    icon: Timer,
    title: "Execution",
    description: "Every project executed on time, or ahead of the agreed time frame.",
  },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Since 2015, Oasis Elevators has engineered premium vertical mobility for Kolkata's most ambitious buildings."
        path="/about"
      />
      <LocalBusinessJsonLd />
      <PageHero
        eyebrow="About Oasis"
        title="Possibilities unlimited."
        description="Since 2015, we've been Kolkata's trusted name in vertical mobility — a privately owned, licensed lift company engineering journeys, not just installing elevators."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
          <RevealOnScroll className="flex flex-col gap-5">
            <AccentDivider />
            <h2 className="font-heading text-2xl font-medium md:text-3xl">
              Engineering, not just installation.
            </h2>
            <p className="text-graphite leading-relaxed">
              Oasis Elevators Pvt. Ltd. is a registered and licensed company for the erection and
              maintenance of elevators, delivering the full journey end to end — design,
              manufacture and installation, through to ongoing maintenance and modernization.
              Every project starts with the building, not a catalogue.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col gap-5">
            <AccentDivider />
            <h2 className="font-heading text-2xl font-medium md:text-3xl">
              Quality over quantity.
            </h2>
            <p className="text-graphite leading-relaxed">
              We extend hassle-free service, 24×7. "Quality and not the quantity" has been the
              motto of our work culture since day one — when you think of safety and security in
              vertical mobility, that's the standard we hold ourselves to.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="border-t border-hairline bg-surface py-24">
        <div className="container-oasis mb-12">
          <SectionHeading
            eyebrow="Our Mission"
            title="Three principles behind every project."
          />
        </div>
        <div className="container-oasis grid grid-cols-1 gap-6 sm:grid-cols-3">
          {mission.map((item) => (
            <RevealOnScroll
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-hairline bg-bg-primary p-8"
            >
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-blue/8">
                <item.icon className="size-5 text-brand-blue" strokeWidth={1.75} />
              </div>
              <h3 className="font-heading text-lg font-medium">{item.title}</h3>
              <p className="text-sm leading-relaxed text-graphite">{item.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <TrustIndicators />

      <CtaBand
        title="Let's build something worth engineering."
        description="Tell us about your next project — we'd love to be part of it."
      />
    </>
  );
}
