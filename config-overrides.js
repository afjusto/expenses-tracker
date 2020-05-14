const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "api/src/models"),
    },
  };

  return config;
};
