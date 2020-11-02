import { FC } from "react";
import Head from "next/head";

interface Props {}

const AppHead: FC<Props> = ({ children }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {children}
    </Head>
  );
};

export default AppHead;
