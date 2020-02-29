"use strict";

const { getUsedCase } = require("../utils/component.js");
const { getAddAction } = require("../utils/actions.js");
const { getModulePrompt } = require("../utils/prompts.js");

const getPrompts = plopConfig => {
  const prompts = [];
  prompts.push(getModulePrompt(plopConfig));
  return prompts;
};

const addAction = getAddAction(`../src/modules/{{camelCase module}}/`);

const getActions = plopConfig => data => {
  const actions = [];
  actions.push(
    addAction(
      "index.ts",
      "./templates/module/index.ts.hbs",
    ),
    addAction(
      "slice.ts",
      "./templates/module/slice.ts.hbs",
    ),
    addAction(
      "slice.test.ts",
      "./templates/module/slice.test.ts.hbs",
    ),
    addAction(
      "models.ts",
      "./templates/module/models.ts.hbs",
    ),
    addAction(
      "epics.ts",
      "./templates/module/epics.ts.hbs",
    ),
    addAction(
      "epics.test.ts",
      "./templates/module/epics.test.ts.hbs",
    ),
    addAction(
      "components/index.ts",
      "./templates/module/components_index.ts.hbs",
    ),
  );
  actions.push({
    type: "append",
    pattern: "// import modules",
    unique: true,
    path: `../src/store/index.ts`,
    template: 'import { slice as {{ lowerCase module }}, epics as {{ lowerCase module }}Epics } from "@modules/{{ lowerCase module }}";',
    abortOnFail: true,
  });
  actions.push({
    type: "append",
    pattern: "const reducer = combineReducers({",
    unique: true,
    path: `../src/store/index.ts`,
    template: '  {{ lowerCase module }}: {{ lowerCase module }}.reducer,',
    abortOnFail: true,
  });
  actions.push({
    type: "append",
    pattern: "const rootEpic = combineEpics(",
    unique: true,
    path: `../src/store/index.ts`,
    template: '    {{ lowerCase module }}Epics,',
    abortOnFail: true,
  });
  return actions;
};

module.exports = (plop, config) => {
  plop.setGenerator("Add a module", {
    prompts: getPrompts(config),
    actions: getActions(config),
  });
};