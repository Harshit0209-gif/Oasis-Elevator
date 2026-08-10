import { getWhyOasisItems } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { FeatureSplit } from "./FeatureSplit";
import { WhyOasisMobileList } from "./WhyOasisMobileList";

export function WhyOasis() {
  const { data: whyOasisFeatures, loading } = useContent(getWhyOasisItems);

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-6">
        <SectionHeading
          eyebrow="Why Oasis"
          title="Every ride, engineered with intent."
          description="Commitments that shape every project we deliver — from first sketch to lifetime service."
        />
      </div>

      {loading || !whyOasisFeatures ? (
        <SectionLoader />
      ) : (
        <>
          <WhyOasisMobileList features={whyOasisFeatures} className="md:hidden" />

          <div className="container-oasis hidden md:block">
            {whyOasisFeatures.map((feature) => (
              <FeatureSplit key={feature.id} feature={feature} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
