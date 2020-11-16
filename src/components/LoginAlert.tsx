import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/core";
import React, { FC } from "react";
import { useSession } from "../providers";
import TextLink from "./ui/TextLink";

const LoginAlert: FC = () => {
  const session = useSession();

  if (!session || session?.user) return null;

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Je bent niet ingelogd.</AlertTitle>
      <AlertDescription>
        We kunnen je antwoorden niet bewaren en je verdient ook geen lampjes.
        Klik <TextLink href="/account/registreren">hier</TextLink> om te
        registreren.
      </AlertDescription>
    </Alert>
  );
};

export default LoginAlert;
