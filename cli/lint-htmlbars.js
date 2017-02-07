#!/usr/bin/env node

/**
 * @typedef {Object} TemplateLintConfig
 * @property {Object.<string, *>} rules - linting rules
 * @reference https://github.com/rwjblue/ember-template-lint/blob/master/lib/config/recommended.js
 */

const chalk = require('chalk')
const TemplateLinter = require('ember-template-lint')
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')

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
const TEMPLATE_FILE_LOCATIONS = [
  'addon/**/*.hbs',
  'app/**/*.hbs',
  'tests/**/*.hbs'
]

/**
 * Get configuration options for ember-template-lint
 * @returns {TemplateLintConfig} template lint configuration options
 */
function getConfig () {
  // Look for configuration file in current working directory
  const files = fs.readdirSync(process.cwd())
  const configFile = files.find((filePath) => {
    return CONFIG_FILE_NAMES.find((configFileName) => filePath.indexOf(configFileName) !== -1)
  })

  // If no configuration file was found use recommend configuration
  if (!configFile) {
    return require('ember-template-lint/lib/config/recommended')
  }

  // Use configuration from current working directory
  return require(path.join(process.cwd(), configFile))
}

/**
 * Lint template files
 * @returns {Boolean} returns true if there are linting errors
 */
function lint () {
  const options = getConfig()
  const linter = new TemplateLinter(options)

  const errors = glob.sync(TEMPLATE_FILE_LOCATIONS)
    .map((filePath) => {
      return linter.verify({
        moduleId: filePath,
        source: fs.readFileSync(filePath, {encoding: 'utf8'})
      })
    })
    .reduce((a, b) => a.concat(b))

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

  const color = errors.length === 0 ? 'black' : 'red'
  const coloredText = chalk[color](`HTMLBars: ${errors.length} errors`)
  const boldColoredText = chalk.bold(coloredText)

  console.log(boldColoredText)

  // If file was called via CLI and there are errors exit process with failed status
  if (require.main === module && errors.length !== 0) {
    process.exit(1)
  }

  return errors.length
}

// If file was called via CLI
if (require.main === module) {
  lint()

// If file was required by another Node module
} else {
  module.exports = lint
}
