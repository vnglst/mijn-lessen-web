import { Box } from "@chakra-ui/react";
import { zIndexes } from "@helpers/constants";
import React, { FC } from "react";

export interface UnderlineProps {
  color?: string;
  height?: number;
  bottom?: number;
}

const Underline: FC<UnderlineProps> = ({
  color = "brand.200",
  height = 6,
  bottom = 0,
  children,
}) => {
  return (
    <Box as={"span"} position="relative">
      <Box
        as={"span"}
        position="absolute"
        width="100%"
        height={height}
        bg={color}
        left={0}
        bottom={bottom}
        zIndex={zIndexes.ground}
      ></Box>
      <Box as={"span"} position="relative">
        {children}
      </Box>
    </Box>
  );
};

export default Underline;
