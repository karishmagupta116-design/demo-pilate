import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/membership", label: "Membership" },
  { to: "/wellness", label: "AI Wellness" },
  { to: "/instructors", label: "Instructors" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-[0.2em] text-foreground sm:text-2xl">XENWIX</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-gold sm:inline">Pilates</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/portal"
            className="rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Member Login
          </Link>
        </nav>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/90 p-2 shadow-sm lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-foreground/80 transition-colors hover:bg-muted"
                activeProps={{ className: "text-gold font-medium bg-gold/10" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/portal" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-gold">
              Member Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
