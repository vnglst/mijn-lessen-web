import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/core";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import DefaultLayout from "../../components/DefaultLayout";
import LoginAlert from "../../components/quiz/LoginAlert";
import YouTube from "../../components/ui/YouTube";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { useSession } from "../../providers";

function LessonOverview({
  lesson,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { session } = useSession();
  const router = useRouter();
  const isAuthor = lesson.author.name === session?.user.name;

  return (
    <>
      <LoginAlert />
      <DefaultLayout
        pageTitle={`Les ${lesson.title}`}
        headingText={lesson.title}
        subtitle={lesson.subtitle}
        imageUrl={lesson.imageUrl}
      >
        <Container maxWidth="2xl">
          <Flex
            my={1}
            ml="auto"
            alignItems="center"
            fontSize="xs"
            textColor="gray.600"
            width="100%"
          >
            <Text>{lesson.points}</Text>
            <Box ml={2} mr={5} as={GiLightBulb} color="yellow.400" />
            <Text>{lesson.viewCount}</Text>
            <Box ml={2} mr={5} as={GrView} />
            <Text>{lesson.likeCount}</Text>
            <Box ml={2} as={GiHearts} color="red.300" />
          </Flex>
          <Divider my={4} />
          <Flex width="100%" mb={8}>
            <Flex flexDirection="column">
              <Text
                style={{ fontVariant: "all-small-caps" }}
                textTransform="uppercase"
              >
                Les gemaakt door:
              </Text>
              <Flex mt={2}>
                <Avatar
                  size="xs"
                  src={lesson.author.avatar}
                  backgroundColor="transparent"
                />
                <Text ml={2}>{lesson.author.name}</Text>
              </Flex>
            </Flex>
            {isAuthor && (
              <Flex ml="auto">
                <IconButton
                  mr={4}
                  onClick={async () => {
                    const sure = confirm(
                      "Weet je zeker dat je deze wilt verwijderen?"
                    );
                    if (!sure) return;

                    await niceFetch(
                      `${API_URL}/protected/lesson/${lesson.slug}`,
                      { method: "DELETE" }
                    );

                    router.push(`/mijn-lessen/`);
                  }}
                  aria-label="Verwijderen"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  onClick={() => {
                    router.push(`/mijn-lessen/${lesson.slug}/bewerken`);
                  }}
                  aria-label="Bewerken"
                  icon={<EditIcon />}
                />
              </Flex>
            )}
          </Flex>
          {lesson.intro && (
            <Box
              p={1}
              dangerouslySetInnerHTML={{
                __html: "<div>" + lesson.intro + "</div>",
              }}
            />
          )}
          <YouTube videoUrl={lesson.videoUrl} />
          <ButtonGroup mt={10}>
            <Button
              mx="auto"
              onClick={async () => {
                sessionStorage.clear();
                router.push(`/lessen/${lesson.slug}/vragen`);
              }}
              variant="primary"
            >
              Start les
            </Button>
          </ButtonGroup>
        </Container>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${API_URL}/lessons/${context.params?.lessonSlug}`);
  const { lesson } = await res.json();
  return { props: { lesson } };
}

export default LessonOverview;
