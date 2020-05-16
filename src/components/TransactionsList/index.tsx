import React from "react";
import { Card } from "antd";

import { Transaction } from "@models/transaction";

type Props = {
  transactions: Transaction[];
};

const TransactionsList: React.FC<Props> = ({ transactions }) => {
  return (
    <>
      {transactions.map((transaction: Transaction) => (
        <ListItem key={transaction.id} transaction={transaction} />
      ))}
    </>
  );
};

export default TransactionsList;

const ListItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const date = new Date(transaction.date).toLocaleDateString();

  return (
    <Card
      size="small"
      bodyStyle={{ display: "flex", alignItems: "center", width: "100%" }}
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
