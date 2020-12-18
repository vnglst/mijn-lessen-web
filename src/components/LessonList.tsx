import { Heading, Wrap, WrapItem } from "@chakra-ui/react";
import React, { FC } from "react";
import { Lesson } from "../types";
import LessonCard from "./LessonCard";
import Underline from "./ui/Underline";

export interface LessonListProps {
  lessons: Lesson[] | null;
  heading: string;
}

const LessonList: FC<LessonListProps> = ({ lessons, heading }) => {
  if (!lessons) return null;

  return (
    <>
      <Heading as="h2" size="lg" mb={10} textColor="gray.900">
        <Underline>{heading}</Underline>
      </Heading>
      <Wrap spacing={8}>
        {lessons.map((lesson) => {
          return (
            <WrapItem key={lesson.slug}>
              <LessonCard
                slug={lesson.slug}
                title={lesson.title}
                subtitle={lesson.subtitle}
                imageUrl={lesson.imageUrl}
                status={lesson.status}
                lesson={lesson}
              />
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default LessonList;
