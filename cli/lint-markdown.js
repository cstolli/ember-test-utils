#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const remark = require('remark')
const remarkLint = require('remark-lint')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.remarkrc'
]

/**
 * List of glob directories for where to find markdown files
 * @type {Array.<string>}
 */
const TEMPLATE_FILE_LOCATIONS = [
  'addon/**/*.md',
  'app/**/*.md',
  'tests/**/*.md',
  '*.md'
]

/**
 * Get configuration options for eslint
 * @returns {RemarkLintConfig} ESLint lint configuration options
 */
function getConfig () {
  // Look for configuration file in current working directory
  const files = fs.readdirSync(process.cwd())
  const configFile = files.find((fileName) => CONFIG_FILE_NAMES.indexOf(fileName) !== -1)

  // If no configuration file was found use configuration from this addon
  if (!configFile) {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '.remarkrc'), {encoding: 'utf8'})
    )
  }

  // Use found configuration
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), configFile), {encoding: 'utf8'})
  )
}

/**
 * Merge report results into a summary
 * @param {Object} linter - markdown linter
 * @param {Object} summary - summary of results
 * @param {String} filePath - path to file to lint
 * @returns {Object} summary
 */
function reportReducer (linter, summary, filePath) {
  const fileContents = fs.readFileSync(filePath, {encoding: 'utf8'})
  const file = linter.process(fileContents)

  if (file.messages.length !== 0) {
    const underlinedText = chalk.underline(`\n${filePath}`)
    console.log(underlinedText)

    file.messages.forEach((message) => {
      const messageText = chalk.black(message.message)
      const positionText = chalk.dim(`${message.line}:${message.column}`)
      const ruleText = chalk.dim(message.ruleId)
      const severityColor = message.fatal ? 'red' : 'yellow'
      const severityText = message.fatal ? 'error' : 'warning'
      const coloredSeverityText = chalk[severityColor](severityText)

      console.log(
        `  ${positionText}  ${coloredSeverityText}  ${messageText}  ${ruleText}`
      )

      if (message.fatal) {
        summary.errors += 1
      } else {
        summary.warnings += 1
      }
    })

    console.log('') // logging empty line
  }

  return summary
}

/* eslint-disable complexity */
/**
 * Lint Markdown files
 * @returns {Boolean} returns true if there are linting errors
 */
function lint () {
  const config = getConfig()
  const lintConfig = (config.plugins || {}).lint || {}
  const linter = remark().use(remarkLint, lintConfig)

  const result = glob.sync(TEMPLATE_FILE_LOCATIONS)
    .reduce(reportReducer.bind(null, linter), {
      errors: 0,
      warnings: 0
    })

  const color = result.errors === 0 ? (result.warnings === 0 ? 'black' : 'yellow') : 'red'
  const coloredText = chalk[color](`Markdown: ${result.errors} errors, ${result.warnings} warnings\n`)
  const boldColoredText = chalk.bold(coloredText)

  console.log(boldColoredText)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && result.errors !== 0) {
    process.exit(1)
  }

  return result.errors !== 0
}
/* eslint-enable complexity */

// If file was called via CLI
if (require.main === module) {
  lint()

// If file was required by another Node module
} else {
  module.exports = lint
}
