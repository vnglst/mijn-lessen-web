import { FormControl, Input, Select } from "@chakra-ui/react";
import React, { FC } from "react";
import { Question, QuestionType } from "../../types";
import MyFormLabel from "../ui/MyFormLabel";
import AnswerEditor from "./AnswerEditor";
import OptionsEditor from "./OptionsEditor";

export interface QuestionEditorProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

const QuestionEditor: FC<QuestionEditorProps> = ({
  question,
  updateQuestion,
}) => {
  return (
    <>
      <FormControl my={4}>
        <MyFormLabel mb={2}>Vraagtype</MyFormLabel>
        <Select
          value={question.type}
          onChange={(e) =>
            updateQuestion({ ...question, type: e.target.value })
          }
        >
          <option value={QuestionType.MULTI}>Multiple choice</option>
          <option value={QuestionType.OPEN}>Open vraag</option>
        </Select>
      </FormControl>
      <FormControl isRequired my={4}>
        <MyFormLabel mb={2}>Vraag</MyFormLabel>
        <Input
          name={`question-${question.id}`}
          fontWeight="bold"
          fontSize="xl"
          autoComplete="off"
          value={question.title || ""}
          onChange={(e) =>
            updateQuestion({ ...question, title: e.target.value })
          }
        ></Input>
      </FormControl>
      <FormControl my={4}>
        <MyFormLabel>Subvraag</MyFormLabel>
        <Input
          name={`subquestion-${question.id}`}
          fontStyle="italic"
          autoComplete="off"
          value={question.subtitle || ""}
          onChange={(e) =>
            updateQuestion({ ...question, subtitle: e.target.value })
          }
        />
      </FormControl>

      {question.type === QuestionType.OPEN ? (
        <AnswerEditor question={question} updateQuestion={updateQuestion} />
      ) : (
        <OptionsEditor question={question} updateQuestion={updateQuestion} />
      )}
    </>
  );
};

export default QuestionEditor;
