import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon, ChevronDown, ChevronUp } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { useContactModal } from "@/lib/contact-modal-context";
import { premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 5000;

// A small, non-modal "Let's talk" card that self-shows on every visit —
// separate from <ContactModal>, which stays reserved for deliberate CTA
// clicks (navbar/hero/footer "Request Quote" etc.) and keeps its centered,
// scroll-locked, focus-trapped modal treatment. This card never blocks the
// page: no backdrop, no scroll lock.
export function ContactPopupCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { isOpen: mainModalOpen } = useContactModal();
  const location = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
    // Deliberately runs once per mount (this component lives above <Routes>
    // and never remounts on navigation) — not re-keyed off location, so
    // switching pages during the delay doesn't restart the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

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
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-full text-graphite transition-colors hover:bg-surface hover:text-navy"
              >
                <XIcon className="size-4" />
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
