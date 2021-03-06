import React, { FC } from "react";
import { useQuery } from "react-query";
import { Lesson, Repetition, Stats } from "../../types";
import LessonList from "./LessonList";

export interface LessonsByCategoryProps {
  heading: string;
  categoryId: number;
  take?: number;
}

export const LessonsByCategory: FC<LessonsByCategoryProps> = ({
  heading,
  categoryId,
  take = 10,
}) => {
  const { data: lessons }: { data?: Lesson[] } = useQuery(
    `lessons/?categoryId=${categoryId}&take=${take}`
  );

  return <LessonList lessons={lessons} heading={heading} />;
};

export interface LessonsByUserProps {
  heading: string;
  userName: string;
  take?: number;
}

export const LessonsByUser: FC<LessonsByUserProps> = ({
  heading,
  userName,
  take = 5,
}) => {
  const { data: lessons }: { data?: Lesson[] } = useQuery(
    `lessons/?userName=${userName}&take=${take}`
  );

  return <LessonList lessons={lessons} heading={heading} />;
};

export interface TodaysLessonsProps {
  heading: string;
  take?: number;
}

export const TodaysLessons: FC<TodaysLessonsProps> = ({ heading }) => {
  const { data: reps }: { data?: Repetition[] } = useQuery(
    `protected/repetitions`
  );

  const totalReps = reps?.length || 0;

  const todaysLesson =
    totalReps > 0
      ? ([
          {
            id: "todays-lessons",
            slug: "vandaag",
            title: "Herhalingen",
            subtitle: "Vragen die je eerder een keer fout had",
            imageUrl:
              "https://res.cloudinary.com/mijn-lessen-nl/image/upload/f_auto,q_auto/v1609785617/sun.png",
            author: {
              name: "mijn-lessen.nl",
              avatar:
                "https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Pink&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Pale",
            },
            points: totalReps,
            likeCount: 0,
            viewCount: 0,
          },
        ] as Lesson[])
      : [];

  return <LessonList lessons={todaysLesson} heading={heading} />;
};

export interface StartedLessonsProps {
  heading: string;
  take?: number;
}

export const StartedLessons: FC<StartedLessonsProps> = ({
  heading,
  take = 10,
}) => {
  const { data: stats }: { data?: Stats[] } = useQuery(
    `protected/stats/?status=STARTED&take${take}`
  );

  const lessons = stats?.map((stat) => {
    return {
      ...stat.lesson,
      status: stat.status,
    };
  });

  return <LessonList lessons={lessons} heading={heading} />;
};
