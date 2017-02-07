const expect = require('chai').expect
const CLIEngine = require('eslint').CLIEngine
const fs = require('fs')
const sinon = require('sinon')

const lintJavascript = require('../../cli/lint-javascript')

const rootProjectFiles = [
  '.bowerrc',
  '.editorconfig',
  '.ember-cli',
  '.gitignore',
  '.npmignore',
  '.travis.yml',
  '.watchmanconfig',
  'bower.json',
  'CHANGELOG.md',
  'dependency-snapshot.json',
  'ember-cli-build.js',
  'LICENSE.md',
  'package.json',
  'README.md',
  'testem.js'
]

describe('lint-javascript', function () {
  let logOutput, sandbox

  beforeEach(function () {
    logOutput = []
    sandbox = sinon.sandbox.create()

    sandbox.stub(console, 'log', function (text) {
      logOutput.push(text)
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('when no config file found', function () {
    beforeEach(function () {
      const files = Array.from(rootProjectFiles)

      sandbox.stub(fs, 'readdirSync', function (directory) {
        fs.readdirSync.restore() // Restore original method so sass-lint can use it
        return files
      })
    })

    describe('when default config file is not valid JSON', function () {
      beforeEach(function () {
        sandbox.stub(fs, 'readFileSync').returns('not-json')
      })

      it('throws an error', function () {
        expect(function () {
          lintJavascript()
        }).to.throw()
      })
    })

    describe('when default config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync', function (filePath) {
          if (filePath.indexOf('.eslintrc') !== -1) {
            return JSON.stringify({
              rules: {
                'no-console': ['warn'],
                'no-debugger': ['error']
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [])
          })
        })

        it('returns false', function () {
          expect(lintJavascript()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/valid-*.js'
            ])
          })

          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[30m\nJavascript: 0 errors, 0 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/warn-*.js'
            ])
          })

          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30mUnexpected console ' +
              'statement\u001b[39m  \u001b[2mno-console\u001b[22m',
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30mUnexpected console ' +
              'statement\u001b[39m  \u001b[2mno-console\u001b[22m',
            '\u001b[1m\u001b[33m\nJavascript: 0 errors, 2 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/error-*.js'
            ])
          })
          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/error-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mUnexpected \'debugger\' ' +
              'statement\u001b[39m  \u001b[2mno-debugger\u001b[22m',
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/error-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mUnexpected \'debugger\' ' +
              'statement\u001b[39m  \u001b[2mno-debugger\u001b[22m',
            '\u001b[1m\u001b[31m\nJavascript: 2 errors, 0 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns true', function () {
          expect(result).to.equal(true)
        })
      })
    })
  })

  describe('when config file found', function () {
    beforeEach(function () {
      const files = Array.from(rootProjectFiles)
      files.push('.eslintrc')

      sandbox.stub(fs, 'readdirSync', function (directory) {
        fs.readdirSync.restore() // Restore original method so sass-lint can use it
        return files
      })
    })

    describe('when config file is not valid JSON', function () {
      beforeEach(function () {
        sandbox.stub(fs, 'readFileSync').returns('not-json')
      })

      it('throws an error', function () {
        expect(function () {
          lintJavascript()
        }).to.throw()
      })
    })

    describe('when config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync', function (filePath) {
          if (filePath.indexOf('.eslintrc') !== -1) {
            return JSON.stringify({
              rules: {
                'no-console': ['warn'],
                'no-debugger': ['error']
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [])
          })
        })

        it('returns false', function () {
          expect(lintJavascript()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/valid-*.js'
            ])
          })

          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[30m\nJavascript: 0 errors, 0 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/warn-*.js'
            ])
          })

          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30mUnexpected console ' +
              'statement\u001b[39m  \u001b[2mno-console\u001b[22m',
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30mUnexpected console ' +
              'statement\u001b[39m  \u001b[2mno-console\u001b[22m',
            '\u001b[1m\u001b[33m\nJavascript: 0 errors, 2 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          const originalFn = CLIEngine.prototype.executeOnFiles

          sandbox.stub(CLIEngine.prototype, 'executeOnFiles', function () {
            return originalFn.call(this, [
              'tests/cli/fixtures/error-*.js'
            ])
          })
          result = lintJavascript()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/error-1.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mUnexpected \'debugger\' ' +
              'statement\u001b[39m  \u001b[2mno-debugger\u001b[22m',
            '\u001b[4m\n/Repositories/github/ember-test-utils/tests/cli/fixtures/error-2.js\u001b[24m',
            '  \u001b[2m1:1\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mUnexpected \'debugger\' ' +
              'statement\u001b[39m  \u001b[2mno-debugger\u001b[22m',
            '\u001b[1m\u001b[31m\nJavascript: 2 errors, 0 warnings\u001b[39m\u001b[22m'
          ])
        })

        it('returns true', function () {
          expect(result).to.equal(true)
        })
      })
    })
  })
})
