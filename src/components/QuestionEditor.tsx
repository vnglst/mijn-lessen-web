import {
  ButtonGroup,
  Flex,
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
              <Flex key={option.id} flexDir="row" my={2}>
                <IconButton
                  icon={<DeleteIcon />}
                  mr={2}
                  onClick={() => {
                    const updated = question.options.filter(
                      (_, index) => index !== idx
                    );
                    updateQuestion({ ...question, options: updated });
                  }}
                  aria-label="Optie verwijdern"
                />
                <InputGroup>
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
              </Flex>
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
                option?.id === selectedId
                  ? { ...option, correct: true }
                  : { ...option, correct: false }
              );
              updateQuestion({ ...question, options: updated });
            }}
            value={selectedOption?.id}
          >
            {question.options.map(({ id, title }) => {
              return (
                <Radio py={3} pl={3} key={id} colorScheme="green" value={id}>
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
            onClick={() => {
              const newOption = {
                id: "" + question.options.length,
                title: "",
                correct: false,
              };
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
