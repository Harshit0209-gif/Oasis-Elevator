import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { useContactModal } from "@/lib/contact-modal-context";
import { premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 12000;
const SHOW_AFTER_SCROLL_PX = 600;
const MINIMIZED_DELAY_MS = 2000;
const SEEN_KEY = "oasis-contact-card-seen";

// Browser storage can throw (private windows, blocked site data) — the card
// then just behaves as a first visit every time.
function hasSeenCard() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markCardSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

// A small, non-modal "Let's talk" card — separate from <ContactModal>, which
// stays reserved for deliberate CTA clicks (navbar/hero/footer "Request
// Quote" etc.) and keeps its centered, scroll-locked, focus-trapped modal
// treatment. This card never blocks the page: no backdrop, no scroll lock.
//
// It expands on its own only once, on a visitor's first visit. From then on
// (and whenever they collapse it) it sits as a small minimized bar that
// they open themselves, so it never pops up at them again.
export function ContactPopupCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { isOpen: mainModalOpen } = useContactModal();
  const location = useLocation();

  useEffect(() => {
    // Returning visitor: show just the minimized bar, shortly after load.
    if (hasSeenCard()) {
      const timer = window.setTimeout(() => {
        setIsMinimized(true);
        setIsOpen(true);
      }, MINIMIZED_DELAY_MS);
      return () => window.clearTimeout(timer);
    }

    // First visit: expand once, after they've scrolled in or been here a
    // while so it doesn't compete with the hero.
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setIsOpen(true);
      markCardSeen();
    };
    const timer = window.setTimeout(show, SHOW_DELAY_MS);
    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL_PX) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    // Deliberately runs once per mount (this component lives above <Routes>
    // and never remounts on navigation).
  }, []);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMinimized(true);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isMinimized]);

  // The dedicated /contact page already leads with the full form — a
  // duplicate auto-popup there would just be redundant. Hide instead of
  // never-scheduling so it can still appear later if they navigate away.
  const visible = isOpen && !mainModalOpen && location.pathname !== "/contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          role="dialog"
          aria-label="Request a consultation"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className={cn(
            "fixed inset-x-4 bottom-4 z-[90] overflow-hidden rounded-2xl border border-hairline bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]",
            !isMinimized && "max-h-[calc(100svh-2rem)] overflow-y-auto",
          )}
        >
          <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
            <button
              type="button"
              onClick={() => setIsMinimized((prev) => !prev)}
              aria-expanded={!isMinimized}
              className="flex-1 text-left"
            >
              <h2 className="font-heading text-lg font-medium text-navy">
                Let&apos;s Elevate Your Project
              </h2>
              {!isMinimized && (
                <p className="mt-1 text-sm text-graphite">Get a free consultation from our team.</p>
              )}
            </button>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                aria-label={isMinimized ? "Expand" : "Minimize"}
                onClick={() => setIsMinimized((prev) => !prev)}
                className="flex size-8 items-center justify-center rounded-full text-graphite transition-colors hover:bg-surface hover:text-navy"
              >
                {isMinimized ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>
            </div>
          </div>
          {!isMinimized && (
            <div className="border-t border-hairline p-6">
              <ContactForm compact />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
