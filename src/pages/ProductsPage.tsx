import { Seo } from "@/lib/seo";
import { getProducts } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useSeo } from "@/hooks/use-seo";
import { accessories } from "@/data/accessories";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionLoader } from "@/components/shared/SectionLoader";
import { ProductListCard } from "@/components/sections/product-collection/ProductListCard";
import { AccessoryCard } from "@/components/sections/product-collection/AccessoryCard";

export function ProductsPage() {
  const { data: products, loading } = useContent(getProducts);
  const seo = useSeo(
    "products",
    "Products",
    "Engineered elevator systems, each built for the space it will serve.",
  );

  return (
    <>
      <Seo title={seo.title} description={seo.description} path="/products" />
      <PageHero
        eyebrow="Products"
        title="The Oasis collection."
        description="From residential comfort to critical-care mobility — every system engineered with intent."
      />

      <section className="bg-bg-primary py-24">
        {loading || !products ? (
          <SectionLoader />
        ) : (
          <div className="container-oasis grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductListCard key={product.id} product={product} />
            ))}
          </div>
        )}
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
