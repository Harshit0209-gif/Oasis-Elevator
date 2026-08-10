import { Seo } from "@/lib/seo";
import { getIndustries } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useSeo } from "@/hooks/use-seo";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { IndustryListCard } from "@/components/sections/industries/IndustryListCard";

export function IndustriesPage() {
  const { data: industries, loading } = useContent(getIndustries);
  const seo = useSeo(
    "industries",
    "Industries",
    "Engineered mobility for residential, commercial, healthcare and industrial buildings.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/industries" />
      <PageHero
        eyebrow="Industries"
        title="Built for every vertical."
        description="From private residences to critical healthcare infrastructure — engineered mobility for every environment."
      />

      <section className="bg-bg-primary py-24">
        {loading || !industries ? (
          <SectionLoader />
        ) : (
          <div className="container-oasis grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <IndustryListCard key={industry.id} industry={industry} />
            ))}
          </div>
        )}
      </section>

      <CtaBand
        title="Engineering mobility for your industry."
        description="Speak with our team about the specific demands of your building type."
      />
    </>
  );
}
