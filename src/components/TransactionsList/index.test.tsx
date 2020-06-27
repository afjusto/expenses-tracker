import React from "react";
import userEvent from "@testing-library/user-event";
import { TransactionType } from "@api/models/transaction";
import { fireEvent, render, screen } from "@testing-library/react";
import { TransactionsList, Props } from ".";

let props: Props;

beforeEach(() => {
  props = {
    transactions: [
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
    ],
  };
});

test("renders a list of transactions", () => {
  render(<TransactionsList {...props} />);

  expect(screen.getByText("Test transaction")).toBeInTheDocument();
  expect(screen.getByText("Another test transaction")).toBeInTheDocument();
});

test("performs an action when clicking in a list item", () => {
  props = { ...props, onTransactionClick: jest.fn() };
  render(<TransactionsList {...props} />);

  userEvent.click(screen.getByText("Test transaction"));
  expect(props.onTransactionClick).toHaveBeenCalled();
});

test("performs an action when pressing the enter key on a focused list item", () => {
  props = { ...props, onTransactionClick: jest.fn() };
  render(<TransactionsList {...props} />);

  fireEvent.keyDown(screen.getByText("Test transaction"), { key: "enter" });
  expect(props.onTransactionClick).toHaveBeenCalled();
});
