/* eslint-env node */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: [
        'node_modules/ember-frost-css-core/scss',
        'node_modules/ember-frost-theme/scss'
      ]
    }
  })

  return app.toTree()
}
