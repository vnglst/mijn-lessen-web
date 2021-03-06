import { EditIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LoginAlert from "@components/quiz/LoginAlert";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import YouTube from "@components/ui/YouTube";
import { api } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { useQuery } from "react-query";
import { Lesson } from "types";

function LessonOverview() {
  const { session } = useSession();
  const router = useRouter();
  const { lessonSlug } = router.query;

  const { data: lesson }: { data?: Lesson } = useQuery(
    [`lessons/${lessonSlug}`, lessonSlug],
    { enabled: !!lessonSlug }
  );

  const [loading, setLoading] = useState(false);
  const user = session?.user;
  const isAuthor = lesson?.author.name === user?.name;
  const canEdit = isAuthor || user?.role === "ADMIN";

  const handleStart = async () => {
    sessionStorage.clear();
    setLoading(true);

    if (user) {
      await api.post(`protected/stats`, {
        json: { lessonId: lesson!.id, viewed: true, status: "STARTED" },
      });
    }
    router
      .push(`/lessen/${lesson!.slug}/vragen`)
      .then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <LoginAlert />
      <DefaultLayout
        pageTitle={lesson?.title || ""}
        headingText={lesson?.title || ""}
        subtitle={lesson?.subtitle}
        imageUrl={lesson?.imageUrl}
      >
        {lesson ? (
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
                    src={lesson.author.avatar || ""}
                    backgroundColor="transparent"
                  />
                  <Text ml={2}>{lesson.author.name}</Text>
                </Flex>
              </Flex>
              {canEdit && (
                <Flex ml="auto">
                  <IconButton
                    onClick={() =>
                      router
                        .push(`/mijn-lessen/${lesson.slug}/bewerken`)
                        .then(() => window.scrollTo(0, 0))
                    }
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
                onClick={handleStart}
                variant="primary"
                isLoading={loading}
              >
                Start les
              </Button>
            </ButtonGroup>
          </Container>
        ) : (
          <FullScreenSpinner />
        )}
      </DefaultLayout>
    </>
  );
}

export default LessonOverview;
