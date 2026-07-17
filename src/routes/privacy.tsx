import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/ui-bits";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Xenwix Pilates" }, { name: "description", content: "How Xenwix handles your data." }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Privacy Policy</Eyebrow>
      <h1 className="mt-3 font-serif text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      <div className="prose prose-sm mt-8 max-w-none space-y-5 text-foreground/85">
        <p>Xenwix Pilates ("we", "us") respects your privacy. This policy explains what data we collect when you use our booking platform, membership services and website.</p>
        <h2 className="font-serif text-2xl">What we collect</h2>
        <p>Name, contact details, class booking history, membership and payment metadata (payments are processed by Razorpay — we do not store card numbers), and optional wellness quiz responses.</p>
        <h2 className="font-serif text-2xl">How we use it</h2>
        <p>To confirm bookings, manage membership, personalise your wellness snapshot, send renewal reminders, and improve the studio experience.</p>
        <h2 className="font-serif text-2xl">Sharing</h2>
        <p>We never sell your data. We share only with payment (Razorpay) and messaging (WhatsApp Business API) providers strictly to deliver our services.</p>
        <h2 className="font-serif text-2xl">Your rights</h2>
        <p>Email hello@xenwixpilates.in to access, correct or delete your data at any time.</p>
      </div>
    </div>
  ),
});
