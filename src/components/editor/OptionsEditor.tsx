import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  VisuallyHidden,
  Text,
} from "@chakra-ui/react";
import MyFormLabel from "@components/ui/MyFormLabel";
import { nanoid } from "nanoid";
import React, { FC } from "react";
import { Question } from "types";

export interface OptionsEditorProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

const OptionsEditor: FC<OptionsEditorProps> = ({
  question,
  updateQuestion,
}) => {
  const selectedOption = question.options.find((o) => o.correct);

  return (
    <Grid
      templateAreas="'h1 h1 h2 h2' 'c1 c1 c1 c2'"
      templateColumns="4fr"
      gap={2}
    >
      <GridItem gridArea="h1">
        <MyFormLabel>Opties</MyFormLabel>
      </GridItem>
      <GridItem gridArea="c1">
        {question.options.map((option, idx) => {
          return (
            <FormControl
              display="flex"
              isRequired
              key={option.id}
              flexDir="row"
              my={2}
            >
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
                <InputLeftAddon>
                  <Text>
                    {idx + 1}
                    <sup>e</sup>
                  </Text>
                </InputLeftAddon>
                <Input
                  name={`option-${option.id}`}
                  value={option.title || ""}
                  autoComplete="off"
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
            </FormControl>
          );
        })}
      </GridItem>

      <GridItem gridArea="h2">
        <MyFormLabel>Goede antwoord</MyFormLabel>
      </GridItem>
      <FormControl as={GridItem} isRequired gridArea="c2">
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
      </FormControl>

      <ButtonGroup>
        <IconButton
          aria-label="Optie toevoegen"
          icon={<AddIcon />}
          onClick={() => {
            const newOption = {
              id: nanoid(10),
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
  );
};

export default OptionsEditor;
