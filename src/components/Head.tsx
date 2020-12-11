import { NextSeo } from "next-seo";
import Head from "next/head";
import React, { FC } from "react";

interface Props {
  title: string;
  description?: string;
}

const AppHead: FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <NextSeo title={title} description={description} />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {children}
      </Head>
    </>
  );
};

export default AppHead;
