import { Code, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import DefaultLayout from "@components/DefaultLayout";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import TextLink from "@components/ui/TextLink";
import { API_URL } from "@config/services";
import { niceFetch } from "@helpers/niceFetch";

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
            naar <TextLink href="/">onze homepage</TextLink>.
          </Text>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default TokenPage;
