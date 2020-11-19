import { Center, Spinner } from "@chakra-ui/core";
import React from "react";
import HeroWave from "./HeroWave";

export default function FullScreenSpinner() {
  return (
    <HeroWave>
      <Center width="100%" marginTop="auto">
        <Spinner thickness="4px" size="lg" color="gray.600" />
      </Center>
    </HeroWave>
  );
}
