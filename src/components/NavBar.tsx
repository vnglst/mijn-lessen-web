import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/core";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { default as React, FC } from "react";
import { mutate } from "swr";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { useSession } from "../providers";

const AccountMenu: FC = () => {
  const session = useSession();
  const router = useRouter();

  const withUser = () => (
    <MenuGroup title={`Ingelogd als ${session?.user.name}`}>
      <MenuItem
        onClick={() => {
          router.push("/account");
        }}
      >
        Je profiel
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
        _hover={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        _active={{
          boxShadow: "none",
        }}
        padding={0}
        rightIcon={<ChevronDownIcon />}
      >
        {session?.user?.name ? (
          <Avatar
            size="sm"
            bgColor="white"
            name={session?.user?.name}
            src={session?.user?.avatar}
          />
        ) : (
          "Inloggen"
        )}
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
                    <Heading
                      as="a"
                      fontSize="md"
                      noOfLines={2}
                      fontWeight="900"
                      lineHeight={1.4}
                    >
                      Wizer.
                      <br />
                      Today
                    </Heading>
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
