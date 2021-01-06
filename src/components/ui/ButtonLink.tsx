import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";
import TextLink from "./TextLink";

interface Props extends ButtonProps {
  href: string;
}

const ButtonLink: FC<Props> = ({ children, href, ...rest }) => {
  return (
    <Button
      textDecoration="none"
      as={TextLink}
      href={href}
      _hover={{
        textDecoration: "none",
        boxShadow: "4px 4px 0px #333;",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonLink;
