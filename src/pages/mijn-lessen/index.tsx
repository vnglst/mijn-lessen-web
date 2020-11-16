import { Box } from "@chakra-ui/core";
import React, { FC } from "react";
import useSWR from "swr";
import DefaultLayout from "../../components/DefaultLayout";
import LessonList from "../../components/LessonList";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { useSession } from "../../providers";
import { Lesson } from "../../providers/types";

export interface MyLessonsProps {}

const MyLessons: FC<MyLessonsProps> = ({}) => {
  const session = useSession();
  const { data } = useSWR(
    `${API_URL}/lessons/?userName=${session?.user.name}`,
    niceFetch
  );
  const lessons: Lesson[] | undefined = data?.lessons;

  return (
    <DefaultLayout pageTitle="Mijn lessen" headingText={`Jouw lessen`} centered>
      <Box p={10} marginTop="10px">
        <LessonList lessons={lessons} heading="Net gewijzigde lessen" />
      </Box>
    </DefaultLayout>
  );
};

export default MyLessons;
