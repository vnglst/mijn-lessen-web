import { Code, Text } from "@chakra-ui/react";
import CenteredLayout from "@components/account/CenteredLayout";
import DefaultLayout from "@components/DefaultLayout";
import { useRouter } from "next/router";
import React, { FC } from "react";

export interface RegisterSuccessProps {}

const RegisterSuccess: FC<RegisterSuccessProps> = ({}) => {
  const router = useRouter();
  const { email } = router.query;
  return (
    <DefaultLayout
      pageTitle="We hebben je een e-mail gestuurd"
      headingText="We hebben je een e-mail gestuurd"
      centered
    >
      <CenteredLayout>
        <Text>
          Je bent er bijna. Als het goed is, heb je op het e-mailadres{" "}
          <Code>{email}</Code> een bericht van ons ontvangen met daarin een
          magische link. Daarmee kun je inloggen.
        </Text>
        <Text mt={6}>Ga snel naar deze e-mail om verder te gaan.</Text>
      </CenteredLayout>
    </DefaultLayout>
  );
};

export default RegisterSuccess;
