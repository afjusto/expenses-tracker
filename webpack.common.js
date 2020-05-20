const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "api/src/models"),
    },
    extensions: [".ts", ".tsx", ".js"],
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
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    reasons: false,
  },
};
