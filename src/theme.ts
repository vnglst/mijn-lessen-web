import { extendTheme } from "@chakra-ui/core";

export const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif;`,
  },
  components: {
    Button: {
      sizes: {
        md: {
          lineHeight: 0, // fix for Safari
          fontSize: "16px",
          padding: 8,
        },
      },
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "0 20px 20px 20px",
        _hover: {
          boxShadow: "4px 4px 0px #000000;",
        },
        _active: {
          boxShadow: "1px 1px 0px #000000;",
        },
        _focus: {
          boxShadow: "2px 2px 0px #000000;",
        },
      },
      variants: {
        primary: {
          bg: "hsl(174deg 61% 88%);",
          _hover: {
            bg: "hsl(174deg 61% 85%);",
          },
        },
      },
    },
  },
});
