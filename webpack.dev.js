const { merge } = require("webpack-merge");
const { ui, main } = require("./webpack.common.js");

const config = {
  mode: "development",
  devtool: "inline-source-map",
};

const uiConfig = merge(ui, config);
const mainConfig = merge(main, config);

module.exports = [uiConfig, mainConfig];
