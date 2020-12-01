import { ButtonGroup, CloseButton } from "@chakra-ui/react";
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
import { ActivityTypes, Lesson, Question } from "../../../types";
import { shuffle } from "@helpers/random";
import { niceFetch } from "@helpers/niceFetch";
import { useSession } from "@hooks/useSession";
import useSound from "use-sound";

function shuffleQuestions(questions: Question[]) {
  const newQuestions = questions.map((q) => {
    return { ...q, options: shuffle(q.options) };
  });
  return shuffle(newQuestions);
}

function QuestionsPage() {
  const router = useRouter();
  const [playLevelUp] = useSound("/sounds/blessing.mp3", { volume: 1 });
  const { session, mutate: mutateSession } = useSession();
  const slug = router.query.lessonSlug as string;

  const { data } = useSWR(
    () => (slug ? `${API_URL}/lessons/${slug}` : null),
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

  const handleComplete = async () => {
    let pointsEarned = 0;

    if (session?.user) {
      const activity = await niceFetch(`${API_URL}/protected/activity`, {
        method: "PUT",
        body: JSON.stringify({
          lessonId: lesson!.id,
          type: ActivityTypes.LESSON_COMPLETE,
        }),
      });

      await niceFetch(`${API_URL}/protected/stats`, {
        method: "POST",
        body: JSON.stringify({
          lessonId: lesson!.id,
          status: "COMPLETED",
        }),
      });

      pointsEarned = activity.pointsEarned;
      if (pointsEarned) playLevelUp();
      mutateSession?.();
    }

    router.push(`/lessen/${slug}/resultaat?pointsEarned=${pointsEarned}`);
  };

  return (
    <>
      <AppHead>
        <title>Oefenen {data?.lesson?.title} | mijn-lessen.nl</title>
      </AppHead>
      <LoginAlert />
      <HeroWave />
      <NavBarTop>
        <ButtonGroup>
          <CloseButton onClick={handleClose} size="md" />
        </ButtonGroup>
      </NavBarTop>
      {lesson ? (
        <Quiz
          id={slug}
          onComplete={handleComplete}
          questions={
            lesson.shuffle
              ? shuffleQuestions(lesson.questions)
              : lesson.questions
          }
        />
      ) : (
        <FullScreenSpinner />
      )}
    </>
  );
}

export default QuestionsPage;
