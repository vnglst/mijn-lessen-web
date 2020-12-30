/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import React, { FC } from "react";
import Index from "../pages/index";
import { lessons } from "../mocks/data/lessons";

jest.mock("next/link", (): FC => ({ children }) => <>{children}</>);
jest.mock("react-lazyload", (): FC => ({ children }) => <>{children}</>);

it("renders a lesson", async () => {
  render(<Index />);
  const [firstLesson] = lessons;
  expect(await screen.findByText(firstLesson.title)).toBeInTheDocument();
});
