import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";
import { VscSave } from "react-icons/vsc";

export interface SaveButtonProps extends ButtonProps {}

const SaveButton: FC<SaveButtonProps> = ({ children, ...rest }) => {
  return (
    <Button leftIcon={<VscSave />} variant="primary" {...rest}>
      {children || "Opslaan"}
    </Button>
  );
};

export default SaveButton;
