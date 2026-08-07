import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

// Single registration point — safe to import/call from multiple client
// components without double-registering under fast refresh or re-mounts.
export function ensureGsapRegistered() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  // iOS Safari fires repeated native `resize` events as its address bar
  // hides/shows *during* a scroll gesture. ScrollTrigger's default
  // auto-refresh-on-resize reacts to every one of them, which can
  // recalculate (and visibly break) a pinned/scrubbed trigger mid-scroll —
  // Android/desktop don't have this dynamic-toolbar behavior, so it never
  // shows up there. This is GSAP's own documented fix for that iOS-only bug.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };
