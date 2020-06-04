import adapters from "@api/db";
import { ipcMain, IpcMainEvent } from "electron";
import { Entity } from "@api/models/entity";

ipcMain.on("@entity/GET_ALL", (event) => {
  // TODO: properly handle errors
  const entities: Entity[] = adapters.entities.getAll();
  event.returnValue = {
    entities,
  };
});

ipcMain.on("@entity/GET", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  event.returnValue = adapters.entities.get(id);
});

ipcMain.on("@entity/CREATE", (event: IpcMainEvent, entity: Entity) => {
  // TODO: properly handle errors
  event.returnValue = adapters.entities.create(entity);
});

ipcMain.on("@entity/UPDATE", (event: IpcMainEvent, entity: Entity) => {
  // TODO: properly handle errors
  event.returnValue = adapters.entities.update(entity);
});

ipcMain.on("@entity/DELETE", (event: IpcMainEvent, id: string) => {
  // TODO: properly handle errors
  adapters.entities.remove(id);
  event.returnValue = null;
});
