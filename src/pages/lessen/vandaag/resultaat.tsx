import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GiLightBulb } from "react-icons/gi";
import DefaultLayout from "@components/DefaultLayout";
import LoginAlert from "@components/quiz/LoginAlert";

function ResultPage() {
  const router = useRouter();
  const { pointsEarned } = router.query;

  return (
    <>
      <LoginAlert />
      <DefaultLayout
        pageTitle="Lesresultaat"
        headingText="Goed gedaan!"
        centered
      >
        <Flex p={8} flexDirection="column" width="100%" alignItems="center">
          <Flex
            maxW="lg"
            flexDirection="column"
            width="100%"
            alignItems="center"
          >
            <Box size={75} as={GiLightBulb} color="yellow.400" />
            <Text textAlign="center" fontSize="lg" my={10}>
              Je hebt al je oefenen van vandaag gedaan. <br />
              Daarmee heb je <b>{pointsEarned || "0"}</b> lampjes verdiend!
            </Text>
            <ButtonGroup
              mt={4}
              display="flex"
              width="100%"
              justifyContent="space-between"
            >
              <Button
                ml="auto"
                onClick={() =>
                  router.push(`/start`).then(() => window.scrollTo(0, 0))
                }
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
