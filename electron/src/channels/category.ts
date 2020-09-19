import { ipcMain, IpcMainEvent } from "electron";
import { CategoriesAdapter } from "@api/db";
import { Category } from "@api/models/category";

ipcMain.on("@category/GET_ALL", (event) => {
  // TODO: properly handle errors
  const categories: Category[] = CategoriesAdapter.getAll();
  event.returnValue = {
    categories,
  };
});

ipcMain.on("@category/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = CategoriesAdapter.get(id);
});

ipcMain.on("@category/CREATE", (event: IpcMainEvent, category: Category) => {
  // TODO: properly handle errors
  event.returnValue = CategoriesAdapter.create(category);
});

ipcMain.on("@category/UPDATE", (event: IpcMainEvent, category: Category) => {
  // TODO: properly handle errors
  event.returnValue = CategoriesAdapter.update(category);
});

ipcMain.on("@category/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  CategoriesAdapter.remove(id);
  event.returnValue = null;
});
