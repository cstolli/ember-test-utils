#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const remark = require('remark')
const remarkLint = require('remark-lint')

const Linter = require('./linter')

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
const FILE_LOCATIONS = [
  'addon/**/*.md',
  'app/**/*.md',
  'docs/**/*.md',
  'tests/**/*.md',
  '*.md'
]

const MarkdownLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: '.remarkrc',
    fileLocations: FILE_LOCATIONS
  })
}

// Inherit from Linter class
MarkdownLinter.prototype = Object.create(Linter.prototype)
MarkdownLinter.prototype.constructor = MarkdownLinter

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
    this.printFilePath(filePath)

    file.messages.forEach((message) => {
      const severity = message.fatal ? 'error' : 'warning'
      this.printLintItem(message.line, message.column, severity, message.message, message.ruleId)

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

/**
 * The entries in the consumer's `.remarkignore` file
 *
 * @returns {Array} entries
 */
function getIgnoredFiles () {
  const filePath = path.join(process.cwd(), '.remarkignore')
  const ignoredFilesSource = fs.existsSync(filePath) ? fs.readFileSync(filePath, {encoding: 'utf8'}) : ''
  let ignoredFiles = ignoredFilesSource.split('\n')

  ignoredFiles = ignoredFiles.filter(function (item) {
    return item !== ''
  })

  return ignoredFiles
}

/* eslint-disable complexity */
/**
 * Lint Markdown files
 * @returns {Boolean} returns true if there are linting errors
 */
MarkdownLinter.prototype.lint = function () {
  const config = this.getConfig()
  const ignoredFiles = getIgnoredFiles()
  const lintConfig = (config.plugins || {}).lint || {}
  const linter = remark().use(remarkLint, lintConfig)

  // respect consumer's `.remarkignore` file
  if (ignoredFiles) {
    ignoredFiles.forEach((file) => {
      this.fileLocations.push(`!${file}`)
    })
  }

  const result = glob.sync(this.fileLocations)
    .reduce(reportReducer.bind(this, linter), {
      errors: 0,
      warnings: 0
    })

  this.printLintSummary('Markdown', result.errors, result.warnings)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && result.errors !== 0) {
    process.exit(1)
  }

  return result.errors !== 0
}
/* eslint-enable complexity */

// If file was called via CLI
if (require.main === module) {
  const linter = new MarkdownLinter()
  linter.lint()

// If file was required by another Node module
} else {
  module.exports = MarkdownLinter
}
