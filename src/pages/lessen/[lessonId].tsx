import { Box, Heading, Link, Text } from "@chakra-ui/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import React from "react";
import AppHead from "../../components/Head";
import HeroWave from "../../components/HeroWave";
import NavBar from "../../components/NavBar";
import { API_URL } from "../../config";

function LessonPage({
  lesson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const embedId = lesson.videoUrl
    ? new URL(lesson.videoUrl).searchParams.get("v")
    : null;

  return (
    <>
      <AppHead>
        <title>Les {lesson.title} | Wiser.Today</title>
      </AppHead>
      <NavBar />
      <HeroWave>
        <Heading
          as="h1"
          size="xl"
          marginTop="auto"
          fontWeight="900"
          noOfLines={3}
          lineHeight={1.6}
          p={["15px", "30px"]}
        >
          {lesson.title}
        </Heading>
      </HeroWave>
      <Box p={["15px", "30px"]} width="100%" overflow="hidden">
        {embedId && (
          <iframe
            style={{ border: "5px solid black", maxWidth: "100%" }}
            title="Youtube video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <Text my="40px" fontSize="lg">
          {lesson.intro}
        </Text>
        <NextLink
          href={`/lessen/${lesson.id}/vraag/${lesson.questions[0].id}`}
          passHref
        >
          <Link fontSize="lg">Start</Link>
        </NextLink>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${API_URL}/lessons/${context.params?.lessonId}`);
  const { lesson } = await res.json();
  return { props: { lesson } };
}

export default LessonPage;
