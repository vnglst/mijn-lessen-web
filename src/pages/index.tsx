import { Box, Container, Link, VStack, Text, Heading } from "@chakra-ui/core";
import React, { Fragment } from "react";
import useSWR from "swr";

export async function niceFetch(
  url: RequestInfo,
  opts?: RequestInit
): Promise<any> {
  const res = await fetch(url, {
    credentials: "include",
    ...opts,
  });
  return res.json();
}

const Index = () => {
  const { data, error } = useSWR(
    `http://localhost:1750/api/lessons`,
    niceFetch
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Container maxW="xl" centerContent>
      <Box marginTop="100" maxW="xl" padding="4">
        <VStack spacing="20px" align="left">
          {data.lessons.map((lesson: any) => {
            return (
              <Box key={lesson.id}>
                <Link>
                  <Heading as="h2" size="xl" isTruncated>
                    {lesson.title}
                  </Heading>
                </Link>
                <Text marginTop={2} textAlign="right" fontSize="xs">
                  van {lesson.author.name}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
