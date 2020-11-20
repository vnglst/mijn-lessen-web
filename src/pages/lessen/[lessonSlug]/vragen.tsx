import { ButtonGroup, CloseButton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import AppHead from "../../../components/Head";
import NavBarTop from "../../../components/navigation/NavBarTop";
import LoginAlert from "../../../components/quiz/LoginAlert";
import Quiz from "../../../components/quiz/Quiz";
import FullScreenSpinner from "../../../components/ui/FullScreenSpinner";
import HeroWave from "../../../components/ui/HeroWave";
import { API_URL } from "../../../config";
import { Lesson, Question } from "../../../types";
import { niceFetch, shuffle } from "../../../helpers";

function shuffleQuestions(questions: Question[]) {
  const newQuestions = questions.map((q) => {
    return { ...q, options: shuffle(q.options) };
  });
  return shuffle(newQuestions);
}

function LessonApp() {
  const router = useRouter();
  const lessonSlug = router.query.lessonSlug as string;

  const { data } = useSWR(
    () => (lessonSlug ? `${API_URL}/lessons/${lessonSlug}` : null),
    niceFetch
  );
  const lesson: Lesson | null = data?.lesson;

  const handleClose = () => {
    const reallyClose = confirm(
      "Weet je het zeker dat je wilt stoppen? Je voortgang gaat verloren."
    );
    if (!reallyClose) return;
    sessionStorage.clear();
    router.push(`/lessen/${data.lesson.slug}/`);
  };

  return (
    <>
      <AppHead>
        <title>Oefenen {data?.lesson?.title} | Wizer.Today</title>
      </AppHead>
      <LoginAlert />
      <NavBarTop>
        <ButtonGroup>
          <CloseButton onClick={handleClose} size="md" />
        </ButtonGroup>
      </NavBarTop>
      <HeroWave />
      {lesson ? (
        <Quiz
          lesson={{
            ...lesson,
            questions: lesson.shuffle
              ? shuffleQuestions(lesson.questions)
              : lesson.questions,
          }}
        />
      ) : (
        <FullScreenSpinner />
      )}
    </>
  );
}

export default LessonApp;
