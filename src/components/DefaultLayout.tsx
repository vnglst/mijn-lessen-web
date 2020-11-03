import { Heading } from "@chakra-ui/core";
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
    <>
      <AppHead>
        <title>{pageTitle} | Wiser.Today</title>
      </AppHead>
      <header>
        <NavBar />
      </header>
      <HeroWave>
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
      </HeroWave>
      {children}
    </>
  );
};

export default DefaultLayout;
