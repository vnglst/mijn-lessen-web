import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { api } from "@helpers/api";
import { zIndexes } from "@helpers/constants";
import { useSession } from "@hooks/useSession";
import { useRouter } from "next/router";
import React, { FC, MouseEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { Lesson, QuestionType } from "../../types";
import MyFormLabel from "../ui/MyFormLabel";
import RichTextEditor from "../ui/RichTextEditor";
import SaveButton from "../ui/SaveButton";
import QuestionModal from "./QuestionModal";

export interface LessonEditorProps {
  lesson: Lesson;
}

type SaveState = "unsaved" | "saving" | "saved";

const LessonEditor: FC<LessonEditorProps> = ({ lesson }) => {
  const router = useRouter();
  const { session } = useSession();
  const queryClient = useQueryClient();
  const [intro, setIntro] = useState(lesson.intro);
  const [title, setTitle] = useState(lesson.title);
  const [subtitle, setSubtitle] = useState(lesson.subtitle || "");
  const [slug, setSlug] = useState(lesson.slug);
  const [imageUrl, setImageUrl] = useState(lesson.imageUrl || "");
  const [saving, setSaving] = useState("saved" as SaveState);

  const mutateLesson = () =>
    queryClient.invalidateQueries(`lessons/${lesson.slug}`);

  const isAdmin = session?.user.role === "ADMIN";

  async function handleSave(e: MouseEvent) {
    e.preventDefault();
    setSaving("saving");
    const updatedLesson: Lesson = await api
      .post(`protected/lessons/${lesson.slug}`, {
        json: {
          intro,
          title,
          slug,
          subtitle,
          imageUrl,
        },
      })
      .json();

    // only update cache when slug is unchanged
    if (lesson.slug === slug) mutateLesson();
    router
      .push(`/lessen/${updatedLesson.slug}`)
      .then(() => window.scrollTo(0, 0));
  }

  return (
    <>
      <Container display="flex" mt={14} maxWidth="2xl">
        <VStack as="form" spacing={10} width="100%" bgColor="white">
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

          {isAdmin && (
            <FormControl id="slug">
              <MyFormLabel>Slug</MyFormLabel>
              <Input
                type="text"
                autoComplete="off"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <FormHelperText>
                Slug (mini url) van je les. Deze is verplicht en moet uniek
                zijn.
              </FormHelperText>
            </FormControl>
          )}

          <HStack spacing={10} width="100%">
            <FormControl id="afbeelding">
              <MyFormLabel>Afbeelding</MyFormLabel>
              <Input
                type="url"
                autoComplete="off"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <FormHelperText>
                De link naar de afbeelding van je les
              </FormHelperText>
            </FormControl>
            {imageUrl && (
              <Image
                display={["none", "flex"]}
                objectFit="contain"
                src={imageUrl}
                maxHeight="100px"
                transform="rotate(5deg)"
                borderRadius="20px"
              />
            )}
          </HStack>

          <FormControl id="intro" isRequired>
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
                  <QuestionModal question={question} mutate={mutateLesson} />
                </ListItem>
              ))}
            </UnorderedList>
            <Box mt={2}>
              <QuestionModal
                mutate={mutateLesson}
                question={{
                  draft: true,
                  lessonId: lesson.id,
                  points: 1,
                  title: "",
                  subtitle: null,
                  options: [],
                  type: QuestionType.MULTI,
                }}
              />
            </Box>
          </FormControl>
        </VStack>
      </Container>
      <Flex
        position={["sticky"]}
        zIndex={zIndexes.justAboveBase}
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
          maxWidth="2xl"
        >
          <Button
            mr="auto"
            variant="link"
            onClick={() =>
              router
                .push(`/lessen/${lesson.slug}`)
                .then(() => window.scrollTo(0, 0))
            }
          >
            Annuleren
          </Button>
          <SaveButton
            onClick={handleSave}
            type="submit"
            isLoading={saving === "saving"}
          >
            Opslaan
          </SaveButton>
        </Container>
      </Flex>
    </>
  );
};

export default LessonEditor;
