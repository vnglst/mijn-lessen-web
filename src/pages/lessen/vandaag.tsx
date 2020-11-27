import { ButtonGroup, Center, CloseButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AppHead from "@components/Head";
import NavBarTop from "@components/navigation/NavBarTop";
import LoginAlert from "@components/quiz/LoginAlert";
import Quiz from "@components/quiz/Quiz";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import HeroWave from "@components/ui/HeroWave";
import { API_URL } from "@config/services";
import { niceFetch } from "@helpers/niceFetch";
import { Repetition } from "../../types";

function TodaysQuiz() {
  const router = useRouter();

  const { data } = useSWR(`${API_URL}/protected/repetitions`, niceFetch);
  const questions = (data as Repetition[] | undefined)?.map(
    (rep) => rep.question
  );

  const handleClose = () => {
    const reallyClose = confirm(
      "Weet je het zeker dat je wilt stoppen? Je voortgang gaat verloren."
    );
    if (!reallyClose) return;
    sessionStorage.clear();
    router.push(`/`);
  };

  const handleComplete = async () => {
    alert("Goed gedaan")!;
    router.push("/lessen/vandaag/resultaat");
  };

  return (
    <>
      <AppHead>
        <title>Vragen voor vandaag | Wizer.Today</title>
      </AppHead>
      <LoginAlert />
      <HeroWave />
      <NavBarTop>
        <ButtonGroup>
          <CloseButton onClick={handleClose} size="md" />
        </ButtonGroup>
      </NavBarTop>
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
    </>
  );
}

export default TodaysQuiz;
