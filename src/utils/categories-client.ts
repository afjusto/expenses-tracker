import { ipcRenderer } from "electron";
import { Category } from "@api/models/category";

/**
 * Gets the list of categories.
 */
export const getCategories = () => {
  return Promise.resolve(ipcRenderer.sendSync("@category/GET_ALL"));
};

/**
 * Creates a new category.
 *
 * @param category the category to be created
 */
export const createCategory = (category: Category) => {
  return Promise.resolve(ipcRenderer.sendSync("@category/CREATE", category));
};

/**
 * Updates an existing category.
 *
 * @param category the category to be updated
 */
export const updateCategory = (category: Category) => {
  return Promise.resolve(ipcRenderer.sendSync("@category/UPDATE", category));
};

/**
 * Deletes an existing category.
 *
 * @param category the category to be deleted
 */
export const deleteCategory = (category: Category) => {
  return Promise.resolve(ipcRenderer.sendSync("@category/DELETE", category.id));
};
