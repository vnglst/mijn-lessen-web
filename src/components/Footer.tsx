import { Flex, Text, FlexProps } from "@chakra-ui/react";
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
        <TextLink textDecoration="none" href="/#">
          Algemene voorwaarden
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="/#">
          Privacybeleid
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="/#">
          Over mijn-lessen.nl
        </TextLink>{" "}
        |{" "}
        <TextLink textDecoration="none" href="/#">
          v1.1
        </TextLink>
        ,{" "}
        <TextLink textDecoration="none" href="/#">
          8de7cc9
        </TextLink>
      </Text>
    </Flex>
  );
};

export default Footer;
