import { Box, Heading, Skeleton, Wrap, WrapItem } from "@chakra-ui/core";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "../components/DefaultLayout";
import LessonCard from "../components/LessonCard";
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
        <Heading as="h2" size="lg" marginBottom="40px" textColor="gray.800">
          Lessen voor jou
        </Heading>
        {!data && <Skeleton borderRadius="20px" width="250px" height="250px" />}
        <Wrap spacing={["20px", "30px"]}>
          {lessons?.map((lesson) => {
            return (
              <WrapItem key={lesson.id}>
                <LessonCard
                  id={lesson.id}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  imageUrl={lesson.imageUrl}
                  views={lesson.viewCount}
                  hearts={lesson.likeCount}
                  lightbulbs={lesson.points}
                  authorAvatar={lesson.author.avatar}
                />
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </DefaultLayout>
  );
};

export default Index;
