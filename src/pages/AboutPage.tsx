import { Seo, LocalBusinessJsonLd } from "@/lib/seo";
import { getAboutSection } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useSeo } from "@/hooks/use-seo";
import { resolveIcon } from "@/lib/resolve-icon";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrustIndicators } from "@/components/sections/trust-indicators/TrustIndicators";
import { CertificationsSection } from "@/components/sections/certifications/CertificationsSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AccentDivider } from "@/components/shared/AccentDivider";
import { SectionLoader } from "@/components/shared/SectionLoader";

export function AboutPage() {
  const { data: about, loading } = useContent(getAboutSection);
  const seo = useSeo(
    "about",
    "About",
    "Since 2015, Oasis Elevators has engineered premium vertical mobility for Kolkata's most ambitious buildings.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/about" />
      <LocalBusinessJsonLd />
      <PageHero
        eyebrow="About Oasis"
        title={about?.title || "Possibilities unlimited."}
        description={about?.description ?? ""}
      />

      <section className="bg-bg-primary py-24">
        {loading || !about ? (
          <SectionLoader />
        ) : (
          <>
            <div className="container-oasis grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
              {about.supportingPoints.map((point, i) => (
                <RevealOnScroll key={point.title} delay={i * 0.1} className="flex flex-col gap-5">
                  <AccentDivider />
                  <h2 className="font-heading text-2xl font-medium md:text-3xl">{point.title}</h2>
                  <p className="text-graphite leading-relaxed">{point.description}</p>
                </RevealOnScroll>
              ))}
            </div>

            {about.image && (
              <RevealOnScroll delay={0.15} className="container-oasis mt-16">
                <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-hairline bg-bg-secondary p-6 shadow-sm md:p-10">
                  <img
                    src={about.image}
                    alt="Exploded-view diagram of an elevator system — machine, guide rails, cabin, buffer and counterweight — alongside plan view, hoistway elevation and specification table"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </RevealOnScroll>
            )}
          </>
        )}
      </section>

      {!loading && about && about.missionItems.length > 0 && (
        <section className="border-t border-hairline bg-surface py-24">
          <div className="container-oasis mb-12">
            <SectionHeading eyebrow="Our Mission" title="Principles behind every project." />
          </div>
          <div className="container-oasis grid grid-cols-1 gap-6 sm:grid-cols-3">
            {about.missionItems.map((item) => {
              const Icon = resolveIcon(item.icon);
              return (
                <RevealOnScroll
                  key={item.title}
                  className="flex flex-col gap-4 rounded-2xl border border-hairline bg-bg-primary p-8"
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-brand-blue/8">
                    <Icon className="size-5 text-brand-blue" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-graphite">{item.description}</p>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>
      )}

      <TrustIndicators />
      <CertificationsSection />

      <CtaBand
        title="Let's build something worth engineering."
        description="Tell us about your next project — we'd love to be part of it."
      />
    </>
  );
}
