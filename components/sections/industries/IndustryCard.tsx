import type { Industry } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { cn } from "@/lib/utils";

// Desktop-only (rendered inside a `hidden lg:block` wrapper) — touch devices
// get IndustryMobileGallery instead, since this relies on hover to expand.
export function IndustryCard({
  industry,
  index,
  isLast,
}: {
  industry: Industry;
  index: number;
  isLast?: boolean;
}) {
  return (
    <div
      tabIndex={0}
      className={cn(
        "group/card relative h-[560px] flex-1 overflow-hidden border-r border-hairline outline-none",
        "transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:flex-[3] focus-visible:flex-[3]",
        isLast && "border-r-0",
      )}
    >
      <OptimizedImage
        src={industry.image.src}
        alt={industry.image.alt}
        fill
        sizes="40vw"
        containerClassName="absolute inset-0"
        className="opacity-90 transition-opacity duration-700 group-hover/card:opacity-100 group-focus-visible/card:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <span className="mb-2 font-heading text-xs text-accent-orange opacity-0 transition-opacity delay-150 duration-500 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={cn(
            "font-heading text-xl font-medium text-white transition-all duration-500",
            "[writing-mode:vertical-rl] group-hover/card:[writing-mode:horizontal-tb] group-focus-visible/card:[writing-mode:horizontal-tb]",
          )}
        >
          {industry.name}
        </h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all delay-150 duration-500 group-hover/card:max-h-24 group-hover/card:opacity-100 group-focus-visible/card:max-h-24 group-focus-visible/card:opacity-100">
          {industry.description}
        </p>
      </div>
    </div>
  );
}
