import { uuid } from "uuidv4";
import { LowdbSync } from "lowdb";
import { Schema } from "../index";
import { Transaction } from "models";

export default function (db: LowdbSync<Schema>) {
  /**
   * Gets a transaction.
   */
  const get = (id: string): Transaction => {
    return db.get("transactions").find({ id }).value();
  };

  /**
   * Gets the list of transactions.
   */
  const getAll = (): Transaction[] => {
    return db.get("transactions").value();
  };

  /**
   * Creates a new transaction.
   */
  const create = (transaction: Transaction): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuid(),
    };
    db.get("transactions").push(newTransaction).write();
    return newTransaction;
  };

  /**
   * Updates an existing transaction.
   */
  const update = (id: string, transaction: Transaction): Transaction => {
    const transactionRecord = db.get("transactions").find({ id });

    if (!transactionRecord.value()) {
      return null;
    }
    transactionRecord.assign(transaction).write();
    return transaction;
  };

  /**
   * Removes a transaction.
   */
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
}
