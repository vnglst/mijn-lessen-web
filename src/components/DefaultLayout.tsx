import { Box, Flex, Heading, Image, Text, Container } from "@chakra-ui/core";
import { default as React, FC } from "react";
import AppHead from "../components/Head";
import HeroWave from "../components/HeroWave";
import NavBar from "../components/NavBar";
import TextLink from "./ui/TextLink";

interface Props {
  pageTitle: string;
  headingText: string;
  centered?: boolean;
  subtitle?: string;
  imageUrl?: string;
}

const DefaultLayout: FC<Props> = ({
  pageTitle,
  headingText,
  children,
  centered = false,
  subtitle,
  imageUrl,
}) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppHead>
        <title>{pageTitle} | Wizer.Today</title>
      </AppHead>
      <header>
        <NavBar />
      </header>
      <HeroWave>
        <Container display="flex" mt={14} justify="space-between">
          <Flex flexDirection="column" width="100%">
            <Heading
              as="h1"
              size="xl"
              mt="auto"
              fontWeight="900"
              noOfLines={3}
              textColor="gray.800"
              lineHeight={1.6}
              textAlign={centered ? "center" : "left"}
            >
              {headingText}
            </Heading>
            {subtitle && (
              <Text
                mt={2}
                fontSize="lg"
                textAlign={centered ? "center" : "left"}
              >
                {subtitle}
              </Text>
            )}
          </Flex>
          {imageUrl && (
            <Image
              display={["none", "flex"]}
              objectFit="contain"
              src={imageUrl}
              maxHeight="100px"
              style={{
                transform: "rotate(5deg)",
              }}
            />
          )}
        </Container>
      </HeroWave>
      <Flex as="main">{children}</Flex>
      <Flex
        as="footer"
        width="100%"
        mr="auto"
        height="100%"
        p={8}
        pt="400px"
        flexDirection="row"
        justifyContent="flex-end"
        background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#FFFFFF 48.72%,#fef4e2 82.16%);"
      >
        <Text textColor="gray.500" fontSize="xs">
          <TextLink textDecoration="none" href="#">
            Algemene voorwaarden
          </TextLink>{" "}
          |{" "}
          <TextLink textDecoration="none" href="#">
            Privacybeleid
          </TextLink>{" "}
          |{" "}
          <TextLink textDecoration="none" href="#">
            Over Wiser.Today
          </TextLink>{" "}
          |{" "}
          <TextLink textDecoration="none" href="#">
            v1.1
          </TextLink>
          ,{" "}
          <TextLink textDecoration="none" href="#">
            8de7cc9
          </TextLink>
        </Text>
      </Flex>
    </Box>
  );
};

export default DefaultLayout;
