import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useContactModal } from "@/lib/contact-modal-context";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  title: string;
  description?: string;
  primaryLabel?: string;
  /** Real navigation instead of the contact modal — omit for the default
   * (and much more common) lead-gen behavior. */
  primaryHref?: string;
  /** Brand-blue background with an orange CTA button instead of the default
   * light surface — used sparingly as a strong closing color beat (currently
   * just the homepage's final band). Brand-blue rather than navy so it reads
   * as its own band instead of merging into the navy footer right below it. */
  dark?: boolean;
}

export function CtaBand({
  title,
  description,
  primaryLabel = "Request Quote",
  primaryHref,
  dark = false,
}: CtaBandProps) {
  const { open: openContactModal } = useContactModal();

  const buttonClassName = dark ? "bg-accent-orange text-white shadow-sm hover:bg-accent-orange/90" : undefined;

  return (
    <section className={cn("border-t py-24", dark ? "border-white/10 bg-brand-blue" : "border-hairline bg-surface")}>
      <RevealOnScroll className="container-oasis flex flex-col items-center gap-6 text-center">
        <h2
          className={cn(
            "text-balance font-heading text-3xl font-medium md:text-4xl",
            dark && "text-white",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("max-w-lg text-balance", dark ? "text-white/70" : "text-graphite")}>
            {description}
          </p>
        )}
        {primaryHref ? (
          <Button size="xl" asChild className={buttonClassName}>
            <Link to={primaryHref}>{primaryLabel}</Link>
          </Button>
        ) : (
          <Button size="xl" onClick={openContactModal} className={buttonClassName}>
            {primaryLabel}
          </Button>
        )}
      </RevealOnScroll>
    </section>
  );
}
