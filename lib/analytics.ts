// Thin wrapper over whichever analytics script the site loads (GA4's gtag or
// Plausible) — a no-op until one is added to index.html, so callers never need
// to check.
type AnalyticsWindow = Window & {
  gtag?: (command: "event", name: string, params?: Record<string, unknown>) => void;
  plausible?: (name: string, options?: { props?: Record<string, unknown> }) => void;
};

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const w = window as AnalyticsWindow;
  w.gtag?.("event", name, params);
  w.plausible?.(name, { props: params });
}
