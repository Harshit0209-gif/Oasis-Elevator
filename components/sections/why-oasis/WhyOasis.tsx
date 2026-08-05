import { whyOasisFeatures } from "@/data/why-oasis";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FeatureSplit } from "./FeatureSplit";

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

      <div className="container-oasis">
        {whyOasisFeatures.map((feature) => (
          <FeatureSplit key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}
