import { createFileRoute } from "@tanstack/react-router";
import studio from "@/assets/studio.jpg";
import { Eyebrow, GoldDivider } from "@/components/ui-bits";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Studio — Xenwix Pilates" },
      { name: "description", content: "The Xenwix studio story — a calm boutique space in Indiranagar for reformer and mat Pilates." },
      { property: "og:title", content: "About Xenwix Pilates" },
      { property: "og:description", content: "Our story, values, and the space we built." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">Built as a room we wanted to walk into.</h1>
          <p className="mt-6 text-muted-foreground">
            Xenwix started with a simple frustration — most Pilates studios in the city felt like
            gyms. We wanted something quieter: warm wood, natural light, small classes and
            instructors who genuinely watch every rep. Two years in, that's still the rule.
          </p>
          <GoldDivider className="my-8" />
          <div className="grid grid-cols-3 gap-6">
            <Stat n="87%" label="Class utilisation" />
            <Stat n="4.9" label="Member satisfaction" />
            <Stat n="94%" label="12-mo retention" />
          </div>
        </div>
        <div className="arch aspect-[4/5] w-full overflow-hidden bg-muted">
          <img src={studio} alt="Interior of the studio" loading="lazy" className="h-full w-full object-cover" width={1200} height={1400} />
        </div>
      </section>

      <section className="border-t border-border/60 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          {[
            { t: "Small by design", b: "Reformer classes cap at 8. Mat classes cap at 14. Never a crowd." },
            { t: "Certified teachers", b: "Every instructor holds a comprehensive Pilates certification and continues training annually." },
            { t: "Members first", b: "No lock-ins. No aggressive sales. Renewals are earned through your practice." },
          ].map((v) => (
            <div key={v.t}>
              <div className="eyebrow">Value</div>
              <h3 className="mt-2 font-serif text-2xl">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Eyebrow>Amenities</Eyebrow>
        <h3 className="mt-3 font-serif text-3xl">What you get on studio day</h3>
        <ul className="mt-6 grid gap-3 text-sm md:grid-cols-2 lg:grid-cols-3">
          {[
            "8 Balanced Body reformers",
            "Curated changing rooms with showers",
            "Complimentary props and grip socks",
            "Filtered water and herbal tea",
            "Secure covered parking",
            "In-studio wellness consults on request",
          ].map((a) => (
            <li key={a} className="rounded-2xl border border-border bg-white p-4">{a}</li>
          ))}
        </ul>
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
