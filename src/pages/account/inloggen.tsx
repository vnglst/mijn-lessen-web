import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import TextLink from "@components/ui/TextLink";
import { api } from "@helpers/api";
import { ExtractErrors, extractErrors } from "@helpers/extractErrors";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as ReturnType<ExtractErrors>);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await api.post(`login`, { json: { email } });
      router.push(`inloggen/magische-link-verstuurd/?email=${email}`);
    } catch (err) {
      const errorData = await err.response.json();
      if (errorData.name === "ValidationError") {
        const errs = extractErrors(errorData);
        setErrors(errs);
        setLoading(false);
      } else {
        toast({
          title: "Er is een onbekende fout opgetreden",
          description: `Controleer of je alles goed hebt ingevuld.`,
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      }
    }
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
          <FormControl mt={5} isDisabled={loading} isInvalid={!!errors.email}>
            <FormLabel>E-mailadres</FormLabel>
            <Input
              type="email"
              placeholder="koen@mijn-lessen.nl"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <ButtonGroup
            mt={10}
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <TextLink href="/account/registreren">Account aanmaken</TextLink>
            <Button type="submit" variant="primary" isLoading={loading}>
              Versturen
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default LoginPage;
