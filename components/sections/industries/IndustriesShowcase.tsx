import { getIndustries } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { fadeIn } from "@/lib/motion";
import { IndustryCard } from "./IndustryCard";
import { IndustryMobileGallery } from "./IndustryMobileGallery";

export function IndustriesShowcase() {
  const { data: industries, loading } = useContent(getIndustries);

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Industries"
          title="Built for every vertical."
          description="From private residences to critical healthcare infrastructure — engineered mobility for every environment."
        />
      </div>

      {loading || !industries ? (
        <SectionLoader />
      ) : (
        <>
          <IndustryMobileGallery industries={industries} />

          <RevealOnScroll variants={fadeIn} className="hidden lg:block">
            <div className="flex flex-col border-y border-hairline lg:flex-row">
              {industries.map((industry, index) => (
                <IndustryCard
                  key={industry.id}
                  industry={industry}
                  index={index}
                  isLast={index === industries.length - 1}
                />
              ))}
            </div>
          </RevealOnScroll>
        </>
      )}
    </section>
  );
}
