import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  background-color: #282c34;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

function App() {
  return (
    <Container>
      <main>Hello world!</main>
    </Container>
  );
}

export default App;
