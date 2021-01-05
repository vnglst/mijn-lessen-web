import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Footer from "@components/Footer";
import AppHead from "@components/Head";
import Number from "@components/landingpage/Number";
import Video from "@components/landingpage/Video";
import WaveSvg from "@components/ui/WaveSvg";
import NextLink from "next/link";
import React, { FC } from "react";

const Index: FC = () => {
  return (
    <Flex
      flexDir="column"
      backgroundImage="url('https://res.cloudinary.com/mijn-lessen-nl/image/upload/f_auto,q_auto/v1609785618/background.png')"
    >
      <AppHead title="Home" />
      <Box>
        <WaveSvg />
        <NextLink href="/account/" passHref>
          <Button
            variant="link"
            as={"a"}
            position="absolute"
            right={0}
            top={0}
            m={[1, 4]}
            color="black"
          >
            Inloggen
          </Button>
        </NextLink>
      </Box>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-around" }}
        direction={{ base: "column", lg: "row" }}
        wrap="nowrap"
        minH="70vh"
        px={[4, 8]}
        mb={16}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", lg: "40%" }}
          align={["center", "center", "flex-start"]}
        >
          <Number>01</Number>
          <Heading
            size="3xl"
            color="gray.900"
            fontWeight="bold"
            textAlign={["center", "center", "left"]}
          >
            Maak je eigen lessen
          </Heading>
          <Text
            mt={6}
            lineHeight={1.5}
            fontSize="2xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Dat doe je als ouder samen met je kind, maar kinderen vinden het ook
            leuk om hun eigen lessen te maken. Ze weten vaak zelf het beste wat
            ze moelijk vinden. En door ze zelf lessen te laten maken, gaan ze
            actief met deze stof aan de slag.
          </Text>
          <Text fontSize="xs" pt={2} textAlign="center" color="gray.600">
            <sup>*</sup> in de previewversie kunnen alleen betatesters zelf
            lessen maken.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/jQaqRkL.mp4" />
      </Flex>

      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-around" }}
        direction={{ base: "column", lg: "row-reverse" }}
        wrap="nowrap"
        minH="70vh"
        px={[4, 8]}
        my={10}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", lg: "40%" }}
          align={["center", "center", "flex-start"]}
        >
          <Number>02</Number>
          <Heading
            size="3xl"
            color="gray.900"
            fontWeight="bold"
            textAlign={["center", "center", "left"]}
          >
            Oefen je lessen
          </Heading>
          <Text
            mt={6}
            lineHeight={1.5}
            fontSize="2xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Beantwoord de vragen. Een foutje maken is niet erg. Die komen in
            dezelfde les nog een keer terug. Bovendien zorgt het algoritme van
            Mijn Lessen ervoor dat deze vragen ook blijven terugkomen, zodat je
            ze nooit meer vergeet.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/26utmW5.mp4" />
      </Flex>

      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-around" }}
        direction={{ base: "column", lg: "row" }}
        wrap="nowrap"
        minH="70vh"
        px={[4, 8]}
        my={10}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", lg: "40%" }}
          align={["center", "center", "flex-start"]}
        >
          <Number>03</Number>
          <Heading
            size="3xl"
            color="gray.900"
            fontWeight="bold"
            textAlign={["center", "center", "left"]}
          >
            Bekijk de lessen van anderen
          </Heading>
          <Text
            mt={6}
            lineHeight={1.5}
            fontSize="2xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Goede lessen kun je op Mijn Lessen ook met anderen delen. Er staan
            nu nog niet zoveel lessen, maar als iedereen zijn lesje bijdraagt,
            verandert dat natuurlijk snel.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/S4O6SeT.mp4" />
      </Flex>

      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-around" }}
        direction={{ base: "column", lg: "row-reverse" }}
        wrap="nowrap"
        minH="70vh"
        px={[4, 8]}
        my={10}
      >
        <Stack
          spacing={4}
          w={{ base: "80%", lg: "40%" }}
          align={["center", "center", "flex-start"]}
        >
          <Number>04</Number>
          <Heading
            size="3xl"
            color="gray.900"
            fontWeight="bold"
            textAlign={["center", "center", "left"]}
          >
            Dagelijkse herhalingen
          </Heading>
          <Text
            mt={6}
            lineHeight={1.5}
            fontSize="2xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Elke dag verzamelt Mijn Lessen de vragen die je moeilijk vond in een
            speciale les. Als je deze les trouw doet, vergeet je nooit meer wat
            je geleerd hebt.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/GwR6NlE.mp4" />
      </Flex>
      <Footer p={8} justifyContent="flex-end" />
    </Flex>
  );
};

export default Index;
