import type { Product } from "@/data/types";

export function SpecList({ product }: { product: Product }) {
  const specs = [
    { label: "Capacity", value: product.specs.capacity },
    { label: "Speed", value: product.specs.speed },
    { label: "Ideal For", value: product.specs.idealFor },
  ];

  return (
    <dl className="mt-1 flex flex-wrap gap-x-5 gap-y-2">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt className="text-[0.6rem] uppercase tracking-[0.15em] text-brand-blue/70">
            {spec.label}
          </dt>
          <dd className="text-xs text-graphite">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
