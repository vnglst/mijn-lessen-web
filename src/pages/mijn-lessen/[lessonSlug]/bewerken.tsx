import DefaultLayout from "@components/DefaultLayout";
import LessonEditor from "@components/editor/LessonEditor";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { niceApi } from "@helpers/niceFetch";
import { useRouter } from "next/router";
import React, { FC } from "react";
import useSWR from "swr";
import { LessonSWR } from "../../../types";

const EditLesson: FC = () => {
  const router = useRouter();
  const { lessonSlug } = router.query;
  const { data: lesson, mutate }: LessonSWR = useSWR(
    () => (lessonSlug ? `lessons/${lessonSlug}` : null),
    niceApi
  );

  return (
    <DefaultLayout
      pageTitle={`Bewerken les: ${lesson?.title || ""}`}
      headingText="Les bewerken"
      showFooter={false}
    >
      {lesson ? (
        <LessonEditor mutate={mutate} lesson={lesson} />
      ) : (
        <FullScreenSpinner />
      )}
    </DefaultLayout>
  );
};

export default EditLesson;
