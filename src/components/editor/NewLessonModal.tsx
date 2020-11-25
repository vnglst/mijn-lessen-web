import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { default as React, FC, MouseEvent, useState } from "react";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import MyFormLabel from "../ui/MyFormLabel";
import SaveButton from "../ui/SaveButton";

export interface NewLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewLessonModal: FC<NewLessonModalProps> = ({ onClose, isOpen }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: MouseEvent) {
    e.preventDefault();
    setLoading(true);
    const { lesson: newLesson } = await niceFetch(
      `${API_URL}/protected/lessons/`,
      {
        method: "PUT",
        body: JSON.stringify({ title }),
      }
    );
    setLoading(false);
    setTitle("");
    onClose();
    router.push(`/mijn-lessen/${newLesson.slug}/bewerken`);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent as="form">
          <ModalHeader>Nieuwe les maken</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <FormControl isRequired>
              <MyFormLabel>Naam les</MyFormLabel>
              <Input
                fontFamily="'Montserrat', sans-serif;"
                fontWeight="900"
                fontSize="lg"
                py={6}
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText>
                Geef je les een leuke en unieke naam
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter
            mt={4}
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
          >
            <ButtonGroup>
              <SaveButton
                onClick={handleCreate}
                type="submit"
                isLoading={loading}
              >
                Maken
              </SaveButton>
              <Button ml={4} onClick={onClose}>
                Sluiten
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewLessonModal;
