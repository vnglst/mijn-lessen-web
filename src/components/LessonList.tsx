import { Heading, Skeleton, Wrap, WrapItem } from "@chakra-ui/core";
import React, { FC } from "react";
import { Lesson } from "../types";
import LessonCard from "./LessonCard";

export interface LessonListProps {
  lessons?: Lesson[];
  heading: string;
  showStats?: boolean;
}

const LessonList: FC<LessonListProps> = ({ lessons, heading, showStats }) => {
  return (
    <>
      <Heading as="h2" size="lg" mb={10} textColor="gray.800">
        {heading}
      </Heading>
      <Wrap spacing={["20px", "30px"]}>
        {lessons ? (
          lessons.map((lesson) => {
            return (
              <WrapItem key={lesson.slug}>
                <LessonCard
                  slug={lesson.slug}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  imageUrl={lesson.imageUrl}
                  views={lesson.viewCount}
                  hearts={lesson.likeCount}
                  lightbulbs={lesson.points}
                  authorAvatar={lesson.author.avatar}
                  showStats={showStats}
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
