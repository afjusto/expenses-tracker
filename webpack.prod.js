const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { merge } = require("webpack-merge");
const { ui, main } = require("./webpack.common.js");

const uiConfig = merge(ui, {
  mode: "production",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
    }),
  ],
});
const mainConfig = merge(main, { mode: "production" });

module.exports = [uiConfig, mainConfig];
