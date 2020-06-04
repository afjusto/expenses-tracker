import React from "react";
import styled from "styled-components";
import {
  BarChartOutlined,
  DollarCircleFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Link, Router } from "@reach/router";
import { Layout, Menu } from "antd";

import Budgets from "@/pages/Budgets";
import Entities from "@/pages/Entities";
import Settings from "@/pages/Settings";
import Transactions from "@/pages/Transactions";

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

const App: React.FC = () => {
  return (
    <AppLayout>
      <Layout.Sider width={250}>
        <Logo>Expenses Tracker</Logo>
        <Menu theme="dark" defaultSelectedKeys={["transactions"]} mode="inline">
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
          <Menu.SubMenu
            key="settings"
            icon={<SettingFilled />}
            title="Settings"
          >
            <Menu.Item key="general">
              <Link to="/settings">General</Link>
            </Menu.Item>
            <Menu.Item key="entities">
              <Link to="/entities">Entities</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Router>
          <Transactions path="/transactions" default />
          <Budgets path="/budgets" />
          <Settings path="/settings" />
          <Entities path="/entities" />
        </Router>
      </Layout>
    </AppLayout>
  );
};

export default App;
