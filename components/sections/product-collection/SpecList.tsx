import type { Product } from "@/data/types";

export function SpecList({ product }: { product: Product }) {
  return (
    <dl className="mt-1">
      <dt className="text-[0.6rem] uppercase tracking-[0.15em] text-brand-blue/70">Ideal For</dt>
      <dd className="text-xs text-graphite">{product.idealFor}</dd>
    </dl>
  );
}
