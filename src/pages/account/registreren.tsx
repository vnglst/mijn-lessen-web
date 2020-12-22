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

const RegisterPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({} as ReturnType<ExtractErrors>);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await api.post(`register`, { json: { email, name } });
      setLoading(false);
      router
        .push(`registreren/gelukt?email=${email}`)
        .then(() => window.scrollTo(0, 0));
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
          <FormControl isDisabled={loading} isInvalid={!!errors.name}>
            <FormLabel>Naam</FormLabel>
            <Input
              placeholder="Je naam"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl mt={5} isDisabled={loading} isInvalid={!!errors.email}>
            <FormLabel>E-mailadres</FormLabel>
            <Input
              type="email"
              placeholder="voorbeeld@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <ButtonGroup mt={10} justifyContent="space-between" display="flex">
            <TextLink href="/account/inloggen" my="auto">
              Inloggen met bestaand account
            </TextLink>
            <Button type="submit" variant="primary" isLoading={loading}>
              Registreren
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default RegisterPage;
