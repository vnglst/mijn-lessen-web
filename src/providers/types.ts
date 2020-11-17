export type Option = {
  id: number;
  title: string;
  createdAt?: Date;
  correct: boolean;
  questionId?: number;
};

export type Question = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  subtitle: string;
  explanation?: string | null;
  points?: number;
  shuffle?: boolean;
  lessonId: number;
  options: Option[];
  draft?: boolean;
};

export type Lesson = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
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
};
