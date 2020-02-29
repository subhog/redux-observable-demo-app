const componentGenerator = require("./generators/component.js");
const moduleGenerator = require("./generators/module.js");
const defaultConfig = require("./utils/configuration.js");

module.exports = (plop, config) => {
  const currentConfig = Object.assign(defaultConfig, config || {});
  componentGenerator(plop, currentConfig);
  moduleGenerator(plop, currentConfig);
};