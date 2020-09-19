import React from "react";
import styled from "styled-components";
import { Button, Form, Input, Popconfirm } from "antd";
import { Store } from "antd/es/form/interface";
import { Category } from "@api/models/category";
import {
  openSuccessNotification,
  openErrorNotification,
} from "@/utils/notifications";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/utils/categories-client";

type Props = {
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  category?: Category | null;
};

const Column = styled.div`
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  > * + * {
    margin-left: 16px;
  }
`;

export const CategoryForm: React.FC<Props> = ({
  onCancel,
  onDelete,
  onSubmit,
  category: existingCategory,
}) => {
  const [form] = Form.useForm();
  const isEditing = !!existingCategory;
  let initialValues = null;

  /**
   * Creates a new category and provides feedback to the user.
   *
   * @param category the category to be created
   */
  const create = (category: Category): void => {
    createCategory(category)
      .then(() => openSuccessNotification("Category successfully created."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while creating the category."
        )
      );
  };

  /**
   * Updates an existing category and provides feedback to the user.
   *
   * @param category the category to be updated
   */
  const update = (category: Category): void => {
    updateCategory(category)
      .then(() => openSuccessNotification("Category successfully updated."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while updating the category."
        )
      );
  };

  /**
   * Removes an existing category and provides feedback to the user.
   *
   * @param category the category to be removed
   */
  const remove = (category: Category): void => {
    deleteCategory(category)
      .then(() => openSuccessNotification("Category successfully deleted."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while deleting the category."
        )
      );
  };

  /**
   * Callback to be executed when the `Submit` button is clicked.
   *
   * @param values current form values
   */
  const handleSubmit = (values: Store) => {
    const category: Category = {
      ...existingCategory,
      name: values.name,
    };
    isEditing ? update(category) : create(category);

    form.resetFields();
    onSubmit && onSubmit();
  };

  /**
   * Callback to be executed when the `Cancel` button is clicked.
   */
  const handleCancel = () => {
    form.resetFields();
    onCancel && onCancel();
  };

  /**
   * Callback to be executed when the `Delete` button is clicked.
   */
  const handleDelete = () => {
    if (existingCategory) {
      remove(existingCategory);
      onDelete && onDelete();
    }
  };

  if (existingCategory && !initialValues) {
    initialValues = {
      name: existingCategory.name,
    };
  }

  return (
    <div data-testid="category-form">
      <div className="ant-drawer-header">
        <div className="ant-drawer-title">
          {isEditing ? "Edit category" : "Add a new category"}
        </div>
      </div>
      <div style={{ padding: "8px 24px" }}>
        <div style={{ marginTop: "24px" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initialValues ? initialValues : undefined}
          >
            <Row>
              <Column>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: "Please enter a name" }]}
                >
                  <Input placeholder="Enter a name" />
                </Form.Item>
              </Column>
            </Row>
            <Row
              style={{
                justifyContent: isEditing ? "space-between" : "flex-end",
              }}
            >
              {isEditing && existingCategory && (
                <Popconfirm
                  title={() => (
                    <>
                      <div>Are you sure you want to delete this category?</div>
                      <div>
                        All linked transactions will have their category
                        unassigned.
                      </div>
                    </>
                  )}
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>
              )}
              <div>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 8 }}
                >
                  Submit
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
