import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

export default function FullScreenSpinner() {
  return (
    <Center top={0} bottom={0} left={0} right={0} position="absolute">
      <Spinner thickness="4px" size="lg" color="gray.600" />
    </Center>
  );
}
