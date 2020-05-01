import React from "react";
import Layout from "antd/es/layout";
import styled from "styled-components";

const Header = styled(Layout.Header)`
  background: #ffffff;
  padding: 0 32px;
`;

const Content = styled(Layout.Content)`
  margin: 32px;
`;

const MainContainer = ({ children, title }) => {
  return (
    <>
      <Header>
        <h1>{title}</h1>
      </Header>
      <Content>{children}</Content>
    </>
  );
};

export default MainContainer;
