import { Box, Divider } from "@chakra-ui/core";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "../components/DefaultLayout";
import LessonList from "../components/LessonList";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { useSession } from "../providers";
import { Lesson, Repetition } from "../types";

const Index = () => {
  const { session } = useSession();
  const { data } = useSWR(`${API_URL}/lessons`, niceFetch);
  const { data: reps } = useSWR(`${API_URL}/protected/repetitions`, niceFetch);

  const totalReps = (reps as Repetition[] | undefined)?.length || 0;
  const lessons: Lesson[] | undefined = data?.lessons;

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
      <Box my={10} />
      <Box px={[5, 10]}>
        <LessonList lessons={lessons} heading="Rekenen" />
      </Box>
      {/* <Box my={10} />
      <Box px={[5, 10]}>
        <LessonList lessons={lessons} heading="Taal" />
      </Box> */}
    </DefaultLayout>
  );
};

export default Index;
