import { Box, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { default as React, FC } from "react";
import { useSession } from "../../providers";
import dynamic from "next/dynamic";

const LoginMenu = dynamic(() => import("./LoginMenu"));
const CreateMenu = dynamic(() => import("./CreateMenu"));
const UserMenu = dynamic(() => import("./UserMenu"));

const NavBarTop: FC = ({ children }) => {
  const { session } = useSession();
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
                      fontSize="lg"
                      noOfLines={2}
                      fontWeight="900"
                      lineHeight={1}
                      style={{ fontVariant: "all-small-caps" }}
                      // textTransform="uppercase"
                    >
                      mijn
                      <br /> lessen.nl
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
