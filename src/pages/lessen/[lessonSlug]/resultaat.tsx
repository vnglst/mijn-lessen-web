import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GiLightBulb } from "react-icons/gi";
import DefaultLayout from "../../../components/DefaultLayout";
import LoginAlert from "../../../components/quiz/LoginAlert";

function ResultPage() {
  const router = useRouter();
  const { lessonSlug, pointsEarned } = router.query;

  return (
    <>
      <LoginAlert />
      <DefaultLayout pageTitle="Resultaat" headingText="Goed gedaan!" centered>
        <Flex p={8} flexDirection="column" width="100%" alignItems="center">
          <Flex
            maxW="lg"
            flexDirection="column"
            width="100%"
            alignItems="center"
          >
            <Box size={75} as={GiLightBulb} color="yellow.400" />
            <Text textAlign="center" fontSize="lg" my={10}>
              {!pointsEarned || pointsEarned === "0" ? (
                <>
                  Je had deze punten al eens verdiend. <br />
                  Goed dat je hem nog een keer hebt gedaan!
                </>
              ) : (
                <>
                  Je hebt <b>{pointsEarned}</b> lampjes verdiend
                </>
              )}
            </Text>
            <ButtonGroup
              mt={4}
              display="flex"
              width="100%"
              justifyContent="space-between"
            >
              <Button
                onClick={() => {
                  router.push(`/lessen/${lessonSlug}/`);
                }}
              >
                Nog een keer
              </Button>
              <Button
                onClick={() => {
                  router.push(`/`);
                }}
                variant="primary"
              >
                Meer lessen
              </Button>
            </ButtonGroup>
          </Flex>
        </Flex>
      </DefaultLayout>
    </>
  );
}

export default ResultPage;
