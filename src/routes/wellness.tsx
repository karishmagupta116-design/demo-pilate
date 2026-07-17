import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Droplet, Flame, HeartPulse } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";
import { store, useDemoStore } from "@/lib/demo-store";
import { toast } from "sonner";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "AI Wellness & Nutrition — Xenwix Pilates" },
      { name: "description", content: "A 60-second quiz builds a personalised weekly wellness plan — hydration, macros and habit triggers." },
      { property: "og:title", content: "AI Wellness & Nutrition — Xenwix Pilates" },
      { property: "og:description", content: "Your personalised wellness snapshot from the studio." },
    ],
  }),
  component: Wellness,
});

const questions = [
  { id: "goal", q: "What's your primary goal?", options: ["Build strength", "Improve mobility", "Manage stress", "Lose weight"] },
  { id: "activity", q: "How active are you already?", options: ["Sedentary", "Lightly active", "Moderate", "Highly active"] },
  { id: "diet", q: "Dietary preference?", options: ["Vegetarian", "Vegan", "Eggetarian", "Non-veg"] },
  { id: "hydration", q: "Water per day, roughly?", options: ["< 1L", "1–2L", "2–3L", "3L+"] },
  { id: "sleep", q: "Average nightly sleep?", options: ["< 6h", "6–7h", "7–8h", "8h+"] },
] as const;

function Wellness() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const wellness = useDemoStore((s) => s.wellness);

  const submit = (final: Record<string, string>) => {
    const goal = final.goal || "Improve mobility";
    const activity = final.activity || "Moderate";
    const base = { "Sedentary": 1700, "Lightly active": 1900, "Moderate": 2100, "Highly active": 2350 }[activity] ?? 2000;
    const cals = goal === "Lose weight" ? base - 300 : goal === "Build strength" ? base + 200 : base;
    const protein = goal === "Build strength" ? 1.6 : 1.2;
    const wm = { "< 1L": 3, "1–2L": 2.8, "2–3L": 2.8, "3L+": 3.2 }[final.hydration || "1–2L"] ?? 2.8;
    const tips: Record<string, string> = {
      "Build strength": "Add 2 reformer strength sessions and a protein-forward breakfast within 45 min of waking.",
      "Improve mobility": "Pair mat classes with a 5-minute breath practice before bed for four nights this week.",
      "Manage stress": "Book a wind-down mat class and cap caffeine at 2pm; aim for a 20-min walk after lunch.",
      "Lose weight": "Two reformer + one mat class this week; front-load carbs around workouts, not evenings.",
    };
    store.setWellness({
      goal,
      calories: Math.round(cals / 50) * 50,
      protein: Math.round(70 * protein),
      waterL: wm,
      tip: tips[goal],
      createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    });
    toast.success("Your wellness snapshot is ready");
  };

  const answer = (v: string) => {
    const key = questions[step].id;
    const next = { ...answers, [key]: v };
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else submit(next);
  };

  const restart = () => { setStep(0); setAnswers({}); store.setWellness(null); };

  const progressData = [
    { w: "W1", engagement: 42, recovery: 58 },
    { w: "W2", engagement: 55, recovery: 62 },
    { w: "W3", engagement: 61, recovery: 68 },
    { w: "W4", engagement: 68, recovery: 71 },
    { w: "W5", engagement: 74, recovery: 75 },
    { w: "W6", engagement: 82, recovery: 79 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>AI Wellness & Nutrition</Eyebrow>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">A weekly plan that meets you where you are</h1>
        <p className="mt-4 text-muted-foreground">Five short questions. One personalised snapshot. Updated as you practise.</p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* QUIZ */}
        <div className="soft-card p-8">
          {!wellness ? (
            <>
              <div className="flex items-center justify-between">
                <div className="eyebrow">Step {step + 1} of {questions.length}</div>
                <div className="text-xs text-muted-foreground">~60 seconds</div>
              </div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gold transition-all" style={{ width: `${((step) / questions.length) * 100}%` }} />
              </div>
              <h3 className="mt-8 font-serif text-2xl">{questions[step].q}</h3>
              <div className="mt-6 grid gap-3">
                {questions[step].options.map((o) => (
                  <button
                    key={o}
                    onClick={() => answer(o)}
                    className="rounded-xl border border-border bg-white px-4 py-3 text-left text-sm transition-colors hover:border-gold hover:bg-gold/5"
                  >
                    {o}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="mt-6 text-xs text-muted-foreground hover:text-gold">← Back</button>
              )}
            </>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-gold"><Sparkles className="h-4 w-4" /><span className="eyebrow !text-gold">Your snapshot</span></div>
              <h3 className="mt-3 font-serif text-2xl">Focus: {wellness.goal}</h3>
              <p className="mt-2 text-xs text-muted-foreground">Generated {wellness.createdAt} · AI-assisted, review with your instructor</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <MetricCard icon={Flame} label="Daily kcal" value={wellness.calories.toLocaleString()} />
                <MetricCard icon={HeartPulse} label="Protein" value={`${wellness.protein}g`} />
                <MetricCard icon={Droplet} label="Water" value={`${wellness.waterL}L`} />
              </div>
              <div className="mt-6 rounded-2xl bg-gold/10 p-4 text-sm">
                <div className="eyebrow">This week's habit</div>
                <p className="mt-2 text-foreground/90">{wellness.tip}</p>
              </div>
              <button onClick={restart} className="mt-6 text-xs text-muted-foreground hover:text-gold">Retake quiz</button>
            </div>
          )}
        </div>

        {/* CHART */}
        <div className="soft-card p-8">
          <Eyebrow>Track your progress</Eyebrow>
          <h3 className="mt-3 font-serif text-2xl">6-week engagement & recovery</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sample trend — updates as you attend classes and log check-ins.</p>
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid stroke="oklch(0.9 0.02 82)" strokeDasharray="3 3" />
                <XAxis dataKey="w" stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <YAxis stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.88 0.02 82)" }} />
                <Line type="monotone" dataKey="engagement" stroke="oklch(0.68 0.12 82)" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="recovery" stroke="oklch(0.78 0.06 20)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-5 text-xs text-taupe">
            <div className="flex items-center gap-2"><span className="h-2 w-4 rounded-full bg-gold" /> Engagement</div>
            <div className="flex items-center gap-2"><span className="h-2 w-4 rounded-full bg-rose" /> Recovery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 text-center">
      <Icon className="mx-auto h-4 w-4 text-gold" />
      <div className="mt-2 font-serif text-xl">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-taupe">{label}</div>
    </div>
  );
}
