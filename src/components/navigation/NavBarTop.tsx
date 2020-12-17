import { Box, Flex, Image } from "@chakra-ui/react";
import { useSession } from "@hooks/useSession";
import { zIndexes } from "@helpers/constants";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Session } from "providers/SessionProvider";
import { default as React } from "react";

const LoginMenu = dynamic(() => import("./LoginMenu"));
const CreateMenu = dynamic(() => import("./CreateMenu"));
const UserMenu = dynamic(() => import("./UserMenu"));

const NavBarTop = () => {
  const { session }: Session = useSession();
  const router = useRouter();

  const user = session?.user;
  const canEdit = user && (user.role === "ADMIN" || user.role === "EDITOR");

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: zIndexes.base,
      }}
    >
      <nav>
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          py={3}
          px={4}
        >
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Box
              _hover={{ cursor: "pointer" }}
              _active={{ transform: "scale(0.95)" }}
              transition="all 0.75s ease"
            >
              <NextLink href="/" passHref>
                <a>
                  <Image
                    height="35px"
                    objectFit="scale-down"
                    src="/images/mijn-lessen-logo.png"
                    alt="mijn-lessen.nl logo"
                  />
                </a>
              </NextLink>
            </Box>
          </Flex>
          <Box>
            {canEdit && <CreateMenu router={router} />}
            {user ? (
              <UserMenu user={user} router={router} />
            ) : (
              <LoginMenu router={router} />
            )}
          </Box>
        </Flex>
      </nav>
    </header>
  );
};

export default NavBarTop;
