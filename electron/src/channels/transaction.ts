import { ipcMain, IpcMainEvent } from "electron";
import { TransactionsApdater } from "@api/db";
import { Transaction } from "@api/models/transaction";

ipcMain.on("@transaction/GET_ALL", (event) => {
  // TODO: properly handle errors
  const transactions: Transaction[] = TransactionsApdater.getAll();
  event.returnValue = {
    transactions,
  };
});

ipcMain.on("@transaction/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = TransactionsApdater.get(id);
});

ipcMain.on(
  "@transaction/CREATE",
  (event: IpcMainEvent, transaction: Transaction) => {
    // TODO: properly handle errors
    event.returnValue = TransactionsApdater.create(transaction);
  }
);

ipcMain.on(
  "@transaction/UPDATE",
  (event: IpcMainEvent, transaction: Transaction) => {
    // TODO: properly handle errors
    event.returnValue = TransactionsApdater.update(transaction);
  }
);

ipcMain.on("@transaction/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  TransactionsApdater.remove(id);
  event.returnValue = null;
});
