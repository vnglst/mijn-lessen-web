import { Code, Flex, Text, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR, { mutate } from "swr";
import { niceFetch } from "../..";
import DefaultLayout from "../../../components/DefaultLayout";
import { API_URL } from "../../../config";
import NextLink from "next/link";

function TokenPage() {
  const router = useRouter();
  const { token } = router.query;

  const { data: session, error } = useSWR(
    token ? `${API_URL}/login/${token}` : null,
    niceFetch
  );

  if (error) return <div>failed to load</div>;
  if (!session) return <div>loading...</div>;

  mutate(`${API_URL}/me`);

  return (
    <DefaultLayout
      pageTitle="Inlogd met magische link"
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
