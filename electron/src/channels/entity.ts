import { ipcMain, IpcMainEvent } from "electron";
import { EntitiesAdapter } from "@api/db";
import { Entity } from "@api/models/entity";

ipcMain.on("@entity/GET_ALL", (event) => {
  // TODO: properly handle errors
  const entities: Entity[] = EntitiesAdapter.getAll();
  event.returnValue = {
    entities,
  };
});

ipcMain.on("@entity/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = EntitiesAdapter.get(id);
});

ipcMain.on("@entity/CREATE", (event: IpcMainEvent, entity: Entity) => {
  // TODO: properly handle errors
  event.returnValue = EntitiesAdapter.create(entity);
});

ipcMain.on("@entity/UPDATE", (event: IpcMainEvent, entity: Entity) => {
  // TODO: properly handle errors
  event.returnValue = EntitiesAdapter.update(entity);
});

ipcMain.on("@entity/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  EntitiesAdapter.remove(id);
  event.returnValue = null;
});
