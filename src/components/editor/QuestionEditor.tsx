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
  const typeKey = `${question.lessonId}-default-type`;
  const subtitleKey = `${question.lessonId}-default-subtitle`;

  const mapper = {
    [QuestionType.MULTI]: OptionsEditor,
    [QuestionType.OPEN]: AnswerEditor,
  };

  const AnswerCmp = mapper[question.type] || OptionsEditor;

  return (
    <>
      <FormControl my={4}>
        <MyFormLabel mb={2}>Vraagtype</MyFormLabel>
        <Select
          value={question.type}
          onChange={(e) => {
            sessionStorage.setItem(typeKey, e.target.value);
            updateQuestion({ ...question, type: e.target.value });
          }}
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
          onChange={(e) => {
            sessionStorage.setItem(subtitleKey, e.target.value);
            updateQuestion({ ...question, subtitle: e.target.value });
          }}
        />
      </FormControl>
      <AnswerCmp question={question} updateQuestion={updateQuestion} />
    </>
  );
};

export default QuestionEditor;
