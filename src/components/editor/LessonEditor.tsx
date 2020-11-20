import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  Image,
  Input,
  ListItem,
  UnorderedList,
  VStack,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { FC, MouseEvent, useState } from "react";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { Lesson } from "../../types";
import MyFormLabel from "../ui/MyFormLabel";
import RichTextEditor from "../ui/RichTextEditor";
import SaveButton from "../ui/SaveButton";
import TextLink from "../ui/TextLink";
import QuestionModal from "./QuestionModal";

export interface LessonEditorProps {
  lesson: Lesson;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
}

type SaveState = "unsaved" | "saving" | "saved";

const LessonEditor: FC<LessonEditorProps> = ({ lesson, mutate }) => {
  const router = useRouter();
  const [intro, setIntro] = useState(lesson.intro);
  const [title, setTitle] = useState(lesson.title);
  const [subtitle, setSubtitle] = useState(lesson.subtitle || "");
  const [image, setImage] = useState(lesson.imageUrl || "");
  const [saving, setSaving] = useState("saved" as SaveState);

  async function handleSave(e: MouseEvent) {
    e.preventDefault();
    setSaving("saving");
    const updatedLesson: Lesson = await niceFetch(
      `${API_URL}/protected/lessons/${lesson.slug}`,
      {
        method: "POST",
        body: JSON.stringify({
          intro,
          title,
          subtitle,
          imageUrl: image,
        }),
      }
    );
    mutate(updatedLesson);
    setSaving("saved");
  }

  return (
    <>
      <Container display="flex" mt={14}>
        <VStack as="form" spacing={10} width="100%">
          <FormControl id="title" isRequired>
            <MyFormLabel>Naam les</MyFormLabel>
            <Input
              type="text"
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

          <FormControl id="subtitle">
            <MyFormLabel>Subtitel</MyFormLabel>
            <Input
              type="text"
              autoComplete="off"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <FormHelperText>Korte beschrijving van je les</FormHelperText>
          </FormControl>

          <HStack spacing={10} width="100%">
            <FormControl id="afbeelding">
              <MyFormLabel>Afbeelding</MyFormLabel>
              <Input
                type="url"
                autoComplete="off"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <FormHelperText>
                De link naar de afbeelding van je les
              </FormHelperText>
            </FormControl>
            {image && (
              <Image
                display={["none", "flex"]}
                objectFit="contain"
                src={image}
                maxHeight="100px"
                style={{ transform: "rotate(5deg)" }}
              />
            )}
          </HStack>

          <FormControl id="afbeelding" isRequired>
            <MyFormLabel>Uitleg</MyFormLabel>
            <RichTextEditor
              value={intro || ""}
              onChange={(html) => {
                setIntro(html);
                setSaving("unsaved");
              }}
            />
            <FormHelperText mt={4}>
              Uitgebreide uitleg bij je les
            </FormHelperText>
          </FormControl>

          <FormControl
            id="questions"
            isRequired
            display="flex"
            flexDir="column"
            mb={10}
          >
            <MyFormLabel>Vragen</MyFormLabel>
            <FormHelperText my={3}>
              Voeg hier de vragen toe. Een les heeft minimaal 1 vraag.
            </FormHelperText>
            <UnorderedList ml={0}>
              {lesson.questions.map((question) => (
                <ListItem
                  key={question.id}
                  display="flex"
                  my={5}
                  p={5}
                  backgroundColor="gray.50"
                  borderRadius={10}
                  alignItems="baseline"
                >
                  <QuestionModal question={question} mutate={mutate} />
                </ListItem>
              ))}
            </UnorderedList>
            <Box mt={2}>
              <QuestionModal
                mutate={mutate}
                question={{
                  lessonId: lesson.id,
                  title: "",
                  subtitle: "",
                  draft: true,
                  options: [],
                }}
              />
            </Box>
          </FormControl>
        </VStack>
      </Container>

      <Flex
        position={["sticky"]}
        bottom="0"
        bg="white"
        width="100%"
        borderTop="2px solid"
        borderColor="gray.200"
        py={[5, 10]}
      >
        <Container
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexWrap="wrap-reverse"
        >
          <TextLink mb={[8, 2]} mr={[0, "auto"]} href="/mijn-lessen">
            Terug naar mijn lessen
          </TextLink>
          <ButtonGroup>
            <Button
              mb={[8, 2]}
              mr={2}
              marginLeft="auto"
              onClick={() => router.push(`/lessen/${lesson.slug}`)}
            >
              Bekijken
            </Button>
            <SaveButton
              onClick={handleSave}
              type="submit"
              isLoading={saving === "saving"}
            />
          </ButtonGroup>
        </Container>
      </Flex>
    </>
  );
};

export default LessonEditor;
