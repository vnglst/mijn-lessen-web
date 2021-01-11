import { Center, Text } from "@chakra-ui/react";
import Quiz from "@components/quiz/Quiz";
import QuizContainer from "@components/quiz/QuizContainer";
import { levelUp } from "@components/quiz/QuizSounds";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { api } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { Activity, ActivityTypes, Repetition } from "../../types";

function TodaysQuiz() {
  const router = useRouter();
  const { mutate: mutateSession } = useSession();

  const { data: reps }: { data?: Repetition[] } = useQuery(
    `protected/repetitions`,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const questions = reps?.map((rep) => rep.question);

  const handleClose = () => {
    const reallyClose = confirm(
      "Weet je het zeker dat je wilt stoppen? Je voortgang gaat verloren."
    );
    if (!reallyClose) return;
    sessionStorage.clear();
    router.push(`/start`).then(() => window.scrollTo(0, 0));
  };

  const handleComplete = async () => {
    const activity: Activity | null = await api
      .put(`protected/activities`, {
        json: {
          points: questions?.length,
          type: "DAILY_REPS" as ActivityTypes,
        },
      })
      .json();

    const pointsEarned = activity?.pointsEarned || 0;
    if (pointsEarned) levelUp.play();
    mutateSession?.();

    return router
      .push(`/lessen/vandaag/resultaat?pointsEarned=${pointsEarned}`)
      .then(() => {
        window.scrollTo(0, 0);
        return true;
      });
  };

  return (
    <QuizContainer onClose={handleClose}>
      {!questions && <FullScreenSpinner />}
      {questions && questions.length !== 0 && (
        <Quiz
          questions={questions}
          id={new Date().toDateString()}
          onComplete={handleComplete}
        />
      )}
      {questions && questions.length === 0 && (
        <Center height="100vh">
          <Text fontSize="xl" textAlign="center">
            Geen vragen die je vandaag nog kunt oefenen. <br />
            Kom morgen weer terug!
          </Text>
        </Center>
      )}
    </QuizContainer>
  );
}

export default TodaysQuiz;
