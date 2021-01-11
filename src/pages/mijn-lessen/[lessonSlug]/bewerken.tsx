import DefaultLayout from "@components/DefaultLayout";
import LessonEditor from "@components/editor/LessonEditor";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { Lesson } from "../../../types";

const EditLesson: FC = () => {
  const router = useRouter();
  const { lessonSlug } = router.query;

  const { data: lesson }: { data?: Lesson } = useQuery(
    [`lessons/${lessonSlug}`, lessonSlug],
    { enabled: !!lessonSlug }
  );

  return (
    <DefaultLayout
      pageTitle={`Bewerken les: ${lesson?.title || ""}`}
      headingText="Les bewerken"
      showFooter={false}
    >
      {lesson ? <LessonEditor lesson={lesson} /> : <FullScreenSpinner />}
    </DefaultLayout>
  );
};

export default EditLesson;
