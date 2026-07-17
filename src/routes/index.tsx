import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck2, Smartphone, Sparkles, ShieldCheck, MapPin, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import classReformer from "@/assets/class-reformer.jpg";
import classMat from "@/assets/class-mat.jpg";
import studio from "@/assets/studio.jpg";
import { Eyebrow, GoldDivider, SectionHeading } from "@/components/ui-bits";
import { CLASSES } from "@/lib/demo-data";
import { store } from "@/lib/demo-store";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const previewClasses = CLASSES.slice(0, 4);
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-2 lg:gap-12 lg:pt-20">
        <div>
          <Eyebrow>Xenwix · Bengaluru</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            A quieter kind of<br />
            <span className="italic text-gold">strength.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground sm:text-lg">
            Reformer, mat and private Pilates in a calm, considered studio. Real-time schedule,
            simple memberships, and thoughtful wellness — all under one roof.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/classes" className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm text-white transition-colors hover:bg-gold">
              Book a class <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/membership" className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/20 bg-transparent px-6 py-3 text-sm text-charcoal hover:border-gold hover:text-gold">
              View membership plans
            </Link>
          </div>
          <div className="mt-10 flex flex-col gap-3 text-xs uppercase tracking-[0.2em] text-taupe sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> 4.9 · 210 reviews</div>
            <div>Indiranagar · Bengaluru</div>
          </div>
        </div>
        <div className="relative">
          <div className="arch aspect-[4/5] max-h-[620px] w-full bg-muted">
            <img src={hero} alt="Xenwix Pilates studio interior with reformer machines" className="h-full w-full object-cover" width={1600} height={1200} />
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-lg sm:hidden">
            <div className="eyebrow">Now booking</div>
            <div className="mt-1 font-serif text-lg">This week · 14 classes</div>
            <div className="text-xs text-muted-foreground">Reformer · Mat · Private</div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-white p-4 shadow-xl md:block">
            <div className="eyebrow">Now booking</div>
            <div className="mt-1 font-serif text-lg">This week · 14 classes</div>
            <div className="text-xs text-muted-foreground">Reformer · Mat · Private</div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-y border-border/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 sm:gap-6 sm:py-14 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarCheck2, title: "Real-time schedule", body: "See spots left, book instantly, add to your calendar." },
            { icon: Smartphone, title: "Mobile-first", body: "Book, reschedule and pay from your phone in under a minute." },
            { icon: ShieldCheck, title: "Secure payments", body: "Razorpay UPI, cards and net banking — all encrypted." },
            { icon: Sparkles, title: "AI wellness snapshot", body: "A personalised weekly plan based on your goals and recovery." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border/60 p-5">
              <f.icon className="h-5 w-5 text-gold" />
              <div className="mt-3 font-serif text-lg">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLASS PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
          <SectionHeading eyebrow="This week" title="Classes on the schedule" sub="Reformer, mat and private sessions across the week — spots update in real time." />
          <Link to="/classes" className="text-sm font-medium text-gold hover:underline">View full schedule →</Link>
        </div>
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {previewClasses.map((c, i) => (
            <div key={c.id} className="soft-card overflow-hidden">
              <div className="pill aspect-[4/3] w-full bg-muted">
                <img src={i % 2 === 0 ? classReformer : classMat} alt={c.name} loading="lazy" className="h-full w-full object-cover" width={1200} height={900} />
              </div>
              <div className="p-5">
                <div className="eyebrow">{c.day} · {c.time}</div>
                <div className="mt-2 font-serif text-xl">{c.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">with {c.instructor}</div>
                <div className="mt-4 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className={c.booked >= c.capacity ? "text-rose" : "text-taupe"}>
                    {c.booked >= c.capacity ? "Waitlist open" : `${c.capacity - c.booked} spots left`}
                  </span>
                  <Link
                    to="/classes"
                    onClick={() => {
                      if (c.booked < c.capacity) {
                        // preselect not needed; deep-link intent
                      }
                    }}
                    className="text-gold hover:underline"
                  >
                    Book →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / STUDIO */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12">
          <div className="arch order-2 aspect-[4/5] w-full overflow-hidden bg-muted lg:order-1">
            <img src={studio} alt="Xenwix studio floor" loading="lazy" className="h-full w-full object-cover" width={1200} height={1400} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="The studio" title="Boutique, by design." sub="Small classes. Careful teaching. A space that looks and feels the way movement should — warm, unhurried, precise." />
            <GoldDivider className="my-8" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
              <Stat n="94%" label="Member retention" />
              <Stat n="4.9" label="Google rating" />
              <Stat n="< 8" label="Avg. class size" />
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-gold hover:underline">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading center eyebrow="What members say" title="Grounded, quiet reviews from real members." />
        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          {store.get().reviews.slice(0, 3).map((r) => (
            <blockquote key={r.id} className="soft-card p-6">
              <div className="flex text-gold">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.15em] text-taupe">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/testimonials" className="text-sm text-gold hover:underline">Read all reviews →</Link>
        </div>
      </section>

      {/* LOCATION */}
      <section className="border-t border-border/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
          <div>
            <Eyebrow>Now serving</Eyebrow>
            <h3 className="mt-3 font-serif text-3xl">Indiranagar, Bengaluru</h3>
            <p className="mt-3 text-muted-foreground">
              Walk-in tours daily. Book a first-timer reformer session and we'll set aside 15 minutes
              with an instructor before your class.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-taupe">
              <MapPin className="h-4 w-4 text-gold" />
              2nd Floor, 100ft Road, Indiranagar, Bengaluru 560038
            </div>
            <Link to="/contact" className="mt-6 inline-flex w-full justify-center rounded-full bg-charcoal px-5 py-2.5 text-sm text-white hover:bg-gold sm:w-auto sm:justify-start">
              Get in touch
            </Link>
          </div>
          <div className="pill aspect-[16/9] w-full overflow-hidden border border-border">
            <iframe
              title="Studio location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.634%2C12.968%2C77.646%2C12.976&layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-gold">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.15em] text-taupe">{label}</div>
    </div>
  );
}
