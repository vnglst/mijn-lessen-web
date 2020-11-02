import { Box, Heading, Link, Skeleton, Wrap, WrapItem } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import useSWR from "swr";
import AppHead from "../components/Head";
import HeroWave from "../components/HeroWave";
import NavBar from "../components/NavBar";
import { API_URL } from "../config";

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
  const { data, error } = useSWR(`${API_URL}/lessons`, niceFetch);

  return (
    <>
      <AppHead>
        <title>Home | Wiser.Today</title>
      </AppHead>
      <header>
        <NavBar />
      </header>
      <HeroWave>
        <Heading
          as="h1"
          size="xl"
          marginTop="auto"
          fontWeight="900"
          noOfLines={3}
          p="40px"
          textColor="gray.800"
        >
          Goedemorgen vnglst!
        </Heading>
      </HeroWave>
      <Box p="40px" marginTop="10px">
        <Heading as="h2" size="lg" marginBottom="40px" textColor="gray.800">
          Speciaal voor jou
        </Heading>
        {!data && <Skeleton borderRadius="20px" width="250px" height="250px" />}
        <Wrap spacing="40px">
          {data?.lessons.map((lesson: any) => {
            return (
              <WrapItem key={lesson.id}>
                <NextLink href={`/lessen/${lesson.id}`} passHref>
                  <Link _hover={{ textDecoration: "none" }}>
                    <Box
                      transition="all 0.25s ease-out;"
                      width="250px"
                      height="250px"
                      bg="#cef3ef"
                      p={4}
                      borderRadius="0 20px 20px 20px"
                      _hover={{
                        boxShadow: "4px 4px 0px #000000;",
                        bg: "#A9EAE2",
                      }}
                      _active={{
                        boxShadow: "1px 1px 0px #000000;",
                      }}
                      _focus={{
                        boxShadow: "5px 5px 0px #000000;",
                      }}
                    >
                      <Box display="flex" flexDirection="column" height="100%">
                        <Heading
                          as="h3"
                          size="md"
                          noOfLines={2}
                          isTruncated
                          textAlign="left"
                          marginTop="auto"
                          fontWeight="500"
                        >
                          {lesson.title}
                        </Heading>
                      </Box>
                    </Box>
                  </Link>
                </NextLink>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </>
  );
};

export default Index;
