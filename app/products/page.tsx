import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/data/products";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { ProductListCard } from "@/components/sections/product-collection/ProductListCard";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description: "Seven engineered elevator systems, each built for the space it will serve.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="The Oasis collection."
        description="From residential comfort to industrial-grade freight — seven systems, each engineered with intent."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductListCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which system fits your project?"
        description="Tell us about your building and our engineers will recommend the right configuration."
      />
    </>
  );
}
