import { Box, Flex, Heading } from "@chakra-ui/core";
import { default as React, FC } from "react";
import AppHead from "../components/Head";
import HeroWave from "../components/HeroWave";
import NavBar from "../components/NavBar";

interface Props {
  pageTitle: string;
  headingText: string;
  centered?: boolean;
}

const DefaultLayout: FC<Props> = ({
  pageTitle,
  headingText,
  children,
  centered = false,
}) => {
  return (
    <Box id="main" minHeight="100vh" display="flex" flexDirection="column">
      <AppHead>
        <title>{pageTitle} | Wizer.Today</title>
      </AppHead>
      <header>
        <NavBar />
      </header>
      <HeroWave>
        <Flex maxW="lg">
          <Heading
            as="h1"
            size="xl"
            marginTop="auto"
            fontWeight="900"
            noOfLines={3}
            textColor="gray.800"
            lineHeight={1.6}
            textAlign={centered ? "center" : "left"}
            p={10}
          >
            {headingText}
          </Heading>
        </Flex>
      </HeroWave>
      {children}
      <Flex
        width="100%"
        mt="auto"
        height="100%"
        pt={20}
        pb={5}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        // background="radial-gradient(202.15% 198.95% at 85.93% -78.83%, #FFFFFF 48.72%, #E1F4FF 82.16%);"
        background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#FFFFFF 48.72%,#fef4e2 82.16%);"
      >
        {/* <Text textColor="gray.500" fontSize="xs">
          met{" "}
          <Text as="span" textColor="tomato">
            ♥️
          </Text>{" "}
          gemaakt door <br />
          <Link href="https://koenvangilst.nl">Koen van Gilst</Link> <br />v
          .... commit xxxxxx
        </Text> */}
      </Flex>
    </Box>
  );
};

export default DefaultLayout;
