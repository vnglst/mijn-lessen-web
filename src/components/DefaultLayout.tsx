import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { default as React, FC } from "react";
import AppHead from "./Head";
import Footer from "./Footer";
import NavBarTop from "./navigation/NavBarTop";
import HeroWave from "./ui/HeroWave";

interface Props {
  pageTitle: string;
  headingText: string;
  centered?: boolean;
  subtitle?: string | null;
  imageUrl?: string | null;
  showFooter?: boolean;
}

const DefaultLayout: FC<Props> = ({
  pageTitle,
  headingText,
  children,
  centered = false,
  showFooter = true,
  subtitle,
  imageUrl,
}) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppHead title={pageTitle} />
      <NavBarTop />
      <HeroWave />
      <Container
        display="flex"
        mt="25vh"
        justify="space-between"
        maxWidth="2xl"
      >
        <Flex flexDirection="column" width="100%">
          <Heading
            as="h1"
            size="2xl"
            mt="auto"
            fontWeight="900"
            noOfLines={3}
            textColor="gray.800"
            textAlign={centered ? "center" : "left"}
          >
            {headingText}
          </Heading>
          {subtitle && (
            <Text
              mt={1}
              fontSize="lg"
              color="gray.700"
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
            borderRadius={10}
            style={{ transform: "rotate(5deg)" }}
          />
        )}
      </Container>
      <Flex
        as="main"
        width="100%"
        flexDirection="column"
        alignItems="center"
        mt={6}
        minHeight="100vh"
        backgroundImage="url('/images/background.png')"
      >
        {children}
      </Flex>
      {showFooter && <Footer pt="10vh" p={8} justifyContent="flex-end" />}
    </Box>
  );
};

export default DefaultLayout;
