import { createFileRoute, useSearch, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CalendarPlus, Check, X as XIcon } from "lucide-react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CLASSES, DAYS, INSTRUCTORS, type ClassSlot } from "@/lib/demo-data";
import { store, useDemoStore } from "@/lib/demo-store";
import { SectionHeading, Eyebrow } from "@/components/ui-bits";

const searchSchema = z.object({ instructor: z.string().optional() });

export const Route = createFileRoute("/classes")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Classes & Schedule — Xenwix Pilates" },
      { name: "description", content: "Book reformer, mat and private Pilates classes. Real-time availability, easy reschedule and calendar sync." },
      { property: "og:title", content: "Classes & Schedule — Xenwix Pilates" },
      { property: "og:description", content: "Weekly reformer and mat schedule with live availability." },
    ],
  }),
  component: ClassesPage,
});

function ClassesPage() {
  const { instructor } = useSearch({ from: "/classes" });
  const [day, setDay] = useState<typeof DAYS[number]>("Mon");
  const [selected, setSelected] = useState<ClassSlot | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const bookings = useDemoStore((s) => s.bookings);

  const filtered = useMemo(() => {
    return CLASSES.filter((c) => c.day === day && (!instructor || c.instructor === instructor));
  }, [day, instructor]);

  const openBooking = (c: ClassSlot) => {
    setSelected(c);
    setConfirmed(null);
  };

  const confirmBooking = () => {
    if (!selected) return;
    const id = store.addBooking({
      className: selected.name,
      instructor: selected.instructor,
      day: selected.day,
      time: selected.time,
      date: nextDateForDay(selected.day),
      status: selected.booked >= selected.capacity ? "waitlist" : "confirmed",
    });
    setConfirmed(id);
    toast.success(selected.booked >= selected.capacity ? "Added to waitlist" : "Booking confirmed", {
      description: `${selected.name} · ${selected.day} ${selected.time}`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Weekly schedule" title="Book a class" sub="Reformer, mat and private sessions. Availability updates the moment someone books." />
        {instructor && (
          <Link to="/classes" search={{}} className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-taupe hover:border-gold hover:text-gold">
            Clear filter: {instructor} ×
          </Link>
        )}
      </div>

      <Tabs value={day} onValueChange={(v) => setDay(v as typeof DAYS[number])} className="mt-10">
        <TabsList className="flex flex-wrap gap-1 bg-transparent p-0">
          {DAYS.map((d) => (
            <TabsTrigger
              key={d}
              value={d}
              className="rounded-full border border-border bg-white px-5 py-2 text-sm text-taupe data-[state=active]:border-gold data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              {d}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={day} className="mt-8">
          {filtered.length === 0 ? (
            <div className="soft-card p-10 text-center text-muted-foreground">No classes matching this filter.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => {
                const full = c.booked >= c.capacity;
                return (
                  <div key={c.id} className="soft-card p-5">
                    <div className="flex items-center justify-between">
                      <Eyebrow>{c.time}</Eyebrow>
                      <span className={"text-xs " + (full ? "text-rose" : "text-taupe")}>
                        {full ? "Full · waitlist" : `${c.capacity - c.booked} spots`}
                      </span>
                    </div>
                    <div className="mt-2 font-serif text-2xl">{c.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">with {c.instructor}</div>
                    <button
                      onClick={() => openBooking(c)}
                      className={
                        "mt-5 w-full rounded-full py-2.5 text-sm transition-colors " +
                        (full ? "border border-rose text-rose hover:bg-rose hover:text-white" : "bg-charcoal text-white hover:bg-gold")
                      }
                    >
                      {full ? "Join waitlist" : "Book class"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* MY BOOKINGS */}
      <section className="mt-20">
        <SectionHeading eyebrow="My bookings" title="This session's bookings" sub="Demo view — bookings live for this browsing session." />
        <div className="mt-8 soft-card overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">No bookings yet — book a class above.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.15em] text-taupe">
                <tr>
                  <th className="p-4">Class</th>
                  <th className="p-4">When</th>
                  <th className="p-4">Ref</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-border">
                    <td className="p-4">
                      <div className="font-medium">{b.className}</div>
                      <div className="text-xs text-muted-foreground">with {b.instructor}</div>
                    </td>
                    <td className="p-4">{b.day} · {b.time}<div className="text-xs text-muted-foreground">{b.date}</div></td>
                    <td className="p-4 font-mono text-xs">{b.id}</td>
                    <td className="p-4">
                      <span className={
                        "rounded-full px-2.5 py-1 text-xs " +
                        (b.status === "confirmed" ? "bg-gold/15 text-gold" : b.status === "waitlist" ? "bg-rose/25 text-charcoal" : "bg-muted text-muted-foreground")
                      }>{b.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      {b.status !== "cancelled" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => { store.cancelBooking(b.id); toast("Booking cancelled"); }}
                            className="rounded-full border border-border px-3 py-1 text-xs hover:border-rose hover:text-rose"
                          >Cancel</button>
                          <button
                            onClick={() => { toast.success("Reschedule email sent (demo)"); }}
                            className="rounded-full border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold"
                          >Reschedule</button>
                        </div>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* INSTRUCTOR FILTERS */}
      <section className="mt-16">
        <Eyebrow>Filter by instructor</Eyebrow>
        <div className="mt-3 flex flex-wrap gap-2">
          {INSTRUCTORS.map((i) => (
            <Link key={i.slug} to="/classes" search={{ instructor: i.name }} className="rounded-full border border-border bg-white px-4 py-1.5 text-xs hover:border-gold hover:text-gold">
              {i.name}
            </Link>
          ))}
        </div>
      </section>

      {/* BOOKING MODAL */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {confirmed ? "Booking confirmed" : selected?.name}
            </DialogTitle>
          </DialogHeader>
          {selected && !confirmed && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/50 p-4 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Instructor</span><span>{selected.instructor}</span></div>
                <div className="mt-2 flex justify-between"><span className="text-muted-foreground">When</span><span>{selected.day} · {selected.time}</span></div>
                <div className="mt-2 flex justify-between"><span className="text-muted-foreground">Date</span><span>{nextDateForDay(selected.day)}</span></div>
                <div className="mt-2 flex justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span>{selected.booked >= selected.capacity ? "Full · joining waitlist" : `${selected.capacity - selected.booked} spots left`}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">By confirming you agree to our 4-hour cancellation policy.</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSelected(null)}>Not now</Button>
                <Button onClick={confirmBooking} className="bg-charcoal text-white hover:bg-gold">
                  {selected.booked >= selected.capacity ? "Join waitlist" : "Confirm booking"}
                </Button>
              </DialogFooter>
            </div>
          )}
          {confirmed && selected && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Check className="h-7 w-7" />
              </div>
              <div className="text-sm text-muted-foreground">
                Reference<br />
                <span className="font-mono text-base text-foreground">{confirmed}</span>
              </div>
              <div className="text-sm">{selected.name} · {selected.day} {selected.time}</div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => toast.success("Added to Google Calendar (demo)")}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs hover:border-gold hover:text-gold"
                >
                  <CalendarPlus className="h-4 w-4" /> Add to Google Calendar
                </button>
                <button onClick={() => setSelected(null)} className="rounded-full bg-charcoal px-4 py-2 text-xs text-white hover:bg-gold">Done</button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function nextDateForDay(day: string): string {
  const target = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day);
  const today = new Date();
  const diff = (target - today.getDay() + 7) % 7 || 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

// silence unused import warning if any
void XIcon;
