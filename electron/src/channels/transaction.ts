import adapters from "@api/db";
import { ipcMain, IpcMainEvent } from "electron";
import { Transaction } from "@api/models/transaction";

ipcMain.on("@transaction/GET_ALL", (event) => {
  // TODO: properly handle errors
  const transactions: Transaction[] = adapters.transactions.getAll();
  event.returnValue = {
    transactions,
  };
});

ipcMain.on("@transaction/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = adapters.transactions.get(id);
});

ipcMain.on(
  "@transaction/CREATE",
  (event: IpcMainEvent, transaction: Transaction) => {
    // TODO: properly handle errors
    event.returnValue = adapters.transactions.create(transaction);
  }
);

ipcMain.on(
  "@transaction/UPDATE",
  (event: IpcMainEvent, transaction: Transaction) => {
    // TODO: properly handle errors
    event.returnValue = adapters.transactions.update(transaction);
  }
);

ipcMain.on("@transaction/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  adapters.transactions.remove(id);
  event.returnValue = null;
});
