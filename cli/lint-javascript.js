#!/usr/bin/env node

const chalk = require('chalk')
const CLIEngine = require('eslint').CLIEngine
const fs = require('fs')
const path = require('path')

/**
 * List of glob directories for where to find Javascript source files
 * @type {Array.<string>}
 */
const SOURCE_FILE_LOCATIONS = [
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

/**
 * Get configuration options for eslint
 * @returns {ESLintConfig} ESLint lint configuration options
 */
function getConfig () {
  // Look for configuration file in current working directory
  const files = fs.readdirSync(process.cwd())
  const configFile = files.find((filePath) => {
    return CONFIG_FILE_NAMES.find((configFileName) => filePath.indexOf(configFileName) !== -1)
  })

  // If no configuration file was found use configuration from this addon
  if (!configFile) {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '.eslintrc'), {encoding: 'utf8'})
    )
  }

  // If configuration file is a Javascript module, require it
  if (configFile === '.eslintrc.js') {
    return require(path.join(process.cwd(), configFile))
  }

  // If configuration file is JSON, parse it
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), configFile), {encoding: 'utf8'})
  )
}

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
function lint () {
  const config = getConfig()
  const cli = new CLIEngine(config)

  const report = cli.executeOnFiles(SOURCE_FILE_LOCATIONS)

  report.results.forEach((result) => {
    if (result.messages.length === 0) {
      return
    }

    const underlinedFilePath = chalk.underline(`\n${result.filePath}`)

    console.log(underlinedFilePath)

    result.messages.forEach((message) => {
      const msg = message.message.replace(/\.$/, '')
      const messageText = chalk.black(msg)
      const positionText = chalk.dim(`${message.line}:${message.column}`)
      const ruleText = chalk.dim(message.ruleId)
      const severityColor = getSeverityColor(message.severity)
      const severityText = getSeverityLabel(message.severity)
      const coloredSeverityText = chalk[severityColor](severityText)

      console.log(
        `  ${positionText}  ${coloredSeverityText}  ${messageText}  ${ruleText}`
      )
    })
  })

  const errors = report.errorCount
  const warnings = report.warningCount
  const color = errors ? 'red' : (warnings ? 'yellow' : 'black')
  const coloredText = chalk[color](`\nJavascript: ${errors} errors, ${warnings} warnings`)
  const boldColoredText = chalk.bold(coloredText)

  console.log(boldColoredText)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && report.errorCount !== 0) {
    process.exit(1)
  }

  return report.errorCount !== 0
}

// If file was called via CLI
if (require.main === module) {
  lint()

// If file was required by another Node module
} else {
  module.exports = lint
}
