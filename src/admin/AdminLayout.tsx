import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  Users2,
  Package,
  Wrench,
  Building2,
  MoveVertical,
  FolderKanban,
  MessageSquareQuote,
  BarChart3,
  BadgeCheck,
  HelpCircle,
  Handshake,
  Compass,
  ImageIcon,
  Search,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "./useAdminAuth";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero", icon: Sparkles },
  { to: "/admin/about", label: "About Oasis", icon: Compass },
  { to: "/admin/why-oasis", label: "Why Oasis", icon: BadgeCheck },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/process", label: "Our Process", icon: MoveVertical },
  { to: "/admin/industries", label: "Industries", icon: Building2 },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/clients", label: "Clients", icon: Handshake },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/statistics", label: "Statistics", icon: BarChart3 },
  { to: "/admin/certifications", label: "Certifications", icon: BadgeCheck },
  { to: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { to: "/admin/navigation", label: "Navigation", icon: Users2 },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/seo", label: "SEO", icon: Search },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {nav.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-blue text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function AdminLayout() {
  const { profile, signOut } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-secondary">
      {/* Desktop sidebar — hidden below lg, replaced by the Sheet drawer below */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-hairline bg-navy lg:flex">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
          <Logo variant="chip" />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <NavList />
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-hairline bg-white px-4 md:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs border-hairline bg-navy p-0">
              <SheetTitle className="sr-only">Admin navigation</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
                  <Logo variant="chip" />
                </div>
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                  <NavList onNavigate={() => setMobileOpen(false)} />
                </nav>
                <div className="border-t border-white/10 p-3">
                  <SheetClose asChild>
                    <button
                      type="button"
                      onClick={() => void signOut()}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <LogOut className="size-4 shrink-0" />
                      Logout
                    </button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="lg:hidden">
            <Logo />
          </div>

          <span className="ml-auto truncate text-sm text-graphite">{profile?.name}</span>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
