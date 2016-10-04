/**
 * Shortcut for generating the params passed to describeModule from ember-mocha
 */

import Ember from 'ember'

/**
 * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
 * same line as the describeModule call itself
 * @param {String} type - the type of module being tested ('controller', 'route', 'service', 'serializer', etc.)
 * @param {String} name - the name of the module being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModule
 * @returns {Array} the first three params to describeModule
 */
export function module (type, name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }

  return [
    `${type}:${name}`,
    `Unit | ${Ember.String.classify(type)} | ${name}`,
    options
  ]
}

/**
 * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
 * same line as the describeModule call itself, assumes a route type
 * @param {String} name - the name of the module being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModule
 * @returns {Array} the first three params to describeModule
 */
export function route (name, dependencies, options = {}) {
  return module('route', name, dependencies, options)
}

/**
 * Generate an Array of the first 3 params to describeModule, so that we can keep the function definition on the
 * same line as the describeModule call itself, assumes a controller type
 * @param {String} name - the name of the module being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModule
 * @returns {Array} the first three params to describeModule
 */
export function controller (name, dependencies, options = {}) {
  return module('controller', name, dependencies, options)
}
