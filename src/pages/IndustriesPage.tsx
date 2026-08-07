import { Seo } from "@/lib/seo";
import { industries } from "@/data/industries";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { IndustryListCard } from "@/components/sections/industries/IndustryListCard";

export function IndustriesPage() {
  return (
    <>
      <Seo
        title="Industries"
        description="Engineered mobility for residential, commercial, healthcare and industrial buildings."
        path="/industries"
      />
      <PageHero
        eyebrow="Industries"
        title="Built for every vertical."
        description="From private residences to critical healthcare infrastructure — engineered mobility for every environment."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryListCard key={industry.id} industry={industry} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Engineering mobility for your industry."
        description="Speak with our team about the specific demands of your building type."
      />
    </>
  );
}
