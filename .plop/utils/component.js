const dashRegExp = /(-\w)/g;

const isDashCase = componentName => {
  return componentName.match(dashRegExp);
};

const getUsedCase = componentName => {
  return isDashCase(componentName) ? "dashCase" : "properCase";
};

module.exports = {
  isDashCase,
  getUsedCase,
};
