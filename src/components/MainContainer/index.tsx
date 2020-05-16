import React, { ReactNode } from "react";
import Layout from "antd/es/layout";
import styled from "styled-components";

type Props = {
  actions?: ReactNode;
  title: string;
};

const Header = styled(Layout.Header)`
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
`;

const Content = styled(Layout.Content)`
  margin: 32px;
`;

const MainContainer: React.FC<Props> = ({ actions, title, children }) => {
  return (
    <>
      <Header>
        <h1>{title}</h1>
        {actions}
      </Header>
      <Content>{children}</Content>
    </>
  );
};

export default MainContainer;
