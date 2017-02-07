const expect = require('chai').expect
const fs = require('fs')
const glob = require('glob-all')
const path = require('path')
const sinon = require('sinon')

const lintSass = require('../../cli/lint-sass')

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

const errorSassFiles = [
  'error-1.scss',
  'error-2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

const validSassFiles = [
  'valid-1.scss',
  'valid=2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

const warnSassFiles = [
  'warn-1.scss',
  'warn-2.scss'
]
  .map((fileName) => path.join(__dirname, 'fixtures', fileName))

describe('lint-sass', function () {
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
          lintSass()
        }).to.throw()
      })
    })

    describe('when default config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync', function (filePath) {
          if (filePath.indexOf('.sass-lint.json') !== -1) {
            return JSON.stringify({
              files: {
                include: '+(addon|app|tests)/styles/**/*.s+(a|c)ss'
              },
              options: {
                formatter: 'stylish',
                'merge-default-rules': false
              },
              rules: {
                'no-important': 1,
                'property-sort-order': [
                  2,
                  {
                    order: 'smacss'
                  }
                ]
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns([])
        })

        it('returns false', function () {
          expect(lintSass()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(validSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[30mSASS: 0 errors, 0 warnings\n\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(warnSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-1.scss\u001b[24m',
            '  \u001b[2m2:16\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30m!important not allowed\u001b[39m' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-2.scss\u001b[24m',
            '  \u001b[2m2:15\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30m!important not allowed\u001b[39m' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[1m\u001b[33mSASS: 0 errors, 2 warnings\n\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(errorSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/error-1.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `width`, found' +
              ' `height`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `height`, found' +
              ' `width`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/error-2.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `display`,' +
              ' found `flex-basis`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `flex-basis`,' +
              ' found `display`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[1m\u001b[31mSASS: 4 errors, 0 warnings\n\u001b[39m\u001b[22m'
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
      files.push('.sass-lint.json')

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
          lintSass()
        }).to.throw()
      })
    })

    describe('when config file is valid JSON', function () {
      beforeEach(function () {
        const originalFn = fs.readFileSync

        sandbox.stub(fs, 'readFileSync', function (filePath) {
          if (filePath.indexOf('.sass-lint.json') !== -1) {
            return JSON.stringify({
              files: {
                include: '+(addon|app|tests)/styles/**/*.s+(a|c)ss'
              },
              options: {
                formatter: 'stylish',
                'merge-default-rules': false
              },
              rules: {
                'no-important': 1,
                'property-sort-order': [
                  2,
                  {
                    order: 'smacss'
                  }
                ]
              }
            })
          }

          return originalFn(...arguments)
        })
      })

      describe('when no files to lint', function () {
        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns([])
        })

        it('returns false', function () {
          expect(lintSass()).to.equal(false)
        })
      })

      describe('when files to lint without errors or warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(validSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[1m\u001b[30mSASS: 0 errors, 0 warnings\n\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with warnings', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(warnSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-1.scss\u001b[24m',
            '  \u001b[2m2:16\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30m!important not allowed\u001b[39m' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/warn-2.scss\u001b[24m',
            '  \u001b[2m2:15\u001b[22m  \u001b[33mwarning\u001b[39m  \u001b[30m!important not allowed\u001b[39m' +
              '  \u001b[2mno-important\u001b[22m',
            '',
            '\u001b[1m\u001b[33mSASS: 0 errors, 2 warnings\n\u001b[39m\u001b[22m'
          ])
        })

        it('returns false', function () {
          expect(result).to.equal(false)
        })
      })

      describe('when files to lint with errors', function () {
        let result

        beforeEach(function () {
          sandbox.stub(glob, 'sync').returns(errorSassFiles)
          result = lintSass()
        })

        it('logs expected output', function () {
          expect(logOutput).to.eql([
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/error-1.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `width`, found' +
              ' `height`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `height`, found' +
              ' `width`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[4m/Repositories/github/ember-test-utils/tests/cli/fixtures/error-2.scss\u001b[24m',
            '  \u001b[2m2:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `display`,' +
              ' found `flex-basis`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '  \u001b[2m3:3\u001b[22m  \u001b[31merror\u001b[39m  \u001b[30mExpected `flex-basis`,' +
              ' found `display`\u001b[39m  \u001b[2mproperty-sort-order\u001b[22m',
            '',
            '\u001b[1m\u001b[31mSASS: 4 errors, 0 warnings\n\u001b[39m\u001b[22m'
          ])
        })

        it('returns true', function () {
          expect(result).to.equal(true)
        })
      })
    })
  })
})
