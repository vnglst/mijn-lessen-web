import { ButtonGroup, CloseButton, Center, Spinner } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { niceFetch } from "../..";
import AppHead from "../../../components/Head";
import HeroWave from "../../../components/HeroWave";
import NavBar from "../../../components/NavBar";
import { API_URL } from "../../../config";
import Questions from "../../../components/QuestionsForm";

// const useBeforeUnload = (value: ((evt: BeforeUnloadEvent) => any) | string) => {
//   const handleBeforeunload = (evt: BeforeUnloadEvent) => {
//     let returnValue;
//     if (typeof value === "function") {
//       returnValue = value(evt);
//     } else {
//       returnValue = value;
//     }
//     if (returnValue) {
//       evt.preventDefault();
//       evt.returnValue = returnValue;
//     }
//     return returnValue;
//   };

//   useEffect(() => {
//     window.addEventListener("beforeunload", handleBeforeunload);
//     return () => window.removeEventListener("beforeunload", handleBeforeunload);
//   }, []);
// };

function LessonApp() {
  // useBeforeUnload(
  //   "Wijzigingen worden niet opgeslagen. Weet je zeker dat je wilt herladen?"
  // );

  const router = useRouter();
  const { lessonId } = router.query;
  const { data } = useSWR(
    () => (lessonId ? `${API_URL}/lessons/${lessonId}` : null),
    niceFetch
  );

  const handleClose = () => {
    // TODO: use Alert Dialog
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
          <CloseButton onClick={handleClose} size="md" p="20px" />
        </ButtonGroup>
      </NavBar>
      {data ? (
        <Questions
          initialQuestions={data.lesson.questions}
          lessonId={data.lesson.id}
        />
      ) : (
        <HeroWave>
          <Center width="100%" marginTop="auto">
            <Spinner thickness="4px" size="lg" color="gray.600" />
          </Center>
        </HeroWave>
      )}
    </>
  );
}

export default LessonApp;
