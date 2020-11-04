import {
  Button,
  ButtonGroup,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/core";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { niceFetch } from "../..";
import DefaultLayout from "../../../components/DefaultLayout";
import { API_URL } from "../../../config";
import uniqBy from "lodash/uniqBy";

function ResultPage() {
  const router = useRouter();
  const { lessonId } = router.query;

  const { data } = useSWR(
    () => (lessonId ? `${API_URL}/answers/?lessonId=${lessonId}` : null),
    niceFetch
  );

  const answers = (data && data.answers) || [];
  const numberOfQuestions = uniqBy(answers, "questionId").length;
  const mistakes = answers.filter((a) => !a.option.correct) || [];
  const uniqueMistakes = uniqBy(mistakes, "questionId");
  const numberOfMistakes = uniqueMistakes.length;

  const percentage =
    100 - Math.round(numberOfMistakes / numberOfQuestions) * 100;
  const passed = percentage > 80;

  return (
    <DefaultLayout
      pageTitle="Resultaat"
      headingText={passed ? `Goed gedaan!` : `Blijf oefenen!`}
      centered
    >
      <Flex p={8} flexDirection="column" width="100%" alignItems="center">
        <Flex
          maxW="lg"
          flexDirection="column"
          width="100%"
          alignItems="flex-start"
        >
          <Text fontSize="lg" py={5}>
            Van de {numberOfQuestions} vragen had je er {numberOfMistakes} fout.
          </Text>
          <List spacing={3}>
            {uniqueMistakes.map((a) => {
              return (
                <ListItem key={a.id}>
                  {a.option.correct ? (
                    <ListIcon as={MdCheckCircle} color="green.500" />
                  ) : (
                    <ListIcon as={MdCancel} color="red.500" />
                  )}
                  {a.question.title}? {a.option.title}
                </ListItem>
              );
            })}
          </List>
          <Text fontSize="lg" py={5}>
            Je had dus {percentage}% van de vragen goed.
          </Text>
          <Button
            mt={4}
            mx="auto"
            onClick={() => {
              sessionStorage.clear();
              router.push(`/lessen/${lessonId}/`);
            }}
            variant="my-green"
          >
            NAAR BEGIN
          </Button>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default ResultPage;
