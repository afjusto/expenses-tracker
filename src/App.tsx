import styled from "styled-components";
import { Link, Route, useLocation, Redirect } from "react-router-dom";
import {
  BarChartOutlined,
  DollarCircleFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { Budgets } from "@/pages/Budgets";
import { Categories } from "@/pages/Categories";
import { Entities } from "@/pages/Entities";
import { Settings } from "@/pages/Settings";
import { Transactions } from "@/pages/Transactions";

const AppLayout = styled(Layout)`
  height: 100vh;
`;

const Logo = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  display: flex;
  font-size: 1rem;
  justify-content: center;
  height: 64px;
`;

export const App: React.FC = () => {
  const selectedMenuKey = useLocation().pathname.replace("/", "");
  const defaultOpenKeys = selectedMenuKey.startsWith("settings")
    ? "settings"
    : "";

  return (
    <AppLayout>
      <Layout.Sider width={250}>
        <Logo>Expenses Tracker</Logo>
        <Menu
          theme="dark"
          selectedKeys={[selectedMenuKey]}
          defaultOpenKeys={[defaultOpenKeys]}
          mode="inline"
        >
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
            <Menu.Item key="settings/general">
              <Link to="/settings/general">General</Link>
            </Menu.Item>
            <Menu.Item key="settings/categories">
              <Link to="/settings/categories">Categories</Link>
            </Menu.Item>
            <Menu.Item key="settings/entities">
              <Link to="/settings/entities">Entities</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Route path="/transactions" component={Transactions} />
        <Route path="/budgets" component={Budgets} />
        <Route path="/settings/categories" component={Categories} />
        <Route path="/settings/general" component={Settings} />
        <Route path="/settings/entities" component={Entities} />
        <Route exact path="/" render={() => <Redirect to="/transactions" />} />
      </Layout>
    </AppLayout>
  );
};
