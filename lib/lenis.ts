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
  });
  return activeLenis;
}

export function destroyLenis(lenis: Lenis) {
  lenis.destroy();
  if (activeLenis === lenis) activeLenis = null;
}

// Lets a nested scroll-snap deck (e.g. WhyOasisMobileScroller) hand a fast
// "get me out of here" swipe off to the page's own smooth scroll, instead of
// forcing the user to step through every remaining card.
export function getActiveLenis() {
  return activeLenis;
}
