import { FormControl, Input } from "@chakra-ui/react";
import MyFormLabel from "@components/ui/MyFormLabel";
import React, { FC, useState } from "react";
import { Option } from "types";

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
  const correctOption = options.find((o) => o.correct) as Option;
  const [answer, setAnswer] = useState(
    value === correctOption.id ? correctOption.title : ""
  );

  return (
    <FormControl
      id="answer"
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={16}
      isRequired
      isDisabled={isAnswered}
    >
      <Input
        autoFocus
        maxW="xs"
        type="text"
        autoComplete="off"
        value={answer}
        variant={isAnswered ? "filled" : "outline"}
        onChange={(e) => {
          const newAnswer = e.target.value;
          setAnswer(newAnswer);
          if (newAnswer === correctOption.title) {
            onChange(correctOption.id);
          } else {
            onChange("non-existing-id");
          }
        }}
      />
    </FormControl>
  );
};

export default QuizOptions;
