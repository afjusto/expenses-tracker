import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "@testing-library/react";
import { CategoriesList, Props } from ".";

let props: Props;

beforeEach(() => {
  props = {
    categories: [
      { id: "1", name: "Test category" },
      { id: "2", name: "Another test category" },
    ],
  };
});

test("renders a list of categories", () => {
  render(<CategoriesList {...props} />);

  expect(screen.getByText("Test category")).toBeInTheDocument();
  expect(screen.getByText("Another test category")).toBeInTheDocument();
});

test("filters the list of categories", () => {
  render(<CategoriesList {...props} />);

  expect(screen.getByText("Test category")).toBeInTheDocument();
  expect(screen.getByText("Another test category")).toBeInTheDocument();

  userEvent.type(screen.getByPlaceholderText(/search/i), "another");

  expect(screen.queryByText("Test category")).not.toBeInTheDocument();
  expect(screen.getByText("Another test category")).toBeInTheDocument();
});

test("performs an action when clicking in a list item", () => {
  props = { ...props, onCategoryClick: jest.fn() };
  render(<CategoriesList {...props} />);

  userEvent.click(screen.getByText("Test category"));
  expect(props.onCategoryClick).toHaveBeenCalled();
});

test("performs an action when pressing the enter key on a focused list item", () => {
  props = { ...props, onCategoryClick: jest.fn() };
  render(<CategoriesList {...props} />);

  fireEvent.keyDown(screen.getByText("Test category"), { key: "enter" });
  expect(props.onCategoryClick).toHaveBeenCalled();
});
