import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync(`${__dirname}/db.json`);
const db = lowdb(adapter);

db.defaults({
  accounts: [],
  transactions: [],
}).write();
