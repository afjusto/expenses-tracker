const { HotModuleReplacementPlugin } = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const config = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
});

module.exports = config;
