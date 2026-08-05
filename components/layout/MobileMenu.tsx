"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline-light"
          size="icon-lg"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-hairline bg-bg-primary text-bg-light sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex h-full flex-col px-6 pt-8 pb-10">
          <Logo variant="chip" />

          <nav className="mt-12 flex flex-col gap-1">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.href}>
                <a
                  href={link.href}
                  className="border-b border-hairline py-4 font-heading text-2xl font-medium text-bg-light transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <SheetClose asChild>
              <Button variant="gold" size="xl" className="w-full" asChild>
                <a href="/contact">Request Quote</a>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
