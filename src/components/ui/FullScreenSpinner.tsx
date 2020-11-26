import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export default function FullScreenSpinner() {
  return (
    <Center width="100vw" height="100vh">
      <Spinner thickness="4px" size="lg" color="gray.600" />
    </Center>
  );
}
