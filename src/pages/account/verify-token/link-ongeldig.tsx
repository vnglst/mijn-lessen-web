import { Text } from "@chakra-ui/react";
import CenteredLayout from "@components/account/CenteredLayout";
import DefaultLayout from "@components/DefaultLayout";
import TextLink from "@components/ui/TextLink";
import React, { FC } from "react";

export interface InvalidTokenProps {}

const InvalidToken: FC<InvalidTokenProps> = ({}) => {
  return (
    <DefaultLayout
      pageTitle="Ongeldige magische link"
      headingText="Ongeldige magische link"
      centered
    >
      <CenteredLayout>
        <Text>
          Deze link is al gebruikt of niet meer geldig. Op de{" "}
          <TextLink href="/account/inloggen">login-pagina</TextLink> kun je een
          nieuwe link aanvragen.
        </Text>
      </CenteredLayout>
    </DefaultLayout>
  );
};

export default InvalidToken;
