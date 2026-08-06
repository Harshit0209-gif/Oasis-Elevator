import type { Industry } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function IndustryListCard({ industry }: { industry: Industry }) {
  return (
    <RevealOnScroll className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
      <OptimizedImage
        src={industry.image.src}
        alt={industry.image.alt}
        fill
        sizes="(min-width: 768px) 33vw, 100vw"
        containerClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <h3 className="font-heading text-xl font-medium text-white">{industry.name}</h3>
        <p className="text-sm text-white/75">{industry.description}</p>
      </div>
    </RevealOnScroll>
  );
}
