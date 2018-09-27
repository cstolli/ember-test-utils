/**
 * Dummy my-greeting component
 */
import Component from '@ember/component'

import computed, {readOnly} from 'ember-decorators/object'
import layout from './template'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================

  layout,
  name: '',

  // == Computed Properties ===================================================

  @computed('name')
  get greeting () {
    return `Hello, ${this.get('name')}`
  },

  // == Functions =============================================================

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {}
})
