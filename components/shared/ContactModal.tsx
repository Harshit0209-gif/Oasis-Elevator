import { Dialog } from "radix-ui";
import { XIcon, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { useContactModal } from "@/lib/contact-modal-context";
import { Logo } from "./Logo";
import { ContactForm } from "@/components/sections/contact/ContactForm";

const BRAND_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=900&auto=format&fit=crop";

// The one reusable contact modal for the whole site — every lead-gen CTA
// (navbar, hero, CtaBand, footer) opens this same instance via
// useContactModal().open() rather than each owning its own modal/form.
export function ContactModal() {
  const { isOpen, close, triggerRef } = useContactModal();
  // Only fetched once the modal actually mounts (Radix doesn't render
  // Portal/Content until first open), so this never costs anything for
  // visitors who never open it.
  const { data: settings } = useContent(getSiteSettings);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(next) => !next && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-navy/50 backdrop-blur-sm duration-300 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <Dialog.Content
          // The context's close() explicitly restores focus to whatever
          // triggered the modal (the trigger buttons live outside this
          // component's tree, so Radix's own implicit restore can't find
          // them reliably) — suppress Radix's default auto-focus here so
          // the two don't race.
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
            triggerRef.current = null;
          }}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-white pb-[env(safe-area-inset-bottom)] duration-300 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 data-closed:animate-out data-closed:fade-out-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[88vh] sm:w-[min(920px,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:flex-row sm:overflow-hidden sm:rounded-2xl sm:pb-0 sm:shadow-2xl sm:data-open:zoom-in-95 sm:data-open:slide-in-from-bottom-0"
        >
          <Dialog.Title className="sr-only">Let's Elevate Your Project</Dialog.Title>
          <Dialog.Description className="sr-only">
            Tell us about your elevator requirements and our team will get in touch with you.
          </Dialog.Description>

          {/* Mobile top bar — full-screen sheet, not a tiny centered popup */}
          <div className="flex shrink-0 items-center justify-between border-b border-hairline px-5 pt-[calc(env(safe-area-inset-top)+1rem)] pb-4 sm:hidden">
            <Logo />
            <Dialog.Close
              aria-label="Close"
              className="flex size-9 items-center justify-center rounded-full text-graphite transition-colors hover:bg-surface hover:text-navy"
            >
              <XIcon className="size-5" />
            </Dialog.Close>
          </div>

          {/* Left branding panel — desktop only */}
          <div
            className="relative hidden shrink-0 flex-col justify-between overflow-hidden bg-navy p-10 text-white sm:flex sm:w-[38%]"
            style={{ backgroundImage: `url(${BRAND_IMAGE})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
            <div className="relative">
              <Logo variant="chip" />
            </div>
            <div className="relative flex flex-col gap-4">
              <h2 className="font-heading text-3xl font-medium leading-tight">
                Let's Elevate Your Project
              </h2>
              <p className="text-white/70">
                Tell us about your elevator requirements and our team will get in touch with you.
              </p>
            </div>
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="relative flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Phone className="size-4 text-accent-orange" />
                Prefer to talk? {settings.phone}
              </a>
            )}
          </div>

          {/* Right: the actual form */}
          <div className="relative flex-1 overflow-y-auto p-6 sm:p-10">
            <Dialog.Close
              aria-label="Close"
              className="absolute right-5 top-5 hidden size-9 items-center justify-center rounded-full text-graphite transition-colors hover:bg-surface hover:text-navy sm:flex"
            >
              <XIcon className="size-5" />
            </Dialog.Close>

            <div className="mb-6 sm:hidden">
              <h2 className="font-heading text-2xl font-medium text-navy">Let's Elevate Your Project</h2>
              <p className="mt-2 text-sm text-graphite">
                Tell us about your elevator requirements and our team will get in touch with you.
              </p>
            </div>

            <ContactForm />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
