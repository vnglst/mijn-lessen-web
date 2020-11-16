import {
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  Text,
} from "@chakra-ui/core";
import React, { FC, useState } from "react";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { Question } from "../providers/types";
import SaveButton from "./ui/SaveButton";

export interface QuestionEditorProps {
  question: Question;
  number: number;
}

const QuestionEditor: FC<QuestionEditorProps> = ({
  question: initialQuestion,
  number,
}) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [saving, setSaving] = useState(
    "saved" as "unsaved" | "saving" | "saved"
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving("saving");
    await niceFetch(
      `${API_URL}/protected/lessons/${question.lessonId}/questions/${question.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          title: question.title,
          subtitle: question.subtitle,
          options: question.options,
        }),
      }
    );
    setSaving("saved");
  }

  function updateQuestion(newQuestion: Question) {
    setSaving("unsaved");
    setQuestion(newQuestion);
  }

  return (
    <ListItem>
      <FormLabel>Vraag {number}</FormLabel>
      <Input
        name={`question-${question.id}`}
        fontWeight="bold"
        fontSize="xl"
        value={question.title}
        onChange={(e) => updateQuestion({ ...question, title: e.target.value })}
        my={2}
      ></Input>
      <FormLabel>Subvraag</FormLabel>
      <Input
        name={`subquestion-${question.id}`}
        fontStyle="italic"
        value={question.subtitle}
        onChange={(e) =>
          updateQuestion({ ...question, subtitle: e.target.value })
        }
      />
      <Flex flexDir="column" my={4}>
        <Text>Opties</Text>
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
                value={option.title}
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
      <ButtonGroup>
        <Button colorScheme="orange">Annuleren</Button>
        <SaveButton
          handleSave={handleSubmit}
          saving={saving === "saving"}
          saved={saving === "saved"}
          unsaved={saving === "unsaved"}
        />
      </ButtonGroup>
    </ListItem>
  );
};

export default QuestionEditor;
