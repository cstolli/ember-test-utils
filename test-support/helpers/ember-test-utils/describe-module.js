/**
 * Shortcut for generating the params passed to describeModule from ember-mocha
 */

import Ember from 'ember' // NOTE not destructuring 'deprecate' for ease of testing

import {getDeprecationMessage} from './typedefs'
const deprecationMsg = getDeprecationMessage('describeModule')

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
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-module.module',
    until: '2.0.0'
  })

  if (dependencies) {
    options.needs = dependencies
  }

  return [
    `${type}:${name}`,
    `Unit / ${Ember.String.classify(type)} / ${name}`,
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
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-module.route',
    until: '2.0.0'
  })

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
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-module.controller',
    until: '2.0.0'
  })

  return module('controller', name, dependencies, options)
}
