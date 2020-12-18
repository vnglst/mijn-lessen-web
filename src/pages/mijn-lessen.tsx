import { Flex, Skeleton, Stack } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { niceApi } from "@helpers/niceFetch";
import { useSession } from "@hooks/useSession";
import React, { FC } from "react";
import useSWR from "swr";
import { LessonsSWR } from "../types";

const MyLessons: FC = () => {
  const { session } = useSession();
  const { data: lessons, isValidating }: LessonsSWR = useSWR(
    `lessons/?userName=${session?.user.name}`,
    niceApi
  );

  return (
    <DefaultLayout pageTitle="Mijn lessen" headingText="Jouw lessen" centered>
      <Flex p={10} mt={5} flexDir="column" width="100%">
        {isValidating ? (
          <Stack spacing={5} width="100%">
            <Skeleton borderRadius="10px" height="40px" width="200px" />
            <Skeleton borderRadius="20px" width="320px" height="450px" />
          </Stack>
        ) : (
          <LessonList
            lessons={lessons || null}
            heading="Door jou gemaakte lessen"
          />
        )}
      </Flex>
    </DefaultLayout>
  );
};

export default MyLessons;
