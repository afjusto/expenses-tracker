const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const rewireStyledComponents = require("react-app-rewire-styled-components");

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    plugins: config.resolve.plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin)
    ),
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@models": path.resolve(__dirname, "api/src/models"),
    },
  };
  config = rewireStyledComponents(config, env);

  return config;
};
