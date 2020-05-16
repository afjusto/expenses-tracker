import React, { useState } from "react";
import styled from "styled-components";
import { Button, DatePicker, Form, Input, Select, Menu } from "antd";
import { Store } from "antd/es/form/interface";
import { RetweetOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons";

import "./styles.css";

// FIXME: imported TS enums break with create-react-app loader
// https://github.com/facebook/create-react-app/issues/8987
enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
  TRANSFER = "TRANSFER",
}

type Props = {
  onCancel: () => void;
  onSubmit: (values: Store) => void;
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

const TransactionForm: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [selectedTab, setSelectedTab] = useState(TransactionType.EXPENSE);
  const isTransfer = selectedTab === TransactionType.TRANSFER;
  const [form] = Form.useForm();

  const handleSubmit = (values: Store): void => {
    onSubmit({ ...values, type: selectedTab });
    form.resetFields();
  };

  const switchAccounts = () => {
    const currentFormValues: Store = form.getFieldsValue();
    const newFormValues: Store = {
      ...currentFormValues,
      fromAccount: currentFormValues.toAccount,
      toAccount: currentFormValues.fromAccount,
    };
    form.setFieldsValue(newFormValues);
  };

  return (
    <div>
      <div className="ant-drawer-header">
        <div className="ant-drawer-title">Add a new transaction</div>
      </div>
      <div style={{ padding: "8px 24px" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[TransactionType.EXPENSE]}
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
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
            <Row style={{ justifyContent: "flex-end" }}>
              <Button
                onClick={() => {
                  form.resetFields();
                  onCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 8 }}
              >
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
