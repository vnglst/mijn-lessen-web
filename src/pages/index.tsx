import { Box } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { API_URL } from "../config/services";
import { niceFetch } from "@helpers/niceFetch";
import { useSession } from "@hooks/useSession";
import { Category, Lesson, Repetition } from "../types";
import uniqBy from "lodash/uniqBy";

const Index = () => {
  const { session } = useSession();
  const { data } = useSWR(`${API_URL}/lessons`, niceFetch);
  const { data: reps } = useSWR(`${API_URL}/protected/repetitions`, niceFetch);

  const totalReps = (reps as Repetition[] | undefined)?.length || 0;
  const lessons: Lesson[] | undefined = data?.lessons;

  let categories: Category[] = [];
  if (lessons) {
    lessons.forEach((l) => {
      categories = [...categories, ...l.categories];
    });
    categories = uniqBy(categories, "id");
  }

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
      {categories.map((cat) => {
        const l = lessons?.filter((lesson) =>
          lesson.categories.some((c) => c.id === cat.id)
        );
        return (
          <Box key={cat.id} px={[5, 10]} my={8} width="100%">
            <LessonList lessons={l} heading={cat.title} />
          </Box>
        );
      })}
    </DefaultLayout>
  );
};

export default Index;
