import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * "plain" renders the mark as-is — correct for this site's light
   * backgrounds (its own navy/blue palette reads naturally there). "chip"
   * wraps it in a soft white backing, needed only on dark surfaces like the
   * Footer, since there's no true light-on-dark source asset yet (see
   * public/logo/README.md).
   */
  variant?: "chip" | "plain";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function Logo({ variant = "plain", className, imgClassName, priority }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Oasis Elevators — home"
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-lg transition-opacity hover:opacity-90",
        variant === "chip" && "bg-white/95 px-3 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <img
        src="/logo/oasis-logo.png"
        alt="Oasis Elevators — Building Up Vision, Leading Future"
        width={821}
        height={250}
        fetchPriority={priority ? "high" : undefined}
        className={cn("h-8 w-auto md:h-9", imgClassName)}
      />
    </Link>
  );
}
