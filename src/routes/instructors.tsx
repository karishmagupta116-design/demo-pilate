import { createFileRoute, Link } from "@tanstack/react-router";
import i1 from "@/assets/instructor-1.jpg";
import i2 from "@/assets/instructor-2.jpg";
import i3 from "@/assets/instructor-3.jpg";
import { INSTRUCTORS } from "@/lib/demo-data";
import { Eyebrow } from "@/components/ui-bits";

const photos: Record<string, string> = {
  "meera-iyer": i1,
  "aditya-rao": i2,
  "kavya-nair": i3,
};

export const Route = createFileRoute("/instructors")({
  head: () => ({
    meta: [
      { title: "Instructors — Xenwix Pilates" },
      { name: "description", content: "Meet the reformer and mat instructors leading classes at Xenwix Pilates." },
      { property: "og:title", content: "Instructors — Xenwix Pilates" },
      { property: "og:description", content: "The teachers behind every reformer and mat class." },
    ],
  }),
  component: Instructors,
});

function Instructors() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-2xl">
        <Eyebrow>Instructors</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Teachers who watch every rep</h1>
        <p className="mt-4 text-muted-foreground">Small classes so nothing slips past. Certified, experienced, and endlessly patient.</p>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {INSTRUCTORS.map((i) => (
          <div key={i.slug} className="soft-card overflow-hidden">
            <div className="arch aspect-[4/5] w-full bg-muted">
              <img src={photos[i.slug]} alt={i.name} loading="lazy" className="h-full w-full object-cover" width={800} height={1000} />
            </div>
            <div className="p-6">
              <div className="eyebrow">{i.specialty}</div>
              <div className="mt-2 font-serif text-2xl">{i.name}</div>
              <p className="mt-3 text-sm text-muted-foreground">{i.bio}</p>
              <Link
                to="/classes"
                search={{ instructor: i.name }}
                className="mt-5 inline-flex rounded-full bg-charcoal px-5 py-2 text-xs text-white hover:bg-gold"
              >
                View schedule
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
