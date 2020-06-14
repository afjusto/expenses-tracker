import { ipcMain, IpcMainEvent } from "electron";
import { AccountsAdapter } from "@api/db";
import { Account } from "@api/models/account";

ipcMain.on("@account/GET_ALL", (event) => {
  // TODO: properly handle errors
  const accounts: Account[] = AccountsAdapter.getAll();
  event.returnValue = {
    accounts,
  };
});

ipcMain.on("@account/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = AccountsAdapter.get(id);
});

ipcMain.on("@account/CREATE", (event: IpcMainEvent, account: Account) => {
  // TODO: properly handle errors
  event.returnValue = AccountsAdapter.create(account);
});

ipcMain.on("@account/UPDATE", (event: IpcMainEvent, account: Account) => {
  // TODO: properly handle errors
  event.returnValue = AccountsAdapter.update(account);
});

ipcMain.on("@account/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  AccountsAdapter.remove(id);
  event.returnValue = null;
});
