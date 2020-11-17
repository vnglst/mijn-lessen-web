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
  Skeleton,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/core";
import { EditIcon } from "@chakra-ui/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { GiHearts, GiLightBulb } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import useSWR from "swr";
import HeroWave from "../../../components/HeroWave";
import NavBar from "../../../components/NavBar";
import QuestionModal from "../../../components/QuestionModal";
import SaveButton from "../../../components/ui/SaveButton";
import TextLink from "../../../components/ui/TextLink";
import { API_URL } from "../../../config";
import { niceFetch } from "../../../helpers";
import { Lesson, Question } from "../../../providers/types";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
];

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const LessonOverview: FC = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [openQuestion, setOpenQuestion] = useState(
  //   undefined as undefined | Question
  // );
  // console.log("openQuestion", openQuestion);

  const router = useRouter();
  const { lessonId } = router.query;
  const { data, mutate } = useSWR(
    () => (lessonId ? `${API_URL}/lessons/${lessonId}` : null),
    niceFetch
  );
  const lesson: Lesson | null = data?.lesson;

  const [intro, setIntro] = useState("");
  const [saving, setSaving] = useState(
    "saved" as "unsaved" | "saving" | "saved"
  );

  useEffect(() => {
    if (lesson?.intro && !intro) setIntro(lesson.intro);
  }, [lesson?.intro]);

  async function handleSubmit(e: any) {
    const { subtitle, title } = e.target.form;
    e.preventDefault();
    setSaving("saving");
    const lesson: Lesson = await niceFetch(
      `${API_URL}/protected/lessons/${lessonId}`,
      {
        method: "POST",
        body: JSON.stringify({
          title: title.value,
          subtitle: subtitle.value,
          intro,
        }),
      }
    );
    mutate(lesson);
    setSaving("saved");
  }

  if (!lesson) return null;

  return (
    <Box as="main" minHeight="100vh" display="flex" flexDirection="column">
      <header>
        <NavBar />
      </header>
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
            {/* TODO: custom medium like toolbar https://github.com/zenoamaro/react-quill#html-toolbar */}
            <Box mb={12}>
              <ReactQuill
                theme="snow"
                value={intro}
                onChange={(html) => {
                  setIntro(html);
                  setSaving("unsaved");
                }}
                modules={modules}
                formats={formats}
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
                  <QuestionModal key={question.id} question={question} />
                ))}
              </Flex>
            </Flex>

            <ButtonGroup
              position={["initial", "sticky"]}
              bottom="0"
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexWrap="wrap-reverse"
              bg="white"
              width="100%"
              pt={2}
            >
              <TextLink mb={[8, 2]} mr={[0, "auto"]} href="/mijn-lessen">
                Terug naar mijn lessen
              </TextLink>
              <Button
                mb={[8, 2]}
                mr={2}
                marginLeft="auto"
                onClick={() => {
                  router.push(`/lessen/${lessonId}`);
                }}
              >
                Bekijken
              </Button>
              <SaveButton
                ml="auto"
                mb={[8, 2]}
                onClick={handleSubmit}
                saving={saving === "saving"}
                saved={saving === "saved"}
                unsaved={saving === "unsaved"}
              />
            </ButtonGroup>
          </Container>
        </Flex>
      </form>
      <Flex
        width="100%"
        mt="auto"
        height="100%"
        pt="100px"
        pb={5}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#FFFFFF 48.72%,#fef4e2 82.16%);"
      ></Flex>
    </Box>
  );
};

export default LessonOverview;
