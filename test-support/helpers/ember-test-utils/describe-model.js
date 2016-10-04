/**
 * Shortcut for generating the params passed to describeModel from ember-mocha
 */

/**
 * Generate an Array of the first 3 params to describeModel, so that we can keep the function definition on the
 * same line as the describeModel call itself
 * @param {String} name - the name of the model being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModel
 * @returns {Array} the first three params to describeModel
 */
export function model (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }

  return [
    name,
    `Unit / Model / ${name}`,
    options
  ]
}

/**
 * Generate an Array of the first 3 params to describeModel, so that we can keep the function definition on the
 * same line as the describeModel call itself
 * @param {String} name - the name of the model being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModel
 * @returns {Array} the first three params to describeModel
 */
export function serializer (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }

  return [
    name,
    `Unit / Serializer / ${name}`,
    options
  ]
}
