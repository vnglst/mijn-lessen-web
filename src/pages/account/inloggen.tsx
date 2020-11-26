import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import TextLink from "../../components/ui/TextLink";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await niceFetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    toast({
      title: "Magische link verstuurd",
      description: `We hebben een magische link gestuurd aan ${email}.`,
      status: "success",
      duration: 9000,
      position: "top",
      isClosable: true,
    });
  }

  return (
    <DefaultLayout
      pageTitle="Inloggen"
      headingText="Inloggen met magische link"
      centered
    >
      <Flex
        as="form"
        p={8}
        flexDirection="column"
        width="100%"
        alignItems="center"
        onSubmit={handleLogin}
      >
        <Flex maxW="md" flexDirection="column" width="100%">
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
            <TextLink href="/account/registreren">Account aanmaken</TextLink>
            <Button type="submit" variant="primary">
              Versturen
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default LoginPage;
