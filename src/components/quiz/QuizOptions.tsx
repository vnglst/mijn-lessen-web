import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, useRadioGroup } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { Option } from "types";
import RadioCard from "./RadioCard";

const variantsRadioGroup = {
  pageInitial: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};

const variantsRadio = {
  pageAnimate: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -10 },
    },
  },
  pageInitial: {
    y: -50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -10 },
    },
  },
};

const getCheckedProps = (displayCorrect: boolean, displayWrong: boolean) => {
  if (displayCorrect) return { bg: "green.200", borderColor: "green.200" };
  if (displayWrong) return { bg: "red.200", borderColor: "red.200" };
  return {
    bg: "blue.200",
    borderColor: "blue.200",
  };
};

export interface QuizOptionsProps {
  onChange: (v: string) => void;
  options: Option[];
  isAnswered: boolean;
  value: string;
}

const QuizOptions: FC<QuizOptionsProps> = ({
  onChange,
  options,
  isAnswered,
  value,
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "answer",
    defaultValue: value,
    onChange,
  });

  const group = getRootProps();

  return (
    <Flex
      as={motion.div}
      {...group}
      initial="pageInitial"
      animate="pageAnimate"
      variants={variantsRadioGroup}
      flexWrap="wrap"
      justifyContent="center"
    >
      {options.map(({ id, title, correct }) => {
        const radio = getRadioProps({ value: id });
        const isSelected = id === value;
        const displayCorrect = isAnswered && isSelected && correct;
        const displayWrong = isAnswered && isSelected && !correct;
        return (
          <Flex
            as={motion.div}
            key={id}
            m={4}
            variants={variantsRadio}
            whileHover={!isAnswered ? { scale: 1.1 } : {}}
            whileTap={!isAnswered ? { scale: 0.95 } : {}}
          >
            <RadioCard
              {...radio}
              isDisabled={isAnswered}
              _checked={getCheckedProps(displayCorrect, displayWrong)}
            >
              {title}
              {displayCorrect && (
                <Flex ml="auto" pl={2} alignItems="center">
                  <CheckIcon fontSize="xs" />
                </Flex>
              )}
              {displayWrong && (
                <Flex ml="auto" pl={2} alignItems="center">
                  <CloseIcon fontSize="10px" />
                </Flex>
              )}
            </RadioCard>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default QuizOptions;
