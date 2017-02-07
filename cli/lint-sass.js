#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const sassLint = require('sass-lint')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.sass-lint.json'
]

/**
 * List of glob directories for where to find SASS files
 * @type {Array.<string>}
 */
const TEMPLATE_FILE_LOCATIONS = [
  'addon/**/*.sass',
  'addon/**/*.scss',
  'app/**/*.sass',
  'app/**/*.scss',
  'tests/**/*.sass',
  'tests/**/*.scss'
]

/**
 * Get configuration options for sass-lint
 * @returns {SassLintConfig} sass-lint configuration options
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
      fs.readFileSync(path.join(__dirname, '..', '.sass-lint.json'), {encoding: 'utf8'})
    )
  }

  // Use found configuration
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), configFile), {encoding: 'utf8'})
  )
}

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
      const underlinedText = chalk.underline(`${filePath}`)
      console.log(underlinedText)

      report.messages.forEach((message) => {
        const messageText = chalk.black(message.message)
        const positionText = chalk.dim(`${message.line}:${message.column}`)
        const ruleText = chalk.dim(message.ruleId)
        const severityColor = message.severity === 2 ? 'red' : 'yellow'
        const severityText = message.severity === 2 ? 'error' : 'warning'
        const coloredSeverityText = chalk[severityColor](severityText)

        console.log(
          `  ${positionText}  ${coloredSeverityText}  ${messageText}  ${ruleText}`
        )
      })

      console.log('') // logging empty line
    }

    summary.errors += report.errorCount
    summary.warnings += report.warningCount
  })

  return summary
}

/**
 * Lint SASS files
 * @returns {Boolean} returns true if there are linting errors
 */
function lint () {
  const options = getConfig()

  const result = glob.sync(TEMPLATE_FILE_LOCATIONS)
    .reduce(resultReducer.bind(null, options), {
      errors: 0,
      warnings: 0
    })

  const color = result.errors === 0 ? (result.warnings === 0 ? 'black' : 'yellow') : 'red'
  const coloredText = chalk[color](`SASS: ${result.errors} errors, ${result.warnings} warnings\n`)
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
