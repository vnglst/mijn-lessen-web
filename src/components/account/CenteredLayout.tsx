import { Flex } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";

const CenteredLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex p={8} flexDirection="column" width="100%" alignItems="center">
      <Flex maxW="lg" textAlign="center" flexDir="column">
        {children}
      </Flex>
    </Flex>
  );
};

export default CenteredLayout;
