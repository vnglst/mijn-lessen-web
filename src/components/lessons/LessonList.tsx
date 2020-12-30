import { Heading, Skeleton, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { Lesson } from "../../types";
import LessonCard from "./LessonCard";
import Underline from "../ui/Underline";

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

export const CardSkeleton: FC = () => (
  <Stack spacing={5} width="100%">
    <Skeleton borderRadius="10px" height="40px" width="200px" />
    <Skeleton borderRadius="20px" height="450px" width="320px" />
  </Stack>
);

export interface LessonListProps {
  lessons?: Lesson[];
  heading: string;
}

const LessonList: FC<LessonListProps> = ({ heading, lessons }) => {
  if (!lessons) return <CardSkeleton />;

  if (lessons.length === 0) return null;

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
            <WrapItem key={lesson.slug}>
              <motion.div variants={variantsCards}>
                <LessonCard
                  slug={lesson.slug}
                  title={lesson.title}
                  subtitle={lesson.subtitle}
                  imageUrl={lesson.imageUrl}
                  status={lesson.status}
                  lesson={lesson}
                />
              </motion.div>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};

export default LessonList;
