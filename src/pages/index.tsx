import { Box, Heading, Link, Skeleton, Wrap, WrapItem } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";
import useSWR from "swr";
import DefaultLayout from "../components/DefaultLayout";
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
  const { data } = useSWR(`${API_URL}/lessons`, niceFetch);

  return (
    <DefaultLayout pageTitle="Home" headingText="Goedendag!" centered>
      <Box p={10} marginTop="10px">
        <Heading as="h2" size="lg" marginBottom="40px" textColor="gray.800">
          Lessen voor jou
        </Heading>
        {!data && <Skeleton borderRadius="20px" width="250px" height="250px" />}
        <Wrap spacing="40px">
          {data?.lessons.map((lesson: any) => {
            return (
              <WrapItem key={lesson.id}>
                <NextLink href={`/lessen/${lesson.id}`} passHref>
                  <Box
                    display="flex"
                    as={Link}
                    transition="all 0.25s ease-out;"
                    width="250px"
                    height="250px"
                    bg="#cef3ef"
                    p={4}
                    borderRadius="0 20px 20px 20px"
                    _hover={{
                      boxShadow: "4px 4px 0px #000000;",
                      bg: "#A9EAE2",
                      textDecoration: "none",
                    }}
                    _active={{
                      boxShadow: "1px 1px 0px #000000;",
                    }}
                    _focus={{
                      boxShadow: "2px 2px 0px #000000;",
                      outline: "none",
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
                </NextLink>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </DefaultLayout>
  );
};

export default Index;
