#!/usr/bin/env node

const chalk = require('chalk')
const DockerFileValidator = require('dockerfile_lint')
const fs = require('fs')
const path = require('path')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.dockerfile-lint.json'
]

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
    return path.join(__dirname, '..', '.dockerfile-lint.json')
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
  const level = item.level
  const levelColor = level === 'error' ? 'red' : (level === 'warn' ? 'yellow' : 'blac')
  const levelText = chalk[levelColor](level)
  const lineText = chalk.dim(item.line)
  const messageText = chalk.black(item.message)

  console.log(`  ${lineText}  ${levelText}  ${messageText}`)
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
    const underlinedText = chalk.underline(fileName)
    console.log(underlinedText)

    report.error.data.forEach(logItem)
    report.warn.data.forEach(logItem)

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
function lint () {
  const configFilePath = getConfigFilePath()
  const linter = new DockerFileValidator(configFilePath)

  const result = fs.readdirSync(process.cwd())
    .filter(isDockerfile)
    .map(lintFile.bind(null, linter))
    .reduce(reportReducer, {
      errors: 0,
      warnings: 0
    })

  const color = result.errors === 0 ? (result.warnings === 0 ? 'black' : 'yellow') : 'red'
  const coloredText = chalk[color](`Dockerfile: ${result.errors} errors, ${result.warnings} warnings\n`)
  const boldColoredText = chalk.bold(coloredText)

  console.log(boldColoredText)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && result.errors !== 0) {
    process.exit(1)
  }

  return result.errors !== 0
}

// If file was called via CLI
if (require.main === module) {
  lint()

// If file was required by another Node module
} else {
  module.exports = lint
}
