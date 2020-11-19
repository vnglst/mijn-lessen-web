import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";
import DefaultLayout from "../../../components/DefaultLayout";
import LessonEditor from "../../../components/editor/LessonEditor";
import FullScreenSpinner from "../../../components/ui/FullScreenSpinner";
import { API_URL } from "../../../config";
import { niceFetch } from "../../../helpers";
import { Lesson } from "../../../providers/types";

const LessonOverview: FC = () => {
  const router = useRouter();
  const { lessonSlug } = router.query;
  const { data, mutate } = useSWR(
    () => (lessonSlug ? `${API_URL}/lessons/${lessonSlug}` : null),
    niceFetch
  );
  const lesson: Lesson | null = data?.lesson;

  return (
    <DefaultLayout
      pageTitle={`Bewerken les: ${lesson?.title}`}
      headingText="Les bewerken"
    >
      {lesson ? (
        <LessonEditor mutate={mutate} lesson={lesson} />
      ) : (
        <FullScreenSpinner />
      )}
    </DefaultLayout>
  );
};

export default LessonOverview;
