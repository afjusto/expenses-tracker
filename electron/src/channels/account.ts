import adapters from "@api/db";
import { ipcMain, IpcMainEvent } from "electron";
import { Account } from "@api/models/account";

ipcMain.on("@account/GET_ALL", (event) => {
  // TODO: properly handle errors
  const accounts: Account[] = adapters.accounts.getAll();
  event.returnValue = {
    accounts,
  };
});

ipcMain.on("@account/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = adapters.accounts.get(id);
});

ipcMain.on("@account/CREATE", (event: IpcMainEvent, account: Account) => {
  // TODO: properly handle errors
  event.returnValue = adapters.accounts.create(account);
});

ipcMain.on("@account/UPDATE", (event: IpcMainEvent, account: Account) => {
  // TODO: properly handle errors
  event.returnValue = adapters.accounts.update(account);
});

ipcMain.on("@account/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  adapters.accounts.remove(id);
  event.returnValue = null;
});
