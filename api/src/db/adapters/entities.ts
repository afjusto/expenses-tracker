import { v4 as uuid } from "uuid";
import { LowdbSync } from "lowdb";
import { Schema } from "@api/db";
import { Entity } from "@api/models/entity";
import { Transaction } from "@api/models/transaction";

interface EntitiesAdapter {
  /**
   * Gets an entity.
   *
   * @param id the id of the entity to be retrieved
   * @returns an entity
   */
  get(id: string): Entity;

  /**
   * Gets a list of entities.
   *
   * @returns a list of entities
   */
  getAll(): Entity[];

  /**
   * Creates a new entity.
   *
   * @param entity the entity to be created
   * @returns the created entity
   */
  create(entity: Entity): Entity;

  /**
   * Updates an existing entity.
   *
   * @param entity the entity to be updated
   * @returns the updated entity, or `null` if the provided entity does not exist
   */
  update(entity: Entity): Entity | null;

  /**
   * Removes an entity.
   * @param id the id of the entity to be removed
   */
  remove(id: string): void;
}

export const adapter = (db: LowdbSync<Schema>): EntitiesAdapter => {
  const get = (id: string): Entity => {
    return db.get("entities").find({ id }).value();
  };

  const getAll = (): Entity[] => {
    return db.get("entities").orderBy("name", "asc").value();
  };

  const create = (entity: Entity): Entity => {
    const newEntity: Entity = {
      ...entity,
      id: uuid(),
    };
    db.get("entities").push(newEntity).write();
    return newEntity;
  };

  const update = (entity: Entity): Entity | null => {
    const id = entity.id;
    const entityRecord = db.get("entities").find({ id });

    if (!entityRecord.value()) {
      return null;
    }
    entityRecord.assign(entity).write();
    return entity;
  };

  const remove = (id: string): void => {
    db.get("transactions")
      .filter({ entityId: id })
      .map((transaction: Transaction) => {
        delete transaction.entityId;
        return transaction;
      })
      .write();

    db.get("entities").remove({ id }).write();
  };

  return {
    get,
    getAll,
    create,
    update,
    remove,
  };
};
