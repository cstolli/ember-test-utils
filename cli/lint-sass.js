#!/usr/bin/env node

const glob = require('glob-all')
const sassLint = require('sass-lint')

const Linter = require('./linter')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.sass-lint.yml'
]

/**
 * List of glob directories for where to find SASS files
 * @type {Array.<string>}
 */
const FILE_LOCATIONS = [
  'addon/**/*.sass',
  'addon/**/*.scss',
  'app/**/*.sass',
  'app/**/*.scss',
  'tests/**/*.sass',
  'tests/**/*.scss'
]

/**
 * Merge report results into a summary
 * @param {Object} options - sass-lint options
 * @param {Object} summary - summary of results
 * @param {String} filePath - path to file to lint
 * @returns {Object} summary
 */
function resultReducer (options, summary, filePath) {
  sassLint.lintFiles(filePath, options).forEach((report) => {
    if (report.messages.length !== 0) {
      this.printFilePath(filePath)

      report.messages.forEach((message) => {
        const severity = message.severity === 2 ? 'error' : 'warning'
        this.printLintItem(message.line, message.column, severity, message.message, message.ruleId)
      })

      console.log('') // logging empty line
    }

    summary.errors += report.errorCount
    summary.warnings += report.warningCount
  })

  return summary
}

const SassLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: '.sass-lint.json',
    fileLocations: FILE_LOCATIONS
  })
}

// Inherit from Linter class
SassLinter.prototype = Object.create(Linter.prototype)
SassLinter.prototype.constructor = SassLinter

/**
 * Lint SASS files
 * @returns {Boolean} returns true if there are linting errors
 */
SassLinter.prototype.lint = function () {
  const options = this.getConfig()

  const result = glob.sync(this.fileLocations)
    .reduce(resultReducer.bind(this, options), {
      errors: 0,
      warnings: 0
    })

  this.printLintSummary('SASS', result.errors, result.warnings)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && result.errors !== 0) {
    process.exit(1)
  }

  return result.errors !== 0
}

// If file was called via CLI
if (require.main === module) {
  const linter = new SassLinter()
  linter.lint()

// If file was required by another Node module
} else {
  module.exports = SassLinter
}
