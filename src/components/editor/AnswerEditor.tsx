import { FormControl, Input } from "@chakra-ui/react";
import MyFormLabel from "@components/ui/MyFormLabel";
import React, { FC } from "react";
import { Question } from "types";

export interface AnswerEditorProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

const AnswerEditor: FC<AnswerEditorProps> = ({ question, updateQuestion }) => {
  const selectedOption = question.options.find((o) => o.correct);
  return (
    <FormControl my={4}>
      <MyFormLabel>Antwoord</MyFormLabel>
      <Input
        name={`antwoord-${question.id}`}
        autoComplete="off"
        value={selectedOption?.title}
        onChange={(e) =>
          updateQuestion({
            ...question,
            options: [{ correct: true, title: e.target.value, id: "koen" }],
          })
        }
      />
    </FormControl>
  );
};

export default AnswerEditor;
