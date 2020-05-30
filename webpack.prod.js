const merge = require("webpack-merge");
const { ui, main } = require("./webpack.common.js");

const uiConfig = merge(ui, {
  mode: "production",
  plugins: [
    }),
  ],
});
const mainConfig = merge(main, { mode: "production" });

module.exports = [uiConfig, mainConfig];
