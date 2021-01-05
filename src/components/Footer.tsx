import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import TextLink from "./ui/TextLink";

export interface FooterProps extends FlexProps {}

const Footer: FC<FooterProps> = ({ ...rest }) => {
  return (
    <Flex
      as="footer"
      width="100%"
      height="100%"
      flexDirection="row"
      background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#FFFFFF 48.72%,#fef4e2 82.16%);"
      {...rest}
    >
      <Text textColor="gray.500" fontSize="xs">
        <TextLink textDecoration="none" href="https://www.freepik.com/">
          Afbeeldingen afkomstig van Freepik
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="/#">
          Algemene voorwaarden
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="/#">
          Privacybeleid
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="https://status.mijn-lessen.nl">
          Status
        </TextLink>{" "}
        |{" "}
        <TextLink
          textDecoration="none"
          href={`https://github.com/vnglst/mijn-lessen-web/releases/tag/${process.env.NEXT_VERSION}`}
        >
          {process.env.NEXT_VERSION}
        </TextLink>
        ,{" "}
        <TextLink
          textDecoration="none"
          href={`https://github.com/vnglst/mijn-lessen-web/commit/${process.env.NEXT_GIT_SHA}`}
        >
          {process.env.NEXT_GIT_SHA}
        </TextLink>
      </Text>
    </Flex>
  );
};

export default Footer;
