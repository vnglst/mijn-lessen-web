import { Button, ButtonProps, Spinner } from "@chakra-ui/core";
import { CheckIcon } from "@chakra-ui/icons";
import React, { FC } from "react";
import { VscSave } from "react-icons/vsc";

export interface SaveButtonProps extends ButtonProps {
  saving: boolean;
  saved: boolean;
  unsaved: boolean;
  onClick: (e: any) => Promise<void>;
}

const SaveButton: FC<SaveButtonProps> = ({
  saving,
  saved,
  unsaved,
  onClick: handleSave,
  children,
  ...rest
}) => {
  function getSaveIcon() {
    if (saved) return <CheckIcon />;
    if (saving) return <Spinner size="xs" />;
    if (unsaved) return <VscSave />;
  }

  return (
    <Button
      leftIcon={getSaveIcon()}
      variant="primary"
      onClick={handleSave}
      isDisabled={saving}
      {...rest}
    >
      {children || "Bewaren"}
    </Button>
  );
};

export default SaveButton;
