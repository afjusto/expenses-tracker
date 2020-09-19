import React from "react";
import styled from "styled-components";
import { Button, Form, Input, Popconfirm } from "antd";
import { Store } from "antd/es/form/interface";
import { Entity } from "@api/models/entity";
import {
  openSuccessNotification,
  openErrorNotification,
} from "@/utils/notifications";
import {
  createEntity,
  updateEntity,
  deleteEntity,
} from "@/utils/entities-client";

type Props = {
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  entity?: Entity | null;
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

export const EntityForm: React.FC<Props> = ({
  onCancel,
  onDelete,
  onSubmit,
  entity: existingEntity,
}) => {
  const [form] = Form.useForm();
  const isEditing = !!existingEntity;
  let initialValues = null;

  /**
   * Creates a new entity and provides feedback to the user.
   *
   * @param entity the entity to be created
   */
  const create = (entity: Entity): void => {
    createEntity(entity)
      .then(() => openSuccessNotification("Entity successfully created."))
      .catch(() =>
        openErrorNotification("There was a problem while creating the entity.")
      );
  };

  /**
   * Updates an existing entity and provides feedback to the user.
   *
   * @param entity the entity to be updated
   */
  const update = (entity: Entity): void => {
    updateEntity(entity)
      .then(() => openSuccessNotification("Entity successfully updated."))
      .catch(() =>
        openErrorNotification("There was a problem while updating the entity.")
      );
  };

  const remove = (entity: Entity): void => {
    deleteEntity(entity)
      .then(() => openSuccessNotification("Entity successfully deleted."))
      .catch(() =>
        openErrorNotification("There was a problem while deleting the entity.")
      );
  };

  /**
   * Callback to be executed when the `Submit` button is clicked.
   *
   * @param values current form values
   */
  const handleSubmit = (values: Store) => {
    const entity: Entity = {
      ...existingEntity,
      name: values.name,
    };
    isEditing ? update(entity) : create(entity);

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
    if (existingEntity) {
      remove(existingEntity);
      onDelete && onDelete();
    }
  };

  if (existingEntity && !initialValues) {
    initialValues = {
      name: existingEntity.name,
    };
  }

  return (
    <div data-testid="entity-form">
      <div className="ant-drawer-header">
        <div className="ant-drawer-title">
          {isEditing ? "Edit entity" : "Add a new entity"}
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
              {isEditing && existingEntity && (
                <Popconfirm
                  title={() => (
                    <>
                      <div>Are you sure you want to delete this entity?</div>
                      <div>
                        All linked transactions will have their entity
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
