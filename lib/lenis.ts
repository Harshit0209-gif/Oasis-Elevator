import Lenis from "lenis";

// Tuned for a slower, more cinematic feel than Lenis defaults.
export function createLenis() {
  return new Lenis({
    lerp: 0.1,
    duration: 1.2,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    syncTouch: false,
  });
}
