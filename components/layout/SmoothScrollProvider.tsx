import { useEffect, useRef, type ReactNode } from "react";
import type Lenis from "lenis";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useContactModal } from "@/lib/contact-modal-context";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const { isOpen: contactModalOpen } = useContactModal();

  // Lenis drives its own JS scroll loop independent of native browser
  // scrolling, so the modal's `overflow: hidden` on <body> alone doesn't
  // stop it — wheel/touch input would keep smooth-scrolling the page
  // underneath an open dialog. Explicitly pause/resume it in step with the
  // contact modal (any other full-screen overlay that appears later should
  // do the same).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (contactModalOpen) lenis.stop();
    else lenis.start();
  }, [contactModalOpen]);

  useEffect(() => {
    if (reducedMotion) return;

    ensureGsapRegistered();
    const lenis = createLenis();
    lenisRef.current = lenis;
    if (contactModalOpen) lenis.stop();

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
      lenisRef.current = null;
    };
    // contactModalOpen deliberately excluded — only read once at creation
    // time here; the effect above keeps it in sync for the instance's
    // lifetime without tearing Lenis down and recreating it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return <>{children}</>;
}
