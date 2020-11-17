import {
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/core";
import React, { FC } from "react";
import { Question } from "../providers/types";

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
      <FormLabel
        style={{ fontVariant: "all-small-caps" }}
        textTransform="uppercase"
        textColor="gray.600"
      >
        Vraag
      </FormLabel>
      <Input
        name={`question-${question.id}`}
        fontWeight="bold"
        fontSize="xl"
        value={question.title || ""}
        onChange={(e) => updateQuestion({ ...question, title: e.target.value })}
      ></Input>
      <FormLabel
        style={{ fontVariant: "all-small-caps" }}
        textTransform="uppercase"
        textColor="gray.600"
      >
        Subvraag
      </FormLabel>
      <Input
        name={`subquestion-${question.id}`}
        fontStyle="italic"
        value={question.subtitle || ""}
        onChange={(e) =>
          updateQuestion({ ...question, subtitle: e.target.value })
        }
      />
      <Flex flexDir="column">
        <FormLabel
          style={{ fontVariant: "all-small-caps" }}
          textTransform="uppercase"
          textColor="gray.600"
        >
          Opties
        </FormLabel>
        {question.options.map((option, idx) => {
          return (
            <InputGroup my={2} key={option.id}>
              <InputLeftAddon
                children={
                  <Text>
                    {idx + 1}
                    <sup>e</sup>
                  </Text>
                }
              />
              <Input
                name={`option-${option.id}`}
                value={option.title || ""}
                onChange={(e) => {
                  const updatedOptions = question.options.map((option, index) =>
                    index === idx
                      ? { ...option, title: e.target.value }
                      : option
                  );
                  updateQuestion({
                    ...question,
                    options: updatedOptions,
                  });
                }}
              />
            </InputGroup>
          );
        })}
      </Flex>
    </>
  );
};

export default QuestionEditor;
