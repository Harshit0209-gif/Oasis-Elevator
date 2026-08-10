import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { getNavigation } from "@/lib/content";
import { useContent } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

export function MobileMenu({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const { data: navLinks } = useContent(getNavigation);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={scrolled ? "outline" : "outline-light"}
          size="icon-lg"
          className={cn("lg:hidden", scrolled && "border")}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-hairline bg-white sm:max-w-sm">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex h-full flex-col px-6 pt-8 pb-10">
          <Logo />

          <nav className="mt-12 flex flex-col gap-1">
            {(navLinks ?? []).map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  to={link.href}
                  className="border-b border-hairline py-4 font-heading text-2xl font-medium text-navy transition-colors hover:text-brand-blue"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <SheetClose asChild>
              <Button size="xl" className="w-full" asChild>
                <Link to="/contact">Request Quote</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
