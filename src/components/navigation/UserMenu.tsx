import { Avatar, Menu, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { api } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { NextRouter } from "next/router";
import React, { FC } from "react";
import { User } from "../../types";
import MyMenuButton from "./MyMenuButton";
import UserStats from "./UserStats";

export interface AccountMenuProps {
  user: User;
  router: NextRouter;
}

const AccountMenu: FC<AccountMenuProps> = ({ router, user }) => {
  const { mutate } = useSession();

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
            onClick={() =>
              router.push("/account").then(() => window.scrollTo(0, 0))
            }
          >
            Je profiel <UserStats user={user} />
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await api.post("logout");
              mutate!();
              router
                .push("/account/inloggen")
                .then(() => window.scrollTo(0, 0));
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
