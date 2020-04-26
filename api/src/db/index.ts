import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import accountsAdapter, { AccountsAdapter } from "./adapters/accounts";
import transactionsAdapter, { TransactionsAdapter } from "./adapters/transactions";
import { Account } from "models/account";
import { Transaction } from "models/transaction";

export interface Schema {
  accounts: Account[];
  transactions: Transaction[];
}

export interface Adapters {
  accounts: AccountsAdapter;
  transactions: TransactionsAdapter;
}

const adapter = new FileSync<Schema>(`${__dirname}/db.json`);
const db = lowdb(adapter);

db.defaults({
  accounts: [],
  transactions: [],
}).write();

const adapters = {
  accounts: accountsAdapter(db),
  transactions: transactionsAdapter(db),
};

export default adapters;
