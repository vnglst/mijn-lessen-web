import { Heading, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";
import React, { FC } from "react";
import { Lesson } from "../types";
import LessonCard from "./LessonCard";
import Underline from "./ui/Underline";

export interface LessonListProps {
  lessons?: Lesson[];
  heading: string;
}

const LessonList: FC<LessonListProps> = ({ lessons, heading }) => {
  return (
    <>
      <Heading as="h2" size="lg" mb={10} textColor="gray.900">
        <Underline>{heading}</Underline>
      </Heading>
      <Wrap spacing={8}>
        {lessons ? (
          lessons.map((lesson) => {
            return (
              <WrapItem
                key={lesson.slug}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="0 20px 20px 20px"
                px={5}
                py={5}
                width="100%"
                maxWidth="375px"
              >
                <LessonCard
                  slug={lesson.slug}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  imageUrl={lesson.imageUrl}
                  status={lesson.status}
                />
              </WrapItem>
            );
          })
        ) : (
          <WrapItem>
            <Skeleton borderRadius="20px" width="250px" height="250px" />
          </WrapItem>
        )}
      </Wrap>
    </>
  );
};

export default LessonList;
