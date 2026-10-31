import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { forwardRef } from "react";

interface Props extends LinkProps {
  href: string;
}

const TextLink = forwardRef<HTMLAnchorElement, Props>(function TextLink(
  { href, children, ...rest },
  ref
) {
  return (
    <Link as={NextLink} href={href} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

export default TextLink;
