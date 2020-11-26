import { Avatar, Menu, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { NextRouter } from "next/router";
import React, { FC } from "react";
import { mutate } from "swr";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { User } from "../../types";
import MyMenuButton from "./MyMenuButton";
import UserStats from "./UserStats";

export interface AccountMenuProps {
  user: User;
  router: NextRouter;
}

const AccountMenu: FC<AccountMenuProps> = ({ router, user }) => {
  return (
    <Menu>
      <MyMenuButton>
        <Avatar size="sm" bgColor="white" name={user.name} src={user.avatar} />
      </MyMenuButton>
      <MenuList>
        <MenuGroup title={`Ingelogd als ${user.name}`}>
          <MenuItem
            display="flex"
            justifyContent="space-between"
            onClick={() => router.push("/account")}
          >
            Je profiel <UserStats user={user} />
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await niceFetch(`${API_URL}/logout`);
              mutate(`${API_URL}/session`, {});
              router.push("/account/inloggen");
            }}
          >
            Uitloggen
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default AccountMenu;
