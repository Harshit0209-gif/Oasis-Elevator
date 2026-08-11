import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";

interface ContactModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** The element that was focused when open() was called — read this
   * inside Dialog.Content's onCloseAutoFocus to restore focus at the
   * correct moment (Radix's focus trap is still active during any earlier
   * point in the close sequence, so restoring sooner gets silently
   * overridden). */
  triggerRef: MutableRefObject<HTMLElement | null>;
}

const ContactModalContext = createContext<ContactModalState | null>(null);

// Single source of truth for the contact modal's open state — any CTA
// anywhere in the tree calls useContactModal().open() rather than each
// holding its own modal instance/state.
export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close, triggerRef }), [isOpen, open, close]);

  return <ContactModalContext.Provider value={value}>{children}</ContactModalContext.Provider>;
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
