export type Option = {
  id: string;
  title: string;
  correct: boolean;
};

export type Question = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  subtitle: string | null;
  explanation: string | null;
  points: number;
  lessonId: string;
  draft: boolean;
  options: Option[];
  repetitions: Repetition[];
};

export type Lesson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
  author: { name: string | null; avatar: string | null };
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  role: typeof Role;
  lessonsCreated: Lesson[];
  repetitions: Repetition[];
  activities: Activity[];
};

export const Role = {
  STUDENT: "STUDENT",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

export const ActivityTypes = {
  LESSON_COMPLETE: "LESSON_COMPLETE",
  LOGIN: "LOGIN",
  STREAK: "STREAK",
  DAILY_REPS: "DAILY_REPS",
};

export type Activity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  pointsEarned: number;
  type: ActivityTypes;
  userId: string;
};

export type ActivityTypes = typeof ActivityTypes;

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
