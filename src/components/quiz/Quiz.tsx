import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  Heading,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import React, { FC, FormEvent, useState } from "react";
import useSound from "use-sound";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { useSessionStore } from "../../hooks";
import { Option, Question } from "../../types";

type Answer = null | "correct" | "incorrect";

interface Props {
  questions: Question[];
  id: string;
  onComplete: () => Promise<void>;
}

const Quiz: FC<Props> = ({ questions: initialQuestions, id, onComplete }) => {
  const [playCorrectFx] = useSound("/sounds/pepSound5.mp3", { volume: 1 });
  const [playMistakeFx] = useSound("/sounds/pepSound4.mp3", { volume: 1 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useSessionStore(
    `q-${id}`,
    initialQuestions
  );
  const [optionId, setOptionId] = useSessionStore(`o-${id}`, "");
  const [answer, setAnswer] = useSessionStore(`a-${id}`, null as Answer);

  const isAnswered = !!answer;
  const current: Question = questions[0];
  const hasNextQuestion = questions.length > 1 || answer === "incorrect";
  const correctOption = current.options.find((o) => o.correct) as Option;

  const handleNext = async () => {
    let newQuestions = [...questions.slice(1)];
    if (answer === "incorrect") newQuestions.push(current);

    // still questions left, continue
    if (newQuestions.length > 0) {
      setQuestions(newQuestions);
      setOptionId("");
      setAnswer(null);
      return;
    }

    // end of questions
    setIsSubmitting(true);
    await onComplete();
    setIsSubmitting(false);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const isCorrect = correctOption?.id == optionId;
    if (isCorrect) playCorrectFx();
    else playMistakeFx();

    setAnswer(isCorrect ? "correct" : "incorrect");

    setIsSubmitting(true);

    await niceFetch(`${API_URL}/protected/repetitions`, {
      method: "POST",
      body: JSON.stringify({ questionId: current.id, correct: isCorrect }),
    });

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
        pt="60px"
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
        <HStack
          my={4}
          maxW="xl"
          width="100%"
          justifyContent={["space-around", "space-between"]}
          flexWrap="wrap"
        >
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            mb={[6, 0]}
            alignItems="center"
          >
            {answer === "incorrect" && (
              <>
                <Box>
                  <WarningIcon boxSize={8} ml={3} />
                </Box>
                <Flex flexDirection="column" ml={3}>
                  <Heading as="h2" size="md">
                    Juiste antwoord:
                  </Heading>
                  <Text size="lg">{correctOption.title}</Text>
                </Flex>
              </>
            )}
            {answer === "correct" && (
              <>
                <Box>
                  <CheckIcon boxSize={8} ml={3} />
                </Box>
                <Flex flexDirection="column" ml={3}>
                  <Heading as="h2" size="md">
                    Juiste antwoord:
                  </Heading>
                  <Text size="lg">{correctOption.title}</Text>
                </Flex>
              </>
            )}
          </Flex>
          <ButtonGroup>
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
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Quiz;
