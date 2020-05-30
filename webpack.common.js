const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");

const uiConfig = {
  entry: {
    main: ["./src/index.tsx"],
  },
  output: {
    path: `${__dirname}/dist/ui`,
    filename: "bundle.js",
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)([?]?.*)$/,
        loader: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
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
};

const mainConfig = {
  entry: {
    main: ["./electron/main.ts"],
  },
  output: {
    path: `${__dirname}/dist/electron`,
    filename: "bundle.js",
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.(ts)([?]?.*)$/,
        loader: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
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
};

const sharedConfig = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "api/src/models"),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    reasons: false,
  },
};

module.exports.ui = merge(uiConfig, sharedConfig);
module.exports.main = merge(mainConfig, sharedConfig);
