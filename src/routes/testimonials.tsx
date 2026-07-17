import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";
import { store, useDemoStore } from "@/lib/demo-store";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Reviews — Xenwix Pilates" },
      { name: "description", content: "Real reviews from Xenwix members. Leave your own after class." },
      { property: "og:title", content: "Reviews — Xenwix Pilates" },
      { property: "og:description", content: "What members say about the studio." },
    ],
  }),
  component: Reviews,
});

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60),
  rating: z.number().min(1).max(5),
  text: z.string().trim().min(10, "A little more detail helps others").max(500),
});

function Reviews() {
  const reviews = useDemoStore((s) => s.reviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({ name, rating, text });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    store.addReview(parsed.data);
    setName(""); setText(""); setRating(5);
    toast.success("Thank you — review posted");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="max-w-2xl">
        <Eyebrow>Reviews</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Grounded reviews from real members</h1>
        <p className="mt-4 text-muted-foreground">Every review is collected the day after class via a quick WhatsApp check-in.</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.id} className="soft-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={"h-4 w-4 " + (i < r.rating ? "fill-gold" : "opacity-25")} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.15em] text-taupe">— {r.name}</footer>
            </blockquote>
          ))}
        </div>

        <div className="space-y-8">
          <form onSubmit={submit} className="soft-card p-6">
            <SectionHeading eyebrow="Leave a review" title="How was your class?" />
            <div className="mt-6 space-y-4">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <div>
                <div className="mb-2 text-xs uppercase tracking-[0.15em] text-taupe">Rating</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                      <Star className={"h-6 w-6 " + (n <= rating ? "fill-gold text-gold" : "text-muted-foreground")} />
                    </button>
                  ))}
                </div>
              </div>
              <Textarea placeholder="What worked, what could improve…" rows={4} value={text} onChange={(e) => setText(e.target.value)} />
              <button type="submit" className="w-full rounded-full bg-charcoal py-3 text-sm text-white hover:bg-gold">Post review</button>
            </div>
          </form>

          <div className="soft-card p-6">
            <Eyebrow>Post-session survey</Eyebrow>
            <p className="mt-2 text-sm text-muted-foreground">A one-tap check-in we send after every class.</p>
            <div className="mt-4 rounded-2xl bg-muted/50 p-4 text-sm">
              <div className="font-medium">How was your class today?</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => toast.success("Thanks — glad it was good!")} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs hover:border-gold hover:text-gold">
                  <ThumbsUp className="h-4 w-4" /> Loved it
                </button>
                <button onClick={() => toast("Noted — an instructor will follow up.")} className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs hover:border-rose hover:text-rose">
                  <ThumbsDown className="h-4 w-4" /> Not great
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
