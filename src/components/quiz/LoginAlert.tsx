import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useSession } from "../../providers";
import TextLink from "../ui/TextLink";

const LoginAlert: FC = () => {
  const [closed, setClosed] = useState(false);
  const { session } = useSession();

  if (!session || session?.user) return null;

  if (closed) return null;

  return (
    <Alert status="error" variant="subtle">
      <AlertIcon />
      <AlertTitle mr={2}>Je bent niet ingelogd.</AlertTitle>
      <AlertDescription>
        We kunnen je antwoorden niet bewaren en je verdient ook geen lampjes.
        Klik <TextLink href="/account/registreren">hier</TextLink> om te
        registreren.
      </AlertDescription>
      <CloseButton
        onClick={() => setClosed(true)}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
};

export default LoginAlert;
