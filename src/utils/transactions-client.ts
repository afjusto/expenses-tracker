import axios from "axios";
import { Transaction } from "@models/transaction";

const TRANSACTIONS_API_URL = "/api/transactions";

/**
 * Gets the list of transactions.
 */
export const getTransactions = () => {
  return axios.get(TRANSACTIONS_API_URL);
};

/**
 * Creates a new transaction.
 *
 * @param transaction the transaction to be created
 */
export const createTransaction = (transaction: Transaction) => {
  return axios.post<Transaction>(TRANSACTIONS_API_URL, transaction);
};

/**
 * Updates an existing transaction.
 *
 * @param transaction the transaction to be updated
 */
export const updateTransaction = (transaction: Transaction) => {
  return axios.put<Transaction>(
    `${TRANSACTIONS_API_URL}/${transaction.id}`,
    transaction
  );
};
