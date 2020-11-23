import { Avatar, Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { FC } from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";

interface Props {
  slug: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  hearts?: number;
  views?: number;
  lightbulbs?: number;
  authorAvatar: string | null;
  showStats?: boolean;
}

const LessonCard: FC<Props> = ({
  slug,
  title,
  subtitle,
  hearts = 0,
  views = 0,
  lightbulbs,
  imageUrl,
  authorAvatar,
  showStats = false,
}) => {
  return (
    <NextLink href={`/lessen/${slug}`} passHref>
      <Flex
        as={Link}
        transition="all 0.25s ease-out;"
        width={["75vw", "260px", "310px"]}
        minHeight={[0, "310px"]}
        height="100%"
        border="1px solid lightgray"
        borderRadius="0 20px 20px 20px"
        textDecoration="none"
        _hover={{
          boxShadow: "4px 4px 0px #000000;",
          border: "1px solid black",
          textDecoration: "none",
        }}
        _active={{
          boxShadow: "1px 1px 0px #000000;",
        }}
        _focus={{
          boxShadow: "2px 2px 0px #000000;",
          outline: "none",
        }}
        flexDirection="column"
        position="relative"
      >
        {imageUrl && (
          <Image
            objectFit="contain"
            src={imageUrl}
            maxHeight="150px"
            mt={5}
            p={3}
            borderRadius="0 20px 0px 0px"
          />
        )}
        <Flex mt="auto" flexDirection="column" height="100%" width="100%" p={5}>
          <Flex mt="auto" flexDirection="column">
            <Heading
              as="h3"
              size="md"
              noOfLines={2}
              isTruncated
              mb={2}
              textAlign="left"
              fontWeight="semibold"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="sm" noOfLines={2} isTruncated>
                {subtitle}
              </Text>
            )}
          </Flex>
          {showStats && (
            <Flex alignItems="baseline" justifyContent="space-around" mt={3}>
              <Flex
                ml="auto"
                alignItems="center"
                fontSize="xs"
                textColor="gray.600"
                width="100%"
              >
                <Avatar
                  mr="auto"
                  size="xs"
                  backgroundColor="transparent"
                  src={authorAvatar || ""}
                />
                <Text>{lightbulbs}</Text>
                <Box ml={2} mr={5} as={GiLightBulb} color="yellow.400" />
                <Text>{views}</Text>
                <Box ml={2} mr={5} as={GrView} />
                <Text>{hearts}</Text>
                <Box ml={2} as={GiHearts} color="red.300" />
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </NextLink>
  );
};

export default LessonCard;
