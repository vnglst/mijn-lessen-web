import {
  Button,
  ButtonGroup,
  Container,
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
import { API_URL } from "../../config";
import { niceFetch, shuffle } from "../../helpers";
import { useSessionStore } from "../../hooks";
import { useSession } from "../../providers";
import { Lesson, Option, Question } from "../../providers/types";

type Answer = null | "correct" | "incorrect";

function shuffleQuestions(questions: Question[]) {
  const newQuestions = questions.map((q) => {
    return { ...q, options: shuffle(q.options) };
  });
  return shuffle(newQuestions);
}

interface Props {
  lesson: Lesson;
}

const Quiz: FC<Props> = ({ lesson }) => {
  const initialQuestions = lesson.shuffle
    ? shuffleQuestions(lesson.questions)
    : lesson.questions;

  const { id: lessonId } = lesson;

  const router = useRouter();
  const session = useSession();

  const [playCorrectFx] = useSound("/sounds/pepSound5.mp3", { volume: 1 });
  const [playMistakeFx] = useSound("/sounds/pepSound4.mp3", { volume: 1 });
  const [playLevelUp] = useSound("/sounds/blessing.mp3", { volume: 1 });

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
  const hasNextQuestion = questions.length > 1 || answer === "incorrect";
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

    let pointsEarned = 0;

    if (session?.user) {
      setIsSubmitting(true);
      const json = await niceFetch(`${API_URL}/protected/result`, {
        method: "PUT",
        body: JSON.stringify({ lessonId }),
      });
      pointsEarned = json.pointsEarned;
      setIsSubmitting(false);
      if (pointsEarned) playLevelUp();
    }

    router.push(
      `/lessen/${lesson.slug}/resultaat?pointsEarned=${pointsEarned}`
    );
  };

  async function handleSubmit(e: any) {
    e.preventDefault();

    const isCorrect = correctOption?.id == optionId;
    if (isCorrect) playCorrectFx();
    else playMistakeFx();

    setAnswer(isCorrect ? "correct" : "incorrect");

    if (session?.user) {
      setIsSubmitting(true);
      await niceFetch(`${API_URL}/protected/answers/`, {
        method: "PUT",
        body: JSON.stringify({
          optionId: optionId,
          questionId: current.id,
        }),
      });
    }

    setIsSubmitting(false);
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      minHeight="100vh"
      flexDirection="column"
    >
      <Container
        display="flex"
        flexDirection="column"
        marginTop="auto"
        pt={["15px", "30px"]}
      >
        <Heading
          id="question"
          as="h1"
          size="xl"
          fontWeight="900"
          noOfLines={3}
          lineHeight={1.6}
          textAlign="center"
          width="100%"
        >
          {current.title}
        </Heading>
        {current.title && (
          <Text mt={2} fontSize="lg" textAlign="center">
            {current.subtitle}
          </Text>
        )}
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
      </Container>
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

export default Quiz;
