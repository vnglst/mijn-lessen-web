import { ButtonGroup, CloseButton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import AppHead from "../../../components/Head";
import NavBar from "../../../components/NavBar";
import QuestionsForm from "../../../components/QuestionsForm";
import { API_URL } from "../../../config";
import { niceFetch, shuffle } from "../../../helpers";
import { Lesson, Question } from "../../../providers/types";

function shuffleQuestions(questions: Question[]) {
  const newQuestions = questions.map((q) => {
    return { ...q, options: shuffle(q.options) };
  });
  return shuffle(newQuestions);
}

function LessonApp() {
  const router = useRouter();
  const { lessonId } = router.query;
  const { data } = useSWR(
    () => (lessonId ? `${API_URL}/lessons/${lessonId}` : null),
    niceFetch
  );
  const lesson: Lesson | null = data?.lesson;

  const handleClose = () => {
    const reallyClose = confirm(
      "Weet je het zeker dat je wilt stoppen? Je voortgang gaat verloren."
    );
    if (!reallyClose) return;
    sessionStorage.clear();
    router.push(`/lessen/${data.lesson.id}/`);
  };

  return (
    <>
      <AppHead>
        <title>Oefenen {data?.lesson?.title} | Wizer.Today</title>
      </AppHead>
      <NavBar>
        <ButtonGroup>
          <CloseButton onClick={handleClose} size="md" />
        </ButtonGroup>
      </NavBar>
      {lesson ? (
        <QuestionsForm
          initialQuestions={
            lesson.shuffle
              ? shuffleQuestions(lesson.questions)
              : lesson.questions
          }
          lessonId={data.lesson.id}
        />
      ) : (
        <FullScreenSpinner />
      )}
    </>
  );
}

export default LessonApp;
