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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-[0.2em] text-foreground">XENWIX</span>
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
          className="rounded-md p-2 lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-foreground/80"
                activeProps={{ className: "text-gold font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/portal" onClick={() => setOpen(false)} className="py-2 text-sm text-gold">
              Member Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
