/**
 * Helpers for doing tests with ember-intl
 */

/**
 * Additional ember-intl dependencies
 * @see {@link https://github.com/jasonmit/ember-intl/blob/master/docs/unit-testing.md#unit-testing}
 */
export const emberIntlDeps = [
  'ember-intl@adapter:default', // required with format-message
  'ember-intl@formatter:format-message', // optional
  'ember-intl@formatter:format-html-message', // optional
  'ember-intl@formatter:format-date', // optional
  'ember-intl@formatter:format-time', // optional
  'ember-intl@formatter:format-number', // optional
  'ember-intl@formatter:format-relative', // optional
  'helper:intl-get', // optional
  'helper:t', // optional, if used then be sure to include the format-message formatter above
  'helper:t-html', // optional, if used then be sure to include the format-html-message formatter above
  'helper:format-date', // optional
  'helper:format-time', // optional
  'helper:format-relative', // optional
  'helper:format-number' // optional
]

/**
 * Add all the dependencies listed as required or optional from ember-intl documentation
 * @param {String[]} deps - the list of dependencies (it will be mutated)
 */
export function addEmberIntlDeps (deps) {
  emberIntlDeps.forEach((dep) => {
    deps.push(dep)
  })
}

/**
 * Check if a given set of options requires additional ember-intl dependencies
 * @param {Object} options - the options for the test
 * @returns {Boolean} true if additional ember-intl dependencies are needed
 */
export function needsEmberIntlDeps (options) {
  return (options.unit === true) && (options.needs !== undefined) && options.needs.includes('service:intl')
}
