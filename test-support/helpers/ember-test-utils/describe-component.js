/**
 * Shortcuts for generating the params passed to describeComponent from ember-mocha
 */

import Ember from 'ember'
import _ from 'lodash'

/**
 * A shortcut for filling in the first three params in a describeComponent
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
function testCtx (name, options = {}) {
  const testType = (options.unit) ? 'Unit' : 'Integration'
  return [
    name,
    `${testType}: ${Ember.String.classify(name)}Component`,
    options
  ]
}

/**
 * A shortcut for filling in the text context in a describeComponent
 * @param {String} name - the name of the component
 * @param {String[]} dependencies - the list of "needs" for this component
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
export function unit (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return testCtx(name, _.assign(options, {unit: true}))
}

/**
 * A shortcut for filling in the text context in a describeComponent
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set (alongside integration: true)
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
export function integration (name, options = {}) {
  return testCtx(name, _.assign(options, {integration: true}))
}
