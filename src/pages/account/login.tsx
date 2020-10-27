import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  VStack,
  Input,
} from "@chakra-ui/core";
import React from "react";
import { niceFetch } from "..";

const LoginPage = () => {
  async function handleLogin() {
    await niceFetch(`http://localhost:1750/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: "koen@example.com" }),
    });
  }

  return (
    <Container maxW="xl" centerContent>
      <Box marginTop="100" maxW="sm" padding="4">
        <FormControl as="fieldset">
          <VStack spacing="20px" align="left">
            <FormLabel as="legend">Inloggen met magische link</FormLabel>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
          </VStack>
        </FormControl>
      </Box>
      <Box marginTop="100" padding="4">
        <ButtonGroup>
          <Button marginRight="10" variant="my-green" onClick={handleLogin}>
            VERSTUREN
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default LoginPage;
