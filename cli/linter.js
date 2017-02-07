const chalk = require('chalk')
const fs = require('fs')
const YAML = require('node-yaml')
const path = require('path')

function Linter (options) {
  // Apply defaults
  Object.assign(this, {
    configFileNames: [],
    fileLocations: []
  })

  // Apply overrides
  Object.assign(this, options)
}

Linter.prototype = {
  /**
   * Load configuration file for linters
   * @returns {Object} linter configuration
   */
  getConfig () {
    // Look for configuration file in current working directory
    const files = fs.readdirSync(process.cwd())
    const configFile = files.find((filePath) => {
      return this.configFileNames.find((configFileName) => filePath.indexOf(configFileName) !== -1)
    })

    // If no configuration file was found use configuration from this addon
    if (!configFile) {
      return this.loadFile(path.join(__dirname, '..', this.defaultConfig))
    }

    // Load found configuration file
    return this.loadFile(path.join(process.cwd(), configFile))
  },

  lint () {
    throw Error('lint method not implemented')
  },

  /**
   * Load file from file system
   * @param {String} filePath - path to file
   * @returns {Object} file contents in JSON
   */
  loadFile (filePath) {
    switch (path.extname(filePath)) {
      case '.js':
        return this.loadJavascriptFile(filePath)

      case '.yml':
        return this.loadYamlFile(filePath)

      default:
        return this.loadJSONFile(filePath)
    }
  },

  /**
   * Load Javascript file from file system
   * @param {String} filePath - path to file
   * @returns {Object} files default export
   */
  loadJavascriptFile (filePath) {
    const moduleId = filePath.replace(/\.js$/, '')
    return require(moduleId)
  },

  /**
   * Load and parse JSON file from file system
   * @param {String} filePath - path to file
   * @returns {Object} parsed JSON
   */
  loadJSONFile (filePath) {
    const fileContents = fs.readFileSync(filePath, {encoding: 'utf8'})
    return JSON.parse(fileContents)
  },

  /**
   * Load and parse YAML file from file system
   * @param {String} filePath - path to file
   * @returns {Object} parsed JSON
   */
  loadYamlFile (filePath) {
    const fileContents = fs.readFileSync(filePath, {encoding: 'utf8'})
    return YAML.parse(fileContents)
  },

  /**
   * Print path to file as part of linting results
   * @param {String} filePath - path to file
   */
  printFilePath (filePath) {
    const underlinedText = chalk.underline(`${filePath}`)
    console.log(underlinedText)
  },

  /**
   * Print path to file as part of linting results
   * @param {Number} line - line in which linting issue occurs
   * @param {Number} column - column in which linting issue occurs
   * @param {String} severity - severity of linting issue ("error" or "warning")
   * @param {String} message - linting message
   * @param {String} rule - linting rule
   */
  printLintItem (line, column, severity, message, rule) {
    const position = chalk.dim(`${line}:${column}`)
    const severityColor = severity === 'error' ? 'red' : 'yellow'

    message = chalk.black(message)
    rule = chalk.dim(rule)
    severity = chalk[severityColor](severity)

    console.log(
      `  ${position}  ${severity}  ${message}  ${rule}`
    )
  },

  /**
   * Print summary of linting results for a particular linter/file type
   * @param {String} label - label for summary (language being linted)
   * @param {Number} errors - error count
   * @param {Number} warnings - warning count
   */
  printLintSummary (label, errors, warnings) {
    const color = errors === 0 ? (warnings === 0 ? 'bgGreen' : 'bgYellow') : 'bgRed'
    let coloredText = chalk[color](` ${label}: ${errors} errors, ${warnings} warnings `)

    if (color === 'bgRed') {
      coloredText = chalk.white(coloredText)
    }

    const boldColoredText = chalk.bold(coloredText)

    console.log(`${boldColoredText}\n`)
  }
}

module.exports = Linter
