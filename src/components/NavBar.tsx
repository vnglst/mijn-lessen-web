import {
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { default as React, FC } from "react";
import { mutate } from "swr";
import { API_URL } from "../config";
import { niceFetch } from "../pages";
import { useSession } from "../providers";

const AccountMenu: FC = () => {
  const { session } = useSession();
  const router = useRouter();

  const withUser = () => (
    <MenuGroup title="Account">
      <MenuItem
        onClick={() => {
          router.push("/account");
        }}
      >
        Your profile
      </MenuItem>
      <MenuItem
        onClick={async () => {
          await niceFetch(`${API_URL}/logout`);
          mutate(`${API_URL}/session`, {});
        }}
      >
        Logout
      </MenuItem>
    </MenuGroup>
  );

  const noUser = () => (
    <MenuGroup title="Account">
      <MenuItem
        onClick={() => {
          router.push("/account/inloggen");
        }}
      >
        Inloggen
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push("/account/registreren");
        }}
      >
        Nieuw account
      </MenuItem>
    </MenuGroup>
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        _active={{
          boxShadow: "none",
        }}
        padding={0}
        rightIcon={<ChevronDownIcon />}
      >
        {session?.user?.name || "Inloggen"}
      </MenuButton>
      <MenuList>{session?.user ? withUser() : noUser()}</MenuList>
    </Menu>
  );
};

const NavBar: FC = ({ children }) => {
  return (
    <header>
      <nav>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          position="absolute"
          zIndex="1"
          py={3}
          px={4}
        >
          {children || (
            <>
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  <NextLink href="/" passHref>
                    <Text as="a" fontSize="md" noOfLines={2} fontWeight="900">
                      Wizer.
                      <br />
                      Today
                    </Text>
                  </NextLink>
                </Box>
              </Flex>
              <Box>
                <AccountMenu />
              </Box>
            </>
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default NavBar;
