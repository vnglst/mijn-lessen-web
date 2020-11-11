import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import useSound from "use-sound";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { useSessionStore } from "../hooks/useSessionStore";
import { Option, Question } from "../providers/types";
import HeroWave from "./HeroWave";

type Answer = null | "correct" | "incorrect";

interface Props {
  lessonId: string;
  initialQuestions: Question[];
}

const LessonForm: FC<Props> = ({ lessonId, initialQuestions }) => {
  const [playCorrectFx] = useSound("/sounds/pepSound5.mp3", { volume: 1 });
  const [playMistakeFx] = useSound("/sounds/pepSound4.mp3", { volume: 1 });
  const [playLevelUp] = useSound("/sounds/blessing.mp3", { volume: 1 });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useSessionStore(
    `questions-${lessonId}`,
    initialQuestions
  );
  const [optionId, setOptionId] = useSessionStore(`optionId-${lessonId}`, "");
  const [answer, setAnswer] = useSessionStore(
    `answer-${lessonId}`,
    null as Answer
  );

  const isAnswered = !!answer;
  const current: Question = questions[0];
  const hasNextQuestion = questions.length > 1;
  const correctOption = current.options.find((o) => o.correct) as Option;

  const handleNext = async () => {
    let newQuestions = [...questions.slice(1)];
    if (answer === "incorrect") newQuestions.push(current);

    if (newQuestions.length > 0) {
      setQuestions(newQuestions);
      setOptionId("");
      setAnswer(null);
      return;
    }

    setIsSubmitting(true);
    const { pointsEarned } = await niceFetch(
      `${API_URL}/protected/lessons/${lessonId}/result`,
      {
        method: "POST",
      }
    );
    setIsSubmitting(false);
    if (pointsEarned) playLevelUp();
    router.push(`/lessen/${lessonId}/resultaat?pointsEarned=${pointsEarned}`);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSubmitting(true);
    await niceFetch(`${API_URL}/protected/answers/`, {
      method: "POST",
      body: JSON.stringify({
        optionId: parseInt(optionId, 10),
        questionId: current.id,
      }),
    });
    const isCorrect = correctOption?.id == optionId;

    if (isCorrect) playCorrectFx();
    else playMistakeFx();

    setAnswer(isCorrect ? "correct" : "incorrect");
    setIsSubmitting(false);
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      minHeight="100vh"
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
          pt={["15px", "30px"]}
          textAlign="center"
          width="100%"
        >
          {current.title}
        </Heading>
        {current.title && (
          <Text mt={2} fontSize="lg">
            {current.subtitle}
          </Text>
        )}
      </HeroWave>
      <Flex flexDirection="column">
        <FormControl
          id="answer"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="60px"
          isRequired
        >
          <RadioGroup
            aria-labelledby="question"
            onChange={setOptionId}
            value={optionId.toString()}
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
                    value={id.toString()}
                    isDisabled={isAnswered}
                  >
                    {title}
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
      <Progress
        mt="auto"
        value={
          100 - Math.round((questions.length / initialQuestions.length) * 100)
        }
        size="xs"
      />
      <Flex
        height="100%"
        justifyContent="center"
        width="100%"
        p={6}
        bg={
          isAnswered
            ? answer === "correct"
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
            {answer === "incorrect" && (
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
            {answer === "correct" && (
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
                  marginLeft="auto"
                  bg="white"
                  onClick={handleNext}
                  isLoading={isSubmitting}
                >
                  {hasNextQuestion ? "Volgende" : "Bekijk resultaat"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  marginLeft="auto"
                  variant="primary"
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
    </Flex>
  );
};

export default LessonForm;
