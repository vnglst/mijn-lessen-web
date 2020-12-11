import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";

const CenteredLayout: FC = ({ children }) => {
  return (
    <Flex p={8} flexDirection="column" width="100%" alignItems="center">
      <Flex maxW="lg" textAlign="center" flexDir="column">
        {children}
      </Flex>
    </Flex>
  );
};

export default CenteredLayout;
