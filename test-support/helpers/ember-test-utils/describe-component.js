/**
 * Shortcuts for generating the params passed to describeComponent from ember-mocha
 */

// NOTE: not destructuring 'deprecate' for ease of testing
/* eslint-disable ember-standard/destructure */
import Ember from 'ember'

import {getDeprecationMessage} from './typedefs'
const deprecationMsg = getDeprecationMessage('describeComponent')
const assign = Ember.assign || Ember.merge // NOTE: only use two params in assign() since merge() doesn't take more

/**
 * A shortcut for filling in the first three params in a describeComponent
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
function component (name, options = {}) {
  const testType = (options.unit) ? 'Unit' : 'Integration'
  return [
    name,
    `${testType} / Component / ${name}`,
    options
  ]
}

/**
 * A shortcut for filling in the first three params for describeComponent unit test
 * @param {String} name - the name of the component
 * @param {String[]} dependencies - the list of "needs" for this component
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
export function unit (name, dependencies, options = {}) {
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-component.unit',
    until: '2.0.0'
  })

  if (dependencies) {
    options.needs = dependencies
  }
  return component(name, assign(options, {unit: true}))
}

/**
 * A shortcut for filling in the first three params for describeComponent integration test
 * @param {String} name - the name of the component
 * @param {Object} options - any additional options to set (alongside integration: true)
 * @returns {Object[]} an array of items that need to be passed in to describeComponent
 */
export function integration (name, options = {}) {
  Ember.deprecate(deprecationMsg, false, {
    id: 'ember-test-utils.describe-component.integration',
    until: '2.0.0'
  })
  return component(name, assign(options, {integration: true}))
}
