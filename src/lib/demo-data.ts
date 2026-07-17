export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Day = (typeof DAYS)[number];

export type ClassSlot = {
  id: string;
  day: Day;
  time: string;
  name: string;
  instructor: string;
  capacity: number;
  booked: number;
};

export const CLASSES: ClassSlot[] = [
  { id: "c1", day: "Mon", time: "07:00", name: "Reformer Flow", instructor: "Meera Iyer", capacity: 8, booked: 6 },
  { id: "c2", day: "Mon", time: "09:30", name: "Mat Foundations", instructor: "Aditya Rao", capacity: 12, booked: 5 },
  { id: "c3", day: "Mon", time: "18:00", name: "Reformer Strength", instructor: "Meera Iyer", capacity: 8, booked: 8 },
  { id: "c4", day: "Tue", time: "06:30", name: "Sunrise Mat", instructor: "Kavya Nair", capacity: 12, booked: 9 },
  { id: "c5", day: "Tue", time: "17:00", name: "Private Reformer", instructor: "Aditya Rao", capacity: 2, booked: 1 },
  { id: "c6", day: "Wed", time: "07:00", name: "Reformer Flow", instructor: "Meera Iyer", capacity: 8, booked: 4 },
  { id: "c7", day: "Wed", time: "18:30", name: "Group Mat", instructor: "Kavya Nair", capacity: 14, booked: 11 },
  { id: "c8", day: "Thu", time: "07:00", name: "Reformer Core", instructor: "Meera Iyer", capacity: 8, booked: 8 },
  { id: "c9", day: "Thu", time: "19:00", name: "Wind-Down Mat", instructor: "Kavya Nair", capacity: 12, booked: 6 },
  { id: "c10", day: "Fri", time: "07:00", name: "Reformer Flow", instructor: "Aditya Rao", capacity: 8, booked: 7 },
  { id: "c11", day: "Fri", time: "17:30", name: "Reformer Strength", instructor: "Meera Iyer", capacity: 8, booked: 3 },
  { id: "c12", day: "Sat", time: "08:00", name: "Weekend Reformer", instructor: "Meera Iyer", capacity: 8, booked: 5 },
  { id: "c13", day: "Sat", time: "10:00", name: "Group Mat", instructor: "Kavya Nair", capacity: 14, booked: 12 },
  { id: "c14", day: "Sun", time: "08:30", name: "Slow Flow", instructor: "Aditya Rao", capacity: 12, booked: 4 },
];

export const INSTRUCTORS = [
  { slug: "meera-iyer", name: "Meera Iyer", specialty: "Reformer · Rehabilitation", bio: "Classically trained in Sydney with 10 years teaching reformer. Specialises in post-injury and pre/post-natal work." },
  { slug: "aditya-rao", name: "Aditya Rao", specialty: "Mat · Athletic Conditioning", bio: "Ex-sports physio. Runs the studio's strength-focused mat programme for athletes and desk-bound bodies alike." },
  { slug: "kavya-nair", name: "Kavya Nair", specialty: "Mat · Breath & Recovery", bio: "Yoga and Pilates hybrid teacher. Her wind-down and sunrise sessions are the studio's most rebooked classes." },
];
