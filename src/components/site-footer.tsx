import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[oklch(0.94_0.02_82)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div>
          <div className="font-serif text-xl tracking-[0.2em]">XENWIX</div>
          <p className="mt-3 text-sm text-muted-foreground">
            A boutique Pilates studio in Bengaluru. Reformer, mat and private sessions in a calm,
            considered space.
          </p>
          <div className="mt-5 flex gap-3 text-taupe">
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-gold"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-gold"><Facebook className="h-4 w-4" /></a>
            <a href="https://youtube.com" aria-label="Youtube" className="hover:text-gold"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="eyebrow mb-3">Studio</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/classes" className="hover:text-gold">Classes & Schedule</Link></li>
            <li><Link to="/membership" className="hover:text-gold">Membership</Link></li>
            <li><Link to="/instructors" className="hover:text-gold">Instructors</Link></li>
            <li><Link to="/wellness" className="hover:text-gold">AI Wellness</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/testimonials" className="hover:text-gold">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold">Studio Owner View — Demo</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Visit</div>
          <p className="text-sm text-muted-foreground">
            2nd Floor, Indiranagar 100ft Road<br />
            Bengaluru 560038<br />
            Mon–Sat · 6am – 9pm<br />
            Sun · 7am – 12pm
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:px-6 md:flex-row">
          <div>© {new Date().getFullYear()} Xenwix Pilates. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
