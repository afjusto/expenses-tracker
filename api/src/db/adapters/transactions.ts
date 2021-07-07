import { v4 as uuid } from 'uuid';
import { LowdbSync } from "lowdb";
import { Schema } from "@api/db";
import { Transaction } from "@api/models/transaction";

interface TransactionsAdapter {
  /**
   * Gets a transaction.
   *
   * @param id the id of the transaction to be retrieved
   * @returns a transaction
   */
  get(id: string): Transaction;

  /**
   * Gets a list of transactions.
   *
   * @returns a list of transactions
   */
  getAll(): Transaction[];

  /**
   * Creates a new transaction.
   *
   * @param transaction the transaction to be created
   * @returns the created transaction
   */
  create(transaction: Transaction): Transaction;

  /**
   * Updates an existing transaction.
   *
   * @param transaction the transaction to be updated
   * @returns the updated transaction, or `null` if the provided transaction does not exist
   */
  update(transaction: Transaction): Transaction | null;

  /**
   * Removes an transaction.
   * @param id the id of the transaction to be removed
   */
  remove(id: string): void;
}

export const adapter = (db: LowdbSync<Schema>): TransactionsAdapter => {
  const get = (id: string): Transaction => {
    return db.get("transactions").find({ id }).value();
  };

  const getAll = (): Transaction[] => {
    return db.get("transactions").value();
  };

  const create = (transaction: Transaction): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuid(),
    };
    db.get("transactions").push(newTransaction).write();
    return newTransaction;
  };

  const update = (transaction: Transaction): Transaction | null => {
    const id = transaction.id;
    const transactionRecord = db.get("transactions").find({ id });

    if (!transactionRecord.value()) {
      return null;
    }
    transactionRecord.assign(transaction).write();
    return transaction;
  };

  const remove = (id: string): void => {
    db.get("transactions").remove({ id }).write();
  };

  return {
    get,
    getAll,
    create,
    update,
    remove,
  };
};
