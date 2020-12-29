import { Badge, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { Lesson } from "types";
import TextLink from "../ui/TextLink";

interface Props {
  slug: string;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  status?: string;
  lesson: Lesson;
}

const LessonCard: FC<Props> = ({
  slug,
  title,
  subtitle,
  imageUrl,
  status,
  lesson,
}) => {
  const router = useRouter();
  const lessonLink = `/lessen/${slug}`;

  return (
    <Flex
      flexDir="column"
      as="button"
      p="5"
      maxW="320px"
      minH="450px"
      borderWidth="1px"
      borderRadius="0 20px 20px 20px"
      transition="all 0.75s ease"
      overflow="hidden"
      bgColor="white"
      _hover={{
        boxShadow: "4px 4px 0px #333",
        transform: "scale(1.01)",
      }}
      _active={{
        boxShadow: "1px 1px 0px #333",
        transform: "scale(0.99)",
      }}
      _focus={{
        boxShadow: "2px 2px 0px #333",
        outline: "none",
      }}
      textAlign="left"
      onClick={() => router.push(lessonLink).then(() => window.scrollTo(0, 0))}
    >
      <Image
        objectFit="contain"
        objectPosition="50% 0%"
        borderRadius="0 20px 0px 0px"
        width="100%"
        height="200px"
        bgColor="white"
        htmlHeight="200"
        htmlWidth="270"
        src={imageUrl || ""}
        alt=""
      />
      <Flex align="baseline" mt={5}>
        {status === "STARTED" && (
          <Badge mr={2} variant="solid" colorScheme="pink">
            gestart
          </Badge>
        )}
        {status === "COMPLETED" && (
          <Badge mr={2} variant="solid" colorScheme="green">
            gedaan
          </Badge>
        )}
        <Text
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
          AUTEUR &bull; {lesson.author.name}
        </Text>
      </Flex>
      <Heading
        as="h3"
        mt={2}
        fontSize="xl"
        fontWeight="semibold"
        lineHeight="short"
      >
        <TextLink
          href={lessonLink}
          onClick={(e) => e.stopPropagation()}
          textDecoration="none"
          _hover={{
            color: "gray.600",
            textDecoration: "none",
          }}
        >
          {title}
        </TextLink>
      </Heading>
      <Text my={2}>{subtitle}</Text>
      <Flex align="center" mt="auto">
        <Box as={GiLightBulb} color="yellow.400" />
        <Text ml={1} fontSize="sm">
          {lesson.points}
        </Text>
        <Box ml={5} as={GiHearts} color="red.400" />
        <Text ml={1} fontSize="sm">
          {lesson.likeCount}
        </Text>
        <Box ml={5} as={GrView} />
        <Text ml={1} fontSize="sm">
          {lesson.viewCount}
        </Text>
      </Flex>
    </Flex>
  );
};

export default LessonCard;
