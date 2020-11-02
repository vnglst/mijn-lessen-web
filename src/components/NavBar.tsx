import { Box, Flex, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { default as React, FC } from "react";
import { useSession } from "../providers";

const AccountLink: FC = () => {
  const { error, session } = useSession();

  if (error)
    return (
      <Text fontSize="xs" noOfLines={1} textColor="red">
        Fout, probeer
        <NextLink href="/account/login" passHref>
          <Link>opieuw in te loggen</Link>
        </NextLink>
      </Text>
    );

  if (!session || !session.user)
    return (
      <NextLink href="/account/login" passHref>
        <Text fontSize="xs" noOfLines={1} textColor="red">
          <Link>Inloggen</Link>
        </Text>
      </NextLink>
    );

  return (
    <Text fontSize="xs" noOfLines={1}>
      Ingelogd als{" "}
      <NextLink href="/account" passHref>
        <Link>{session.user.name}</Link>
      </NextLink>
    </Text>
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
                <AccountLink />
              </Box>
            </>
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default NavBar;
