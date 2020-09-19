import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Category } from "@api/models/category";
import { getCategories } from "@/utils/categories-client";

export type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const CategoriesSelect: React.FC<Props> = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;

    getCategories().then(({ categories }) => {
      if (mounted) {
        setCategories(categories);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Select placeholder="Select a category" value={value} onChange={onChange}>
      {categories.map((category: Category) => (
        <Select.Option key={category.id} value={category.id!}>
          {category.name}
        </Select.Option>
      ))}
    </Select>
  );
};
