import { products } from "@/data/products";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductShowcaseItem } from "./ProductShowcaseItem";

function findProduct(id: string) {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product id: ${id}`);
  return product;
}

export function ProductCollection() {
  const passenger = findProduct("passenger");
  const capsule = findProduct("capsule");
  const freight = findProduct("freight");
  const hospital = findProduct("hospital");
  const mrl = findProduct("mrl");
  const hydraulic = findProduct("hydraulic");
  const home = findProduct("home");

  return (
    <section id="products" className="bg-bg-primary py-28 md:py-36">
      <div className="container-oasis mb-14">
        <SectionHeading
          eyebrow="Products"
          title="The Oasis collection."
          description="Seven engineered systems, each with its own character — built for the space it will serve."
        />
      </div>

      <div className="container-oasis flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:h-[520px] md:flex-row">
          <ProductShowcaseItem product={passenger} className="h-[320px] md:h-full md:flex-[2]" />
          <ProductShowcaseItem product={capsule} className="h-[320px] md:h-full md:flex-1" />
        </div>

        <ProductShowcaseItem product={freight} className="h-[420px] md:h-[400px] w-full" />

        <div className="flex flex-col gap-4 md:h-[420px] md:flex-row">
          <ProductShowcaseItem product={hospital} className="h-[380px] md:h-full md:flex-1" />
          <ProductShowcaseItem product={mrl} className="h-[380px] md:h-full md:flex-1" />
        </div>

        <div className="flex flex-col gap-4 md:h-[520px] md:flex-row">
          <ProductShowcaseItem product={hydraulic} className="h-[320px] md:h-full md:flex-1" />
          <ProductShowcaseItem product={home} className="h-[320px] md:h-full md:flex-[2]" />
        </div>
      </div>
    </section>
  );
}
