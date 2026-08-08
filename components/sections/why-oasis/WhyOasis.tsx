import { whyOasisFeatures } from "@/data/why-oasis";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeatureSplit } from "./FeatureSplit";
import { WhyOasisMobileList } from "./WhyOasisMobileList";

export function WhyOasis() {
  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-6">
        <SectionHeading
          eyebrow="Why Oasis"
          title="Every ride, engineered with intent."
          description="Six commitments that shape every project we deliver — from first sketch to lifetime service."
        />
      </div>

      <WhyOasisMobileList features={whyOasisFeatures} className="md:hidden" />

      <div className="container-oasis hidden md:block">
        {whyOasisFeatures.map((feature) => (
          <FeatureSplit key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
