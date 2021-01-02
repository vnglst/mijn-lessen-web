import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { FC, FormEvent, useState } from "react";
import { Option } from "types";
import { AnswerState } from "./Quiz";

export interface QuizBottomNavProps {
  answerState: AnswerState;
  correctOption: Option;
  onNext: () => Promise<void>;
  onSubmit: () => Promise<void>;
  hasNextQuestion: boolean;
  isValid: boolean;
}

const QuizBottomNav: FC<QuizBottomNavProps> = ({
  answerState,
  onNext,
  onSubmit,
  correctOption,
  hasNextQuestion,
  isValid,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAnswered = !!answerState;

  const handleNext = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onNext();
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <Flex
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
      <HStack
        my={4}
        maxW="xl"
        width="100%"
        justifyContent={["space-around", "space-between"]}
        flexWrap="wrap"
      >
        <Flex flexDirection="row" flexWrap="wrap" mb={6} alignItems="center">
          {answerState === "incorrect" && (
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
          {answerState === "correct" && (
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
        <ButtonGroup mb={6}>
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
              form="quiz-form"
              marginLeft="auto"
              variant="primary"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={!isValid}
              alignSelf="flex-end"
            >
              Controleren
            </Button>
          )}
        </ButtonGroup>
      </HStack>
    </Flex>
  );
};

export default QuizBottomNav;
