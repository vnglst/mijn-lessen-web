import { ChakraProvider } from "@chakra-ui/react";
import PageLoading from "@components/PageLoading";
import "@components/ui/quill.snow.css";
import config from "@config/next-seo.config";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import ReactQueryProvider from "providers/ReactQueryProvider";
import React from "react";
import { SessionProvider } from "../providers/SessionProvider";
import { theme } from "../theme";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

function MijnLessenApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <DefaultSeo {...config} />
          <PageLoading />
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </ReactQueryProvider>
  );
}

export default MijnLessenApp;
