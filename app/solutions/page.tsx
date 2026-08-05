import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { GoldDivider } from "@/components/shared/GoldDivider";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description: "End-to-end vertical mobility solutions — installation, modernization, maintenance and design consultancy.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Vertical mobility, fully engineered."
        description="From first sketch to lifetime service — four ways we partner with architects, developers and facility teams."
      />

      <section className="bg-bg-primary py-24">
        <div className="container-oasis flex flex-col">
          {solutions.map((solution, index) => (
            <RevealOnScroll
              key={solution.id}
              delay={index * 0.06}
              className="grid grid-cols-1 gap-4 border-b border-hairline py-10 last:border-b-0 md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:py-14"
            >
              <span className="font-heading text-5xl font-medium text-gold/50 md:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-2xl font-medium text-foreground md:text-3xl">
                  {solution.title}
                </h2>
                <GoldDivider />
                <p className="max-w-lg text-graphite">{solution.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        description="Our team will help you identify the right solution for your building and timeline."
      />
    </>
  );
}
