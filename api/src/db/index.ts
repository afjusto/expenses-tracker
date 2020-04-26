import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import transactionsAdapter, { TransactionsAdapter } from "./adapters/transactions";
import { Transaction } from "models/transaction";

export interface Schema {
  transactions: Transaction[];
}

export interface Adapters {
  transactions: TransactionsAdapter;
}

const adapter = new FileSync<Schema>(`${__dirname}/db.json`);
const db = lowdb(adapter);

db.defaults({
  accounts: [],
  transactions: [],
}).write();

const adapters = {
  transactions: transactionsAdapter(db),
};

export default adapters;
