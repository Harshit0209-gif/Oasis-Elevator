import { Seo } from "@/lib/seo";
import { products } from "@/data/products";
import { accessories } from "@/data/accessories";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProductListCard } from "@/components/sections/product-collection/ProductListCard";
import { AccessoryCard } from "@/components/sections/product-collection/AccessoryCard";

export function ProductsPage() {
  return (
    <>
      <Seo
        title="Products"
        description="Five engineered elevator systems, each built for the space it will serve."
        path="/products"
      />
      <PageHero
        eyebrow="Products"
        title="The Oasis collection."
        description="From residential comfort to critical-care mobility — five systems, each engineered with intent."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductListCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-surface py-24">
        <div className="container-oasis mb-12">
          <SectionHeading
            eyebrow="Accessories"
            title="Every component, engineered to match."
            description="Cabins, doors, control panels, controllers and machines — the parts that make up every Oasis installation."
          />
        </div>
        <div className="container-oasis grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
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
