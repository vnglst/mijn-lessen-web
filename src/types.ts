import { mutate } from "swr";

export type Option = {
  id: string;
  title: string;
  correct: boolean;
};

export type Question = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  subtitle: string | null;
  explanation?: string | null;
  points: number;
  lessonId: string;
  draft: boolean;
  options: Option[];
  repetitions?: Repetition[];
};

export type Lesson = {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorId: string;
  slug: string;
  title: string;
  subtitle: string | null;
  intro: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  shuffle: boolean | null;
  viewCount: number;
  likeCount: number;
  points: number;
  draft: boolean;
  questions: Question[];
  author: User;
  categories: Category[];
  status?: Status;
};

export type Status = "INITIAL" | "STARTED" | "COMPLETED";

export type LessonsSWR = { data?: Lesson[] };
export type LessonSWR = { data?: Lesson; mutate: typeof mutate };

export type Category = {
  title: string;
  slug: string;
  id: string;
};

export type Role = "STUDENT" | "EDITOR" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  role: Role;
  lessonsCreated: Lesson[];
  repetitions: Repetition[];
  activities: Activity[];
};

export type UserSWR = {
  data?: User;
  mutate: typeof mutate;
  error?: { message: string };
};

export type ActivityTypes =
  | "LESSON_COMPLETE"
  | "LOGIN"
  | "STREAK"
  | "DAILY_REPS";

export type Activity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pointsEarned: number;
  type: ActivityTypes;
  userId: string;
};

export type Repetition = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  questionId: string;
  userId: string;
  previous: number | null;
  next: number | null;
  progress: number;
  question: Question;
};

export type RepSWR = { data?: Repetition[] };

export type Stats = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  liked: boolean;
  viewed: boolean;
  userId: string;
  lessonId: string;
};

export type StatsSWR = { data?: Stats[] };
