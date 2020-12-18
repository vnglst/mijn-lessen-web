import { Button, ButtonGroup, Code, Text } from "@chakra-ui/react";
import CenteredLayout from "@components/account/CenteredLayout";
import DefaultLayout from "@components/DefaultLayout";
import FullScreenSpinner from "@components/ui/FullScreenSpinner";
import TextLink from "@components/ui/TextLink";
import { apiFetcher } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";
import { UserSWR } from "types";

function TokenPage() {
  const { mutate } = useSession();
  const router = useRouter();
  const { token } = router.query;
  const { data, error }: UserSWR = useSWR(
    token ? `login/${token}` : null,
    apiFetcher
  );

  useEffect(() => {
    if (!data || !mutate) return;
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) router.push("link-ongeldig").then(() => window.scrollTo(0, 0));

  if (!data) return <FullScreenSpinner />;

  return (
    <DefaultLayout
      pageTitle="Je bent ingelogd"
      headingText="Je bent ingelogd"
      centered
    >
      <CenteredLayout>
        <Text>
          Je bent ingelogd met het e-mailadres <Code>{data.email}</Code>! Je
          kunt nu beginnen met <TextLink href="/">een eerste les</TextLink>.
        </Text>
        <ButtonGroup mt={12} justifyContent="center" display="flex">
          <Button
            variant="primary"
            onClick={() => router.push("/").then(() => window.scrollTo(0, 0))}
          >
            Starten
          </Button>
        </ButtonGroup>
      </CenteredLayout>
    </DefaultLayout>
  );
}

export default TokenPage;
