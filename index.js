/* eslint-env node */
'use strict'

module.exports = {
  name: 'ember-test-utils',

  included: function (app) {
    this._super.included(app)
  },

  treeForAddon (tree) {
    const environment = this.app.env
    const config = this.pkg['ember-test-utils'] || {}
    const excludeFromEnvironments = config.excludeFromEnvironments || []

    if (excludeFromEnvironments.indexOf(environment) !== -1) {
      return null
    }

    return this._super.treeForAddon.call(this, tree)
  }
}
