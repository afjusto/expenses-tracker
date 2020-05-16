import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { Store } from "antd/es/form/interface";
import { RouteComponentProps } from "@reach/router";

import MainContainer from "@/components/MainContainer";
import TransactionForm from "@/components/TransactionForm";
import TransactionsList from "@/components/TransactionsList";
import { Transaction } from "@models/transaction";
import {
  openSuccessNotification,
  openErrorNotification,
} from "@/utils/notifications";
import {
  createTransaction,
  getTransactions,
} from "@/utils/transactions-client";

const Transactions: React.FC<RouteComponentProps> = () => {
  const [transactions, setTransactions] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const fetchTransactions = () => {
    getTransactions().then(({ data }) => setTransactions(data.transactions));
  };

  const create = (transaction: Transaction): void => {
    createTransaction(transaction)
      .then(() => {
        openSuccessNotification("Transaction successfully created.");
        fetchTransactions();
      })
      .catch(() =>
        openErrorNotification(
          "There was a problem while creating the transaction."
        )
      )
      .finally(() => closeDrawer());
  };

  const handleSubmit = (values: Store) => {
    const amount = parseInt(values.amount);
    const type = values.type;
    const transaction: Transaction = {
      accountId: values.fromAccount,
      amount: type === "EXPENSE" ? -amount : amount,
      categoryId: values.category,
      date: new Date(values.date).getTime(),
      description: values.description,
      entityId: values.entity,
      receiverAccountId: values.toAccount,
      type,
    };
    create(transaction);
  };

  const headerActions = (
    <div>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Add transaction
      </Button>
    </div>
  );

  useEffect(() => fetchTransactions(), []);

  return (
    <MainContainer title="Transactions" actions={headerActions}>
      <TransactionsList transactions={transactions} />
      <Drawer
        closable={true}
        visible={drawerVisible}
        width="600"
        onClose={closeDrawer}
        bodyStyle={{ padding: 0 }}
      >
        {drawerVisible && (
          <TransactionForm onCancel={closeDrawer} onSubmit={handleSubmit} />
        )}
      </Drawer>
    </MainContainer>
  );
};

export default Transactions;
