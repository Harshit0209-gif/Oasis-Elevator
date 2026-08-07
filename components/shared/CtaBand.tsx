import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface CtaBandProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CtaBand({
  title,
  description,
  primaryLabel = "Request Quote",
  primaryHref = "/contact",
}: CtaBandProps) {
  return (
    <section className="border-t border-hairline bg-surface py-24">
      <RevealOnScroll className="container-oasis flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance font-heading text-3xl font-medium md:text-4xl">{title}</h2>
        {description && <p className="max-w-lg text-balance text-graphite">{description}</p>}
        <Button size="xl" asChild>
          <Link to={primaryHref}>{primaryLabel}</Link>
        </Button>
      </RevealOnScroll>
    </section>
  );
}
