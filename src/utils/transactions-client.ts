import { ipcRenderer } from "electron";
import { Transaction } from "@api/models/transaction";

/**
 * Gets the list of transactions.
 */
export const getTransactions = (): Promise<{ transactions: Transaction[] }> => {
  return Promise.resolve(ipcRenderer.sendSync("@transaction/GET_ALL"));
};

/**
 * Creates a new transaction.
 *
 * @param transaction the transaction to be created
 */
export const createTransaction = (
  transaction: Transaction
): Promise<Transaction> => {
  return Promise.resolve(
    ipcRenderer.sendSync("@transaction/CREATE", transaction)
  );
};

/**
 * Updates an existing transaction.
 *
 * @param transaction the transaction to be updated
 */
export const updateTransaction = (
  transaction: Transaction
): Promise<Transaction> => {
  return Promise.resolve(
    ipcRenderer.sendSync("@transaction/UPDATE", transaction)
  );
};

/**
 * Deletes an existing transaction.
 *
 * @param transaction the transaction to be deleted
 */
export const deleteTransaction = (transaction: Transaction): Promise<void> => {
  return Promise.resolve(
    ipcRenderer.sendSync("@transaction/DELETE", transaction.id)
  );
};
