import { Flex, Heading } from "@chakra-ui/react";
import React, { FC } from "react";

export interface NumberProps {}

const Number: FC<NumberProps> = ({ children }) => {
  return (
    <Flex
      borderRadius="100%"
      bg="cyan.100"
      display="inline-flex"
      justifyContent="center"
      justifyItems="center"
      h={16}
      w={16}
    >
      <Heading as="span" m="auto" color="cyan.800" size="lg">
        {children}
      </Heading>
    </Flex>
  );
};

export default Number;
