import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import { EntitiesList, Props } from ".";

let props: Props;

beforeEach(() => {
  props = {
    entities: [
      { id: "1", name: "Test entity" },
      { id: "2", name: "Another test entity" },
    ],
  };
});

test("renders a list of entities", () => {
  render(<EntitiesList {...props} />);

  expect(screen.getByText("Test entity")).toBeInTheDocument();
  expect(screen.getByText("Another test entity")).toBeInTheDocument();
});

test("filters the list of entities", () => {
  render(<EntitiesList {...props} />);

  expect(screen.getByText("Test entity")).toBeInTheDocument();
  expect(screen.getByText("Another test entity")).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText(/search/i), "another");

  expect(screen.queryByText("Test entity")).not.toBeInTheDocument();
  expect(screen.getByText("Another test entity")).toBeInTheDocument();
});

test("performs an action when clicking in a list item", () => {
  props = { ...props, onEntityClick: jest.fn() };
  render(<EntitiesList {...props} />);

  fireEvent.click(screen.getByText("Test entity"));
  expect(props.onEntityClick).toHaveBeenCalled();
});

test("performs an action when pressing the enter key on a focused list item", () => {
  props = { ...props, onEntityClick: jest.fn() };
  render(<EntitiesList {...props} />);

  fireEvent.keyDown(screen.getByText("Test entity"), { key: "enter" });
  expect(props.onEntityClick).toHaveBeenCalled();
});
