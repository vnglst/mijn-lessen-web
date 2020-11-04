import { AspectRatio, Button, ButtonGroup, Flex, Text } from "@chakra-ui/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { niceFetch } from "..";
import DefaultLayout from "../../components/DefaultLayout";
import { API_URL } from "../../config";

function LessonOverview({
  lesson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isDeletingAnswers, setIsDeletingAnswers] = useState(false);
  const router = useRouter();
  const embedId = lesson.videoUrl
    ? new URL(lesson.videoUrl).searchParams.get("v")
    : null;

  return (
    <DefaultLayout
      pageTitle={`Les ${lesson.title}`}
      headingText={lesson.title}
      centered
    >
      <Flex p={10} width="100%" flexDirection="column" alignItems="center">
        <Flex flexDirection="column" maxW="xl" width="100%">
          {embedId && (
            <AspectRatio ratio={1.6}>
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
          <Text my="40px" mx={5} fontSize="lg">
            {lesson.intro}
          </Text>
          <ButtonGroup>
            <Button
              mx="auto"
              onClick={async () => {
                setIsDeletingAnswers(true);
                sessionStorage.clear();
                await niceFetch(`${API_URL}/answers/?lessonId=${lesson.id}`, {
                  method: "DELETE",
                });
                router.push(`/lessen/${lesson.id}/vragen`);
                setIsDeletingAnswers(false);
              }}
              variant="my-green"
              isLoading={isDeletingAnswers}
            >
              START LES
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${API_URL}/lessons/${context.params?.lessonId}`);
  const { lesson } = await res.json();
  return { props: { lesson } };
}

export default LessonOverview;
