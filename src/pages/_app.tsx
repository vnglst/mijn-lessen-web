import { ChakraProvider, extendTheme, Flex, Box, Link } from "@chakra-ui/core";
import { AppProps } from "next/app";
import NextLink from "next/link";
import React from "react";

const theme = extendTheme({
  baseStyle: {},
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: "bold", // Normally, it's "semibold"
        borderRadius: "20px",
        border: "3px solid #000000;",
        boxShadow: "6px 6px 0px #000000;",
        _hover: {
          boxShadow: "4px 4px 0px #000000;",
        },
        _active: {
          boxShadow: "1px 1px 0px #000000;",
        },
        _focus: {
          boxShadow: "5px 5px 0px #000000;",
        },
        padding: "8",
      },
      // // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      // 3. We can add a new visual variant
      variants: {
        "my-green": {
          bg: "#A9EAE2",
          _hover: {
            boxShadow: "4px 4px 0px #000000;",
            bg: "#8CD4CB",
          },
          _active: {
            boxShadow: "1px 1px 0px #000000;",
            bg: "#8CD4CB",
          },
          _focus: {
            boxShadow: "5px 5px 0px #000000;",
            bg: "#8CD4CB",
          },
        },
        // // 4. We can override existing variants
        // solid: (props) => ({
        //   bg: "red.400",
        // }),
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        bg="tomato"
        w="100%"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <NextLink href="/">
            <Link>Home</Link>
          </NextLink>
        </Flex>
        <Box>
          <NextLink href="/account">
            <Link>Account</Link>
          </NextLink>
        </Box>
      </Flex>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
