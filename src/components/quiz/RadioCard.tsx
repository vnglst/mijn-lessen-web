import {
  Box,
  Flex,
  SystemStyleObject,
  UseRadioProps,
  useRadio,
} from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";

export interface RadioCardProps extends UseRadioProps {
  _checked?: SystemStyleObject;
}

const RadioCard: FC<PropsWithChildren<RadioCardProps>> = ({
  children,
  ...rest
}) => {
  const { getInputProps, getRadioProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getRadioProps() as object;

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
      >
        {children}
      </Flex>
    </Box>
  );
};

export default RadioCard;
