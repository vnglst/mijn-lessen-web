import { Button, Flex, Image, Text, VStack } from "@chakra-ui/core";
import React, { FC } from "react";
import TextLink from "./ui/TextLink";

interface Props {
  slug: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
}

const LessonCard: FC<Props> = ({ slug, title, subtitle, imageUrl }) => {
  return (
    <Flex minWidth={["90vw", "550px"]} maxWidth="550px" height="100%">
      <Image
        objectFit="contain"
        src={imageUrl || ""}
        height="75px"
        width="75px"
        borderRadius="20px"
        p={[1, 3]}
      />
      <Flex
        ml={4}
        pb={5}
        borderBottom="1px solid"
        borderColor="gray.200"
        width="100%"
        height="100%"
      >
        <VStack align="left" flex={1} height="100%" spacing={0}>
          <Text
            fontSize="lg"
            noOfLines={2}
            isTruncated
            fontWeight="semibold"
            textColor="gray.700"
          >
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="md" noOfLines={2} isTruncated color="gray.600">
              {subtitle}
            </Text>
          )}
        </VStack>
        <VStack justify="center" ml={4}>
          <Button
            as={TextLink}
            href={`/lessen/${slug}`}
            textDecoration="none"
            size="sm"
            _hover={{
              textDecoration: "none",
            }}
          >
            Open
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default LessonCard;
