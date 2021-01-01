import { apiFetcher } from "@helpers/api";
import React, { FC } from "react";
import useSWR from "swr";
import { Lesson, LessonsSWR, RepSWR, StatsSWR } from "../../types";
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
  const { data: lessons }: LessonsSWR = useSWR(
    `lessons/?categoryId=${categoryId}&take=${take}`,
    apiFetcher
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
  take = 25,
}) => {
  const { data: lessons }: LessonsSWR = useSWR(
    `lessons/?userName=${userName}&take=${take}`,
    apiFetcher
  );

  return <LessonList lessons={lessons} heading={heading} />;
};

export interface TodaysLessonsProps {
  heading: string;
  take?: number;
}

export const TodaysLessons: FC<TodaysLessonsProps> = ({
  heading,
  take = 10,
}) => {
  const { data: reps }: RepSWR = useSWR(
    `protected/repetitions?take=${take}`,
    apiFetcher
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
            imageUrl: "images/sun.png",
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
  const { data: stats }: StatsSWR = useSWR(
    `protected/stats/?status=STARTED&take${take}`,
    apiFetcher
  );

  const lessons = stats?.map((stat) => {
    return {
      ...stat.lesson,
      status: stat.status,
    };
  });

  return <LessonList lessons={lessons} heading={heading} />;
};
