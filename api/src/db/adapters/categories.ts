import { v4 as uuid } from "uuid";
import { LowdbSync } from "lowdb";
import { Schema } from "@api/db";
import { Category } from "@api/models/category";
import { Transaction } from "@api/models/transaction";

interface CategoriesAdapter {
  /**
   * Gets a category.
   *
   * @param id the id of the category to be retrieved
   * @returns a category
   */
  get(id: string): Category;

  /**
   * Gets a list of categories.
   *
   * @returns a list of categories
   */
  getAll(): Category[];

  /**
   * Creates a new category.
   *
   * @param category the category to be created
   * @returns the created category
   */
  create(category: Category): Category;

  /**
   * Updates an existing category.
   *
   * @param category the category to be updated
   * @returns the updated category, or `null` if the provided category does not exist
   */
  update(category: Category): Category | null;

  /**
   * Removes a category.
   * @param id the id of the category to be removed
   */
  remove(id: string): void;
}

export const adapter = (db: LowdbSync<Schema>): CategoriesAdapter => {
  const get = (id: string): Category => {
    return db.get("categories").find({ id }).value();
  };

  const getAll = (): Category[] => {
    return db.get("categories").orderBy("name", "asc").value();
  };

  const create = (category: Category): Category => {
    const newCategory: Category = {
      ...category,
      id: uuid(),
    };
    db.get("categories").push(newCategory).write();
    return newCategory;
  };

  const update = (category: Category): Category | null => {
    const id = category.id;
    const categoryRecord = db.get("categories").find({ id });

    if (!categoryRecord.value()) {
      return null;
    }
    categoryRecord.assign(category).write();
    return category;
  };

  const remove = (id: string): void => {
    db.get("transactions")
      .filter({ categoryId: id })
      .map((transaction: Transaction) => {
        delete transaction.categoryId;
        return transaction;
      })
      .write();

    db.get("categories").remove({ id }).write();
  };

  return {
    get,
    getAll,
    create,
    update,
    remove,
  };
};
