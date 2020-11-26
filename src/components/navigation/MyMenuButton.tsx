import { Button, MenuButton as ChakraMenuButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FC } from "react";

export interface MyMenuButtonProps {}

const MyMenuButton: FC<MyMenuButtonProps> = ({ children }) => {
  return (
    <ChakraMenuButton
      as={Button}
      bg="transparent"
      _hover={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
      _active={{ boxShadow: "none" }}
      size="sm"
      rightIcon={<ChevronDownIcon />}
    >
      {children}
    </ChakraMenuButton>
  );
};

export default MyMenuButton;
