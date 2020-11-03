import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  FormControl,
  Heading,
  Link,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { niceFetch } from "../../..";
import AppHead from "../../../../components/Head";
import HeroWave from "../../../../components/HeroWave";
import NavBar from "../../../../components/NavBar";
import { API_URL } from "../../../../config";

function LessonPage({
  next,
  current,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [optionId, setOptionId] = useState("");
  const [answerState, setAnswerState] = useState(
    null as null | "correct" | "incorrect"
  );
  const isAnswered = !!answerState;
  const nextUrl = next && `/lessen/${next.lessonId}/vraag/${next.id}`;
  const router = useRouter();

  async function handleSubmit() {
    const { isCorrect } = await niceFetch(
      `${API_URL}/questions/${current.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          optionId: parseInt(optionId, 10),
          lessonId: current.lessonId,
        }),
      }
    );
    setAnswerState(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      if (!isCorrect) return;
      if (next) {
        setAnswerState(null);
        return router.push(nextUrl);
      }
      router.push(`/lessen/${current.lessonId}/`);
      // TODO: goto lesson report when ended
    }, 500);
  }

  return (
    <>
      <AppHead>
        <title>Vraag {current.title} | Wiser.Today</title>
      </AppHead>
      <NavBar>
        <ButtonGroup>
          <CloseButton
            onClick={() => {
              const answer = confirm("Weet je het zeker dat je wilt stoppen?");
              if (answer) router.push(`/lessen/${current.lessonId}/`);
            }}
            size="md"
            p="20px"
          />
        </ButtonGroup>
      </NavBar>

      <HeroWave>
        <Heading
          as="h1"
          size="xl"
          p="40px"
          marginTop={["150px"]}
          fontWeight="900"
          noOfLines={3}
          lineHeight={1.6}
          textAlign="center"
          width="100%"
        >
          {current.title}
        </Heading>
      </HeroWave>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box maxWidth="xl" width="100%" display="flex" flexDirection="column">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginTop="80px"
            >
              <RadioGroup
                onChange={(v) => {
                  setOptionId(v);
                }}
                value={optionId}
              >
                <Stack direction="column">
                  {current.options.map(({ title, id }) => {
                    return (
                      <Radio
                        marginY="10px"
                        key={id}
                        colorScheme="blue"
                        size="lg"
                        value={"" + id}
                        isDisabled={isAnswered}
                      >
                        {title}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
            {answerState === "incorrect" && (
              <Text color="tomato">Helaas, dat is niet juist.</Text>
            )}
            {answerState === "correct" && <Text>Goed zo!</Text>}
            <ButtonGroup
              display="flex"
              justifyContent="space-between"
              my="100px"
              px="40px"
            >
              {next && (
                <NextLink
                  href={`/lessen/${next.lessonId}/vraag/${next.id}`}
                  passHref
                >
                  <Link
                    onClick={() => {
                      setAnswerState(null);
                    }}
                    my="auto"
                  >
                    Overslaan
                  </Link>
                </NextLink>
              )}
              <Button
                type="submit"
                marginLeft="auto"
                variant="my-green"
                isDisabled={isAnswered}
              >
                Controleren
              </Button>
            </ButtonGroup>
            <Progress value={30} size="40px" />
          </form>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { questionId, lessonId } = context.params as any;
  const res = await fetch(
    `${API_URL}/questions/${questionId}/?lessonId=${lessonId}`
  );
  const { next = null, current } = await res.json();
  return { props: { next, current } };
}

export default LessonPage;
