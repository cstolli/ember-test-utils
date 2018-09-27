/* eslint-env node */
const Reporter = require('./reporter')

module.exports = {
  framework: 'mocha',
  test_page: 'tests/index.html?hidepassed&coverage',
  disable_watching: true,
  launch_in_ci: [
    'Chrome', 'Firefox'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  reporter: new Reporter(),
  src_files_ignore: ['tests/cli/*.js']
}
