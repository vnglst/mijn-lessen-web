import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

export interface UnderlineProps {
  color?: string;
}

const Underline: FC<UnderlineProps> = ({ color = "brand.200", children }) => {
  return (
    <Box as={"span"} position="relative">
      <Box as={"span"} position="relative" zIndex="10">
        {children}
      </Box>
      <Box
        as={"span"}
        position="absolute"
        width="100%"
        height={6}
        bg={color}
        left={0}
        bottom={0}
      ></Box>
    </Box>
  );
};

export default Underline;
