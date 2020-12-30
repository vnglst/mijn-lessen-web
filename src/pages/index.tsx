import { Spinner, VStack } from "@chakra-ui/react";
import DefaultLayout from "@components/DefaultLayout";
import { CardSkeleton } from "@components/lessons/LessonList";
import {
  LessonsByCategory,
  LessonsByUser,
  StartedLessons,
  TodaysLessons,
} from "@components/lessons/LessonsBy";
import { apiFetcher } from "@helpers/api";
import { useSession } from "@hooks/useSession";
import React, { FC } from "react";
import LazyLoad from "react-lazyload";
import useSWR from "swr";
import { Category, User } from "types";

const MyLazyLoad: FC = ({ children }) => (
  <LazyLoad offset={500} placeholder={<CardSkeleton />}>
    {children}
  </LazyLoad>
);

const Index: FC = () => {
  const { session } = useSession();
  const user: User | undefined = session?.user;

  const { data: categories }: { data?: Category[] } = useSWR(
    `categories`,
    apiFetcher
  );

  return (
    <DefaultLayout
      pageTitle="Start"
      headingText={`Hallo ${user?.name || ""}`}
      centered
    >
      {categories ? (
        <VStack
          px={[5, 10]}
          py={10}
          width="100%"
          spacing={10}
          alignItems="flex-start"
        >
          {user && (
            <>
              <MyLazyLoad>
                <TodaysLessons heading="Voor vandaag" />
              </MyLazyLoad>
              <MyLazyLoad>
                <StartedLessons heading="Verder met" />
              </MyLazyLoad>
              <MyLazyLoad>
                <LessonsByUser
                  userName={user.name}
                  heading="Door jou gemaakte lessen"
                />
              </MyLazyLoad>
            </>
          )}
          {categories.map((category) => (
            <MyLazyLoad key={category.id}>
              <LessonsByCategory
                heading={category.title}
                categoryId={category.id}
              />
            </MyLazyLoad>
          ))}
        </VStack>
      ) : (
        <Spinner thickness="4px" size="lg" color="gray.600" mt="32" />
      )}
    </DefaultLayout>
  );
};

export default Index;
