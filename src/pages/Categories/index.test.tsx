import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import { render, screen, waitFor } from "@testing-library/react";
import { getCategories } from "@/utils/categories-client";
import { Categories } from ".";

jest.mock("@/utils/categories-client", () => ({
  deleteCategory: jest.fn(() => Promise.resolve()),
  getCategories: jest.fn(),
  updateCategory: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  mocked(getCategories).mockClear();
  mocked(getCategories).mockResolvedValue({
    categories: [
      {
        id: "category1",
        name: "test category",
      },
      {
        id: "category2",
        name: "another test category",
      },
    ],
  });
});

test("renders the category page", async () => {
  render(<Categories />);
  await act(() => Promise.resolve());

  expect(
    screen.getByRole("heading", { name: "Categories" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add category/i })
  ).toBeInTheDocument();
});

test("renders an empty state when there are no categories", async () => {
  mocked(getCategories).mockResolvedValueOnce({ categories: [] });
  render(<Categories />);

  await screen.findByText(/no categories yet/i);
  expect(screen.getByText(/no categories yet/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create now/i })
  ).toBeInTheDocument();
});

test("opens the form drawer when the create now button (empty state) is clicked", async () => {
  mocked(getCategories).mockResolvedValueOnce({ categories: [] });
  render(<Categories />);

  expect(screen.queryByTestId("category-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /create now/i });
  userEvent.click(screen.getByRole("button", { name: /create now/i }));
  expect(screen.queryByTestId("category-form")).toBeVisible();
});

test("renders a list of categories", async () => {
  render(<Categories />);

  await waitFor(() => {
    expect(screen.getByText("test category")).toBeInTheDocument();
    expect(screen.getByText("another test category")).toBeInTheDocument();
  });
});

test("opens the form drawer when the add category button is clicked", async () => {
  render(<Categories />);

  expect(screen.queryByTestId("category-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /add category/i });
  userEvent.click(screen.getByRole("button", { name: /add category/i }));
  expect(screen.queryByTestId("category-form")).toBeVisible();
});

test("opens the form drawer when a list item is clicked", async () => {
  render(<Categories />);

  expect(screen.queryByTestId("category-form")).not.toBeInTheDocument();
  await screen.findByText("test category");
  userEvent.click(screen.getByText("test category"));
  expect(screen.queryByTestId("category-form")).toBeVisible();
});

test("closes the form drawer and re-fetches data after an category is deleted", async () => {
  render(<Categories />);

  await screen.findByText("test category");
  userEvent.click(screen.getByText("test category"));
  expect(screen.queryByTestId("category-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /delete/i }));
  userEvent.click(screen.getByRole("button", { name: /yes/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("category-form")).not.toBeInTheDocument()
  );
  expect(mocked(getCategories)).toHaveBeenCalledTimes(2);
});

test("closes the form drawer and re-fetches data after the form is submitted", async () => {
  render(<Categories />);

  await screen.findByText("test category");
  userEvent.click(screen.getByText("test category"));
  expect(screen.queryByTestId("category-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("category-form")).not.toBeInTheDocument()
  );
  expect(mocked(getCategories)).toHaveBeenCalledTimes(2);
});
