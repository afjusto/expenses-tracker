import { uuid } from "uuidv4";
import { LowdbSync } from "lowdb";
import { Schema } from "../index";
import { Account } from "models/account";

export interface AccountsAdapter {
  get(id: string): Account;
  getAll(): Account[];
  create(account: Account): Account;
  update(id: string, account: Account): Account;
  remove(id: string): void;
}

const adapter = (db: LowdbSync<Schema>): AccountsAdapter => {
  /**
   * Gets a account.
   */
  const get = (id: string): Account => {
    return db.get("accounts").find({ id }).value();
  };

  /**
   * Gets the list of accounts.
   */
  const getAll = (): Account[] => {
    return db.get("accounts").value();
  };

  /**
   * Creates a new account.
   */
  const create = (account: Account): Account => {
    const newAccount: Account = {
      ...account,
      id: uuid(),
    };
    db.get("accounts").push(newAccount).write();
    return newAccount;
  };

  /**
   * Updates an existing account.
   */
  const update = (id: string, account: Account): Account => {
    const accountRecord = db.get("accounts").find({ id });

    if (!accountRecord.value()) {
      return null;
    }
    accountRecord.assign(account).write();
    return account;
  };

  /**
   * Removes a account.
   */
  const remove = (id: string): void => {
    db.get("accounts").remove({ id }).write();
  };

  return {
    get,
    getAll,
    create,
    update,
    remove,
  };
};

export default adapter;
