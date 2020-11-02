import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  FormControl,
  Heading,
  Link,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/core";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { niceFetch } from "../../..";
import AppHead from "../../../../components/Head";
import HeroWave from "../../../../components/HeroWave";
import NavBar from "../../../../components/NavBar";
import { API_URL } from "../../../../config";

function LessonPage({
  next,
  current,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR(
    `${API_URL}/answers/?lessonId=${current.lessonId}`,
    niceFetch
  );

  const answer = data && data.answers?.find((a) => a.questionId === current.id);
  const initialOptionId = answer ? answer.optionId : undefined;

  const [optionId, setOptionId] = useState("");

  console.log("optionId", optionId);
  const [answerState, setAnswerState] = useState(
    null as null | "correct" | "incorrect"
  );
  const nextUrl = next && `/lessen/${next.lessonId}/vraag/${next.id}`;
  const router = useRouter();

  useEffect(() => {
    setOptionId(initialOptionId + "");
  }, [initialOptionId]);

  async function handleSubmit() {
    const { isCorrect } = await niceFetch(
      `${API_URL}/questions/${current.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          optionId: parseInt(optionId, 10),
          lessonId: current.lessonId,
        }),
      }
    );
    setAnswerState(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      if (!isCorrect) return;
      if (next) {
        setAnswerState(null);
        return router.push(nextUrl);
      }
      router.push(`/lessen/${current.lessonId}/`);
      // TODO: goto lesson report when ended
    }, 500);
  }

  return (
    <>
      <AppHead>
        <title>Vraag {current.title} | Wiser.Today</title>
      </AppHead>
      <NavBar>
        <ButtonGroup>
          <CloseButton
            onClick={() => {
              const answer = confirm("Weet je het zeker dat je wilt stoppen?");
              if (answer) router.push(`/lessen/${current.lessonId}/`);
            }}
            size="md"
            p="20px"
          />
        </ButtonGroup>
      </NavBar>

      <HeroWave>
        <Heading
          as="h1"
          size="xl"
          p="40px"
          marginTop={["150px"]}
          fontWeight="900"
          noOfLines={3}
          lineHeight={1.6}
          textAlign="center"
          width="100%"
        >
          {current.title}
        </Heading>
      </HeroWave>

      <Box display="flex" flexDirection="column" alignItems="center">
        {/* <Box
          width="100%"
          display="flex"
          // background="radial-gradient(156.8% 154.5% at 63.52% -34.38%, #FCDB8B 10.94%, #FAEBC9 90.39%);"
          // background="radial-gradient(156.8% 154.5% at 63.52% -34.38%, #EFB4FD 10.94%, #F8DEFC 90.39%);"
          // background="radial-gradient(202.15% 198.95% at 85.93% -78.83%, #B0E3FF 0%, #CCEDFF 82.16%);"
          // background="radial-gradient(202.15% 198.95% at 85.93% -78.83%, #F6A89E 0%, #FFF0EE 82.16%);"
          background="radial-gradient(202.15% 198.95% at 85.93% -78.83%,#66c9ff 0%,#ffffff 82.16%)"
          // background="radial-gradient(215.96% 212.61% at 83.47% -92.49%, #15DFC6 0%, #B5E5DF 82.16%);"
          // background="radial-gradient(215.96% 212.61% at 83.47% -92.49%, #15DFC6 0%, #B5E5DF 82.16%);"
          justifyContent="space-between"
          flexDirection="column"
          // border="2px solid black"
          // borderLeft="none"
          // borderRight="none"
        >
          <Heading
            as="h1"
            size="xl"
            p="40px"
            marginTop={["150px"]}
            fontWeight="900"
            noOfLines={3}
            lineHeight={1.6}
            textAlign="center"
          >
            {current.title}
          </Heading>
          {/* <svg viewBox="0 5200 500" preserveAspectRatio="xMinYMin meet">
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            style={{ stroke: "none", fill: "red" }}
          ></path>
        </svg> */}

        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          // class="w-full absolute text-indigo-500 top-0"
          style={{
            width: "100%",
            display: "absolute",
            maxHeight: "200px",
            color: "#FCDB8B",
            // color: "#A9EAE2",
          }}
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L40,101.3C80,139,160,213,240,229.3C320,245,400,203,480,176C560,149,640,139,720,154.7C800,171,880,213,960,224C1040,235,1120,213,1200,213.3C1280,213,1360,235,1400,245.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg> 
        </Box> */}

        <Box maxWidth="xl" width="100%" display="flex" flexDirection="column">
          <form
            // style={{ width: "100%" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginTop="80px"
            >
              <RadioGroup
                onChange={(v) => {
                  setOptionId(v);
                }}
                value={optionId}
              >
                <Stack direction="column">
                  {current.options.map(({ title, id }) => {
                    return (
                      <Radio
                        marginY="10px"
                        key={id}
                        colorScheme="blue"
                        size="lg"
                        value={"" + id}
                      >
                        {title}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </FormControl>
            {answerState === "incorrect" && (
              <Text color="tomato">Helaas, dat is niet juist.</Text>
            )}
            {answerState === "correct" && <Text>Goed zo!</Text>}
            <ButtonGroup
              display="flex"
              justifyContent="space-between"
              my="100px"
              // mx="40px"
              px="40px"
              // width="100%"
            >
              {next && (
                <NextLink
                  href={`/lessen/${next.lessonId}/vraag/${next.id}`}
                  passHref
                >
                  <Link my="auto">Overslaan</Link>
                </NextLink>
              )}
              <Button type="submit" marginLeft="auto" variant="my-green">
                Controleren
              </Button>
            </ButtonGroup>
            <Progress value={30} size="40px" />
          </form>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { questionId, lessonId } = context.params as any;
  const res = await fetch(
    `${API_URL}/questions/${questionId}/?lessonId=${lessonId}`
  );
  const { next = null, current } = await res.json();
  return { props: { next, current } };
}

export default LessonPage;
