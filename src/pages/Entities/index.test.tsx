import React from "react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import { render, screen, waitFor } from "@testing-library/react";
import { getEntities } from "@/utils/entities-client";
import { Entities } from ".";

jest.mock("@/utils/entities-client", () => ({
  deleteEntity: jest.fn(() => Promise.resolve()),
  getEntities: jest.fn(),
  updateEntity: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  mocked(getEntities).mockClear();
  mocked(getEntities).mockResolvedValue({
    entities: [
      {
        id: "entity1",
        name: "test entity",
      },
      {
        id: "entity2",
        name: "another test entity",
      },
    ],
  });
});

test("renders the entity page", async () => {
  render(<Entities />);
  await act(() => Promise.resolve());

  expect(screen.getByRole("heading", { name: "Entities" })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add entity/i })
  ).toBeInTheDocument();
});

test("renders an empty state when there are no entities", async () => {
  mocked(getEntities).mockResolvedValueOnce({ entities: [] });
  render(<Entities />);

  await screen.findByText(/no entities yet/i);
  expect(screen.getByText(/no entities yet/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create now/i })
  ).toBeInTheDocument();
});

test("opens the form drawer when the create now button (empty state) is clicked", async () => {
  mocked(getEntities).mockResolvedValueOnce({ entities: [] });
  render(<Entities />);

  expect(screen.queryByTestId("entity-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /create now/i });
  userEvent.click(screen.getByRole("button", { name: /create now/i }));
  expect(screen.queryByTestId("entity-form")).toBeVisible();
});

test("renders a list of entities", async () => {
  render(<Entities />);

  await waitFor(() => {
    expect(screen.getByText("test entity")).toBeInTheDocument();
    expect(screen.getByText("another test entity")).toBeInTheDocument();
  });
});

test("opens the form drawer when the add entity button is clicked", async () => {
  render(<Entities />);

  expect(screen.queryByTestId("entity-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /add entity/i });
  userEvent.click(screen.getByRole("button", { name: /add entity/i }));
  expect(screen.queryByTestId("entity-form")).toBeVisible();
});

test("opens the form drawer when a list item is clicked", async () => {
  render(<Entities />);

  expect(screen.queryByTestId("entity-form")).not.toBeInTheDocument();
  await screen.findByText("test entity");
  userEvent.click(screen.getByText("test entity"));
  expect(screen.queryByTestId("entity-form")).toBeVisible();
});

test("closes the form drawer and re-fetches data after an entity is deleted", async () => {
  render(<Entities />);

  await screen.findByText("test entity");
  userEvent.click(screen.getByText("test entity"));
  expect(screen.queryByTestId("entity-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /delete/i }));
  userEvent.click(screen.getByRole("button", { name: /yes/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("entity-form")).not.toBeInTheDocument()
  );
  expect(mocked(getEntities)).toHaveBeenCalledTimes(2);
});

test("closes the form drawer and re-fetches data after the form is submitted", async () => {
  render(<Entities />);

  await screen.findByText("test entity");
  userEvent.click(screen.getByText("test entity"));
  expect(screen.queryByTestId("entity-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("entity-form")).not.toBeInTheDocument()
  );
  expect(mocked(getEntities)).toHaveBeenCalledTimes(2);
});
