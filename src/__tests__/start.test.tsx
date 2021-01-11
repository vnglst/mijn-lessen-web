/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import React, { FC } from "react";
import { lessons } from "../mocks/data/lessons";
import Start from "../pages/start";
import { SessionProvider } from "../providers/SessionProvider";
import { theme } from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

jest.mock("next/link", (): FC => ({ children }) => <>{children}</>);
jest.mock("react-lazyload", (): FC => ({ children }) => <>{children}</>);

const App = () => (
  <ReactQueryProvider>
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Start />
      </ChakraProvider>
    </SessionProvider>
  </ReactQueryProvider>
);

it("renders a lesson", async () => {
  render(<App />);
  const [firstLesson] = lessons;
  expect(await screen.findByText(firstLesson.title)).toBeInTheDocument();
});
