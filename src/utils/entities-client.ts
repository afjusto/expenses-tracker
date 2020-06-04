import { ipcRenderer } from "electron";
import { Entity } from "@api/models/entity";

/**
 * Gets the list of entities.
 */
export const getEntities = () => {
  return Promise.resolve(ipcRenderer.sendSync("@entity/GET_ALL"));
};

/**
 * Creates a new entity.
 *
 * @param entity the entity to be created
 */
export const createEntity = (entity: Entity) => {
  return Promise.resolve(ipcRenderer.sendSync("@entity/CREATE", entity));
};

/**
 * Updates an existing entity.
 *
 * @param entity the entity to be updated
 */
export const updateEntity = (entity: Entity) => {
  return Promise.resolve(ipcRenderer.sendSync("@entity/UPDATE", entity));
};

/**
 * Deletes an existing entity.
 *
 * @param entity the entity to be deleted
 */
export const deleteEntity = (entity: Entity) => {
  return Promise.resolve(ipcRenderer.sendSync("@entity/DELETE", entity.id));
};
