import { Box, Flex, RadioProps, useRadio } from "@chakra-ui/react";
import React, { FC } from "react";

export interface RadioCardProps extends RadioProps {
  isDisabled?: boolean;
}

const RadioCard: FC<RadioCardProps> = ({ children, ...rest }) => {
  const { getInputProps, getCheckboxProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        bg="gray.100"
        borderColor="gray.100"
        minW="200px"
        _checked={{
          bg: "blue.200",
          color: "black",
          borderColor: "blue.200",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        _disabled={{
          cursor: "not-allowed",
        }}
        px={5}
        py={3}
        width="100%"
        {...rest}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default RadioCard;
