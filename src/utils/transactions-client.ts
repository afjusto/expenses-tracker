import axios from "axios";
import { Transaction } from "@models/transaction";

const TRANSACTIONS_API_URL = "/api/transactions";

export const getTransactions = () => {
  return axios.get(TRANSACTIONS_API_URL);
};

export const createTransaction = (transaction: Transaction) => {
  return axios.post<Transaction>(TRANSACTIONS_API_URL, transaction);
};
