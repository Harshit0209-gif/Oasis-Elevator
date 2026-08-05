import type { Product } from "@/data/types";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProductShowcaseItemProps {
  product: Product;
  className?: string;
}

export function ProductShowcaseItem({ product, className }: ProductShowcaseItemProps) {
  if (product.layoutVariant === "split") {
    return (
      <RevealOnScroll variants={scaleIn} className={cn("relative overflow-hidden", className)}>
        <div className="flex h-full flex-col bg-bg-secondary md:flex-row">
          <div className="relative h-1/2 md:h-full md:w-1/2">
            <OptimizedImage
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              containerClassName="absolute inset-0"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:p-8">
            <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold">
              {product.category}
            </span>
            <h3 className="font-heading text-2xl font-medium text-foreground">{product.name}</h3>
            <p className="text-sm leading-relaxed text-graphite">{product.shortDescription}</p>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  if (product.layoutVariant === "feature") {
    return (
      <RevealOnScroll variants={scaleIn} className={cn("relative overflow-hidden", className)}>
        <OptimizedImage
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="100vw"
          containerClassName="absolute inset-0"
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="relative flex h-full flex-col justify-center gap-4 p-8 md:w-1/2 md:p-14">
          <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold">
            {product.category}
          </span>
          <h3 className="font-heading text-4xl font-medium text-bg-light md:text-5xl">
            {product.name}
          </h3>
          <p className="max-w-md text-base text-bg-light/70">{product.shortDescription}</p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="text-xs uppercase tracking-[0.1em] text-bg-light/60">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </RevealOnScroll>
    );
  }

  // wide / tall — full-bleed image with bottom overlay
  return (
    <RevealOnScroll variants={scaleIn} className={cn("relative overflow-hidden", className)}>
      <OptimizedImage
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        containerClassName="absolute inset-0"
        className="opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8">
        <span className="font-heading text-xs uppercase tracking-[0.25em] text-gold">
          {product.category}
        </span>
        <h3 className="font-heading text-2xl font-medium text-bg-light md:text-3xl">
          {product.name}
        </h3>
        <p className="max-w-sm text-sm text-bg-light/70">{product.shortDescription}</p>
      </div>
    </RevealOnScroll>
  );
}
