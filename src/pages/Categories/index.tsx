import React, { useState, useEffect } from "react";
import { Button, Drawer, Empty } from "antd";
import { CategoryForm } from "@/components/CategoryForm";
import { CategoriesList } from "@/components/CategoriesList";
import { MainContainer } from "@/components/MainContainer";
import { Category } from "@api/models/category";
import { getCategories } from "@/utils/categories-client";

export const Categories: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  /**
   * Closes the drawer.
   */
  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedCategory(null);
  };

  /**
   * Gets the list of categories.
   */
  const fetchCategories = () => {
    getCategories().then(({ categories }) => setCategories(categories));
  };

  /**
   * Callback to be executed on the form is submitted.
   */
  const handleOnSubmit = () => {
    closeDrawer();
    fetchCategories();
  };

  /**
   * Callback to be executed when a category is deleted.
   */
  const handleOnDelete = () => {
    closeDrawer();
    fetchCategories();
  };

  /**
   * Callback to be executed when a list item is clicked.
   *
   * @param category the selected category
   */
  const handleOnCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setDrawerVisible(true);
  };

  const headerActions = (
    <div>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Add category
      </Button>
    </div>
  );

  useEffect(() => fetchCategories(), []);

  return (
    <MainContainer title="Categories" actions={headerActions}>
      {categories.length === 0 && (
        <Empty description={<span>No categories yet.</span>}>
          <Button type="primary" onClick={() => setDrawerVisible(true)}>
            Create Now
          </Button>
        </Empty>
      )}
      {categories.length > 0 && (
        <CategoriesList
          categories={categories}
          onCategoryClick={handleOnCategoryClick}
        />
      )}
      <Drawer
        closable={true}
        visible={drawerVisible}
        width="600"
        onClose={closeDrawer}
        bodyStyle={{ padding: 0 }}
      >
        {drawerVisible && (
          <CategoryForm
            onCancel={closeDrawer}
            onDelete={handleOnDelete}
            onSubmit={handleOnSubmit}
            category={selectedCategory}
          />
        )}
      </Drawer>
    </MainContainer>
  );
};
