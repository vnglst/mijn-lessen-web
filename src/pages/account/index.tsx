import { Button, ButtonGroup, Code, Flex, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { niceFetch } from "..";
import DefaultLayout from "../../components/DefaultLayout";
import { API_URL } from "../../config";

function AccountPage() {
  const router = useRouter();
  const { data: session, mutate } = useSWR(`${API_URL}/session`, niceFetch);

  async function handleLogout() {
    await niceFetch(`${API_URL}/logout`);
    mutate({});
  }

  if (session && !session.user) router.push("/account/inloggen");

  return (
    <DefaultLayout
      pageTitle="Je account"
      headingText={`Hallo ${session?.user.name || ""}!`}
      centered
    >
      <Flex p={8} flexDirection="column" width="100%" alignItems="center">
        <Flex maxW="lg" flexDirection="column" width="100%">
          <Text>
            Je bent ingelogd met het e-mailadres{" "}
            <Code>{session?.user.email}</Code>
          </Text>
          <ButtonGroup mt={10}>
            <Button onClick={handleLogout}>Uitloggen</Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default AccountPage;
