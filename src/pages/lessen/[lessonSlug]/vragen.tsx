import Quiz from "@components/quiz/Quiz";
import QuizContainer from "@components/quiz/QuizContainer";
import { levelUp } from "@components/quiz/QuizSounds";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { api } from "@helpers/api";
import { shuffle } from "@helpers/random";
import { useSession } from "@hooks/useSession";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import {
  Activity,
  ActivityTypes,
  Lesson,
  Question,
  Status,
} from "../../../types";

function shuffleQuestions(questions: Question[]) {
  const newQuestions = questions.map((q) => {
    return { ...q, options: shuffle(q.options) };
  });
  return shuffle(newQuestions);
}

function QuestionsPage() {
  const router = useRouter();
  const { session, mutate: mutateSession } = useSession();
  const slug = router.query.lessonSlug as string;

  const { data: lesson }: { data?: Lesson } = useQuery(
    [`lessons/${slug}`, slug],
    { enabled: !!slug }
  );

  const handleClose = () => {
    const reallyClose = confirm(
      "Weet je het zeker dat je wilt stoppen? Je voortgang gaat verloren."
    );
    if (!reallyClose) return;
    sessionStorage.clear();
    router.push(`/lessen/${slug}/`).then(() => window.scrollTo(0, 0));
  };

  const handleComplete = async () => {
    let pointsEarned = 0;

    if (session?.user) {
      const activity: Activity | null = await api
        .put("protected/activities", {
          json: {
            lessonId: lesson!.id,
            type: "LESSON_COMPLETE" as ActivityTypes,
          },
        })
        .json();

      await api.post("protected/stats", {
        json: {
          lessonId: lesson!.id,
          status: "COMPLETED" as Status,
        },
      });

      pointsEarned = activity?.pointsEarned || 0;
      if (pointsEarned) levelUp.play();
      mutateSession!();
    }

    return router
      .push(`/lessen/${slug}/resultaat?pointsEarned=${pointsEarned}`)
      .then(() => {
        window.scrollTo(0, 0);
        return true;
      });
  };

  return (
    <QuizContainer onClose={handleClose}>
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
    </QuizContainer>
  );
}

export default QuestionsPage;
