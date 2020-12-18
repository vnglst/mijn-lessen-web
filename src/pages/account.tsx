import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  Text,
} from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { api } from "@helpers/api";
import { niceApi } from "@helpers/niceFetch";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiLightBulb } from "react-icons/gi";
import useSWR from "swr";

function AccountPage() {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();
  const { data: session, mutate } = useSWR(`session`, niceApi);

  async function handleLogout() {
    setLoadingLogout(true);
    await api.post(`logout`);
    mutate({});
    router.push("/account/inloggen").then(() => window.scrollTo(0, 0));
    setLoadingLogout(false);
  }

  // TODO: can we check session and redirect server side
  if (!session) return <FullScreenSpinner />;

  const user = session.user;

  if (!user) {
    router.push("/account/inloggen").then(() => window.scrollTo(0, 0));
    return null;
  }

  return (
    <DefaultLayout
      pageTitle="Je account"
      headingText={`Hallo ${user.name}!`}
      centered
    >
      <Flex p={8} flexDirection="column" width="100%" alignItems="center">
        <Avatar size="xl" bgColor="white" name={user.name} src={user.avatar} />
        <Flex maxW="lg" flexDirection="column" width="100%" mt={10}>
          <Text>
            Je bent ingelogd met het e-mailadres <Code>{user.email}</Code>
          </Text>
          <Flex flexDirection="column">
            <Flex mt={5} alignItems="center" fontSize="xl" textColor="gray.600">
              <Text>{user.points}</Text>
              <Box ml={2} mr={5} as={GiLightBulb} color="yellow.400" />
            </Flex>
            <Text>lampjes</Text>
          </Flex>
          <ButtonGroup mt={12} justifyContent="space-between" display="flex">
            <Button
              variant="link"
              onClick={handleLogout}
              isLoading={loadingLogout}
            >
              Uitloggen
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push("/").then(() => window.scrollTo(0, 0))}
            >
              Naar lessen
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default AccountPage;
