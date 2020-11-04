import {
  Avatar,
  Box,
  Button,
  Flex,
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
    <MenuGroup title={`Ingelogd als ${session?.user.name}`}>
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
            // bgColor="white"
            name={session?.user?.name}
            src="https://pbs.twimg.com/profile_images/984699772383744000/4pG8DS5n_reasonably_small.jpg"
            // src="https://bigheads.io/svg?accessory=none&body=breasts&circleColor=blue&clothing=dressShirt&clothingColor=blue&eyebrows=concerned&eyes=simple&faceMask=false&faceMaskColor=green&facialHair=none2&hair=buzz&hairColor=orange&hat=beanie&hatColor=green&lashes=true&lipColor=red&mask=false&mouth=grin&skinTone=brown"
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
