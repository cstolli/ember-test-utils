/**
 * Shortcut for generating the params passed to describeModel from ember-mocha
 */

// NOTE not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
import Ember from 'ember'

import {getDeprecationMessage} from './typedefs'

const deprecationMsg = getDeprecationMessage('describeModel')

/**
 * Generate an Array of the first 3 params to describeModel, so that we can keep the function definition on the
 * same line as the describeModel call itself
 * @param {String} name - the name of the model being tested
 * @param {String[]} dependencies - the entries for the 'needs' property in the options for describeModel
 * @param {Object} options - any additional options needed for describeModel
 * @returns {Array} the first three params to describeModel
 */
export function model (name, dependencies, options = {}) {
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-model.model',
    until: '2.0.0'
  })

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
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-model.serializer',
    until: '2.0.0'
  })

  if (dependencies) {
    options.needs = dependencies
  }

  return [
    name,
    `Unit / Serializer / ${name}`,
    options
  ]
}
