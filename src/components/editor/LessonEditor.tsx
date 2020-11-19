import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/core";
import React, { FC, useState } from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { mutate } from "swr";
import { API_URL } from "../../config";
import { niceFetch } from "../../helpers";
import { Lesson } from "../../providers/types";
import HeroWave from "../HeroWave";
import QuestionModal from "../QuestionModal";
import RichTextEditor from "../ui/RichTextEditor";
import SaveButton from "../ui/SaveButton";
import TextLink from "../ui/TextLink";

export interface LessonEditorProps {
  lesson: Lesson;
}

const LessonEditor: FC<LessonEditorProps> = ({ lesson }) => {
  const [intro, setIntro] = useState(lesson.intro);
  const [saving, setSaving] = useState(
    "saved" as "unsaved" | "saving" | "saved"
  );

  async function handleSubmit(e: any) {
    const { subtitle, title } = e.target.form;
    e.preventDefault();
    setSaving("saving");
    const updatedLesson: Lesson = await niceFetch(
      `${API_URL}/protected/lessons/${lesson.slug}`,
      {
        method: "POST",
        body: JSON.stringify({
          title: title.value,
          subtitle: subtitle.value,
          intro,
        }),
      }
    );
    mutate(`${API_URL}/lessons/${lesson.slug}`, updatedLesson);
    setSaving("saved");
  }

  return (
    <form>
      <HeroWave>
        <Container display="flex" mt={14} justify="space-between">
          <Flex flexDirection="column" width="100%">
            <Editable
              defaultValue={lesson.title}
              selectAllOnFocus={false}
              width="100%"
              onBlur={() => setSaving("unsaved")}
            >
              <Heading
                size="md"
                style={{ fontVariant: "all-small-caps" }}
                textTransform="uppercase"
                textColor="gray.600"
                textAlign="left"
                ml="-90px"
                mb={4}
              >
                Titel
              </Heading>
              <EditablePreview
                fontFamily="'Montserrat', sans-serif;"
                fontSize="4xl"
                marginTop="auto"
                fontWeight="900"
                noOfLines={3}
                textColor="gray.800"
                lineHeight={1.6}
                minHeight="80px"
              />
              <EditableInput
                as={Textarea}
                name="title"
                fontFamily="'Montserrat', sans-serif;"
                fontSize="4xl"
                marginTop="auto"
                fontWeight="900"
                noOfLines={3}
                textColor="gray.800"
                lineHeight={1.6}
                minHeight="80px"
              />
            </Editable>
            <Editable
              defaultValue={lesson.subtitle || ""}
              selectAllOnFocus={false}
              width="100%"
              onBlur={() => setSaving("unsaved")}
            >
              <EditablePreview width="100%" fontSize="lg" minHeight="50px" />
              <EditableInput
                name="subtitle"
                as={Textarea}
                width="100%"
                fontSize="lg"
                minHeight="50px"
              />
            </Editable>
          </Flex>
          {lesson.imageUrl && (
            <Image
              display={["none", "flex"]}
              objectFit="contain"
              src={lesson.imageUrl}
              maxHeight="100px"
              style={{
                transform: "rotate(5deg)",
              }}
            />
          )}
        </Container>
      </HeroWave>
      <Flex width="100%" flexDirection="column" alignItems="center" mt={6}>
        <Container>
          <Flex
            my={1}
            ml="auto"
            alignItems="center"
            fontSize="xs"
            textColor="gray.600"
            width="100%"
          >
            <Text>{lesson.points}</Text>
            <Box ml={2} mr={5} as={GiLightBulb} color="yellow.400" />
            <Text>{lesson.viewCount}</Text>
            <Box ml={2} mr={5} as={GrView} />
            <Text>{lesson.likeCount}</Text>
            <Box ml={2} as={GiHearts} color="red.300" />
          </Flex>
          <Divider my={4} />
          <Flex width="100%" mb={8}>
            <Flex flexDirection="column">
              <Text
                style={{ fontVariant: "all-small-caps" }}
                textTransform="uppercase"
              >
                Les gemaakt door:
              </Text>
              <Flex mt={2}>
                <Avatar size="xs" src={lesson.author.avatar || ""} />
                <Text ml={2}>{lesson.author.name}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Heading
            size="md"
            style={{ fontVariant: "all-small-caps" }}
            textTransform="uppercase"
            textColor="gray.600"
            textAlign="left"
            ml="-100px"
            mb={4}
          >
            Uitleg
          </Heading>

          <Box mb={12}>
            <RichTextEditor
              value={intro || ""}
              onChange={(html) => {
                setIntro(html);
                setSaving("unsaved");
              }}
            />
          </Box>

          <Flex flexDir="column" mb={16}>
            <Heading
              my={4}
              size="md"
              style={{ fontVariant: "all-small-caps" }}
              textTransform="uppercase"
              textColor="gray.600"
              ml="-100px"
              mb={4}
            >
              Vragen
            </Heading>
            <Flex wrap="wrap" alignItems="flex-start">
              {lesson.questions.map((question) => (
                <QuestionModal
                  key={question.id}
                  question={question}
                  mutate={mutate}
                />
              ))}
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
            </Flex>
          </Flex>

          <Flex
            // position={["initial", "sticky"]}
            bottom="0"
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexWrap="wrap-reverse"
            bg="white"
            width="100%"
            pt={5}
          >
            <TextLink mb={[8, 2]} mr={[0, "auto"]} href="/mijn-lessen">
              Terug naar mijn lessen
            </TextLink>
            <ButtonGroup>
              <Button
                mb={[8, 2]}
                mr={2}
                marginLeft="auto"
                onClick={() => {
                  router.push(`/lessen/${lessonSlug}`);
                }}
              >
                Bekijken
              </Button>
              <SaveButton
                ml="auto"
                mb={[8, 2]}
                type="submit"
                onClick={handleSubmit}
                saving={saving === "saving"}
                saved={saving === "saved"}
                unsaved={saving === "unsaved"}
              />
            </ButtonGroup>
          </Flex>
        </Container>
      </Flex>
    </form>
  );
};

export default LessonEditor;
