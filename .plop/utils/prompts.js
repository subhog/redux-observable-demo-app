const getModulePrompt = (plopConfig) => {
  const defaultName = plopConfig.defaultModuleName;
  return {
    input: "input",
    name: "module",
    message: "What is the name of your module?",
    default: defaultName,
  };
};

const getNamePrompt = plopConfig => {
  const defaultName = plopConfig.defaultComponentName;
  return {
    type: "input",
    name: "name",
    message: "What should it be called?",
    default: defaultName,
  };
};

const getMemoPrompt = plopConfig => {
  const defaultMemo = plopConfig.useMemoByDefault;
  return {
    type: "confirm",
    name: "useMemo",
    message: "Should we memoize it?",
    default: defaultMemo,
  };
};

const getExportFromModulePrompt = plopConfig => {
  const defaultExport = plopConfig.exportFromModuleByDefault;
  return {
    type: "confirm",
    name: "exportFromModule",
    message: "Export component from module?",
    default: defaultExport,
  };
};

const getUseTranslationsPrompt = plopConfig => {
  return {
    type: "confirm",
    name: "useTranslations",
    default: plopConfig.useTranslationsByDefault,
    message: "Do you want to use translations?",
  };
};

module.exports = {
  getModulePrompt,
  getNamePrompt,
  getMemoPrompt,
  getUseTranslationsPrompt,
  getExportFromModulePrompt,
};
