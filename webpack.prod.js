const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const common = require("./webpack.common.js");

const uiConfig = merge(common, {
  mode: "production",
  entry: {
    main: ["./src/index.tsx"],
  },
  output: {
    path: `${__dirname}/dist/ui`,
    filename: "bundle.js",
    publicPath: "./",
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new WebpackBar({
      name: "UI",
      basic: true,
    }),
  ],
});

const electronConfig = merge(common, {
  mode: "production",
  entry: {
    main: ["./electron/main.ts"],
  },
  output: {
    path: `${__dirname}/dist/electron`,
    filename: "bundle.js",
    publicPath: "./",
  },
  target: "electron-main",
  node: {
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new WebpackBar({
      name: "Electron",
      color: "yellow",
      basic: true,
    }),
  ],
});

module.exports = [uiConfig, electronConfig];
