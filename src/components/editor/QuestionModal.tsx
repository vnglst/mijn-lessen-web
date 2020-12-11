import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { api } from "@helpers/api";
import React, { FC, MouseEvent, useState } from "react";
import { Question } from "../../types";
import SaveButton from "../ui/SaveButton";
import QuestionEditor from "./QuestionEditor";

export interface QuestionModalProps {
  question: Question;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
}

type SaveState = "unsaved" | "saving" | "saved";

const QuestionModal: FC<QuestionModalProps> = ({
  question: initialQuestion,
  mutate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState(initialQuestion);
  const [saving, setSaving] = useState("unsaved" as SaveState);

  async function handleSave(e: MouseEvent) {
    e.preventDefault();
    setSaving("saving");

    await api.post(`protected/questions/${question.id}`, {
      json: {
        title: question.title,
        subtitle: question.subtitle,
        options: question.options,
        lessonId: question.lessonId,
      },
    });

    mutate();
    onClose();
    setSaving("saved");
  }

  async function handleCreate(e: MouseEvent) {
    e.preventDefault();
    setSaving("saving");

    await api.put(`protected/questions/`, {
      json: {
        title: question.title,
        subtitle: question.subtitle,
        options: question.options,
        lessonId: question.lessonId,
      },
    });

    mutate();
    handleClose();
    setSaving("saved");
  }

  async function handleDelete() {
    const sure = confirm("Weet je zeker dat je deze wil verwijderen?");
    if (!sure) return;
    await api.delete(`protected/questions/${question.id}`);
    mutate();
  }

  function updateQuestion(newQuestion: Question) {
    setSaving("unsaved");
    setQuestion(newQuestion);
  }

  function handleClose() {
    setQuestion(initialQuestion);
    onClose();
  }

  return (
    <>
      <Flex flexDir="column" overflow="hidden">
        {initialQuestion.title && (
          <Text isTruncated fontWeight="bold">
            {initialQuestion.title}
          </Text>
        )}

        {initialQuestion.subtitle && (
          <Text mt={2} isTruncated fontSize="sm">
            {initialQuestion.subtitle}
          </Text>
        )}
      </Flex>

      <ButtonGroup ml="auto">
        {!initialQuestion.draft && (
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Verwijderen"
            onClick={handleDelete}
            variant="outline"
          />
        )}

        {initialQuestion.draft ? (
          <IconButton
            icon={<AddIcon />}
            size="lg"
            aria-label="Toevoegen"
            onClick={onOpen}
          />
        ) : (
          <IconButton
            ml={4}
            variant="outline"
            icon={<EditIcon />}
            size="md"
            aria-label="Bewerken"
            onClick={onOpen}
          />
        )}
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        {/* TODO: refactors modals using this tip https://twitter.com/thesegunadebayo/status/1330866834636201987/photo/1 */}
        <ModalContent as="form">
          <ModalHeader>
            {initialQuestion.draft ? "Nieuwe vraag" : "Vraag bewerken"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuestionEditor
              question={question}
              updateQuestion={updateQuestion}
            />
          </ModalBody>
          <ModalFooter
            my={2}
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            <Button variant="link" onClick={handleClose}>
              Annuleren
            </Button>
            {initialQuestion.draft ? (
              <SaveButton
                onClick={handleCreate}
                type="submit"
                isLoading={saving === "saving"}
              >
                Toevoegen
              </SaveButton>
            ) : (
              <SaveButton
                onClick={handleSave}
                type="submit"
                isLoading={saving === "saving"}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionModal;
