import { app } from "electron";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import accountsAdapter, { AccountsAdapter } from "@api/db/adapters/accounts";
import transactionsAdapter, {
  TransactionsAdapter,
} from "@api/db/adapters/transactions";
import { Account } from "@api/models/account";
import { Transaction } from "@api/models/transaction";

export interface Schema {
  accounts: Account[];
  transactions: Transaction[];
}

export interface Adapters {
  accounts: AccountsAdapter;
  transactions: TransactionsAdapter;
}

const adapter = new FileSync<Schema>(`${app.getPath("userData")}/db/db.json`);
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
