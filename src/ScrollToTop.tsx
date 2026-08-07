import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Client-side route changes don't reset scroll position the way a full page
// navigation would — restore that expectation for an SPA.
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
