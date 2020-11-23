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
} from "@chakra-ui/core";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { FC, MouseEvent, useState } from "react";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
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
    await niceFetch(`${API_URL}/protected/questions/${question.id}`, {
      method: "POST",
      body: JSON.stringify({
        title: question.title,
        subtitle: question.subtitle,
        options: question.options,
        lessonId: question.lessonId,
      }),
    });
    setSaving("saved");
    mutate();
    onClose();
  }

  async function handleCreate(e: MouseEvent) {
    e.preventDefault();
    setSaving("saving");
    await niceFetch(`${API_URL}/protected/questions/`, {
      method: "PUT",
      body: JSON.stringify({
        title: question.title,
        subtitle: question.subtitle,
        options: question.options,
        lessonId: question.lessonId,
      }),
    });
    setSaving("saved");
    mutate();
    onClose();
  }

  async function handleDelete() {
    const sure = confirm("Weet je zeker dat je deze wil verwijderen?");
    if (!sure) return;
    await niceFetch(`${API_URL}/protected/questions/${question.id}`, {
      method: "DELETE",
    });
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
      <Flex flexDir="column">
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

      {!initialQuestion.draft && (
        <IconButton
          icon={<DeleteIcon />}
          aria-label="Verwijderen"
          onClick={handleDelete}
          ml="auto"
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

      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        {/* TODO: refactors modals using this tip https://twitter.com/thesegunadebayo/status/1330866834636201987/photo/1 */}
        <ModalContent as="form">
          <ModalHeader>Vraag bewerken</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuestionEditor
              question={question}
              updateQuestion={updateQuestion}
            />
          </ModalBody>
          <ModalFooter
            mt={4}
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
          >
            <ButtonGroup>
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
              <Button ml={4} onClick={handleClose}>
                Sluiten
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionModal;
