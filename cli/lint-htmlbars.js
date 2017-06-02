#!/usr/bin/env node

/**
 * @typedef {Object} TemplateLintConfig
 * @property {Object.<string, *>} rules - linting rules
 * @reference https://github.com/rwjblue/ember-template-lint/blob/master/lib/config/recommended.js
 */

const TemplateLinter = require('ember-template-lint')
const fs = require('fs')
const path = require('path')
const glob = require('glob-all')

const Linter = require('./linter')

/**
 * List of configuration files to look for
 * @type {Array.<string>}
 */
const CONFIG_FILE_NAMES = [
  '.template-lintrc.js'
]

/**
 * List of glob directories for where to find template files
 * @type {Array.<string>}
 */
const FILE_LOCATIONS = [
  'addon/**/*.hbs',
  'app/**/*.hbs',
  'tests/**/*.hbs'
]

const HtmlbarsLinter = function () {
  Linter.call(this, {
    configFileNames: CONFIG_FILE_NAMES,
    defaultConfig: path.join(
      process.cwd(), 'node_modules', 'ember-template-lint', 'lib', 'config', 'recommended.js'
    ),
    fileLocations: FILE_LOCATIONS
  })
}

// Inherit from Linter class
HtmlbarsLinter.prototype = Object.create(Linter.prototype)
HtmlbarsLinter.prototype.constructor = HtmlbarsLinter

/**
 * Lint template files
 * @param {String} [filePath] - single path to a file to lint (if given)
 * @returns {Boolean} returns true if there are linting errors
 */
HtmlbarsLinter.prototype.lint = function (filePath) {
  const options = {
    config: this.getConfig()
  }
  const linter = new TemplateLinter(options)

  const locations = filePath ? [filePath] : this.fileLocations
  const errors = glob.sync(locations)
    .map((filePath) => {
      return linter.verify({
        moduleId: filePath,
        source: fs.readFileSync(filePath, {encoding: 'utf8'})
      })
    })
    .reduce((a, b) => a.concat(b), [])

  errors.forEach((error) => {
    console.log(`${error.rule}: ${error.message}`)
    console.log(`(${error.moduleId}) @ L${error.line}:C${error.column}:\n`)
    console.log('\t' + error.source.replace(/\n/g, '\n\t'))

    if (error.fix) {
      console.log('FIX:')
      console.log(error.fix.text)
    }

    console.log('\n')
  })

  this.printLintSummary('HTMLBars', errors.length, 0)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && errors.length !== 0) {
    process.exit(1)
  }

  return errors.length !== 0
}

// If file was called via CLI
if (require.main === module) {
  let filePath
  if (process.argv.length === 3) {
    filePath = process.argv[2]
  }
  const linter = new HtmlbarsLinter()
  linter.lint(filePath)

// If file was required by another Node module
} else {
  module.exports = HtmlbarsLinter
}
