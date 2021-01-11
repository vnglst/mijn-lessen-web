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
  type: QuestionType;
  repetitions?: Repetition[];
};

export const QuestionType = {
  OPEN: "OPEN",
  MULTI: "MULTI",
};

export type QuestionType = typeof QuestionType[keyof typeof QuestionType];

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

export type Category = {
  title: string;
  slug: string;
  id: number;
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

export type Stats = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  liked: boolean;
  viewed: boolean;
  userId: string;
  lessonId: string;
  lesson: Lesson;
};
