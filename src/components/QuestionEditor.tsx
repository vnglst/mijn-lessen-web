import {
  ButtonGroup,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Text,
  VisuallyHidden,
} from "@chakra-ui/core";
import { AddIcon } from "@chakra-ui/icons";
import React, { FC } from "react";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { Question } from "../providers/types";

export interface QuestionEditorProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

const QuestionEditor: FC<QuestionEditorProps> = ({
  question,
  updateQuestion,
}) => {
  const selectedOption = question.options.find((o) => o.correct);

  return (
    <>
      <FormControl my={4}>
        <FormLabel
          style={{ fontVariant: "all-small-caps" }}
          textTransform="uppercase"
          textColor="gray.600"
          mb={2}
        >
          Vraag
        </FormLabel>
        <Input
          name={`question-${question.id}`}
          fontWeight="bold"
          fontSize="xl"
          value={question.title || ""}
          onChange={(e) =>
            updateQuestion({ ...question, title: e.target.value })
          }
        ></Input>
      </FormControl>
      <FormControl my={4}>
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
      </FormControl>

      <Grid
        templateAreas="'h1 h1 h2 h2' 'c1 c1 c1 c2'"
        templateColumns="4fr"
        gap={2}
      >
        <GridItem gridArea="h1">
          <FormLabel
            style={{ fontVariant: "all-small-caps" }}
            textTransform="uppercase"
            textColor="gray.600"
          >
            Opties
          </FormLabel>
        </GridItem>
        <GridItem gridArea="c1">
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
                    const updated = question.options.map((option, index) =>
                      index === idx
                        ? { ...option, title: e.target.value }
                        : option
                    );
                    updateQuestion({ ...question, options: updated });
                  }}
                />
              </InputGroup>
            );
          })}
        </GridItem>

        <GridItem gridArea="h2">
          <FormLabel
            style={{ fontVariant: "all-small-caps" }}
            textTransform="uppercase"
            textColor="gray.600"
          >
            Goede antwoord
          </FormLabel>
        </GridItem>
        <GridItem gridArea="c2">
          <RadioGroup
            display="flex"
            flexDir="column"
            onChange={(selectedId) => {
              const updated = question.options.map((option) =>
                option?.id == selectedId
                  ? { ...option, correct: true }
                  : { ...option, correct: false }
              );
              updateQuestion({ ...question, options: updated });
            }}
            value={selectedOption?.id.toString()}
          >
            {question.options.map(({ id, title }) => {
              return (
                <Radio
                  py={3}
                  pl={3}
                  key={id}
                  colorScheme="green"
                  value={id?.toString()}
                >
                  &nbsp;
                  <VisuallyHidden>{title}</VisuallyHidden>
                </Radio>
              );
            })}
          </RadioGroup>
        </GridItem>
        <ButtonGroup>
          <IconButton
            aria-label="Optie toevoegen"
            icon={<AddIcon />}
            onClick={async () => {
              const newOption = await niceFetch(
                `${API_URL}/protected/lessons/${question.lessonId}/questions/${question.id}/options`,
                {
                  method: "PUT",
                  body: JSON.stringify({ title: "" }),
                }
              );
              if (!newOption.id) return;
              updateQuestion({
                ...question,
                options: [...question.options, newOption],
              });
            }}
          />
        </ButtonGroup>
      </Grid>
    </>
  );
};

export default QuestionEditor;
