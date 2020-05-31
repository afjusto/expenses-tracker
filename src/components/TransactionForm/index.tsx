import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Menu,
  Popconfirm,
  Select,
} from "antd";
import { Store } from "antd/es/form/interface";
import { RetweetOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";
import { Transaction } from "@api/models/transaction";
import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/utils/transactions-client";
import {
  openSuccessNotification,
  openErrorNotification,
} from "@/utils/notifications";
import "./styles.css";

// FIXME: imported TS enums break with create-react-app loader
// https://github.com/facebook/create-react-app/issues/8987
enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
}

type Props = {
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
  transaction?: Transaction | null;
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

const SwitchAccountButton = styled(Button)`
  height: 24px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 0;
  z-index: 1;
`;

const TransactionForm: React.FC<Props> = ({
  onCancel,
  onDelete,
  onSubmit,
  transaction: existingTransaction,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    existingTransaction ? existingTransaction.type : TransactionType.EXPENSE
  );
  const isTransfer = selectedTab === TransactionType.TRANSFER;
  const [form] = Form.useForm();
  const isEditing = !!existingTransaction;
  let initialValues = null;

  /**
   * Creates a new transaction and provides feedback to the user.
   *
   * @param transaction the transaction to be created
   */
  const create = (transaction: Transaction): void => {
    createTransaction(transaction)
      .then(() => openSuccessNotification("Transaction successfully created."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while creating the transaction."
        )
      );
  };

  /**
   * Updates an existing transaction and provides feedback to the user.
   *
   * @param transaction the transaction to be updated
   */
  const update = (transaction: Transaction): void => {
    updateTransaction(transaction)
      .then(() => openSuccessNotification("Transaction successfully updated."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while updating the transaction."
        )
      );
  };

  const remove = (transaction: Transaction): void => {
    deleteTransaction(transaction)
      .then(() => openSuccessNotification("Transaction successfully deleted."))
      .catch(() =>
        openErrorNotification(
          "There was a problem while deleting the transaction."
        )
      );
  };

  /**
   * Callback to be executed when the `Submit` button is clicked.
   *
   * @param values current form values
   */
  const handleSubmit = (values: Store) => {
    const amount = parseInt(values.amount);
    const transaction: Transaction = {
      ...existingTransaction,
      accountId: values.fromAccount,
      amount: selectedTab === TransactionType.EXPENSE ? -amount : amount,
      categoryId: values.category,
      date: new Date(values.date).getTime(),
      description: values.description,
      entityId: values.entity,
      receiverAccountId: values.toAccount,
      type: selectedTab,
    };
    isEditing ? update(transaction) : create(transaction);

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
    if (existingTransaction) {
      remove(existingTransaction);
      onDelete && onDelete();
    }
  };

  /**
   * Switch the `from` and `to` account values.
   */
  const switchAccounts = () => {
    const currentFormValues: Store = form.getFieldsValue();
    const newFormValues: Store = {
      ...currentFormValues,
      fromAccount: currentFormValues.toAccount,
      toAccount: currentFormValues.fromAccount,
    };
    form.setFieldsValue(newFormValues);
  };

  if (existingTransaction && !initialValues) {
    initialValues = {
      amount: Math.abs(existingTransaction.amount),
      category: existingTransaction.categoryId,
      date: moment(existingTransaction.date),
      description: existingTransaction.description,
      entity: existingTransaction.entityId,
      fromAccount: existingTransaction.accountId,
      toAccount: existingTransaction.receiverAccountId,
    };
  }

  return (
    <div>
      <div className="ant-drawer-header">
        <div className="ant-drawer-title">
          {isEditing ? "Edit transaction" : "Add a new transaction"}
        </div>
      </div>
      <div style={{ padding: "8px 24px" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[selectedTab]}
          onSelect={(event) => setSelectedTab(event.key as TransactionType)}
        >
          <Menu.Item key={TransactionType.EXPENSE} icon={<FallOutlined />}>
            Expense
          </Menu.Item>
          <Menu.Item key={TransactionType.INCOME} icon={<RiseOutlined />}>
            Income
          </Menu.Item>
          <Menu.Item key={TransactionType.TRANSFER} icon={<RetweetOutlined />}>
            Transfer
          </Menu.Item>
        </Menu>
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
                  name="fromAccount"
                  label={isTransfer ? "From" : "Account"}
                  rules={[
                    { required: true, message: "Please select an account" },
                  ]}
                >
                  <Select placeholder="Select an account">
                    <Select.Option value="checking">
                      Checking account
                    </Select.Option>
                    <Select.Option value="savings">
                      Savings account
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Column>
              {isTransfer && (
                <>
                  <SwitchAccountButton
                    icon={<RetweetOutlined />}
                    type="link"
                    onClick={switchAccounts}
                  >
                    Switch accounts
                  </SwitchAccountButton>
                  <Column>
                    <Form.Item
                      name="toAccount"
                      label="To"
                      rules={[
                        { required: true, message: "Please select an account" },
                      ]}
                    >
                      <Select placeholder="Select an account">
                        <Select.Option value="checking">
                          Checking account
                        </Select.Option>
                        <Select.Option value="savings">
                          Savings account
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Column>
                </>
              )}
            </Row>
            <Row>
              <Column>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    { required: true, message: "Please enter an amount" },
                  ]}
                >
                  <Input
                    type="number"
                    addonAfter="€"
                    min={0}
                    placeholder="Enter an amount"
                  />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <DatePicker
                    allowClear={true}
                    placeholder="yyyy-mm-dd"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Column>
            </Row>
            <Row>
              <Column>
                <Form.Item name="category" label="Category">
                  <Select placeholder="Select a category">
                    <Select.Option value="home">Home</Select.Option>
                    <Select.Option value="internet">Internet</Select.Option>
                  </Select>
                </Form.Item>
              </Column>
              <Column>
                <Form.Item name="entity" label="Entity">
                  <Select placeholder="Select an entity">
                    <Select.Option value="dummy">Dummy</Select.Option>
                  </Select>
                </Form.Item>
              </Column>
            </Row>
            <Row>
              <Column>
                <Form.Item name="description" label="Additional information">
                  <Input.TextArea rows={5} style={{ resize: "none" }} />
                </Form.Item>
              </Column>
            </Row>
            <Row
              style={{
                justifyContent: isEditing ? "space-between" : "flex-end",
              }}
            >
              {isEditing && existingTransaction && (
                <Popconfirm
                  title="Are you sure you want to delete this transaction?"
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

export default TransactionForm;
