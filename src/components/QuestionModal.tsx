import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";
import React, { FC, useState } from "react";
import { API_URL } from "../config";
import { niceFetch } from "../helpers";
import { Question } from "../providers/types";
import QuestionEditor from "./QuestionEditor";
import SaveButton from "./ui/SaveButton";

export interface QuestionModalProps {
  question: Question;
}

const QuestionModal: FC<QuestionModalProps> = ({
  question: initialQuestion,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Button
        leftIcon={<EditIcon />}
        mr={6}
        mb={6}
        onClick={onOpen}
        variant="outline"
      >
        {initialQuestion.title}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Vraag bewerken</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <QuestionEditor
                question={question}
                updateQuestion={updateQuestion}
              />
            </ModalBody>
            <ModalFooter>
              <SaveButton
                onClick={handleSubmit}
                saving={saving === "saving"}
                saved={saving === "saved"}
                unsaved={saving === "unsaved"}
              />
              <Button ml={3} onClick={onClose}>
                Afsluiten
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionModal;
