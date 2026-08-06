import type { WhyOasisFeature } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AccentDivider } from "@/components/shared/AccentDivider";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FeatureSplit({ feature }: { feature: WhyOasisFeature }) {
  const imageFirst = feature.imagePosition === "left";

  return (
    <div className="grid grid-cols-1 items-center gap-10 border-b border-hairline py-16 md:grid-cols-2 md:gap-16 md:py-24 last:border-b-0">
      <RevealOnScroll
        variants={imageFirst ? slideInLeft : slideInRight}
        className={cn("order-1", imageFirst ? "md:order-1" : "md:order-2")}
      >
        <OptimizedImage
          src={feature.image.src}
          alt={feature.image.alt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          containerClassName="aspect-[4/3] w-full rounded-2xl"
          className="rounded-2xl"
        />
      </RevealOnScroll>

      <RevealOnScroll
        variants={fadeUp}
        className={cn("order-2 flex flex-col gap-5", imageFirst ? "md:order-2" : "md:order-1")}
      >
        <span className="font-heading text-xs font-medium uppercase tracking-[0.3em] text-brand-blue">
          {feature.eyebrow}
        </span>
        <AccentDivider />
        <h3 className="text-balance font-heading text-3xl font-medium leading-tight md:text-4xl lg:text-5xl">
          {feature.title}
        </h3>
        <p className="max-w-md text-balance text-base leading-relaxed text-graphite md:text-lg">
          {feature.description}
        </p>
      </RevealOnScroll>
    </div>
  );
}
