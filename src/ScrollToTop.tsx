import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getActiveLenis } from "@/lib/lenis";

// Client-side route changes don't reset scroll position the way a full page
// navigation would — restore that expectation for an SPA.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis (when active) owns the actual scroll position — window.scrollTo
    // alone gets overridden on the next frame by Lenis re-applying its own
    // stale internal offset, so the page silently snaps back to wherever it
    // was on the previous route. Reset Lenis itself, not just native scroll.
    const lenis = getActiveLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
