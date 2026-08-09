import type { Product } from "@/data/types";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { OptimizedImage } from "@/components/shared/OptimizedImage";
import { SpecList } from "./SpecList";

export function ProductListCard({ product }: { product: Product }) {
  return (
    <RevealOnScroll id={product.slug} className="flex flex-col gap-5">
      <OptimizedImage
        src={product.image.src}
        alt={product.image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        containerClassName="aspect-[4/3] w-full rounded-2xl border border-hairline"
      />
      <div className="flex flex-col gap-3">
        <span className="font-heading text-xs uppercase tracking-[0.25em] text-brand-blue">
          {product.category}
        </span>
        <h3 className="font-heading text-xl font-medium">{product.name}</h3>
        <p className="text-sm leading-relaxed text-graphite">{product.shortDescription}</p>
        <SpecList product={product} />
        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
          {product.features.map((feature) => (
            <li key={feature} className="text-xs uppercase tracking-[0.08em] text-graphite/80">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </RevealOnScroll>
  );
}
