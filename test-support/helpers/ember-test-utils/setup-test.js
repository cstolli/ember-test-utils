/**
 * Helper for streamlining setting up mocha tests
 */
import './typedefs'

import Ember from 'ember'
import {setupModelTest, setupTest} from 'ember-mocha'

// Workaround to allow stubbing dependencies during testing
export const deps = {
  setupModelTest,
  setupTest
}

/**
 * A helper to format describe text as well as configure setupTest from ember-mocha
 * @param {String} name - the name of the module (including type, i.e. 'controller:foo')
 * @param {Object} options - any additional options to set
 * @returns {Test} a test config object
 */
export function module (name, options = {}) {
  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  const [moduleType, moduleName] = name.split(':')
  return {
    label: `${testType} / ${Ember.String.classify(moduleType)} / ${moduleName}`,
    setup () {
      deps.setupTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a model unit test
 * @param {String} name - the name of the model
 * @param {String[]} dependencies - the list of "needs" for this model
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function model (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }

  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Model / ${name}`,
    setup () {
      deps.setupModelTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a serializer unit test
 * @param {String} name - the name of the serializer
 * @param {String[]} dependencies - the list of "needs" for this serializer
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function serializer (name, dependencies = [], options = {}) {
  options.needs = dependencies

  // if the model for this serializer isn't a dependency, add it
  if (!options.needs.includes(`model:${name}`)) {
    options.needs.push(`model:${name}`)
  }

  if (!options.unit && !options.integration) {
    options.unit = true
  }

  const testType = (options.unit) ? 'Unit' : 'Integration'
  return {
    label: `${testType} / Serializer / ${name}`,
    setup () {
      deps.setupModelTest(name, options)
    }
  }
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a route unit test
 * @param {String} name - the name of the route
 * @param {String[]} dependencies - the list of "needs" for this route
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function route (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`route:${name}`, options)
}

/**
 * A helper for formatting the describe text and calling setupTest with proper parameters for a controller unit test
 * @param {String} name - the name of the controller
 * @param {String[]} dependencies - the list of "needs" for this controller
 * @param {Object} options - any additional options to set (alongside unit: true)
 * @returns {Test} a test config object
 */
export function controller (name, dependencies, options = {}) {
  if (dependencies) {
    options.needs = dependencies
  }
  return module(`controller:${name}`, options)
}
