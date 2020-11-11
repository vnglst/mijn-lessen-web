import { Link, LinkProps } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { FC } from "react";

interface Props extends LinkProps {
  href: string;
}

const TextLink: FC<Props> = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <Link {...rest}>{children}</Link>
    </NextLink>
  );
};

export default TextLink;
