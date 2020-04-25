import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import transactionsAdapter from "./adapters/transactions";
import { Transaction } from "models";

export type Schema = {
  transactions: Transaction[];
};

const adapter = new FileSync<Schema>(`${__dirname}/db.json`);
const db = lowdb(adapter);

db.defaults({
  transactions: [],
}).write();

export default {
  transactions: transactionsAdapter(db),
};
