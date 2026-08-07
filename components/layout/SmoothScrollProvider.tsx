import { useEffect, type ReactNode } from "react";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    ensureGsapRegistered();
    const lenis = createLenis();

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const ticker = () => ScrollTrigger.update();
    ScrollTrigger.addEventListener("refresh", ticker);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", ticker);
      destroyLenis(lenis);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
