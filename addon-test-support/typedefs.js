/**
 * Type definitions used in ember-test-utils helpers
 */

/**
 * @typedef Test
 * Configuration information for a test
 * @property {String} label - the label for the test (to be passed as first param to describe())
 * @property {Function} setup - a function that will call setupComponent or setupTest to setup the mocha test
 */

/**
 * Helper to ease creation of deprecation messages
 * @param {String} methodName - the name of the method the deprecated helper was helping
 * @returns {String} the deprecation message
 */
export function getDeprecationMessage (methodName) {
  return `${methodName}() helpers have been deprecated since ${methodName}() itself is now deprecated`
}
