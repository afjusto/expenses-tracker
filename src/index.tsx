import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { App } from "./App";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    --color-error: #ff4d4f;
    --color-light-green: #b7eb8f;
    --color-light-pink: #fff2f0;
    --color-lively-light-pink: #ffccc7;
    --color-mint: #f6ffed;
    --color-primary: #40a9ff;
    --color-success: #52c41a;
    --color-white: #ffffff;
  }
`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <HashRouter>
      <App />
    </HashRouter>
  </>,
  document.getElementById("root")
);
