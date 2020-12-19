import { Box, Skeleton, Stack } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { api } from "@helpers/api";
import keyBy from "lodash/keyBy";
import uniqBy from "lodash/uniqBy";
import React from "react";
import useSWR from "swr";
import { Category, Lesson, Repetition, Stats, Status, User } from "../types";

const asyncStuff = async () => {
  const lessons: Lesson[] = await api.get(`lessons/`).json();

  // FIXME: ugly, fix this
  let categories: Category[] = [];
  lessons.forEach((l) => {
    categories = [...categories, ...l.categories];
  });

  categories = uniqBy(categories, "id");

  const session: { user?: User } = await api.get("session").json();
  const user = session?.user;

  if (!user) return { lessons, categories, user: null };

  const reps: Repetition[] = await api.get(`protected/repetitions`).json();
  const stats: Stats[] = await api.get(`protected/stats`).json();

  const dict = keyBy(stats, "lessonId");

  // FIXME: ugly, fix
  const lessonsWithStats = lessons
    .map((l) => {
      const status = dict ? dict[l.id]?.status : undefined;
      if (status) return { status, ...l };
      return { ...l };
    })
    // .filter((l) => l.status !== "COMPLETED")
    .sort((l1, l2) => {
      const toValue = (status?: Status) => {
        if (status === "STARTED") return 1;
        if (!status || status === "INITIAL") return 2;
        if (status === "COMPLETED") return 3;

        const _ensure: never = status;
        return _ensure;
      };

      return toValue(l1.status) - toValue(l2.status);
    });

  const withStats =
    stats?.map((stat) => {
      return {
        ...stat.lesson,
        status: stat.status,
      };
    }) || null;

  const started = withStats?.filter((stat) => stat.status === "STARTED");
  const completed = withStats?.filter((stat) => stat.status === "COMPLETED");

  return {
    lessons: lessonsWithStats,
    started,
    completed,
    reps,
    categories: uniqBy(categories, "id"),
    user,
  };
};

function Index() {
  const { data } = useSWR(`protected/stats`, asyncStuff);

  const reps = data?.reps || [];
  const started = data?.started || null;
  const completed = data?.completed || null;
  const lessons = data?.lessons || [];
  const categories = data?.categories || [];
  const user = data?.user;

  const totalReps = reps?.length || 0;

  // TODO: this should become a real lesson, created server side
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
          },
        ] as Lesson[])
      : null;

  return (
    <DefaultLayout
      pageTitle="Home"
      headingText={`Hallo ${user?.name || ""}`}
      centered
    >
      {!data ? (
        <Stack spacing={5} width="100%" px={[5, 10]} my={10}>
          <Skeleton borderRadius="10px" height="40px" width="200px" />
          <Skeleton borderRadius="20px" width="320px" height="450px" />
        </Stack>
      ) : (
        <Box px={[5, 10]}>
          <Box my={10} width="100%">
            <LessonList lessons={todaysLesson} heading="Voor vandaag" />
          </Box>
          <Box my={10} width="100%">
            <LessonList lessons={started} heading="Verder met" />
          </Box>
          {categories.map((category) => {
            // FIXME: ugly, fix/test
            const lessonsForCategory = lessons.filter((lesson) =>
              lesson.categories.some((cat) => cat.id === category.id)
            );
            if (lessonsForCategory.length > 0)
              return (
                <Box key={category.id} my={10} width="100%">
                  <LessonList
                    lessons={lessonsForCategory}
                    heading={category.title}
                  />
                </Box>
              );
          })}
          <Box my={10} width="100%">
            <LessonList lessons={completed} heading="Gedaan" />
          </Box>
        </Box>
      )}
    </DefaultLayout>
  );
}

export default Index;
