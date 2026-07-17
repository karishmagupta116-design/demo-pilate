import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, Calendar, TrendingUp, IndianRupee, AlertTriangle, MessageCircle } from "lucide-react";
import { Eyebrow, SectionHeading } from "@/components/ui-bits";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Studio Owner Dashboard — Xenwix" },
      { name: "description", content: "Business performance dashboard — bookings, revenue, retention and churn-risk at a glance." },
    ],
  }),
  component: Dashboard,
});

const bookingsData = [
  { d: "Mon", v: 42 }, { d: "Tue", v: 38 }, { d: "Wed", v: 51 }, { d: "Thu", v: 46 }, { d: "Fri", v: 55 }, { d: "Sat", v: 68 }, { d: "Sun", v: 29 },
];

const membershipGrowth = [
  { m: "Jan", members: 42 }, { m: "Feb", members: 51 }, { m: "Mar", members: 62 }, { m: "Apr", members: 71 },
  { m: "May", members: 84 }, { m: "Jun", members: 96 }, { m: "Jul", members: 108 }, { m: "Aug", members: 121 },
];

const churnRisk = [
  { name: "Ananya S.", last: "17 days ago", reason: "Missed 3 booked classes" },
  { name: "Karan V.", last: "21 days ago", reason: "Membership expiring in 5 days" },
  { name: "Divya R.", last: "14 days ago", reason: "No wellness check-in" },
];

const inquiries = [
  { name: "Meghna P.", channel: "WhatsApp", note: "Wants a first-timer reformer session", when: "12 min ago" },
  { name: "Arun D.", channel: "Website form", note: "Corporate 10-person plan enquiry", when: "1 hr ago" },
  { name: "Sana J.", channel: "WhatsApp", note: "Prenatal Pilates availability?", when: "3 hrs ago" },
  { name: "Rahul B.", channel: "Instagram DM", note: "Guest pass this weekend", when: "yesterday" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Studio Owner View · Demo</Eyebrow>
          <h1 className="mt-2 font-serif text-4xl">Business performance</h1>
          <p className="mt-2 text-sm text-muted-foreground">Everything you'd normally piece together across four tools — in one dashboard.</p>
        </div>
        <div className="rounded-full border border-border bg-white px-4 py-1.5 text-xs text-taupe">Last updated · just now</div>
      </div>

      {/* KPI cards */}
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <Kpi icon={MessageCircle} label="New inquiries · 7d" value="34" delta="+18%" />
        <Kpi icon={Calendar} label="Bookings · this week" value="329" delta="+9%" />
        <Kpi icon={Users} label="Active members" value="121" delta="+13" />
        <Kpi icon={IndianRupee} label="Revenue · MTD" value="₹8.4L" delta="+22%" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="soft-card p-6">
          <SectionHeading eyebrow="Bookings" title="This week's attendance" />
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 82)" />
                <XAxis dataKey="d" stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <YAxis stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.88 0.02 82)" }} />
                <Bar dataKey="v" fill="oklch(0.68 0.12 82)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="soft-card p-6">
          <SectionHeading eyebrow="Growth" title="Membership growth (8 mo)" />
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={membershipGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.02 82)" />
                <XAxis dataKey="m" stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <YAxis stroke="oklch(0.52 0.012 60)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.88 0.02 82)" }} />
                <Line type="monotone" dataKey="members" stroke="oklch(0.68 0.12 82)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Retention */}
        <div className="soft-card p-6">
          <Eyebrow>Retention</Eyebrow>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="font-serif text-4xl text-gold">94%</div>
            <div className="text-xs text-muted-foreground">12-month</div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { l: "1-month renewal", v: "98%" },
              { l: "3-month retention", v: "92%" },
              { l: "6-month retention", v: "88%" },
            ].map((r) => (
              <div key={r.l} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{r.l}</span>
                <span className="font-medium">{r.v}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-gold">
            <TrendingUp className="h-4 w-4" /> Up 6 pts vs last quarter
          </div>
        </div>

        {/* Churn risk */}
        <div className="soft-card p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose" />
            <Eyebrow>Churn risk · action needed</Eyebrow>
          </div>
          <h3 className="mt-2 font-serif text-2xl">3 members going quiet</h3>
          <ul className="mt-4 divide-y divide-border">
            {churnRisk.map((c) => (
              <li key={c.name} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">Last visit {c.last} · {c.reason}</div>
                </div>
                <button className="rounded-full border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold">
                  Send WhatsApp nudge
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Inquiries */}
      <div className="mt-10 soft-card p-6">
        <SectionHeading eyebrow="Inbox" title="New inquiries this week" />
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-[0.15em] text-taupe">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Channel</th>
                <th className="p-4">Note</th>
                <th className="p-4">When</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((i) => (
                <tr key={i.name} className="border-t border-border">
                  <td className="p-4 font-medium">{i.name}</td>
                  <td className="p-4"><span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs text-gold">{i.channel}</span></td>
                  <td className="p-4 text-muted-foreground">{i.note}</td>
                  <td className="p-4 text-xs text-muted-foreground">{i.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta }: { icon: typeof Users; label: string; value: string; delta: string }) {
  return (
    <div className="soft-card p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-gold" />
        <span className="text-[10px] uppercase tracking-[0.15em] text-taupe">{label}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <div className="font-serif text-3xl">{value}</div>
        <div className="text-xs text-gold">{delta}</div>
      </div>
    </div>
  );
}
