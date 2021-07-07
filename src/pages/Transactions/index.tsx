import { useEffect, useState } from "react";
import { Button, Drawer, Empty } from "antd";
import { MainContainer } from "@/components/MainContainer";
import { TransactionForm } from "@/components/TransactionForm";
import { TransactionsList } from "@/components/TransactionsList";
import { Transaction } from "@api/models/transaction";
import { getTransactions } from "@/utils/transactions-client";

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  /**
   * Closes the drawer.
   */
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedTransaction(null);
  };

  /**
   * Gets the list of transactions.
   */
  const fetchTransactions = () => {
    getTransactions().then(({ transactions }) => setTransactions(transactions));
  };

  /**
   * Callback to be executed on the form is submitted.
   */
  const handleOnSubmit = () => {
    closeDrawer();
    fetchTransactions();
  };

  /**
   * Callback to be executed when a transaction is deleted.
   */
  const handleOnDelete = () => {
    closeDrawer();
    fetchTransactions();
  };

  /**
   * Callback to be executed when a transaction list item is clicked.
   *
   * @param transaction the selected transaction
   */
  const handleOnTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDrawerVisible(true);
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
      {transactions.length === 0 && (
        <Empty description={<span>No transactions yet.</span>}>
          <Button type="primary" onClick={() => setDrawerVisible(true)}>
            Create Now
          </Button>
        </Empty>
      )}
      {transactions.length > 0 && (
        <TransactionsList
          transactions={transactions}
          onTransactionClick={handleOnTransactionClick}
        />
      )}
      <Drawer
        closable={true}
        visible={drawerVisible}
        width="600"
        onClose={closeDrawer}
        bodyStyle={{ padding: 0 }}
      >
        {drawerVisible && (
          <TransactionForm
            onCancel={closeDrawer}
            onDelete={handleOnDelete}
            onSubmit={handleOnSubmit}
            transaction={selectedTransaction}
          />
        )}
      </Drawer>
    </MainContainer>
  );
};
