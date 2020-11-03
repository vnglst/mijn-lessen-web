import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { niceFetch } from "..";
import DefaultLayout from "../../components/DefaultLayout";
import NextLink from "next/link";
import { API_URL } from "../../config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  async function handleLogin(e: any) {
    e.preventDefault();
    await niceFetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
            <NextLink href="/account/registreren" passHref>
              <Link my="auto">Account aanmaken</Link>
            </NextLink>
            <Button type="submit" variant="my-green">
              VERSTUREN
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default LoginPage;
