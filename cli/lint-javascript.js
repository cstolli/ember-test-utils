#!/usr/bin/env node

const CLIEngine = require('eslint').CLIEngine

const Linter = require('./linter')

/**
 * List of glob directories for where to find Javascript source files
 * @type {Array.<string>}
 */
const FILE_LOCATIONS = [
  'addon/**/*.js',
  'app/**/*.js',
  'config/**/*.js',
  'mirage/**/*.js',
  'test-support/**/*.js',
  'tests/**/*.js',
  '*.js'
]

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.json'
]

const JavascriptLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: '.eslintrc',
    fileLocations: FILE_LOCATIONS
  })
}

// Inherit from Linter class
JavascriptLinter.prototype = Object.create(Linter.prototype)
JavascriptLinter.prototype.constructor = JavascriptLinter

/**
 * Get text color for severity
 * @param {Number} severity - sevrity
 * @returns {String} sevrity color
 */
function getSeverityColor (severity) {
  switch (severity) {
    case 1:
      return 'yellow'

    case 2:
      return 'red'

    default:
      return 'black'
  }
}

/**
 * Get human friendly label for severity
 * @param {Number} severity - sevrity
 * @returns {String} sevrity label
 */
function getSeverityLabel (severity) {
  switch (severity) {
    case 1:
      return 'warning'

    case 2:
      return 'error'

    default:
      return 'unknown'
  }
}

/**
 * Lint Javascript files
 * @returns {Boolean} returns true if there are linting errors
 */
JavascriptLinter.prototype.lint = function () {
  const config = this.getConfig()
  const cli = new CLIEngine(config)

  const report = cli.executeOnFiles(this.fileLocations)

  report.results.forEach((result) => {
    if (result.messages.length === 0) {
      return
    }

    this.printFilePath(result.filePath)

    result.messages.forEach((message) => {
      const msg = message.message.replace(/\.$/, '')
      const severity = getSeverityLabel(message.severity)
      this.printLintItem(message.line, message.column, severity, msg, message.ruleId)
    })

    console.log('') // logging empty line
  })

  this.printLintSummary('Javascript', report.errorCount, report.warningCount)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && report.errorCount !== 0) {
    process.exit(1)
  }

  return report.errorCount !== 0
}

// If file was called via CLI
if (require.main === module) {
  const linter = new JavascriptLinter()
  linter.lint()

// If file was required by another Node module
} else {
  module.exports = JavascriptLinter
}
