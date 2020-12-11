import { ChakraProvider } from "@chakra-ui/react";
import PageLoading from "@components/PageLoading";
import "@components/ui/quill.snow.css";
import config from "@config/next-seo.config";
import GoogleFonts from "next-google-fonts";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React from "react";
import { SessionProvider } from "../providers/SessionProvider";
import { theme } from "../theme";

function MijnLessenApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...config} />
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Baloo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
        <PageLoading />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MijnLessenApp;
