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

    // The first refresh() above runs before images/fonts have necessarily
    // finished loading — on a real network (unlike a cached localhost
    // reload) that can take long enough that pinned sections further down
    // the page (e.g. the Process shaft) get measured against a shorter,
    // not-yet-final document height, permanently skewing their trigger
    // start/end. Re-measure once everything that can shift layout has
    // actually settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", ticker);
      window.removeEventListener("load", refresh);
      destroyLenis(lenis);
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
