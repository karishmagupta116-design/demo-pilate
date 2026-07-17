import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check, CreditCard, Smartphone, BellRing } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { store } from "@/lib/demo-store";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership & Pricing — Xenwix Pilates" },
      { name: "description", content: "Drop-in, monthly and annual VIP plans for reformer and mat Pilates. Secure Razorpay checkout." },
      { property: "og:title", content: "Membership & Pricing — Xenwix Pilates" },
      { property: "og:description", content: "Simple, transparent pricing for reformer and mat Pilates." },
    ],
  }),
  component: Membership,
});

const PLANS = [
  {
    name: "Drop-In",
    price: 1200,
    period: "per class",
    features: ["Any single class", "Book 7 days ahead", "Reformer or mat", "No commitment"],
    cta: "Book a single class",
    highlight: false,
  },
  {
    name: "Monthly Unlimited",
    price: 12500,
    period: "per month",
    features: ["Unlimited reformer + mat", "Priority booking window", "One guest pass / month", "Free 1:1 intro session"],
    cta: "Start monthly",
    highlight: true,
  },
  {
    name: "Annual VIP",
    price: 118000,
    period: "per year",
    features: ["Everything in Monthly", "2 private sessions / month", "AI wellness deep-plan", "Guest passes: 12 / year"],
    cta: "Go VIP",
    highlight: false,
  },
];

function Membership() {
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS[number] | null>(null);
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const pay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const ref = "RZP-" + Math.random().toString(36).slice(2, 10).toUpperCase();
      setSuccess(ref);
      if (checkoutPlan) store.setMemberPlan(checkoutPlan.name);
      toast.success("Payment successful", { description: checkoutPlan?.name });
    }, 1400);
  };

  const close = () => { setCheckoutPlan(null); setSuccess(null); };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Membership</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Simple pricing, built for consistency</h1>
        <p className="mt-4 text-muted-foreground">Three ways to practise with us. No lock-ins. Cancel or upgrade anytime.</p>
      </div>

      {/* Renewal banner */}
      <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4">
        <BellRing className="mt-0.5 h-5 w-5 text-gold" />
        <div className="text-sm">
          <span className="font-medium">Renewal reminders:</span>{" "}
          <span className="text-muted-foreground">Members get a WhatsApp + email nudge 5 days before their plan ends, so nothing lapses by accident.</span>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={
              "relative flex flex-col rounded-3xl border p-8 " +
              (p.highlight ? "border-gold bg-white shadow-[0_20px_60px_-30px_oklch(0.68_0.12_82_/_0.5)]" : "border-border bg-white")
            }
          >
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                Most popular
              </div>
            )}
            <div className="eyebrow">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-serif text-4xl">₹{p.price.toLocaleString("en-IN")}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { setCheckoutPlan(p); setSuccess(null); }}
              className={
                "mt-8 w-full rounded-full py-3 text-sm transition-colors " +
                (p.highlight ? "bg-gold text-white hover:bg-gold-soft" : "bg-charcoal text-white hover:bg-gold")
              }
            >{p.cta}</button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-3xl">
        <SectionHeading center eyebrow="Billing FAQ" title="Common questions" />
        <Accordion type="single" collapsible className="mt-8">
          {[
            { q: "Can I pause my membership?", a: "Yes — up to 30 days per year, no fee. Just message us on WhatsApp." },
            { q: "Do unused classes roll over?", a: "Drop-in credits are valid 60 days. Monthly plans reset each cycle." },
            { q: "What payment methods do you accept?", a: "UPI, all major cards, net banking and EMI via Razorpay." },
            { q: "Is there a joining fee?", a: "No. What you see on this page is what you pay." },
          ].map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CHECKOUT MODAL — Razorpay-style */}
      <Dialog open={!!checkoutPlan} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-w-md p-0">
          {!success ? (
            <div>
              <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-taupe">Xenwix Pilates</div>
                  <div className="mt-1 font-serif text-lg">₹{checkoutPlan?.price.toLocaleString("en-IN")}</div>
                </div>
                <div className="text-xs text-muted-foreground">Secure by Razorpay</div>
              </div>
              <DialogHeader className="p-5 pb-0">
                <DialogTitle className="text-sm font-medium text-muted-foreground">Choose payment method</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-2 p-5 pb-0">
                <button
                  onClick={() => setMethod("upi")}
                  className={"flex items-center gap-2 rounded-xl border p-3 text-sm " + (method === "upi" ? "border-gold bg-gold/10" : "border-border")}
                >
                  <Smartphone className="h-4 w-4 text-gold" /> UPI
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={"flex items-center gap-2 rounded-xl border p-3 text-sm " + (method === "card" ? "border-gold bg-gold/10" : "border-border")}
                >
                  <CreditCard className="h-4 w-4 text-gold" /> Card
                </button>
              </div>
              <div className="space-y-3 p-5">
                {method === "upi" ? (
                  <>
                    <Input placeholder="yourname@upi" defaultValue="pilates@ybl" />
                    <p className="text-xs text-muted-foreground">A payment request will be sent to your UPI app.</p>
                  </>
                ) : (
                  <>
                    <Input placeholder="Card number" defaultValue="4111 1111 1111 1111" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM/YY" defaultValue="12/28" />
                      <Input placeholder="CVV" defaultValue="123" />
                    </div>
                  </>
                )}
                <button
                  onClick={pay}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-charcoal py-3 text-sm text-white transition-colors hover:bg-gold disabled:opacity-60"
                >
                  {loading ? "Processing…" : `Pay ₹${checkoutPlan?.price.toLocaleString("en-IN")}`}
                </button>
                <p className="text-center text-[10px] uppercase tracking-[0.15em] text-taupe">Demo checkout — no real charge</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-8 w-8" />
              </div>
              <div className="font-serif text-2xl">Payment successful</div>
              <div className="text-sm text-muted-foreground">Welcome to <span className="text-foreground">{checkoutPlan?.name}</span>.</div>
              <div className="rounded-xl bg-muted/50 p-3 text-xs">
                <div className="font-mono">{success}</div>
              </div>
              <button onClick={close} className="w-full rounded-full bg-charcoal py-3 text-sm text-white hover:bg-gold">Done</button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
