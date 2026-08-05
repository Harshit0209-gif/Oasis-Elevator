import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /**
   * "chip" wraps the mark in a soft light backing so its navy/blue palette
   * stays legible on the site's dark surfaces — there is no true light-on-dark
   * source asset yet (see public/logo/README.md). "plain" renders it as-is,
   * for light-background contexts.
   */
  variant?: "chip" | "plain";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function Logo({ variant = "chip", className, imgClassName, priority }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Oasis Elevators — home"
      className={cn(
        "inline-flex items-center rounded-lg transition-opacity hover:opacity-90",
        variant === "chip" && "bg-bg-light/95 px-3 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <Image
        src="/logo/oasis-logo.png"
        alt="Oasis Elevators — Possibilities Unlimited"
        width={821}
        height={250}
        priority={priority}
        className={cn("h-8 w-auto md:h-9", imgClassName)}
      />
    </Link>
  );
}
