module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage-addon',
  useBabelInstrumenter: true,
  excludes: [
    '*/app/**/*',
    '**/dummy/**/*'
  ],
  reporters: [
    'html',
    'json-summary',
    'lcov',
    'text-summary'
  ]
}
