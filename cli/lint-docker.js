#!/usr/bin/env node

const DockerFileValidator = require('dockerfile_lint')
const fs = require('fs')
const path = require('path')

const Linter = require('./linter')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.dockerfile-lint.json'
]

const DockerLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: '.dockerfile-lint.json'
  })
}

// Inherit from Linter class
DockerLinter.prototype = Object.create(Linter.prototype)
DockerLinter.prototype.constructor = DockerLinter

/**
 * Get configuration options for dockerfile_lint
 * @returns {DockerfileLintConfig} dockerfile lint configuration options
 */
function getConfigFilePath () {
  // Look for configuration file in current working directory
  const files = fs.readdirSync(process.cwd())
  const configFile = files.find((filePath) => {
    return CONFIG_FILE_NAMES.find((configFileName) => filePath.indexOf(configFileName) !== -1)
  })

  // If no configuration file was found use recommend configuration
  if (!configFile) {
    return path.join(__dirname, '..', this.defaultConfig)
  }

  // Use configuration from current working directory
  return path.join(process.cwd(), configFile)
}

/**
 * Determine if file is a Dockerfile
 * @param {String} fileName - file name
 * @returns {Boolean} whether or not file is a Dockerfile
 */
function isDockerfile (fileName) {
  return fileName.indexOf('Dockerfile') !== -1
}

/**
 * Log item
 * @param {Object} item - item
 */
function logItem (item) {
  this.printLintItem(item.line, null, item.level, item.message, null)
}

/**
 * Lint a single Dockerfile
 * @param {Object} linter - linter
 * @param {String} fileName - name of file to lint
 * @returns {Object} lint result
 */
function lintFile (linter, fileName) {
  const fileContents = fs.readFileSync(fileName, {encoding: 'utf8'}).toString()
  const report = linter.validate(fileContents)
  const errors = report.error.count
  const warnings = report.warn.count

  if (errors || warnings) {
    this.printFilePath(fileName)

    report.error.data.forEach(logItem.bind(this))
    report.warn.data.forEach(logItem.bind(this))

    console.log('') // logging empty line
  }

  return report
}

/**
 * Merge report results into a summary
 * @param {Object} summary - summary of results
 * @param {Object} report - report for a single Dockerfile
 * @returns {Object} summary
 */
function reportReducer (summary, report) {
  summary.errors += report.error.count
  summary.warnings += report.warn.count
  return summary
}

/**
 * Lint Docker files
 * @returns {Boolean} returns true if there are linting errors
 */
DockerLinter.prototype.lint = function () {
  const configFilePath = getConfigFilePath.call(this)
  const linter = new DockerFileValidator(configFilePath)

  const result = fs.readdirSync(process.cwd())
    .filter(isDockerfile)
    .map(lintFile.bind(this, linter))
    .reduce(reportReducer, {
      errors: 0,
      warnings: 0
    })

  this.printLintSummary('Dockerfile', result.errors, result.warnings)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && result.errors !== 0) {
    process.exit(1)
  }

  return result.errors !== 0
}

// If file was called via CLI
if (require.main === module) {
  const linter = new DockerLinter()
  linter.lint()

// If file was required by another Node module
} else {
  module.exports = DockerLinter
}
