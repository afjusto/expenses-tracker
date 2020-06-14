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
  padding: 0 24px;
`;

const Content = styled(Layout.Content)`
  height: calc(100vh - 128px);
  margin: 24px;
  overflow-y: scroll;
`;

export const MainContainer: React.FC<Props> = ({
  actions,
  title,
  children,
}) => {
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
