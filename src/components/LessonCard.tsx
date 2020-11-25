import { Button, Flex, Image, Text } from "@chakra-ui/core";
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
    <Flex width="100%" height="100%" alignItems="flex-start">
      <Image
        objectFit="contain"
        src={imageUrl || ""}
        width={["50px", "70px"]}
        borderRadius={10}
        m={[0, 2]}
      />
      <Flex ml={4} width="100%" flexWrap="wrap" height="100%">
        <Flex flexDir="column" flex={1} height="100%">
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
            <Text
              mb={3}
              fontSize="md"
              noOfLines={2}
              isTruncated
              color="gray.600"
            >
              {subtitle}
            </Text>
          )}
          <Flex mt="auto" width="100%">
            <Button
              ml="auto"
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LessonCard;
