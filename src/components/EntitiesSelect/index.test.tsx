import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { render, screen, waitFor } from "@testing-library/react";
import { getEntities } from "@/utils/entities-client";
import { EntitiesSelect } from ".";

jest.mock("@/utils/entities-client", () => ({
  getEntities: jest.fn(),
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

test("renders the entities options", async () => {
  render(<EntitiesSelect />);

  await screen.findByText(/select an entity/i);
  userEvent.click(screen.getByText(/select an entity/i));

  await waitFor(() => {
    expect(screen.getByText("test entity")).toBeInTheDocument();
    expect(screen.getByText("another test entity")).toBeInTheDocument();
  });
});

test("selects an option by default", async () => {
  render(<EntitiesSelect value="entity2" />);

  await waitFor(() => {
    expect(screen.getByText("another test entity")).toBeInTheDocument();
  });
});

test("selects an entity option", async () => {
  const onChangeMock = jest.fn();
  render(<EntitiesSelect onChange={onChangeMock} />);

  await waitFor(() => {
    userEvent.click(screen.getByText(/select an entity/i));
    userEvent.click(screen.getByText(/another test entity/i));

    expect(onChangeMock).toHaveBeenCalledWith("entity2", {
      children: "another test entity",
      key: "entity2",
      value: "entity2",
    });
  });
});
