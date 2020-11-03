import { ChakraProvider } from "@chakra-ui/core";
import GoogleFonts from "next-google-fonts";
import { AppProps } from "next/app";
import React from "react";
import PageLoading from "../components/PageLoading";
import { SessionProvider } from "../providers";
import { theme } from "../theme";

function WiserApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
        <PageLoading />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default WiserApp;
