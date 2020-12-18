import { Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { Lesson } from "../types";
import LessonCard from "./LessonCard";
import Underline from "./ui/Underline";

const variantsWrapper = {
  pageInitial: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, staggerDirection: 1 },
  },
};

const variantsCards = {
  pageAnimate: {
    y: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -10 },
    },
  },
  pageInitial: {
    y: 300,
    opacity: 0,
    transition: {
      x: { stiffness: 1000, velocity: -10 },
    },
  },
};

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
      <Wrap
        spacing={8}
        as={motion.div}
        initial="pageInitial"
        animate="pageAnimate"
        variants={variantsWrapper}
      >
        {lessons.map((lesson) => {
          return (
            <WrapItem
              key={lesson.slug}
              as={motion.div}
              variants={variantsCards}
            >
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
