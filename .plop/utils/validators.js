/**
 * Input validator - ensure input is not empty.
 *
 * @param {string} name - the name of the required field
 * @returns {any} A function to required the given field
 */
const inputRequired = name => {
  return value => (/.+/.test(value) ? true : `${name} is required`);
};

module.exports = {
  inputRequired,
};
