import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { niceFetch } from "../pages/";
import {
  Option,
  Question,
} from "../../../vragen-vragen/node_modules/@prisma/client";
import HeroWave from "./HeroWave";
import { API_URL } from "../config";

type Q = Question & { options: Option[] };

function useSessionState<T>(key: string, initialState: T) {
  const [state, setState] = useState(
    typeof window === "undefined"
      ? initialState
      : JSON.parse(sessionStorage.getItem(key) || "false") || initialState
  );

  const setStateWithSession = (newState: T) => {
    sessionStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  };

  return [state, setStateWithSession];
}

const useClearAnswers = (lessonId: string) => {
  const [started, setStarted] = useSessionState(`started-${lessonId}`, false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    niceFetch(`${API_URL}/answers/?lessonId=${lessonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }, [started]);
};

interface Props {
  lessonId: string;
  initialQuestions: Q[];
}

const LessonForm: FC<Props> = ({ lessonId, initialQuestions: questions }) => {
  useClearAnswers(lessonId);
  const router = useRouter();
  const [idx, setIdx] = useSessionState(`idx-${lessonId}`, 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [questions, setQuestions] = useState(initialQuestions);
  const [optionId, setOptionId] = useSessionState(`optionId-${lessonId}`, "");
  const [answerState, setAnswerState] = useSessionState(
    `answerState-${lessonId}`,
    null as null | "correct" | "incorrect"
  );

  const isAnswered = !!answerState;

  const current: Q = questions[idx];

  const hasNextQuestion = () => idx < questions.length - 1;
  const correctOption = current.options.find((o) => o.correct) as Option;

  const handleNext = () => {
    if (hasNextQuestion()) {
      setIdx(idx + 1);
      setOptionId("");
      setAnswerState(null);
      return;
    }

    sessionStorage.clear();
    router.push("/");
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    await niceFetch(`${API_URL}/questions/${current.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        optionId: parseInt(optionId, 10),
        lessonId,
      }),
    });
    const isCorrect = correctOption?.id == optionId;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    setIsSubmitting(false);
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <HeroWave>
        <Heading
          id="question"
          as="h1"
          size="xl"
          marginTop="auto"
          fontWeight="900"
          noOfLines={3}
          lineHeight={1.6}
          p={["15px", "30px"]}
          textAlign="center"
          width="100%"
        >
          {current.title}
        </Heading>
      </HeroWave>
      <Box display="flex" flexDirection="column">
        <FormControl
          id="answer"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="80px"
          isRequired
        >
          <RadioGroup
            aria-labelledby="question"
            onChange={setOptionId}
            value={optionId + ""}
            name="answer"
          >
            <Stack direction="column">
              {current.options.map(({ title, id }) => {
                return (
                  <Radio
                    marginY="10px"
                    key={id}
                    colorScheme="blue"
                    size="lg"
                    value={id + ""}
                    isDisabled={isAnswered}
                  >
                    {title}
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Box>
      {/* <Progress value={30} size="xs" /> */}
      <Flex
        mt="auto"
        height="100%"
        justifyContent="center"
        width="100%"
        p={6}
        bg={
          isAnswered
            ? answerState === "correct"
              ? "green.200"
              : "red.200"
            : "white"
        }
      >
        <Flex
          mt={5}
          mb={[10, 20]}
          maxW="lg"
          width="100%"
          justifyContent="space-between"
        >
          <Flex width="100%" flexDirection="row">
            {answerState === "incorrect" && (
              <>
                <WarningIcon mt={2} mr={5} boxSize={8} />
                <Flex flexDirection="column">
                  <Heading as="h2" size="md">
                    Juiste antwoord:
                  </Heading>
                  <Text size="lg">{correctOption.title}</Text>
                </Flex>
              </>
            )}
            {answerState === "correct" && (
              <>
                <CheckIcon mt={2} mr={5} boxSize={8} />
                <Flex flexDirection="column">
                  <Heading as="h2" size="md">
                    Juiste antwoord:
                  </Heading>
                  <Text size="lg">{correctOption.title}</Text>
                </Flex>
              </>
            )}
          </Flex>
          <FormControl>
            <ButtonGroup
              display="flex"
              width="100%"
              justifyContent="space-between"
            >
              {isAnswered ? (
                <Button
                  type="submit"
                  marginLeft="auto"
                  bg="white"
                  onClick={handleNext}
                >
                  Volgende
                </Button>
              ) : (
                <Button
                  type="submit"
                  marginLeft="auto"
                  variant="my-green"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!optionId}
                  alignSelf="flex-end"
                >
                  Controleren
                </Button>
              )}
            </ButtonGroup>
          </FormControl>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LessonForm;
