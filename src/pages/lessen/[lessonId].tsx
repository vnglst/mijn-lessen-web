import { AspectRatio, Box, Heading, Link, Text } from "@chakra-ui/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import AppHead from "../../components/Head";
import HeroWave from "../../components/HeroWave";
import NavBar from "../../components/NavBar";
import { API_URL } from "../../config";

function LessonOverview({
  lesson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const embedId = lesson.videoUrl
    ? new URL(lesson.videoUrl).searchParams.get("v")
    : null;

  return (
    <DefaultLayout pageTitle={`Les ${lesson.title}`} headingText={lesson.title}>
      <Box p={10} maxW="2xl" width="100%" overflow="hidden">
        {embedId && (
          <AspectRatio maxW="560px" ratio={1.6}>
            <iframe
              style={{ border: "5px solid black" }}
              title="Youtube video"
              src={`https://www.youtube.com/embed/${embedId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        )}
        <Text my="40px" fontSize="lg">
          {lesson.intro}
        </Text>
        <NextLink href={`/lessen/${lesson.id}/vragen`} passHref>
          <Link fontSize="lg">Start</Link>
        </NextLink>
      </Box>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${API_URL}/lessons/${context.params?.lessonId}`);
  const { lesson } = await res.json();
  return { props: { lesson } };
}

export default LessonOverview;
