/* globals module */

'use strict'

module.exports = {
  name: 'ember-test-utils',

  included: function (app) {
    this._super.included(app)
  },

  treeForAddon (tree) {
    // Only include code in build for test environment
    if (this.app.env === 'test') {
      return this._super.treeForAddon.call(this, tree)
    }

    return null
  }
}
