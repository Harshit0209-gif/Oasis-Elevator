import { Check } from "lucide-react";
import { Seo } from "@/lib/seo";
import { getServices } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useSeo } from "@/hooks/use-seo";
import { resolveIcon } from "@/lib/resolve-icon";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AccentDivider } from "@/components/shared/AccentDivider";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { SectionLoader } from "@/components/shared/SectionLoader";

export function ServicesPage() {
  const { data: services, loading } = useContent(getServices);
  const seo = useSeo(
    "services",
    "Services",
    "End-to-end elevator services — erection & new installation, maintenance & repair, and modernization & renovation.",
  );
  const modernization = services?.find((service) => service.features);

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/services" />
      <PageHero
        eyebrow="Services"
        title="Vertical mobility, fully engineered."
        description="From first fix to lifetime service — how we partner with architects, developers and facility teams."
      />

      <section className="bg-bg-primary py-24">
        {loading || !services ? (
          <SectionLoader />
        ) : (
          <div className="container-oasis grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = resolveIcon(service.icon);
              return (
                <RevealOnScroll key={service.id} delay={index * 0.08} className="flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline">
                    <OptimizedImage
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      containerClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg">
                      <Icon className="size-5" />
                    </span>
                    <span className="absolute right-4 top-4 font-heading text-sm font-medium text-white/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <h2 className="font-heading text-xl font-medium md:text-2xl">{service.title}</h2>
                    <AccentDivider />
                    <p className="text-graphite">{service.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        )}
      </section>

      {modernization?.features && (
        <section className="bg-bg-primary pb-24">
          <div className="container-oasis">
            <RevealOnScroll className="rounded-2xl border border-hairline bg-bg-secondary p-8 shadow-sm md:p-12">
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-xl font-medium md:text-2xl">
                  What's included in a modernization
                </h2>
                <p className="text-graphite">
                  Every upgrade path for {modernization.title.toLowerCase()} projects.
                </p>
              </div>
              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                {modernization.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                    {feature}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </section>
      )}

      <CtaBand
        title="Not sure where to start?"
        description="Our team will help you identify the right service for your building and timeline."
      />
    </>
  );
}
