import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z.string().trim().min(7, "Please enter a valid phone").max(20),
  message: z.string().trim().min(5, "Add a short message").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Xenwix Pilates" },
      { name: "description", content: "Chat with us on WhatsApp, drop by the Indiranagar studio, or send a message." },
      { property: "og:title", content: "Contact Xenwix Pilates" },
      { property: "og:description", content: "Studio hours, address, WhatsApp and form." },
    ],
  }),
  component: Contact,
});

const WHATSAPP_NUMBER = "918048220000"; // demo number
const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Xenwix, I'd like to book a first-timer session.")}`;

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSent(true);
    toast.success("Message sent — we'll reply within a few hours");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Come in, or say hello first</h1>
          <p className="mt-4 text-muted-foreground">The fastest way to reach us is WhatsApp — our team replies within minutes during studio hours.</p>

          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#25D366]/25 hover:brightness-105"
          >
            <MessageCircle className="h-4 w-4" /> Chat with us on WhatsApp
          </a>

          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <div>
                <div className="font-medium">Xenwix Pilates Studio</div>
                <div className="text-muted-foreground">2nd Floor, 100ft Road, Indiranagar<br />Bengaluru 560038</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-gold" />
              <div>+91 80 4822 0000</div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-gold" />
              <div>hello@xenwixpilates.in</div>
            </div>
          </div>

          <div className="mt-10 pill aspect-[16/10] w-full overflow-hidden border border-border">
            <iframe
              title="Studio map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.634%2C12.968%2C77.646%2C12.976&layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="soft-card p-8">
          {!sent ? (
            <form onSubmit={submit} className="space-y-4">
              <SectionHeading eyebrow="Send a message" title="We'll get back today" />
              <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Textarea placeholder="Tell us a bit about what you're looking for…" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button type="submit" className="w-full rounded-full bg-charcoal py-3 text-sm text-white hover:bg-gold">Send message</button>
              <p className="text-center text-[10px] uppercase tracking-[0.15em] text-taupe">Demo form — no message actually sent</p>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">Message received</h3>
              <p className="mt-2 text-sm text-muted-foreground">Thanks {form.name.split(" ")[0]} — we'll reply to {form.email} shortly.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }} className="mt-6 rounded-full border border-border px-5 py-2 text-sm hover:border-gold hover:text-gold">
                Send another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
