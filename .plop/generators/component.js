"use strict";

const { getUsedCase } = require("../utils/component.js");
const { getAddAction } = require("../utils/actions.js");
const { inputRequired } = require("../utils/validators.js");
const {
  getModulePrompt,
  getNamePrompt,
  getMemoPrompt,
  getUseTranslationsPrompt,
  getExportFromModulePrompt,
} = require("../utils/prompts.js");

const MAX_PROPS = 10;

const propsPrompts = [];
[...new Array(MAX_PROPS)].forEach((v, i) => {
  propsPrompts.push(
    {
      type: 'confirm',
      name: '_props',
      message: () => (i === 0 ? 'Do you have props?' : 'Other props?'),
      when: data => i === 0 || data._props
    },
    {
      type: 'input',
      name: `props.${i}.name`,
      message: 'Props name?',
      validate: inputRequired('props name'),
      when: data => data._props
    },
    {
      type: 'input',
      name: `props.${i}.type`,
      message: 'Props type?',
      validate: inputRequired('props type'),
      when: data => data._props
    },
    {
      type: 'confirm',
      name: `props.${i}.required`,
      message: 'Props is required?',
      when: data => data._props
    }
  );
});

const getPrompts = plopConfig => {
  const prompts = [];
  prompts.push(
    getModulePrompt(plopConfig),
    getNamePrompt(plopConfig, "component"),
    ...propsPrompts,
    getMemoPrompt(plopConfig),
    getExportFromModulePrompt(plopConfig),
    getUseTranslationsPrompt(plopConfig),
  );
  return prompts;
};

const path = `../src/modules/{{camelCase module}}/components/`;
const addAction = getAddAction(path);

const getActions = plopConfig => data => {
  const usedCase = getUsedCase(data.name);
  const actions = [];
  actions.push(
    addAction(
      `{{${usedCase} name}}.tsx`,
      "./templates/components/stateless.tsx.hbs",
    ),
    addAction(
      `{{${usedCase} name}}.stories.tsx`,
      "./templates/components/stateless.stories.tsx.hbs",
    ),
    addAction(
      `{{${usedCase} name}}.test.tsx`,
      "./templates/components/stateless.test.tsx.hbs",
    ),
  );

  if (data.exportFromModule) {
    actions.push({
      type: "append",
      unique: true,
      path: `${path}index.ts`,
      template: 'export { default as {{ properCase name }} } from "./{{ properCase name }}";',
      abortOnFail: true,
    });
  }

  return actions;
};

module.exports = (plop, config) => {
  plop.setGenerator("Add an component", {
    prompts: getPrompts(config),
    actions: getActions(config),
  });
};