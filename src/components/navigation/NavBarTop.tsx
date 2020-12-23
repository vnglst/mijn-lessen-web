import { Box, Flex } from "@chakra-ui/react";
import { useSession } from "@hooks/useSession";
import { zIndexes } from "@helpers/constants";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useRouter } from "next/router";
import NextImage from "next/image";
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
    <Box
      as="header"
      style={{
        position: "sticky",
        top: -1, // HACK for Chrome background visible above nav bar
        backgroundColor: "white",
        zIndex: zIndexes.base,
      }}
    >
      <Flex
        as="nav"
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
                <NextImage
                  height="35"
                  width="95"
                  src="/images/mijn-lessen-logo.png"
                  alt="logo"
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
    </Box>
  );
};

export default NavBarTop;
