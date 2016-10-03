/**
 * Dummy my-greeting component
 */
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import layout from './template'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  layout,
  name: '',

  // == Computed Properties ===================================================

  @readOnly
  @computed('name')
  greeting (name) {
    return `Hello, ${name}`
  },

  // == Functions =============================================================

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {}
})
