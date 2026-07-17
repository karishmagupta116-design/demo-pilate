import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/ui-bits";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — Xenwix Pilates" }, { name: "description", content: "Terms for using Xenwix Pilates." }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Terms of Service</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl">Terms of Service</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      <div className="prose prose-sm mt-8 max-w-none space-y-5 text-foreground/85">
        <h2 className="font-serif text-2xl">Bookings & cancellations</h2>
        <p>Classes may be cancelled or rescheduled up to 4 hours before start time without charge. Late cancellations forfeit the credit.</p>
        <h2 className="font-serif text-2xl">Memberships</h2>
        <p>Monthly and annual memberships auto-renew unless cancelled. Members may pause up to 30 days per calendar year at no cost.</p>
        <h2 className="font-serif text-2xl">Health & liability</h2>
        <p>By booking, you confirm you are physically able to participate. Inform your instructor of any injuries, pregnancy, or conditions.</p>
        <h2 className="font-serif text-2xl">Studio conduct</h2>
        <p>Arrive on time, in clean grip socks, and follow instructor guidance. We reserve the right to refuse service in cases of disruptive behaviour.</p>
        <h2 className="font-serif text-2xl">Contact</h2>
        <p>Questions about these terms? Email hello@xenwixpilates.in.</p>
      </div>
    </div>
  ),
});
