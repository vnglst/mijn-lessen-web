import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { FC, useState } from "react";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { Question } from "../providers/types";
import QuestionEditor from "./QuestionEditor";
import SaveButton from "./ui/SaveButton";

export interface QuestionModalProps {
  question: Question;
  mutate: any;
}

const QuestionModal: FC<QuestionModalProps> = ({
  question: initialQuestion,
  mutate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [question, setQuestion] = useState(initialQuestion);

  const [saving, setSaving] = useState(
    "unsaved" as "unsaved" | "saving" | "saved"
  );

  async function handleSave(e: any) {
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

  async function handleCreate(e: any) {
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
    handleClose();
  }

  async function handleDelete(e: any) {
    e.preventDefault();
    await niceFetch(`${API_URL}/protected/questions/${question.id}`, {
      method: "DELETE",
    });
    handleClose();
  }

  function updateQuestion(newQuestion: Question) {
    setSaving("unsaved");
    setQuestion(newQuestion);
  }

  function handleClose() {
    mutate();
    setQuestion(initialQuestion);
    onClose();
  }

  return (
    <>
      <Button
        leftIcon={initialQuestion.draft ? <AddIcon /> : <EditIcon />}
        mr={6}
        mb={6}
        onClick={onOpen}
        variant="outline"
        size="md"
      >
        {initialQuestion.title || "Nieuwe vraag"}
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
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
            justifyContent="space-between"
          >
            <Button
              leftIcon={<DeleteIcon />}
              variant="link"
              onClick={handleDelete}
            >
              Verwijderen
            </Button>
            <ButtonGroup>
              {initialQuestion.draft ? (
                <SaveButton
                  onClick={handleCreate}
                  type="submit"
                  saving={saving === "saving"}
                  saved={saving === "saved"}
                  unsaved={saving === "unsaved"}
                >
                  Toevoegen
                </SaveButton>
              ) : (
                <SaveButton
                  onClick={handleSave}
                  type="submit"
                  saving={saving === "saving"}
                  saved={saving === "saved"}
                  unsaved={saving === "unsaved"}
                />
              )}
              <Button ml={4} onClick={handleClose}>
                Afsluiten
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionModal;
