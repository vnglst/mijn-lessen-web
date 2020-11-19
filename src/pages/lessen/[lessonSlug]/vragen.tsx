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
import { niceFetch } from "../../../helpers";
import { Lesson } from "../../../providers/types";

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
      {lesson ? <Quiz lesson={lesson} /> : <FullScreenSpinner />}
    </>
  );
}

export default LessonApp;
