import { AddIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import { default as React, FC } from "react";
import NewLessonModal from "../editor/NewLessonModal";
import MyMenuButton from "./MyMenuButton";

export interface CreateMenuProps {
  router: NextRouter;
}

const CreateMenu: FC<CreateMenuProps> = ({ router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MyMenuButton>
          <AddIcon fontSize="xs" />
          <VisuallyHidden>Les toevoegen</VisuallyHidden>
        </MyMenuButton>
        <MenuList>
          <MenuGroup title={`Jouw lessen`}>
            <MenuItem onClick={onOpen}>Nieuwe les maken</MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/mijn-lessen/").then(() => window.scrollTo(0, 0));
              }}
            >
              Al mijn lessen
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <NewLessonModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreateMenu;
