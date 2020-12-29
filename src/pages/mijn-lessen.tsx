import { Flex } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import { LessonsByUser } from "@components/lessons/LessonsBy";
import { useSession } from "@hooks/useSession";
import React, { FC } from "react";
import { User } from "../types";

const MyLessons: FC = () => {
  const { session } = useSession();
  const user: User | undefined = session?.user;

  return (
    <DefaultLayout pageTitle="Mijn lessen" headingText="Jouw lessen" centered>
      <Flex p={10} mt={5} flexDir="column" width="100%">
        {user && (
          <LessonsByUser
            userName={user.name}
            heading="Door jou gemaakte lessen"
          />
        )}
      </Flex>
    </DefaultLayout>
  );
};

export default MyLessons;
