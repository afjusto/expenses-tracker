import React from "react";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import styled from "styled-components";
import { BarChartOutlined, DollarCircleFilled, SettingFilled } from "@ant-design/icons";
import { Link, Router } from "@reach/router";
import Budgets from "pages/Budgets";
import Settings from "pages/Settings";
import Transactions from "pages/Transactions";

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const Logo = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  height: 64px;
`;

const App = () => {
  return (
    <AppLayout>
      <Layout.Sider width={250}>
        <Logo>Expenses Tracker</Logo>
        <Menu theme="dark" defaultSelectedKeys={["transactions"]}>
          <Menu.Item key="transactions">
            <Link to="/transactions">
              <DollarCircleFilled />
              Transactions
            </Link>
          </Menu.Item>
          <Menu.Item key="budgets">
            <Link to="/budgets">
              <BarChartOutlined />
              Budgets
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <SettingFilled />
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Router>
          <Transactions path="/transactions" default />
          <Budgets path="/budgets" />
          <Settings path="/settings" />
        </Router>
      </Layout>
    </AppLayout>
  );
};

export default App;
