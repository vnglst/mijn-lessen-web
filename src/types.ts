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
  subtitle: string;
  explanation?: string | null;
  points?: number;
  shuffle?: boolean;
  lessonId: string;
  options: Option[];
  draft?: boolean;
};

export type Lesson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  authorId: number;
  title: string;
  subtitle: string | null;
  intro: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  shuffle: boolean | null;
  viewCount: number;
  likeCount: number;
  points: number;
  questions: Question[];
  author: { name: string | null; avatar: string | null };
  draft?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
};

export const ActivityTypes = {
  LESSON_COMPLETE: "LESSON_COMPLETE",
  LOGIN: "LOGIN",
  STREAK: "STREAK",
  DAILY_REPS: "DAILY_REPS",
};

export type ActivityTypes = typeof ActivityTypes;
