import { app } from "electron";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { adapter as accountsAdapter } from "@api/db/adapters/accounts";
import { adapter as entitiesAdapter } from "@api/db/adapters/entities";
import { adapter as transactionsAdapter } from "@api/db/adapters/transactions";
import { Account } from "@api/models/account";
import { Entity } from "@api/models/entity";
import { Transaction } from "@api/models/transaction";

export interface Schema {
  accounts: Account[];
  entities: Entity[];
  transactions: Transaction[];
}

const adapter = new FileSync<Schema>(`${app.getPath("userData")}/db/db.json`);
const db = lowdb(adapter);

db.defaults({
  accounts: [],
  entities: [],
  transactions: [],
}).write();

export const AccountsAdapter = accountsAdapter(db);
export const EntitiesAdapter = entitiesAdapter(db);
export const TransactionsApdater = transactionsAdapter(db);
