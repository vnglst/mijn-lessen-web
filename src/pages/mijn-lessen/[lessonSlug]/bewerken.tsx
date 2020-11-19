import { Box, Flex, Skeleton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";
import LessonEditor from "../../../components/editor/LessonEditor";
import NavBar from "../../../components/NavBar";
import { API_URL } from "../../../config";
import { niceFetch } from "../../../helpers";
import { Lesson } from "../../../providers/types";

const LessonOverview: FC = () => {
  const router = useRouter();
  const { lessonSlug } = router.query;
  const { data } = useSWR(
    () => (lessonSlug ? `${API_URL}/lessons/${lessonSlug}` : null),
    niceFetch
  );
  const lesson: Lesson | null = data?.lesson;

  if (!lesson) return null;

  return (
    <Box as="main" minHeight="100vh" display="flex" flexDirection="column">
      <header>
        <NavBar />
      </header>
      {lesson ? <LessonEditor lesson={lesson} /> : <Skeleton />}
      <Flex
        width="100%"
        mt="auto"
        height="100%"
        pt="100px"
        pb={5}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#FFFFFF 48.72%,#fef4e2 82.16%);"
      ></Flex>
    </Box>
  );
};

export default LessonOverview;
