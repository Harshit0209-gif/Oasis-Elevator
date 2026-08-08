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
