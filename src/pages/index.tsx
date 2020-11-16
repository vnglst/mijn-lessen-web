import { Box } from "@chakra-ui/core";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "../components/DefaultLayout";
import LessonList from "../components/LessonList";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { useSession } from "../providers";
import { Lesson } from "../providers/types";

const Index = () => {
  const session = useSession();
  const { data } = useSWR(`${API_URL}/lessons`, niceFetch);
  const lessons: Lesson[] | undefined = data?.lessons;

  return (
    <DefaultLayout
      pageTitle="Home"
      headingText={`Hallo ${session?.user?.name ?? ""}`}
      centered
    >
      <Box p={10} marginTop="10px">
        <LessonList lessons={lessons} heading="Lessen voor jou" />
      </Box>
    </DefaultLayout>
  );
};

export default Index;
