import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LogIn, CalendarCheck2, CreditCard, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";
import { useDemoStore } from "@/lib/demo-store";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Member Portal — Xenwix Pilates" },
      { name: "description", content: "Your Xenwix member dashboard — bookings, membership status and wellness snapshot." },
    ],
  }),
  component: Portal,
});

function Portal() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("member@xenwix.in");
  const bookings = useDemoStore((s) => s.bookings);
  const plan = useDemoStore((s) => s.memberPlan);
  const wellness = useDemoStore((s) => s.wellness);

  if (!signedIn) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6 py-14">
        <div className="w-full soft-card p-8">
          <Eyebrow>Member portal</Eyebrow>
          <h1 className="mt-3 font-serif text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Demo login — any credentials work.</p>
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => { e.preventDefault(); setSignedIn(true); toast.success("Welcome back"); }}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input type="password" defaultValue="•••••••••" placeholder="Password" />
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal py-3 text-sm text-white hover:bg-gold">
              <LogIn className="h-4 w-4" /> Sign in
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            New here? <Link to="/membership" className="text-gold hover:underline">See plans</Link>
          </div>
        </div>
      </div>
    );
  }

  const upcoming = bookings.filter((b) => b.status !== "cancelled");
  const renewalDate = new Date();
  renewalDate.setDate(renewalDate.getDate() + 22);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Member portal</Eyebrow>
          <h1 className="mt-2 font-serif text-3xl">Welcome back</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
        <button onClick={() => setSignedIn(false)} className="rounded-full border border-border px-4 py-1.5 text-xs hover:border-gold hover:text-gold">Sign out</button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card icon={CreditCard} label="Membership" value={plan ?? "Drop-In"} sub={`Renews ${renewalDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`} />
        <Card icon={CalendarCheck2} label="Upcoming classes" value={String(upcoming.length)} sub="Booked this session" />
        <Card icon={Sparkles} label="Wellness focus" value={wellness?.goal ?? "Not set"} sub={wellness ? `${wellness.calories} kcal · ${wellness.protein}g protein` : "Take the quiz"} />
      </div>

      <section className="mt-14">
        <SectionHeading eyebrow="Your bookings" title="Upcoming" />
        <div className="mt-6 soft-card overflow-hidden">
          {upcoming.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              Nothing booked yet — <Link to="/classes" className="text-gold hover:underline">browse the schedule</Link>.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <div className="font-medium">{b.className}</div>
                    <div className="text-xs text-muted-foreground">{b.day} · {b.time} · {b.date} · with {b.instructor}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={"rounded-full px-2.5 py-1 text-xs " + (b.status === "confirmed" ? "bg-gold/15 text-gold" : "bg-rose/25 text-charcoal")}>{b.status}</span>
                    <Link to="/classes" className="rounded-full border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold">Rebook similar</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {wellness && (
        <section className="mt-14 soft-card p-6">
          <Eyebrow>This week's habit</Eyebrow>
          <p className="mt-2 text-foreground/90">{wellness.tip}</p>
        </section>
      )}
    </div>
  );
}

function Card({ icon: Icon, label, value, sub }: { icon: typeof CreditCard; label: string; value: string; sub: string }) {
  return (
    <div className="soft-card p-6">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-gold" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-taupe">{label}</span>
      </div>
      <div className="mt-4 font-serif text-2xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
