import { Box, CloseButton } from "@chakra-ui/react";
import LoginAlert from "@components/quiz/LoginAlert";
import HeroWave from "@components/ui/HeroWave";
import React, { FC } from "react";

export interface QuizContainerProps {
  onClose: () => void;
}

const QuizContainer: FC<QuizContainerProps> = ({ onClose, children }) => {
  return (
    <>
      <Box position="fixed" left={0} right={0}>
        <LoginAlert />
        <CloseButton onClick={onClose} size="md" m={2} p={2} />
      </Box>
      <HeroWave />
      {children}
    </>
  );
};

export default QuizContainer;
