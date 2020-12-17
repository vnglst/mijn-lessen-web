import { Box } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { api } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { IncomingMessage } from "http";
import keyBy from "lodash/keyBy";
import uniqBy from "lodash/uniqBy";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import { Category, Lesson, Repetition, Stats, Status } from "../types";

function Index({
  lessons,
  categories,
  reps,
  started,
  completed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { session } = useSession();
  const user = session?.user;

  const totalReps = reps?.length || 0;

  // TODO: this should become a real lesson, created server side
  const todaysLesson = {
    id: "todays-lessons",
    slug: "vandaag",
    title: "Herhalingen",
    subtitle: "Vragen die je eerder een keer fout had",
    imageUrl: "images/sun.png",
    author: {
      avatar:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Pink&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Pale",
    },
    points: totalReps,
  } as Lesson;

  return (
    <DefaultLayout
      pageTitle="Home"
      headingText={`Hallo ${user?.name || ""}`}
      centered
    >
      {totalReps > 0 && (
        <Box px={[5, 10]} my={10} width="100%">
          <LessonList lessons={[todaysLesson]} heading="Voor vandaag" />
        </Box>
      )}
      {started && (
        <Box px={[5, 10]} my={10} width="100%">
          <LessonList lessons={started} heading="Verder met" />
        </Box>
      )}
      {categories.map((category) => {
        // FIXME: ugly, fix/test
        const lessonsForCategory = lessons.filter((lesson) =>
          lesson.categories.some((cat) => cat.id === category.id)
        );
        if (lessonsForCategory.length > 0)
          return (
            <Box key={category.id} px={[5, 10]} my={10} width="100%">
              <LessonList
                lessons={lessonsForCategory}
                heading={category.title}
              />
            </Box>
          );
      })}
      {completed && (
        <Box px={[5, 10]} my={10} width="100%">
          <LessonList lessons={completed} heading="Gedaan" />
        </Box>
      )}
    </DefaultLayout>
  );
}

export const getServerSideProps = async ({ req }: { req: IncomingMessage }) => {
  const lessons: Lesson[] = await api.get(`lessons/`).json();

  // FIXME: ugly, fix this
  let categories: Category[] = [];
  lessons.forEach((l) => {
    categories = [...categories, ...l.categories];
  });
  categories = uniqBy(categories, "id");

  const cookie = req.headers.cookie as string;
  const headers = { cookie: cookie };

  const session: any = await api.get(`session`, { headers }).json();
  const user = session?.user;

  if (!user)
    return {
      props: {
        lessons,
        categories,
        started: null,
        completed: null,
        reps: null,
      },
    };

  const reps: Repetition[] = await api
    .get(`protected/repetitions`, { headers })
    .json();
  const stats: Stats[] = await api.get(`protected/stats`, { headers }).json();

  const dict = keyBy(stats, "lessonId");

  // FIXME: ugly, fix
  const lessonsWithStats = lessons
    .map((l) => {
      const status = dict ? dict[l.id]?.status : undefined;
      if (status) return { status, ...l };
      return { ...l };
    })
    .filter((l) => l.status !== "COMPLETED")
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
    props: { lessons: lessonsWithStats, categories, started, completed, reps },
  };
};

export default Index;
