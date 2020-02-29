const getAddAction = path => (
  fileName,
  templateFile,
  additionalConfig = null,
) => {
  const action = {
    type: "add",
    path: `${path}${fileName}`,
    templateFile: templateFile,
    abortOnFail: true,
  };
  if(additionalConfig !== null) {
    action["data"] = additionalConfig;
  }
  return action;
};

module.exports = {
  getAddAction,
};
