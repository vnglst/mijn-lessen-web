import { Flex } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import LessonList from "@components/LessonList";
import { niceApi } from "@helpers/niceFetch";
import { useSession } from "@hooks/useSession";
import React, { FC } from "react";
import useSWR from "swr";
import { LessonsSWR } from "../types";

const MyLessons: FC = () => {
  const { session } = useSession();
  const { data: lessons }: LessonsSWR = useSWR(
    `lessons/?userName=${session?.user.name}`,
    niceApi
  );

  return (
    <DefaultLayout pageTitle="Mijn lessen" headingText="Jouw lessen" centered>
      <Flex p={10} mt={5} flexDir="column" width="100%">
        <LessonList lessons={lessons} heading="Door jou gemaakte lessen" />
      </Flex>
    </DefaultLayout>
  );
};

export default MyLessons;
