import { Seo } from "@/lib/seo";
import { getClients } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useSeo } from "@/hooks/use-seo";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionLoader } from "@/components/shared/SectionLoader";

export function ClientsPage() {
  const { data: clients, loading } = useContent(getClients);
  const seo = useSeo(
    "clients",
    "Clients",
    "Developers and contractors who bring Oasis in to engineer their vertical mobility.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/clients" />
      <PageHero
        eyebrow="Clients"
        title="Builders who trust us."
        description="A selection of the developers and contractors we've worked alongside."
      />

      <section className="bg-bg-primary py-24">
        {loading || !clients ? (
          <SectionLoader />
        ) : (
          <div className="container-oasis grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client, index) => (
              <RevealOnScroll
                key={client.id}
                delay={index * 0.05}
                className="flex items-center justify-center rounded-2xl border border-hairline bg-bg-secondary px-6 py-10 text-center shadow-sm"
              >
                <span className="font-heading text-lg font-medium text-navy">{client.name}</span>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </section>

      <CtaBand
        title="Building something new?"
        description="Let's discuss how Oasis can engineer the right solution for your next project."
      />
    </>
  );
}
