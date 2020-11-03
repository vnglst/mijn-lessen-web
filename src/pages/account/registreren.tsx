import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { niceFetch } from "..";
import DefaultLayout from "../../components/DefaultLayout";
import { API_URL } from "../../config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleRegister(e: any) {
    e.preventDefault();
    await niceFetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, name }),
    });
  }

  return (
    <DefaultLayout
      pageTitle="Registreren"
      headingText="Account aanmaken"
      centered
    >
      <Flex
        as="form"
        p={8}
        flexDirection="column"
        width="100%"
        alignItems="center"
        onSubmit={handleRegister}
      >
        <Flex maxW="md" flexDirection="column" width="100%">
          <FormControl id="naam">
            <FormLabel>Naam</FormLabel>
            <Input
              placeholder="vnglst"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
          <FormControl id="email" mt={5}>
            <FormLabel>E-mailadres</FormLabel>
            <Input
              type="email"
              placeholder="koen@wizer.today"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <ButtonGroup mt={10} justifyContent="space-between" display="flex">
            <NextLink href="/account/inloggen" passHref>
              <Link my="auto">Inloggen bij bestaand account</Link>
            </NextLink>
            <Button type="submit" variant="my-green">
              REGISTREREN
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default LoginPage;
