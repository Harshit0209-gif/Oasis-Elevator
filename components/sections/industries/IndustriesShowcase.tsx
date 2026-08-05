import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { fadeIn } from "@/lib/motion";
import { IndustryCard } from "./IndustryCard";

export function IndustriesShowcase() {
  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Industries"
          title="Built for every vertical."
          description="From private residences to critical healthcare infrastructure — engineered mobility for every environment."
        />
      </div>

      <RevealOnScroll variants={fadeIn}>
        <div className="flex flex-col border-y border-hairline lg:flex-row">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} index={index} />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
