import { Code, Flex, Text, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "../../../components/DefaultLayout";
import { API_URL } from "../../../config";
import NextLink from "next/link";
import FullScreenSpinner from "../../../components/FullScreenSpinner";
import { niceFetch } from "../../../helpers";

function TokenPage() {
  const router = useRouter();
  const { token } = router.query;

  const { data: session } = useSWR(
    token ? `${API_URL}/login/${token}` : null,
    niceFetch
  );

  useEffect(() => {
    mutate(`${API_URL}/session`);
  }, session);

  if (!session) return <FullScreenSpinner />;

  return (
    <DefaultLayout
      pageTitle="Ingelogd met magische link"
      headingText="Ingelogd met magisch link"
      centered
    >
      <Flex p={8} flexDirection="column" width="100%" alignItems="center">
        <Flex maxW="lg" textAlign="center">
          <Text>
            Je bent ingelogd met het e-mailadres{" "}
            <Code>{session?.user.email}</Code>. Je kunt dit venster sluiten of
            naar{" "}
            <NextLink href="/" passHref>
              <Link>onze homepage</Link>
            </NextLink>
            .
          </Text>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default TokenPage;
