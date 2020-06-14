import React, { KeyboardEvent } from "react";
import { Card } from "antd";
import { Transaction } from "@api/models/transaction";

type Props = {
  onTransactionClick: (transaction: Transaction) => void;
  transactions: Transaction[];
};

export const TransactionsList: React.FC<Props> = ({
  onTransactionClick,
  transactions,
}) => {
  return (
    <>
      {transactions.map((transaction: Transaction) => (
        <ListItem
          key={transaction.id}
          transaction={transaction}
          onClick={() => onTransactionClick(transaction)}
        />
      ))}
    </>
  );
};

type ListItemProps = {
  transaction: Transaction;
  onClick: () => void;
};

const ListItem: React.FC<ListItemProps> = ({ onClick, transaction }) => {
  const date = new Date(transaction.date).toLocaleDateString();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === "enter") {
      onClick();
    }
  };

  return (
    <Card
      size="small"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "8px 16px",
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      css={`
        :hover,
        :focus {
          border: 1px solid #40a9ff;
          cursor: pointer;
          transition: 0.3s linear;
        }
      `}
    >
      <span>{date}</span>
      <span
        css={`
          flex: 1;
          font-style: italic;
          margin: 0 16px;
        `}
      >
        {transaction.description}
      </span>
      <span>{`${transaction.amount} €`}</span>
    </Card>
  );
};
