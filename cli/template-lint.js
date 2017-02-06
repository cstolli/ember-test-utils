#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob-all')
const TemplateLinter = require('ember-template-lint')

const linter = new TemplateLinter()

const errors = glob.sync([
  'addon/**/*.hbs',
  'app/**/*.hbs',
  'tests/**/*.hbs'
])
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

console.log(`===== ${errors.length} Template Linting Errors`)

if (errors.length !== 0) {
  process.exit(1)
}
