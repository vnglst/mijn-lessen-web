import { Box } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { api } from "@helpers/api";
import { niceApi } from "@helpers/niceFetch";
import { useSession } from "@hooks/useSession";
import keyBy from "lodash/keyBy";
import uniqBy from "lodash/uniqBy";
import { InferGetServerSidePropsType } from "next";
import React from "react";
import useSWR from "swr";
import { Category, Lesson, RepSWR, StatsSWR, Status } from "../types";

function Index({
  lessons,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { session } = useSession();
  const user = session?.user;

  const { data: reps }: RepSWR = useSWR(
    () => (user ? `protected/repetitions` : null),
    niceApi
  );

  const totalReps = reps?.length || 0;

  const { data: userStats }: StatsSWR = useSWR(
    () => (user ? `protected/stats` : null),
    niceApi
  );

  const dict = keyBy(userStats, "lessonId");

  // FIXME: ugly, fix
  const personalizedLessons = lessons
    .map((l) => {
      const status = dict ? dict[l.id]?.status : undefined;
      return { status, ...l };
    })
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
      headingText={`Hallo ${session?.user?.name ?? ""}`}
      centered
    >
      {totalReps > 0 && (
        <Box px={[5, 10]} my={10} width="100%">
          <LessonList lessons={[todaysLesson]} heading="Voor vandaag" />
        </Box>
      )}
      {categories.map((category) => {
        // FIXME: ugly, fix/test
        const lessonsForCategory = personalizedLessons?.filter((lesson) =>
          lesson.categories.some((cat) => cat.id === category.id)
        );
        return (
          <Box key={category.id} px={[5, 10]} my={10} width="100%">
            <LessonList lessons={lessonsForCategory} heading={category.title} />
          </Box>
        );
      })}
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const lessons: Lesson[] = await api.get(`lessons/`).json();

  // FIXME: ugly, fix this
  let categories: Category[] = [];
  lessons.forEach((l) => {
    categories = [...categories, ...l.categories];
  });
  categories = uniqBy(categories, "id");

  return { props: { lessons, categories } };
}

export default Index;
