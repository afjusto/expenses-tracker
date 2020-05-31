import { uuid } from "uuidv4";
import { LowdbSync } from "lowdb";
import { Schema } from "@api/db";
import { Account } from "@api/models/account";

export interface AccountsAdapter {
  /**
   * Gets an account.
   *
   * @param id the id of the account to be retrieved
   * @returns an account
   */
  get(id: string): Account;

  /**
   * Gets a list of accounts.
   *
   * @returns a list of accounts
   */
  getAll(): Account[];

  /**
   * Creates a new account.
   *
   * @param account the account to be created
   * @returns the created account
   */
  create(account: Account): Account;

  /**
   * Updates an existing account.
   *
   * @param account the account to be updated
   * @returns the updated account, or `null` if the provided account does not exist
   */
  update(account: Account): Account | null;

  /**
   * Removes an account.
   * @param id the id of the account to be removed
   */
  remove(id: string): void;
}

const adapter = (db: LowdbSync<Schema>): AccountsAdapter => {
  const get = (id: string): Account => {
    return db.get("accounts").find({ id }).value();
  };

  const getAll = (): Account[] => {
    return db.get("accounts").value();
  };

  const create = (account: Account): Account => {
    const newAccount: Account = {
      ...account,
      id: uuid(),
    };
    db.get("accounts").push(newAccount).write();
    return newAccount;
  };

  const update = (account: Account): Account | null => {
    const id = account.id;
    const accountRecord = db.get("accounts").find({ id });

    if (!accountRecord.value()) {
      return null;
    }
    accountRecord.assign(account).write();
    return account;
  };

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
