import { useSyncExternalStore } from "react";

export type Booking = {
  id: string;
  className: string;
  instructor: string;
  day: string;
  time: string;
  date: string;
  status: "confirmed" | "waitlist" | "cancelled";
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export type WellnessResult = {
  goal: string;
  calories: number;
  protein: number;
  waterL: number;
  tip: string;
  createdAt: string;
} | null;

type State = {
  bookings: Booking[];
  reviews: Review[];
  wellness: WellnessResult;
  memberPlan: string | null;
};

const initialReviews: Review[] = [
  { id: "r1", name: "Ananya S.", rating: 5, text: "The reformer classes changed my posture in a month. Instructors are meticulous.", date: "2 weeks ago" },
  { id: "r2", name: "Rohan M.", rating: 5, text: "Booking on WhatsApp is genuinely the easiest thing about my week. Studio feels calm.", date: "1 month ago" },
  { id: "r3", name: "Priya K.", rating: 4, text: "Beautiful space, thoughtful teachers. Wish there were more early morning slots.", date: "1 month ago" },
];

const state: State = {
  bookings: [],
  reviews: initialReviews,
  wellness: null,
  memberPlan: null,
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const store = {
  get: () => state,
  addBooking(b: Omit<Booking, "id" | "status"> & { status?: Booking["status"] }) {
    const id = "XW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    state.bookings = [{ id, status: b.status ?? "confirmed", ...b }, ...state.bookings];
    emit();
    return id;
  },
  cancelBooking(id: string) {
    state.bookings = state.bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b));
    emit();
  },
  addReview(r: Omit<Review, "id" | "date">) {
    state.reviews = [{ id: "r" + Date.now(), date: "just now", ...r }, ...state.reviews];
    emit();
  },
  setWellness(w: WellnessResult) {
    state.wellness = w;
    emit();
  },
  setMemberPlan(p: string) {
    state.memberPlan = p;
    emit();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function useDemoStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => selector(state),
    () => selector(state),
  );
}
