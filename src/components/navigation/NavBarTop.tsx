import { Box, Flex, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { default as React, FC } from "react";
import { useSession } from "../../providers";
import UserMenu from "./UserMenu";
import CreateMenu from "./CreateMenu";
import LoginMenu from "./LoginMenu";

const NavBarTop: FC = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  const user = session?.user;

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
                <Box _hover={{ cursor: "pointer" }}>
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
                {user && <CreateMenu router={router} />}
                {user ? (
                  <UserMenu user={user} router={router} />
                ) : (
                  <LoginMenu router={router} />
                )}
              </Box>
            </>
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default NavBarTop;
