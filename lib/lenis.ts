import Lenis from "lenis";

let activeLenis: Lenis | null = null;

// Tuned for a slower, more cinematic feel than Lenis defaults.
export function createLenis() {
  activeLenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    syncTouch: false,
    // Lenis's default resize target is document.documentElement, but <html>'s
    // own layout box is pinned to the viewport — its ResizeObserver never
    // fires when child content (e.g. CMS sections that finish an async fetch
    // after mount) grows the page's actual scrollHeight. That leaves Lenis's
    // scroll limit stuck at whatever height the page happened to be at
    // mount time, capping wheel-driven scroll partway down the page even
    // though the document is genuinely taller. document.body's box does
    // grow with its content, so ResizeObserver reports it correctly.
    content: document.body,
  });
  return activeLenis;
}

export function destroyLenis(lenis: Lenis) {
  lenis.destroy();
  if (activeLenis === lenis) activeLenis = null;
}

// Lenis drives its own independent scroll loop — a plain window.scrollTo()
// gets silently overridden on the next animation frame by Lenis re-applying
// its own (stale) internal scroll position. Anything that needs to force
// the scroll position (e.g. resetting to top on route change) must go
// through Lenis itself when it's active.
export function getActiveLenis() {
  return activeLenis;
}
