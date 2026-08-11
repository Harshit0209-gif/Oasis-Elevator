import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useContactModal } from "@/lib/contact-modal-context";

interface CtaBandProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  /** Real navigation instead of the contact modal — omit for the default
   * (and much more common) lead-gen behavior. */
  primaryHref?: string;
}

export function CtaBand({ title, description, primaryLabel = "Request Quote", primaryHref }: CtaBandProps) {
  const { open: openContactModal } = useContactModal();

  return (
    <section className="border-t border-hairline bg-surface py-24">
      <RevealOnScroll className="container-oasis flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance font-heading text-3xl font-medium md:text-4xl">{title}</h2>
        {description && <p className="max-w-lg text-balance text-graphite">{description}</p>}
        {primaryHref ? (
          <Button size="xl" asChild>
            <Link to={primaryHref}>{primaryLabel}</Link>
          </Button>
        ) : (
          <Button size="xl" onClick={openContactModal}>
            {primaryLabel}
          </Button>
        )}
      </RevealOnScroll>
    </section>
  );
}
