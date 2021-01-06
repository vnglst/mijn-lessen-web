import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Footer from "@components/Footer";
import AppHead from "@components/Head";
import Number from "@components/landingpage/Number";
import Video from "@components/landingpage/Video";
import TextLink from "@components/ui/TextLink";
import ButtonLink from "@components/ui/ButtonLink";
import WaveSvg from "@components/ui/WaveSvg";
import NextLink from "next/link";
import NextImage from "next/image";
import React, { FC } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Index: FC = () => {
  return (
    <Flex
      flexDir="column"
      backgroundImage="url('https://res.cloudinary.com/mijn-lessen-nl/image/upload/f_auto,q_auto/v1609785618/background.png')"
    >
      <AppHead
        title="Actief en zelfstandig leren"
        description="Op Mijn Lessen bedenk je zelf lessen. Daardoor leer je actief, zelfstandig en vergeet je nooit meer wat je hebt geleerd. Ideaal slimme kids of voor ouders die zelf bijles willen geven aan hun kind."
      />
      <Box>
        <WaveSvg />
        <NextLink href="/account/" passHref>
          <Button
            variant="link"
            as={"a"}
            position="absolute"
            right={0}
            top={0}
            m={[0, 4]}
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
        maxW="1500px"
        mx="auto"
        wrap="nowrap"
        minH="70vh"
        px={[4, 8]}
        mt={[10, 0]}
      >
        <Stack
          w={{ base: "80%", lg: "40%" }}
          align={["center", "center", "flex-start"]}
          mb={10}
        >
          <Box mb={6}>
            <NextImage
              height="74"
              width="190"
              src="/images/mijn-lessen-logo.png"
              alt="Mijn-Lessen.nl"
            />
          </Box>
          <Text
            mt={6}
            fontSize="xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Maak samen met je kinderen extra lessen. Als bijles of als extra
            uitdaging. Ben je benieuwd wat de{" "}
            <Tooltip
              label="Mijn-lessen.nl is vollop in ontwikkeling en nog niet geschikt voor het
      grote publiek. Maar als je wilt, kun je wel alvast een kijkje nemen."
              aria-label="A tooltip"
            >
              <Text as="span" color="cyan.800">
                preview
              </Text>
            </Tooltip>{" "}
            van Mijn Lessen te bieden heeft? Hieronder vind je de 4
            belangrijkste features.
          </Text>
          <ButtonGroup
            pt={8}
            justifyContent="space-between"
            mx="auto"
            width="100%"
            maxW="md"
            flexDir={["column", "row"]}
          >
            <ButtonLink
              variant="primary"
              mb={5}
              as={TextLink}
              href="/account"
              textDecoration="none"
              rightIcon={<ArrowForwardIcon />}
            >
              Bekijk de preview
            </ButtonLink>
            <ButtonLink as={TextLink} href="/#maak-je-eigen">
              Meer informatie
            </ButtonLink>
          </ButtonGroup>
        </Stack>
        <Box
          w={{ base: "100%", md: "80%", lg: "45%" }}
          m={{ base: 12, md: 0 }}
          position="relative"
          borderRadius={5}
          overflow="hidden"
        >
          <Image
            src="https://res.cloudinary.com/mijn-lessen-nl/image/upload/f_auto,q_auto/v1609958696/kids.jpg"
            alt=""
          />
        </Box>
      </Flex>

      <Flex
        id="maak-je-eigen"
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
            fontSize="xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Dat doe je als ouder samen met je kind, maar kinderen vinden het ook
            leuk om hun eigen lessen te maken. Ze weten vaak zelf het beste wat
            ze moelijk vinden. En door zelf lessen te maken, gaan ze actief met
            de stof aan de slag.
          </Text>
          <Text fontSize="xs" pt={2} textAlign="center" color="gray.600">
            <sup>*</sup> in de previewversie kunnen alleen betatesters zelf
            lessen maken.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/jQaqRkL.mp4" autoplay />
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
            fontSize="xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Beantwoord de vragen. Als je alle vragen goed hebt beantwoord, krijg
            je als beloning voor elke vraag een lampje. Als je veel lampjes hebt
            verdiend, ben je goed bezig.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/mihBmpR.mp4" />
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
            my={6}
            lineHeight={1.5}
            fontSize="xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Goede lessen kun je op Mijn Lessen ook met anderen delen. Er staan
            nu nog niet zoveel lessen in, maar als iedereen zijn lesje
            bijdraagt, verandert dat natuurlijk snel.
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
        mt={10}
        mb={16}
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
            fontSize="xl"
            textColor="gray.500"
            textAlign={["center", "center", "left"]}
          >
            Elke dag verzamelt Mijn Lessen de vragen die je moeilijk vindt in
            een speciale les. Als je deze les dagelijks doet, vergeet je nooit
            meer wat je geleerd hebt.
          </Text>
        </Stack>
        <Video url="https://i.imgur.com/GwR6NlE.mp4" />
      </Flex>
      <Footer p={8} justifyContent="flex-end" />
    </Flex>
  );
};

export default Index;
