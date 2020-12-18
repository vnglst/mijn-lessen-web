import { Menu, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { NextRouter } from "next/router";
import React, { FC } from "react";
import MyMenuButton from "./MyMenuButton";

export interface LoginMenuProps {
  router: NextRouter;
}

const LoginMenu: FC<LoginMenuProps> = ({ router }) => {
  return (
    <Menu>
      <MyMenuButton>Inloggen</MyMenuButton>
      <MenuList>
        <MenuGroup title="Account">
          <MenuItem
            onClick={() =>
              router.push("/account/inloggen").then(() => window.scrollTo(0, 0))
            }
          >
            Inloggen
          </MenuItem>
          <MenuItem
            onClick={() =>
              router
                .push("/account/registreren")
                .then(() => window.scrollTo(0, 0))
            }
          >
            Nieuw account
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default LoginMenu;
