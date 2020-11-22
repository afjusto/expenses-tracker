import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { render, screen, waitFor } from "@testing-library/react";
import { getCategories } from "@/utils/categories-client";
import { CategoriesSelect } from ".";

jest.mock("@/utils/categories-client", () => ({
  getCategories: jest.fn(),
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

test("renders the categories options", async () => {
  render(<CategoriesSelect />);

  await screen.findByText(/select a category/i);
  userEvent.click(screen.getByText(/select a category/i));

  await waitFor(() => {
    expect(screen.getByText("test category")).toBeInTheDocument();
    expect(screen.getByText("another test category")).toBeInTheDocument();
  });
});

test("selects an option by default", async () => {
  render(<CategoriesSelect value="category2" />);

  await waitFor(() => {
    expect(screen.getByText("another test category")).toBeInTheDocument();
  });
});

test("selects an category option", async () => {
  const onChangeMock = jest.fn();
  render(<CategoriesSelect onChange={onChangeMock} />);

  await waitFor(() => {
    userEvent.click(screen.getByText(/select a category/i));
    userEvent.click(screen.getByText(/another test category/i));

    expect(onChangeMock).toHaveBeenCalledWith("category2", {
      children: "another test category",
      key: "category2",
      value: "category2",
    });
  });
});
