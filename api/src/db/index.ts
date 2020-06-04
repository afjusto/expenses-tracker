import { app } from "electron";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import accountsAdapter, { AccountsAdapter } from "@api/db/adapters/accounts";
import entitiesAdapter, { EntitiesAdapter } from "@api/db/adapters/entities";
import transactionsAdapter, {
  TransactionsAdapter,
} from "@api/db/adapters/transactions";
import { Account } from "@api/models/account";
import { Entity } from "@api/models/entity";
import { Transaction } from "@api/models/transaction";

export interface Schema {
  accounts: Account[];
  entities: Entity[];
  transactions: Transaction[];
}

export interface Adapters {
  accounts: AccountsAdapter;
  entities: EntitiesAdapter;
  transactions: TransactionsAdapter;
}

const adapter = new FileSync<Schema>(`${app.getPath("userData")}/db/db.json`);
const db = lowdb(adapter);

db.defaults({
  accounts: [],
  entities: [],
  transactions: [],
}).write();

const adapters: Adapters = {
  accounts: accountsAdapter(db),
  entities: entitiesAdapter(db),
  transactions: transactionsAdapter(db),
};

export default adapters;
