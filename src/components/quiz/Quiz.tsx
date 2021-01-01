import { Container, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import { api } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { useSessionStore } from "@hooks/useSessionStore";
import { NextSeo } from "next-seo";
import React, { FC } from "react";
import { Option, Question, QuestionType } from "../../types";
import QuizOptions from "./MultipleChoice";
import QuizAnswer from "./OpenQuestion";
import QuizBottomNav from "./QuizBottomNav";
import { correct, wrong } from "./QuizSounds";

export type AnswerState = null | "correct" | "incorrect";

interface Props {
  questions: Question[];
  id: string;
  onComplete: () => Promise<boolean>;
}

const Quiz: FC<Props> = ({ questions: initialQuestions, id, onComplete }) => {
  const { session } = useSession();
  const user = session?.user;

  const [state, setState] = useSessionStore(id, {
    questions: initialQuestions,
    optionId: "",
    answerState: null as AnswerState,
  });

  const { questions, answerState, optionId } = state;
  const isAnswered = !!answerState;
  const current: Question = questions[0];

  const hasNextQuestion = questions.length > 1 || answerState === "incorrect";
  const correctOption = current.options.find((o) => o.correct) as Option;

  const handleNext = async () => {
    let newQuestions = [...questions.slice(1)];
    if (answerState === "incorrect") newQuestions.push(current);

    // still questions left, continue
    if (newQuestions.length > 0) {
      setState({ questions: newQuestions, optionId: "", answerState: null });
      return;
    }

    // end of questions
    onComplete();
  };

  const handleSubmit = async () => {
    const isCorrect = correctOption?.id == optionId;
    if (isCorrect) correct.play();
    else wrong.play();

    setState({ ...state, answerState: isCorrect ? "correct" : "incorrect" });

    if (!user) return;

    await api.post("protected/repetitions", {
      json: { questionId: current.id, correct: isCorrect },
    });
  };

  return (
    <>
      <NextSeo title={current.title} />
      <Flex
        as="form"
        onSubmit={handleSubmit}
        minHeight="100vh"
        flexDirection="column"
      >
        <Container display="flex" flexDirection="column" marginTop="auto">
          <Heading
            id="question"
            as="h1"
            size="2xl"
            fontWeight="900"
            noOfLines={3}
            lineHeight={1.6}
            textAlign="center"
            width="100%"
            mt={24}
          >
            {current.title}
          </Heading>
          {current.title && (
            <Text mt={2} fontSize="xl" textAlign="center">
              {current.subtitle}
            </Text>
          )}
          {current.type === QuestionType.OPEN ? (
            <QuizAnswer
              key={current.id}
              value={optionId}
              onChange={(optionId) => setState({ ...state, optionId })}
              options={current.options}
              isAnswered={isAnswered}
            />
          ) : (
            <QuizOptions
              key={current.id}
              value={optionId}
              onChange={(optionId) => setState({ ...state, optionId })}
              options={current.options}
              isAnswered={isAnswered}
            />
          )}
        </Container>
        <Progress
          mt="auto"
          value={
            100 - Math.round((questions.length / initialQuestions.length) * 100)
          }
          size="xs"
        />
        <QuizBottomNav
          answerState={answerState}
          correctOption={correctOption}
          onNext={handleNext}
          onSubmit={handleSubmit}
          hasNextQuestion={hasNextQuestion}
          isValid={!!optionId}
        />
      </Flex>
    </>
  );
};

export default Quiz;
