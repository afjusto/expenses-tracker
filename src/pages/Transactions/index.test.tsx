import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";
import { Transaction, TransactionType } from "@api/models/transaction";
import { render, screen, waitFor } from "@testing-library/react";
import { getTransactions } from "@/utils/transactions-client";
import { Transactions } from ".";

jest.mock("@/utils/categories-client", () => ({
  getCategories: jest.fn(() => Promise.resolve({ categories: [] })),
}));

jest.mock("@/utils/entities-client", () => ({
  getEntities: jest.fn(() => Promise.resolve({ entities: [] })),
}));

jest.mock("@/utils/transactions-client", () => ({
  deleteTransaction: jest.fn(() => Promise.resolve()),
  getTransactions: jest.fn(),
  updateTransaction: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  const transactions: Transaction[] = [
    {
      id: "1",
      amount: -100,
      date: 1593298352435,
      description: "Test transaction",
      type: TransactionType.EXPENSE,
      accountId: "1",
    },
    {
      id: "2",
      amount: 250,
      date: 1573298352435,
      description: "Another test transaction",
      type: TransactionType.INCOME,
      accountId: "1",
    },
  ];
  mocked(getTransactions).mockClear();
  mocked(getTransactions).mockResolvedValue({ transactions });
});

test("renders the transactions page", async () => {
  render(<Transactions />);
  await act(() => Promise.resolve());

  expect(
    screen.getByRole("heading", { name: "Transactions" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add transaction/i })
  ).toBeInTheDocument();
});

test("renders an empty state when there are no transactions", async () => {
  mocked(getTransactions).mockResolvedValueOnce({ transactions: [] });
  render(<Transactions />);

  await screen.findByText(/no transactions yet/i);
  expect(screen.getByText(/no transactions yet/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create now/i })
  ).toBeInTheDocument();
});

test("opens the form drawer when the create now button (empty state) is clicked", async () => {
  mocked(getTransactions).mockResolvedValueOnce({ transactions: [] });
  render(<Transactions />);

  expect(screen.queryByTestId("transaction-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /create now/i });
  userEvent.click(screen.getByRole("button", { name: /create now/i }));

  await waitFor(() => {
    expect(screen.queryByTestId("transaction-form")).toBeVisible();
  });
});

test("renders a list of transactions", async () => {
  render(<Transactions />);

  await waitFor(() => {
    expect(screen.getByText("Test transaction")).toBeInTheDocument();
    expect(screen.getByText("Another test transaction")).toBeInTheDocument();
  });
});

test("opens the form drawer when the add transaction button is clicked", async () => {
  render(<Transactions />);

  expect(screen.queryByTestId("transaction-form")).not.toBeInTheDocument();
  await screen.findByRole("button", { name: /add transaction/i });
  userEvent.click(screen.getByRole("button", { name: /add transaction/i }));

  await waitFor(() => {
    expect(screen.queryByTestId("transaction-form")).toBeVisible();
  });
});

test("opens the form drawer when a list item is clicked", async () => {
  render(<Transactions />);

  expect(screen.queryByTestId("transaction-form")).not.toBeInTheDocument();
  await screen.findByText("Test transaction");
  userEvent.click(screen.getByText("Test transaction"));

  await waitFor(() => {
    expect(screen.queryByTestId("transaction-form")).toBeVisible();
  });
});

test("closes the form drawer and re-fetches data after an transaction is deleted", async () => {
  render(<Transactions />);

  await screen.findByText("Test transaction");
  userEvent.click(screen.getByText("Test transaction"));
  expect(screen.queryByTestId("transaction-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /delete/i }));
  userEvent.click(screen.getByRole("button", { name: /yes/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("transaction-form")).not.toBeInTheDocument()
  );
  expect(mocked(getTransactions)).toHaveBeenCalledTimes(2);
});

test("closes the form drawer and re-fetches data after the form is submitted", async () => {
  render(<Transactions />);

  await screen.findByText("Test transaction");
  userEvent.click(screen.getByText("Test transaction"));
  expect(screen.queryByTestId("transaction-form")).toBeVisible();

  userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() =>
    expect(screen.queryByTestId("transaction-form")).not.toBeInTheDocument()
  );
  expect(mocked(getTransactions)).toHaveBeenCalledTimes(2);
});
