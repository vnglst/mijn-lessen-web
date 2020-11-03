import { extendTheme } from "@chakra-ui/core";

export const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif;`,
  },
  components: {
    Link: {
      // my: "auto",
    },
    // CloseButton: {
    //   baseStyle: {
    //     // bg: "#FFFFFF",
    //     // border: "none",
    //     borderRadius: "0 20px 20px 20px",
    //     // boxShadow: "none",
    //     _hover: {
    //       boxShadow: "4px 4px 0px #000000;",
    //     },
    //     _active: {
    //       boxShadow: "1px 1px 0px #000000;",
    //     },
    //     _focus: {
    //       boxShadow: "5px 5px 0px #000000;",
    //     },
    //   },
    // },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        _disabled: {
          // border: "3px solid #000000;",
          // opacity: 0.6,
        },
        fontWeight: "bold", // Normally, it's "semibold"
        borderRadius: "0 20px 20px 20px",
        // border: "3px solid #000000;",
        // boxShadow: "6px 6px 0px #000000;",
        _hover: {
          boxShadow: "4px 4px 0px #000000;",
        },
        _active: {
          boxShadow: "1px 1px 0px #000000;",
        },
        _focus: {
          boxShadow: "2px 2px 0px #000000;",
        },
        padding: "8",
      },
      // // 2. We can add a new button size or extend existing
      // sizes: {
      //   xl: {
      //     h: "56px",
      //     fontSize: "lg",
      //     px: "32px",
      //   },
      // },
      // 3. We can add a new visual variant
      variants: {
        icon: {
          // bg: "#FFFFFF",
          // borderRadius: "0 20px 20px 20px",
        },
        "my-green": {
          // bg: "#A9EAE2",
          bg: "#cef3ef",
          // _hover: {
          //   boxShadow: "4px 4px 0px #000000;",
          //   // bg: "#8CD4CB",
          // },
          // _active: {
          //   boxShadow: "1px 1px 0px #000000;",
          //   // bg: "#8CD4CB",
          // },
          // _focus: {
          //   boxShadow: "5px 5px 0px #000000;",
          //   // bg: "#8CD4CB",
          // },
        },
        // // 4. We can override existing variants
        // solid: (props) => ({
        //   bg: "red.400",
        // }),
      },
    },
  },
});
