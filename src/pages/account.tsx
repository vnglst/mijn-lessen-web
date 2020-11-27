import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Code,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GiLightBulb } from "react-icons/gi";
import useSWR from "swr";
import DefaultLayout from "@components/DefaultLayout";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import { API_URL } from "../config/services";
import { niceFetch } from "@helpers/niceFetch";

function AccountPage() {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();
  const { data: session, mutate } = useSWR(`${API_URL}/session`, niceFetch);

  async function handleLogout() {
    setLoadingLogout(true);
    await niceFetch(`${API_URL}/logout`);
    mutate({});
    setLoadingLogout(false);
    router.push("/account/inloggen");
  }

  // TODO: can we check session and redirect server side
  if (!session) return <FullScreenSpinner />;

  const user = session.user;

  if (!user) {
    router.push("/account/inloggen");
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
          <ButtonGroup mt={10} mx="auto">
            <Button onClick={handleLogout} isLoading={loadingLogout}>
              Uitloggen
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default AccountPage;
