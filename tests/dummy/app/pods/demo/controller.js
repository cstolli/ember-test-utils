/**
 * Controller for dummy app
 */
import Controller from '@ember/controller'

import {capitalize} from '@ember/string'
import computed, {readOnly} from 'ember-decorators/object'

export default Controller.extend({
  @computed('model.username')
  get name () {
    return this.get('model.username').split('.').map((part) => capitalize(part)).join(' ')
  }
})
