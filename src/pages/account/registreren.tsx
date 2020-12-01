import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import DefaultLayout from "@components/DefaultLayout";
import TextLink from "@components/ui/TextLink";
import { API_URL } from "@config/services";
import { niceFetch } from "@helpers/niceFetch";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    await niceFetch(`${API_URL}/register`, {
      method: "POST",
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
              placeholder="koen@mijn-lessen.nl"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <ButtonGroup mt={10} justifyContent="space-between" display="flex">
            <TextLink href="/account/inloggen" my="auto">
              Inloggen bij bestaand account
            </TextLink>
            <Button type="submit" variant="primary">
              Registreren
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default RegisterPage;
