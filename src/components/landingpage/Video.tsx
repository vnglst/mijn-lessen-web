import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

export interface VideoProps {
  url: string;
}

const Video: FC<VideoProps> = ({ url }) => {
  return (
    <Box
      w={{ base: "100%", md: "80%", lg: "45%" }}
      m={{ base: 12, md: 0 }}
      position="relative"
      borderRadius={5}
      overflow="hidden"
    >
      <Flex
        bg="black"
        h={6}
        w="100%"
        alignItems="center"
        px={2}
        position="absolute"
      >
        <Box borderRadius="100%" bg="red.400" h={3} w={3} />
        <Box borderRadius="100%" bg="yellow.400" h={3} w={3} ml={2} />
        <Box borderRadius="100%" bg="green.400" h={3} w={3} ml={2} />
      </Flex>
      <Box pt={6}>
        <video
          src={url}
          autoPlay
          muted
          loop
          controls
          style={{ outline: "none" }}
        ></video>
      </Box>
    </Box>
  );
};

export default Video;
