import { Box, Button, ButtonGroup, Link, Text } from "@chakra-ui/core";
import React from "react";
import useSWR from "swr";
import { niceFetch } from "..";
import { API_URL } from "../../config";
import NextLink from "next/link";

function AccountPage() {
  const { data: session, mutate } = useSWR(`${API_URL}/me`, niceFetch);

  async function handleLogout() {
    await niceFetch(`http://localhost:1750/api/logout`);
    mutate({});
  }

  return (
    <Box marginTop="100" padding="4">
      <h1>Logged in</h1>
      <pre>{JSON.stringify(session, null, 4)}</pre>
      <ButtonGroup>
        {session?.user ? (
          <Button marginRight="10" variant="my-green" onClick={handleLogout}>
            Uitloggen
          </Button>
        ) : (
          <NextLink href="/account/login">
            <Text>
              <Link>Inloggen</Link>
            </Text>
          </NextLink>
        )}
      </ButtonGroup>
    </Box>
  );
}

export default AccountPage;
